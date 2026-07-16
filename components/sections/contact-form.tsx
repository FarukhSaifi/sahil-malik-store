"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { SITE } from "@/constants/site";

import {
  getEmailError,
  getPreferredDateError,
  getPreferredTimeError,
  getRequiredError,
  isFormValid,
} from "@/lib/validation";

import { AppointmentDateTimePicker } from "@/components/ui/appointment-datetime-picker";
import { Button } from "@/components/ui/button";
import { FormField, getFieldDescribedBy } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { ContactFormField } from "@/types";

export function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Record<ContactFormField, boolean>>({
    name: false,
    email: false,
    preferredDate: false,
    preferredTime: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const errors = useMemo(
    () => ({
      name: getRequiredError(name, SITE.form.errors.nameRequired),
      email: getEmailError(email, SITE.form.errors.emailRequired, SITE.form.errors.emailInvalid),
      preferredDate: getPreferredDateError(
        preferredDate,
        SITE.form.errors.preferredDateRequired,
        SITE.form.errors.preferredDateInvalid,
      ),
      preferredTime: getPreferredTimeError(preferredTime, SITE.form.errors.preferredTimeRequired),
      message: getRequiredError(message, SITE.form.errors.messageRequired),
    }),
    [name, email, preferredDate, preferredTime, message],
  );

  const isLoading = status === "loading";
  const showError = (field: ContactFormField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const markTouched = (field: ContactFormField) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const clearStatusOnEdit = () => {
    if (status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (isLoading) {
      return;
    }

    if (!isFormValid(errors)) {
      return;
    }

    // Never block the request on the honeypot client-side — browsers/password
    // managers often autofill hidden fields and that was aborting the API call.
    const payload = {
      name: name.trim(),
      email: email.trim(),
      preferredDate: preferredDate.trim(),
      preferredTime: preferredTime.trim(),
      message: message.trim(),
      idempotencyKey: crypto.randomUUID(),
      honeypot: "",
    };

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

      router.push(SITE.routes.thankYou);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="contact-fax-number">Fax</label>
        <input
          id="contact-fax-number"
          name="fax_number"
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
          onChange={(event) => {
            clearStatusOnEdit();
            setName(event.target.value);
          }}
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
          onChange={(event) => {
            clearStatusOnEdit();
            setEmail(event.target.value);
          }}
          onBlur={() => markTouched("email")}
        />
      </FormField>

      <AppointmentDateTimePicker
        preferredDate={preferredDate}
        preferredTime={preferredTime}
        dateError={showError("preferredDate")}
        timeError={showError("preferredTime")}
        onInteract={clearStatusOnEdit}
        onDateChange={(value) => {
          clearStatusOnEdit();
          setPreferredDate(value);
          markTouched("preferredDate");
        }}
        onTimeChange={(value) => {
          clearStatusOnEdit();
          setPreferredTime(value);
          markTouched("preferredTime");
        }}
      />

      <FormField label={SITE.form.labels.message} htmlFor="message" error={showError("message")}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          error={Boolean(showError("message"))}
          aria-describedby={getFieldDescribedBy("message", showError("message"))}
          onChange={(event) => {
            clearStatusOnEdit();
            setMessage(event.target.value);
          }}
          onBlur={() => markTouched("message")}
        />
      </FormField>

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
        disabled={isLoading}
      >
        {isLoading ? "Sending…" : SITE.form.submitLabel}
      </Button>
    </form>
  );
}
