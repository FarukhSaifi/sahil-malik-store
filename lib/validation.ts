import { SITE } from "@/constants/site";

import type { EnquiryFormPayload } from "@/types";

export function getRequiredError(value: string, message: string): string | undefined {
  if (!value.trim()) {
    return message;
  }

  return undefined;
}

export function getEmailError(value: string, requiredMessage: string, invalidMessage: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return requiredMessage;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return invalidMessage;
  }

  return undefined;
}

export function isFormValid(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).every((error) => !error);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function validateEnquiryPayload(payload: EnquiryFormPayload): string | null {
  if (payload.honeypot?.trim()) {
    return "Invalid submission";
  }

  if (!payload.name.trim()) {
    return SITE.enquiry.errors.nameRequired;
  }

  const emailError = getEmailError(payload.email, SITE.enquiry.errors.emailRequired, SITE.enquiry.errors.emailInvalid);

  if (emailError) {
    return emailError;
  }

  if (!payload.message.trim()) {
    return SITE.enquiry.errors.messageRequired;
  }

  if (!Array.isArray(payload.products) || payload.products.length === 0) {
    return SITE.enquiry.errors.noProducts;
  }

  if (payload.products.length > SITE.enquiry.maxItems) {
    return SITE.enquiry.errors.maxProducts;
  }

  for (const product of payload.products) {
    if (!product.slug?.trim() || !product.sku?.trim() || !product.title?.trim()) {
      return "Invalid product data";
    }
  }

  if (!payload.idempotencyKey?.trim()) {
    return "Missing request id";
  }

  return null;
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
