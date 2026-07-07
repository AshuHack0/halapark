"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// CMS-only section (sections.bottomCta): the DB is the single source of truth.
// No hardcoded fallbacks — anything deleted from the database simply doesn't render.
export default function FAQBottomCTA() {
  const { language } = useLanguage();
  const [bottomCta, setBottomCta] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage("faqs")
      .then((data) => {
        if (active) setBottomCta(data?.sections?.bottomCta ?? null);
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!resolved) return null;

  const heading = (t(bottomCta, "heading", language) || "").trim();
  const description = (t(bottomCta, "description", language) || "").trim();
  const contactLabel = (t(bottomCta, "contactLabel", language) || "").trim();
  const whatsappLabel = (t(bottomCta, "whatsappLabel", language) || "").trim();
  const contactHref = (bottomCta?.contactHref || "").trim() || "/contact";
  const whatsappHref = (bottomCta?.whatsappHref || "").trim();

  const showContact = Boolean(contactLabel);
  const showWhatsApp = Boolean(whatsappLabel && whatsappHref);

  // Hide the whole section when everything has been cleared from admin.
  if (!heading && !description && !contactLabel && !whatsappLabel) return null;

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0088FF] px-8 py-12 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" aria-hidden />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            {heading || description ? (
              <div>
                {heading ? (
                  <h2 className="mt-2 text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem] [overflow-wrap:anywhere]">
                    {heading}
                  </h2>
                ) : null}
                {description ? (
                  <p className="mt-2 max-w-[480px] text-[0.88rem] leading-6 text-white/75 [overflow-wrap:anywhere]">
                    {description}
                  </p>
                ) : null}
              </div>
            ) : null}
            {showContact || showWhatsApp ? (
              <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
                {showContact ? (
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0088FF] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:brightness-95"
                  >
                    {contactLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
                {showWhatsApp ? (
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {whatsappLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
