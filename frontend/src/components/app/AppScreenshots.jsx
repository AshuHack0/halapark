"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Check, MapPin, Send, WalletCards } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const phoneFrameSrc = "/mobileframe.png";

// Built-in step icons are UI chrome only, kept by index. Copy comes strictly
// from the CMS (no hardcoded step titles/text as fallbacks).
const stepIcons = [Send, MapPin, CalendarCheck, WalletCards, Check];

const phoneLayouts = [
  "lg:mt-12 lg:w-[18%]",
  "lg:mt-4 lg:w-[19%]",
  "lg:z-20 lg:w-[22.5%]",
  "lg:mt-5 lg:w-[19%]",
  "lg:mt-12 lg:w-[18%]",
];

function StepItem({ step, index, prefersReducedMotion }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className="flex w-full min-w-0 items-center gap-3 lg:min-w-[172px]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#E4EAF2] bg-white text-[#0088FF] shadow-[0_10px_26px_rgba(15,23,42,0.05)] sm:h-[52px] sm:w-[52px]">
        {step.iconImage ? (
          <Image
            src={step.iconImage}
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 object-contain sm:h-7 sm:w-7"
          />
        ) : Icon ? (
          <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
        ) : null}
      </span>
      <span className="min-w-0 text-left rtl:text-right">
        {step.title ? (
          <span className="block text-sm font-semibold leading-none text-[#050A13] sm:text-[15px] [overflow-wrap:anywhere]">
            {step.title}
          </span>
        ) : null}
        {step.text ? (
          <span className="mt-1.5 block max-w-[11rem] text-[11px] font-medium leading-[1.25] text-[#6B7280] lg:max-w-[106px] [overflow-wrap:anywhere]">
            {step.text}
          </span>
        ) : null}
      </span>
    </motion.div>
  );
}

// Animated connecting line between consecutive step icons: scales-x from 0→1
// on scroll-into-view, staggered per step to give a left-to-right "flow".
function StepConnector({ index, prefersReducedMotion }) {
  return (
    <span
      aria-hidden="true"
      className="hidden h-px w-7 origin-left overflow-hidden rounded-full lg:block rtl:origin-right"
    >
      <motion.span
        className="block h-full w-full bg-gradient-to-r from-[#0088FF] to-[#8EC7FF] rtl:bg-gradient-to-l"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: 0.15 + index * 0.12,
        }}
        style={{ originX: 0 }}
      />
    </span>
  );
}

