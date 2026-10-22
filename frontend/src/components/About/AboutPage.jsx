"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Check, Zap, CreditCard, Shield, BarChart3,
  Cpu, Leaf, Building2, Car, Network, CalendarCheck,
  Target, Eye, Globe, Users, TrendingUp, Sparkles,
} from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { PARTNER_FORM_LINK } from "@/components/partners/PartnershipFormProvider";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero (light split layout) ──────────────────────────────────────────────────

// About layout: a fanned FRONT/BACK card deck — the front card cycles to the
// back on a timer, so every added image gets its own card in the stack (like
// the Business hero), plus a thumbnail rail + step counter.

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

// A slide's media may be an image OR a video file (same admin field).
const isVideoSrc = (src = "") => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(src);

function SlideMedia({ src, alt, sizes, priority = false }) {
  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    );
  }
  return (
    <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-center" priority={priority} />
  );
}

function AboutVisual({ slides, language, reduced, hero }) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (reduced || count < 2) return undefined;
    const id = setInterval(() => setActive((p) => (p + 1) % count), 3400);
    return () => clearInterval(id);
  }, [reduced, count]);

  if (count === 0) return null;

  const index = active % count;

  // Floating badges — CMS-driven; each hides entirely when its text is blank.
  const badge1Title = t(hero, "badge1Title", language);
  const badge1Subtitle = t(hero, "badge1Subtitle", language);
  const badge2Value = t(hero, "badge2Value", language);
  const badge2Label = t(hero, "badge2Label", language);

  return (
    <div className="relative w-full max-w-[720px] pb-6 sm:pb-0">
      {/* Pale blob behind the panel's upper-left, and the deep-blue sweep that
          runs out past the bottom-right — straight from the reference */}
      <div aria-hidden className="pointer-events-none absolute -left-[8%] -top-[12%] h-[72%] w-[78%] rounded-[50%] bg-[#BFE0FF] opacity-90 blur-[2px] rtl:left-auto rtl:-right-[8%]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[16%] -right-[28%] left-[16%] top-[30%] -rotate-[8deg] rounded-[55%_45%_50%_50%/60%_40%_60%_40%] bg-[linear-gradient(120deg,#8CC4FF_0%,#3F9BFF_55%,#1A7CFF_100%)] rtl:right-auto rtl:-left-[28%] rtl:rotate-[8deg]" />
      <div aria-hidden className="pointer-events-none absolute -right-[4%] -top-[14%] h-16 w-36 bg-[radial-gradient(rgba(0,136,255,0.35)_2px,transparent_2.2px)] bg-[size:16px_16px] rtl:right-auto rtl:-left-[4%]" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="relative z-20 grid gap-4 sm:grid-cols-[1fr_150px] sm:gap-6"
      >
        {/* Main panel: landscape, tilted, thick white rim, crossfading slides */}
        <div className="relative mx-3 aspect-[5/4] rotate-[2deg] overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_34px_70px_rgba(15,23,42,0.26)] ring-4 ring-white sm:mx-0 sm:rotate-[4deg] sm:rounded-[30px] sm:ring-[6px] rtl:-rotate-[2deg] rtl:sm:-rotate-[4deg]">
          {slides.map((slide, i) => {
            const isActive = i === index;
            const label = language === "ar" ? (slide.ar?.label ?? "") : (slide.label ?? "");
            return (
              <motion.div
                key={`${slide.img}-${i}`}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0"
                style={{ zIndex: isActive ? 2 : 1 }}
              >
                <SlideMedia
                  src={slide.img}
                  alt={label}
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 70vw, 92vw"
                  priority={i === 0}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Thumbnail rail: stacked on a thin connector; the active one gets a
            hollow blue dot, the others a filled dot. */}
        {count > 1 ? (
          <div className="relative flex flex-row justify-center gap-2.5 px-3 sm:flex-col sm:justify-center sm:gap-5 sm:px-0 sm:ps-5">
            <span aria-hidden className="absolute inset-y-4 start-[6px] hidden w-px bg-[#0088FF]/35 sm:block" />
            {slides.map((s, i) => (
              <button
                key={`rail-${s.img}-${i}`}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setActive(i)}
                className="group relative flex w-[calc(25%-8px)] max-w-[80px] items-center sm:w-auto sm:max-w-none"
              >
                <span
                  aria-hidden
                  className={`absolute -start-[14px] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 sm:block ${
                    i === index ? "h-3.5 w-3.5 border-[3px] border-[#0088FF] bg-white" : "h-2.5 w-2.5 bg-[#2F8FEF]"
                  }`}
                />
                <span
                  className={`relative block aspect-[4/3] w-full overflow-hidden rounded-[14px] shadow-[0_10px_24px_rgba(15,23,42,0.16)] ring-[3px] transition-all duration-300 sm:rounded-[16px] ${
                    i === index ? "ring-[#0088FF]" : "ring-white group-hover:ring-[#0088FF]/50"
                  }`}
                >
                  {isVideoSrc(s.img) ? (
                    <video src={s.img} muted preload="metadata" playsInline className="absolute inset-0 h-full w-full object-cover object-center" />
                  ) : (
                    <Image src={s.img} alt="" fill sizes="150px" className="object-cover object-center" />
                  )}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </motion.div>
      {/* Floating stat ribbon (top-left) — CMS-driven, hidden when blank */}
      {hasText(badge1Title) || hasText(badge1Subtitle) ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          className="absolute left-0 -top-4 z-40 scale-90 sm:left-[-8%] sm:top-2 sm:scale-100 lg:left-[-16%] lg:top-4"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_18px_46px_rgba(15,23,42,0.18)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <div dir={language === "ar" ? "rtl" : "ltr"}>
              {hasText(badge1Title) ? (
                <p className="text-[1.05rem] font-bold leading-none tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">{badge1Title}</p>
              ) : null}
              {hasText(badge1Subtitle) ? (
                <p className="mt-1 text-[10px] font-medium text-slate-400 [overflow-wrap:anywhere]">{badge1Subtitle}</p>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Floating mini chip (bottom-right) — CMS-driven, hidden when blank */}
      {hasText(badge2Value) || hasText(badge2Label) ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 14, rotate: 5 }}
          animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
          transition={{ duration: 0.6, ease, delay: 0.6 }}
          className="absolute bottom-[10%] right-0 z-40 scale-90 sm:bottom-[14%] sm:right-[-6%] sm:scale-100 lg:right-[-14%]"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.14)]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(22,179,100,0.12)]">
              <Check className="h-3 w-3 text-[#16B364]" strokeWidth={3} aria-hidden />
            </span>
            <p className="text-[10px] font-semibold text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
              {hasText(badge2Value) ? <span className="text-[#0088FF]">{badge2Value} </span> : null}
              {badge2Label}
            </p>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

function AboutHero({ hero }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (hero?.enabled === false) return null;

  const heroSlides = (hero?.images ?? []).filter((s) => hasText(s?.img));

  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_38%,#F0F7FF_66%,#EAF3FF_100%)]"
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,black,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-[12%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_38%_38%,rgba(0,136,255,0.12),transparent_68%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-28 bottom-[4%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10),transparent_66%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0088FF]/20 to-transparent" />

      {/* Faint city skyline along the bottom (reference), drawn inline so no asset is needed */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[120px] sm:h-[150px] lg:h-[180px]">
        <svg viewBox="0 0 1600 180" preserveAspectRatio="none" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="about-skyline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9CC9FF" stopOpacity="0.55" />
              <stop offset="1" stopColor="#CFE4FF" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            fill="url(#about-skyline)"
            d="M0 180V120h40v-18h22v18h30V84h26v36h34V70h18V50h10v20h18v50h30V96h24v24h26V60h22v60h30V88h28v32h36V74h22v46h40V96h26v24h22V40h12l4-22 4 22h12v80h30V70h20V48h18v22h22v50h34V92h26v28h26V56h24v64h34V104h28v16h44V78h18V60h14v18h18v42h30V98h24v22h30V68h26v52h36V86h28v34h40V98h26v22h24V34h8l3-26 3 26h8v86h30V72h22v48h30V94h24v26h28V58h22v62h34V104h24v16h30V74h24v46h26V90h22v30h30V66h22v54h40V100h24v20h28V80h20v40h34V96h22v24h26V72h22v48h22V180H0Z"
          />
          <rect x="0" y="150" width="1600" height="30" fill="#DCEBFF" opacity="0.8" />
        </svg>
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 pb-44 pt-16 sm:px-6 sm:pb-44 sm:pt-20 lg:px-8 lg:pb-48 lg:pt-24">
        <div className="lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 xl:gap-14">

          {/* LEFT — text */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {hasText(hero?.title) || hasText(t(hero, "titleAccent", language)) ? (
              <h1 className="max-w-[640px] text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#050A13] [overflow-wrap:anywhere]">
                {hasText(hero?.title) ? <span className="block">{t(hero, "title", language)}</span> : null}
                {/* Accent line in brand blue (admin "Title Accent"; hidden when blank) */}
                {hasText(t(hero, "titleAccent", language)) ? (
                  <span className="block text-[#0088FF]">{t(hero, "titleAccent", language)}</span>
                ) : null}
              </h1>
            ) : null}

            {t(hero, "tagline", language) ? (
              <p className="mt-5 text-[clamp(1.05rem,1.5vw,1.35rem)] font-medium tracking-[-0.02em] text-[#0A1B33] [overflow-wrap:anywhere]">
                {t(hero, "tagline", language)}
              </p>
            ) : null}

            {hasText(hero?.description) ? (
              <RichText
                text={t(hero, "description", language)}
                className="mt-5 max-w-[470px] text-[0.95rem] leading-[1.75] text-slate-500 [overflow-wrap:anywhere] block"
              />
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {hasText(hero?.primaryCtaText) ? (
                <Link
                  href={hero?.primaryCtaLink || "/contact"}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                >
                  {t(hero, "primaryCtaText", language)}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                  </span>
                </Link>
              ) : null}
              {t(hero, "secondaryCtaText", language) ? (
                <Link
                  href={hero?.secondaryCtaLink || "/contact"}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#0088FF] bg-white px-7 py-3 text-sm font-semibold text-[#0A1B33] transition hover:bg-[#EEF6FF]"
                >
                  {t(hero, "secondaryCtaText", language)}
                </Link>
              ) : null}
            </div>
          </motion.div>

          {/* RIGHT — imagery collage */}
          {heroSlides.length > 0 ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.1 }}
              className="relative mt-16 flex min-h-[380px] items-center justify-center lg:mt-0 lg:min-h-[520px]"
            >
              <AboutVisual slides={heroSlides} language={language} reduced={reduced} hero={hero} />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Who We Are ───────────────────────────────────────────────────────────────

function AboutIntro() {
  const reduced = useReducedMotion();
  const stats = [
    { value: "8+",  label: "Years of Experience" },
    { value: "120+", label: "Locations" },
    { value: "40+", label: "Enterprise Clients" },
    { value: "1M+", label: "Monthly Transactions" },
  ];
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13]">
              Born in Dubai.<br />Built for the Future.
            </h2>
            <div className="mt-8 space-y-5 text-[0.93rem] leading-7 text-slate-500">
              <p>
                HalaPark is transforming how cities, businesses, and communities experience parking. What was once fragmented, stressful, and time-consuming is now evolving into a seamless digital journey powered by smart technology, automation, and integrated mobility solutions.
              </p>
              <p className="font-medium text-[#050A13]">
                Born in Dubai and built for the future of urban movement, HalaPark transforms traditional parking into intelligent infrastructure where drivers, property owners, businesses, and cities move effortlessly together.
              </p>
              <p>
                Through AI-powered automation, digital access, real-time visibility, and operational intelligence, HalaPark delivers future-ready mobility solutions built for modern cities and next-generation developments.
              </p>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.12 }} className="flex flex-col gap-3">
            {/* Photo */}
            <div className="relative h-52 w-full overflow-hidden rounded-[20px] sm:h-60">
              <Image src="/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" alt="HalaPark parking facility" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
            </div>
            {/* Stats grid below photo */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-[#E0EAFF]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-start bg-white px-6 py-6">
                  <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-[#050A13]">{stat.value}</p>
                  <p className="mt-1.5 text-[0.75rem] font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Mission ──────────────────────────────────────────────────────────────────

function OurMission({ mission }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (mission?.enabled === false) return null;

  const paragraphs = (mission?.paragraphs ?? [])
    .map((paragraph, i) => (language === "ar" ? (mission?.ar?.paragraphs?.[i] ?? "") : paragraph))
    .filter(hasText);
  const hasContent =
    hasText(mission?.title) ||
    hasText(mission?.subtitle) ||
    (mission?.paragraphs ?? []).some(hasText) ||
    hasText(mission?.image);
  if (!hasContent) return null;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease }}
          className="group overflow-hidden rounded-[32px] border border-[#E7EAF0] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy half */}
            <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-14" dir={language === "ar" ? "rtl" : "ltr"}>
              {hasText(mission?.title) ? (
                <h2 className="mb-3 text-[clamp(2.2rem,3.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                  {t(mission, "title", language)}
                </h2>
              ) : null}
              {hasText(mission?.subtitle) ? (
                <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500 [overflow-wrap:anywhere]">
                  {t(mission, "subtitle", language)}
                </p>
              ) : null}
              <span aria-hidden="true" className="my-6 block h-1 w-16 rounded-full bg-[linear-gradient(90deg,#0088FF,#1AB2FF)]" />
              {paragraphs.length > 0 ? (
                <div className="space-y-4 text-[0.95rem] leading-7 text-slate-600">
                  {paragraphs.map((para, i) => (
                    <RichText key={`${i}-${para.slice(0, 48)}`} text={para} className="[overflow-wrap:anywhere] block" />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Photo half — bleeds to the panel edge */}
            {mission?.image ? (
              <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[500px] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
                <Image src={mission.image} alt="Smart city mobility" fill className="object-cover object-center transition duration-700 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 48vw, 100vw" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,10,19,0.30)_0%,transparent_45%,rgba(0,136,255,0.18)_100%)]" />
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Vision ───────────────────────────────────────────────────────────────────

function OurVision({ vision }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (vision?.enabled === false) return null;

  const card = vision?.card ?? {};
  const paragraphs = (vision?.paragraphs ?? [])
    .map((paragraph, i) => (language === "ar" ? (vision?.ar?.paragraphs?.[i] ?? "") : paragraph))
    .filter(hasText);
  const highlights = (card.highlights ?? [])
    .map((item, i) => (language === "ar" ? (card.ar?.highlights?.[i] ?? null) : item))
    .filter((item) => hasText(item?.line1) || hasText(item?.line2));
  const cardHasContent =
    hasText(card.badge) ||
    hasText(card.title) ||
    hasText(card.subtitle) ||
    (card.highlights ?? []).some((h) => hasText(h?.line1) || hasText(h?.line2));
  const hasContent =
    hasText(vision?.title) ||
    hasText(vision?.subtitle) ||
    (vision?.paragraphs ?? []).some(hasText) ||
    hasText(vision?.image) ||
    cardHasContent;
  if (!hasContent) return null;

  return (
    <section className="bg-[#F4F8FF] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease }}
          className="group relative overflow-hidden rounded-[28px] bg-[#02376B] shadow-[0_26px_70px_rgba(2,55,107,0.32)] ring-1 ring-white/15"
        >
          {/* The whole panel is dark here — the page reads light · dark · light */}
          <div className="absolute inset-0">
            {vision?.image ? (
              <Image src={vision.image} alt="" fill className="object-cover object-center transition duration-700 group-hover:scale-[1.03]" sizes="100vw" aria-hidden />
            ) : null}
            {/* Dark on the copy side, clearing toward the photo so the upload
                is actually visible. Mirrors for Arabic. */}
            <div className="absolute inset-0 max-lg:!bg-[linear-gradient(180deg,#02376B_0%,rgba(1,48,94,0.96)_52%,rgba(1,48,94,0.55)_78%,rgba(1,48,94,0.35)_100%)] bg-[linear-gradient(95deg,#02376B_0%,rgba(1,49,95,0.97)_30%,rgba(0,45,88,0.72)_46%,rgba(0,45,88,0.12)_62%,rgba(0,45,88,0)_100%)] rtl:bg-[linear-gradient(265deg,#02376B_0%,rgba(1,49,95,0.97)_30%,rgba(0,45,88,0.72)_46%,rgba(0,45,88,0.12)_62%,rgba(0,45,88,0)_100%)]" />
            <div aria-hidden="true" className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#0088FF]/20 blur-[90px]" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1AB2FF]/50 to-transparent" />
          </div>

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy half */}
            <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:py-16 lg:ps-16 lg:pe-10" dir={language === "ar" ? "rtl" : "ltr"}>
              {hasText(vision?.title) ? (
                <h2 className="mb-4 text-[clamp(2.4rem,3.9vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
                  {t(vision, "title", language)}
                </h2>
              ) : null}
              {hasText(vision?.subtitle) ? (
                <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] font-normal leading-snug tracking-[-0.02em] text-[#4DB2FF] [overflow-wrap:anywhere]">
                  {t(vision, "subtitle", language)}
                </p>
              ) : null}
              <span aria-hidden="true" className="my-7 block h-[3px] w-[72px] rounded-full bg-[#1AB2FF]" />
              {paragraphs.length > 0 ? (
                <div className="space-y-4 text-[0.98rem] leading-[1.9] text-white/85">
                  {paragraphs.map((para, i) => (
                    <RichText key={`${i}-${para.slice(0, 48)}`} text={para} className="[overflow-wrap:anywhere] block" />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Glass card floating on the dark panel */}
            {vision?.image || cardHasContent ? (
              <div className="relative p-6 sm:p-8 lg:p-10" dir={language === "ar" ? "rtl" : "ltr"}>
                <div className="flex h-full flex-col justify-between gap-10 rounded-[22px] border border-white/25 bg-[#02376B]/35 p-7 shadow-[0_18px_44px_rgba(2,8,20,0.35)] backdrop-blur-[1.5px] sm:p-9">
                  <div>
                    {hasText(card.badge) ? (
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#1AB2FF]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white [overflow-wrap:anywhere]">
                          {t(card, "badge", language)}
                        </span>
                      </div>
                    ) : null}
                    {hasText(card.title) ? (
                      <p className="text-[clamp(1.5rem,2.3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
                        {t(card, "title", language)}
                      </p>
                    ) : null}
                    {hasText(card.subtitle) ? (
                      <p className="mt-4 text-[0.95rem] leading-7 text-white/85 [overflow-wrap:anywhere]">{t(card, "subtitle", language)}</p>
                    ) : null}
                  </div>
                  {highlights.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3 divide-x divide-white/25 rtl:divide-x-reverse">
                      {highlights.map((item, i) => (
                        <div key={`${i}-${item.line1}-${item.line2}`} className="text-center">
                          <p className="text-[0.95rem] font-semibold text-white [overflow-wrap:anywhere]">{item.line1}</p>
                          <p className="mt-0.5 text-[0.85rem] text-white/80 [overflow-wrap:anywhere]">{item.line2}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

function OurStory({ story }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (story?.enabled === false) return null;

  const paragraphs = (story?.paragraphs ?? [])
    .map((paragraph, i) => (language === "ar" ? (story?.ar?.paragraphs?.[i] ?? "") : paragraph))
    .filter(hasText);
  const hasContent =
    hasText(story?.title) ||
    hasText(story?.subtitle) ||
    (story?.paragraphs ?? []).some(hasText) ||
    hasText(story?.image);
  if (!hasContent) return null;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease }}
          className="group overflow-hidden rounded-[32px] border border-[#E7EAF0] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
        >
          {/* Photo on the LEFT here so the three panels alternate down the page */}
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            {story?.image ? (
              <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[500px] lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
                <Image src={story.image} alt="HalaPark story" fill className="object-cover object-center transition duration-700 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 48vw, 100vw" />
                <div className="absolute inset-0 bg-[linear-gradient(300deg,rgba(5,10,19,0.30)_0%,transparent_45%,rgba(0,136,255,0.18)_100%)]" />
              </div>
            ) : null}

            <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-14" dir={language === "ar" ? "rtl" : "ltr"}>
              {hasText(story?.title) ? (
                <h2 className="mb-3 text-[clamp(2.2rem,3.4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                  {t(story, "title", language)}
                </h2>
              ) : null}
              {hasText(story?.subtitle) ? (
                <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500 [overflow-wrap:anywhere]">
                  {t(story, "subtitle", language)}
                </p>
              ) : null}
              <span aria-hidden="true" className="my-6 block h-1 w-16 rounded-full bg-[linear-gradient(90deg,#0088FF,#1AB2FF)]" />
              {paragraphs.length > 0 ? (
                <div className="space-y-4 text-[0.95rem] leading-7 text-slate-600">
                  {paragraphs.map((para, i) => (
                    <RichText key={`${i}-${para.slice(0, 48)}`} text={para} className="[overflow-wrap:anywhere] block" />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What We Do ───────────────────────────────────────────────────────────────

function WhatWeDo({ whatWeDo }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (whatWeDo?.enabled === false) return null;

  const items = (whatWeDo?.ecosystemItems ?? [])
    .map((item, i) => (language === "ar" ? (whatWeDo?.ar?.ecosystemItems?.[i] ?? "") : item))
    .filter(hasText);
  const hasContent =
    hasText(whatWeDo?.title) ||
    hasText(whatWeDo?.subtitle) ||
    hasText(whatWeDo?.intro) ||
    (whatWeDo?.ecosystemItems ?? []).some(hasText);
  if (!hasContent) return null;

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Static column — no sticky: the client reported the pinned panel
              "moving while scrolling", so the section now scrolls as one. */}
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} dir={language === "ar" ? "rtl" : "ltr"}>
            {hasText(whatWeDo?.title) ? (
              <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                {t(whatWeDo, "title", language)}
              </h2>
            ) : null}
            {hasText(whatWeDo?.subtitle) ? (
              <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500 [overflow-wrap:anywhere]">
                {t(whatWeDo, "subtitle", language)}
              </p>
            ) : null}
            {hasText(whatWeDo?.intro) ? (
              <RichText text={t(whatWeDo, "intro", language)} className="text-[0.93rem] leading-7 text-slate-500 [overflow-wrap:anywhere] block" />
            ) : null}
            {whatWeDo?.image ? (
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-[18px]">
              <Image src={whatWeDo.image} alt="HalaPark smart parking" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/15" />
            </div>
            ) : null}
          </motion.div>

          {items.length > 0 ? (
          <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, ease }} className="grid gap-2.5 sm:grid-cols-2" dir={language === "ar" ? "rtl" : "ltr"}>
            {items.map((label, i) => (
              <motion.div key={`${i}-${label}`} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.025 }} className="flex items-center gap-3 rounded-[12px] bg-white px-4 py-3.5 shadow-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[0.85rem] font-medium text-[#050A13] [overflow-wrap:anywhere]">{label}</span>
              </motion.div>
            ))}
          </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Technology & Innovation ──────────────────────────────────────────────────

function TechnologyInnovation({ technology }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  if (technology?.enabled === false) return null;

  const hasContent =
    hasText(technology?.title) ||
    hasText(technology?.subtitle) ||
    hasText(technology?.body) ||
    hasText(technology?.imageBadge) ||
    hasText(technology?.image);
  if (!hasContent) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {technology?.image ? (
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="relative h-72 w-full overflow-hidden rounded-[24px] sm:h-80 lg:h-[420px]" dir={language === "ar" ? "rtl" : "ltr"}>
            <Image src={technology.image} alt="HalaPark technology" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/60 via-transparent to-transparent" />
            {hasText(technology?.imageBadge) ? (
              <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 [overflow-wrap:anywhere]">
                    {t(technology, "imageBadge", language)}
                  </span>
                </span>
              </div>
            ) : null}
          </motion.div>
          ) : null}

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} dir={language === "ar" ? "rtl" : "ltr"}>
            {hasText(technology?.title) ? (
              <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                {t(technology, "title", language)}
              </h2>
            ) : null}
            {hasText(technology?.subtitle) ? (
              <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500 [overflow-wrap:anywhere]">
                {t(technology, "subtitle", language)}
              </p>
            ) : null}
            {hasText(technology?.body) ? (
              <RichText text={t(technology, "body", language)} className="text-[0.93rem] leading-7 text-slate-500 [overflow-wrap:anywhere] block" />
            ) : null}
            {/* Extra feature cards — not in content doc
            <div className="mt-8 grid grid-cols-2 gap-3">
              {techPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.07 }} className="rounded-[16px] border border-[#E7EAF0] bg-[#F4F8FF] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white shadow-sm">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <p className="mt-3 text-[0.88rem] font-semibold leading-snug text-[#050A13]">{p.label}</p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-slate-500">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Why HalaPark ─────────────────────────────────────────────────────────────

const whyItems = [
  { icon: Zap, title: "Smart & Seamless Experience", description: "Easily find, access, book, and manage parking through a user-friendly digital platform designed for speed, simplicity, and convenience." },
  { icon: CreditCard, title: "Cashless Secure Payments", description: "A fully digital payment environment that is fast, reliable, secure, and designed for frictionless modern transactions." },
  { icon: Shield, title: "Automated Smart Access", description: "Advanced entry and exit systems powered by AI cameras, smart barriers, and intelligent automation for effortless access control." },
  { icon: BarChart3, title: "Maximize Parking Value", description: "Optimize parking utilization, improve operational efficiency, and unlock additional revenue opportunities from underutilized parking assets." },
  { icon: Cpu, title: "AI-Driven Parking Intelligence", description: "Leverage AI-powered systems for intelligent space allocation, automated operations, predictive insights, and live monitoring." },
  { icon: Leaf, title: "Future-Ready Mobility Infrastructure", description: "Built for the evolving future of smart cities, HalaPark continuously innovates through advanced technologies and EV-ready infrastructure." },
];

function WhyHalaPark() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Why HalaPark
            </h2>
            <p className="mb-7 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              More Than Parking. A Smart Mobility Ecosystem.
            </p>
            <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
              <Image src="/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" alt="HalaPark experience" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
          </motion.div>

          <div className="divide-y divide-[#E7EAF0]">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, ease, delay: i * 0.05 }} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-[#050A13]">{item.title}</p>
                    <p className="mt-1.5 text-[0.84rem] leading-6 text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Core Values ──────────────────────────────────────────────────────────────

const coreValues = [
  { icon: TrendingUp, label: "Innovation First",                desc: "We lead with bold ideas and continuously push boundaries." },
  { icon: Users,      label: "Customer-Centered Experiences",  desc: "Every decision starts and ends with the people we serve." },
  { icon: Target,     label: "Operational Excellence",         desc: "We deliver with precision, consistency, and reliability." },
  { icon: Leaf,       label: "Smart & Sustainable Growth",     desc: "Growth that is responsible, scalable, and future-focused." },
  { icon: Shield,     label: "Transparency & Trust",           desc: "Open, honest, and dependable in everything we do." },
  { icon: Eye,        label: "Future-Focused Thinking",        desc: "We build for today while engineering for tomorrow." },
];

function CoreValues() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* LEFT — photo */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="relative h-72 w-full overflow-hidden rounded-[24px] sm:h-[420px]">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="HalaPark values" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/50">Our Core Values</p>
              <p className="mt-1 text-[1.1rem] font-semibold leading-snug text-white">The foundation of everything we build and deliver.</p>
            </div>
          </motion.div>

          {/* RIGHT — values list */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Our Core Values
            </h2>
            <p className="mb-8 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              The foundation of everything we build and deliver.
            </p>
            <div className="divide-y divide-[#E7EAF0]">
              {coreValues.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex gap-4 py-4 first:pt-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <div>
                      <p className="text-[0.95rem] font-semibold text-[#050A13]">{item.label}</p>
                      <p className="mt-1 text-[0.83rem] leading-5 text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Who We Serve ─────────────────────────────────────────────────────────────

const serveItems = [
  { icon: Building2, label: "Residential Communities" },
  { icon: Building2, label: "Commercial Towers" },
  { icon: Building2, label: "Retail & Shopping Destinations" },
  { icon: Building2, label: "Hospitality & Hotels" },
  { icon: Building2, label: "Healthcare Facilities" },
  { icon: Building2, label: "Government & Public Infrastructure" },
  { icon: Network,   label: "Smart City Projects" },
  { icon: Building2, label: "Mixed-Use Developments" },
  { icon: Car,       label: "Airports & Transportation Hubs" },
  { icon: Building2, label: "Corporate & Enterprise Facilities" },
];

function WhoWeServe() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Who We Serve
            </h2>
            <p className="mb-7 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Intelligent Mobility Solutions for Every Environment
            </p>
            <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
              <Image src="/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" alt="Properties we serve" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {serveItems.map((item, i) => (
              <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease, delay: i * 0.04 }} className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF6FF]">
                  <item.icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="text-[0.83rem] font-medium leading-snug text-[#050A13]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sustainability & Smart Cities ────────────────────────────────────────────

const sustainabilityPoints = [
  { icon: Car,    title: "Reduced Congestion",        desc: "Intelligent parking guidance minimises unnecessary vehicle movement and traffic build-up around facilities." },
  { icon: Leaf,   title: "Lower Fuel Consumption",    desc: "Drivers spend less time circling for parking, directly cutting fuel use and vehicle emissions." },
  { icon: Zap,    title: "EV-Ready Ecosystems",       desc: "Built-in EV charging integration supports the transition to electric mobility and sustainable transportation." },
  { icon: Cpu,    title: "Data-Driven Efficiency",    desc: "AI-powered operations eliminate waste, optimise space utilisation, and reduce the environmental footprint of parking." },
];

function SustainabilitySmartCities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Full-width heading at top */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12 max-w-[640px]">
          <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Sustainability & Smart Cities
          </h2>
          <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Supporting Smarter & More Sustainable Urban Living
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            {sustainabilityPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="rounded-[18px] border border-[#E7EAF0] bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.9rem] font-semibold leading-snug text-[#050A13]">{p.title}</p>
                  <p className="mt-2 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="lg:pt-2">
            <div className="relative h-52 w-full overflow-hidden rounded-[18px] sm:h-60">
              <Image src="/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png" alt="Sustainable smart city" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="mt-6 space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark helps reduce congestion, unnecessary vehicle movement, fuel consumption, and operational inefficiencies through intelligent parking technologies and optimized mobility systems.</p>
              <p>By supporting digital infrastructure, EV-ready ecosystems, automation, and data-driven operations, HalaPark contributes to smarter, cleaner, and more sustainable urban environments.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust, Security & Reliability ───────────────────────────────────────────

const trustPoints = [
  { icon: Shield,   title: "Secure Digital Infrastructure", desc: "End-to-end secure access management and encrypted data handling across every system touchpoint." },
  { icon: BarChart3, title: "Real-Time Monitoring",         desc: "Live operational dashboards and intelligent alerts ensure continuous visibility across all facilities." },
  { icon: Zap,      title: "High-Demand Performance",       desc: "Scalable architecture built to handle peak traffic, large-scale deployments, and enterprise-grade operations." },
  { icon: CreditCard, title: "Data Protection",             desc: "Robust data governance and privacy practices that businesses and communities can trust." },
];

function TrustSecurityReliability() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Trust, Security & Reliability
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Built for Enterprise-Grade Operations
            </p>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark prioritizes operational reliability, secure digital infrastructure, data protection, and scalable system performance across every mobility environment.</p>
              <p>Our intelligent systems are designed to support high-demand operations with secure access management, real-time monitoring, and seamless digital experiences that businesses and communities can trust.</p>
            </div>
          </motion.div>

          <div className="space-y-3">
            {trustPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="flex gap-4 rounded-[16px] bg-white px-5 py-5 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-[#050A13]">{p.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Our Impact ───────────────────────────────────────────────────────────────

const impactItems = [
  { icon: Building2, label: "Residential Communities"          },
  { icon: Building2, label: "Commercial Towers"                },
  { icon: Building2, label: "Shopping Destinations"            },
  { icon: Network,   label: "Public Infrastructure"            },
  { icon: Network,   label: "Smart Cities"                     },
  { icon: Building2, label: "Mixed-Use Developments"           },
  { icon: Building2, label: "Hospitality & Entertainment Venues"},
  { icon: Globe,     label: "Government & Institutional Projects"},
];

function OurImpact() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pull-quote style top heading */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12">
          <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Our Impact
          </h2>
          <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Driving Smarter Urban Experiences
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {impactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex flex-col items-center gap-2.5 rounded-[14px] border border-[#E7EAF0] bg-white p-5 text-center shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="text-[0.8rem] font-medium leading-snug text-[#050A13]">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col gap-5">
            <div className="relative h-48 w-full overflow-hidden rounded-[18px] sm:h-56">
              <Image src="/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" alt="Urban mobility impact" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark is helping reshape how people interact with parking and mobility infrastructure across modern developments and urban environments.</p>
              <p className="font-medium text-[#0088FF]">
                By connecting people, properties, businesses, and mobility systems through intelligent technology, HalaPark creates experiences that are more efficient, sustainable, scalable, and future-focused.
              </p>
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400 pt-1">Our Technology-Driven Platform Supports</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Future of Mobility ───────────────────────────────────────────────────────

function FutureOfMobility() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[28px] bg-[#06111f] px-8 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,136,255,0.12),transparent_70%)] blur-2xl" />

          <div className="relative z-10 mx-auto max-w-[780px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">The Future of Mobility</span>
            </div>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              The Future of Mobility{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">is Intelligent</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[0.88rem] leading-7 text-white/55 sm:text-[0.94rem]">
              Parking is no longer just about spaces. It is becoming part of a larger intelligent mobility environment powered by AI, automation, digital infrastructure, and advanced urban systems.
            </p>
            <p className="mx-auto mt-4 max-w-[580px] text-[0.88rem] leading-7 text-white/55 sm:text-[0.94rem]">
              HalaPark is building technology that enables cities, businesses, and communities to move toward a smarter and more efficient future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── The HalaPark Experience ──────────────────────────────────────────────────

function HalaParkExperience() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              The HalaPark Experience
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Parking Designed Around People
            </p>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>At HalaPark, parking becomes more than a destination. It becomes part of a smarter journey.</p>
              <p>From intelligent entry systems and automated recognition technology to seamless digital payments and real-time operational control, every interaction is carefully designed to create a premium mobility experience that feels modern, effortless, and intuitive.</p>
              <p>Whether entering a residential community, visiting a commercial destination, managing parking operations, or navigating a busy urban district — HalaPark makes every experience smoother, smarter, and stress-free.</p>
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: 0.2 }}
              className="mt-8 rounded-[18px] bg-[#F4F8FF] px-6 py-5"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0088FF]">Our Goal is Simple</p>
              <p className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13]">
                To make movement within cities smarter, faster, and more human.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#06111f]"
          >
            <div className="absolute inset-0">
              <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-30" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/95 via-[#06111f]/70 to-[#06111f]/40" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-8 sm:p-10">
              {[
                { step: "01", label: "Intelligent Entry",       desc: "AI-powered recognition — no tickets, no friction." },
                { step: "02", label: "Seamless Payments",       desc: "Digital, cashless, and instant at every touchpoint." },
                { step: "03", label: "Real-Time Control",       desc: "Live dashboards and monitoring for operators." },
                { step: "04", label: "Premium Experience",      desc: "Modern, effortless, and human-centered by design." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-4 border-b border-white/8 pb-5 last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 text-[0.72rem] font-bold tabular-nums text-white/30">{item.step}</span>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-[0.8rem] leading-5 text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Partnerships ─────────────────────────────────────────────────────────────

const partnershipOps = [
  "Smart City Infrastructure", "Mobility Technology Integration",
  "AI & Automation Systems", "Digital Mobility Platforms",
  "Parking Asset Optimization", "EV & Sustainable Mobility Solutions",
  "Public & Private Sector Collaborations", "Future Urban Development Projects",
];

function PartnershipsInvestment() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — image on top, text below */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="flex flex-col">
            <div className="relative h-56 w-full overflow-hidden rounded-[20px] sm:h-64">
              <Image src="/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png" alt="Partnership network" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="mt-6 flex flex-1 flex-col justify-center space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark believes the future of mobility is built through collaboration.</p>
              <p>We actively partner with developers, technology providers, operators, government entities, real estate groups, and forward-thinking organizations to accelerate the transformation of parking and mobility infrastructure across the region.</p>
              <p>Through strategic partnerships, HalaPark creates scalable frameworks that combine intelligent technology, operational excellence, and long-term infrastructure growth.</p>
            </div>
          </motion.div>

          {/* RIGHT — heading + checklist */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col justify-center">
            <h2 className="mb-3 text-[clamp(2.1rem,3.2vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Our Partnerships
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Collaborating to Build Smarter Mobility Networks
            </p>
            <p className="mb-5 mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400">Collaboration Opportunities Include</p>
            <div className="grid grid-cols-2 gap-2">
              {partnershipOps.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, ease, delay: i * 0.04 }} className="flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-3 shadow-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.79rem] font-medium leading-tight text-[#050A13]">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-[0.86rem] font-medium leading-6 text-[#0088FF]">
              Together with our partners, HalaPark is building smarter, more efficient, and more sustainable mobility experiences for the future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Investment Opportunities ─────────────────────────────────────────────────

const investmentAreas = [
  "Expansion of Smart Mobility Infrastructure",
  "AI-Powered Mobility Technologies",
  "Urban Mobility Innovation & Future Transportation",
  "Sustainable & EV-Ready Infrastructure",
  "Regional Growth & Market Expansion",
  "Infrastructure Modernization & Digital Transformation",
  "Future-Ready Parking Operations",
  "Strategic Technology Innovation & Product Development",
];

function InvestmentOpportunities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial: label above, then wide 2-col layout */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12">
          <h2 className="mb-3 max-w-[640px] text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Investment Opportunities
          </h2>
          <p className="max-w-[640px] text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Investing in the Future of Smart Mobility
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
            <p>As cities evolve toward smarter and more advanced infrastructure, the demand for intelligent mobility technology continues to grow rapidly.</p>
            <p>HalaPark operates at the intersection of smart cities, digital infrastructure, AI-driven operations, and future transportation systems. We welcome strategic investors and visionary stakeholders who share our ambition to redefine urban mobility through scalable technology and intelligent parking innovation.</p>
            <p className="font-medium text-[#0088FF]">
              By investing in HalaPark, stakeholders become part of the next generation of intelligent urban infrastructure shaping how future cities move, operate, and grow.
            </p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400">Investment Focus Areas Include</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {investmentAreas.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.04 }} className="flex items-center gap-3 rounded-[12px] border border-[#E7EAF0] bg-[#F4F8FF] px-4 py-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.85rem] font-medium text-[#050A13]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Powering Future Cities ───────────────────────────────────────────────────

function PoweringFutureCities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-[820px]"
        >
          {/* Wide photo banner */}
          <div className="relative mb-10 h-56 w-full overflow-hidden rounded-[22px] sm:h-72">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="Future cities" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050A13]/50 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/60">HalaPark</p>
              <p className="mt-1 text-[1.1rem] font-semibold leading-tight text-white">Powering Future Cities</p>
            </div>
          </div>
          <h2 className="mb-3 text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13]">
            Powering Future Cities
          </h2>
          <p className="mb-8 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Powering the Movement of Future Cities
          </p>
          <div className="space-y-4 text-[0.95rem] leading-7 text-slate-500">
            <p>Cities are evolving faster than ever: becoming smarter, more advanced, and driven by digital experiences. HalaPark powers that transformation through intelligent parking and seamless mobility innovation.</p>
            <p>By combining AI, automation, and real-time technology, HalaPark transforms everyday parking into an integrated mobility environment designed for smarter cities and frictionless urban experiences.</p>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
            className="mt-10 border-t border-[#E7EAF0] pt-8 text-[1.15rem] font-semibold leading-[1.5] tracking-[-0.02em] text-[#050A13] sm:text-[1.25rem]"
          >
            Because the future of mobility is not just about movement:{" "}
            <span className="text-[#0088FF]">
              it&apos;s about creating smarter journeys for everyone.
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA({ cta }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // Watermark logo: the site logo from global Settings (bundled fallback).
  const [logo, setLogo] = useState("/logo-blue-11.svg");
  useEffect(() => {
    fetchPage("settings").then((page) => {
      const img = (page?.sections?.logo?.image || "").trim();
      if (img) setLogo(img);
    });
  }, []);

  if (cta?.enabled === false) return null;

  const hasPrimary = hasText(cta?.primaryCtaText);
  const hasSecondary = hasText(cta?.secondaryCtaText);
  const hasContent =
    hasText(cta?.title) || hasText(cta?.description) || hasPrimary || hasSecondary;
  if (!hasContent) return null;

  const image = (cta?.image || "").trim();

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(118deg,#071327_0%,#0A1E3C_50%,#0B2E5E_100%)] shadow-[0_28px_64px_rgba(7,19,39,0.3)] ring-1 ring-white/10">
          {/* Depth: top hairline, soft blue pools, concentric ring arcs and a
              faint logo on the right (logo only when there is no photo). */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1AB2FF]/60 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#0088FF]/25 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#1AB2FF]/20 blur-[100px] rtl:right-auto rtl:-left-24" />
          <div aria-hidden className="pointer-events-none absolute -right-[12%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-white/[0.07] rtl:right-auto rtl:-left-[12%]" />
          <div aria-hidden className="pointer-events-none absolute -right-[12%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/[0.09] rtl:right-auto rtl:-left-[12%]" />
          <div aria-hidden className="pointer-events-none absolute -right-[12%] top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-[#1AB2FF]/20 rtl:right-auto rtl:-left-[12%]" />
          {!image ? (
            <div aria-hidden className="pointer-events-none absolute end-10 top-1/2 hidden w-[26%] -translate-y-1/2 select-none lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" className="h-auto w-full opacity-[0.08] brightness-0 invert" />
            </div>
          ) : null}

          {/* ── Image on the right: a tall "leaf" (big top-left / bottom-right
                curves) with a blue outline echo behind it and a logo badge, so
                it reads as artwork rather than a photo box. ── */}
          {image ? (
            <div aria-hidden className="pointer-events-none absolute inset-y-10 end-12 hidden w-[36%] lg:block">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[140px_32px_140px_32px] border border-[#1AB2FF]/45 rtl:-translate-x-4 rtl:rounded-[32px_140px_32px_140px]" />
              <div className="absolute inset-0 overflow-hidden rounded-[140px_32px_140px_32px] shadow-[0_30px_70px_rgba(3,10,20,0.55)] ring-1 ring-white/15 rtl:rounded-[32px_140px_32px_140px]">
                <Image src={image} alt="" fill className="object-cover object-center" sizes="36vw" aria-hidden />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,39,0.55)_0%,rgba(7,19,39,0.08)_50%,transparent_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,19,39,0.55)_0%,rgba(7,19,39,0.08)_50%,transparent_100%)]" />
              </div>
              <div className="absolute -bottom-3 start-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0A3F84] to-[#0088FF] shadow-[0_12px_30px_rgba(0,136,255,0.45)] ring-4 ring-[#0A1E3C]">
                <Image src="/Layer_1.svg" alt="" width={22} height={28} className="h-7 w-auto" aria-hidden />
              </div>
            </div>
          ) : null}

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
            className={`relative z-10 px-8 py-14 text-center sm:px-12 sm:py-16 lg:py-24 lg:ps-16 lg:pe-6 lg:text-start ${
              image ? "lg:max-w-[56%]" : "lg:max-w-[62%]"
            }`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {hasText(cta?.title) ? (
              <h2 className="text-[clamp(2.1rem,4.2vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
                {t(cta, "title", language)}
              </h2>
            ) : null}
            <span aria-hidden className="mx-auto mt-6 block h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,#0088FF,#1AB2FF)] lg:mx-0" />
            {hasText(cta?.description) ? (
              <RichText
                text={t(cta, "description", language)}
                className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base [overflow-wrap:anywhere] block lg:mx-0"
              />
            ) : null}
            {hasPrimary || hasSecondary ? (
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {hasPrimary ? (
                  <Link
                    href={cta?.primaryCtaPopup ? PARTNER_FORM_LINK : cta?.primaryCtaLink || "/contact"}
                    data-partner-source="About · CTA"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,136,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1AB2FF] hover:shadow-[0_18px_44px_rgba(26,178,255,0.5)]"
                  >
                    {t(cta, "primaryCtaText", language)} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                  </Link>
                ) : null}
                {hasSecondary ? (
                  <Link
                    href={cta?.secondaryCtaPopup ? PARTNER_FORM_LINK : cta?.secondaryCtaLink || "/contact"}
                    data-partner-source="About · CTA"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1AB2FF]/60 hover:bg-white/15"
                  >
                    {t(cta, "secondaryCtaText", language)}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── App Download CTA ─────────────────────────────────────────────────────────

function AppDownloadCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Get the App
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Next-Gen Parking at Your Fingertips
            </p>
            <p className="max-w-[480px] text-[0.93rem] leading-7 text-slate-500">
              Find, book, and manage parking easily from your phone. Get real-time availability, instant access, and a smooth, hassle-free experience anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="https://apps.apple.com/us/app/halapark-all-about-parking/id1590800416" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-[14px] bg-[#050A13] px-5 py-3 transition hover:opacity-85">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div>
                  <p className="text-[10px] font-medium leading-none text-white/60">Download on the</p>
                  <p className="mt-0.5 text-[0.88rem] font-semibold leading-none text-white">App Store</p>
                </div>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.app.halapark&pli=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-[14px] bg-[#050A13] px-5 py-3 transition hover:opacity-85">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden><path d="M3.18 23.76c.3.17.64.24.99.2l13.12-7.57-2.83-2.83-11.28 10.2zM.42 1.6C.16 1.9 0 2.33 0 2.89v18.22c0 .56.16.99.43 1.28l.07.07 10.21-10.21v-.24L.49 1.53.42 1.6zM20.13 9.53l-2.81-1.62-3.17 3.17 3.17 3.18 2.84-1.64c.81-.47.81-1.23-.03-1.7zM3.18.24L16.3 7.81l-2.83 2.83L2.19.44c.35-.04.7.03.99.2v-.4z"/></svg>
                <div>
                  <p className="text-[10px] font-medium leading-none text-white/60">Get it on</p>
                  <p className="mt-0.5 text-[0.88rem] font-semibold leading-none text-white">Google Play</p>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col gap-4">
            {/* App mockup photo */}
            <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-56">
              <Image src="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" alt="HalaPark mobile app" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap,        label: "Instant Access",       desc: "Enter and exit in seconds with automated recognition." },
              { icon: BarChart3,  label: "Real-Time Availability",desc: "See live space availability before you arrive."          },
              { icon: CreditCard, label: "Seamless Payments",    desc: "Cashless, fast, and fully digital transactions."         },
              { icon: Shield,     label: "Hassle-Free",          desc: "A smooth, stress-free experience every single time."     },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.07 }} className="rounded-[18px] border border-[#E7EAF0] bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.88rem] font-semibold text-[#050A13]">{item.label}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-5 text-slate-500">{item.desc}</p>
                </motion.div>
              );
            })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Page Export ───────────────────────────────────────────────────────────────

export default function AboutPage({ content }) {
  if (!content) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white px-4">
        <p className="text-center text-slate-500">
          About page content is unavailable. Please ensure the backend is running.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <AboutHero hero={content.hero} />
      {/* <AboutIntro /> */}
      <OurMission mission={content.mission} />
      <OurVision vision={content.vision} />
      <OurStory story={content.story} />
      <WhatWeDo whatWeDo={content.whatWeDo} />
      <TechnologyInnovation technology={content.technology} />
      {/* <PartnershipsInvestment /> */}
      {/* <InvestmentOpportunities /> */}
      {/* <WhyHalaPark /> */}
      {/* <WhoWeServe /> */}
      {/* <SustainabilitySmartCities /> */}
      {/* <TrustSecurityReliability /> */}
      {/* <OurImpact /> */}
      {/* <FutureOfMobility /> */}
      {/* <HalaParkExperience /> */}
      {/* <CoreValues /> */}
      {/* <PoweringFutureCities /> */}
      <FinalCTA cta={content.cta} />
      {/* <AppDownloadCTA /> */}
    </main>
  );
}
