"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html-escape";
import { projectSchema, projectUpdateSchema } from "@/lib/validation";
import { logActivity } from "./activities";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
  return session;
}

export async function getProjects() {
  await requireAdmin();
  return prisma.project.findMany({
    include: {
      client: { select: { id: true, name: true, email: true } },
      phases: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProject(id: string) {
  await requireAdmin();
  return prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true, email: true } },
      phases: { orderBy: { order: "asc" } },
    },
  });
}

export async function getClientProjects() {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  return prisma.project.findMany({
    where: { clientId: session.user.id },
    include: { phases: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientProject(id: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  return prisma.project.findFirst({
    where: { id, clientId: session.user.id },
    include: { phases: { orderBy: { order: "asc" } } },
  });
}

export async function createProject(formData: FormData) {
  const session = await requireAdmin();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    clientId: formData.get("clientId") as string,
    startDate: (formData.get("startDate") as string) || undefined,
    endDate: (formData.get("endDate") as string) || undefined,
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
  }

  const data = result.data;

  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description || null,
      clientId: data.clientId,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  await logActivity(
    "PROJECT_CREATED",
    `Projekt "${data.name}" kreiran`,
    session.user.id,
    project.id
  );

  const client = await prisma.user.findUnique({
    where: { id: data.clientId },
    select: { email: true, name: true },
  });

  if (client) {
    await sendEmail({
      to: client.email,
      subject: `Novi projekt: ${data.name}`,
      html: `
        <h2>Kreiran je novi projekt za vas</h2>
        <p>Poštovani ${escapeHtml(client.name)},</p>
        <p>Projekt <strong>&quot;${escapeHtml(data.name)}&quot;</strong> je kreiran u vašem portalu.</p>
        ${data.description ? `<p>${escapeHtml(data.description)}</p>` : ""}
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard">Pogledajte u portalu →</a></p>
      `,
    });
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await requireAdmin();

  const raw = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    status: formData.get("status") as string,
    startDate: (formData.get("startDate") as string) || undefined,
    endDate: (formData.get("endDate") as string) || undefined,
  };

  const result = projectUpdateSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
  }

  const data = result.data;

  await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description || null,
      status: data.status as ProjectStatus,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  await logActivity(
    "PROJECT_UPDATED",
    `Projekt ažuriran — status: ${data.status}`,
    session.user.id,
    id
  );

  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  const session = await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { name: true },
  });

  await prisma.project.delete({ where: { id } });

  if (project) {
    await logActivity(
      "PROJECT_DELETED",
      `Projekt "${project.name}" obrisan`,
      session.user.id,
      id
    ).catch(() => {});
  }

  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function getClientsForSelect() {
  await requireAdmin();
  return prisma.user.findMany({
    where: { role: "CLIENT" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });
}
