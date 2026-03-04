"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-logger";
import {
  generateTOTPSecret,
  encryptSecret,
  decryptSecret,
  verifyTOTPCode,
  generateBackupCodes,
} from "@/lib/two-factor";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }
  return session;
}

export async function setupTwoFactor() {
  const session = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, twoFactorEnabled: true },
  });

  if (!user) throw new Error("Korisnik nije pronađen.");
  if (user.twoFactorEnabled) {
    return { error: "2FA je već aktiviran." };
  }

  const { secret, uri } = generateTOTPSecret(user.email);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorSecret: encryptSecret(secret) },
  });

  await logSecurityEvent("2FA_SETUP_STARTED", "2FA setup initiated", {
    userId: session.user.id,
    email: user.email,
  });

  return { uri, secret };
}

export async function confirmTwoFactorSetup(code: string) {
  const session = await requireAdmin();

  const rl = rateLimit(`2fa-setup:${session.user.id}`, 5, 5 * 60 * 1000);
  if (!rl.success) {
    return { error: "Previše pokušaja. Pokušajte ponovno za 5 minuta." };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorSecret: true, twoFactorEnabled: true, email: true },
  });

  if (!user || !user.twoFactorSecret) {
    return { error: "Najprije pokrenite postavljanje 2FA." };
  }
  if (user.twoFactorEnabled) {
    return { error: "2FA je već aktiviran." };
  }

  const secret = decryptSecret(user.twoFactorSecret);
  const isValid = verifyTOTPCode(secret, code);

  if (!isValid) {
    return { error: "Neispravan kod. Pokušajte ponovno." };
  }

  const backupCodes = generateBackupCodes();
  const hashedCodes = await Promise.all(
    backupCodes.map((c) => bcrypt.hash(c, 10))
  );

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      twoFactorEnabled: true,
      twoFactorBackupCodes: JSON.stringify(hashedCodes),
    },
  });

  await logSecurityEvent("2FA_ENABLED", "2FA successfully enabled", {
    userId: session.user.id,
    email: user.email,
  });

  return { success: true, backupCodes };
}

export async function verifyTwoFactorLogin(code: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Nemate pristup." };
  }

  const rl = rateLimit(`2fa-verify:${session.user.id}`, 5, 5 * 60 * 1000);
  if (!rl.success) {
    await logSecurityEvent("2FA_RATE_LIMITED", "2FA verification rate limited", {
      userId: session.user.id,
    });
    return { error: "Previše pokušaja. Pokušajte ponovno za 5 minuta." };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorSecret: true, twoFactorBackupCodes: true, email: true },
  });

  if (!user || !user.twoFactorSecret) {
    return { error: "2FA nije konfiguriran." };
  }

  const secret = decryptSecret(user.twoFactorSecret);
  let isValid = verifyTOTPCode(secret, code);

  // If TOTP code failed, check backup codes
  if (!isValid && user.twoFactorBackupCodes) {
    const hashedCodes: string[] = JSON.parse(user.twoFactorBackupCodes);
    for (let i = 0; i < hashedCodes.length; i++) {
      if (await bcrypt.compare(code, hashedCodes[i])) {
        isValid = true;
        hashedCodes.splice(i, 1);
        await prisma.user.update({
          where: { id: session.user.id },
          data: { twoFactorBackupCodes: JSON.stringify(hashedCodes) },
        });
        await logSecurityEvent("2FA_BACKUP_CODE_USED", "Backup code used for 2FA", {
          userId: session.user.id,
          email: user.email,
        });
        break;
      }
    }
  }

  if (!isValid) {
    await logSecurityEvent("2FA_VERIFY_FAILED", "Failed 2FA verification attempt", {
      userId: session.user.id,
      email: user.email,
    });
    return { error: "Neispravan kod." };
  }

  await logSecurityEvent("2FA_VERIFY_SUCCESS", "2FA verification successful", {
    userId: session.user.id,
    email: user.email,
  });

  return { success: true };
}

export async function disableTwoFactor(password: string) {
  const session = await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true, email: true, twoFactorEnabled: true },
  });

  if (!user) throw new Error("Korisnik nije pronađen.");
  if (!user.twoFactorEnabled) {
    return { error: "2FA nije aktiviran." };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Pogrešna lozinka." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      twoFactorBackupCodes: null,
    },
  });

  await logSecurityEvent("2FA_DISABLED", "2FA disabled", {
    userId: session.user.id,
    email: user.email,
  });

  return { success: true };
}

export async function getTwoFactorStatus() {
  const session = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorEnabled: true, twoFactorBackupCodes: true },
  });
  if (!user) throw new Error("Korisnik nije pronađen.");

  const backupCodesRemaining = user.twoFactorBackupCodes
    ? (JSON.parse(user.twoFactorBackupCodes) as string[]).length
    : 0;

  return {
    enabled: user.twoFactorEnabled,
    backupCodesRemaining,
  };
}
