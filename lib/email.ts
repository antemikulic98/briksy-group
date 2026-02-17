import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: "Briksy Group <noreply@briksy.group>",
      to,
      subject,
      html,
    });
  } catch (e) {
    console.error("Failed to send email:", e);
  }
}
