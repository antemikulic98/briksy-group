"use server";

import { sendEmail } from "@/lib/email";
import { escapeHtml } from "@/lib/html-escape";
import { rateLimit } from "@/lib/rate-limit";
import { boatSupplySchema } from "@/lib/validation";
import { logSecurityEvent } from "./security";
import { headers } from "next/headers";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

export async function submitBoatSupplyOrder(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const rl = rateLimit(`boat-order:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.success) {
    await logSecurityEvent("RATE_LIMITED", "Boat supply order rate limited", { ip });
    return { error: "Too many requests. Please try again in 15 minutes." };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    marina: (formData.get("marina") as string) || undefined,
    checkInDate: (formData.get("checkInDate") as string) || undefined,
    note: (formData.get("note") as string) || undefined,
    packageName: formData.get("packageName") as string,
    items: formData.get("items") as string,
  };

  const result = boatSupplySchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0]?.message || "Invalid input." };
  }

  const data = result.data;

  let items: OrderItem[] = [];
  try {
    items = JSON.parse(data.items);
  } catch {
    return { error: "Invalid order data." };
  }

  if (items.length === 0) {
    return { error: "Your order is empty." };
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const itemRows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(i.name)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${i.qty}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${(i.price * i.qty).toFixed(2)} &euro;</td>
        </tr>`
    )
    .join("");

  const html = `
    <h2 style="color:#1e3a5f">New Boat Supply Order</h2>
    <p><strong>Package:</strong> ${escapeHtml(data.packageName)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || "—")}</p>
    <p><strong>Marina:</strong> ${escapeHtml(data.marina || "—")}</p>
    <p><strong>Check-in date:</strong> ${escapeHtml(data.checkInDate || "—")}</p>
    ${data.note ? `<p><strong>Note:</strong> ${escapeHtml(data.note)}</p>` : ""}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr style="background:#f8fafc">
          <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Product</th>
          <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb">Qty</th>
          <th style="padding:8px 12px;text-align:right;border-bottom:2px solid #e5e7eb">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding:10px 12px;font-weight:bold;border-top:2px solid #e5e7eb">Total</td>
          <td style="padding:10px 12px;font-weight:bold;text-align:right;border-top:2px solid #e5e7eb;color:#2563eb">${total.toFixed(2)} &euro;</td>
        </tr>
      </tfoot>
    </table>
  `;

  try {
    await sendEmail({
      to: "info@briksy.com",
      subject: `Boat Supply Order: ${data.packageName} — ${data.name}`,
      html,
    });
    return { success: true };
  } catch {
    return { error: "Failed to send order. Please try again." };
  }
}
