"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Briefcase,
  Headset,
  Building2,
  Sparkles,
  MapPin,
  X,
  Rocket,
  Users,
  GraduationCap,
  Heart,
  TrendingUp,
  Globe,
  Lightbulb,
  Code2,
  Handshake,
  Target,
  Award,
  Clock,
  Zap,
} from "lucide-react";
import JobApplicationModal from "./JobApplicationModal";
import GeneralApplicationModal from "./GeneralApplicationModal";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const ease = [0.22, 1, 0.36, 1];

// Fixed Careers chrome (inline EN/AR) — only labels that are NOT CMS-driven.
const CAREERS_TEXT = {
  oneTeam: { en: "More Than Colleagues. One Team.", ar: "أكثر من زملاء. فريق واحد." },
  viewDetails: { en: "View details", ar: "عرض التفاصيل" },
};
const ct = (key, language) => CAREERS_TEXT[key]?.[language] ?? CAREERS_TEXT[key]?.en ?? "";

// True when a CMS value is a non-blank string — hide-when-empty helper.
const hasText = (v) => typeof v === "string" && v.trim().length > 0;

// Job post fields are strict per language (site-wide rule): Arabic mode shows
// the Arabic value or nothing — no English fallback. Posts without an Arabic
// title are filtered out entirely in AR (see JobOpenings) so no blank cards.
const jt = (post, key, language) =>
  language === "ar" ? post?.ar?.[key] ?? "" : post?.[key] ?? "";

const opportunityIcons = {
  Briefcase,
  Headset,
  Building2,
  Rocket,
  Users,
  GraduationCap,
  Heart,
  TrendingUp,
  Globe,
  Lightbulb,
  Code2,
  Handshake,
  Target,
  Award,
  Clock,
  Zap,
  Sparkles,
  MapPin,
};

// Careers layout: an asymmetric photo mosaic (one tall tile + two stacked tiles),
// each cross-fading independently — a gallery feel, distinct from About/Business.

