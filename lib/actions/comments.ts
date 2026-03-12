"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html-escape";
import { rateLimit } from "@/lib/rate-limit";
import { commentSchema } from "@/lib/validation";
import { logActivity } from "./activities";
import { logSecurityEvent } from "./security";
import { revalidatePath } from "next/cache";

export async function addComment(projectId: string, content: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  // Rate limit: 10 comments per minute
  const rl = rateLimit(`comment:${session.user.id}`, 10, 60 * 1000);
  if (!rl.success) {
    await logSecurityEvent("RATE_LIMITED", "Comment rate limited", { userId: session.user.id });
    return { error: "Previše komentara. Pokušajte ponovo za minutu." };
  }

  const result = commentSchema.safeParse({ content });
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
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

  const safeContent = result.data.content.trim();

  await prisma.comment.create({
    data: {
      content: safeContent,
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
  const escapedContent = escapeHtml(safeContent);
  const escapedProjectName = escapeHtml(project.name);
  const escapedUserName = escapeHtml(session.user.name || "");

  if (session.user.role === "ADMIN") {
    await sendEmail({
      to: project.client.email,
      subject: `Novi komentar na projektu: ${project.name}`,
      html: `
        <h2>Novi komentar na projektu &quot;${escapedProjectName}&quot;</h2>
        <p><strong>${escapedUserName}</strong> je ostavio komentar:</p>
        <blockquote style="border-left:3px solid #2563eb;padding-left:12px;color:#374151;">${escapedContent}</blockquote>
        <p><a href="${process.env.NEXTAUTH_URL}/dashboard/projects/${projectId}">Pogledajte u portalu →</a></p>
      `,
    });
  } else {
    await sendEmail({
      to: "info@briksygroup.com",
      subject: `Komentar klijenta na projektu: ${project.name}`,
      html: `
        <h2>Komentar klijenta na projektu &quot;${escapedProjectName}&quot;</h2>
        <p><strong>${escapedUserName}</strong> (${escapeHtml(project.client.email)}) je ostavio komentar:</p>
        <blockquote style="border-left:3px solid #2563eb;padding-left:12px;color:#374151;">${escapedContent}</blockquote>
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
