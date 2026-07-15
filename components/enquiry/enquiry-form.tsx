"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import {
  getEmailError,
  getPreferredDateError,
  getPreferredTimeError,
  getRequiredError,
  isFormValid,
} from "@/lib/validation";

import { useEnquiry } from "@/context/enquiry-provider";

import { AppointmentDateTimePicker } from "@/components/ui/appointment-datetime-picker";
import { Button } from "@/components/ui/button";
import { FormField, getFieldDescribedBy } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { EnquiryFormField } from "@/types";

export function EnquiryForm() {
  const router = useRouter();
  const { items, clearAll } = useEnquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState<Record<EnquiryFormField, boolean>>({
    name: false,
    email: false,
    phone: false,
    preferredDate: false,
    preferredTime: false,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const errors = useMemo(
    () => ({
      name: getRequiredError(name, SITE.enquiry.errors.nameRequired),
      email: getEmailError(email, SITE.enquiry.errors.emailRequired, SITE.enquiry.errors.emailInvalid),
      phone: undefined,
      preferredDate: getPreferredDateError(
        preferredDate,
        SITE.enquiry.errors.preferredDateRequired,
        SITE.enquiry.errors.preferredDateInvalid,
      ),
      preferredTime: getPreferredTimeError(preferredTime, SITE.enquiry.errors.preferredTimeRequired),
      message: getRequiredError(message, SITE.enquiry.errors.messageRequired),
      products:
        items.length === 0
          ? SITE.enquiry.errors.noProducts
          : items.length > SITE.enquiry.maxItems
            ? SITE.enquiry.errors.maxProducts
            : undefined,
    }),
    [name, email, preferredDate, preferredTime, message, items.length],
  );

  const isLoading = status === "loading";
  const showError = (field: EnquiryFormField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const markTouched = (field: EnquiryFormField) => {
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

    // Always clear honeypot on submit — autofill of hidden fields was blocking the API call.
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      preferredDate: preferredDate.trim(),
      preferredTime: preferredTime.trim(),
      message: message.trim(),
      products: items.map((item) => ({
        slug: item.productSlug,
        sku: item.sku,
        title: item.title,
        imageSrc: item.imageSrc,
        collectionTitle: item.collectionTitle,
      })),
      idempotencyKey: crypto.randomUUID(),
      honeypot: "",
    };

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

      clearAll();
      router.push(SITE.routes.thankYou);
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
    <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
      <div>
        <p className="label-caps mb-3 text-muted">{SITE.enquiry.productSummaryLabel}</p>
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.productSlug}>
              <span className="text-muted">{item.sku}</span> — {item.title}
              {item.collectionTitle ? <span className="text-muted"> · {item.collectionTitle}</span> : null}
            </li>
          ))}
        </ul>
      </div>

      {errors.products && submitAttempted ? (
        <p className="text-sm text-destructive" role="alert">
          {errors.products}
        </p>
      ) : null}

      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="enquiry-fax-number">Fax</label>
        <input
          id="enquiry-fax-number"
          name="fax_number"
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
          onChange={(event) => {
            clearStatusOnEdit();
            setName(event.target.value);
          }}
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
          onChange={(event) => {
            clearStatusOnEdit();
            setEmail(event.target.value);
          }}
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
          onChange={(event) => {
            clearStatusOnEdit();
            setPhone(event.target.value);
          }}
          onBlur={() => markTouched("phone")}
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

      <FormField label={SITE.enquiry.labels.message} htmlFor="enquiry-message" error={showError("message")}>
        <Textarea
          id="enquiry-message"
          name="message"
          rows={5}
          value={message}
          error={Boolean(showError("message"))}
          aria-describedby={getFieldDescribedBy("enquiry-message", showError("message"))}
          onChange={(event) => {
            clearStatusOnEdit();
            setMessage(event.target.value);
          }}
          onBlur={() => markTouched("message")}
        />
      </FormField>

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
        disabled={isLoading}
      >
        {isLoading ? "Sending…" : SITE.enquiry.submitLabel}
      </Button>
    </form>
  );
}
