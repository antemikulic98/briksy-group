"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logActivity } from "./activities";
import { validateFile, sanitizeFileName } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_REGION || "fra1",
  endpoint: process.env.S3_ENDPOINT || "https://fra1.digitaloceanspaces.com",
  forcePathStyle: false,
  credentials:
    process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY
      ? {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
        }
      : undefined,
});

const BUCKET = process.env.S3_BUCKET || "briksy-documents";

export async function getUploadUrl(
  projectId: string,
  fileName: string,
  fileType: string,
  fileSize: number
) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  // Validate file
  const error = validateFile(fileName, fileType, fileSize);
  if (error) return { error };

  const safeName = sanitizeFileName(fileName);
  const key = `projects/${projectId}/${Date.now()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  const document = await prisma.document.create({
    data: {
      name: safeName,
      key,
      size: fileSize,
      type: fileType,
      uploadedById: session.user.id,
      projectId,
    },
  });

  await logActivity(
    "DOCUMENT_UPLOADED",
    `${session.user.name} je uploadao dokument: ${safeName}`,
    session.user.id,
    projectId
  );

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/dashboard/projects/${projectId}`);

  return { uploadUrl, documentId: document.id };
}

export async function getDocumentDownloadUrl(documentId: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { project: { select: { clientId: true } } },
  });

  if (!document) throw new Error("Dokument nije pronađen.");

  if (
    session.user.role === "CLIENT" &&
    document.project.clientId !== session.user.id
  ) {
    throw new Error("Nemate pristup.");
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: document.key,
  });

  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function getProjectDocuments(projectId: string) {
  const session = await auth();
  if (!session) throw new Error("Niste prijavljeni.");

  if (session.user.role === "CLIENT") {
    const project = await prisma.project.findFirst({
      where: { id: projectId, clientId: session.user.id },
    });
    if (!project) throw new Error("Nemate pristup.");
  }

  return prisma.document.findMany({
    where: { projectId },
    include: { uploadedBy: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteDocument(documentId: string) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Nemate pristup.");
  }

  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) throw new Error("Dokument nije pronađen.");

  try {
    await s3.send(
      new DeleteObjectCommand({ Bucket: BUCKET, Key: document.key })
    );
  } catch {
    // S3 deletion failure is non-critical
  }

  await prisma.document.delete({ where: { id: documentId } });

  revalidatePath(`/admin/projects/${document.projectId}`);
  revalidatePath(`/dashboard/projects/${document.projectId}`);
}
