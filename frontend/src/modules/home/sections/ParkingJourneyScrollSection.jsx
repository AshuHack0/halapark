"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: "Find",
    step: "01",
    eyebrow: "Live Inventory",
    word: "Find.",
    image: "/Find.png",
    title: "See live spaces before drivers arrive.",
    description:
      "Browse real-time bay availability, upfront pricing, and nearby property options from one clear view.",
    points: [
      "Live bay inventory across towers, malls, and mixed-use sites",
      "Clear pricing before arrival",
      "Filters for covered, EV-ready, and premium access zones",
    ],
    gradient: ["#0088FF", "#0088FF"],
    screen: {
      badge: "Nearby availability",
      heroValue: "14 bays",
      heroLabel: "live around Business Bay",
      chips: ["Covered", "EV-ready"],
      rows: [
        { label: "Tower A", value: "4 spaces now", progress: 82 },
        { label: "Marina Deck", value: "AED 12 / hour", progress: 68 },
        { label: "Mall East", value: "2 mins away", progress: 54 },
      ],
      footerLabel: "Search radius",
      footerValue: "1.2 km",
    },
  },
  {
    id: "Park",
    step: "02",
    eyebrow: "Instant Booking",
    word: "Park.",
    image: "/Park.png",
    title: "Lock the right bay in just a few taps.",
    description:
      "Hold a parking space before arrival, set your entry window, and extend the reservation when plans shift.",
    points: [
      "One-tap reservation flow",
      "Arrival windows with flexible extensions",
      "Plate and vehicle details linked to the booking",
    ],
    gradient: ["#0088FF", "#4F46E5"],
    screen: {
      badge: "Reservation confirmed",
      heroValue: "45 min",
      heroLabel: "arrival window secured",
      chips: ["Plate linked", "Extend anytime"],
      rows: [
        { label: "Bay B-204", value: "Held until 09:30", progress: 91 },
        { label: "Vehicle match", value: "ANPR synced", progress: 78 },
        { label: "Quick extend", value: "+30 min ready", progress: 65 },
      ],
      footerLabel: "Booking ID",
      footerValue: "HP-48392",
    },
  },
  {
    id: "Pay",
    step: "03",
    eyebrow: "Touchless Entry",
    word: "Pay.",
    image: "/Pay.png",
    title: "Move through the gate without tickets or waiting.",
    description:
      "HalaPark connects ANPR, QR, and site controls so drivers enter faster and operators reduce queue friction.",
    points: [
      "Plate recognition and QR support",
      "Barrier-ready entry states for faster arrival",
      "Guided handoff from gate to assigned bay",
    ],
    gradient: ["#0891B2", "#14B8A6"],
    screen: {
      badge: "Gate access ready",
      heroValue: "Gate open",
      heroLabel: "entry workflow in progress",
      chips: ["ANPR live", "No ticket needed"],
      rows: [
        { label: "Plate verified", value: "Matched", progress: 94 },
        { label: "Barrier status", value: "Opening now", progress: 76 },
        { label: "Bay guidance", value: "Level 02 / Zone C", progress: 58 },
      ],
      footerLabel: "Entry latency",
      footerValue: "< 3 sec",
    },
  },
  {
    id: "Done",
    step: "04",
    eyebrow: "Operator Control",
    word: "Done",
    image: "/Done.png",
    title: "Track occupancy, revenue, and site performance in one flow.",
    description:
      "Property owners and enterprise operators get a live view of utilisation, earnings, and operational alerts from the same platform.",
    points: [
      "Occupancy and revenue snapshots by site",
      "Operational alerts surfaced in real time",
      "Performance data ready for teams and stakeholders",
    ],
    gradient: ["#0088FF", "#0F172A"],
    screen: {
      badge: "Operations summary",
      heroValue: "88%",
      heroLabel: "occupancy today",
      chips: ["Revenue live", "Alerts synced"],
      rows: [
        { label: "Monthly revenue", value: "AED 42K", progress: 86 },
        { label: "Active alerts", value: "06 resolved", progress: 63 },
        { label: "Avg stay", value: "2h 14m", progress: 57 },
      ],
      footerLabel: "Sites online",
      footerValue: "24/24",
    },
  },
];

const wordLayouts = {
  [-3]: { angle: -144, radius: 176, rotate: -14, opacity: 0.08, scale: 0.64 },
  [-2]: { angle: -130, radius: 160, rotate: -12, opacity: 0.14, scale: 0.74 },
  [-1]: { angle: -112, radius: 146, rotate: -8, opacity: 0.24, scale: 0.86 },
  [0]: { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1.18 },
  [1]: { angle: 128, radius: 138, rotate: 10, opacity: 0.24, scale: 0.84 },
  [2]: { angle: 118, radius: 158, rotate: 14, opacity: 0.14, scale: 0.72 },
  [3]: { angle: 108, radius: 180, rotate: 18, opacity: 0.08, scale: 0.62 },
};

function getArcPosition(angle, radius) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
  };
}

function getWordLayout(offset) {
  const layout = wordLayouts[offset];

  if (layout) {
    if (offset === 0) {
      return layout;
    }

    return {
      ...getArcPosition(layout.angle, layout.radius),
      rotate: layout.rotate,
      opacity: layout.opacity,
      scale: layout.scale,
    };
  }

  const fallback =
    offset < 0
      ? { angle: -152, radius: 194, rotate: -16 }
      : { angle: 100, radius: 198, rotate: 20 };

  return {
    ...getArcPosition(fallback.angle, fallback.radius),
    rotate: fallback.rotate,
    opacity: 0,
    scale: 0.56,
  };
}

