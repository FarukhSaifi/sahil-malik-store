"use client";

import { useMemo, useState } from "react";

import { SITE } from "@/constants/site";

import { getEmailError, getRequiredError, isFormValid, validateContactPayload } from "@/lib/validation";

import { Button } from "@/components/ui/button";
import { FormField, getFieldDescribedBy } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { ContactFormField } from "@/types";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Record<ContactFormField, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const errors = useMemo(
    () => ({
      name: getRequiredError(name, SITE.form.errors.nameRequired),
      email: getEmailError(email, SITE.form.errors.emailRequired, SITE.form.errors.emailInvalid),
      message: getRequiredError(message, SITE.form.errors.messageRequired),
    }),
    [name, email, message],
  );

  const canSubmit = isFormValid(errors) && status !== "loading";

  const showError = (field: ContactFormField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const markTouched = (field: ContactFormField) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!canSubmit) {
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      idempotencyKey: crypto.randomUUID(),
      honeypot,
    };

    const validationError = validateContactPayload(payload);
    if (validationError) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setSubmitAttempted(false);
      setTouched({ name: false, email: false, message: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="sr-only" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <FormField label={SITE.form.labels.name} htmlFor="name" error={showError("name")}>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          error={Boolean(showError("name"))}
          aria-describedby={getFieldDescribedBy("name", showError("name"))}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => markTouched("name")}
        />
      </FormField>

      <FormField label={SITE.form.labels.email} htmlFor="email" error={showError("email")}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          error={Boolean(showError("email"))}
          aria-describedby={getFieldDescribedBy("email", showError("email"))}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => markTouched("email")}
        />
      </FormField>

      <FormField label={SITE.form.labels.message} htmlFor="message" error={showError("message")}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          error={Boolean(showError("message"))}
          aria-describedby={getFieldDescribedBy("message", showError("message"))}
          onChange={(event) => setMessage(event.target.value)}
          onBlur={() => markTouched("message")}
        />
      </FormField>

      {status === "success" ? (
        <p className="text-sm text-foreground" role="status">
          {SITE.form.submitSuccess}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {SITE.form.submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="outlineInvert"
        size="lg"
        className="label-caps w-full sm:w-auto"
        disabled={!canSubmit}
      >
        {status === "loading" ? "Sending…" : SITE.form.submitLabel}
      </Button>
    </form>
  );
}
