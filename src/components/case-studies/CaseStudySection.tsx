import Image from "next/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { getImageUrl } from "@/sanity/lib/imageHelpers";

function QuoteDisplay({ quote }: { quote: any }) {
  if (!quote?.quote) return null;
  const isLarge = quote.highlightStyle === "large" || quote.highlightStyle === "accent";
  return (
    <blockquote
      className={`border-l-2 pl-6 my-8 ${
        isLarge ? "border-accent" : "border-border"
      }`}
    >
      <p className={isLarge ? "text-xl text-foreground italic" : "text-muted italic"}>
        “{quote.quote}”
      </p>
      {(quote.author || quote.role) && (
        <footer className="mt-3 text-sm text-muted">
          {quote.author}
          {quote.author && quote.role ? ", " : ""}
          {quote.role}
        </footer>
      )}
    </blockquote>
  );
}

function CalloutDisplay({ callout }: { callout: any }) {
  if (!callout?.title) return null;
  const variantStyles: Record<string, string> = {
    success: "border-accent/40 bg-accent/5",
    warning: "border-yellow-500/40 bg-yellow-500/5",
    info: "border-blue-400/40 bg-blue-400/5",
    neutral: "border-border bg-background-soft/60",
  };
  return (
    <div
      className={`rounded-xl border p-6 my-8 ${
        variantStyles[callout.variant] || variantStyles.neutral
      }`}
    >
      <p className="font-semibold mb-1">{callout.title}</p>
      {callout.description && (
        <p className="text-sm text-muted leading-relaxed">{callout.description}</p>
      )}
    </div>
  );
}

export function CaseStudySection({ section }: { section: any }) {
  const bgClass =
    section.backgroundStyle === "soft"
      ? "bg-background-soft/40 rounded-2xl p-8"
      : section.backgroundStyle === "accent"
      ? "bg-accent/5 rounded-2xl p-8"
      : "";

  return (
    <section
      id={section.anchorId?.current}
      className={`scroll-mt-32 mb-16 ${bgClass}`}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="text-muted mb-6">{section.subtitle}</p>
      )}

      <div className={section.twoColumnLayout ? "grid md:grid-cols-2 gap-8" : ""}>
        <div>
          {section.content && <PortableTextRenderer value={section.content} />}

          {section.challengeBlocks?.map((b: any, i: number) => (
            <div key={i} className="mb-8">
              {b.heading && <h3 className="text-lg font-semibold mb-2">{b.heading}</h3>}
              {b.richText && <PortableTextRenderer value={b.richText} />}
            </div>
          ))}

          {section.solutionBlocks?.map((b: any, i: number) => (
            <div key={i} className="mb-8">
              {b.heading && <h3 className="text-lg font-semibold mb-2">{b.heading}</h3>}
              {b.richText && <PortableTextRenderer value={b.richText} />}
              {b.diagramImage && (
                <div className="relative w-full h-64 rounded-xl overflow-hidden mt-4">
                  <Image
                    src={getImageUrl(b.diagramImage, 900)}
                    alt={b.heading || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {section.resultBlocks?.map((b: any, i: number) => (
            <div key={i} className="mb-8">
              {b.heading && <h3 className="text-lg font-semibold mb-2">{b.heading}</h3>}
              {b.richText && <PortableTextRenderer value={b.richText} />}
              {b.quote && <QuoteDisplay quote={b.quote} />}
            </div>
          ))}

          {section.timelineItems?.length > 0 && (
            <div className="space-y-6 border-l border-border pl-6">
              {section.timelineItems.map((t: any, i: number) => (
                <div key={i}>
                  <p className="text-xs font-mono text-accent uppercase tracking-wide">
                    {t.phase}
                  </p>
                  <p className="font-semibold mt-1">{t.title}</p>
                  {t.description && (
                    <p className="text-sm text-muted mt-1">{t.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {section.technologies.map((t: any, i: number) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1.5 border border-border rounded-full text-muted"
                >
                  {t.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {section.twoColumnLayout && section.image && (
          <div className="relative w-full h-72 rounded-xl overflow-hidden">
            <Image
              src={getImageUrl(section.image, 900)}
              alt={section.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {!section.twoColumnLayout && section.image && (
        <div className="relative w-full h-80 rounded-xl overflow-hidden my-6">
          <Image
            src={getImageUrl(section.image, 1200)}
            alt={section.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {section.quote && !section.resultBlocks?.length && (
        <QuoteDisplay quote={section.quote} />
      )}
      {section.callout && <CalloutDisplay callout={section.callout} />}

      {section.showDivider && <div className="border-t border-border mt-12" />}
    </section>
  );
}