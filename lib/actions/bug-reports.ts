"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { bugReportSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

const PAGE_SIZE = 10;

export async function createBugReport(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    severity: (formData.get("severity") as string) || "MEDIUM",
    page: (formData.get("page") as string) || undefined,
  };

  const result = bugReportSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Neispravan unos." };
  }

  const data = result.data;

  await prisma.bugReport.create({
    data: {
      title: data.title,
      description: data.description,
      severity: data.severity,
      page: data.page || null,
      userId: session.user.id,
    },
  });

  if (session.user.role === "ADMIN") {
    revalidatePath("/admin/bug-reports");
  } else {
    revalidatePath("/dashboard/bug-report");
  }

  return { success: true };
}

export async function getBugReports(
  page = 1,
  statusFilter?: string,
  severityFilter?: string
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }

  const where: Record<string, string> = {};
  if (statusFilter) where.status = statusFilter;
  if (severityFilter) where.severity = severityFilter;

  const [reports, total] = await Promise.all([
    prisma.bugReport.findMany({
      where,
      include: { user: { select: { name: true, email: true, role: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.bugReport.count({ where }),
  ]);

  return { reports, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function getBugReport(id: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  const report = await prisma.bugReport.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true, role: true } } },
  });

  if (!report) throw new Error("Bug report nije pronađen.");

  // Non-admin can only see their own reports
  if (session.user.role !== "ADMIN" && report.userId !== session.user.id) {
    throw new Error("Nemate pristup.");
  }

  return report;
}

export async function updateBugReportStatus(id: string, status: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }

  const validStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
  if (!validStatuses.includes(status)) {
    return { error: "Nevaljan status." };
  }

  await prisma.bugReport.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/admin/bug-reports/${id}`);
  revalidatePath("/admin/bug-reports");
}

export async function getMyBugReports() {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  return prisma.bugReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}
