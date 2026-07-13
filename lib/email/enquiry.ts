import type { EnquiryFormPayload } from "@/types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildEnquiryEmailHtml(payload: EnquiryFormPayload): string {
  const productRows = payload.products
    .map(
      (product) =>
        `<tr><td style="padding:8px;border:1px solid #e5e5e5;">${escapeHtml(product.sku)}</td><td style="padding:8px;border:1px solid #e5e5e5;">${escapeHtml(product.title)}</td></tr>`,
    )
    .join("");

  return `
    <h2>New product enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>
    <h3>Selected pieces</h3>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #e5e5e5;text-align:left;">SKU</th>
          <th style="padding:8px;border:1px solid #e5e5e5;text-align:left;">Title</th>
        </tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>
  `;
}
