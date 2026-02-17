"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || null;
  const industry = formData.get("industry") as string;
  const companySize = formData.get("companySize") as string;
  const budget = formData.get("budget") as string;
  const message = formData.get("message") as string;

  if (!name || !company || !email || !industry || !companySize || !budget || !message) {
    return { error: "Molimo ispunite sva obavezna polja." };
  }

  try {
    await prisma.inquiry.create({
      data: { name, company, email, phone, industry, companySize, budget, message },
    });

    await sendEmail({
      to: "info@briksy.com",
      subject: `Nova prijava: ${company} — ${name}`,
      html: `
        <h2>Nova prijava za digitalizaciju</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Firma:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "—"}</p>
        <p><strong>Djelatnost:</strong> ${industry}</p>
        <p><strong>Veličina firme:</strong> ${companySize}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message}</p>
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
