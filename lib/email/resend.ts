import "server-only";

import { Resend } from "resend";

import type { ResendConfig, TransactionalEmailInput, TransactionalEmailResult } from "@/types";

let cachedClient: Resend | null = null;
let cachedApiKey: string | null = null;

const PLACEHOLDER_KEY_PATTERN = /dummy|xxxxxxxx|replace|placeholder|your_?key|example/i;

function isUsableApiKey(apiKey: string): boolean {
  if (!apiKey.startsWith("re_")) {
    return false;
  }

  if (PLACEHOLDER_KEY_PATTERN.test(apiKey)) {
    return false;
  }

  // Real Resend keys are longer than the short placeholders we ship in examples.
  return apiKey.length >= 20;
}

function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !fromEmail || !isUsableApiKey(apiKey)) {
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

function allowDevelopmentDryRun(): boolean {
  return process.env.NODE_ENV === "development" && process.env.RESEND_DRY_RUN !== "0";
}

export async function sendTransactionalEmail(input: TransactionalEmailInput): Promise<TransactionalEmailResult> {
  const config = getResendConfig();

  if (!config) {
    if (allowDevelopmentDryRun()) {
      console.warn("[email:dry-run] RESEND_API_KEY is missing or a placeholder. Email not sent.", {
        to: input.to,
        cc: input.cc,
        replyTo: input.replyTo,
        subject: input.subject,
        idempotencyKey: input.idempotencyKey,
      });
      return { ok: true, id: `dev-dry-run-${input.idempotencyKey}` };
    }

    return { ok: false, status: 503, message: "Email service not configured" };
  }

  const resend = getResendClient(config.apiKey);
  const { data, error } = await resend.emails.send(
    {
      from: config.fromEmail,
      to: [input.to],
      ...(input.cc && input.cc.length > 0 ? { cc: input.cc } : {}),
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
    },
    {
      idempotencyKey: input.idempotencyKey,
    },
  );

  if (error) {
    console.error("[email] Resend send failed:", error.message, error);
    return { ok: false, status: 502, message: "Failed to send email" };
  }

  return { ok: true, id: data?.id };
}
