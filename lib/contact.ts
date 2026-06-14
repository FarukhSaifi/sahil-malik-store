import "server-only";

import type { ContactInfo } from "@/types";

/** Reads contact details from environment variables (Vercel Production/Preview or .env.local). */
export function getContactInfo(): ContactInfo {
  const phone = process.env.CONTACT_PHONE?.trim() ?? "";

  return {
    email: process.env.CONTACT_EMAIL?.trim() ?? "",
    phone,
    address: process.env.CONTACT_ADDRESS?.trim() ?? "",
    hours: process.env.CONTACT_HOURS?.trim() || "By appointment only",
    whatsapp: {
      phone: process.env.WHATSAPP_PHONE?.trim() || phone,
      defaultMessage:
        process.env.WHATSAPP_MESSAGE?.trim() ||
        process.env.WHATSAPP_DEFAULT_MESSAGE?.trim() ||
        "Hello, I would like to connect with Sahil Malik.",
    },
  };
}
