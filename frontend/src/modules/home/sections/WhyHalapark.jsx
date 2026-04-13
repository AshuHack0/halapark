"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  CircleDollarSign,
  Clock3,
  Gauge,
  ScanLine,
  Zap,
} from "lucide-react";

const DESKTOP_NAV_OFFSET = 70;

const whyItems = [
  {
    id: "01",
    icon: Gauge,
    copy: "Optimize bay utilization with live occupancy, reservation controls, and smarter turnaround across every site.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    accent: "#0088FF",
    badge: "Live inventory",
    stat: "500+",
    statLabel: "properties tracked",
    visualTitle: "See demand build before drivers even arrive onsite.",
    chips: ["Live bays", "Booking windows", "Turnover alerts"],
  },
  {
    id: "02",
    icon: ScanLine,
    copy: "Reduce queue friction through ANPR, QR, and barrier-free entry workflows that keep cars moving.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa (2).png",
    accent: "#0088FF",
    badge: "Barrier ready",
    stat: "< 3 sec",
    statLabel: "entry validation",
    visualTitle: "Access states update before the car reaches the barrier.",
    chips: ["ANPR synced", "QR fallback", "Gate rules"],
  },
  {
    id: "03",
    icon: CircleDollarSign,
    copy: "Turn unused private bays into dependable recurring revenue with secure booking and payout controls.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    accent: "#14B8A6",
    badge: "Revenue unlock",
    stat: "4",
    statLabel: "parking revenue modes",
    visualTitle: "List and monetise idle parking supply from one control hub.",
    chips: ["Hourly", "Monthly", "Private rental"],
  },
  {
    id: "04",
    icon: Clock3,
    copy: "Deliver premium guest experiences with on-demand valet and pre-arrival parking flows.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    accent: "#0088FF",
    badge: "Premium arrival",
    stat: "2 taps",
    statLabel: "to reserve and extend",
    visualTitle: "Guest arrivals stay smooth even when demand spikes fast.",
    chips: ["Valet", "Pre-book", "Extend stay"],
  },
  {
    id: "05",
    icon: BarChart3,
    copy: "Act on real-time payments, occupancy, and site performance from one operator dashboard.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    accent: "#0F172A",
    badge: "Operator view",
    stat: "24/7",
    statLabel: "reporting access",
    visualTitle: "Teams, sites, and performance stay visible in one dashboard.",
    chips: ["Payments", "Occupancy", "Alerts"],
  },
  {
    id: "06",
    icon: Zap,
    copy: "Bundle EV-ready parking into the same booking journey so drivers can reserve, park, and charge seamlessly.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
    accent: "#22C55E",
    badge: "EV-ready journey",
    stat: "1 flow",
    statLabel: "from booking to charging",
    visualTitle: "Parking and charging stay connected in a single journey.",
    chips: ["Charge-ready", "Unified checkout", "Driver guidance"],
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function SectionIntro({ centered = false }) {
  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"}`}
    >
      <div className="mx-auto max-w-[980px] text-center">
        <p className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[#0088FF] sm:text-[16px]">
          Why Halapark
        </p>

        <h2
          id="ai-powered-parking-service-title"
          className="mx-auto mt-4 max-w-[900px] text-[clamp(2.25rem,4vw,3.55rem)] font-medium leading-[1.03] tracking-[-0.06em] text-[#050A13]"
        >
          A complete ecosystem for smarter parking
        </h2>
      </div>

      {/* <Link
        href="/contact"
        className={`mt-10 inline-flex min-h-[3.15rem] items-center justify-center rounded-full bg-[#0088FF] px-11 text-[1.02rem] font-medium text-white shadow-[0_16px_34px_rgba(0,136,255,0.2)] transition hover:bg-[#0088FF] ${centered ? "mx-auto" : ""}`}
      >
        Start Monetizing Now
      </Link> */}
    </div>
  );
}

function FeatureVisual({ item, compact = false }) {
  const Icon = item.icon;

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-slate-950 ${
        compact ? "rounded-[2rem]" : "rounded-[24px]"
      }`}
    >
      <Image
        src={item.image}
        alt={item.visualTitle}
        fill
        sizes={
          compact
            ? "(min-width: 768px) 60vw, 100vw"
            : "(min-width: 1280px) 40vw, 50vw"
        }
        className="object-cover"
      />

      {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0.18)_34%,rgba(2,6,23,0.72)_100%)]" /> */}
      {/* <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 8%, ${item.accent}66 0%, transparent 42%)`,
        }}
      /> */}
      {/* 
      <div
        className={`absolute left-4 right-4 top-4 flex items-start justify-between gap-3 ${compact ? "" : "left-6 right-6 top-6"}`}
      >
        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/70">
            Why HalaPark
          </p>
          <p className="mt-1 text-sm font-medium">{item.badge}</p>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[1.4rem] border border-white/20 bg-black/20 text-white backdrop-blur-xl">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div> */}

      {/* <div
        className={`absolute left-4 right-4 bottom-4 ${compact ? "" : "left-6 right-6 bottom-6"}`}
      >
        <div
          className={`rounded-[1.9rem] border border-white/20 bg-white/[0.12] backdrop-blur-xl shadow-[0_24px_64px_rgba(2,6,23,0.28)] ${compact ? "p-4" : "p-6"}`}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                {item.statLabel}
              </p>
              <p
                className={`mt-2 font-semibold tracking-tight text-white ${compact ? "text-3xl" : "text-[2.75rem]"}`}
              >
                {item.stat}
              </p>
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
              {item.id}
            </div>
          </div>

          <h3
            className={`mt-4 max-w-[17ch] font-semibold leading-tight tracking-tight text-white ${compact ? "text-lg" : "text-[1.85rem]"}`}
          >
            {item.visualTitle}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default function WhyHalapark() {
  const trackRef = useRef(null);
  const lineFillRef = useRef(null);
  const frameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    const scrollTarget =
      scrollContainer instanceof HTMLElement ? scrollContainer : window;

    const updateScrollState = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const viewportHeight =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.clientHeight
          : window.innerHeight;
      const stickyHeight = viewportHeight - DESKTOP_NAV_OFFSET;
      const trackRect = track.getBoundingClientRect();
      const scrollRange = Math.max(track.offsetHeight - stickyHeight, 1);
      const progress = clamp(
        (DESKTOP_NAV_OFFSET - trackRect.top) / scrollRange,
        0,
        1,
      );

      if (lineFillRef.current) {
        lineFillRef.current.style.transform = `scaleY(${progress})`;
      }

      const nextIndex = clamp(
        Math.round(progress * (whyItems.length - 1)),
        0,
        whyItems.length - 1,
      );

      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateScrollState();
      });
    };

    requestUpdate();
    scrollTarget.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      scrollTarget.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro />
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 lg:mt-12">
        <div className="lg:hidden">
          <div className="mt-10 grid gap-6">
            {whyItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.28em] text-slate-500">
                      {item.id}
                    </div>

                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-slate-950 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-4 h-[20rem]">
                    <FeatureVisual item={item} compact />
                  </div>

                  <p className="mt-5 text-[1rem] leading-7 text-slate-700">
                    {item.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          ref={trackRef}
          className="relative hidden lg:block"
          style={{ height: `${whyItems.length * 100}svh` }}
        >
          <div className="sticky top-[70px] flex h-[calc(100svh-70px)] items-center">
            <div className="grid w-full items-center gap-14 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-[4.5rem]">
              <div className="max-w-[33rem]">
                {/* <SectionIntro /> */}

                <div className="relative mt-10">
                  <div className="absolute left-[0.4rem] top-6 bottom-6 w-px bg-slate-200" />
                  <div className="absolute left-[0.35rem] top-6 bottom-6 w-[3px] overflow-hidden rounded-full">
                    <div
                      ref={lineFillRef}
                      className="absolute inset-0 origin-top rounded-full bg-slate-950"
                      style={{ transform: "scaleY(0)" }}
                    />
                  </div>

                  <div className="space-y-1">
                    {whyItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = index === activeIndex;
                      const isComplete = index < activeIndex;

                      return (
                        <motion.div
                          key={item.id}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="relative min-h-[5.4rem] pl-10 pr-3 py-3"
                        >
                          <span
                            className="absolute left-0 top-5 inline-flex h-[15px] w-[15px] rounded-full border-2 bg-white"
                            style={{
                              borderColor:
                                isActive || isComplete ? "#0f172a" : "#cbd5e1",
                              backgroundColor:
                                isActive || isComplete ? "#0f172a" : "#ffffff",
                              boxShadow: isActive
                                ? `0 0 0 8px ${item.accent}1a`
                                : "none",
                            }}
                          />

                          <p
                            className={`mt-2 max-w-[31rem] text-[1.06rem] leading-7 tracking-[-0.015em] ${
                              isActive
                                ? "font-medium text-slate-950"
                                : isComplete
                                  ? "text-slate-600"
                                  : "text-slate-400"
                            }`}
                          >
                            {item.copy}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto aspect-[0.95] w-full max-w-[39rem] overflow-hidden rounded-[24px] bg-slate-950 shadow-[0_36px_90px_rgba(15,23,42,0.18)]">
                  <div className="pointer-events-none absolute inset-x-[12%] top-8 h-32 rounded-full bg-[#0088FF]/18 blur-3xl" />

                  {whyItems.map((item, index) => {
                    const layerOffset = index - activeIndex;
                    const distance = Math.abs(layerOffset);
                    const isActive = index === activeIndex;

                    return (
                      <motion.div
                        key={item.id}
                        className="absolute inset-0"
                        style={{
                          zIndex: isActive ? 20 : 12 - Math.min(distance, 6),
                        }}
                        animate={{
                          opacity: isActive
                            ? 1
                            : Math.max(0, 0.14 - distance * 0.045),
                          scale: isActive ? 1 : 1.05 + distance * 0.015,
                          y: isActive ? 0 : layerOffset > 0 ? 30 : -18,
                          rotate: isActive ? 0 : layerOffset > 0 ? 1.4 : -1.1,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <FeatureVisual item={item} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