function ScreenContent({ step, compact = false }) {
  const imageSizes = compact ? "286px" : "352px";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,rgba(0,136,255,0.06)_100%)]">
      <Image
        src={step.image}
        alt={`${step.word.replace(".", "")} screen`}
        fill
        sizes={imageSizes}
        className="object-cover object-top"
      />
    </div>
  );
}

function PhonePreview({ step, compact = false, animated = true }) {
  const widthClass = compact ? "max-w-[286px]" : "max-w-[352px]";
  const glowClass = compact
    ? "inset-x-8 h-64 blur-3xl"
    : "inset-x-6 h-72 blur-3xl";
  const screenInsetClass = compact
    ? "left-[3.1%] right-[3.1%] top-[2.05%] bottom-[2.55%]"
    : "left-[3.1%] right-[3.1%] top-[2.05%] bottom-[2.55%]";
  const screenRadius = compact ? "rounded-[2.2rem]" : "rounded-[2.6rem]";
  const islandClass = compact
    ? "top-[4.1%] h-[3.1%] w-[33%]"
    : "top-[4.1%] h-[3.1%] w-[33%]";
  const content = <ScreenContent step={step} compact={compact} />;

  return (
    <div className={`relative mx-auto w-full ${widthClass}`}>
      <div
        className={`absolute ${glowClass} top-1/2 -translate-y-1/2 rounded-full bg-[rgba(0,136,255,0.18)]`}
      />

      <div className="relative aspect-[1439/2920] drop-shadow-[0_36px_90px_rgba(15,23,42,0.24)]">
        <Image
          src="/Mock.png"
          alt=""
          fill
          sizes={compact ? "286px" : "352px"}
          className="pointer-events-none select-none object-contain"
          priority={false}
        />

        <div
          className={`absolute ${screenInsetClass} overflow-hidden ${screenRadius} bg-[linear-gradient(180deg,#f8fbff_0%,rgba(0,136,255,0.06)_100%)]`}
        >
          {animated ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -28, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                {content}
              </motion.div>
            </AnimatePresence>
          ) : (
            content
          )}

          <div
            className={`pointer-events-none absolute left-1/2 ${islandClass} -translate-x-1/2 rounded-full bg-slate-950 shadow-[0_1px_0_rgba(255,255,255,0.12)]`}
          />
        </div>
      </div>
    </div>
  );
}

export default function ParkingJourneyScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const elements = stepRefs.current.filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = Number(visibleEntry.target.dataset.stepIndex);

        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-22% 0px -35% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const activeStep = steps[activeIndex];

  return (
    <section className="bg-[#ffffff] py-10 sm:py-12 md:py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================= */}
        <div className="text-center mb-4 sm:mb-5 md:mb-36 bg-white">
          <div className="flex items-center justify-center w-fit mx-auto gap-1.5 rounded-full px-3 py-1">
            <Image
              src="/download(1).svg"
              alt="Features icon"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0"
            />
            <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
              Interactive Parking Journey
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Scroll Through the HalaPark <br /> Experience
          </h2>
          <p className="text-sm sm:text-[15px] font-medium text-[#6D6D6D] max-w-xl mx-auto">
            As users scroll, the journey focus shifts on the left and the live
            interface on the right updates with it. The section stays in sync
            from discovery to operations.
          </p>
        </div>
        {/* =================================== */}
        {/* <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(0,136,255,0.16)] bg-white px-4 py-2 text-sm font-medium text-[#0088FF] shadow-[0_12px_26px_rgba(148,163,184,0.12)]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[rgba(0,136,255,0.08)]0 shadow-[0_0_18px_rgba(0,136,255,0.4)]" />
            <span>Interactive Parking Journey</span>
          </div>

          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3.15rem]">
            Scroll Through the HalaPark Experience
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            As users scroll, the journey focus shifts on the left and the live
            interface on the right updates with it. The section stays in sync
            from discovery to operations.
          </p>
        </div> */}

        <div className="mt-10 hidden lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center">
            <div className="flex h-full w-full items-center rounded-[2rem] p-6">
              <div className="relative mx-auto h-[420px] w-full max-w-[420px] overflow-visible">
                {steps.map((step, index) => {
                  const position = getWordLayout(index - activeIndex);

                  return (
                    <motion.span
                      key={step.id}
                      animate={position}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 22,
                      }}
                      className={`absolute left-[155px] top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[58px] font-semibold tracking-tight ${
                        index === activeIndex
                          ? "text-slate-950"
                          : "text-slate-300"
                      }`}
                    >
                      {step.word}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center justify-center">
              <PhonePreview step={activeStep} />
            </div>

            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                data-step-index={index}
                className="h-[76vh]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:hidden">
          {steps.map((step) => (
            <article
              key={step.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_36px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    {step.word}
                  </h3>
                </div>

                <span className="rounded-full border border-[rgba(0,136,255,0.12)] bg-[rgba(0,136,255,0.08)] px-3 py-1 text-sm font-semibold text-[#0088FF]">
                  Step {step.step}
                </span>
              </div>

              <h4 className="mt-4 text-xl font-semibold leading-tight text-slate-950">
                {step.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>

              <div className="mt-4 space-y-2">
                {step.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span
                      className="mt-2 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: step.gradient[0] }}
                    />
                    <p className="text-sm leading-6 text-slate-600">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <PhonePreview step={step} compact animated={false} />
              </div>
            </article>
          ))}

          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            See The Full Flow
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
