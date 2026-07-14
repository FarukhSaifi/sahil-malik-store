import { NextResponse } from "next/server";

import { getContactInfo } from "@/lib/contact";
import { buildContactEmailHtml, buildContactEmailSubject } from "@/lib/email/contact";
import { sendTransactionalEmail } from "@/lib/email/resend";
import { validateContactPayload } from "@/lib/validation";

import type { ContactFormPayload } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: ContactFormPayload;

  try {
    body = (await request.json()) as ContactFormPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validationError = validateContactPayload(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { email: toEmail } = getContactInfo();
  if (!toEmail) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const result = await sendTransactionalEmail({
    to: toEmail,
    replyTo: body.email,
    subject: buildContactEmailSubject(body),
    html: buildContactEmailHtml(body),
    idempotencyKey: body.idempotencyKey,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
