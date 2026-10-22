"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { PARTNER_FORM_LINK } from "@/components/partners/PartnershipFormProvider";
import {
  ArrowRight,
  Check,
  Building2,
  CreditCard,
  Zap,
  Shield,
  ShieldCheck,
  Car,
  Cctv,
  MapPin,
  BadgeCheck,
  Lock,
  TrendingUp,
  CalendarCheck,
  ParkingCircle,
  Cpu,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero (NEW — light split layout) ───────────────────────────────────────────
// The client felt the old dark video hero (kept below as `OldNewHero`) looked too
// much like the home page. Unique concept: two columns of infrastructure imagery
// scrolling in OPPOSITE directions ("many systems") converging on a central glass
// "One Connected Platform" badge ("→ unified"). Distinct from every other hero.


// Placeholder tiles with the exact size/spacing of the real column, shown while
// the CMS images load (or when none are configured).
function SolutionSkeletonColumn() {
  return (
    <div
      aria-hidden
      className="relative h-full w-[120px] overflow-hidden sm:w-[140px] lg:w-[160px] [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]"
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[150px] w-full shrink-0 animate-pulse rounded-[20px] border border-white/70 bg-[linear-gradient(180deg,#E6F0FB_0%,#D6E6F7_100%)] sm:h-[170px] lg:h-[190px]"
          />
        ))}
      </div>
    </div>
  );
}

function SolutionImageColumn({ images, direction = "up", reduced }) {
  // Duplicate the set so the marquee loops seamlessly.
  const loop = [...images, ...images];
  const animClass = reduced
    ? ""
    : direction === "up"
      ? "sol-marquee-up"
      : "sol-marquee-down";

  return (
    <div className="relative h-full w-[120px] overflow-hidden sm:w-[140px] lg:w-[160px] [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
      <div className={`flex flex-col gap-4 ${animClass}`}>
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-[150px] w-full shrink-0 overflow-hidden rounded-[20px] border border-white/70 shadow-[0_14px_34px_rgba(15,23,42,0.16)] sm:h-[170px] lg:h-[190px]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="160px"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsControlPanel({ reduced, showcase, language, loading = false }) {
  const sc = showcase && typeof showcase === "object" ? showcase : {};
  // Strict-Arabic helper for showcase text (blank AR → English text).
  // Strictly CMS: an empty field renders nothing. (It used to fall back to
  // sample text like "Plate Recognized", so the badges appeared even when the
  // admin had never filled them in.)
  const sct = (key) => {
    if (language === "ar") return (sc.ar?.[key] ?? "").trim();
    return (sc[key] ?? "").trim();
  };
  // A badge shows only when at least one of its own fields has text.
  const centreHasText = Boolean(sct("centerTitle") || sct("centerTitleAccent") || sct("centerBadge"));
  const plateHasText = Boolean(sct("plateTitle") || sct("plateValue"));
  const evHasText = Boolean(sct("evTitle") || sct("evValue") || sct("evNote"));

  // Mosaic images come from the CMS only (no bundled defaults — they used to
  // flash before the real images arrived and looked like a stale cache). While
  // the page data is loading, or when a column has no images, a skeleton of
  // the same tiles is shown instead.
  const imagesA = (Array.isArray(sc.imagesA) ? sc.imagesA.filter(Boolean) : []);
  const imagesB = (Array.isArray(sc.imagesB) ? sc.imagesB.filter(Boolean) : []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Soft glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-[80px] bg-[radial-gradient(circle,rgba(0,136,255,0.16),rgba(37,99,235,0.06)_55%,transparent_75%)] blur-2xl lg:h-[500px] lg:w-[500px]" />

      {/* Dual scrolling image columns */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="relative z-20 flex h-[420px] items-stretch gap-4 sm:h-[480px] sm:gap-5 lg:h-[540px]"
      >
        {!loading && imagesA.length > 0 ? (
          <SolutionImageColumn images={imagesA} direction="up" reduced={reduced} />
        ) : (
          <SolutionSkeletonColumn />
        )}
        {!loading && imagesB.length > 0 ? (
          <SolutionImageColumn images={imagesB} direction="down" reduced={reduced} />
        ) : (
          <SolutionSkeletonColumn />
        )}
      </motion.div>

      {/* Center connector line glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[280px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#0088FF]/40 to-transparent lg:h-[360px]" />

      {/* Central glass "connected platform" badge — only when filled in */}
      {centreHasText ? (
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.45 }}
        className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-white/80 bg-white/90 px-6 py-5 text-center shadow-[0_24px_60px_rgba(15,23,42,0.22)] backdrop-blur-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A3F84] to-[#0088FF] shadow-[0_8px_22px_rgba(0,136,255,0.4)]">
            <Image src="/Layer_1.svg" alt="HalaPark" width={26} height={32} className="h-7 w-auto" />
          </span>
          <div>
            <p className="text-[0.95rem] font-bold leading-tight tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">{sct("centerTitle")}</p>
            <p className="text-[0.95rem] font-bold leading-tight tracking-[-0.03em] text-[#0088FF] [overflow-wrap:anywhere]">{sct("centerTitleAccent")}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(22,179,100,0.1)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#16B364]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16B364] animate-pulse" /> {sct("centerBadge")}
          </span>
        </div>
      </motion.div>
      ) : null}

      {/* Floating chip — ANPR capture (top-left) — only when filled in */}
      {plateHasText ? (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.6, ease, delay: 0.55 }}
        className="pointer-events-none absolute left-[-8%] rtl:left-auto rtl:right-[-8%] top-[6%] z-40 hidden sm:block lg:left-[-16%] rtl:lg:left-auto rtl:lg:right-[-16%]"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white">
            <Car className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13] [overflow-wrap:anywhere]">{sct("plateTitle")}</p>
            <p className="text-[10px] font-mono text-[#667085] [overflow-wrap:anywhere]">{sct("plateValue")}</p>
          </div>
        </div>
      </motion.div>
      ) : null}

      {/* Floating chip — EV charging (bottom-right) — only when filled in */}
      {evHasText ? (
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease, delay: 0.65 }}
        className="pointer-events-none absolute bottom-[6%] right-[-8%] rtl:right-auto rtl:left-[-8%] z-40 hidden sm:block lg:right-[-14%] rtl:lg:right-auto rtl:lg:left-[-14%]"
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#16B364]" fill="currentColor" aria-hidden />
            <p className="text-[11px] font-semibold text-[#050A13] [overflow-wrap:anywhere]">{sct("evTitle")}</p>
          </div>
          <p className="mt-1.5 text-[1.1rem] font-bold tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">{sct("evValue")}</p>
          <p className="text-[9px] text-slate-400 [overflow-wrap:anywhere]">{sct("evNote")}</p>
        </div>
      </motion.div>
      ) : null}

      <style>{`
        @keyframes solMarqueeUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes solMarqueeDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .sol-marquee-up { animation: solMarqueeUp 24s linear infinite; }
        .sol-marquee-down { animation: solMarqueeDown 24s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sol-marquee-up, .sol-marquee-down { animation: none; }
        }
      `}</style>
    </div>
  );
}

