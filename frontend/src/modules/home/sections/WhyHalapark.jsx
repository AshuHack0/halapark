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
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t, ui } from "@/context/LanguageContext";

const DESKTOP_NAV_OFFSET = 70;
const DESKTOP_STEP_SCROLL_VH = 62;

// Map serializable icon names (stored in CMS) to lucide components.
const whyIcons = { Gauge, ScanLine, CircleDollarSign, Clock3, BarChart3, Zap };

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function SectionIntro({ centered = false, heading = "Why Halapark", subtitle = "" }) {
  // Render the first word plain and the remainder in the gradient accent,
  // matching the original "Why <Halapark>" treatment.
  const trimmed = (heading ?? "").trim();
  const firstSpace = trimmed.indexOf(" ");
  const leadWord = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
  const accentRest = firstSpace === -1 ? "" : trimmed.slice(firstSpace + 1);

  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"}`}
    >
      <div className="mx-auto max-w-[980px] text-center">


        <h2
          id="ai-powered-parking-service-title"
          className="mx-auto mt-4 max-w-[940px] text-[clamp(3rem,5.4vw,4.85rem)] font-semibold leading-[0.98] tracking-[-0.07em] text-[#050A13]"
        >


          {leadWord}
          {accentRest ? (
            <>
              {" "}
              <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                {accentRest}
              </span>
            </>
          ) : null}
        </h2>
          <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
       {subtitle}
        </p>
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
  const Icon = whyIcons[item.icon] ?? Gauge;

  return (
    <div
      className={`relative h-full w-full overflow-hidden  ${
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
  const { language } = useLanguage();
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchHomeSection("whyHalapark").then((cms) => {
      if (cms && typeof cms === "object") setContent(cms);
    });
  }, []);

  // Only items with real text count — a cleared item must not leave an empty
  // image frame + "Learn More" link on the site.
  const visibleWhyItems = (content.items ?? [])
    .filter(
      (it) =>
        it &&
        (((it.title ?? "").trim()) ||
          ((it.subtitle ?? "").trim()) ||
          ((it.copy ?? "").trim())),
    )
    .slice(0, 5);
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
        Math.round(progress * (visibleWhyItems.length - 1)),
        0,
        visibleWhyItems.length - 1,
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
        // Reset the guard — leaving the cancelled frame id here permanently
        // short-circuits requestUpdate() when the effect re-runs (e.g. after
        // returning to the page and the CMS fetch resolving from cache),
        // freezing the scroll animation.
        frameRef.current = null;
      }
    };
  }, [visibleWhyItems.length]);

  // Hide the section entirely when the admin has cleared all content:
  // no heading (EN, non-blank) and no feature items with text.
  if (content?.enabled === false) return null;
  if (!(content.heading ?? "").trim() && visibleWhyItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro heading={t(content, "heading", language)} subtitle={t(content, "subtitle", language)} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 lg:mt-12">
        <div className="lg:hidden">
          <div className="mt-10 grid gap-6">
            {visibleWhyItems.map((item) => {
              const Icon = whyIcons[item.icon] ?? Gauge;

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
                      {item.iconImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.iconImage} alt="" className="h-6 w-6 object-contain" />
                      ) : (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 h-[20rem]">
                    <FeatureVisual item={item} compact />
                  </div>

                  <p className="mt-5 text-[0.88rem] leading-6 text-slate-700 sm:text-[0.94rem]">
                    <span className="block text-[1.12rem] font-semibold leading-7 text-slate-900">
                      {t(item, "title", language) || t(item, "copy", language)}
                    </span>
                    <span className="mt-1 block text-[0.88rem] leading-6 text-slate-700 sm:text-[0.94rem]">
                      {t(item, "subtitle", language) || t(item, "copy", language)}
                    </span>
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-slate-400 transition-colors hover:text-[#0088FF]"
                  >
                    {ui("learnMore", language)}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div
          ref={trackRef}
          className={`relative hidden ${visibleWhyItems.length > 0 ? "lg:block" : ""}`}
          style={{ height: `${visibleWhyItems.length * DESKTOP_STEP_SCROLL_VH}svh` }}
        >
          <div className="sticky top-[70px] flex h-[calc(100svh-70px)] items-center">
            <div className="grid w-full items-center gap-14 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-[4.5rem]">
              <div className="max-w-[33rem]">
                {/* <SectionIntro /> */}

                <div className="relative mt-10">
                  <div className="absolute start-[0.4rem] top-6 bottom-6 w-px bg-slate-200" />
                  <div className="absolute start-[0.35rem] top-6 bottom-6 w-[3px] overflow-hidden rounded-full">
                    <div
                      ref={lineFillRef}
                      className="absolute inset-0 origin-top rounded-full bg-slate-950"
                      style={{ transform: "scaleY(0)" }}
                    />
                  </div>

                  <div className="space-y-1">
                    {visibleWhyItems.map((item, index) => {
                      const Icon = whyIcons[item.icon] ?? Gauge;
                      const isActive = index === activeIndex;
                      const isComplete = index < activeIndex;

                      return (
                        <motion.div
                          key={item.id}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="relative min-h-[5.4rem] ps-10 pe-3 py-3"
                        >
                          <span
                            className="absolute start-0 top-5 inline-flex h-[15px] w-[15px] rounded-full border-2 bg-white"
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

                          <div className="mt-1.5 max-w-[31rem]">
                            <h3
                              className={`text-[1.05rem] font-semibold leading-6 tracking-[-0.015em] ${
                                isActive
                                  ? "text-slate-950"
                                  : isComplete
                                    ? "text-slate-700"
                                    : "text-slate-500"
                              }`}
                            >
                              {t(item, "title", language) || t(item, "copy", language)}
                            </h3>
                            <p
                              className={`mt-1 text-[0.88rem] leading-6 tracking-[-0.012em] ${
                                isActive
                                  ? "text-slate-950"
                                  : isComplete
                                    ? "text-slate-600"
                                    : "text-slate-400"
                              }`}
                            >
                              {t(item, "subtitle", language) || t(item, "copy", language)}
                            </p>
                            <Link
                              href="/contact"
                              className={`mt-3 inline-flex items-center text-sm font-semibold transition-all duration-200 ${
                                isActive
                                  ? "translate-y-0 opacity-100 text-slate-400 hover:text-[#0088FF]"
                                  : "pointer-events-none -translate-y-1 opacity-0"
                              }`}
                            >
                              {ui("learnMore", language)}
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative mx-auto aspect-[0.95] w-full max-w-[39rem] overflow-hidden rounded-[24px]  shadow-[0_36px_90px_rgba(15,23,42,0.18)]">
                  <div className="pointer-events-none absolute inset-x-[12%] top-8 h-32 rounded-full bg-[#0088FF]/18 blur-3xl" />

                  {visibleWhyItems.map((item, index) => {
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