function PhoneFrame({ screen, index, prefersReducedMotion }) {
  let screenBounds =
    "left-[4.4%] right-[4.4%] top-[1.2%] bottom-[1.45%] rounded-[2.55rem]";

  if (index === 0 || index === 4) {
    screenBounds =
      "left-[3.2%] right-[3.2%] top-[0.8%] bottom-[1%] rounded-[2.35rem]";
  } else if (index === 1 || index === 3) {
    screenBounds =
      "left-[3.7%] right-[3.7%] top-[1%] bottom-[1.2%] rounded-[2.45rem]";
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.52, ease: "easeOut", delay: 0.12 + index * 0.05 }}
      className={`relative mx-auto w-full max-w-[230px] sm:max-w-[250px] md:max-w-[260px] lg:max-w-[270px] ${phoneLayouts[index] || ""}`}
    >
      <div className="absolute inset-x-[18%] bottom-3 h-10 rounded-full bg-[#0F172A]/14 blur-[28px]" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_26px_52px_rgba(15,23,42,0.18)]">
        <div
          className={`absolute z-30 translate-y-[1px] overflow-hidden bg-white ${screenBounds}`}
        >
          <Image
            src={screen.image || phoneFrameSrc}
            alt={screen.title || ""}
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 220px, (min-width: 640px) 250px, 230px"
            className="object-cover object-center"
            priority={index === 2}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 220px, (min-width: 640px) 250px, 230px"
            className="select-none object-contain"
            priority={index === 2}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AppScreenshots() {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const dir = language === "ar" ? "rtl" : "ltr";
  // Phone screenshots are a separate image array (DB is the source of truth).
  const [screens, setScreens] = useState([]);
  // Header copy is strictly CMS-driven — no hardcoded content fallbacks.
  const [header, setHeader] = useState(null);

  useEffect(() => {
    fetchPage("app").then((page) => {
      const cms = page?.sections?.screenshots;
      if (Array.isArray(cms)) setScreens(cms);
      const h = page?.sections?.screenshotsHeader;
      if (h && typeof h === "object") setHeader(h);
    });
  }, []);

  const eyebrow = t(header, "eyebrow", language);
  const heading = t(header, "heading", language);
  const headingAccent = t(header, "headingAccent", language);
  const description = t(header, "description", language);

  // Step copy strictly from CMS; the built-in icon is UI chrome kept by index.
  // If the CMS has no processSteps, render none. Keep only steps with content.
  const cmsSteps = Array.isArray(header?.processSteps) ? header.processSteps : [];
  const displaySteps = cmsSteps
    .map((cms, i) => ({
      icon: stepIcons[i] ?? null,
      iconImage: cms?.iconImage || "",
      title: t(cms, "title", language),
      text: t(cms, "text", language),
    }))
    .filter((s) => s.title || s.text || s.iconImage);

  // Screenshots kept only when they carry an image (DB source of truth).
  const displayScreens = (Array.isArray(screens) ? screens : []).filter(
    (s) => s?.image,
  );

  // Hide the whole section when there is nothing to show.
  const resolved =
    heading ||
    headingAccent ||
    displaySteps.length > 0 ||
    displayScreens.length > 0;
  if (!resolved) return null;
  if (header?.enabled === false) return null;

  return (
    <section
      dir={dir}
      className="overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || headingAccent || description) && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            {eyebrow ? (
              <p className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F8FBFF] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4F5B6F] sm:px-4 sm:text-[11px] sm:tracking-[0.12em] [overflow-wrap:anywhere]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] text-[#0088FF]">
                  <Check aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {eyebrow}
              </p>
            ) : null}

            {(heading || headingAccent) && (
              <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2.25rem,12vw,4.9rem)] font-semibold leading-[0.98] tracking-tight text-[#050A13] sm:leading-[0.95] [overflow-wrap:anywhere]">
                {heading}
                {heading && headingAccent ? " " : ""}
                {headingAccent ? (
                  <span className="text-[#0088FF]">{headingAccent}</span>
                ) : null}
              </h2>
            )}

            {description ? (
              <p className="mx-auto mt-5 max-w-[520px] text-sm font-light leading-6 text-[#8A94A6] sm:text-[15px] [overflow-wrap:anywhere]">
                {description}
              </p>
            ) : null}
          </motion.div>
        )}

        {displaySteps.length > 0 && (
          <div className="mx-auto mt-8 max-w-[1180px] pb-2 sm:mt-9">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:min-w-[930px] lg:items-center lg:justify-center lg:gap-2">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 rounded-2xl border border-[#E4EAF2] bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.04)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
                    index === displaySteps.length - 1
                      ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[22rem] lg:col-span-1 lg:mx-0 lg:max-w-none"
                      : ""
                  }`}
                >
                  <StepItem
                    step={step}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  {index < displaySteps.length - 1 ? (
                    <StepConnector
                      index={index}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {displayScreens.length > 0 && (
          <div className="relative mx-auto mt-8 max-w-[1260px] sm:mt-10">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[54%] h-28 w-[86%] -translate-x-1/2 rounded-full bg-[#EAF4FF] blur-[42px]"
            />

            <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-start lg:justify-center lg:gap-4">
              {displayScreens.map((screen, index) => (
                <PhoneFrame
                  key={screen.id ?? `screen-${index}`}
                  screen={screen}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
