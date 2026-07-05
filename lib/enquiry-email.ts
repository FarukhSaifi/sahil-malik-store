import type { EnquiryFormPayload } from "@/types";

export function escapeHtml(value: string): string {
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
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(product.sku)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(product.title)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="font-family:Georgia,serif;color:#111;line-height:1.6;">
    <h1 style="font-size:20px;font-weight:normal;letter-spacing:0.08em;text-transform:uppercase;">Product Enquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
    <h2 style="font-size:16px;font-weight:normal;letter-spacing:0.08em;text-transform:uppercase;margin-top:24px;">Selected Pieces</h2>
    <table style="width:100%;border-collapse:collapse;margin-top:8px;">
      <thead>
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:2px solid #111;">SKU</th>
          <th align="left" style="padding:8px 12px;border-bottom:2px solid #111;">Title</th>
        </tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>
  </body>
</html>`;
}
