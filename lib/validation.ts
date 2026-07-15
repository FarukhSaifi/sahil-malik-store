import { SITE } from "@/constants/site";

import { isDateBookable, parseDateInputValue } from "@/lib/appointment-datetime";

import type { ContactFormPayload, EnquiryFormPayload } from "@/types";

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

export function getPreferredDateError(
  value: string,
  requiredMessage: string,
  invalidMessage: string,
): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return requiredMessage;
  }

  const selected = parseDateInputValue(trimmed);
  if (!selected || !isDateBookable(selected)) {
    return invalidMessage;
  }

  return undefined;
}

export function getPreferredTimeError(value: string, requiredMessage: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return requiredMessage;
  }

  if (!(SITE.form.appointment.timeSlots as readonly string[]).includes(trimmed)) {
    return requiredMessage;
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

  const preferredDateError = getPreferredDateError(
    payload.preferredDate,
    SITE.enquiry.errors.preferredDateRequired,
    SITE.enquiry.errors.preferredDateInvalid,
  );

  if (preferredDateError) {
    return preferredDateError;
  }

  const preferredTimeError = getPreferredTimeError(payload.preferredTime, SITE.enquiry.errors.preferredTimeRequired);

  if (preferredTimeError) {
    return preferredTimeError;
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
    if (!product.slug?.trim() || !product.sku?.trim() || !product.title?.trim() || !product.imageSrc?.trim()) {
      return "Invalid product data";
    }
  }

  if (!payload.idempotencyKey?.trim()) {
    return "Missing request id";
  }

  return null;
}

export function validateContactPayload(payload: ContactFormPayload): string | null {
  if (payload.honeypot?.trim()) {
    return "Invalid submission";
  }

  if (!payload.name.trim()) {
    return SITE.form.errors.nameRequired;
  }

  const emailError = getEmailError(payload.email, SITE.form.errors.emailRequired, SITE.form.errors.emailInvalid);

  if (emailError) {
    return emailError;
  }

  const preferredDateError = getPreferredDateError(
    payload.preferredDate,
    SITE.form.errors.preferredDateRequired,
    SITE.form.errors.preferredDateInvalid,
  );

  if (preferredDateError) {
    return preferredDateError;
  }

  const preferredTimeError = getPreferredTimeError(payload.preferredTime, SITE.form.errors.preferredTimeRequired);

  if (preferredTimeError) {
    return preferredTimeError;
  }

  if (!payload.message.trim()) {
    return SITE.form.errors.messageRequired;
  }

  if (!payload.idempotencyKey?.trim()) {
    return "Missing request id";
  }

  return null;
}
