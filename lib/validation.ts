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
