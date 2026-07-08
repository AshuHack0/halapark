"use client";

import { useEffect, useState } from "react";

import { useLanguage, t } from "@/context/LanguageContext";
import { fetchPage } from "@/lib/cms";

import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactMapSection from "./ContactMapSection";
import WhatsAppSection from "./WhatsAppSection";

// CMS-only page: the DB is the single source of truth (seeded). No hardcoded
// fallbacks — anything deleted from the database simply doesn't render.
export default function ContactSection() {
  const { language } = useLanguage();
  const [sections, setSections] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage("contact")
      .then((page) => {
        if (active) setSections(page?.sections ?? null);
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!resolved) return null;

  const hero = sections?.hero;
  const eyebrow = t(hero, "eyebrow", language);
  const heading = t(hero, "heading", language);
  const subtitle = t(hero, "description", language);

  return (
    <section className="bg-[linear-gradient(180deg,rgba(0,136,255,0.06)_0%,#FFFFFF_20%,#FFFFFF_100%)] pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hero?.enabled !== false && (eyebrow || heading || subtitle) ? (
          <div className="max-w-3xl">
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF] [overflow-wrap:anywhere]">
                {eyebrow}
              </span>
            ) : null}
            {heading ? (
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl [overflow-wrap:anywhere]">
                {heading}
              </h1>
            ) : null}
            {subtitle ? (
              <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Each block hides when its admin "Show this section" toggle is off
            (enabled === false). Undefined/true → show. */}
        {(sections?.details?.enabled !== false || sections?.form?.enabled !== false) ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            {sections?.details?.enabled !== false && (
              <ContactInfoPanel details={sections?.details} />
            )}
            {sections?.form?.enabled !== false && (
              <ContactFormPanel form={sections?.form} />
            )}
          </div>
        ) : null}

        {sections?.whatsappCta?.enabled !== false && (
          <WhatsAppSection whatsappCta={sections?.whatsappCta} />
        )}
        {sections?.map?.enabled !== false && (
          <ContactMapSection map={sections?.map} />
        )}
      </div>
    </section>
  );
}
