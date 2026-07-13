import { NextResponse } from "next/server";

import { Resend } from "resend";

import { getContactInfo } from "@/lib/contact";
import { buildEnquiryEmailHtml } from "@/lib/email/enquiry";
import { validateEnquiryPayload } from "@/lib/validation";

import type { EnquiryFormPayload } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: EnquiryFormPayload;

  try {
    body = (await request.json()) as EnquiryFormPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validationError = validateEnquiryPayload(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const { email: toEmail } = getContactInfo();

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const html = buildEnquiryEmailHtml(body);

  const { data, error } = await resend.emails.send(
    {
      from: fromEmail,
      to: [toEmail],
      replyTo: body.email,
      subject: `Product Enquiry from ${body.name}`,
      html,
    },
    {
      idempotencyKey: body.idempotencyKey,
    },
  );

  if (error) {
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
