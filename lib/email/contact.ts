import { formatAppointmentDate, formatAppointmentTime } from "@/lib/appointment-datetime";
import { detailRow, escapeHtml, sectionHeading, wrapEditorialEmail } from "@/lib/email/shared";

import type { ContactFormPayload } from "@/types";

export function buildContactEmailHtml(payload: ContactFormPayload): string {
  const bodyHtml = `
    ${sectionHeading("Client details")}
    ${detailRow("Name", escapeHtml(payload.name))}
    ${detailRow("Email", `<a href="mailto:${escapeHtml(payload.email)}" style="color:#111111;">${escapeHtml(payload.email)}</a>`)}

    ${sectionHeading("Preferred appointment")}
    ${detailRow("Date", escapeHtml(formatAppointmentDate(payload.preferredDate)))}
    ${detailRow("Time", escapeHtml(formatAppointmentTime(payload.preferredTime)))}

    ${sectionHeading("Message")}
    <p style="margin:0;font-size:15px;white-space:pre-wrap;">${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `;

  return wrapEditorialEmail({
    title: "Appointment Inquiry",
    preheader: `${payload.name} requested ${formatAppointmentDate(payload.preferredDate)} at ${formatAppointmentTime(payload.preferredTime)}`,
    bodyHtml,
  });
}

export function buildContactEmailSubject(payload: ContactFormPayload): string {
  return `Appointment Inquiry from ${payload.name} — ${formatAppointmentDate(payload.preferredDate)}`;
}
