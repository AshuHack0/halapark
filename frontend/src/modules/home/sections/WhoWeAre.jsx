"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Building2, Layers, TrendingUp } from "lucide-react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// Map serializable icon names (stored in CMS) to lucide components.
const whoWeAreIcons = { Layers, TrendingUp, Building2 };

const springPop = { type: "spring", stiffness: 380, damping: 24, mass: 0.85 };
const springSoft = { type: "spring", stiffness: 120, damping: 20 };
const containerEase = [0.22, 1, 0.36, 1];

const chipLabels = [
  "Smart access & occupancy",
  "Operator dashboards",
  "Monetisation-ready",
];

function MagicHeading({ text, reduced }) {
  const words = (text || "").split(" ");
  const accent = new Set(
    words
      .map((w, i) =>
        ["Who", "Parking", "Asset", "Class"].includes(w) ? i : null,
      )
      .filter((i) => i != null),
  );

  return (
    <h2
      id="who-we-are-heading"
      className="mt-5 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] [text-wrap:balance]"
    >
      {words.map((word, i) => {
        const isAccent = accent.has(i);
        return (
          <span
            key={`${word}-${i}`}
            className={`inline-block pr-[0.28em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone] ${
              isAccent
                ? "bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent"
                : "text-[#050A13]"
            }`}
          >
            {word}
          </span>
        );
      })}
    </h2>
  );
}

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const { language } = useLanguage();
  const [activeAudience, setActiveAudience] = useState("business");
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchHomeSection("whoWeAre").then((cms) => {
      if (cms && typeof cms === "object") setContent(cms);
    });
  }, []);

  const headingText = content.eyebrowHeading;
  const audienceContent = content.audiences ?? {};
  // Only items with real text count as content — a cleared item ({icon,
  // title:"", description:""}) must not render an empty card shell.
  const highlights = (content.highlights ?? []).filter(
    (h) =>
      h &&
      (((h.title ?? "").trim()) || ((h.description ?? "").trim())),
  );
  const activeContent =
    audienceContent[activeAudience] ?? audienceContent.business ?? {};

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 35, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 35, mass: 0.4 });

  const spotlight = useMotionTemplate`radial-gradient(42% 38% at ${smoothX}px ${smoothY}px, rgba(0,136,255,0.16), rgba(37,99,235,0.08) 38%, transparent 72%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduced ? 500 : 72,
    damping: reduced ? 80 : 22,
    mass: 0.28,
  });

  const parallaxA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -42]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 56]);
  const parallaxC = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -28]);

  const colLeftY = useTransform(
    smoothProgress,
    [0, 0.32, 0.55, 1],
    reduced ? [0, 0, 0, 0] : [12, 0, 0, -10],
  );
  const colRightY = useTransform(
    smoothProgress,
    [0, 0.38, 0.62, 1],
    reduced ? [0, 0, 0, 0] : [-12, 0, 0, 10],
  );
  const gridFade = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduced ? [0.55, 0.55, 0.55, 0.55, 0.55] : [0.42, 0.58, 0.62, 0.55, 0.45],
  );
  const orbitRotate = useTransform(smoothProgress, [0, 1], reduced ? [0, 0] : [0, 105]);
  const spotlightStrength = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 1],
    reduced ? [0.9, 0.9, 0.9, 0.9] : [0.72, 1, 1, 0.78],
  );
  const onSectionPointerMove = (e) => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  const onSectionPointerLeave = () => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.38);
  };

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.36);
  }, [reduced, mouseX, mouseY]);

  const view = reduced
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.22, margin: "0px 0px -48px 0px" },
      };

  const fadeUp = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 26 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.62, ease: containerEase },
          },
        },
      };

  // Hide the section entirely when the admin has cleared all content:
  // no audience heading/body (EN, non-blank) and no highlight items with text.
  const hasAudienceContent = Object.values(audienceContent).some(
    (a) =>
      a &&
      typeof a === "object" &&
      (((a.heading ?? "").trim()) || ((a.body ?? "").trim())),
  );
  if (content?.enabled === false) return null;
  if (!hasAudienceContent && highlights.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="who-we-are-heading"
      onPointerMove={onSectionPointerMove}
      onPointerLeave={onSectionPointerLeave}
      className="group/who relative overflow-hidden bg-[linear-gradient(180deg,#F6FAFF_0%,#FFFFFF_68%)] py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <style>{`
        @keyframes who-gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .who-gradient-flow {
          animation: who-gradient-flow 7s ease-in-out infinite;
        }
        @keyframes who-shimmer {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes who-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .who-orbit-slow {
          animation: who-orbit 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .who-gradient-flow,
          .who-orbit-slow { animation: none; }
        }
      `}</style>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: gridFade }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,black,transparent)]" />
      </motion.div>

      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 group-hover/who:opacity-100"
          style={{ background: spotlight, opacity: spotlightStrength }}
        />
      )}

      <motion.div
        aria-hidden
        style={{ y: parallaxA }}
        className="pointer-events-none absolute -left-28 top-[18%] z-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle_at_38%_38%,rgba(0,136,255,0.14),rgba(0,136,255,0)_66%)] blur-2xl sm:h-[400px] sm:w-[400px]"
      />
      <motion.div
        aria-hidden
        style={{ y: parallaxB }}
        className="pointer-events-none absolute -right-36 bottom-[6%] z-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(37,99,235,0.1),rgba(37,99,235,0)_64%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ y: parallaxC }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,136,255,0.045),transparent_62%)] blur-3xl"
      />

      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-[20%] z-0 h-3 w-3 rounded-full bg-[#0088FF]/35"
            animate={{ y: [0, -14, 0], opacity: [0.35, 0.85, 0.35], scale: [1, 1.15, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[12%] bottom-[28%] z-0 h-2 w-2 rounded-full bg-[#2563EB]/35"
            animate={{ y: [0, 12, 0], opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[22%] bottom-[18%] z-0 h-2.5 w-2.5 rounded-full bg-[#0ea5e9]/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </>
      )}

      <motion.div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[12%] z-0 h-[min(100vw,680px)] w-[min(100vw,680px)] -translate-x-1/2 opacity-[0.09] ${reduced ? "who-orbit-slow" : ""}`}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent, rgba(0,136,255,0.26), transparent, rgba(37,99,235,0.2), transparent)",
          ...(reduced ? {} : { rotate: orbitRotate }),
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-6 lg:max-w-[560px]"
            style={{ y: colLeftY }}
            {...view}
            variants={
              reduced
                ? undefined
                : {
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.04,
                      },
                    },
                  }
            }
          >
            {/* <motion.div {...fadeUp}>
              <motion.div
                className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#0088FF]/25 bg-white/70 px-2.5 py-1 backdrop-blur-md sm:gap-2 sm:px-3"
                whileHover={reduced ? undefined : { scale: 1.02 }}
                transition={springSoft}
              >
                {!reduced && (
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-80"
                      style={{
                        animation: "who-shimmer 2.8s ease-in-out infinite",
                      }}
                    />
                  </span>
                )}
                <motion.span
                  className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF] sm:h-7 sm:w-7"
                  animate={
                    reduced
                      ? undefined
                      : { rotate: [0, 12, -8, 0], scale: [1, 1.06, 1] }
                  }
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/Layer_1.svg"
                    alt="Hala Park"
                    width={14}
                    height={18}
                    className="object-contain"
                  />
                </motion.span>
                <p className="relative text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0088FF] sm:text-[11px]">
                  {headingText}
                </p>
              </motion.div>
            </motion.div> */}

            {/* <motion.div
              {...fadeUp}
              className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-white/75 p-1 backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => setActiveAudience("users")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  activeAudience === "users"
                    ? "bg-[#0088FF] text-white"
                    : "text-slate-700 hover:text-[#0088FF]"
                }`}
              >
                Users
              </button>
              <button
                type="button"
                onClick={() => setActiveAudience("business")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  activeAudience === "business"
                    ? "bg-[#0088FF] text-white"
                    : "text-slate-700 hover:text-[#0088FF]"
                }`}
              >
                Business
              </button>
            </motion.div> */}

            <MagicHeading
              key={activeAudience}
              text={t(activeContent, "heading", language)}
              reduced={reduced}
            />

            <motion.p
              className="mt-4 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem] [overflow-wrap:anywhere]"
              {...fadeUp}
            >
              {t(activeContent, "body", language)}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                      },
                    }
              }
            >
              {/* {chipLabels.map((label) => (
                <motion.span
                  key={label}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, scale: 0.86, y: 12 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: springPop,
                          },
                        }
                  }
                  whileHover={reduced ? undefined : { y: -3, scale: 1.03 }}
                  className="relative cursor-default rounded-full border border-slate-200/90 bg-white/85 px-4 py-2 text-xs font-medium text-slate-700 shadow-[0_2px_12px_-4px_rgba(6,6,22,0.08)] backdrop-blur-sm sm:text-[13px]"
                >
                  {label}
                </motion.span>
              ))} */}
            </motion.div>
          </motion.div>

          {highlights.length > 0 ? (
          <motion.div
            className="relative lg:col-span-6 lg:pt-1"
            style={{ y: colRightY }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#0088FF]/15 via-transparent to-[#2563EB]/12 blur-2xl sm:-inset-8"
              initial={reduced ? false : { opacity: 0, scale: 0.88 }}
              whileInView={
                reduced
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.95, ease: containerEase },
                    }
              }
              viewport={{ once: true, amount: 0.25 }}
            />

            <ul className="relative flex flex-col gap-4 sm:gap-5">
              {highlights.map((item, index) => {
                const Icon = whoWeAreIcons[item.icon] ?? Layers;
                return (
                  <motion.li
                    key={item.title}
                    initial={
                      reduced ? false : { opacity: 0, x: 48, rotateY: -10, filter: "blur(6px)" }
                    }
                    whileInView={
                      reduced
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            filter: "blur(0px)",
                            transition: {
                              ...springPop,
                              delay: index * 0.12,
                            },
                          }
                    }
                    viewport={{ once: true, amount: 0.3, margin: "0px 0px -36px 0px" }}
                    whileHover={
                      reduced
                        ? undefined
                        : { y: -6, scale: 1.015, transition: springSoft }
                    }
                    style={{ transformPerspective: 1200 }}
                    className="group/card relative"
                  >
                    <div className="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/75 p-px shadow-[0_2px_16px_-6px_rgba(6,6,22,0.12),0_20px_48px_-24px_rgba(0,136,255,0.12)] backdrop-blur-md sm:rounded-[22px]">
                      <div className="pointer-events-none absolute inset-0 rounded-[19px] bg-gradient-to-br from-[#0088FF]/[0.12] via-transparent to-[#2563EB]/[0.12] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 sm:rounded-[21px]" />
                      {!reduced && (
                        <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                          <span
                            className="absolute inset-0"
                            style={{
                              animation: "who-shimmer 1.2s ease-in-out infinite",
                            }}
                          />
              </span>
                      )}
                      <div className="relative rounded-[18px] bg-white/92 p-5 sm:rounded-[20px] sm:p-6">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0088FF]/30 to-transparent opacity-60" />
                        <div className="flex gap-4">
                          <motion.div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0088FF]/15 to-[#2563EB]/10 text-[#0088FF] ring-1 ring-[#0088FF]/15"
                            whileHover={
                              reduced ? undefined : { rotate: [0, -6, 6, 0], scale: 1.06 }
                            }
                            transition={{ duration: 0.45 }}
                          >
                            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                          </motion.div>
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-[#050A13] sm:text-[17px]">
                              {t(item, "title", language)}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                              {t(item, "description", language)}
            </p>
          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
