"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";
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

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const clientId = formData.get("clientId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  if (!name || !clientId) {
    return { error: "Naziv i klijent su obavezni." };
  }

  const project = await prisma.project.create({
    data: {
      name,
      description: description || null,
      clientId,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  await logActivity(
    "PROJECT_CREATED",
    `Projekt "${name}" kreiran`,
    session.user.id,
    project.id
  );

  // Notify client
  const client = await prisma.user.findUnique({
    where: { id: clientId },
    select: { email: true, name: true },
  });

  if (client) {
    await sendEmail({
      to: client.email,
      subject: `Novi projekt: ${name}`,
      html: `
        <h2>Kreiran je novi projekt za vas</h2>
        <p>Poštovani ${client.name},</p>
        <p>Projekt <strong>"${name}"</strong> je kreiran u vašem portalu.</p>
        ${description ? `<p>${description}</p>` : ""}
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard">Pogledajte u portalu →</a></p>
      `,
    });
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await requireAdmin();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as ProjectStatus;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  await prisma.project.update({
    where: { id },
    data: {
      name,
      description: description || null,
      status,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
  });

  await logActivity(
    "PROJECT_UPDATED",
    `Projekt ažuriran — status: ${status}`,
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
