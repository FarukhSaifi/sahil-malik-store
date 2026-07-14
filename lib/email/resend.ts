import "server-only";

import { Resend } from "resend";

import type { ResendConfig, TransactionalEmailInput, TransactionalEmailResult } from "@/types";

let cachedClient: Resend | null = null;
let cachedApiKey: string | null = null;

function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !fromEmail) {
    return null;
  }

  return { apiKey, fromEmail };
}

function getResendClient(apiKey: string): Resend {
  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new Resend(apiKey);
    cachedApiKey = apiKey;
  }

  return cachedClient;
}

export async function sendTransactionalEmail(input: TransactionalEmailInput): Promise<TransactionalEmailResult> {
  const config = getResendConfig();

  if (!config) {
    return { ok: false, status: 503, message: "Email service not configured" };
  }

  const resend = getResendClient(config.apiKey);
  const { data, error } = await resend.emails.send(
    {
      from: config.fromEmail,
      to: [input.to],
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
    },
    {
      idempotencyKey: input.idempotencyKey,
    },
  );

  if (error) {
    return { ok: false, status: 502, message: "Failed to send email" };
  }

  return { ok: true, id: data?.id };
}
