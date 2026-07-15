import { productPath } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { formatAppointmentDate, formatAppointmentTime } from "@/lib/appointment-datetime";
import { detailRow, escapeHtml, sectionHeading, toAbsoluteAssetUrl, wrapEditorialEmail } from "@/lib/email/shared";

import type { EnquiryFormPayload } from "@/types";

function productTableRows(products: EnquiryFormPayload["products"]): string {
  if (products.length === 0) {
    return `<tr><td colspan="4" style="padding:12px;border:1px solid #e8e4de;color:#6b6b6b;">No pieces selected</td></tr>`;
  }

  return products
    .map((product) => {
      const productUrl = `${SITE.url}${productPath(product.slug)}`;
      const imageUrl = toAbsoluteAssetUrl(product.imageSrc, SITE.url);
      const collection = product.collectionTitle ? escapeHtml(product.collectionTitle) : "—";
      const alt = escapeHtml(product.title);

      return `<tr>
        <td style="padding:10px 12px;border:1px solid #e8e4de;vertical-align:top;width:88px;">
          <a href="${productUrl}" style="display:block;text-decoration:none;">
            <img src="${imageUrl}" alt="${alt}" width="72" height="96" style="display:block;width:72px;height:96px;object-fit:cover;border:1px solid #e8e4de;background-color:#f7f5f2;" />
          </a>
        </td>
        <td style="padding:10px 12px;border:1px solid #e8e4de;vertical-align:top;">${escapeHtml(product.sku)}</td>
        <td style="padding:10px 12px;border:1px solid #e8e4de;vertical-align:top;">
          <a href="${productUrl}" style="color:#111111;text-decoration:underline;">${escapeHtml(product.title)}</a>
        </td>
        <td style="padding:10px 12px;border:1px solid #e8e4de;vertical-align:top;">${collection}</td>
      </tr>`;
    })
    .join("");
}

export function buildEnquiryEmailHtml(payload: EnquiryFormPayload): string {
  const productSummary =
    payload.products.length === 1
      ? `${payload.products[0]?.title} (${payload.products[0]?.sku})`
      : `${payload.products.length} selected pieces`;

  const bodyHtml = `
    ${sectionHeading("Client details")}
    ${detailRow("Name", escapeHtml(payload.name))}
    ${detailRow("Email", `<a href="mailto:${escapeHtml(payload.email)}" style="color:#111111;">${escapeHtml(payload.email)}</a>`)}
    ${payload.phone ? detailRow("Phone", escapeHtml(payload.phone)) : ""}

    ${sectionHeading("Preferred appointment")}
    ${detailRow("Date", escapeHtml(formatAppointmentDate(payload.preferredDate)))}
    ${detailRow("Time", escapeHtml(formatAppointmentTime(payload.preferredTime)))}

    ${sectionHeading("Enquiry")}
    <p style="margin:0;font-size:15px;white-space:pre-wrap;">${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>

    ${sectionHeading("Selected pieces")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:4px;">
      <thead>
        <tr>
          <th align="left" style="padding:10px 12px;border:1px solid #e8e4de;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:normal;color:#6b6b6b;">Image</th>
          <th align="left" style="padding:10px 12px;border:1px solid #e8e4de;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:normal;color:#6b6b6b;">SKU</th>
          <th align="left" style="padding:10px 12px;border:1px solid #e8e4de;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:normal;color:#6b6b6b;">Piece</th>
          <th align="left" style="padding:10px 12px;border:1px solid #e8e4de;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:normal;color:#6b6b6b;">Collection</th>
        </tr>
      </thead>
      <tbody>${productTableRows(payload.products)}</tbody>
    </table>
  `;

  return wrapEditorialEmail({
    title: "Product Enquiry",
    preheader: `${payload.name} enquired about ${productSummary} for ${formatAppointmentDate(payload.preferredDate)}`,
    bodyHtml,
  });
}

export function buildEnquiryEmailSubject(payload: EnquiryFormPayload): string {
  if (payload.products.length === 1) {
    const product = payload.products[0];
    return `Product Enquiry — ${product.title} (${product.sku}) from ${payload.name} — ${formatAppointmentDate(payload.preferredDate)}`;
  }

  return `Product Enquiry — ${payload.products.length} pieces from ${payload.name} — ${formatAppointmentDate(payload.preferredDate)}`;
}
