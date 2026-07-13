"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { getEmailError, getRequiredError, isFormValid, validateEnquiryPayload } from "@/lib/validation";

import { useEnquiry } from "@/context/enquiry-provider";

import { Button } from "@/components/ui/button";
import { FormField, getFieldDescribedBy } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EnquiryField = "name" | "email" | "phone" | "message";

export function EnquiryForm() {
  const { items, clearAll } = useEnquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Record<EnquiryField, boolean>>({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const errors = useMemo(
    () => ({
      name: getRequiredError(name, SITE.enquiry.errors.nameRequired),
      email: getEmailError(email, SITE.enquiry.errors.emailRequired, SITE.enquiry.errors.emailInvalid),
      phone: undefined,
      message: getRequiredError(message, SITE.enquiry.errors.messageRequired),
      products:
        items.length === 0
          ? SITE.enquiry.errors.noProducts
          : items.length > SITE.enquiry.maxItems
            ? SITE.enquiry.errors.maxProducts
            : undefined,
    }),
    [name, email, message, items.length],
  );

  const canSubmit = isFormValid(errors) && status !== "loading";

  const showError = (field: EnquiryField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const markTouched = (field: EnquiryField) => {
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
      phone: phone.trim() || undefined,
      message: message.trim(),
      products: items.map((item) => ({
        slug: item.productSlug,
        sku: item.sku,
        title: item.title,
      })),
      idempotencyKey: crypto.randomUUID(),
      honeypot,
    };

    const validationError = validateEnquiryPayload(payload);
    if (validationError) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      clearAll();
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSubmitAttempted(false);
      setTouched({ name: false, email: false, phone: false, message: false });
    } catch {
      setStatus("error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center">
        <h2 className="heading-section text-2xl">{SITE.enquiry.emptyTitle}</h2>
        <p className="mt-3 text-sm text-muted">{SITE.enquiry.emptyDescription}</p>
        <Button asChild variant="outline" size="lg" className="label-caps mt-8">
          <Link href={ROUTES.collections}>{SITE.enquiry.emptyCta}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <p className="label-caps mb-3 text-muted">{SITE.enquiry.productSummaryLabel}</p>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.productSlug}>
              <span className="text-muted">{item.sku}</span> — {item.title}
            </li>
          ))}
        </ul>
      </div>

      {errors.products && submitAttempted ? (
        <p className="text-sm text-destructive" role="alert">
          {errors.products}
        </p>
      ) : null}

      <div className="sr-only" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <FormField label={SITE.enquiry.labels.name} htmlFor="enquiry-name" error={showError("name")}>
        <Input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          error={Boolean(showError("name"))}
          aria-describedby={getFieldDescribedBy("enquiry-name", showError("name"))}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => markTouched("name")}
        />
      </FormField>

      <FormField label={SITE.enquiry.labels.email} htmlFor="enquiry-email" error={showError("email")}>
        <Input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          error={Boolean(showError("email"))}
          aria-describedby={getFieldDescribedBy("enquiry-email", showError("email"))}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => markTouched("email")}
        />
      </FormField>

      <FormField label={SITE.enquiry.labels.phone} htmlFor="enquiry-phone">
        <Input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          onBlur={() => markTouched("phone")}
        />
      </FormField>

      <FormField label={SITE.enquiry.labels.message} htmlFor="enquiry-message" error={showError("message")}>
        <Textarea
          id="enquiry-message"
          name="message"
          rows={5}
          value={message}
          error={Boolean(showError("message"))}
          aria-describedby={getFieldDescribedBy("enquiry-message", showError("message"))}
          onChange={(event) => setMessage(event.target.value)}
          onBlur={() => markTouched("message")}
        />
      </FormField>

      {status === "success" ? (
        <p className="text-sm text-foreground" role="status">
          {SITE.enquiry.submitSuccess}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {SITE.enquiry.submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="outlineInvert"
        size="lg"
        className="label-caps w-full sm:w-auto"
        disabled={!canSubmit}
      >
        {status === "loading" ? "Sending…" : SITE.enquiry.submitLabel}
      </Button>
    </form>
  );
}
