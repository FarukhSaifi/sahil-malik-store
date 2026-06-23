"use client";

import { useMemo, useState } from "react";

import { SITE } from "@/constants/site";

import { getEmailError, getRequiredError, isFormValid } from "@/lib/validation";

import { Button } from "@/components/ui/button";
import { FormField, getFieldDescribedBy } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { ContactFormProps } from "@/types";

type ContactField = "name" | "email" | "message";

export function ContactForm({ inboxEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<ContactField, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(
    () => ({
      name: getRequiredError(name, SITE.form.errors.nameRequired),
      email: getEmailError(email, SITE.form.errors.emailRequired, SITE.form.errors.emailInvalid),
      message: getRequiredError(message, SITE.form.errors.messageRequired),
    }),
    [name, email, message],
  );

  const canSubmit = isFormValid(errors);

  const showError = (field: ContactField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const markTouched = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!canSubmit) {
      return;
    }

    const subject = encodeURIComponent(SITE.form.mailtoSubject(name.trim()));
    const body = encodeURIComponent(SITE.form.mailtoBody(name.trim(), email.trim(), message.trim()));

    window.location.href = `mailto:${inboxEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

      <Button
        type="submit"
        variant="outlineInvert"
        size="lg"
        className="label-caps w-full sm:w-auto"
        disabled={!canSubmit}
      >
        {SITE.form.submitLabel}
      </Button>
    </form>
  );
}
