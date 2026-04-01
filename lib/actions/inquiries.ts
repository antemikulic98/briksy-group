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
    name: (formData.get("name") as string) || undefined,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    industry: (formData.get("industry") as string) || undefined,
    companySize: (formData.get("companySize") as string) || undefined,
    budget: (formData.get("budget") as string) || undefined,
    message: (formData.get("message") as string) || undefined,
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
        name: data.name || null,
        company: data.company,
        email: data.email,
        phone: data.phone,
        industry: data.industry || null,
        companySize: data.companySize || null,
        budget: data.budget || null,
        message: data.message || null,
      },
    });

    await sendEmail({
      to: "info@briksygroup.com",
      subject: `Nova prijava: ${escapeHtml(data.company)}`,
      html: `
        <h2>Nova prijava za kontakt</h2>
        <p><strong>Firma:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
        ${data.message ? `<p><strong>Poruka:</strong></p><p>${escapeHtml(data.message)}</p>` : ""}
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
