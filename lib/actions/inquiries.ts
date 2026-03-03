"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html-escape";
import { rateLimit } from "@/lib/rate-limit";
import { inquirySchema } from "@/lib/validation";
import { logSecurityEvent } from "./security";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function submitInquiry(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const rl = rateLimit(`inquiry:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.success) {
    await logSecurityEvent("RATE_LIMITED", `Contact form rate limited`, { ip });
    return { error: "Previše zahtjeva. Pokušajte ponovo za 15 minuta." };
  }

  const raw = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    industry: formData.get("industry") as string,
    companySize: formData.get("companySize") as string,
    budget: formData.get("budget") as string,
    message: formData.get("message") as string,
    website: (formData.get("website") as string) || undefined,
  };

  // Honeypot check
  if (raw.website) {
    await logSecurityEvent("SPAM_BLOCKED", `Honeypot triggered from ${ip}`, { ip, email: raw.email });
    // Silently return success to not tip off bots
    return { success: true };
  }

  const result = inquirySchema.safeParse(raw);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Neispravan unos.";
    return { error: firstError };
  }

  const data = result.data;

  try {
    await prisma.inquiry.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || null,
        industry: data.industry,
        companySize: data.companySize,
        budget: data.budget,
        message: data.message,
      },
    });

    await sendEmail({
      to: "info@briksy.com",
      subject: `Nova prijava: ${escapeHtml(data.company)} — ${escapeHtml(data.name)}`,
      html: `
        <h2>Nova prijava za digitalizaciju</h2>
        <p><strong>Ime:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Firma:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(data.phone || "—")}</p>
        <p><strong>Djelatnost:</strong> ${escapeHtml(data.industry)}</p>
        <p><strong>Veličina firme:</strong> ${escapeHtml(data.companySize)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
        <p><strong>Poruka:</strong></p>
        <p>${escapeHtml(data.message)}</p>
      `,
    });

    return { success: true };
  } catch {
    return { error: "Došlo je do greške. Pokušajte ponovo." };
  }
}

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
}

export async function getInquiries() {
  await requireAdmin();
  return prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markAsRead(id: string) {
  await requireAdmin();
  await prisma.inquiry.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/inquiries");
}
