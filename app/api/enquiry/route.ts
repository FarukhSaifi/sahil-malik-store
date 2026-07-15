import { NextResponse } from "next/server";

import { getEnquiryInboxEmail } from "@/lib/contact";
import { buildEnquiryEmailHtml, buildEnquiryEmailSubject } from "@/lib/email/enquiry";
import { sendTransactionalEmail } from "@/lib/email/resend";
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
  if (validationError === "Invalid submission") {
    return NextResponse.json({ ok: true });
  }
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const toEmail = getEnquiryInboxEmail();
  if (!toEmail) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const result = await sendTransactionalEmail({
    to: toEmail,
    replyTo: body.email,
    subject: buildEnquiryEmailSubject(body),
    html: buildEnquiryEmailHtml(body),
    idempotencyKey: body.idempotencyKey,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
