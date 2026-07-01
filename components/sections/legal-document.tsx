import Link from "next/link";

import type { LegalDocumentProps } from "@/types";

export function LegalDocument({ intro, sections, showToc = false }: LegalDocumentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {intro ? <p className="mb-10 text-sm leading-relaxed text-muted sm:text-base">{intro}</p> : null}

      {showToc ? (
        <nav aria-label="On this page" className="mb-12 border border-border bg-foreground/2 p-6 sm:p-8">
          <p className="label-caps mb-4 text-muted">On this page</p>
          <ol className="space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link href={`#${section.id}`} className="transition-opacity hover:opacity-60">
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="heading-section mb-4 text-xl sm:text-2xl">{section.title}</h2>

            {section.intro ? (
              <p className="mb-4 text-sm leading-relaxed text-muted sm:text-base">{section.intro}</p>
            ) : null}

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}

            {section.items ? (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
                {section.items.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            ) : null}

            {section.footerNote ? (
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{section.footerNote}</p>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
