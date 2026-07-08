"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1];

// Shared hook: fetch the partnersShowcase section once (each of the 3 sections
// reads the parts it needs). CMS-only — no hardcoded content fallbacks.
function usePartnersShowcase() {
  const [showcase, setShowcase] = useState(null);
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    let active = true;
    fetchBusinessSection("partnersShowcase")
      .then((section) => { if (active) setShowcase(section && typeof section === "object" ? section : {}); })
      .finally(() => { if (active) setResolved(true); });
    return () => { active = false; };
  }, []);
  return { showcase: showcase ?? {}, resolved };
}

// ─── Section 1: Partner Showcase (image + heading + stats + CTA) ───────────────
export default function PartnersShowcase() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const { showcase, resolved } = usePartnersShowcase();

  if (!resolved) return null;
  if (showcase?.enabled === false) return null;

  const image = (showcase.image || "").trim();
  const heading = (t(showcase, "heading", language) || "").trim();
  const subheading = (t(showcase, "subheading", language) || "").trim();
  const description = (t(showcase, "description", language) || "").trim();
  const stats = Array.isArray(showcase.stats) ? showcase.stats.filter((s) => s && (s.value || s.label)) : [];
  const ctaLabel = (t(showcase, "ctaLabel", language) || "").trim();
  const ctaLink = (showcase.ctaLink || "").trim();

  // Hide when nothing to show.
  if (!image && !heading && !subheading && !description && stats.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left: Image (only when set — no hardcoded fallback) */}
          {image ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="relative h-80 sm:h-96 lg:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,136,255,0.15)] border border-[#E7EAF0]"
            >
              <Image src={image} alt={heading || "Trusted Partners"} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/20 to-transparent" />
            </motion.div>
          ) : null}

          {/* Right: Content */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.2 }}
            className={image ? "" : "lg:col-span-2"}
          >
            {heading || t(showcase, "headingGradient", language) ? (
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-4 [overflow-wrap:anywhere]">
                {heading}{" "}
                {t(showcase, "headingGradient", language) ? (
                  <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                    {t(showcase, "headingGradient", language)}
                  </span>
                ) : null}
              </h2>
            ) : null}
            {subheading ? (
              <h3 className="text-3xl sm:text-4xl font-bold text-[#050A13] mb-6 [overflow-wrap:anywhere]">{subheading}</h3>
            ) : null}
            {description ? (
              <p className="text-base leading-7 text-slate-600 mb-8 [overflow-wrap:anywhere] whitespace-pre-line">{description}</p>
            ) : null}

            {stats.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label || i}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
                    className="rounded-[20px] border border-[#E7EAF0] bg-gradient-to-br from-[#F8FAFC] to-white p-4 text-center"
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-[#050A13]">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 [overflow-wrap:anywhere]">{t(stat, "label", language)}</p>
                  </motion.div>
                ))}
              </div>
            ) : null}

            {ctaLabel ? (
              <Link
                href={ctaLink || "/contact"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0088FF]/30 transition"
              >
                <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">{ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Marquee row for the carousel ──────────────────────────────────────────────
function MarqueeRow({ partners, reverse = false, language }) {
  const doubled = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`} style={{ width: "max-content" }}>
        {doubled.map((p, i) => (
          <div key={`${p.name}-${i}`} className="flex w-[200px] shrink-0 items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm hover:shadow-md transition">
            {p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.logo} alt={p.name || ""} className="h-10 w-10 shrink-0 rounded-[10px] object-contain" />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white" style={{ background: p.color || "#0088FF" }}>
                {p.initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-[0.82rem] font-semibold text-[#050A13]">{t(p, "name", language)}</p>
              <p className="text-[0.72rem] text-slate-400">{t(p, "industry", language)}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
      `}</style>
    </div>
  );
}

// ─── Section 2: Partner Carousel (logo marquee) ────────────────────────────────
export function PartnerCarousel() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const { showcase, resolved } = usePartnersShowcase();

  if (!resolved) return null;
  // Independent enable flag stored on the carousel object.
  if (showcase?.carousel?.enabled === false) return null;

  const row1 = Array.isArray(showcase.partners?.row1) ? showcase.partners.row1.filter((p) => p && (p.name || p.logo || p.initials)) : [];
  const row2 = Array.isArray(showcase.partners?.row2) ? showcase.partners.row2.filter((p) => p && (p.name || p.logo || p.initials)) : [];
  const all = [...row1, ...row2];
  const heading = (t(showcase, "carouselHeading", language) || "").trim();
  const subheading = (t(showcase, "carouselSubheading", language) || "").trim();

  // Hide when there are no partners and no heading.
  if (all.length === 0 && !heading && !subheading) return null;

  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="pt-16 border-t border-[#E7EAF0]"
        >
          {(heading || subheading) ? (
            <div className="mb-12">
              {heading ? (
                <h3 dir={language === "ar" ? "rtl" : "ltr"} className="text-2xl sm:text-3xl font-bold text-[#050A13] text-center mb-2 [overflow-wrap:anywhere]">{heading}</h3>
              ) : null}
              {subheading ? (
                <p dir={language === "ar" ? "rtl" : "ltr"} className="text-center text-slate-600 [overflow-wrap:anywhere]">{subheading}</p>
              ) : null}
            </div>
          ) : null}

          {all.length > 0 ? (
            !reduced ? (
              <div className="space-y-4 overflow-hidden">
                {row1.length > 0 ? <MarqueeRow partners={row1} language={language} /> : null}
                {row2.length > 0 ? <MarqueeRow partners={row2} reverse language={language} /> : null}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {all.map((p, i) => (
                  <div key={`${p.name}-${i}`} className="flex items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm">
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={p.name || ""} className="h-10 w-10 shrink-0 rounded-[10px] object-contain" />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white" style={{ background: p.color || "#0088FF" }}>{p.initials}</span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[0.82rem] font-semibold text-[#050A13]">{t(p, "name", language)}</p>
                      <p className="text-[0.72rem] text-slate-400">{t(p, "industry", language)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 3: Partner CTA ("Ready to Partner" / Get in Touch) ────────────────
export function PartnerCTA() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const { showcase, resolved } = usePartnersShowcase();

  if (!resolved) return null;
  const cta = showcase.ctaSection || {};
  if (cta?.enabled === false) return null;

  const image = (cta.image || "").trim();
  const title = (t(cta, "title", language) || "").trim();
  const description = (t(cta, "description", language) || "").trim();
  const label = (t(showcase, "ctaSectionLabel", language) || "").trim();
  const link = (showcase.ctaSectionLink || "").trim();

  if (!title && !description && !label && !image) return null;

  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[28px] bg-[#06111f]"
        >
          {image ? (
            <div className="absolute inset-0">
              <Image src={image} alt="" fill className="object-cover object-center opacity-60" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/50" />
            </div>
          ) : null}
          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
            {title ? (
              <h3 className="max-w-[580px] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white [overflow-wrap:anywhere]">{title}</h3>
            ) : null}
            {description ? (
              <p className="mx-auto mt-3 max-w-[500px] text-[0.88rem] leading-6 text-white/60 sm:text-[0.94rem] [overflow-wrap:anywhere] whitespace-pre-line">{description}</p>
            ) : null}
            {label ? (
              <Link
                href={link || "/contact"}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
              >
                <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">{label}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
