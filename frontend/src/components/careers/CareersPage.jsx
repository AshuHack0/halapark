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

// Pastel card tones cycled across the Opportunities cards (bg, photo wash,
// accent for the icon disc / badge / roles label, box = the slightly darker
// shade of the same tone used for the "Opportunities:" container).
const OPP_TONES = [
  { bg: "#EAF4FF", wash: "rgba(234,244,255,0.35)", accent: "#0088FF", box: "rgba(0,136,255,0.10)" },
  { bg: "#FFF3E6", wash: "rgba(255,243,230,0.35)", accent: "#FF8A1F", box: "rgba(255,138,31,0.12)" },
  { bg: "#F1ECFF", wash: "rgba(241,236,255,0.35)", accent: "#8B5CF6", box: "rgba(139,92,246,0.10)" },
  { bg: "#E8FBF1", wash: "rgba(232,251,241,0.35)", accent: "#19B37B", box: "rgba(25,179,123,0.12)" },
  { bg: "#E9F2FF", wash: "rgba(233,242,255,0.35)", accent: "#1A7CFF", box: "rgba(26,124,255,0.10)" },
  { bg: "#FFECEF", wash: "rgba(255,236,239,0.35)", accent: "#F05A6A", box: "rgba(240,90,106,0.10)" },
];

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

  // Every hero image is a slide in the single large panel — the small corner
  // photos were removed, so all uploads cycle here instead of being split
  // three ways (which left only one image on the main panel).
  const images = (Array.isArray(hero?.images) ? hero.images : []).filter(hasText);

  const [a, setA] = useState(0);

  useEffect(() => {
    if (reduced || images.length < 2) return undefined;
    const ta = setInterval(() => setA((p) => (p + 1) % images.length), 4200);
    return () => clearInterval(ta);
  }, [reduced, images.length]);

  // Only the "Our Team" tag is still shown — the We're Hiring and Culture
  // cards were removed from this visual (their CMS fields stay in the admin
  // but no longer render here).
  const teamTag = t(hero?.badges, "teamTag", language);

  // No CMS images → hide the whole visual mosaic block.
  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Soft wash bleeding out behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),rgba(37,99,235,0.05)_58%,transparent_76%)] blur-2xl lg:h-[560px] lg:w-[560px]"
      />

      {/* One large photo filling the whole column and running off the right
          edge of the screen, instead of a small centred collage marooned in
          white space. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="relative z-20 h-[420px] w-full overflow-hidden rounded-[30px] shadow-[0_40px_90px_rgba(15,23,42,0.26)] ring-1 ring-black/5 sm:h-[500px] lg:h-[620px] lg:rounded-s-[64px]"
      >
        <MosaicTile
          slides={images}
          idx={a}
          reduced={reduced}
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        {/* Scrim so the overlaid tag stays readable on any photo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(5,10,19,0.55)_100%)]"
        />

        {hasText(teamTag) ? (
          <span
            className="absolute bottom-6 start-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/25 backdrop-blur-md [overflow-wrap:anywhere]"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5BE49B] animate-pulse" />
            {teamTag}
          </span>
        ) : null}
      </motion.div>

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
            className="relative mt-16 flex w-full items-center lg:mt-0"
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
  // Label above the roles list inside each card (e.g. "Opportunities:").
  const rolesLabel = t(header, "rolesLabel", language);
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
                <span className="mt-2 block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.15] tracking-[-0.04em] text-transparent">
                  {t(header, "headingGradient", language)}
                </span>
              ) : null}
            </h2>
          </motion.div>
        ) : null}

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, i) => {
              const Icon = opportunityIcons[item.icon] ?? Sparkles;
              const itemTitle = t(item, "title", language);
              const itemDescription = t(item, "description", language);
              const itemBadge = t(item, "badge", language);
              const itemRoles = t(item, "roles", language);
              const image = (item.image || "").trim();
              const tone = OPP_TONES[i % OPP_TONES.length];
              return (
                <motion.article
                  key={`${item.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(6,6,22,0.10)]"
                  style={{ backgroundColor: tone.bg }}
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  {/* Faded photo: anchored to the end side, dissolving into the
                      pastel card background toward the copy. No hard edge. */}
                  {image ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 end-0 w-[62%] [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.45)_30%,#000_58%,#000_100%)] max-sm:w-[58%] max-sm:[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.3)_35%,#000_68%,#000_100%)] rtl:[mask-image:linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.45)_30%,#000_58%,#000_100%)] rtl:max-sm:[mask-image:linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.3)_35%,#000_68%,#000_100%)]"
                    >
                      <Image src={image} alt="" fill sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 80vw" className="object-cover object-center" />
                      {/* Pastel wash over the photo so it sits inside the card tone */}
                      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${tone.bg} 0%, ${tone.wash} 30%, transparent 52%)` }} />
                    </div>
                  ) : null}

                  <div className={`relative flex h-full flex-col p-5 sm:p-6 ${image ? "pe-[28%] sm:pe-[34%]" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(6,6,22,0.14)]" style={{ backgroundColor: tone.accent }}>
                        {hasText(item.iconImage) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.iconImage} alt="" className="h-7 w-7 object-contain" />
                        ) : (
                          <Icon className="h-6 w-6 text-white" strokeWidth={1.9} aria-hidden />
                        )}
                      </div>
                      {hasText(itemBadge) ? (
                        <span className="rounded-full bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] shadow-[0_2px_8px_rgba(6,6,22,0.06)] backdrop-blur-sm [overflow-wrap:anywhere]" style={{ color: tone.accent }}>
                          {itemBadge}
                        </span>
                      ) : null}
                    </div>
                    {hasText(itemTitle) ? (
                      <h3 className="mt-4 text-[1.12rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0A1B33] [overflow-wrap:anywhere]">
                        {itemTitle}
                      </h3>
                    ) : null}
                    {hasText(itemDescription) ? (
                      <RichText text={itemDescription} className="mt-2.5 text-[0.86rem] leading-[1.45] text-[#3B4A5F] [overflow-wrap:anywhere] block" />
                    ) : null}
                    {hasText(itemRoles) ? (
                      <div className="mt-auto pt-4">
                        <div className="rounded-[14px] px-4 py-3 shadow-[0_2px_10px_rgba(6,6,22,0.05)] backdrop-blur-[2px]" style={{ backgroundColor: tone.box }}>
                          {hasText(rolesLabel) ? (
                            <p className="text-[0.82rem] font-semibold [overflow-wrap:anywhere]" style={{ color: tone.accent }}>{rolesLabel}</p>
                          ) : null}
                          <p className="mt-0.5 text-[0.84rem] leading-[1.45] text-[#0A1B33] [overflow-wrap:anywhere]">{itemRoles}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
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
  // Background photo for the whole section — blank means the plain white band.

  if (!hasText(title) && posts.length === 0) return null;

  return (
    <>
      <JobApplicationModal
        isOpen={Boolean(applyJob)}
        onClose={() => setApplyJob(null)}
        job={applyJob}
      />
      <JobDetailModal job={detailJob} onClose={() => setDetailJob(null)} onApply={setApplyJob} />

      <section
        id="open-positions"
        className="relative bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  ? "mx-auto grid max-w-sm gap-5"
                  : "mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
            >
              {posts.map((post, i) => (
                <motion.article
                  key={`${post.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease, delay: (i % 2) * 0.05 }}
                  className="group flex h-full cursor-pointer flex-col rounded-[18px] border border-[#E7EAF0] bg-white p-4 shadow-[0_4px_18px_rgba(6,6,22,0.07)] transition hover:-translate-y-1 hover:border-[#0088FF]/40 hover:shadow-[0_16px_36px_rgba(0,136,255,0.14)] sm:p-5"
                  dir={language === "ar" ? "rtl" : "ltr"}
                  onClick={() => setDetailJob(post)}
                >
                  {/* Photo on top (admin upload per job) */}
                  {hasText(post.image) ? (
                    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#E8F2FF,#F6FAFF)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={jt(post, "title", language) || ""}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}

                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#0A1B33] [overflow-wrap:anywhere] sm:text-[1.15rem]">
                    {jt(post, "title", language)}
                  </h3>

                  {/* Department / type / location as icon rows */}
                  <div className="mt-3 space-y-2">
                    {hasText(jt(post, "department", language)) ? (
                      <p className="flex items-start gap-2 text-[0.85rem] text-slate-600 [overflow-wrap:anywhere]">
                        <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0A6FD8]" aria-hidden />
                        {jt(post, "department", language)}
                      </p>
                    ) : null}
                    {hasText(jt(post, "employmentType", language)) ? (
                      <p className="flex items-start gap-2 text-[0.85rem] text-slate-600 [overflow-wrap:anywhere]">
                        <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0A6FD8]" aria-hidden />
                        {jt(post, "employmentType", language)}
                      </p>
                    ) : null}
                    {hasText(jt(post, "location", language)) ? (
                      <p className="flex items-start gap-2 text-[0.85rem] text-slate-600 [overflow-wrap:anywhere]">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0A6FD8]" aria-hidden />
                        {jt(post, "location", language)}
                      </p>
                    ) : null}
                  </div>

                  {/* Buttons side by side under a divider */}
                  <div className="mt-auto flex items-center gap-2.5 border-t border-slate-100 pt-4">
                    <span className="inline-flex flex-1 items-center justify-center rounded-full border border-[#0088FF]/45 px-3 py-2 text-[0.8rem] font-semibold text-[#0088FF] transition hover:bg-[#EEF6FF]">
                      {ct("viewDetails", language)}
                    </span>
                    <span onClick={(e) => e.stopPropagation()} className="flex-1">
                      <JobApplyButton
                        post={post}
                        onApply={setApplyJob}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#0088FF] px-3 py-2 text-[0.8rem] font-semibold text-white transition hover:brightness-110"
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

function CareersCTA({ cta, hasOpenPositions }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // The primary "Join Our Team" button opens the general application form
  // modal (client request) instead of navigating away.
  const [applyOpen, setApplyOpen] = useState(false);
  // Background comes from this section's own CMS field — blank means a plain
  // dark band, not the hero photo.
  const background = (cta?.image || "").trim();
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
            {background ? (
              <Image
                src={background}
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
              />
            ) : null}
            {/* Lighter scrims so the photo reads brightly; the text keeps its
                contrast from a soft shadow rather than a heavy black wash. */}
            <div className="absolute inset-0 bg-black/28" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
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
              <h2 className="max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-white [text-shadow:0_2px_18px_rgba(3,10,20,0.55)] [overflow-wrap:anywhere]">
                {title}
              </h2>
            ) : null}
            {hasText(subtitle) ? (
              <p className="mt-3 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium text-white [text-shadow:0_2px_14px_rgba(3,10,20,0.55)] [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
            {hasText(description) ? (
              <RichText text={description} className="mt-5 max-w-[620px] text-[0.88rem] leading-6 text-white/90 [text-shadow:0_1px_12px_rgba(3,10,20,0.6)] [overflow-wrap:anywhere] sm:text-[0.94rem] block" />
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
          hasOpenPositions={(content.openPositions?.posts ?? []).filter((p) => p?.status !== "closed").length > 0}
        />
      )}
    </main>
  );
}
