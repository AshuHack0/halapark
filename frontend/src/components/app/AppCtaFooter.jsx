"use client";

import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// App-page CTA footer band. CMS shape (page "app" → sections.ctaFooter):
//   { heading, description, stores: [{ key, label, icon, href }], ar: { heading, description } }
// Strict Arabic via t() (no hardcoded fallbacks); every piece hides when blank.
export default function AppCtaFooter() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("app")
      .then((page) => setData(page?.sections?.ctaFooter ?? null))
      .finally(() => setResolved(true));
  }, []);

  if (!resolved) return null;

  const heading = t(data, "heading", language);
  const description = t(data, "description", language);

  // A store renders only with an href AND (icon or label).
  const stores = (Array.isArray(data?.stores) ? data.stores : []).filter(
    (s) => s && (s.href ?? "").trim() && ((s.icon ?? "").trim() || (s.label ?? "").trim()),
  );

  // Hide the whole section when there's nothing to show.
  if (!heading.trim() && !description.trim() && stores.length === 0) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          dir={dir}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,#050A13_0%,#0B1220_42%,#0088FF_140%)] px-6 py-12 shadow-[0_28px_64px_rgba(15,23,42,0.28)] sm:px-10 sm:py-16 lg:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0088FF]/30 blur-[90px] rtl:right-auto rtl:-left-24"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {heading.trim() ? (
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-[3rem] [overflow-wrap:anywhere]">
                {heading}
              </h2>
            ) : null}

            {description.trim() ? (
              <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-300 sm:text-base [overflow-wrap:anywhere]">
                {description}
              </p>
            ) : null}

            {stores.length > 0 ? (
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {stores.map((store, i) => {
                  const icon = (store.icon ?? "").trim();
                  const label = (store.label ?? "").trim();
                  return (
                    <a
                      key={store.key || store.href || i}
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label || "App store"}
                      className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-[#0088FF]/50 hover:bg-white/15"
                    >
                      {icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={icon}
                          alt={label || "Store"}
                          className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
                        />
                      ) : null}
                      {label ? (
                        <span className="[overflow-wrap:anywhere]">{label}</span>
                      ) : null}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
