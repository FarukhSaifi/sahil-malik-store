"use client";

import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";
import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(SITE.form.mailtoSubject(name));
    const body = encodeURIComponent(SITE.form.mailtoBody(name, email, message));

    window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block uppercase tracking-[0.2em] text-xs text-muted">
          {SITE.form.labels.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block uppercase tracking-[0.2em] text-xs text-muted">
          {SITE.form.labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block uppercase tracking-[0.2em] text-xs text-muted">
          {SITE.form.labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {SITE.form.submitLabel}
      </Button>
    </form>
  );
}
