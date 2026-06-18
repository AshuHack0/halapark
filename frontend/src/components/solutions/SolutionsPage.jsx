"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fetchPage } from "@/lib/cms";
import {
  ArrowRight,
  Check,
  Building2,
  CreditCard,
  Zap,
  Shield,
  Car,
  Cctv,
  MapPin,
  BadgeCheck,
  Lock,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero (NEW — light split layout) ───────────────────────────────────────────
// The client felt the old dark video hero (kept below as `OldNewHero`) looked too
// much like the home page. Unique concept: two columns of infrastructure imagery
// scrolling in OPPOSITE directions ("many systems") converging on a central glass
// "One Connected Platform" badge ("→ unified"). Distinct from every other hero.

const SOL_COL_A = [
  "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  "/AI-Driven Parking Intelligence.jpeg",
];
const SOL_COL_B = [
  "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
  "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
  "/Smart Public Parking.jpeg",
];

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

function SolutionsControlPanel({ reduced }) {
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
        <SolutionImageColumn images={SOL_COL_A} direction="up" reduced={reduced} />
        <SolutionImageColumn images={SOL_COL_B} direction="down" reduced={reduced} />
      </motion.div>

      {/* Center connector line glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[280px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#0088FF]/40 to-transparent lg:h-[360px]" />

      {/* Central glass "connected platform" badge */}
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
            <p className="text-[0.95rem] font-bold leading-tight tracking-[-0.03em] text-[#050A13]">One Connected</p>
            <p className="text-[0.95rem] font-bold leading-tight tracking-[-0.03em] text-[#0088FF]">Platform</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(22,179,100,0.1)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#16B364]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16B364] animate-pulse" /> Unified
          </span>
        </div>
      </motion.div>

      {/* Floating chip — ANPR capture (top-left) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -14, rotate: -5 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.6, ease, delay: 0.55 }}
        className="absolute left-[-8%] top-[6%] z-40 hidden sm:block lg:left-[-16%]"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white">
            <Car className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">Plate Recognized</p>
            <p className="text-[10px] font-mono text-[#667085]">DXB · A 48291</p>
          </div>
        </div>
      </motion.div>

      {/* Floating chip — EV charging (bottom-right) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease, delay: 0.65 }}
        className="absolute bottom-[6%] right-[-8%] z-40 hidden sm:block lg:right-[-14%]"
      >
        <div className="w-[150px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.15)]">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#16B364]" fill="currentColor" aria-hidden />
            <p className="text-[11px] font-semibold text-[#050A13]">EV Bay · 12</p>
          </div>
          <p className="mt-1.5 text-[1.1rem] font-bold tracking-[-0.03em] text-[#050A13]">7.4 kW</p>
          <p className="text-[9px] text-slate-400">charging · 4 active</p>
        </div>
      </motion.div>

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
            <h1 className="max-w-[600px] text-[clamp(2.5rem,5vw,4.4rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13]">
              Intelligent Parking Experiences{" "}
              <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_45%,#38BDF8_100%)] bg-clip-text text-transparent">
                Built for the Future
              </span>
            </h1>

            <p className="mt-6 max-w-[460px] text-[0.95rem] leading-[1.75] text-slate-500">
              HalaPark delivers an AI-powered smart parking ecosystem designed for large-scale residential, commercial, and mixed-use developments across the UAE, enabling seamless mobility, automation, and real-time operational control.
            </p>


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
              <a
                href="#solutions-grid"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
              >
                Explore Our Parking Solutions
              </a>
            </div>
          </motion.div>

          {/* RIGHT — control panel mock */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="relative mt-16 flex min-h-[420px] items-center justify-center lg:mt-0 lg:min-h-[560px]"
          >
            <SolutionsControlPanel reduced={reduced} />
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
            <video
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
  const challenges = [
    "Limited real-time parking visibility",
    "Manual vehicle entry and exit processes",
    "Inefficient space utilization",
    "Friction at access and payment points",
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: text */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Parking{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Challenges</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Solving Parking Inefficiencies Through Smart Mobility
            </p>
            <p className="mt-5 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              Traditional parking systems are manual, fragmented, and lack real-time visibility, causing congestion, operational inefficiencies, and poor user experience. HalaPark transforms parking into a connected ecosystem powered by automation, AI, and real-time control.
            </p>

            <ul className="mt-8 space-y-3">
              {challenges.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-[#F4F8FF] px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 sm:text-[0.94rem]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/app" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110">
              View App Features <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>

          {/* RIGHT: collage image */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="relative w-full overflow-hidden rounded-[24px]"
          >
            <Image
              src="/collageallsolutionsection .jpeg"
              alt="HalaPark parking solutions collage"
              width={920}
              height={700}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Our Solutions ─────────────────────────────────────────────────────────────

const DEFAULT_SOLUTION_ITEMS = [
  { slug: "smart-parking-management", title: "Smart Parking Management",   description: "Centralized platform for monitoring occupancy, controlling parking operations, and managing multiple facilities in real time.", image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" },
  { slug: "automated-access-control", title: "Automated Access Control",   description: "ANPR and smart barrier systems enabling seamless and secure vehicle access.", image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" },
  { slug: "parking-guidance-system", title: "Parking Guidance System",    description: "Real-time wayfinding and space guidance to reduce congestion and improve traffic flow inside facilities.", image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" },
  { slug: "mobile-digital-experience", title: "Mobile & Digital Experience",description: "Mobile reservations, digital payments, subscriptions, and contactless parking interactions.", image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" },
  { slug: "digital-valet-operations", title: "Digital Valet Operations",   description: "Structured valet workflows with digital ticketing, vehicle tracking, and retrieval management.", image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" },
  { slug: "ev-charging-integration", title: "EV Charging Integration",    description: "Integrated EV charging infrastructure with smart billing and charging management.", image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png" },
  { slug: "ai-parking-analytics", title: "AI & Parking Analytics",     description: "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards.", image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png" },
];

// Build the link for a solution card. Uses an explicit `slug` when present
// (CMS or defaults), otherwise slugifies the title. Falls back to /contact.
function solutionCardHref(card) {
  const slug =
    card?.slug ||
    (card?.title
      ? card.title.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : "");
  return slug ? `/solutions/${slug}` : "/contact";
}

function SolutionCard({ card, i, reduced }) {
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease, delay: (i % 4) * 0.06 }}
      className="group overflow-hidden rounded-[22px] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]"
    >
      <Link href={solutionCardHref(card)} className="block" aria-label={`Learn more about ${card.title}`}>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/40 to-transparent" />
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div className="flex-1">
            <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">{card.title}</h3>
            <p className="mt-2 line-clamp-3 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">{card.description}</p>
          </div>
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

const DEFAULT_GROUP_ORDER = [
  "Smart Parking Ecosystem",
  "Digital Payments & User Experience",
  "Access & Enforcement Systems",
  "Property & Hospitality Solutions",
  "Commercial & Retail Solutions",
  "Large Infrastructure & City Solutions",
  "Mobility & Energy Integration",
];

function StatsSection() {
  const reduced = useReducedMotion();
  const [solutionItems, setSolutionItems] = useState(DEFAULT_SOLUTION_ITEMS);
  const [groupOrder, setGroupOrder] = useState(DEFAULT_GROUP_ORDER);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const sol = data?.sections?.solutions;
      if (sol?.cards && Array.isArray(sol.cards)) {
        setSolutionItems(sol.cards);
      }
      if (Array.isArray(sol?.groups) && sol.groups.length > 0) {
        setGroupOrder(sol.groups);
      }
    });
  }, []);

  // Group the cards. Cards without a group fall into "Other Solutions".
  const hasGroups = solutionItems.some((c) => c.group);
  const grouped = [];
  if (hasGroups) {
    const order = [...groupOrder];
    // include any group names that appear on cards but aren't in groupOrder
    solutionItems.forEach((c) => {
      if (c.group && !order.includes(c.group)) order.push(c.group);
    });
    order.forEach((g) => {
      const items = solutionItems.filter((c) => (c.group || "") === g);
      if (items.length) grouped.push({ group: g, items });
    });
    const ungrouped = solutionItems.filter((c) => !c.group);
    if (ungrouped.length) grouped.push({ group: "More Solutions", items: ungrouped });
  }

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            Intelligent parking systems built for efficiency, control, and scale
          </p>
          <a href="#solutions-grid" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0088FF] px-6 py-2.5 text-[0.9rem] font-semibold text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white">
            Explore Our Solutions ↓
          </a>
        </div>

        <div id="solutions-grid">
          {hasGroups ? (
            <div className="space-y-14">
              {grouped.map((g) => (
                <div key={g.group}>
                  {/* Group heading */}
                  <div className="mb-6 flex items-center gap-4">
                    <h3 className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-[#050A13]">
                      {g.group}
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#0088FF]/30 to-transparent" />
                    <span className="rounded-full bg-[#0088FF]/10 px-2.5 py-1 text-[11px] font-bold text-[#0088FF]">
                      {g.items.length}
                    </span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {g.items.map((card, i) => (
                      <SolutionCard key={card.slug || card.title} card={card} i={i} reduced={reduced} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Fallback (no groups): flat responsive grid
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {solutionItems.map((card, i) => (
                <SolutionCard key={card.slug || card.title} card={card} i={i} reduced={reduced} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Solution Integration ──────────────────────────────────────────────────────

const DEFAULT_INTEGRATION_CARDS = [
  { title: "All-in-One Barrier Integration",  description: "All-in-one compact system with barriers, AI cameras, and lighting for efficient parking.",   points: ["Smart barrier control", "AI camera integration", "Automated lighting"],       image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png", gradient: "from-[#0078E0]/85 via-[#0088FF]/60 to-[#0088FF]/20" },
  { title: "ANPR & AI Camera Integration",    description: "ANPR and AI cameras enable secure, real-time parking detection.",                              points: ["License plate recognition", "Real-time detection", "Secure access control"],  image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png", gradient: "from-[#0050B3]/85 via-[#0066CC]/60 to-[#0088FF]/20" },
  { title: "Guidance Display Integration",    description: "Smart displays show real-time parking info for better user experience.",                        points: ["Live space availability", "Wayfinding signage", "Zone-level guidance"],        image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png", gradient: "from-[#004F9A]/85 via-[#0070D0]/60 to-[#1AB2FF]/20" },
  { title: "Software & Kiosk Integration",    description: "Unified system with apps, operations, and kiosks for quick payments and access.",              points: ["Mobile app & web portal", "Self-service kiosks", "Integrated payments"],     image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png", gradient: "from-[#005FA3]/85 via-[#0078C8]/60 to-[#1AB2FF]/20" },
  { title: "Sensor-Based Parking Management", description: "IoT sensors enable real-time parking tracking and space management.",                           points: ["Bay-level occupancy", "Instant alerts", "Predictive analytics"],              image: "/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png", gradient: "from-[#003F7F]/85 via-[#005BB8]/60 to-[#0088FF]/20" },
  { title: "End-to-End System Integration",   description: "Integrated platform for scalable, automated parking operations.",                               points: ["IoT sensor management", "Guidance display system", "Full stack automation"], image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png", gradient: "from-[#003F7F]/85 via-[#0060B8]/60 to-[#0088FF]/20" },
];

function IntegrationCard({ card, i, reduced }) {
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease, delay: i * 0.06 }}
      className="group relative h-[220px] overflow-hidden rounded-[18px] bg-slate-800 sm:h-[260px]"
    >
      <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 640px) 25vw, 50vw" />
      <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        <h3 className="text-[0.9rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1rem]">{card.title}</h3>
        <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[0.75rem] leading-relaxed text-white/85">{card.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

function SectorSolutionsSection() {
  const reduced = useReducedMotion();
  const [integrationCards, setIntegrationCards] = useState(DEFAULT_INTEGRATION_CARDS);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      if (data?.sections?.integration?.cards && Array.isArray(data.sections.integration.cards)) {
        setIntegrationCards(data.sections.integration.cards);
      }
    });
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Solution{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Integration</span>
          </h2>
          <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            End-to-End Integrated Parking Solution
          </p>
        </div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {integrationCards.slice(0, 3).map((card, i) => (
            <IntegrationCard key={card.title} card={card} i={i} reduced={reduced} />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {integrationCards.slice(3, 6).map((card, i) => (
            <IntegrationCard key={card.title} card={card} i={i + 3} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Smart Cities + Seamless Integrations ─────────────────────────────────────

const smartCityCapabilities = [
  "Traffic system integration",
  "Municipality dashboards",
  "Mobility data sharing",
  "Scalable infrastructure layer",
];

const integrationSystems = [
  { icon: CreditCard, label: "Payment gateways" },
  { icon: Car, label: "Access control systems (ANPR, RFID, barriers)" },
  { icon: Cctv, label: "CCTV security systems" },
  { icon: Building2, label: "Building Management Systems (BMS)" },
  { icon: Zap, label: "EV charging networks" },
];

function TrustedBySection() {
  const reduced = useReducedMotion();
  return (
    <>
      {/* Built for Smart Cities */}
      <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
                Built for{" "}
                <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Smart Cities</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
                HalaPark extends beyond parking into urban mobility infrastructure, supporting large-scale smart city development and city-wide optimization.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {smartCityCapabilities.map((item) => (
                  <motion.li key={item} initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease }} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-white px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 shadow-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
              {/* Smart-city image backdrop */}
              <Image
                src="/Smart Public Parking.jpeg"
                alt="Smart public parking infrastructure"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
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

                {/* Capability nodes (labels) at the corners */}
                {smartCityCapabilities.map((cap, i) => {
                  const pos = ["left-[3%] top-[6%]", "right-[3%] top-[6%]", "left-[3%] bottom-[6%]", "right-[3%] bottom-[6%]"];
                  return (
                    <motion.div
                      key={cap}
                      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.3 + i * 0.12 }}
                      className={`absolute z-20 ${pos[i]} max-w-[140px] rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center text-[10px] font-medium leading-snug text-white backdrop-blur-md sm:text-[11px]`}
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

      {/* Seamless Integrations */}
      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Seamless{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Integrations</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              End-to-end integrated parking solution that connects hardware, software, and operations into one unified platform.
            </p>
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

          {/* Scrolling cards — same as home page */}
          <div
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
              {[...integrationSystems, ...integrationSystems].map((sys, i) => {
                const Icon = sys.icon;
                return (
                  <div key={i} className="flex w-[min(72vw,300px)] shrink-0 items-center gap-4 rounded-[24px] border border-[#E7EAF0] bg-white p-5 shadow-sm sm:w-[min(40vw,340px)] lg:w-[280px]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#EEF6FF]">
                      <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <p className="text-[0.88rem] font-medium leading-snug text-[#050A13]">{sys.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Industries + Deployment Journey ──────────────────────────────────────────

// Icon-name → component, so the Industries list is CMS-editable by icon name.
const INDUSTRY_ICONS = {
  Zap, Building2, BadgeCheck, Cctv, Shield, MapPin, Lock, TrendingUp, Car, CreditCard, Check,
};

const DEFAULT_FEATURES = {
  heading: "Built for High-Demand",
  headingGradient: "Environments",
  subtitle: "From airports to smart cities, HalaPark scales across every high-traffic environment.",
  image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  industries: [
    { icon: "Zap", label: "Airports" },
    { icon: "Building2", label: "Shopping Malls" },
    { icon: "BadgeCheck", label: "Hotels" },
    { icon: "Cctv", label: "Residential Towers" },
    { icon: "Shield", label: "Hospitals" },
    { icon: "MapPin", label: "Universities" },
    { icon: "Lock", label: "Government Facilities" },
    { icon: "TrendingUp", label: "Smart Cities" },
  ],
};

const DEFAULT_DEPLOYMENT = {
  heading: "Deployment",
  headingGradient: "Journey",
  subtitle: "We ensure a smooth rollout by understanding your environment, integrating with existing systems, and improving performance over time without disruption.",
  steps: [
    { step: "01", title: "Audit Current Setup", description: "Mapping gates, cameras, payment flows, access rules, and workflows." },
    { step: "02", title: "Connect the Stack", description: "Integration with hardware, software, and payment systems while preserving operations." },
    { step: "03", title: "Launch & Optimize", description: "Go live with dashboards, alerts, reporting, and continuous optimization." },
  ],
  image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  panelTitle: "Go live in days,",
  panelTitleAccent: "not months.",
};

// Merge CMS object over a default, ignoring empty values.
function mergeSection(defaults, incoming) {
  if (!incoming || typeof incoming !== "object") return defaults;
  const out = { ...defaults };
  for (const [k, v] of Object.entries(incoming)) {
    if (v === "" || v == null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

function FeatureHighlightsSection() {
  const reduced = useReducedMotion();
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [deployment, setDeployment] = useState(DEFAULT_DEPLOYMENT);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      setFeatures(mergeSection(DEFAULT_FEATURES, data?.sections?.features));
      setDeployment(mergeSection(DEFAULT_DEPLOYMENT, data?.sections?.deployment));
    });
  }, []);

  const industries = Array.isArray(features.industries) && features.industries.length > 0
    ? features.industries
    : DEFAULT_FEATURES.industries;
  const steps = Array.isArray(deployment.steps) && deployment.steps.length > 0
    ? deployment.steps
    : DEFAULT_DEPLOYMENT.steps;

  return (
    <>
      {/* Industries */}
      <section className="relative overflow-hidden bg-[#06111f] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src={features.image || DEFAULT_FEATURES.image} alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06111f]/50 via-[#06111f]/30 to-[#06111f]/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              {features.heading}{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{features.headingGradient}</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-white/70">
              {features.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {industries.map((item, i) => {
              const Icon = INDUSTRY_ICONS[item.icon] || Building2;
              return (
                <motion.div
                  key={`${item.label}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/8 p-6 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#0088FF]/40 hover:bg-white/12 hover:shadow-[0_12px_32px_rgba(0,136,255,0.25)]"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition duration-300 group-hover:bg-[#0088FF] group-hover:shadow-[0_6px_20px_rgba(0,136,255,0.4)]">
                    <Icon className="h-6 w-6 text-white/70 transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="text-[0.88rem] font-semibold leading-tight tracking-[-0.01em] text-white/85 sm:text-[0.94rem]">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployment Journey */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
                {deployment.heading}{" "}
                <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{deployment.headingGradient}</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
                {deployment.subtitle}
              </p>
              <div className="mt-10 space-y-5">
                {steps.map((step, i) => (
                  <motion.div key={`${step.title}-${i}`} initial={reduced ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }} className="flex gap-5 rounded-2xl border border-slate-100 bg-[#F4F8FF] p-5">
                    <span className="text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#0088FF]/30">{step.step || String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-semibold text-[#050A13]">{step.title}</h3>
                      <p className="mt-1 text-[0.88rem] leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f] p-8 sm:p-10">
              <div className="absolute inset-0">
                <Image src={deployment.image || DEFAULT_DEPLOYMENT.image} alt="" fill className="object-cover object-center" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/40" />
              </div>
              <div className="relative z-10 flex h-[280px] items-center justify-center sm:h-[320px]">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#0088FF] shadow-[0_0_40px_rgba(0,136,255,0.45)]">
                    <Image src="/Layer_1.svg" alt="HalaPark" width={32} height={40} className="h-9 w-auto" />
                  </div>
                  <p className="text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-white/50">HalaPark</p>
                  <p className="mt-2 text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-white">
                    {deployment.panelTitle}<br />
                    <span className="text-[#5BC4FF]">{deployment.panelTitleAccent}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Why HalaPark ─────────────────────────────────────────────────────────────

function WhyHalaparkSection() {
  const reduced = useReducedMotion();
  const points = [
    "End-to-end parking automation",
    "Real-time operational visibility",
    "Scalable multi-site infrastructure",
    "Seamless user experience",
    "Built for UAE smart city standards",
  ];
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
            <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Why Leading Developments{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Choose Halapark?</span>
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
                  <span className="text-[0.94rem] font-medium text-[#050A13]">{point}</span>
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
              <Image
                src="/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png"
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-[#06111f]/30 to-transparent" />
            </div>
            <div className="relative z-10 flex h-[340px] items-end p-8 sm:h-[400px] sm:p-10">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#5BC4FF] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">Live Operations</span>
                </div>
                <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-white">
                  Control room visibility<br />
                  <span className="text-[#5BC4FF]">across every site.</span>
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

const DEFAULT_FINAL_CTA = {
  heading: "Transform Parking Into a",
  headingGradient: "Fully Connected Mobility Infrastructure",
  subtitle:
    "Halapark replaces fragmented parking systems with one intelligent platform that connects access control, real-time operations, and data-driven intelligence. Built for scale, designed for modern developments, and engineered to upgrade existing infrastructure without disruption.",
  ctaLabel: "Request Demo",
  ctaSecondaryLabel: "Talk to Our Team",
  image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
};

function NewFinalCTA() {
  const reduced = useReducedMotion();
  const [cta, setCta] = useState(DEFAULT_FINAL_CTA);

  useEffect(() => {
    fetchPage("solutions").then((data) => {
      const c = data?.sections?.cta;
      if (c && typeof c === "object") {
        // Merge over defaults so any empty CMS field falls back gracefully.
        setCta((prev) => ({
          ...prev,
          ...Object.fromEntries(Object.entries(c).filter(([, v]) => v !== "" && v != null)),
        }));
      }
    });
  }, []);

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          {/* Background: city skyline (CMS-editable: sections.cta.image) */}
          <div className="absolute inset-0">
            <Image src={cta.image || DEFAULT_FINAL_CTA.image} alt="" fill className="object-cover object-center opacity-40" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06111f]/60 via-[#06111f]/40 to-[#06111f]/80" />
          </div>

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

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }} className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <h2 className="max-w-[720px] text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              {cta.heading}{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                {cta.headingGradient}
              </span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[0.88rem] leading-6 text-white/65 sm:text-[0.94rem]">
              {cta.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110">
                {cta.ctaLabel || DEFAULT_FINAL_CTA.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                {cta.ctaSecondaryLabel || DEFAULT_FINAL_CTA.ctaSecondaryLabel}
              </Link>
            </div>
          </motion.div>
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