function MosaicTile({ slides, idx, reduced, sizes }) {
  const src = slides[idx % slides.length];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${src}-${idx}`}
          initial={reduced ? false : { opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="absolute inset-0"
        >
          <Image src={src} alt="HalaPark team" fill sizes={sizes} className="object-cover object-center" />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/35 to-transparent" />
    </div>
  );
}

function CareersVisual({ hero, reduced }) {
  const { language } = useLanguage();

  // CMS-driven mosaic: distribute hero.images across the three tiles
  // round-robin (A: 0,3,6…  B: 1,4,7…  C: 2,5,8…). A tile that would end up
  // empty gets the full list instead so every tile always has ≥1 image.
  const images = (Array.isArray(hero?.images) ? hero.images : []).filter(hasText);
  const pickTile = (offset) => {
    const tile = images.filter((_, i) => i % 3 === offset);
    return tile.length > 0 ? tile : images;
  };
  const tileA = pickTile(0);
  const tileB = pickTile(1);
  const tileC = pickTile(2);

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  useEffect(() => {
    if (reduced || tileA.length === 0) return undefined;
    const ta = setInterval(() => setA((p) => (p + 1) % tileA.length), 3800);
    const tb = setInterval(() => setB((p) => (p + 1) % tileB.length), 3100);
    const tc = setInterval(() => setC((p) => (p + 1) % tileC.length), 2600);
    return () => {
      clearInterval(ta);
      clearInterval(tb);
      clearInterval(tc);
    };
  }, [reduced, tileA.length, tileB.length, tileC.length]);

  // Floating chips — from CMS (hero.badges), strict Arabic.
  const badges = hero?.badges;
  const teamTag = t(badges, "teamTag", language);
  const hiringTitle = t(badges, "hiringTitle", language);
  const hiringSub = t(badges, "hiringSub", language);
  const cultureTag = t(badges, "cultureTag", language);
  const cultureTitle = t(badges, "cultureTitle", language);
  const cultureSub = t(badges, "cultureSub", language);

  // No CMS images → hide the whole visual mosaic block.
  if (images.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.15),rgba(37,99,235,0.05)_58%,transparent_76%)] blur-2xl lg:h-[500px] lg:w-[500px]" />

      {/* Mosaic grid: left tall tile spans 2 rows, right column = 2 stacked tiles */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="relative z-20 grid h-[330px] w-[300px] grid-cols-2 grid-rows-2 gap-3 sm:h-[390px] sm:w-[360px] lg:h-[450px] lg:w-[420px]"
      >
        {/* Tall tile (col 1, both rows) */}
        <div className="relative row-span-2 overflow-hidden rounded-[24px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <MosaicTile slides={tileA} idx={a} reduced={reduced} sizes="(min-width: 1024px) 210px, 150px" />
          {hasText(teamTag) ? (
            <span
              className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm [overflow-wrap:anywhere] rtl:left-auto rtl:right-3"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BE49B] animate-pulse" /> {teamTag}
            </span>
          ) : null}
        </div>
        {/* Top-right tile */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <MosaicTile slides={tileB} idx={b} reduced={reduced} sizes="(min-width: 1024px) 210px, 150px" />
        </div>
        {/* Bottom-right tile */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <MosaicTile slides={tileC} idx={c} reduced={reduced} sizes="(min-width: 1024px) 210px, 150px" />
        </div>
      </motion.div>

      {/* Floating chip — we're hiring (top-left, mirrored to top-right in RTL) */}
      {hasText(hiringTitle) ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          className="absolute left-[-6%] top-[-4%] z-40 hidden sm:block lg:left-[-14%] rtl:left-auto rtl:right-[-6%] rtl:lg:left-auto rtl:lg:right-[-14%]"
        >
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
              {hasText(badges?.hiringIconImage) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={badges.hiringIconImage} alt="" className="h-5 w-5 object-contain" />
              ) : (
                <Briefcase className="h-4.5 w-4.5" aria-hidden />
              )}
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{hiringTitle}</p>
              {hasText(hiringSub) ? (
                <p className="text-[10px] text-[#667085] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{hiringSub}</p>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Floating chip — culture (bottom-right, mirrored to bottom-left in RTL) */}
      {hasText(cultureTitle) ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
          animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
          transition={{ duration: 0.6, ease, delay: 0.6 }}
          className="absolute bottom-[-4%] right-[-6%] z-40 hidden sm:block lg:right-[-12%] rtl:right-auto rtl:left-[-6%] rtl:lg:right-auto rtl:lg:left-[-12%]"
        >
          <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
            {hasText(cultureTag) ? (
              <div className="flex items-center gap-1.5">
                {hasText(badges?.cultureIconImage) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={badges.cultureIconImage} alt="" className="h-3.5 w-3.5 object-contain" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-[#0088FF]" aria-hidden />
                )}
                <p className="text-[11px] font-semibold text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{cultureTag}</p>
              </div>
            ) : null}
            <p className="mt-1.5 text-[0.92rem] font-bold leading-tight tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{cultureTitle}</p>
            {hasText(cultureSub) ? (
              <p className="text-[9px] text-slate-400 [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{cultureSub}</p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

function CareersHero({ hero }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();

  const title = t(hero, "title", language);
  const description = t(hero, "description", language);
  const primaryCta = t(hero, "primaryCta", language);
  const secondaryCta = t(hero, "secondaryCta", language);

  return (
    <section
      id="careers-hero"
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

      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 xl:gap-20">

          {/* LEFT — text */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {hasText(title) || hasText(t(hero, "titleGradient", language)) ? (
              <h1 className="max-w-[600px] text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[#050A13] [overflow-wrap:anywhere]">
                {title}
                {hasText(t(hero, "titleGradient", language)) ? (
                  <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                    {t(hero, "titleGradient", language)}
                  </span>
                ) : null}
              </h1>
            ) : null}

            {hasText(description) ? (
              <RichText text={description} className="mt-5 max-w-[470px] text-[0.95rem] leading-[1.75] text-slate-500 [overflow-wrap:anywhere] block" />
            ) : null}

            {hasText(primaryCta) || hasText(secondaryCta) ? (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {hasText(primaryCta) ? (
                  <Link
                    href={(hero?.primaryCtaLink || "").trim() || "#open-positions"}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                  >
                    {primaryCta}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                    </span>
                  </Link>
                ) : null}
                {hasText(secondaryCta) ? (
                  <Link
                    href={(hero?.secondaryCtaLink || "").trim() || "/contact"}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
                  >
                    {secondaryCta}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          {/* RIGHT — imagery collage */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative mt-16 flex min-h-[420px] items-center justify-center lg:mt-0 lg:min-h-[560px]"
          >
            <CareersVisual hero={hero} reduced={reduced} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BuildingSmarterMobility({ building }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const title = t(building, "title", language);
  const titleLines = title.split("\n");
  const paragraphs = (building?.paragraphs ?? [])
    .map((paragraph, i) =>
      language === "ar" ? building?.ar?.paragraphs?.[i] ?? "" : paragraph ?? "",
    )
    .filter(hasText);

  // Section hides when its content is fully cleared.
  if (!hasText(title) && paragraphs.length === 0) return null;

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center" dir={language === "ar" ? "rtl" : "ltr"}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            {hasText(title) || hasText(t(building, "titleGradient", language)) ? (
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                {titleLines.map((line, i) => (
                  <span key={`${line}-${i}`}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
                {hasText(t(building, "titleGradient", language)) ? (
                  <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                    {t(building, "titleGradient", language)}
                  </span>
                ) : null}
              </h2>
            ) : null}
            {paragraphs.length > 0 ? (
              <div className="mt-8 space-y-5 text-[0.94rem] leading-7 text-slate-500 sm:text-base">
                {paragraphs.map((text, i) => (
                  <RichText key={`${text.slice(0, 40)}-${i}`} text={text} className="[overflow-wrap:anywhere] block" />
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OpportunitiesSection({ opportunities, header }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const heading = t(header, "heading", language);
  // Only items with real text in the current language render.
  const items = (Array.isArray(opportunities) ? opportunities : []).filter(
    (item) =>
      hasText(t(item, "title", language)) ||
      hasText(t(item, "description", language)) ||
      hasText(t(item, "badge", language)),
  );

  if (!hasText(heading) && items.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasText(heading) ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="mx-auto mb-12 max-w-[780px] text-center"
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
              {heading}
              {hasText(t(header, "headingGradient", language)) ? (
                <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                  {t(header, "headingGradient", language)}
                </span>
              ) : null}
            </h2>
          </motion.div>
        ) : null}

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item, i) => {
              const Icon = opportunityIcons[item.icon] ?? Sparkles;
              const itemTitle = t(item, "title", language);
              const itemDescription = t(item, "description", language);
              const itemBadge = t(item, "badge", language);
              return (
                <motion.article
                  key={`${item.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="flex h-full flex-col rounded-[22px] border border-[#E7EAF0] bg-white p-7 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(6,6,22,0.10)]"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EEF6FF]">
                      {hasText(item.iconImage) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.iconImage} alt="" className="h-6 w-6 object-contain" />
                      ) : (
                        <Icon className="h-6 w-6 text-[#0088FF]" strokeWidth={1.8} aria-hidden />
                      )}
                    </div>
                    {hasText(itemBadge) ? (
                      <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF] [overflow-wrap:anywhere]">
                        {itemBadge}
                      </span>
                    ) : null}
                  </div>
                  {hasText(itemTitle) ? (
                    <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere]">
                      {itemTitle}
                    </h3>
                  ) : null}
                  {hasText(itemDescription) ? (
                    <RichText text={itemDescription} className="mt-3 text-[0.9rem] leading-6 text-slate-500 [overflow-wrap:anywhere] block" />
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

// Apply button — renders a form-trigger or a link depending on applyMode.
function JobApplyButton({ post, onApply, className }) {
  const { language } = useLanguage();
  const useForm = post.applyMode === "form";
  const applyHref = post.applyLink || "/contact";
  // The apply button is functional chrome — when the post has no label in the
  // current language, use a fixed UI label so the button is never blank.
  const label =
    jt(post, "applyLabel", language) ||
    (language === "ar" ? "قدّم الآن" : "Apply Now");
  if (useForm) {
    return (
      <button type="button" onClick={() => onApply(post)} className={className}>
        {label}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
      </button>
    );
  }
  const ApplyTag = applyHref.startsWith("/") ? Link : "a";
  return (
    <ApplyTag href={applyHref} className={className}>
      {label}
      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
    </ApplyTag>
  );
}

// Job detail modal — structured layout with plain-text content (admin line
// breaks preserved via whitespace-pre-line).
function JobDetailModal({ job, onClose, onApply }) {
  const { language } = useLanguage();
  useEffect(() => {
    if (!job) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [job, onClose]);

  const fullDescription = jt(job, "fullDescription", language);
  const description = jt(job, "description", language);

  return (
    <AnimatePresence>
      {job ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[26px] bg-white shadow-2xl sm:rounded-[26px]"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="relative shrink-0 border-b border-slate-100 bg-[#F6FAFF] px-6 py-5 sm:px-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:text-slate-800 rtl:right-auto rtl:left-4"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="max-w-[90%] text-[1.3rem] font-semibold tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere] sm:text-[1.6rem]">
                {jt(job, "title", language)}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {hasText(jt(job, "department", language)) ? (
                  <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF] [overflow-wrap:anywhere]">
                    {jt(job, "department", language)}
                  </span>
                ) : null}
                {hasText(jt(job, "employmentType", language)) ? (
                  <span className="rounded-full border border-[#E7EAF0] bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600 [overflow-wrap:anywhere]">
                    {jt(job, "employmentType", language)}
                  </span>
                ) : null}
                {hasText(jt(job, "location", language)) ? (
                  <span className="inline-flex items-center gap-1 text-[0.8rem] text-slate-500 [overflow-wrap:anywhere]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden /> {jt(job, "location", language)}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Body — plain text; admin line breaks preserved */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8" data-lenis-prevent>
              {hasText(fullDescription) ? (
                <p className="whitespace-pre-line text-[0.92rem] leading-7 text-slate-600 [overflow-wrap:anywhere]">
                  {fullDescription}
                </p>
              ) : hasText(description) ? (
                <RichText text={description} className="text-[0.92rem] leading-7 text-slate-600 [overflow-wrap:anywhere] block" />
              ) : null}
            </div>

            {/* Footer — apply */}
            <div className="shrink-0 border-t border-slate-100 px-6 py-4 sm:px-8">
              <JobApplyButton
                post={job}
                onApply={(p) => { onClose(); onApply(p); }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.35)] transition hover:brightness-110 sm:w-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function JobOpenings({ openPositions }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // Only show active jobs — closed ones are hidden from the website. In Arabic
  // mode, posts without an Arabic title are hidden too (strict — no English
  // fallback, and no blank cards).
  const posts = (openPositions?.posts ?? [])
    .filter((p) => p?.status !== "closed")
    .filter((p) =>
      language === "ar" ? hasText(p?.ar?.title) : hasText(p?.title),
    );
  const [applyJob, setApplyJob] = useState(null);
  const [detailJob, setDetailJob] = useState(null);

  const title = t(openPositions, "title", language);
  const subtitle = t(openPositions, "subtitle", language);

  if (!hasText(title) && posts.length === 0) return null;

  return (
    <>
      <JobApplicationModal
        isOpen={Boolean(applyJob)}
        onClose={() => setApplyJob(null)}
        job={applyJob}
      />
      <JobDetailModal job={detailJob} onClose={() => setDetailJob(null)} onApply={setApplyJob} />

      <section id="open-positions" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasText(title) || hasText(subtitle) ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease }}
              className="mx-auto mb-12 max-w-[780px] text-center"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {hasText(title) ? (
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                  {title}
                </h2>
              ) : null}
              {hasText(subtitle) ? (
                <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500 [overflow-wrap:anywhere]">
                  {subtitle}
                </p>
              ) : null}
            </motion.div>
          ) : null}

          {posts.length > 0 ? (
            /* A single open position centers itself instead of hugging the
               left column of the two-column grid. */
            <div
              className={
                posts.length === 1
                  ? "mx-auto grid max-w-xl gap-5"
                  : "mx-auto grid max-w-5xl gap-5 sm:grid-cols-2"
              }
            >
              {posts.map((post, i) => (
                <motion.article
                  key={`${post.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease, delay: (i % 2) * 0.05 }}
                  className="group flex cursor-pointer flex-col rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[#0088FF]/40 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)] sm:p-7"
                  dir={language === "ar" ? "rtl" : "ltr"}
                  onClick={() => setDetailJob(post)}
                >
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere] sm:text-lg">
                    {jt(post, "title", language)}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hasText(jt(post, "department", language)) ? (
                      <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF] [overflow-wrap:anywhere]">
                        {jt(post, "department", language)}
                      </span>
                    ) : null}
                    {hasText(jt(post, "employmentType", language)) ? (
                      <span className="rounded-full border border-[#E7EAF0] bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600 [overflow-wrap:anywhere]">
                        {jt(post, "employmentType", language)}
                      </span>
                    ) : null}
                  </div>
                  {hasText(jt(post, "location", language)) ? (
                    <p className="mt-3 inline-flex items-center gap-1 text-sm text-slate-500 [overflow-wrap:anywhere]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden /> {jt(post, "location", language)}
                    </p>
                  ) : null}
                  {hasText(jt(post, "description", language)) ? (
                    <RichText text={jt(post, "description", language)} className="mt-4 line-clamp-3 text-[0.88rem] leading-6 text-slate-500 [overflow-wrap:anywhere] sm:text-[0.94rem] block" />
                  ) : null}

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0088FF]">
                      {ct("viewDetails", language)}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                    </span>
                    <span onClick={(e) => e.stopPropagation()} className="shrink-0">
                      <JobApplyButton
                        post={post}
                        onApply={setApplyJob}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0088FF]/30 bg-[#EEF6FF] px-4 py-2 text-xs font-semibold text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white"
                      />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function WhyJoinUs({ whyJoin }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const title = t(whyJoin, "title", language);
  const subtitle = t(whyJoin, "subtitle", language);
  const bodyParagraph = t(whyJoin, "bodyParagraph", language);
  // Only reasons with text in the current language render — untranslated or
  // cleared entries never show as empty checkmark rows.
  const reasons = (whyJoin?.reasons ?? [])
    .map((reason, i) =>
      language === "ar" ? whyJoin?.ar?.reasons?.[i] ?? "" : reason ?? "",
    )
    .filter(hasText);

  if (!hasText(title) && !hasText(subtitle) && !hasText(bodyParagraph) && reasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {hasText(title) ? (
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                {title}
              </h2>
            ) : null}
            {hasText(subtitle) ? (
              <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-600 [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
            {hasText(bodyParagraph) ? (
              <div className="mt-8 rounded-[20px] border border-[#E7EAF0] bg-white p-6">
                <h3 className="text-lg font-semibold text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
                  {ct("oneTeam", language)}
                </h3>
                <RichText text={bodyParagraph} className="mt-3 text-[0.93rem] leading-7 text-slate-500 [overflow-wrap:anywhere] block" />
              </div>
            ) : null}
          </motion.div>

          {reasons.length > 0 ? (
            <motion.ul
              initial={reduced ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="space-y-3"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {reasons.map((reasonText, i) => (
                <motion.li
                  key={`${reasonText}-${i}`}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.94rem] font-medium text-[#050A13] [overflow-wrap:anywhere]">{reasonText}</span>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CareersCTA({ cta, heroImage, hasOpenPositions }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // The primary "Join Our Team" button opens the general application form
  // modal (client request) instead of navigating away.
  const [applyOpen, setApplyOpen] = useState(false);
  const secondaryHref = cta?.secondaryCtaLink || "#open-positions";
  const SecondaryTag = secondaryHref.startsWith("#") ? "a" : Link;

  const title = t(cta, "title", language);
  const subtitle = t(cta, "subtitle", language);
  const description = t(cta, "description", language);
  const primaryCtaText = t(cta, "primaryCtaText", language);
  const secondaryCtaText = t(cta, "secondaryCtaText", language);
  const showSecondary = hasOpenPositions && hasText(secondaryCtaText);

  if (
    !hasText(title) &&
    !hasText(subtitle) &&
    !hasText(description) &&
    !hasText(primaryCtaText) &&
    !showSecondary
  ) {
    return null;
  }

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          <div className="absolute inset-0">
            {heroImage ? (
              <Image
                src={heroImage}
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
              />
            ) : null}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {hasText(title) ? (
              <h2 className="max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
                {title}
              </h2>
            ) : null}
            {hasText(subtitle) ? (
              <p className="mt-3 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium text-white/85 [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
            {hasText(description) ? (
              <RichText text={description} className="mt-5 max-w-[620px] text-[0.88rem] leading-6 text-white/70 [overflow-wrap:anywhere] sm:text-[0.94rem] block" />
            ) : null}
            {hasText(primaryCtaText) || showSecondary ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {hasText(primaryCtaText) ? (
                  <button
                    type="button"
                    onClick={() => setApplyOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-10 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
                  >
                    {primaryCtaText} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </button>
                ) : null}
                {showSecondary ? (
                  <SecondaryTag
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-10 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                  >
                    {secondaryCtaText}
                  </SecondaryTag>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      <GeneralApplicationModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
    </section>
  );
}

export default function CareersPage({ content }) {
  if (!content) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white px-4">
        <p className="text-center text-slate-500">
          Careers page content is unavailable. Please ensure the backend is running.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Each section hides when its admin "Show this section" toggle is off
          (enabled === false). Undefined/true → show. */}
      {content.hero?.enabled !== false && <CareersHero hero={content.hero} />}
      {content.building?.enabled !== false && (
        <BuildingSmarterMobility building={content.building} />
      )}
      {content.openPositions?.enabled !== false && (
        <JobOpenings openPositions={content.openPositions} />
      )}
      {content.opportunitiesHeader?.enabled !== false && (
        <OpportunitiesSection
          opportunities={content.opportunities}
          header={content.opportunitiesHeader}
        />
      )}
      {content.whyJoin?.enabled !== false && <WhyJoinUs whyJoin={content.whyJoin} />}
      {content.cta?.enabled !== false && (
        <CareersCTA
          cta={content.cta}
          heroImage={content.hero?.image || (content.hero?.images ?? [])[0]}
          hasOpenPositions={(content.openPositions?.posts ?? []).filter((p) => p?.status !== "closed").length > 0}
        />
      )}
    </main>
  );
}
