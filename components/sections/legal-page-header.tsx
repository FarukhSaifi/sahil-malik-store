import type { LegalPageHeaderProps } from "@/types";

export function LegalPageHeader({ title, subtitle }: LegalPageHeaderProps) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <p className="label-caps mb-4 text-muted">{subtitle}</p>
      <h1 className="heading-section text-3xl sm:text-4xl">{title}</h1>
    </header>
  );
}
