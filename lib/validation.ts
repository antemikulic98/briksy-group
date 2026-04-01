import { z } from "zod/v4";

export const inquirySchema = z.object({
  name: z.string().max(100).optional(),
  company: z.string().min(1, "Naziv firme je obavezan.").max(200),
  email: z.email("Neispravan email format."),
  phone: z.string().min(1, "Kontakt broj je obavezan.").max(30),
  industry: z.string().max(100).optional(),
  companySize: z.string().max(50).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().max(5000).optional(),
  website: z.string().max(0, "").optional(), // honeypot
});

export const projectSchema = z.object({
  name: z.string().min(1, "Naziv projekta je obavezan.").max(200),
  description: z.string().max(5000).optional(),
  clientId: z.string().min(1, "Klijent je obavezan."),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const projectUpdateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  status: z.enum(["AKTIVAN", "ZAVRSEN", "PAUZIRAN"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const clientSchema = z.object({
  email: z.email("Neispravan email format."),
  name: z.string().min(1, "Ime je obavezno.").max(100),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 znakova.").max(100),
});

export const phaseSchema = z.object({
  name: z.string().min(1, "Naziv faze je obavezan.").max(200),
  description: z.string().max(5000).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const phaseUpdateSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  status: z.enum(["NA_CEKANJU", "U_TIJEKU", "ZAVRSENA"]),
  percentage: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Komentar ne može biti prazan.").max(5000),
});

export const bugReportSchema = z.object({
  title: z.string().min(1, "Naslov je obavezan.").max(200),
  description: z.string().min(1, "Opis je obavezan.").max(5000),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  page: z.string().max(500).optional(),
});

export const twoFactorCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Kod mora imati najmanje 6 znakova.")
    .max(8)
    .regex(/^[a-zA-Z0-9]+$/, "Kod smije sadržavati samo slova i brojeve."),
});

export const disableTwoFactorSchema = z.object({
  password: z.string().min(1, "Lozinka je obavezna."),
});

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export function validateFile(
  fileName: string,
  fileType: string,
  fileSize: number
): string | null {
  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    return "Nepodržani tip datoteke. Dozvoljeni: PDF, Word, Excel, JPG, PNG.";
  }
  if (fileSize > MAX_FILE_SIZE) {
    return "Datoteka je prevelika. Maksimalno 10 MB.";
  }
  if (/[\/\\]/.test(fileName)) {
    return "Neispravan naziv datoteke.";
  }
  return null;
}

export function sanitizeFileName(name: string): string {
  return name
    .replace(/[\/\\]/g, "_")
    .replace(/\.\./g, "_")
    .replace(/[^\w.\-\s]/g, "_")
    .slice(0, 200);
}
