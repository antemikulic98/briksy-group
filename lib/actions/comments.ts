"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { logActivity } from "./activities";
import { revalidatePath } from "next/cache";

export async function addComment(projectId: string, content: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  if (!content.trim()) {
    return { error: "Komentar ne može biti prazan." };
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { client: { select: { email: true, name: true } } },
  });

  if (!project) return { error: "Projekt nije pronađen." };

  // Verify access: admin can comment on any, client only on own
  if (session.user.role === "CLIENT" && project.clientId !== session.user.id) {
    throw new Error("Nemate pristup.");
  }

  await prisma.comment.create({
    data: {
      content: content.trim(),
      userId: session.user.id,
      projectId,
    },
  });

  await logActivity(
    "COMMENT_ADDED",
    `${session.user.name} je dodao komentar`,
    session.user.id,
    projectId
  );

  // Send email notification
  if (session.user.role === "ADMIN") {
    // Admin commented → notify client
    await sendEmail({
      to: project.client.email,
      subject: `Novi komentar na projektu: ${project.name}`,
      html: `
        <h2>Novi komentar na projektu "${project.name}"</h2>
        <p><strong>${session.user.name}</strong> je ostavio komentar:</p>
        <blockquote style="border-left:3px solid #2563eb;padding-left:12px;color:#374151;">${content.trim()}</blockquote>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard/projects/${projectId}">Pogledajte u portalu →</a></p>
      `,
    });
  } else {
    // Client commented → notify admin
    await sendEmail({
      to: "info@briksy.com",
      subject: `Komentar klijenta na projektu: ${project.name}`,
      html: `
        <h2>Komentar klijenta na projektu "${project.name}"</h2>
        <p><strong>${session.user.name}</strong> (${project.client.email}) je ostavio komentar:</p>
        <blockquote style="border-left:3px solid #2563eb;padding-left:12px;color:#374151;">${content.trim()}</blockquote>
        <p><a href="${process.env.NEXTAUTH_URL}/admin/projects/${projectId}">Pogledajte u admin panelu →</a></p>
      `,
    });
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function getProjectComments(projectId: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  // Verify access
  if (session.user.role === "CLIENT") {
    const project = await prisma.project.findFirst({
      where: { id: projectId, clientId: session.user.id },
    });
    if (!project) throw new Error("Nemate pristup.");
  }

  return prisma.comment.findMany({
    where: { projectId },
    include: { user: { select: { name: true, role: true } } },
    orderBy: { createdAt: "asc" },
  });
}
