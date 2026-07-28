"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import {
  ArrowRight,
  Car,
  Check,
  Clock,
  MapPin,
  ParkingCircle,
  Star,
  Users,
} from "lucide-react";

// Named-icon maps: the CMS stores an icon *name* (string); we resolve it to a
// lucide component here. Anything unknown/blank falls back to no icon.
const STAT_ICONS = { Star, Car, Users };
const CARD_ICONS = { ParkingCircle, Clock, Check, MapPin, Car, Star, Users };

function CityBackdrop() {
  const towers = [
    "h-24 w-3",
    "h-36 w-5",
    "h-48 w-6",
    "h-28 w-4",
    "h-56 w-7",
    "h-40 w-5",
    "h-32 w-4",
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-28 left-[28%] hidden items-end gap-2 opacity-35 blur-[0.2px] lg:flex"
    >
      {towers.map((tower, index) => (
        <span
          key={`${tower}-${index}`}
          className={`${tower} rounded-t-full bg-[linear-gradient(180deg,rgba(0,136,255,0.42),rgba(0,136,255,0.05))]`}
        />
      ))}
    </div>
  );
}

function StatStrip({ stats, language }) {
  // Keep only stats that have both a value and a label (hide-when-empty).
  const visible = (Array.isArray(stats) ? stats : []).filter((s) => {
    const value = (s?.value ?? "").toString().trim();
    const label = (t(s, "label", language) || "").trim();
    return value || label;
  });

  if (visible.length === 0) return null;

  return (
    <div className="mt-7 w-full min-w-0 max-w-[620px] rounded-[24px] bg-white/92 px-4 py-3.5 shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur sm:px-5 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 rtl:lg:left-auto rtl:lg:right-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-[#E4EAF2] rtl:sm:divide-x-reverse">
        {visible.map((item, index) => {
          const Icon = STAT_ICONS[item.icon];
          // Custom uploaded icon image overrides the built-in named icon.
          const iconImage = (item.iconImage || "").trim();
          const isStars = item.showStars === true;
          const value = (item.value ?? "").toString();
          const suffix = (item.suffix ?? "").toString();
          const label = t(item, "label", language);

          return (
            <div
              key={`${value}-${label}-${index}`}
              className="flex items-center gap-3 sm:px-3 first:sm:pl-0 last:sm:pr-0"
            >
              {iconImage ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={iconImage} alt="" className="h-5 w-5 object-contain" />
                </span>
              ) : Icon ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0088FF]">
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill={isStars ? "currentColor" : "none"}
                  />
                </span>
              ) : null}
              <div className="min-w-0">
                {value ? (
                  <p className="text-xl font-semibold leading-none text-[#050A13] [overflow-wrap:anywhere]">
                    {value}
                    {suffix ? (
                      <span className="ml-1 text-sm font-medium text-[#667085]">
                        {suffix}
                      </span>
                    ) : null}
                  </p>
                ) : null}
                {isStars ? (
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-[#0088FF]">
                    *****
                  </p>
                ) : null}
                {label ? (
                  <p className="mt-1 text-xs font-medium text-[#667085] [overflow-wrap:anywhere]">
                    {label}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroPhone({ phoneImage }) {
  const src = (phoneImage || "").trim();
  // No screenshot configured → no phone block (no hardcoded fallback).
  if (!src) return null;

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative z-20 w-[160px] rotate-0 sm:w-[220px] md:w-[260px] lg:w-[290px] lg:rotate-[8deg] xl:w-[320px]"
    >
      <div className="absolute inset-x-[16%] bottom-2 h-14 rounded-full bg-[#0F172A]/18 blur-[24px]" />
      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_30px_58px_rgba(5,10,19,0.28)]">
        <div className="absolute left-[4.2%] right-[4.2%] top-[1%] bottom-[1.2%] z-20 translate-y-[1px] overflow-hidden rounded-[1.6rem] bg-white lg:rounded-[3.2rem]">
          <Image
            src={src}
            alt="HalaPark booking screen"
            fill
            sizes="(min-width: 1280px) 365px, (min-width: 1024px) 340px, (min-width: 640px) 290px, 235px"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src="/mobileframe.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 365px, (min-width: 1024px) 340px, (min-width: 640px) 290px, 235px"
            className="select-none object-contain"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

// The three design slots around the phone. Cards map onto these by index and we
// hard-cap at three so a 4th+ card can never overflow / break the layout.
// `rtl:` mirrors keep the cards off the (now right-aligned) Arabic text column.
const CARD_SLOTS = [
  {
    className:
      "absolute left-[4%] top-8 z-30 hidden lg:block lg:left-[7%] lg:top-14 rtl:lg:left-auto rtl:lg:right-[7%]",
    initial: { opacity: 0, y: -14, rotate: -8 },
    animate: { opacity: 1, y: 0, rotate: -8 },
    delay: 0.25,
  },
  {
    className:
      "absolute right-[2%] top-[30%] z-30 hidden lg:block rtl:right-auto rtl:left-[2%]",
    initial: { opacity: 0, x: 18, rotate: 4 },
    animate: { opacity: 1, x: 0, rotate: 4 },
    delay: 0.35,
  },
  {
    className:
      "absolute bottom-[19%] right-[7%] z-30 hidden lg:block rtl:right-auto rtl:left-[7%]",
    initial: { opacity: 0, x: 22, rotate: 8 },
    animate: { opacity: 1, x: 0, rotate: 8 },
    delay: 0.45,
  },
];

// One generic card that adapts to whatever fields are present, so any card
// configuration renders without variant-specific breakage.
function FloatingCard({ card, language }) {
  const title = t(card, "title", language);
  const subtitle = t(card, "subtitle", language);
  const Icon = CARD_ICONS[card.icon];
  // Custom uploaded icon image overrides the built-in named icon.
  const iconImage = (card.iconImage || "").trim();
  // Timer/amount are usually language-neutral (times, prices) — AR reuses the
  // EN value when no Arabic variant is entered.
  const isAr = language === "ar";
  const timer = ((isAr ? card.ar?.timer || card.timer : card.timer) ?? "").toString().trim();
  const amount = ((isAr ? card.ar?.amount || card.amount : card.amount) ?? "").toString().trim();
  const buttonLabel = t(card, "buttonLabel", language);

  return (
    <div className="w-[168px] rounded-2xl bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.13)]">
      <div className="flex items-center gap-2.5">
        {iconImage ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0088FF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconImage} alt="" className="h-5 w-5 object-contain" />
          </span>
        ) : Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0088FF] text-white">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        ) : null}
        <p className="text-[11px] font-semibold text-[#050A13] [overflow-wrap:anywhere]">
          {title}
        </p>
      </div>

      {timer ? (
        <div className="mt-3 flex items-center justify-center gap-2 text-[#050A13]">
          <Clock aria-hidden="true" className="h-4 w-4 text-[#0088FF]" />
          <p className="text-xl font-semibold tracking-tight [overflow-wrap:anywhere]">
            {timer}
          </p>
        </div>
      ) : null}

      {amount ? (
        <p className="mt-2 text-lg font-semibold text-[#050A13] [overflow-wrap:anywhere]">
          {amount}
        </p>
      ) : null}

      {subtitle ? (
        <p className="mt-2 text-[11px] font-medium text-[#667085] [overflow-wrap:anywhere]">
          {subtitle}
        </p>
      ) : null}

      {buttonLabel ? (
        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-[#CFE3FF] bg-white py-2 text-[11px] font-semibold text-[#0088FF] [overflow-wrap:anywhere]"
        >
          {buttonLabel}
        </button>
      ) : null}
    </div>
  );
}

// Phones (< lg) can't fit the absolute-positioned floating cards around the
// phone frame, so they render as a swipeable row under it instead of vanishing.
function MobileFloatingCards({ cards, language }) {
  const visible = (Array.isArray(cards) ? cards : [])
    .filter((c) => (t(c, "title", language) || "").trim())
    .slice(0, CARD_SLOTS.length);

  if (visible.length === 0) return null;

  // Two-per-row grid below the phone — everything visible at once, no
  // horizontal scrolling. An odd last card spans the full row.
  return (
    <div className="grid w-full grid-cols-2 gap-3 pb-2 lg:hidden">
      {visible.map((card, index) => {
        const spanFull = visible.length % 2 === 1 && index === visible.length - 1;
        return (
          <div
            key={`${t(card, "title", language)}-${index}`}
            className={`${spanFull ? "col-span-2" : ""} [&>div]:!w-full`}
          >
            <FloatingCard card={card} language={language} />
          </div>
        );
      })}
    </div>
  );
}

function FloatingCards({ cards, language, prefersReducedMotion }) {
  // Cap at the 3 design slots; cards without a title are hidden.
  const visible = (Array.isArray(cards) ? cards : [])
    .filter((c) => (t(c, "title", language) || "").trim())
    .slice(0, CARD_SLOTS.length);

  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((card, index) => {
        const slot = CARD_SLOTS[index];
        return (
          <motion.div
            key={`${t(card, "title", language)}-${index}`}
            initial={prefersReducedMotion ? false : slot.initial}
            animate={prefersReducedMotion ? undefined : slot.animate}
            transition={{ duration: 0.55, ease: "easeOut", delay: slot.delay }}
            className={slot.className}
          >
            <FloatingCard card={card} language={language} />
          </motion.div>
        );
      })}

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-[14%] left-[58%] z-30 hidden text-[#0088FF] lg:block"
      >
        <MapPin
          aria-hidden="true"
          className="h-12 w-12 drop-shadow-[0_12px_18px_rgba(0,136,255,0.24)]"
          fill="currentColor"
        />
        <span className="absolute bottom-[-3px] left-1/2 h-2.5 w-10 -translate-x-1/2 rounded-full bg-[#0088FF]/25 blur-md" />
      </motion.div>
    </>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  // CMS-only: the DB is the single source of truth. Start empty and render
  // strictly from what the fetch returns — no hardcoded content fallbacks.
  const [content, setContent] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage("app")
      .then((data) => {
        const h = data?.sections?.hero;
        if (active && h && typeof h === "object") {
          setContent(h);
        }
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!resolved) return null;
  // Admin can hide the section via the "Show this section" toggle.
  if (content?.enabled === false) return null;

  const phoneImage = (content.phoneImage || "").trim();
  const stats = Array.isArray(content.stats) ? content.stats : [];
  const cards = Array.isArray(content.cards) ? content.cards : [];

  const eyebrow = t(content, "eyebrow", language);
  const title = t(content, "title", language);
  const titleGradient = t(content, "titleGradient", language);
  const subtitle = t(content, "subtitle", language);
  const description = t(content, "description", language);
  const ctaLabel = t(content, "ctaLabel", language);
  const ctaHref = content.ctaHref || "/app";

  // Hide the whole hero when everything has been cleared from admin. Text is
  // checked in English (the seeded source) so the section doesn't vanish just
  // because a page is viewed in Arabic without Arabic overrides.
  const hasText =
    (content.title || "").trim() ||
    (content.description || "").trim() ||
    (content.subtitle || "").trim() ||
    (content.eyebrow || "").trim();
  const hasContent =
    hasText || phoneImage || stats.length > 0 || cards.length > 0;
  if (!hasContent) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="relative overflow-x-hidden bg-[linear-gradient(118deg,#FFFFFF_0%,#F8FBFF_42%,#EAF3FF_100%)] lg:overflow-visible">
      <CityBackdrop />

      {/* grid-cols-1 + min-w-0 children: the mobile track is clamped to the
          viewport so wide content (cards row, stats) can never push the layout
          past the right edge on small phones. */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-12">
        <motion.div
          dir={dir}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20"
        >
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-[#0088FF] [overflow-wrap:anywhere]">
              {eyebrow}
            </p>
          ) : null}

          {title || titleGradient ? (
            <h1 className="max-w-[580px] text-[clamp(2.7rem,6vw,4.9rem)] font-semibold leading-[1.04] tracking-tight text-[#050A13] [overflow-wrap:anywhere]">
              {title}
              {titleGradient ? (
                <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                  {titleGradient}
                </span>
              ) : null}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="mt-4 max-w-[460px] text-lg font-medium leading-7 text-[#0088FF] [overflow-wrap:anywhere]">
              {subtitle}
            </p>
          ) : null}

          {description ? (
            <RichText
              text={description}
              className="mt-5 max-w-[460px] text-base font-light leading-7 text-[#4F5B6F] sm:text-[17px] [overflow-wrap:anywhere] block"
            />
          ) : null}

          {ctaLabel ? (
            <Link href={ctaHref}>
              <button
                type="button"
                className="mt-7 inline-flex w-full max-w-[295px] items-center justify-between rounded-2xl bg-[#005BFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_16px_34px_rgba(0,91,255,0.28)] transition hover:brightness-95 sm:px-5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#005BFF]">
                    <MapPin
                      aria-hidden="true"
                      className="h-6 w-6"
                      fill="currentColor"
                    />
                  </span>
                  <span className="[overflow-wrap:anywhere]">{ctaLabel}</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 rtl:rotate-180"
                />
              </button>
            </Link>
          ) : null}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="relative z-10 flex min-h-[430px] w-full min-w-0 flex-col items-center justify-center gap-5 lg:min-h-[570px]"
        >
          <FloatingCards
            cards={cards}
            language={language}
            prefersReducedMotion={prefersReducedMotion}
          />
          <HeroPhone phoneImage={phoneImage} />
          <MobileFloatingCards cards={cards} language={language} />
        </motion.div>

        <StatStrip stats={stats} language={language} />
      </div>
    </section>
  );
}
