import "server-only";

import { SITE } from "@/constants/site";

import type { ContactInfo } from "@/types";

/** Inbox for /contact form submissions (and the email shown on the contact page). */
export function getContactInboxEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || SITE.contact.email;
}

/** Inbox for /enquiry form submissions. */
export function getEnquiryInboxEmail(): string {
  return process.env.ENQUIRY_EMAIL?.trim() || SITE.enquiry.email;
}

/** Reads contact details from environment variables (Vercel Production/Preview or .env.local). */
export function getContactInfo(): ContactInfo {
  const phone = process.env.CONTACT_PHONE?.trim() || SITE.contact.phone;
  const address = process.env.CONTACT_ADDRESS?.trim() || SITE.contact.address;
  const mapQuery = SITE.contact.map.query;

  return {
    email: getContactInboxEmail(),
    phone,
    storeTitle: SITE.contact.storeTitle,
    address,
    hours: process.env.CONTACT_HOURS?.trim() || "By appointment only",
    map: {
      embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=en&z=15&output=embed`,
      openUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    },
    whatsapp: {
      phone: process.env.WHATSAPP_PHONE?.trim() || phone,
      defaultMessage:
        process.env.WHATSAPP_MESSAGE?.trim() ||
        process.env.WHATSAPP_DEFAULT_MESSAGE?.trim() ||
        "Hello, I would like to connect with Sahil Malik.",
    },
  };
}
