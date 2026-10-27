"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingUp, Check, Gauge } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { GetProposalModal, ConsultationModal } from "./BusinessLeadModals";

const ease = [0.22, 1, 0.36, 1];

// ─── Right-side visual: stacked tilted photo-card deck ──────────────────────────
// A fanned deck of overlapping, slightly-rotated photo cards. The front card
// cycles to the back on a timer, rotating the deck through the imagery.
// Distinct from the other heroes' single-card / dashboard / mosaic layouts.

// Per-depth transform for the fanned deck (index 0 = front).
const DECK_LAYOUT = [
  { x: 0,   y: 0,   rotate: -4, scale: 1,    opacity: 1,    z: 40 },
  { x: 26,  y: 18,  rotate: 4,  scale: 0.95, opacity: 0.92, z: 30 },
  { x: -22, y: 34,  rotate: -9, scale: 0.9,  opacity: 0.82, z: 20 },
  { x: 18,  y: 50,  rotate: 9,  scale: 0.86, opacity: 0.7,  z: 10 },
];

function BusinessGrowthPanel({ reduced, slides, loading = false }) {
  // CMS images only — no bundled defaults (they flashed before the real
  // images arrived). Skeleton while loading; nothing if none are set.
  const deck = Array.isArray(slides) ? slides : [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setActive((p) => (p + 1) % deck.length), 3200);
    return () => clearInterval(id);
  }, [reduced, deck.length]);

  const current = deck[active] ?? deck[0];

  if (loading) {
    return (
      <div className="relative flex items-center justify-center" aria-hidden>
        <div className="relative h-[330px] w-[250px] sm:h-[380px] sm:w-[290px] lg:h-[430px] lg:w-[330px]">
          <div className="absolute inset-0 translate-x-5 translate-y-4 rotate-[4deg] animate-pulse rounded-[28px] border-[5px] border-white bg-[#DCE8F6]" />
          <div className="absolute inset-0 -rotate-[4deg] animate-pulse rounded-[28px] border-[5px] border-white bg-[linear-gradient(180deg,#E6F0FB_0%,#D6E6F7_100%)] shadow-[0_30px_70px_rgba(15,23,42,0.12)]" />
        </div>
      </div>
    );
  }
  if (deck.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),rgba(37,99,235,0.06)_55%,transparent_74%)] blur-2xl lg:h-[500px] lg:w-[500px]" />

      {/* ── Fanned deck of photo cards ── */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 h-[330px] w-[250px] sm:h-[380px] sm:w-[290px] lg:h-[430px] lg:w-[330px]"
        style={{ perspective: 1200 }}
      >
        {deck.map((slide, i) => {
          // Depth = how far this card is behind the active (front) one.
          const depth = (i - active + deck.length) % deck.length;
          const layout = DECK_LAYOUT[depth] || DECK_LAYOUT[DECK_LAYOUT.length - 1];
          const isFront = depth === 0;

          return (
            <motion.div
              key={`${slide.img}-${i}`}
              initial={false}
              animate={
                reduced
                  ? { opacity: isFront ? 1 : 0.85 }
                  : {
                      x: layout.x,
                      y: layout.y,
                      rotate: layout.rotate,
                      scale: layout.scale,
                      opacity: layout.opacity,
                    }
              }
              transition={{ duration: 0.7, ease }}
              style={{ zIndex: layout.z }}
              className="absolute inset-0 overflow-hidden rounded-[28px] border-[5px] border-white shadow-[0_30px_70px_rgba(15,23,42,0.24)]"
            >
              <Image
                src={slide.img}
                alt={slide.label}
                fill
                sizes="(min-width: 1024px) 330px, (min-width: 640px) 290px, 250px"
                className="object-cover object-center"
                priority={i === 0}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/72 via-[#050A13]/10 to-[#050A13]/5" />

              {/* Caption only on the front card */}
              {isFront ? (
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5BE49B] animate-pulse" /> For Business
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current.label}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 text-[1.3rem] font-semibold leading-tight tracking-[-0.03em] text-white"
                    >
                      {current.label}
                    </motion.p>
                  </AnimatePresence>
                </div>
              ) : null}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Progress dots */}
      <div className="absolute -bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">
        {deck.map((s, i) => (
          <button
            key={`${s.img}-${i}`}
            type="button"
            aria-label={`Show ${s.label || i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-[#0088FF]" : "w-1.5 bg-[#0088FF]/30 hover:bg-[#0088FF]/60"
            }`}
          />
        ))}
      </div>

      {/* ── Data chip — revenue (top-left) ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
        className="absolute left-[-8%] top-2 z-40 hidden sm:block lg:left-[-16%] lg:top-4"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(22,179,100,0.12)] text-[#16B364]">
            <TrendingUp className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">+34% Revenue</p>
            <p className="text-[10px] text-[#667085]">vs. last year</p>
          </div>
        </div>
      </motion.div>

      {/* ── Data chip — occupancy (right) ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
        className="absolute right-[-6%] top-[34%] z-40 hidden sm:block lg:right-[-16%]"
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-[#0088FF]" aria-hidden />
            <p className="text-[11px] font-semibold text-[#050A13]">Occupancy</p>
          </div>
          <p className="mt-1.5 text-[1.1rem] font-bold tracking-[-0.03em] text-[#050A13]">92%</p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0088FF] to-[#16B364]"
              initial={{ width: "0%" }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.3, ease: "easeOut", delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Data chip — automated (bottom-right) ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 14, rotate: 6 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.6, ease, delay: 0.7 }}
        className="absolute bottom-[10%] right-[-4%] z-40 hidden sm:block lg:right-[-12%]"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.14)]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0088FF] text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <p className="text-[10px] font-semibold text-[#050A13]">Fully Automated</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero (NEW — light split layout, growth themed) ─────────────────────────────

export default function BusinessHero() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [hero, setHero] = useState({});
  // True until the CMS answers — drives the image-deck skeleton.
  const [heroLoading, setHeroLoading] = useState(true);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    fetchBusinessSection("hero")
      .then((section) => {
        if (section) {
          setHero(section);
        }
      })
      .finally(() => setHeroLoading(false));
  }, []);

  // CMS deck images: array of { img, label } (label optional). No built-in
  // fallback — with none set, the right side stays empty.
  const deckImages = (Array.isArray(hero.deckImages) ? hero.deckImages : [])
    .map((d) => (typeof d === "string" ? { img: d, label: "" } : d))
    .filter((d) => d && (d.img || "").trim());

  // Checklist items — strictly from CMS (parallel ar.features in Arabic; blank
  // when missing). No hardcoded fallback: the DB is the single source of truth.
  const features = (
    language === "ar"
      ? (Array.isArray(hero.ar?.features) ? hero.ar.features : [])
      : (Array.isArray(hero.features) ? hero.features : [])
  ).filter((f) => typeof f === "string" && f.trim());

  // CTA buttons — fully CMS-driven, no default labels. Each button shows only
  // when the admin (a) hasn't disabled it AND (b) has provided a label.
  // A link set in the admin turns the button into a redirect; without a link
  // it opens its pop-up form (proposal / consultation) as before.
  const proposalLabel = t(hero, "ctaPrimary", language).trim();
  const consultLabel = t(hero, "ctaSecondary", language).trim();
  const proposalHref = (hero?.ctaPrimaryHref || "").trim();
  const consultHref = (hero?.ctaSecondaryHref || "").trim();
  const showProposal = hero?.showProposal !== false && proposalLabel !== "";
  const showConsult = hero?.showConsultation !== false && consultLabel !== "";

  // Admin "Show this section on the website" toggle.
  if (hero?.enabled === false) return null;

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_38%,#F0F7FF_66%,#EAF3FF_100%)]"
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,black,transparent)]"
      />
      {/* Decorative blobs */}
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
          >
            <h1 className="max-w-[600px] text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[#050A13] [overflow-wrap:anywhere]">
              {t(hero, "title", language)}
              {t(hero, "titleGradient", language) ? (
                <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                  {t(hero, "titleGradient", language)}
                </span>
              ) : null}
            </h1>

            <RichText
              text={t(hero, "description", language)}
              className="mt-6 block max-w-[470px] text-[0.95rem] leading-[1.75] text-slate-500"
            />

            <ul className="mt-7 space-y-2.5">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-[0.9rem] font-medium text-slate-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            {showProposal || showConsult ? (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {showProposal ? (
                  proposalHref ? (
                    <Link
                      href={proposalHref}
                      {...(/^https?:\/\//.test(proposalHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                    >
                      {proposalLabel}
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setProposalOpen(true)}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                    >
                      {proposalLabel}
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                      </span>
                    </button>
                  )
                ) : null}
                {showConsult ? (
                  consultHref ? (
                    <Link
                      href={consultHref}
                      {...(/^https?:\/\//.test(consultHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
                    >
                      {consultLabel}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConsultOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
                    >
                      {consultLabel}
                    </button>
                  )
                ) : null}
              </div>
            ) : null}
          </motion.div>

          {/* RIGHT — growth panel */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative mt-16 flex min-h-[420px] items-center justify-center lg:mt-0 lg:min-h-[560px]"
          >
            <BusinessGrowthPanel reduced={reduced} slides={deckImages} loading={heroLoading} />
          </motion.div>
        </div>
      </div>

      {/* Popups — opened by the two hero CTAs (kept separate from Contact Us) */}
      <GetProposalModal
        isOpen={proposalOpen}
        onClose={() => setProposalOpen(false)}
        config={hero.proposalForm}
        options={hero.proposalOptions}
      />
      <ConsultationModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        config={hero.consultationForm}
        options={hero.consultationTopics}
      />
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────────
   OLD hero (dark, with CMS image/video background — looked like the home page).
   Kept here for reference; no longer rendered.

import { useRef } from "react";
import Image from "next/image";

export function BusinessHeroOld() {
  const videoRef = useRef(null);
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetchBusinessSection("hero").then((section) => {
      if (section) {
        setHero(section);
      }
    });
  }, []);

  useEffect(() => {
    if (videoRef.current && hero.image?.endsWith(".mp4")) {
      videoRef.current.play()?.catch(() => {});
    }
  }, [hero.image]);

  const isVideo = hero.image?.endsWith(".mp4") || hero.image?.endsWith(".webm");

  return (
    <section id="hero-section" className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            {isVideo ? (
              <video onContextMenu={(e) => e.preventDefault()}
                ref={videoRef}
                src={hero.image}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={hero.image}
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
                {hero.title}
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                {hero.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-[#0088FF] px-8 py-3 text-sm font-medium text-white sm:text-base"
                >
                  {t(hero, "ctaPrimary", language) || (language === "ar" ? "" : "Get Proposal")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm sm:text-base"
                >
                  {t(hero, "ctaSecondary", language) || (language === "ar" ? "" : "Book a Free Consultation")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
─────────────────────────────────────────────────────────────────────────────── */
