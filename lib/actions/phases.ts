"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PhaseStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";
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

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  if (!name) {
    return { error: "Naziv faze je obavezan." };
  }

  const lastPhase = await prisma.phase.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
  });

  await prisma.phase.create({
    data: {
      name,
      description: description || null,
      projectId,
      order: (lastPhase?.order ?? -1) + 1,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  await logActivity(
    "PHASE_CREATED",
    `Faza "${name}" kreirana`,
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

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as PhaseStatus;
  const percentage = parseInt(formData.get("percentage") as string) || 0;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const oldPhase = await prisma.phase.findUnique({
    where: { id: phaseId },
    select: { status: true, percentage: true },
  });

  await prisma.phase.update({
    where: { id: phaseId },
    data: {
      name,
      description: description || null,
      status,
      percentage: Math.min(100, Math.max(0, percentage)),
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  await logActivity(
    "PHASE_UPDATED",
    `Faza "${name}" ažurirana — ${status}, ${percentage}%`,
    session.user.id,
    projectId
  );

  // Notify client if status or percentage changed
  if (oldPhase && (oldPhase.status !== status || oldPhase.percentage !== percentage)) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: { select: { email: true, name: true } } },
    });

    if (project) {
      await sendEmail({
        to: project.client.email,
        subject: `Ažuriranje faze: ${name} — ${project.name}`,
        html: `
          <h2>Faza "${name}" je ažurirana</h2>
          <p>Poštovani ${project.client.name},</p>
          <p>Faza <strong>"${name}"</strong> na projektu <strong>"${project.name}"</strong> je ažurirana.</p>
          <p><strong>Status:</strong> ${status === "ZAVRSENA" ? "Završena" : status === "U_TIJEKU" ? "U tijeku" : "Na čekanju"}</p>
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
