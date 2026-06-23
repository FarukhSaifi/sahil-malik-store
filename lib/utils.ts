import { clsx  } from "clsx";
import { twMerge } from "tailwind-merge";

import type {ClassValue} from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;

  if (!message) {
    return base;
  }

  return `${base}?${new URLSearchParams({ text: message }).toString()}`;
}
