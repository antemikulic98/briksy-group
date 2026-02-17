"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function logActivity(
  type: string,
  message: string,
  userId: string,
  projectId: string
) {
  await prisma.activity.create({
    data: { type, message, userId, projectId },
  });
}

export async function getProjectActivities(projectId: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  return prisma.activity.findMany({
    where: { projectId },
    include: { user: { select: { name: true, role: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getRecentActivities(limit = 10) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }

  return prisma.activity.findMany({
    include: {
      user: { select: { name: true, role: true } },
      project: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