function NewHero() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [hero, setHero] = useState({});
  // True until the CMS page has been fetched — drives the mosaic skeleton.
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    fetchPage("solutions")
      .then((data) => {
        const h = data?.sections?.hero;
        if (h && typeof h === "object") {
          setHero((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(h).filter(([, v]) => v !== "" && v != null)),
          }));
        }
      })
      .finally(() => setHeroLoading(false));
  }, []);

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
            dir={language === "ar" ? "rtl" : "ltr"}
            initial={reduced ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <h1 className="max-w-[600px] text-[clamp(2.5rem,5vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
              {t(hero, "title", language)}
              {t(hero, "titleAccent", language) ? (
                <>
                  {" "}
                  <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_45%,#38BDF8_100%)] bg-clip-text text-transparent">
                    {t(hero, "titleAccent", language)}
                  </span>
                </>
              ) : null}
            </h1>

            {t(hero, "subtitle", language) ? (
              <p className="mt-6 max-w-[460px] text-[0.95rem] leading-[1.75] text-slate-500 [overflow-wrap:anywhere]">
                {t(hero, "subtitle", language)}
              </p>
            ) : null}


            <div className="mt-9 flex flex-wrap items-center gap-3">
              {/* Primary button — with a link set in admin it redirects; with
                  the link empty it scrolls down to the solutions grid. */}
              {t(hero, "ctaLabel", language) ? (
                (hero.ctaLink || "").trim() ? (
                  <Link
                    href={(hero.ctaLink || "").trim()}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                  >
                    {t(hero, "ctaLabel", language)}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("solutions-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32)] transition hover:brightness-110"
                  >
                    {t(hero, "ctaLabel", language)}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-y-0.5">
                      <ArrowRight className="h-3.5 w-3.5 rotate-90" aria-hidden />
                    </span>
                  </button>
                )
              ) : null}
              {/* Secondary button — label/link from admin. With a link set it
                  redirects; otherwise it scrolls to the solutions grid. */}
              {(() => {
                const label =
                  (t(hero, "secondaryCtaLabel", language) || "").trim() ||
                  (language === "ar" ? "" : "Explore Our Parking Solutions");
                if (!label) return null;
                const link = (hero.secondaryCtaLink || "").trim();
                const cls =
                  "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]";
                return link ? (
                  <Link href={link} className={cls}>
                    {label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("solutions-grid")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cls}
                  >
                    {label}
                  </button>
                );
              })()}
            </div>
          </motion.div>

          {/* RIGHT — CMS media (video/image) or decorative control-panel mock */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative mt-16 flex min-h-[420px] items-center justify-center lg:mt-0 lg:min-h-[560px]"
          >
            {/* The Solutions hero always uses the animated mosaic + badges
                showcase (fully editable from admin). */}
            <SolutionsControlPanel reduced={reduced} showcase={hero.showcase} language={language} loading={heroLoading} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── OLD Hero (dark video — kept for reference, no longer rendered) ─────────────
/*
function OldNewHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()?.catch(() => {});
    }
  }, []);

  return (
    <section id="hero-section" className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <video onContextMenu={(e) => e.preventDefault()}
              ref={videoRef}
              src="/Halapark Hero Page-Ai.mp4"
              poster="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png"
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-6 py-12 sm:px-12 sm:py-14 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.05] text-white">
                Intelligent Parking Infrastructure
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                HalaPark delivers an AI-powered smart parking solution for large-scale residential, commercial, and mixed-use developments across the UAE.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-block rounded-full bg-[#0088FF] px-10 py-3 text-sm font-medium text-white sm:text-base"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
*/

// ─── Parking Challenges ────────────────────────────────────────────────────────


function GlobalExpansionSection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [content, setContent] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const c = data?.sections?.challenges;
      if (c && typeof c === "object") setContent(c);
      setResolved(true);
    });
  }, []);

  const heading = t(content, "heading", language);
  const gradient = t(content, "headingGradient", language)?.trim() || "";
  const subtitle = t(content, "subtitle", language);
  const description = t(content, "description", language);
  const ctaLabel = t(content, "ctaLabel", language);
  const items = Array.isArray(content.items)
    ? content.items.filter((it) => typeof it === "string" && it.trim() !== "")
    : [];
  const image = content.image || "";

  // Whole section hides when there's nothing to show.
  if (content?.enabled === false) return null;
  if (
    resolved &&
    !heading &&
    !gradient &&
    !subtitle &&
    !description &&
    items.length === 0 &&
    !image
  ) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: text */}
          <motion.div
            dir={language === "ar" ? "rtl" : "ltr"}
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            {heading || gradient ? (
              <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
                {heading}
                {gradient ? (
                  <>
                    {heading ? " " : null}
                    <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{gradient}</span>
                  </>
                ) : null}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
            {description ? (
              <RichText
                text={description}
                className="mt-5 block text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] [overflow-wrap:anywhere]"
              />
            ) : null}

            {items.length > 0 ? (
              <ul className="mt-8 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-[#F4F8FF] px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 sm:text-[0.94rem] [overflow-wrap:anywhere]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {ctaLabel ? (
              <Link href={content.ctaLink || "/app"} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110">
                {ctaLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </Link>
            ) : null}
          </motion.div>

          {/* RIGHT: collage image (CMS-driven — hidden when blank) */}
          {image ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="relative w-full overflow-hidden rounded-[24px]"
            >
              <Image
                src={image}
                alt={heading || "HalaPark parking solutions"}
                width={920}
                height={700}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </motion.div>
          ) : null}

        </div>
      </div>
    </section>
  );
}

// ─── Our Solutions ─────────────────────────────────────────────────────────────

// A card links to its detail page ONLY when it has a real detail page — i.e. a
// non-blank slug (the admin backfills the slug when a detail is created, so a
// card with no detail page has no slug). No /contact fallback.
// A card links to its detail page ONLY when its slug resolves to real content
// (`detailSlugs`). This guarantees a click always lands on a live page instead
// of 404-ing on a card whose detail hasn't been created yet.
function solutionCardHref(card, detailSlugs) {
  const slug = typeof card?.slug === "string" ? card.slug.trim() : "";
  if (!slug) return null;
  if (detailSlugs && !detailSlugs.has(slug)) return null;
  return `/solutions/${slug}`;
}

// 24 of the solution cards still carry the shared "/image.png" placeholder, so
// a photo strip would repeat the same picture down the whole grid. Those cards
// get a tinted icon tile instead; a card with a real uploaded photo shows it.
function isRealCardImage(image) {
  const v = (image || "").trim();
  if (!v) return false;
  return !/\/image\.png$/i.test(v);
}

// Icon + tint per category, matched on the English group name so the look never
// changes with the language. Falls back to the parking mark.
const GROUP_STYLES = [
  [/payment|wallet|billing/i, CreditCard, "from-[#E6F1FF] to-[#D3E6FF]", "text-[#0068C8]"],
  [/access|enforce|security|surveill/i, ShieldCheck, "from-[#E8F4FF] to-[#D7EBFF]", "text-[#0088FF]"],
  [/propert|hospitalit|residen|hotel/i, Building2, "from-[#EAF6F3] to-[#D8EDE7]", "text-[#0E8C73]"],
  [/commercial|retail|mall|office/i, TrendingUp, "from-[#F0EDFF] to-[#E2DCFF]", "text-[#5B4BD6]"],
  [/infrastructure|city|airport|univers|government/i, MapPin, "from-[#FFF1E8] to-[#FFE2D1]", "text-[#D1601A]"],
  [/mobilit|energy|ev|charg/i, Zap, "from-[#EAF7EC] to-[#D7EFDC]", "text-[#1F8A3B]"],
  [/\bai\b|intelligen|smart tech|predict/i, Cpu, "from-[#E9F6FF] to-[#D6EEFF]", "text-[#0A7FB8]"],
  [/monitor|camera|cctv|plate/i, Cctv, "from-[#F2F4F8] to-[#E3E8F0]", "text-[#44546F]"],
];

function groupStyle(group) {
  const g = (group || "").trim();
  const hit = GROUP_STYLES.find(([re]) => re.test(g));
  if (hit) return { Icon: hit[1], tint: hit[2], ink: hit[3] };
  return { Icon: ParkingCircle, tint: "from-[#EAF3FF] to-[#D7E9FF]", ink: "text-[#0088FF]" };
}

