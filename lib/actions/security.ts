"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logSecurityEvent as _log } from "@/lib/security-logger";

export async function logSecurityEvent(
  type: string,
  message: string,
  extra?: { ip?: string; userAgent?: string; email?: string; userId?: string }
) {
  return _log(type, message, extra);
}

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
  return session;
}

const PAGE_SIZE = 20;

export async function getSecurityLogs(
  page = 1,
  typeFilter?: string
) {
  await requireAdmin();

  const where = typeFilter ? { type: typeFilter } : {};

  const [logs, total] = await Promise.all([
    prisma.securityLog.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.securityLog.count({ where }),
  ]);

  return { logs, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function getSecurityStats() {
  await requireAdmin();

  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [last24hCounts, last7dCounts, last30dTotal] = await Promise.all([
    prisma.securityLog.groupBy({
      by: ["type"],
      where: { createdAt: { gte: last24h } },
      _count: true,
    }),
    prisma.securityLog.groupBy({
      by: ["type"],
      where: { createdAt: { gte: last7d } },
      _count: true,
    }),
    prisma.securityLog.count({
      where: { createdAt: { gte: last30d } },
    }),
  ]);

  return { last24hCounts, last7dCounts, last30dTotal };
}
