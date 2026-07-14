import { detailRow, escapeHtml, sectionHeading, wrapEditorialEmail } from "@/lib/email/shared";

import type { ContactFormPayload } from "@/types";

export function buildContactEmailHtml(payload: ContactFormPayload): string {
  const bodyHtml = `
    ${sectionHeading("Client details")}
    ${detailRow("Name", escapeHtml(payload.name))}
    ${detailRow("Email", `<a href="mailto:${escapeHtml(payload.email)}" style="color:#111111;">${escapeHtml(payload.email)}</a>`)}

    ${sectionHeading("Message")}
    <p style="margin:0;font-size:15px;white-space:pre-wrap;">${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `;

  return wrapEditorialEmail({
    title: "Appointment Inquiry",
    preheader: `${payload.name} sent an appointment inquiry`,
    bodyHtml,
  });
}

export function buildContactEmailSubject(payload: ContactFormPayload): string {
  return `Appointment Inquiry from ${payload.name}`;
}
