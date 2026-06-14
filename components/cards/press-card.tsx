import type { PressCardProps } from "@/types";

export function PressCard({ item }: PressCardProps) {
  return (
    <article className="flex flex-col justify-between border border-border p-6 sm:p-8 min-h-[240px]">
      <blockquote className="font-display text-xl font-light italic leading-relaxed sm:text-2xl">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-8">
        <p className="uppercase tracking-[0.2em] text-xs">{item.publication}</p>
        <p className="mt-1 text-sm text-muted">{item.date}</p>
      </div>
    </article>
  );
}
