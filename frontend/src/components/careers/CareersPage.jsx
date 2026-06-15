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
} from "lucide-react";
import JobApplicationModal from "./JobApplicationModal";

const ease = [0.22, 1, 0.36, 1];

const opportunityIcons = {
  Briefcase,
  Headset,
  Building2,
};

// Careers layout: an asymmetric photo mosaic (one tall tile + two stacked tiles),
// each cross-fading independently — a gallery feel, distinct from About/Business.

const CAREERS_TILE_A = [
  "/Smart & Seamless Experience.jpeg",
  "/AI-Driven Parking Intelligence.jpeg",
];
const CAREERS_TILE_B = [
  "/Smart Public Parking.jpeg",
  "/Maximize Parking Value dekhna ye.jpeg",
];
const CAREERS_TILE_C = [
  "/Maximize Parking Value dekhna ye.jpeg",
  "/Smart & Seamless Experience.jpeg",
];

function MosaicTile({ slides, idx, reduced, sizes }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          initial={reduced ? false : { opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="absolute inset-0"
        >
          <Image src={slides[idx]} alt="HalaPark team" fill sizes={sizes} className="object-cover object-center" />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/35 to-transparent" />
    </div>
  );
}

function CareersVisual({ heroImage, reduced }) {
  const tileA = [heroImage || CAREERS_TILE_A[0], ...CAREERS_TILE_A.slice(1)];
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const ta = setInterval(() => setA((p) => (p + 1) % tileA.length), 3800);
    const tb = setInterval(() => setB((p) => (p + 1) % CAREERS_TILE_B.length), 3100);
    const tc = setInterval(() => setC((p) => (p + 1) % CAREERS_TILE_C.length), 2600);
    return () => {
      clearInterval(ta);
      clearInterval(tb);
      clearInterval(tc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

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
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5BE49B] animate-pulse" /> Our Team
          </span>
        </div>
        {/* Top-right tile */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <MosaicTile slides={CAREERS_TILE_B} idx={b} reduced={reduced} sizes="(min-width: 1024px) 210px, 150px" />
        </div>
        {/* Bottom-right tile */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <MosaicTile slides={CAREERS_TILE_C} idx={c} reduced={reduced} sizes="(min-width: 1024px) 210px, 150px" />
        </div>
      </motion.div>

      {/* Floating chip — we're hiring (top-left) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
        className="absolute left-[-6%] top-[-4%] z-40 hidden sm:block lg:left-[-14%]"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
            <Briefcase className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">We&apos;re Hiring</p>
            <p className="text-[10px] text-[#667085]">Join the team</p>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — culture (bottom-right) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
        className="absolute bottom-[-4%] right-[-6%] z-40 hidden sm:block lg:right-[-12%]"
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0088FF]" aria-hidden />
            <p className="text-[11px] font-semibold text-[#050A13]">Culture</p>
          </div>
          <p className="mt-1.5 text-[0.92rem] font-bold leading-tight tracking-[-0.02em] text-[#050A13]">Innovate Daily</p>
          <p className="text-[9px] text-slate-400">grow &amp; build</p>
        </div>
      </motion.div>
    </div>
  );
}

function CareersHero({ hero }) {
  const reduced = useReducedMotion();

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
          >
            <h1 className="max-w-[600px] text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#050A13]">
              {hero?.title}
            </h1>

            <p className="mt-5 max-w-[470px] text-[0.95rem] leading-[1.75] text-slate-500">
              {hero?.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#open-positions"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
              >
                View Open Positions
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
              >
                Get In Touch
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
            <CareersVisual heroImage={hero?.image} reduced={reduced} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BuildingSmarterMobility({ building }) {
  const reduced = useReducedMotion();
  const titleLines = (building?.title ?? "").split("\n");

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
              {titleLines.map((line, i) => (
                <span key={`${line}-${i}`}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h2>
            <div className="mt-8 space-y-5 text-[0.94rem] leading-7 text-slate-500 sm:text-base">
              {(building?.paragraphs ?? []).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OpportunitiesSection({ opportunities }) {
  const reduced = useReducedMotion();
  const items = Array.isArray(opportunities) ? opportunities : [];

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[780px] text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
            Opportunities with HalaPark
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = opportunityIcons[item.icon] ?? Sparkles;
            return (
              <motion.article
                key={`${item.title}-${i}`}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex h-full flex-col rounded-[22px] border border-[#E7EAF0] bg-white p-7 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(6,6,22,0.10)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EEF6FF]">
                    <Icon className="h-6 w-6 text-[#0088FF]" strokeWidth={1.8} aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.02em] text-[#050A13]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-6 text-slate-500">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JobOpenings({ openPositions }) {
  const reduced = useReducedMotion();
  const posts = openPositions?.posts ?? [];
  const [applyJob, setApplyJob] = useState(null);

  if (posts.length === 0) return null;

  return (
    <>
      <JobApplicationModal
        isOpen={Boolean(applyJob)}
        onClose={() => setApplyJob(null)}
        job={applyJob}
      />
    <section id="open-positions" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[780px] text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
            {openPositions?.title ?? "Open Positions"}
          </h2>
          {openPositions?.subtitle ? (
            <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              {openPositions.subtitle}
            </p>
          ) : null}
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-4">
          {posts.map((post, i) => {
              const useForm = post.applyMode === "form";
              const applyHref = post.applyLink || "/contact";
              const ApplyTag = !useForm && applyHref.startsWith("/") ? Link : "a";

              return (
                <motion.article
                  key={`${post.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                  className="rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#050A13] sm:text-lg">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.department ? (
                          <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF]">
                            {post.department}
                          </span>
                        ) : null}
                        {post.employmentType ? (
                          <span className="rounded-full border border-[#E7EAF0] bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600">
                            {post.employmentType}
                          </span>
                        ) : null}
                      </div>
                      {post.location ? (
                        <p className="mt-3 text-sm text-slate-500">{post.location}</p>
                      ) : null}
                      {post.description ? (
                        <p className="mt-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
                          {post.description}
                        </p>
                      ) : null}
                    </div>
                    {useForm ? (
                      <button
                        type="button"
                        onClick={() => setApplyJob(post)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,136,255,0.35)] transition hover:brightness-110"
                      >
                        {post.applyLabel ?? "Apply Now"}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    ) : (
                      <ApplyTag
                        href={applyHref}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,136,255,0.35)] transition hover:brightness-110"
                      >
                        {post.applyLabel ?? "Apply Now"}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </ApplyTag>
                    )}
                  </div>
                </motion.article>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
}

function WhyJoinUs({ whyJoin }) {
  const reduced = useReducedMotion();
  const reasons = whyJoin?.reasons ?? [];

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
              {whyJoin?.title}
            </h2>
            <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-600">
              {whyJoin?.subtitle}
            </p>
            <div className="mt-8 rounded-[20px] border border-[#E7EAF0] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#050A13]">
                More Than Colleagues. One Team.
              </h3>
              <p className="mt-3 text-[0.93rem] leading-7 text-slate-500">
                {whyJoin?.bodyParagraph}
              </p>
            </div>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="space-y-3"
          >
            {reasons.map((reason, i) => (
              <motion.li
                key={`${reason}-${i}`}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[0.94rem] font-medium text-[#050A13]">{reason}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function CareersCTA({ cta, heroImage, hasOpenPositions }) {
  const reduced = useReducedMotion();
  const primaryHref = cta?.primaryCtaLink || "/contact";
  const secondaryHref = cta?.secondaryCtaLink || "#open-positions";
  const SecondaryTag = secondaryHref.startsWith("#") ? "a" : Link;

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
          >
            <h2 className="max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-white">
              {cta?.title}
            </h2>
            <p className="mt-3 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium text-white/85">
              {cta?.subtitle}
            </p>
            <p className="mt-5 max-w-[620px] text-[0.88rem] leading-6 text-white/70 sm:text-[0.94rem]">
              {cta?.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-10 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
              >
                {cta?.primaryCtaText} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {hasOpenPositions ? (
                <SecondaryTag
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-10 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  {cta?.secondaryCtaText}
                </SecondaryTag>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
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
      <CareersHero hero={content.hero} />
      <BuildingSmarterMobility building={content.building} />
      <JobOpenings openPositions={content.openPositions} />
      <OpportunitiesSection opportunities={content.opportunities} />
      <WhyJoinUs whyJoin={content.whyJoin} />
      <CareersCTA
        cta={content.cta}
        heroImage={content.hero?.image}
        hasOpenPositions={(content.openPositions?.posts?.length ?? 0) > 0}
      />
    </main>
  );
}
