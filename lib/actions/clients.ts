"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
  return session;
}

export async function getClients() {
  await requireAdmin();
  return prisma.user.findMany({
    where: { role: "CLIENT" },
    include: { projects: { select: { id: true, status: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClient(id: string) {
  await requireAdmin();
  return prisma.user.findUnique({
    where: { id, role: "CLIENT" },
    include: {
      projects: {
        include: { phases: { orderBy: { order: "asc" } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function createClient(formData: FormData) {
  await requireAdmin();

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!email || !name || !password) {
    return { error: "Sva polja su obavezna." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Korisnik s tim emailom već postoji." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "CLIENT",
    },
  });

  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function deleteClient(id: string) {
  await requireAdmin();

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin/clients");
  revalidatePath("/admin");
}
