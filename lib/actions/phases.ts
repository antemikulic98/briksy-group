"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PhaseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html-escape";
import { phaseSchema, phaseUpdateSchema } from "@/lib/validation";
import { logActivity } from "./activities";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
  return session;
}

export async function createPhase(projectId: string, formData: FormData) {
  const session = await requireAdmin();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    startDate: (formData.get("startDate") as string) || undefined,
    endDate: (formData.get("endDate") as string) || undefined,
  };

  const result = phaseSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
  }

  const data = result.data;

  const lastPhase = await prisma.phase.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
  });

  await prisma.phase.create({
    data: {
      name: data.name,
      description: data.description || null,
      projectId,
      order: (lastPhase?.order ?? -1) + 1,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  await logActivity(
    "PHASE_CREATED",
    `Faza "${data.name}" kreirana`,
    session.user.id,
    projectId
  );

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updatePhase(
  phaseId: string,
  projectId: string,
  formData: FormData
) {
  const session = await requireAdmin();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    status: formData.get("status") as string,
    percentage: formData.get("percentage") as string,
    startDate: (formData.get("startDate") as string) || undefined,
    endDate: (formData.get("endDate") as string) || undefined,
  };

  const result = phaseUpdateSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
  }

  const data = result.data;
  const percentage = Math.min(100, Math.max(0, parseInt(data.percentage) || 0));

  const oldPhase = await prisma.phase.findUnique({
    where: { id: phaseId },
    select: { status: true, percentage: true },
  });

  await prisma.phase.update({
    where: { id: phaseId },
    data: {
      name: data.name,
      description: data.description || null,
      status: data.status as PhaseStatus,
      percentage,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  await logActivity(
    "PHASE_UPDATED",
    `Faza "${data.name}" ažurirana — ${data.status}, ${percentage}%`,
    session.user.id,
    projectId
  );

  // Notify client if status or percentage changed
  if (oldPhase && (oldPhase.status !== data.status || oldPhase.percentage !== percentage)) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: { select: { email: true, name: true } } },
    });

    if (project) {
      const statusLabel =
        data.status === "ZAVRSENA" ? "Završena" : data.status === "U_TIJEKU" ? "U tijeku" : "Na čekanju";

      await sendEmail({
        to: project.client.email,
        subject: `Ažuriranje faze: ${data.name} — ${project.name}`,
        html: `
          <h2>Faza &quot;${escapeHtml(data.name)}&quot; je ažurirana</h2>
          <p>Poštovani ${escapeHtml(project.client.name)},</p>
          <p>Faza <strong>&quot;${escapeHtml(data.name)}&quot;</strong> na projektu <strong>&quot;${escapeHtml(project.name)}&quot;</strong> je ažurirana.</p>
          <p><strong>Status:</strong> ${statusLabel}</p>
          <p><strong>Napredak:</strong> ${percentage}%</p>
          <p><a href="${process.env.NEXTAUTH_URL}/dashboard/projects/${projectId}">Pogledajte u portalu →</a></p>
        `,
      });
    }
  }

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deletePhase(phaseId: string, projectId: string) {
  const session = await requireAdmin();

  const phase = await prisma.phase.findUnique({
    where: { id: phaseId },
    select: { name: true },
  });

  await prisma.phase.delete({ where: { id: phaseId } });

  if (phase) {
    await logActivity(
      "PHASE_DELETED",
      `Faza "${phase.name}" obrisana`,
      session.user.id,
      projectId
    );
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
