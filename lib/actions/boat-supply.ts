"use server";

import { sendEmail } from "@/lib/email";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

export async function submitBoatSupplyOrder(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || "";
  const marina = (formData.get("marina") as string) || "";
  const checkInDate = (formData.get("checkInDate") as string) || "";
  const note = (formData.get("note") as string) || "";
  const packageName = formData.get("packageName") as string;
  const itemsJson = formData.get("items") as string;

  if (!name || !email) {
    return { error: "Please fill in your name and email." };
  }

  let items: OrderItem[] = [];
  try {
    items = JSON.parse(itemsJson);
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
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${i.name}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${i.qty}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${(i.price * i.qty).toFixed(2)} &euro;</td>
        </tr>`
    )
    .join("");

  const html = `
    <h2 style="color:#1e3a5f">New Boat Supply Order</h2>
    <p><strong>Package:</strong> ${packageName}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "—"}</p>
    <p><strong>Marina:</strong> ${marina || "—"}</p>
    <p><strong>Check-in date:</strong> ${checkInDate || "—"}</p>
    ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}
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
      subject: `Boat Supply Order: ${packageName} — ${name}`,
      html,
    });
    return { success: true };
  } catch {
    return { error: "Failed to send order. Please try again." };
  }
}