function SolutionCard({ card, i, reduced, detailSlugs, categoryLabel }) {
  const { language } = useLanguage();
  const href = solutionCardHref(card, detailSlugs);
  const clickable = Boolean(href);
  const image = (card.image || "").trim();
  const hasPhoto = isRealCardImage(image);
  const { Icon: TileIcon, tint, ink } = groupStyle(card.group);

  // h-full down the whole chain so every card in a row ends at the same height
  // and the media never stops short of the card's bottom edge.
  const inner = (
    <>
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-48">
        {hasPhoto ? (
          <>
            <Image
              src={image}
              alt={card.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/40 to-transparent" />
          </>
        ) : (
          /* Cards still on the shared "/image.png" placeholder get a tinted
             category tile instead, so the same photo doesn't repeat 24 times. */
          <div className={`relative h-full w-full bg-gradient-to-br ${tint}`}>
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60"
            />
            <span className="relative flex h-full w-full items-center justify-center">
              <TileIcon
                className={`h-10 w-10 ${ink} transition-transform duration-500 group-hover:scale-110`}
                strokeWidth={1.5}
                aria-hidden
              />
            </span>
          </div>
        )}

        {/* Category chip — only in the "All" view, where the rail no longer says
            which category a solution belongs to. */}
        {categoryLabel ? (
          <span className="absolute bottom-3 start-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0088FF] shadow-sm backdrop-blur">
            {categoryLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 items-start justify-between gap-3 p-4 sm:gap-4 sm:p-5">
        <div className="flex-1">
          <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] transition-colors duration-300 group-hover:text-[#0088FF] sm:text-[1.05rem] [overflow-wrap:anywhere]">
            {t(card, "title", language)}
          </h3>
          <RichText
            text={t(card, "description", language)}
            className="mt-2 line-clamp-3 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem] block [overflow-wrap:anywhere]"
          />
        </div>
        {clickable ? (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease, delay: Math.min(i, 8) * 0.05 }}
      className="group h-full overflow-hidden rounded-[22px] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]"
    >
      {clickable ? (
        <Link href={href} className="flex h-full flex-col" aria-label={`Learn more about ${card.title}`}>
          {inner}
        </Link>
      ) : (
        <div className="flex h-full cursor-default flex-col">{inner}</div>
      )}
    </motion.article>
  );
}

function StatsSection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [sol, setSol] = useState({});
  const [solutionItems, setSolutionItems] = useState([]);
  const [groupOrder, setGroupOrder] = useState([]);
  // Active category pill ("all" = every solution in one grid).
  const [activeTab, setActiveTab] = useState("all");
  // How many cards are on screen. "All" is 27 solutions — on a phone that is a
  // ~9,000px wall of cards, so the grid pages in instead of dumping everything.
  const PAGE_SIZE = 9;
  const [shown, setShown] = useState(PAGE_SIZE);
  // Slugs that actually have a detail page — a card only links when its slug
  // resolves to real content (otherwise the link would 404).
  const [detailSlugs, setDetailSlugs] = useState(() => new Set());

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const s = data?.sections?.solutions;
      if (s && typeof s === "object") {
        setSol(s);
        if (Array.isArray(s.cards)) setSolutionItems(s.cards);
        if (Array.isArray(s.groups) && s.groups.length > 0) setGroupOrder(s.groups);
      }
      const details = Array.isArray(data?.sections?.details) ? data.sections.details : [];
      setDetailSlugs(new Set(details.map((d) => (d?.slug || "").trim()).filter(Boolean)));
    });
  }, []);

  // A new category always starts from the top of its own list.
  const selectTab = (key) => {
    setActiveTab(key);
    setShown(PAGE_SIZE);
  };

  const heading = t(sol, "heading", language);
  const gradient = t(sol, "headingGradient", language)?.trim() || "";
  const subtitle = t(sol, "subtitle", language);

  // Categories order the display, but a card must ALWAYS map somewhere so it can
  // never silently disappear after saving. Cards whose group matches a category
  // show under it; cards with no group (or a group that no longer matches a
  // category — e.g. it was renamed/deleted) fall into a generic "Solutions"
  // group so they still render and remain clickable. Only cards with a real slug
  // count (cleared/blank cards never render).
  // A card renders when it has a slug OR at least a title — a card whose
  // detail page (slug) doesn't exist yet still SHOWS, just not clickable.
  const validCards = solutionItems.filter(
    (c) => c && (((c.slug || "").trim()) || ((c.title || "").trim())),
  );
  // Trim-insensitive matching so a stray space typed in either the category
  // name or the card's group can never silently ungroup a card.
  const categories = Array.isArray(groupOrder) ? groupOrder.filter(Boolean) : [];
  const catKeys = categories.map((g) => (g || "").trim());
  const cardGroup = (c) => (c.group || "").trim();
  const grouped = categories
    .map((g, gi) => ({
      group: g,
      items: validCards.filter((c) => cardGroup(c) === catKeys[gi]),
    }))
    .filter((g) => g.items.length > 0);
  // Anything not matched by a category (blank/orphaned group) → generic bucket.
  const ungroupedCards = validCards.filter(
    (c) => !catKeys.includes(cardGroup(c)),
  );
  if (ungroupedCards.length > 0) {
    grouped.push({
      group: language === "ar" ? "الحلول" : "Solutions",
      items: ungroupedCards,
      // With no categories defined at all, the fallback bucket renders as a
      // plain grid — no invented "Solutions" category heading.
      hideHeading: catKeys.length === 0,
    });
  }

  // Display name for a category. Arabic names live in sections.solutions.ar.groups
  // at the SAME index as the English list — matching always uses the English key,
  // so switching language can never ungroup a card.
  const groupLabel = (group) => {
    const gi = catKeys.indexOf((group || "").trim());
    if (language === "ar" && gi >= 0) {
      const arName = Array.isArray(sol?.ar?.groups) ? (sol.ar.groups[gi] || "").trim() : "";
      if (arName) return arName;
    }
    return group;
  };

  // If the active category disappears (admin renamed/deleted it), fall back to "all".
  const safeTab =
    activeTab !== "all" && !grouped.some((g) => g.group === activeTab) ? "all" : activeTab;

  const tabs = [
    { key: "all", label: language === "ar" ? "الكل" : "All", count: validCards.length },
    ...grouped
      .filter((g) => !g.hideHeading)
      .map((g) => ({ key: g.group, label: groupLabel(g.group), count: g.items.length })),
  ];

  // One flat list drives the grid — all solutions, or just the active category.
  const visibleCards =
    safeTab === "all"
      ? grouped.flatMap((g) =>
          g.items.map((card) => ({ card, categoryLabel: g.hideHeading ? "" : groupLabel(g.group) })),
        )
      : (grouped.find((g) => g.group === safeTab)?.items ?? []).map((card) => ({
          card,
          categoryLabel: "",
        }));

  // Hide the whole Solutions section when there are no categories with
  // solutions to show — a heading alone (with no solutions) is not rendered.
  if (sol?.enabled === false) return null;
  if (grouped.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div dir={language === "ar" ? "rtl" : "ltr"} className="mx-auto mb-12 max-w-2xl text-center">
          {heading || gradient ? (
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
              {heading}
              {gradient ? (
                <>
                  {heading ? " " : null}
                  <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{gradient}</span>
                </>
              ) : null}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
              {subtitle}
            </p>
          ) : null}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("solutions-grid")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0088FF] px-6 py-2.5 text-[0.9rem] font-semibold text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white"
          >
            Explore Our Solutions ↓
          </button>
        </div>

        <div id="solutions-grid" className="scroll-mt-24" style={{ scrollMarginTop: "90px" }}>
          <div className="lg:grid lg:grid-cols-[232px_1fr] lg:items-start lg:gap-8 xl:grid-cols-[248px_1fr] xl:gap-10">
            {/* ── Category rail (desktop) — sticky, so all 9 categories stay in
                view while the cards scroll. Mirrors to the right side in Arabic
                because <html dir> flips. ── */}
            {tabs.length > 1 ? (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {language === "ar" ? "الفئات" : "Categories"}
                  </p>
                  <ul role="tablist" aria-label={heading || "Solution categories"} className="space-y-1">
                    {tabs.map((tab) => {
                      const active = safeTab === tab.key;
                      return (
                        <li key={tab.key}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => selectTab(tab.key)}
                            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-start text-[0.82rem] font-semibold transition-all duration-300 ${
                              active
                                ? "bg-[linear-gradient(120deg,#0088FF,#1AB2FF)] text-white shadow-[0_8px_20px_rgba(0,136,255,0.25)]"
                                : "text-slate-600 hover:bg-white hover:text-[#0088FF]"
                            }`}
                          >
                            <span className="min-w-0 flex-1 leading-snug [overflow-wrap:anywhere]">{tab.label}</span>
                            <span
                              className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                                active ? "bg-white/20 text-white" : "bg-white text-slate-400"
                              }`}
                            >
                              {tab.count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            ) : null}

            <div>
              {/* ── Same categories as a scrolling pill row on phones/tablets ── */}
              {tabs.length > 1 ? (
                <div className="relative -mx-4 mb-6 px-4 lg:hidden">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 end-0 z-10 w-10 bg-gradient-to-l from-[#F4F8FF] to-transparent rtl:bg-gradient-to-r"
                  />
                  <div
                    role="tablist"
                    aria-label={heading || "Solution categories"}
                    className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {tabs.map((tab) => {
                      const active = safeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => selectTab(tab.key)}
                          className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-all duration-300 ${
                            active
                              ? "bg-[linear-gradient(120deg,#0088FF,#1AB2FF)] text-white shadow-[0_10px_24px_rgba(0,136,255,0.28)]"
                              : "bg-white text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span className="[overflow-wrap:anywhere]">{tab.label}</span>
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                              active ? "bg-white/20 text-white" : "bg-[#F3F7FC] text-slate-400"
                            }`}
                          >
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Remounting on category change gives the new set a soft fade-in. */}
              <motion.div
                key={safeTab}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {visibleCards.slice(0, shown).map((entry, i) => (
                  <SolutionCard
                    key={`${entry.card.slug || entry.card.title}-${i}`}
                    card={entry.card}
                    i={i}
                    reduced={reduced}
                    detailSlugs={detailSlugs}
                    categoryLabel={safeTab === "all" ? entry.categoryLabel : ""}
                  />
                ))}
              </motion.div>

              {visibleCards.length > shown ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0088FF] px-6 py-2.5 text-[0.88rem] font-semibold text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white"
                  >
                    {language === "ar" ? "عرض المزيد" : "Show more"}
                    <span className="rounded-full bg-[#0088FF]/10 px-2 py-0.5 text-[11px] font-bold tabular-nums">
                      {visibleCards.length - shown}
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Solution Integration ──────────────────────────────────────────────────────

// One selectable integration in the left-hand list. Collapsed it is just a
// title; open it reveals the description and key points. Replaces the old grid
// of six large photo cards, which made the section very tall.
function IntegrationRow({ card, index, isActive, onSelect, accent, language }) {
  const title = t(card, "title", language);
  const description = t(card, "description", language);
  const points = Array.isArray(card.points)
    ? card.points
        .map((p) => (typeof p === "string" ? p : t(p, "label", language)))
        .filter((p) => typeof p === "string" && p.trim() !== "")
    : [];

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-expanded={isActive}
        dir={language === "ar" ? "rtl" : "ltr"}
        className={`w-full rounded-2xl border px-4 py-3 text-start transition-all duration-300 ${
          isActive
            ? "border-transparent bg-white shadow-[0_14px_34px_rgba(15,23,42,0.1)]"
            : "border-slate-200/80 bg-white/55 hover:border-slate-300 hover:bg-white"
        }`}
      >
        <span className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums transition-colors duration-300"
            style={
              isActive
                ? { backgroundColor: accent, color: "#fff" }
                : { backgroundColor: "rgba(15,23,42,0.06)", color: "#64748B" }
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            {title ? (
              <span
                className={`block text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] [overflow-wrap:anywhere] ${
                  isActive ? "text-[#050A13]" : "text-slate-600"
                }`}
              >
                {title}
              </span>
            ) : null}

            {isActive ? (
              <motion.span
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3, ease }}
                className="block overflow-hidden"
              >
                {description ? (
                  <RichText
                    text={description}
                    className="mt-2 block text-[0.82rem] leading-6 text-slate-500 [overflow-wrap:anywhere]"
                  />
                ) : null}
                {points.length > 0 ? (
                  <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {points.map((point, pi) => (
                      <span
                        key={pi}
                        className="inline-flex items-start gap-1.5 text-[0.78rem] font-medium leading-snug text-slate-600 [overflow-wrap:anywhere]"
                      >
                        <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: accent }} strokeWidth={3} aria-hidden />
                        {point}
                      </span>
                    ))}
                  </span>
                ) : null}
              </motion.span>
            ) : null}
          </span>
        </span>
      </button>
    </li>
  );
}

function SectorSolutionsSection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [content, setContent] = useState({});
  const [resolved, setResolved] = useState(false);
  // Which integration the right-hand visual is showing.
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const c = data?.sections?.integration;
      if (c && typeof c === "object") setContent(c);
      setResolved(true);
    });
  }, []);

  const heading = t(content, "heading", language) || "";
  const gradient = t(content, "headingGradient", language)?.trim() || "";
  const subtitle = t(content, "subtitle", language) || "";
  const accent = (typeof content.color === "string" && content.color.trim()) || "#0088FF";
  const cards = Array.isArray(content.cards)
    ? content.cards.filter((c) => c && (t(c, "title", language) || t(c, "description", language)))
    : [];

  // Hide the whole section when there's nothing to show.
  if (content?.enabled === false) return null;
  if (resolved && !heading && !gradient && !subtitle && cards.length === 0) {
    return null;
  }

  // Guard against the active row disappearing if the admin removes a card.
  const safeIndex = activeIndex < cards.length ? activeIndex : 0;
  const activeCard = cards[safeIndex] ?? null;
  const activeImage = (activeCard?.image || "").trim();
  const activeTitle = activeCard ? t(activeCard, "title", language) : "";

  return (
    <section className="bg-[#F7FAFF] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          {/* ── LEFT: heading, subtitle, key points ── */}
          <div>
            {heading || gradient || subtitle ? (
              <div dir={language === "ar" ? "rtl" : "ltr"} className="mb-7">
                {heading || gradient ? (
                  <h2 className="text-[clamp(2.1rem,3.6vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                    {heading}
                    {gradient ? (
                      <>
                        {heading ? " " : null}
                        <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accent})` }}>
                          {gradient}
                        </span>
                      </>
                    ) : null}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-3 max-w-xl whitespace-pre-line text-[0.95rem] leading-7 text-slate-500 [overflow-wrap:anywhere]">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            ) : null}

            {cards.length > 0 ? (
              <ul className="space-y-2">
                {cards.map((card, i) => (
                  <IntegrationRow
                    key={i}
                    card={card}
                    index={i}
                    isActive={i === safeIndex}
                    onSelect={setActiveIndex}
                    accent={accent}
                    language={language}
                  />
                ))}
              </ul>
            ) : null}
          </div>

          {/* ── RIGHT: the active integration's image ── */}
          {activeImage ? (
            <div className="relative">
              {/* Offset accent panel behind the photo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -end-4 top-10 start-10 rounded-[34px] opacity-[0.12]"
                style={{ backgroundColor: accent }}
              />

              <motion.div
                key={activeImage}
                initial={reduced ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease }}
                className="relative aspect-[16/11] w-full overflow-hidden rounded-[30px] shadow-[0_30px_70px_rgba(15,23,42,0.2)] ring-1 ring-black/5 sm:aspect-[5/4] lg:aspect-auto lg:h-full"
              >
                <Image
                  src={activeImage}
                  alt={activeTitle || ""}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,10,19,0.72)_100%)]"
                />

                {/* Counter */}
                <span className="absolute end-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tabular-nums text-white ring-1 ring-white/25 backdrop-blur-md">
                  {String(safeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                </span>

                {/* Glass caption */}
                {activeTitle ? (
                  <div
                    dir={language === "ar" ? "rtl" : "ltr"}
                    className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur-md"
                  >
                    <p className="text-[0.95rem] font-semibold leading-snug text-white [overflow-wrap:anywhere]">
                      {activeTitle}
                    </p>
                    <span className="mt-2.5 flex gap-1.5">
                      {cards.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === safeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                ) : null}
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Smart Cities + Seamless Integrations ─────────────────────────────────────

// Icon-name → component for the Seamless Integrations items (CMS-editable by
// icon name; an item's `iconImage` URL overrides the named icon when present).
const SEAMLESS_ICONS = {
  ParkingCircle, ShieldCheck, CreditCard, Building2, Zap, Cpu,
  Car, Cctv, Shield,
};

function TrustedBySection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [trust, setTrust] = useState({});
  const [seamless, setSeamless] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const tr = data?.sections?.trust;
      if (tr && typeof tr === "object") setTrust(tr);
      const sm = data?.sections?.seamless;
      if (sm && typeof sm === "object") setSeamless(sm);
      setResolved(true);
    });
  }, []);

  // Seamless Integrations (CMS-driven).
  const smHeading = t(seamless, "heading", language) || "";
  const smGradient = t(seamless, "headingGradient", language)?.trim() || "";
  const smSubtitle = t(seamless, "subtitle", language) || "";
  const smItems = (Array.isArray(seamless.items) ? seamless.items : [])
    .map((it, i) => ({
      title: t(it, "title", language) || "",
      icon: it?.icon,
      iconImage: typeof it?.iconImage === "string" ? it.iconImage.trim() : "",
      key: i,
    }))
    .filter((it) => typeof it.title === "string" && it.title.trim() !== "");
  const smHasContent = seamless?.enabled !== false && Boolean(smHeading || smGradient || smSubtitle || smItems.length > 0);

  // Heading + gradient accent (gradient shown only when non-blank, with a space).
  const heading = t(trust, "heading", language) || "";
  const gradient = t(trust, "headingGradient", language)?.trim() || "";
  const subtitle = t(trust, "subtitle", language) || "";
  const image = typeof trust.image === "string" ? trust.image.trim() : "";

  // Key points — strict Arabic via a parallel `ar.keyPoints` array by index.
  // Only points with text in the current language render; blank ones are hidden.
  const keyPoints = (Array.isArray(trust.keyPoints) ? trust.keyPoints : [])
    .map((pt, i) =>
      language === "ar" ? trust.ar?.keyPoints?.[i] ?? "" : pt ?? "",
    )
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s !== "");

  // The Smart Cities (trust) block and the Seamless Integrations block hide
  // INDEPENDENTLY — disabling/clearing one must never take the other down.
  const trustVisible =
    trust?.enabled !== false &&
    Boolean(heading || gradient || subtitle || keyPoints.length > 0 || image);
  if (resolved && !trustVisible && !smHasContent) return null;

  return (
    <>
      {/* Built for Smart Cities */}
      {trustVisible ? (
      <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div dir={language === "ar" ? "rtl" : "ltr"} initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              {heading || gradient ? (
                <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
                  {heading}
                  {gradient ? (
                    <>
                      {heading ? " " : null}
                      <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{gradient}</span>
                    </>
                  ) : null}
                </h2>
              ) : null}
              {subtitle ? (
                <p className="mt-4 max-w-[520px] whitespace-pre-line text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] [overflow-wrap:anywhere]">
                  {subtitle}
                </p>
              ) : null}
              {keyPoints.length > 0 ? (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {keyPoints.map((item, i) => (
                    <motion.li key={`${item}-${i}`} initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease }} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-white px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 shadow-sm [overflow-wrap:anywhere]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : null}
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
              {/* Smart-city image backdrop — CMS-driven (hidden when blank) */}
              {image ? (
                <Image
                  src={image}
                  alt={heading || "Smart public parking infrastructure"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(6,17,31,0.92)_0%,rgba(6,17,31,0.6)_50%,rgba(6,17,31,0.85)_100%)]" />
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#0088FF]/20 blur-3xl" />

              <div className="relative z-10 h-[320px] p-6 sm:h-[360px] sm:p-8 lg:h-[400px]">
                {/* Animated connecting lines: hub (center) → 4 corner nodes */}
                <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <line className="sc-connector" x1="50" y1="50" x2="17" y2="20" style={{ animationDelay: "0s" }} />
                  <line className="sc-connector" x1="50" y1="50" x2="83" y2="20" style={{ animationDelay: "0.2s" }} />
                  <line className="sc-connector" x1="50" y1="50" x2="17" y2="80" style={{ animationDelay: "0.4s" }} />
                  <line className="sc-connector" x1="50" y1="50" x2="83" y2="80" style={{ animationDelay: "0.6s" }} />
                </svg>

                {/* Node dots at the line endpoints */}
                {[
                  { cls: "left-[12%] top-[16%]" },
                  { cls: "right-[12%] top-[16%]" },
                  { cls: "left-[12%] bottom-[16%]" },
                  { cls: "right-[12%] bottom-[16%]" },
                ].map((n, i) => (
                  <span key={`dot-${i}`} className={`absolute z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5BC4FF] shadow-[0_0_10px_rgba(91,196,255,0.8)] ${n.cls}`} />
                ))}

                {/* Central HalaPark hub */}
                <div className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] bg-[#0088FF] shadow-[0_0_50px_rgba(0,136,255,0.6)] sm:h-24 sm:w-24">
                  <span className="absolute inset-0 rounded-[20px] bg-[#0088FF]/40 animate-ping" style={{ animationDuration: "2.6s" }} />
                  <Image src="/Layer_1.svg" alt="HalaPark" width={44} height={56} className="relative h-11 w-auto sm:h-12" />
                </div>

                {/* Capability nodes (labels) at the corners — from CMS keyPoints */}
                {keyPoints.slice(0, 4).map((cap, i) => {
                  const pos = ["left-[3%] top-[6%]", "right-[3%] top-[6%]", "left-[3%] bottom-[6%]", "right-[3%] bottom-[6%]"];
                  return (
                    <motion.div
                      key={`${cap}-${i}`}
                      dir={language === "ar" ? "rtl" : "ltr"}
                      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.12 }}
                      className={`absolute z-20 ${pos[i]} max-w-[140px] rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center text-[10px] font-medium leading-snug text-white backdrop-blur-md sm:text-[11px] [overflow-wrap:anywhere]`}
                    >
                      {cap}
                    </motion.div>
                  );
                })}
              </div>

              <style>{`
                @keyframes scConnectorFlow {
                  from { stroke-dashoffset: 0; }
                  to   { stroke-dashoffset: -8; }
                }
                .sc-connector {
                  fill: none;
                  stroke: #5BC4FF;
                  stroke-width: 0.5;
                  stroke-linecap: round;
                  stroke-dasharray: 2 1.6;
                  animation: scConnectorFlow 1.3s linear infinite;
                  filter: drop-shadow(0 0 3px rgba(91,196,255,0.45));
                }
                @media (prefers-reduced-motion: reduce) { .sc-connector { animation: none; } }
              `}</style>
            </motion.div>
          </div>
        </div>
      </section>
      ) : null}

      {/* Seamless Integrations (CMS-driven — hidden when nothing to show) */}
      {resolved && smHasContent ? (
      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-6 lg:px-8">
          <div dir={language === "ar" ? "rtl" : "ltr"} className="mx-auto max-w-[980px] text-center">
            {smHeading || smGradient ? (
              <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
                {smHeading}
                {smGradient ? (
                  <>
                    {smHeading ? " " : null}
                    <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{smGradient}</span>
                  </>
                ) : null}
              </h2>
            ) : null}
            {smSubtitle ? (
              <p className="mx-auto mt-3 max-w-[650px] whitespace-pre-line text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem] [overflow-wrap:anywhere]">
                {smSubtitle}
              </p>
            ) : null}
          </div>

          {/* Diagram — exact home page style */}
          <style>{`
            @keyframes seamlessConnectorFlow {
              from { stroke-dashoffset: 0; }
              to   { stroke-dashoffset: -6.2; }
            }
            .seamless-connector {
              fill: none;
              stroke: #0088FF;
              stroke-width: 0.45;
              stroke-linecap: round;
              stroke-dasharray: 1.9 1.2;
              animation: seamlessConnectorFlow 1.4s linear infinite;
              filter: drop-shadow(0 0 3px rgba(0,136,255,0.24));
            }
            @media (prefers-reduced-motion: reduce) { .seamless-connector { animation: none; } }
          `}</style>

          <div className="relative mx-auto mt-10 h-[220px] max-w-[370px] sm:h-[252px] sm:max-w-[470px] lg:mt-14 lg:h-[284px] lg:max-w-[650px]">
            <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <line className="seamless-connector" x1="20" y1="26" x2="49" y2="26" style={{ animationDelay: "0s" }} />
              <line className="seamless-connector" x1="2"  y1="51" x2="49" y2="51" style={{ animationDelay: "0.18s" }} />
              <line className="seamless-connector" x1="20" y1="76" x2="49" y2="76" style={{ animationDelay: "0.36s" }} />
              <line className="seamless-connector" x1="51" y1="26" x2="80" y2="26" style={{ animationDelay: "0.08s" }} />
              <line className="seamless-connector" x1="51" y1="51" x2="98" y2="51" style={{ animationDelay: "0.26s" }} />
              <line className="seamless-connector" x1="51" y1="76" x2="80" y2="76" style={{ animationDelay: "0.44s" }} />
            </svg>

            {/* Left nodes */}
            {[
              { icon: CreditCard, cls: "left-[18%] top-[15%]" },
              { icon: Car,        cls: "left-[0%]  top-[41%]" },
              { icon: Cctv,       cls: "left-[18%] top-[64%]" },
            ].map((n, i) => {
              const Icon = n.icon;
              return (
                <div key={i} className={`absolute z-30 flex h-[58px] w-[58px] items-center justify-center rounded-[14px] border border-[#E7EAF0] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px] ${n.cls}`}>
                  <Icon className="h-[28px] w-[28px] text-[#555] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]" strokeWidth={1.65} aria-hidden />
                </div>
              );
            })}

            {/* Right nodes */}
            {[
              { icon: Building2, cls: "right-[18%] top-[15%]" },
              { icon: Zap,       cls: "right-[0%]  top-[41%]" },
              { icon: Shield,    cls: "right-[18%] top-[64%]" },
            ].map((n, i) => {
              const Icon = n.icon;
              return (
                <div key={i} className={`absolute z-30 flex h-[58px] w-[58px] items-center justify-center rounded-[14px] border border-[#E7EAF0] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px] ${n.cls}`}>
                  <Icon className="h-[28px] w-[28px] text-[#555] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]" strokeWidth={1.65} aria-hidden />
                </div>
              );
            })}

            {/* Center HalaPark node */}
            <div className="absolute left-1/2 top-[16%] z-20 flex h-[136px] w-[136px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#24A3FF_0%,#007EEA_100%)] shadow-[0_20px_44px_rgba(0,136,255,0.22)] sm:h-[158px] sm:w-[158px] sm:rounded-[22px] lg:h-[192px] lg:w-[192px] lg:rounded-[24px] lg:shadow-[0_26px_64px_rgba(0,136,255,0.25)]">
              <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_58%)]" />
              <Image src="/Layer_1.svg" alt="HalaPark mark" width={80} height={102} className="relative h-[76px] w-[60px] object-contain sm:h-[88px] sm:w-[70px] lg:h-[102px] lg:w-[80px]" />
            </div>
          </div>

          {/* Scrolling cards — CMS items (icon + title) */}
          {smItems.length > 0 ? (
          <div
            dir={language === "ar" ? "rtl" : "ltr"}
            className="mx-auto mt-10 w-full overflow-x-hidden pb-2 lg:mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-label="Integration systems, scrolling"
          >
            <style>{`
              @keyframes seamlessMarquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .seamless-marquee { animation: seamlessMarquee 45s linear infinite; }
              @media (prefers-reduced-motion: reduce) { .seamless-marquee { animation: none; } }
            `}</style>
            <div className="flex w-max gap-4 sm:gap-5 md:gap-6 seamless-marquee">
              {[...smItems, ...smItems].map((sys, i) => {
                const Icon = SEAMLESS_ICONS[sys.icon] || ParkingCircle;
                return (
                  <div key={i} className="flex w-[min(72vw,300px)] shrink-0 items-center gap-4 rounded-[24px] border border-[#E7EAF0] bg-white p-5 shadow-sm sm:w-[min(40vw,340px)] lg:w-[280px]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#EEF6FF]">
                      {sys.iconImage ? (
                        <Image src={sys.iconImage} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
                      ) : (
                        <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                      )}
                    </div>
                    <p className="text-[0.88rem] font-medium leading-snug text-[#050A13] [overflow-wrap:anywhere]">{sys.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          ) : null}
        </div>
      </section>
      ) : null}
    </>
  );
}

// ─── Industries + Deployment Journey ──────────────────────────────────────────

// Icon-name → component, so the Industries list is CMS-editable by icon name.
const INDUSTRY_ICONS = {
  Zap, Building2, BadgeCheck, Cctv, Shield, MapPin, Lock, TrendingUp, Car, CreditCard, Check,
};

function FeatureHighlightsSection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [features, setFeatures] = useState({});
  const [deployment, setDeployment] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const f = data?.sections?.features;
      if (f && typeof f === "object") setFeatures(f);
      const d = data?.sections?.deployment;
      if (d && typeof d === "object") setDeployment(d);
      setResolved(true);
    });
  }, []);

  // ── Features (Industries / Environments) — strictly CMS-driven ──────────────
  const featHeading = t(features, "heading", language) || "";
  const featGradient = t(features, "headingGradient", language)?.trim() || "";
  const featSubtitle = t(features, "subtitle", language) || "";
  const featImage = typeof features.image === "string" ? features.image.trim() : "";
  // An industry chip's title may come from `title` (new) or legacy `label`. In
  // Arabic, `t()` reads the parallel `ar` sibling for the same key.
  const industries = (Array.isArray(features.industries) ? features.industries : [])
    .map((it) => ({
      raw: it,
      title: (t(it, "title", language) || t(it, "label", language) || "").trim(),
    }))
    .filter((it) => it.title !== "");

  // ── Deployment Journey — strictly CMS-driven ────────────────────────────────
  const depBrand = t(deployment, "brand", language) || "";
  const depHeading = t(deployment, "heading", language) || "";
  const depGradient = t(deployment, "headingGradient", language)?.trim() || "";
  const depSubtitle = t(deployment, "subtitle", language) || "";
  const depImage = typeof deployment.image === "string" ? deployment.image.trim() : "";
  // A video takes priority over the still image when the admin uploads one.
  const depVideo = typeof deployment.video === "string" ? deployment.video.trim() : "";
  const depPanelTitle = t(deployment, "panelTitle", language) || "";
  const depPanelAccent = t(deployment, "panelTitleAccent", language) || "";
  const steps = (Array.isArray(deployment.steps) ? deployment.steps : [])
    .filter((s) => (t(s, "title", language) || t(s, "description", language) || "").trim() !== "");

  // Each sub-section hides when it has nothing to show OR the admin toggled it
  // off ("Show this section on the website").
  const featuresEmpty =
    features?.enabled === false ||
    (!featHeading && !featGradient && !featSubtitle && !featImage && industries.length === 0);
  const deploymentEmpty =
    deployment?.enabled === false ||
    (!depBrand &&
      !depHeading &&
      !depGradient &&
      !depSubtitle &&
      !depImage &&
      !depVideo &&
      !depPanelTitle &&
      !depPanelAccent &&
      steps.length === 0);

  // Whole block hides only when BOTH sub-sections are empty/off.
  if (resolved && featuresEmpty && deploymentEmpty) return null;

  // The marquee needs the list doubled to loop seamlessly — but only when
  // there are enough items to fill the row. With just a few, doubling shows
  // visible duplicates (2 entered → 4 on screen), so render them statically.
  const industriesLoop = industries.length >= 5;
  const marquee = industriesLoop ? [...industries, ...industries] : industries;

  return (
    <>
      {/* Industries / Environments */}
      {!featuresEmpty ? (
        <section className="relative overflow-hidden bg-[#06111f] py-16 sm:py-20 lg:py-24">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {featHeading || featGradient || featSubtitle ? (
              <div dir={language === "ar" ? "rtl" : "ltr"} className="mx-auto mb-12 max-w-4xl text-center">
                {featHeading || featGradient ? (
                  /* Heading on one line; gradient part on its own second line. */
                  <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white [overflow-wrap:anywhere]">
                    <span className="block">{featHeading}</span>
                    {featGradient ? (
                      <span className="block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{featGradient}</span>
                    ) : null}
                  </h2>
                ) : null}
                {featSubtitle ? (
                  <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-white/70 [overflow-wrap:anywhere]">
                    {featSubtitle}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* The uploaded image is its own framed block, not a stretched
                background: it keeps its own aspect ratio (never cropped) and
                shows at full brightness. */}
            {featImage ? (
              <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/15 sm:rounded-[28px]">
                <Image
                  src={featImage}
                  alt={featHeading || ""}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : null}

            {industries.length > 0 ? (
              <div
                className={`w-full overflow-x-hidden ${
                  industriesLoop
                    ? "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                    : ""
                }`}
                aria-label="High-demand environments, scrolling"
              >
                <style>{`
                  @keyframes industriesMarquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                  }
                  .industries-marquee { animation: industriesMarquee 40s linear infinite; }
                  .industries-marquee:hover { animation-play-state: paused; }
                  @media (prefers-reduced-motion: reduce) { .industries-marquee { animation: none; } }
                `}</style>
                <div className={`flex gap-3 sm:gap-4 ${industriesLoop ? "w-max industries-marquee" : "w-full flex-wrap justify-center"}`}>
                  {marquee.map((item, i) => {
                    const iconImage =
                      typeof item.raw?.iconImage === "string" ? item.raw.iconImage.trim() : "";
                    const Icon = INDUSTRY_ICONS[item.raw?.icon] || Building2;
                    return (
                      <div
                        key={`${item.title}-${i}`}
                        dir={language === "ar" ? "rtl" : "ltr"}
                        className="group relative w-[160px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-white/8 p-6 text-center backdrop-blur-sm transition hover:border-[#0088FF]/40 hover:bg-white/12 hover:shadow-[0_12px_32px_rgba(0,136,255,0.25)] sm:w-[180px]"
                      >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/10 transition duration-300 group-hover:bg-[#0088FF] group-hover:shadow-[0_6px_20px_rgba(0,136,255,0.4)]">
                          {iconImage ? (
                            <Image src={iconImage} alt="" width={32} height={32} className="h-10 w-10 object-contain" />
                          ) : (
                            <Icon className="h-6 w-6 text-white/70 transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                          )}
                        </div>
                        <p className="text-[0.88rem] font-semibold leading-tight tracking-[-0.01em] text-white/85 [overflow-wrap:anywhere] sm:text-[0.94rem]">{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Deployment Journey */}
      {!deploymentEmpty ? (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Full-width centered header (matches the other sections) */}
            {depHeading || depGradient || depSubtitle ? (
              <div dir={language === "ar" ? "rtl" : "ltr"} className="mx-auto mb-14 max-w-3xl text-center">
                {depHeading || depGradient ? (
                  <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
                    {depHeading}
                    {depGradient ? (
                      <>
                        {depHeading ? " " : null}
                        <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{depGradient}</span>
                      </>
                    ) : null}
                  </h2>
                ) : null}
                {depSubtitle ? (
                  <p className="mt-4 whitespace-pre-line text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium leading-[1.3] tracking-[-0.02em] text-slate-600 [overflow-wrap:anywhere]">
                    {depSubtitle}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
                {steps.length > 0 ? (
                  <div dir={language === "ar" ? "rtl" : "ltr"} className="mt-10 space-y-5">
                    {steps.map((step, i) => {
                      const stepTitle = t(step, "title", language);
                      const stepDesc = t(step, "description", language);
                      const stepLabel = (step.step || "").trim() || String(i + 1).padStart(2, "0");
                      // Short values ("01") render as the big number; longer
                      // text labels get a FIXED-width column so the right-hand
                      // text starts at the same position on every row.
                      const numeric = stepLabel.length <= 4;
                      return (
                        <motion.div key={`${stepTitle}-${i}`} initial={reduced ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }} className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-[#F4F8FF] p-5">
                          <span
                            className={
                              numeric
                                ? "shrink-0 pt-0.5 text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#0088FF]"
                                : "w-32 shrink-0 pt-0.5 text-[1rem] font-bold leading-snug tracking-[-0.02em] text-[#0078E0] [overflow-wrap:anywhere] sm:w-40"
                            }
                          >
                            {stepLabel}
                          </span>
                          <div className="min-w-0 flex-1">
                            {stepTitle ? <h3 className="font-semibold text-[#050A13] [overflow-wrap:anywhere]">{stepTitle}</h3> : null}
                            {stepDesc ? <RichText text={stepDesc} className="mt-1 block text-[0.88rem] leading-6 text-slate-600 [overflow-wrap:anywhere]" /> : null}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </motion.div>

              <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f] p-8 sm:p-10">
                {depVideo || depImage ? (
                  <div className="absolute inset-0">
                    {depVideo ? (
                      <video
                        src={depVideo}
                        poster={depImage || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onContextMenu={(e) => e.preventDefault()}
                        aria-hidden
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <Image src={depImage} alt="" fill className="object-cover object-center" aria-hidden />
                    )}
                    {/* Light wash only — enough to seat the panel in the section without
                        dimming the photo. */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/40 via-[#06111f]/20 to-[#06111f]/10" />
                  </div>
                ) : null}
                {/* Center overlay (pin + brand + caption) — hidden entirely
                    when all its text fields are cleared, so an uploaded poster
                    with its own artwork/text isn't overprinted. */}
                <div dir={language === "ar" ? "rtl" : "ltr"} className="relative z-10 flex h-[280px] items-center justify-center sm:h-[320px]">
                  {depBrand || depPanelTitle || depPanelAccent ? (
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#0088FF] shadow-[0_0_40px_rgba(0,136,255,0.45)]">
                      <Image src="/Layer_1.svg" alt={depBrand || "HalaPark"} width={32} height={40} className="h-9 w-auto" />
                    </div>
                    {depBrand ? (
                      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-white/50 [overflow-wrap:anywhere]">{depBrand}</p>
                    ) : null}
                    {depPanelTitle || depPanelAccent ? (
                      <p className="mt-2 text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
                        {depPanelTitle}
                        {depPanelTitle && depPanelAccent ? <br /> : null}
                        {depPanelAccent ? <span className="text-[#5BC4FF]">{depPanelAccent}</span> : null}
                      </p>
                    ) : null}
                  </div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

// ─── Why HalaPark ─────────────────────────────────────────────────────────────

function WhyHalaparkSection() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // Rendered purely from CMS (sections.why) — no hardcoded fallbacks.
  const [why, setWhy] = useState(null);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const w = data?.sections?.why;
      if (w && typeof w === "object") setWhy(w);
    });
  }, []);

  if (why?.enabled === false) return null;
  if (!why) return null;

  // Points — strict Arabic via a parallel `ar.points` array by index; blank
  // entries in the current language are hidden.
  const points = (Array.isArray(why.points) ? why.points : [])
    .map((pt, i) => (language === "ar" ? why.ar?.points?.[i] ?? "" : pt ?? ""))
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s !== "");

  const heading = t(why, "heading", language) || "";
  const gradient = t(why, "headingGradient", language)?.trim() || "";
  const headBase =
    gradient && heading.endsWith(gradient)
      ? heading.slice(0, heading.length - gradient.length).trimEnd()
      : heading;
  const showGradient = gradient && heading.endsWith(gradient);

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
              {headBase}
              {showGradient ? (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{gradient}</span>
                </>
              ) : null}
            </h2>
            <ul className="mt-8 space-y-3">
              {points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: i * 0.07 }}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.94rem] font-medium text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] bg-[#06111f]"
          >
            <div className="absolute inset-0">
              {why.image ? (
                <Image
                  src={why.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  aria-hidden
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-[#06111f]/30 to-transparent" />
            </div>
            <div className="relative z-10 flex h-[340px] items-end p-8 sm:h-[400px] sm:p-10">
              <div>
                {t(why, "badge", language) ? (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#5BC4FF] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">{t(why, "badge", language)}</span>
                  </div>
                ) : null}
                <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
                  {t(why, "panelTitle", language)}
                  {t(why, "panelTitleAccent", language) ? (
                    <>
                      <br />
                      <span className="text-[#5BC4FF]">{t(why, "panelTitleAccent", language)}</span>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function NewFinalCTA() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [cta, setCta] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const c = data?.sections?.cta;
      if (c && typeof c === "object") setCta(c);
      setResolved(true);
    });
  }, []);

  // Strictly CMS-driven — no hardcoded fallbacks.
  const heading = t(cta, "heading", language) || "";
  const gradient = t(cta, "headingGradient", language)?.trim() || "";
  const subtitle = t(cta, "subtitle", language) || "";
  const description = t(cta, "description", language) || "";
  const image = typeof cta.image === "string" ? cta.image.trim() : "";

  // Primary button — new primaryLabel, falling back to legacy ctaLabel.
  const primaryLabel = (t(cta, "primaryLabel", language) || t(cta, "ctaLabel", language) || "").trim();
  const primaryLink = cta.primaryPopup ? PARTNER_FORM_LINK : (typeof cta.primaryLink === "string" && cta.primaryLink.trim()) || "/contact";
  const secondaryLabel = (t(cta, "secondaryLabel", language) || "").trim();
  const secondaryLink = cta.secondaryPopup ? PARTNER_FORM_LINK : (typeof cta.secondaryLink === "string" && cta.secondaryLink.trim()) || "/solutions";
  const hasButtons = Boolean(primaryLabel || secondaryLabel);

  // Hide the whole section when there's nothing at all to show.
  if (cta?.enabled === false) return null;
  if (resolved && !heading && !gradient && !subtitle && !description && !hasButtons && !image) {
    return null;
  }

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          {/* Deep gradient base */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(118deg,#071327_0%,#0A1E3C_52%,#0B2E5E_100%)]"
          />

          {/* ── Image panel on the right: an arch, not a rectangle ──
              Rounded right across the top and bottom-right, square where it
              meets the copy, with an offset blue outline echoing the shape. */}
          {image ? (
            <div aria-hidden className="pointer-events-none absolute inset-y-6 end-6 hidden w-[44%] md:block">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[180px_28px_180px_28px] border border-[#1AB2FF]/35 rtl:-translate-x-3 rtl:rounded-[28px_180px_28px_180px]" />
              <div className="absolute inset-0 overflow-hidden rounded-[180px_28px_180px_28px] rtl:rounded-[28px_180px_28px_180px]">
                <Image src={image} alt="" fill className="object-cover object-center" sizes="44vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,19,39,0.78)_0%,rgba(7,19,39,0.18)_55%,transparent_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,19,39,0.78)_0%,rgba(7,19,39,0.18)_55%,transparent_100%)]" />
              </div>
            </div>
          ) : null}

          {/* Glowing network SVG overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0088FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Network lines */}
            {[
              [120,80,400,200],[280,300,400,200],[600,120,400,200],[680,300,400,200],
              [50,200,400,200],[750,200,400,200],[200,50,400,200],[580,350,400,200],
            ].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0088FF" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 6" />
            ))}
            {/* Outer nodes */}
            {[[120,80],[280,300],[600,120],[680,300],[50,200],[750,200],[200,50],[580,350]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#0088FF" fillOpacity="0.7" />
            ))}
            {/* Center glow */}
            <circle cx="400" cy="200" r="60" fill="url(#nodeGlow)" />
            <circle cx="400" cy="200" r="6" fill="#0088FF" />
          </svg>

          <motion.div dir={language === "ar" ? "rtl" : "ltr"} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }} className={`relative z-10 flex flex-col px-6 py-12 sm:px-10 sm:py-14 lg:py-20 ${
              image
                ? "items-center pb-6 text-center md:max-w-[54%] md:items-start md:pb-14 md:pe-4 md:text-start lg:ps-14 lg:pb-20"
                : "items-center text-center"
            }`}>
            {heading || gradient ? (
              /* Heading on one line; the gradient part always on its own
                 second line, per the sitewide pattern. */
              <h2 className="max-w-[620px] text-[clamp(2.2rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white [overflow-wrap:anywhere]">
                {heading ? <span className="block">{heading}</span> : null}
                {gradient ? (
                  <span className="block bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                    {gradient}
                  </span>
                ) : null}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-5 max-w-[500px] whitespace-pre-line text-[0.88rem] leading-6 text-white/70 sm:text-[0.94rem] [overflow-wrap:anywhere]">
                {subtitle}
              </p>
            ) : null}
            {description ? (
              <RichText
                text={description}
                className="mt-3 max-w-[500px] block text-[0.82rem] leading-6 text-white/60 sm:text-[0.88rem] [overflow-wrap:anywhere]"
              />
            ) : null}
            {hasButtons ? (
              <div className={`mt-8 flex flex-wrap items-center gap-3 ${image ? "justify-center md:justify-start" : "justify-center"}`}>
                {primaryLabel ? (
                  <Link href={primaryLink} className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110">
                    {primaryLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </Link>
                ) : null}
                {secondaryLabel ? (
                  <Link href={secondaryLink} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                    <CalendarCheck className="h-4 w-4" aria-hidden />
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          {/* Phones/tablets: the same arch-shaped photo stacked under the copy
              (the absolute panel above is desktop-only). */}
          {image ? (
            <div aria-hidden className="relative z-10 px-6 pb-8 md:hidden">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]">
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[110px_22px_110px_22px] border border-[#1AB2FF]/35 rtl:-translate-x-2 rtl:rounded-[22px_110px_22px_110px]" />
                <div className="absolute inset-0 overflow-hidden rounded-[110px_22px_110px_22px] rtl:rounded-[22px_110px_22px_110px]">
                  <Image src={image} alt="" fill className="object-cover object-center" sizes="100vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,39,0.35)_0%,transparent_45%)]" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ───────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NewHero />
      <GlobalExpansionSection />
      <StatsSection />
      <SectorSolutionsSection />
      <TrustedBySection />
      <FeatureHighlightsSection />
      <WhyHalaparkSection />
      <NewFinalCTA />
    </main>
  );
}
