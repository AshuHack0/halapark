"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Right-side visual: brand imagery collage ───────────────────────────────────

const ABOUT_MAIN_SLIDES = [
  { img: "/AI-Driven Parking Intelligence.jpeg", label: "AI-Powered Technology" },
  { img: "/Smart & Seamless Experience.jpeg",    label: "Seamless Experience" },
  { img: "/Smart Public Parking.jpeg",           label: "Built for the UAE" },
];

const ABOUT_SUB_SLIDES = [
  "/Maximize Parking Value dekhna ye.jpeg",
  "/Cashless s Secure Payments.jpeg",
  "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
];

function AboutVisual({ reduced }) {
  const [main, setMain] = useState(0);
  const [sub, setSub] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const a = setInterval(() => setMain((p) => (p + 1) % ABOUT_MAIN_SLIDES.length), 3600);
    const b = setInterval(() => setSub((p) => (p + 1) % ABOUT_SUB_SLIDES.length), 2800);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [reduced]);

  const currentMain = ABOUT_MAIN_SLIDES[main];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.16),rgba(37,99,235,0.06)_55%,transparent_75%)] blur-2xl lg:h-[480px] lg:w-[480px]" />

      {/* Slow-rotating dashed orbit ring */}
      {!reduced && (
        <div
          aria-hidden
          className="about-orbit pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[330px] w-[330px] rounded-full border border-dashed border-[#0088FF]/18 lg:h-[450px] lg:w-[450px]"
        />
      )}

      {/* Main tall image card (cross-fading) */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 h-[330px] w-[250px] overflow-hidden rounded-[30px] border border-white/80 shadow-[0_34px_80px_rgba(15,23,42,0.24)] sm:h-[390px] sm:w-[290px] lg:h-[450px] lg:w-[340px]"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={main}
            initial={reduced ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.85, ease }}
            className="absolute inset-0"
          >
            <Image
              src={currentMain.img}
              alt={currentMain.label}
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 290px, 250px"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/78 via-[#050A13]/12 to-[#050A13]/10" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5BE49B] animate-pulse" /> About HalaPark
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMain.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="mt-2 text-[1.3rem] font-semibold leading-tight tracking-[-0.03em] text-white"
            >
              {currentMain.label}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="absolute right-5 top-5 flex gap-1.5">
          {ABOUT_MAIN_SLIDES.map((s, i) => (
            <span
              key={s.label}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === main ? "w-5 bg-white" : "w-1.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Secondary offset image card (own rhythm) — bottom-left */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18, rotate: -4 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.7, ease, delay: 0.35 }}
        className="absolute bottom-[2%] left-[-8%] z-30 hidden h-[130px] w-[150px] overflow-hidden rounded-[22px] border-4 border-white shadow-[0_22px_50px_rgba(15,23,42,0.22)] sm:block lg:bottom-[0%] lg:left-[-16%] lg:h-[160px] lg:w-[185px]"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={sub}
            initial={reduced ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-0"
          >
            <Image
              src={ABOUT_SUB_SLIDES[sub]}
              alt="HalaPark"
              fill
              sizes="185px"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
      </motion.div>

      {/* Floating chip — founded / mission (top-left) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
        className="absolute left-[-6%] top-2 z-40 hidden sm:block lg:left-[-15%] lg:top-4"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
            <Sparkles className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">UAE-Born</p>
            <p className="text-[10px] text-[#667085]">Local expertise</p>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — happy users (bottom-right) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
        className="absolute bottom-[14%] right-[-6%] z-40 hidden sm:block lg:right-[-14%]"
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[#16B364]" strokeWidth={3} aria-hidden />
            <p className="text-[11px] font-semibold text-[#050A13]">Trusted</p>
          </div>
          <p className="mt-1.5 text-[1.1rem] font-bold tracking-[-0.03em] text-[#050A13]">10K+</p>
          <p className="text-[9px] text-slate-400">happy drivers</p>
        </div>
      </motion.div>

      <style>{`
        @keyframes about-orbit-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .about-orbit { animation: about-orbit-spin 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .about-orbit { animation: none; } }
      `}</style>
    </div>
  );
}

// ─── Hero (NEW — light split layout) ────────────────────────────────────────────

export default function AboutHero() {
  const reduced = useReducedMotion();

  const points = [
    "Intelligent parking technology",
    "Local UAE expertise",
    "Friction-free experience",
  ];

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
            <h1 className="max-w-[600px] text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#050A13]">
              We Are Redefining How the{" "}
              <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_45%,#38BDF8_100%)] bg-clip-text text-transparent">
                UAE Parks
              </span>
            </h1>

            <p className="mt-6 max-w-[470px] text-[0.95rem] leading-[1.75] text-slate-500">
              Founded with a clear mission — to eliminate the friction of parking through intelligent technology and local expertise.
            </p>

            <ul className="mt-7 space-y-2.5">
              {points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-[0.9rem] font-medium text-slate-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
              >
                Get In Touch
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — imagery collage */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative mt-16 flex min-h-[420px] items-center justify-center lg:mt-0 lg:min-h-[560px]"
          >
            <AboutVisual reduced={reduced} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────────
   OLD hero (centered, with phone + map mockup). Kept for reference; not rendered.

import RatingBadge from "../common/RatingBadge";

export function AboutHeroOld() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-14 overflow-hidden bg-white max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <div className="flex flex-col items-center text-center w-full h-full">
          <div className="mb-4">
            <RatingBadge rating="4.9" totalReviews="4268" textColor="transparent" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]"
          >
            About HalaPark
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[64px] max-md:text-[40px] max-sm:text-[30px] font-bold text-slate-900 leading-15 max-md:leading-snug tracking-tight mb-6 max-w-4xl"
          >
            We Are Redefining How the UAE Parks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-md:text-base max-sm:text-sm text-slate-600 mb-0 max-w-xl"
          >
            Founded with a clear mission, to eliminate the friction of parking
            through intelligent technology and local expertise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full mt-10 max-sm:mt-8"
          >
            <div className="inset-0 w-full h-full flex items-center justify-center relative">
              <img src="/Frame9991171276918.png" alt="HalaPark" className="h-200 w-300 max-lg:w-full max-lg:h-auto object-cover" />
              <div className="absolute top-110 max-lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] p-3">
                <img src="/aboutherophoneimg.png" alt="HalaPark" className="w-140 h-230 max-lg:w-[280px] max-lg:h-auto max-sm:w-[220px] object-cover" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 max-sm:h-16 bg-gradient-to-t from-white/95 via-white/90 to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 max-sm:h-14 bg-gradient-to-t from-white to-transparent z-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
─────────────────────────────────────────────────────────────────────────────── */
