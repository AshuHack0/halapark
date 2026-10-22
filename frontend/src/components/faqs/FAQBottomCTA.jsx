"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

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
  if (bottomCta?.enabled === false) return null;

  const heading = (t(bottomCta, "heading", language) || "").trim();
  const description = (t(bottomCta, "description", language) || "").trim();
  const contactLabel = (t(bottomCta, "contactLabel", language) || "").trim();
  const whatsappLabel = (t(bottomCta, "whatsappLabel", language) || "").trim();
  const contactHref = (bottomCta?.contactHref || "").trim() || "/contact";
  // Optional photo for the shaped panel on the right (admin upload).
  const image = (bottomCta?.image || "").trim();
  const whatsappHref = (bottomCta?.whatsappHref || "").trim();

  const showContact = Boolean(contactLabel);
  const showWhatsApp = Boolean(whatsappLabel && whatsappHref);

  // Hide the whole section when everything has been cleared from admin.
  if (!heading && !description && !contactLabel && !whatsappLabel) return null;

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(118deg,#0070D8_0%,#0088FF_45%,#2AA6FF_100%)] px-8 py-12 text-white sm:px-12 sm:py-14 lg:py-16">
          {/* Depth: corner glow, soft rings and a blueprint grid */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_58%)]" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_80%_at_80%_50%,black,transparent)]"
          />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
          {image ? (
            /* ── Photo in an arch panel: rounded hard on two opposite corners,
                  with an offset outline echoing the shape. ── */
            <div aria-hidden className="pointer-events-none absolute inset-y-5 end-5 hidden w-[38%] lg:block">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[150px_24px_150px_24px] border border-white/35 rtl:-translate-x-3 rtl:rounded-[24px_150px_24px_150px]" />
              <div className="absolute inset-0 overflow-hidden rounded-[150px_24px_150px_24px] rtl:rounded-[24px_150px_24px_150px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,110,214,0.72)_0%,rgba(0,110,214,0.15)_60%,transparent_100%)] rtl:bg-[linear-gradient(270deg,rgba(0,110,214,0.72)_0%,rgba(0,110,214,0.15)_60%,transparent_100%)]" />
              </div>
            </div>
          ) : (
            <>
              <div aria-hidden className="pointer-events-none absolute end-[4%] top-1/2 hidden h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-white/25 lg:block" />
              <div aria-hidden className="pointer-events-none absolute end-[9%] top-1/2 hidden h-[250px] w-[250px] -translate-y-1/2 rounded-full border border-white/20 lg:block" />
              {/* Oversized question mark filling the empty right half */}
              <span
                aria-hidden
                className="pointer-events-none absolute end-[12%] top-1/2 hidden -translate-y-1/2 select-none text-[15rem] font-bold leading-none text-white/[0.16] lg:block"
              >
                ?
              </span>
            </>
          )}

          <div className={`relative z-10 flex flex-col items-center gap-8 text-center sm:text-start ${
            image ? "lg:max-w-[56%] lg:items-start" : "sm:flex-row sm:justify-between"
          }`}>
            {heading || description ? (
              <div>
                {heading ? (
                  <h2 className="text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.3rem] [overflow-wrap:anywhere]">
                    {heading}
                  </h2>
                ) : null}
                {description ? (
                  <RichText text={description} className="mt-3 max-w-[520px] text-[0.9rem] leading-7 text-white/85 [overflow-wrap:anywhere] block" />
                ) : null}
              </div>
            ) : null}
            {showContact || showWhatsApp ? (
              <div className={`relative z-10 flex shrink-0 flex-col items-center gap-5 ${image ? "lg:items-start" : "sm:items-end"}`}>
                {!image ? (
                  <span
                    aria-hidden
                    className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm lg:flex"
                  >
                    <MessageCircle className="h-7 w-7 text-white" strokeWidth={1.8} />
                  </span>
                ) : null}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
                {showContact ? (
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0088FF] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:brightness-95"
                  >
                    {contactLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
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
              </div>
            ) : null}
          </div>

          {/* Phones/tablets: the arch photo stacked under the buttons (the
              absolute panel above is lg+ only). */}
          {image ? (
            <div aria-hidden className="relative mt-8 lg:hidden">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px]">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[110px_22px_110px_22px] border border-white/35 rtl:-translate-x-3 rtl:rounded-[22px_110px_22px_110px]" />
                <div className="absolute inset-0 overflow-hidden rounded-[110px_22px_110px_22px] shadow-[0_20px_48px_rgba(0,60,140,0.35)] rtl:rounded-[22px_110px_22px_110px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" className="h-full w-full object-cover object-center" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,110,214,0.35)_0%,transparent_45%)]" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
