import type { FaqListProps } from "@/types";

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.id} className="group py-6">
          <summary className="cursor-pointer list-none font-display text-lg font-light leading-snug text-foreground marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
