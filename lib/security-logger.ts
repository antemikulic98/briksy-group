import { prisma } from "@/lib/prisma";

export async function logSecurityEvent(
  type: string,
  message: string,
  extra?: { ip?: string; userAgent?: string; email?: string; userId?: string }
) {
  try {
    await prisma.securityLog.create({
      data: {
        type,
        message,
        ip: extra?.ip ?? null,
        userAgent: extra?.userAgent?.slice(0, 500) ?? null,
        email: extra?.email ?? null,
        userId: extra?.userId ?? null,
      },
    });
  } catch {
    // Security logging should never break the app
  }
}
