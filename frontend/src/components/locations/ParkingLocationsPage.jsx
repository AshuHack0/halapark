"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  MapPin,
  Building2,
  Star,
  BadgeCheck,
  Navigation,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

/*
 * PARKING LOCATIONS PAGE — /parking-locations
 *
 * One destination for every "Find My Parking" / "Explore Parking" /
 * "Explore Our Locations" button: all HalaPark towers and projects across the
 * UAE, plus certificates and Google reviews for trust.
 *
 * Strictly CMS-driven (page slug "parking-locations"). Every piece of copy
 * comes from the admin panel — nothing is hardcoded, and an empty field or an
 * empty list hides its element/section entirely.
 *
 * CMS shape (sections):
 *   hero         { eyebrow, heading, headingGradient, description, image,
 *                  searchPlaceholder, ar: {…} }
 *   stats        { items: [{ value, label, ar: { label } }] }
 *   locations    { eyebrow, heading, headingGradient, description, allLabel,
 *                  emptyText, emirates: [{ key, name, ar:{name} }],
 *                  items: [{ name, emirate, area, image, description,
 *                            tag, features: [], mapLink, ar: {…} }] }
 *   certificates { eyebrow, heading, headingGradient, description,
 *                  items: [{ title, issuer, image, ar: {…} }] }
 *   reviews      { eyebrow, heading, headingGradient, description, rating,
 *                  reviewCount, googleLabel, googleLink,
 *                  items: [{ name, text, rating, location, date, avatar, ar:{…} }] }
 *   cta          { heading, headingGradient, description, primaryLabel,
 *                  primaryLink, secondaryLabel, secondaryLink, ar: {…} }
 */

const ease = [0.22, 1, 0.36, 1];

/* ─────────────────── shared section heading ─────────────────── */
function SectionHeading({ block, language, tone = "light", align = "center" }) {
  const eyebrow = (t(block, "eyebrow", language) || "").trim();
  const heading = (t(block, "heading", language) || "").trim();
  const gradient = (t(block, "headingGradient", language) || "").trim();
  const description = (t(block, "description", language) || "").trim();
  if (!eyebrow && !heading && !gradient && !description) return null;

  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-start"}>
      {eyebrow ? (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            dark
              ? "bg-white/10 text-[#7CC4FF] ring-1 ring-white/15"
              : "bg-[#EEF6FF] text-[#0088FF] ring-1 ring-[#0088FF]/15"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}

      {heading || gradient ? (
        <h2
          className={`mt-4 text-[clamp(2rem,3.8vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.045em] [overflow-wrap:anywhere] ${
            dark ? "text-white" : "text-[#050A13]"
          }`}
        >
          {heading ? <span className="block">{heading}</span> : null}
          {/* Gradient part always on its own second line */}
          {gradient ? (
            <span className="mt-2 block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.18] tracking-[-0.035em] text-transparent">
              {gradient}
            </span>
          ) : null}
        </h2>
      ) : null}

      {description ? (
        <RichText
          text={description}
          className={`mt-4 block text-sm leading-7 sm:text-[0.95rem] ${
            dark ? "text-slate-300" : "text-slate-500"
          } ${centered ? "mx-auto" : ""} [overflow-wrap:anywhere]`}
        />
      ) : null}
    </div>
  );
}

/* ─────────────────────────── location card ─────────────────────────── */
function LocationCard({ item, index, emirateLabel, language, reduced }) {
  const name = (t(item, "name", language) || "").trim();
  const area = (t(item, "area", language) || "").trim();
  const description = (t(item, "description", language) || "").trim();
  const tag = (t(item, "tag", language) || "").trim();
  const image = (item?.image || "").trim();
  const mapLink = (item?.mapLink || "").trim();
  const mapLabel = (t(item, "mapLabel", language) || "").trim();
  const features = (
    language === "ar"
      ? Array.isArray(item?.ar?.features) && item.ar.features.length
        ? item.ar.features
        : []
      : Array.isArray(item?.features)
        ? item.features
        : []
  ).filter((f) => typeof f === "string" && f.trim());

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease, delay: Math.min(index, 6) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0088FF]/35 hover:shadow-[0_22px_48px_rgba(0,136,255,0.16)]"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[linear-gradient(135deg,#E8F2FF,#F6FAFF)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name || "Parking location"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <Building2 className="h-10 w-10 text-[#0088FF]/25" strokeWidth={1.6} aria-hidden />
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,10,19,0.55)_100%)]" />

        {emirateLabel ? (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#0F1E33] shadow-sm backdrop-blur">
            <MapPin className="h-3 w-3 text-[#0088FF]" aria-hidden />
            {emirateLabel}
          </span>
        ) : null}

        {tag ? (
          <span className="absolute end-3 top-3 rounded-full bg-[#0088FF] px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_4px_14px_rgba(0,136,255,0.35)]">
            {tag}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {name ? (
          <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere]">
            {name}
          </h3>
        ) : null}

        {area ? (
          <p className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] leading-6 text-slate-500 [overflow-wrap:anywhere]">
            <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0088FF]" aria-hidden />
            {area}
          </p>
        ) : null}

        {description ? (
          <RichText
            text={description}
            className="mt-3 block text-[0.83rem] leading-6 text-slate-500 [overflow-wrap:anywhere]"
          />
        ) : null}

        {features.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {features.map((f, i) => (
              <li
                key={`${f}-${i}`}
                className="rounded-full bg-[#F3F7FC] px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200/70"
              >
                {f}
              </li>
            ))}
          </ul>
        ) : null}

        {mapLink ? (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-[0.82rem] font-semibold text-[#0088FF] transition-colors hover:text-[#0070d4]"
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden />
            {mapLabel || "View on map"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-[-90deg]" aria-hidden />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── review card ─────────────────────────── */
function Stars({ value }) {
  const n = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));
  if (!n) return null;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#FFB400] text-[#FFB400]" aria-hidden />
      ))}
    </span>
  );
}

function ReviewCard({ review, index, language, reduced }) {
  const name = (t(review, "name", language) || "").trim();
  const text = (t(review, "text", language) || "").trim();
  const location = (t(review, "location", language) || "").trim();
  const date = (t(review, "date", language) || "").trim();
  const avatar = (review?.avatar || "").trim();
  const initial = name ? name.trim().charAt(0).toUpperCase() : "";

  if (!name && !text) return null;

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay: Math.min(index, 6) * 0.05 }}
      className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-colors duration-300 hover:border-[#1AB2FF]/40 hover:bg-white/[0.08]"
    >
      <Stars value={review?.rating} />

      {text ? (
        <blockquote className="mt-4 flex-1 text-[0.88rem] leading-7 text-slate-300 [overflow-wrap:anywhere]">
          {text}
        </blockquote>
      ) : null}

      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" aria-hidden className="h-9 w-9 shrink-0 rounded-full object-cover" />
        ) : initial ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0088FF]/25 text-sm font-semibold text-[#7CC4FF]">
            {initial}
          </span>
        ) : null}
        <span className="min-w-0">
          {name ? (
            <span className="block truncate text-[0.85rem] font-semibold text-white">{name}</span>
          ) : null}
          {location || date ? (
            <span className="block truncate text-[11px] text-slate-400">
              {[location, date].filter(Boolean).join(" · ")}
            </span>
          ) : null}
        </span>
      </figcaption>
    </motion.figure>
  );
}

/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default function ParkingLocationsPage() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [sections, setSections] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [query, setQuery] = useState("");
  const [activeEmirate, setActiveEmirate] = useState("all");

  useEffect(() => {
    fetchPage("parking-locations")
      .then((page) => setSections(page?.sections ?? null))
      .finally(() => setResolved(true));
  }, []);

  const hero = sections?.hero ?? null;
  const stats = sections?.stats ?? null;
  const locations = sections?.locations ?? null;
  const certificates = sections?.certificates ?? null;
  const reviews = sections?.reviews ?? null;
  const cta = sections?.cta ?? null;

  const emirates = useMemo(
    () =>
      (Array.isArray(locations?.emirates) ? locations.emirates : []).filter(
        (e) => e && (e.key || "").trim() && (e.name || "").trim(),
      ),
    [locations],
  );

  const allItems = useMemo(
    () => (Array.isArray(locations?.items) ? locations.items : []).filter(Boolean),
    [locations],
  );

  // Search across the visible text of a location, in the active language.
  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      if (activeEmirate !== "all" && (item.emirate || "") !== activeEmirate) return false;
      if (!q) return true;
      const haystack = [
        t(item, "name", language),
        t(item, "area", language),
        t(item, "description", language),
        item?.name,
        item?.area,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allItems, activeEmirate, query, language]);

  const emirateName = (key) => {
    const found = emirates.find((e) => e.key === key);
    return found ? (t(found, "name", language) || "").trim() : "";
  };

  if (!resolved) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  const heroEyebrow = (t(hero, "eyebrow", language) || "").trim();
  const heroHeading = (t(hero, "heading", language) || "").trim();
  const heroGradient = (t(hero, "headingGradient", language) || "").trim();
  const heroDescription = (t(hero, "description", language) || "").trim();
  const heroImage = (hero?.image || "").trim();
  const searchPlaceholder = (t(hero, "searchPlaceholder", language) || "").trim();

  const statItems = (Array.isArray(stats?.items) ? stats.items : []).filter(
    (s) => s && ((s.value || "").trim() || (t(s, "label", language) || "").trim()),
  );

  const certificateItems = (Array.isArray(certificates?.items) ? certificates.items : []).filter(
    (c) => c && ((c.image || "").trim() || (t(c, "title", language) || "").trim()),
  );

  const reviewItems = (Array.isArray(reviews?.items) ? reviews.items : []).filter(Boolean);
  const reviewRating = (reviews?.rating || "").trim();
  const reviewCount = (t(reviews, "reviewCount", language) || "").trim();
  const googleLink = (reviews?.googleLink || "").trim();
  const googleLabel = (t(reviews, "googleLabel", language) || "").trim();

  const ctaHeading = (t(cta, "heading", language) || "").trim();
  const ctaGradient = (t(cta, "headingGradient", language) || "").trim();
  const ctaDescription = (t(cta, "description", language) || "").trim();
  const ctaPrimary = (t(cta, "primaryLabel", language) || "").trim();
  const ctaPrimaryLink = (cta?.primaryLink || "").trim();
  const ctaSecondary = (t(cta, "secondaryLabel", language) || "").trim();
  const ctaSecondaryLink = (cta?.secondaryLink || "").trim();

  const showHero =
    hero?.enabled !== false &&
    (heroEyebrow || heroHeading || heroGradient || heroDescription || heroImage);

  return (
    <main dir={dir} className="bg-white">
      {/* ══════════════════ HERO ══════════════════ */}
      {showHero ? (
        <section className="relative overflow-hidden bg-[#F4F8FF] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
          {/* Layered background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_38%,#F0F7FF_68%,#EAF3FF_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,black,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(0,136,255,0.13),transparent_70%)] blur-xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-28 bottom-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(37,99,235,0.10),transparent_66%)] blur-2xl"
          />

          <div className="relative mx-auto w-full max-w-7xl">
            <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              {/* Copy */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="text-center lg:text-start"
              >
                {heroEyebrow ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0088FF] shadow-[0_6px_18px_rgba(0,136,255,0.12)] ring-1 ring-[#0088FF]/15">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {heroEyebrow}
                  </span>
                ) : null}

                {heroHeading || heroGradient ? (
                  <h1 className="mt-5 text-[clamp(2.3rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[#050A13] [overflow-wrap:anywhere]">
                    {heroHeading ? <span className="block">{heroHeading}</span> : null}
                    {heroGradient ? (
                      <span className="mt-2 block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15] tracking-[-0.04em] text-transparent">
                        {heroGradient}
                      </span>
                    ) : null}
                  </h1>
                ) : null}

                {heroDescription ? (
                  <RichText
                    text={heroDescription}
                    className="mx-auto mt-5 block max-w-xl text-sm leading-7 text-slate-500 sm:text-[0.98rem] lg:mx-0 [overflow-wrap:anywhere]"
                  />
                ) : null}

                {/* Search — filters the locations grid below */}
                {allItems.length > 0 ? (
                  <div className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] focus-within:border-[#0088FF]/50 focus-within:ring-2 focus-within:ring-[#0088FF]/12 lg:mx-0">
                    <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      aria-label={searchPlaceholder || "Search parking locations"}
                      className="w-full bg-transparent text-sm text-[#050A13] outline-none placeholder:text-slate-400"
                    />
                  </div>
                ) : null}

                {/* Stats strip */}
                {stats?.enabled !== false && statItems.length > 0 ? (
                  <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-5 lg:justify-start">
                    {statItems.map((s, i) => (
                      <div key={`${s.value}-${i}`} className="text-center lg:text-start">
                        {(s.value || "").trim() ? (
                          <span className="block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-2xl font-semibold tracking-[-0.03em] text-transparent sm:text-[1.7rem]">
                            {s.value}
                          </span>
                        ) : null}
                        {(t(s, "label", language) || "").trim() ? (
                          <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                            {t(s, "label", language)}
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.div>

              {/* Visual */}
              {heroImage ? (
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease, delay: 0.1 }}
                  className="relative mt-12 lg:mt-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] shadow-[0_28px_64px_rgba(15,23,42,0.18)] ring-1 ring-white/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroImage}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,transparent_45%,rgba(5,10,19,0.35)_100%)]" />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-5 -end-5 -z-10 h-32 w-32 rounded-3xl bg-[linear-gradient(135deg,#0088FF,#1AB2FF)] opacity-15 blur-xl"
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ══════════════════ LOCATIONS ══════════════════ */}
      {locations?.enabled !== false && allItems.length > 0 ? (
        <section
          id="locations-grid"
          style={{ scrollMarginTop: "90px" }}
          className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <SectionHeading block={locations} language={language} />

            {/* Emirate filter */}
            {emirates.length > 0 ? (
              <div className="mt-9 flex flex-wrap justify-center gap-2">
                {[{ key: "all", label: (t(locations, "allLabel", language) || "").trim() }, ...emirates.map((e) => ({ key: e.key, label: (t(e, "name", language) || "").trim() }))]
                  .filter((tab) => tab.label)
                  .map((tab) => {
                    const active = activeEmirate === tab.key;
                    const count =
                      tab.key === "all"
                        ? allItems.length
                        : allItems.filter((i) => (i.emirate || "") === tab.key).length;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveEmirate(tab.key)}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-all duration-300 ${
                          active
                            ? "bg-[linear-gradient(120deg,#0088FF,#1AB2FF)] text-white shadow-[0_10px_24px_rgba(0,136,255,0.28)]"
                            : "bg-[#F3F7FC] text-slate-600 ring-1 ring-slate-200 hover:bg-[#EEF6FF] hover:text-[#0088FF]"
                        }`}
                      >
                        {tab.label}
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                            active ? "bg-white/20 text-white" : "bg-white text-slate-400"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
              </div>
            ) : null}

            {/* Grid */}
            {visibleItems.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item, i) => (
                  <LocationCard
                    key={`${item.name || "loc"}-${i}`}
                    item={item}
                    index={i}
                    emirateLabel={emirateName(item.emirate)}
                    language={language}
                    reduced={reduced}
                  />
                ))}
              </div>
            ) : (t(locations, "emptyText", language) || "").trim() ? (
              <p className="mt-12 text-center text-sm text-slate-500">
                {t(locations, "emptyText", language)}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ══════════════════ CERTIFICATES ══════════════════ */}
      {certificates?.enabled !== false && certificateItems.length > 0 ? (
        <section className="bg-[#F7FAFF] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHeading block={certificates} language={language} />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certificateItems.map((cert, i) => {
                const title = (t(cert, "title", language) || "").trim();
                const issuer = (t(cert, "issuer", language) || "").trim();
                const image = (cert.image || "").trim();
                return (
                  <motion.div
                    key={`${title}-${i}`}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease, delay: Math.min(i, 6) * 0.05 }}
                    className="flex flex-col items-center rounded-[20px] border border-slate-200/80 bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0088FF]/30 hover:shadow-[0_18px_40px_rgba(0,136,255,0.12)]"
                  >
                    <div className="flex h-24 w-full items-center justify-center">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={title || "Certificate"}
                          loading="lazy"
                          className="max-h-24 w-auto max-w-full object-contain"
                        />
                      ) : (
                        <BadgeCheck className="h-10 w-10 text-[#0088FF]/70" strokeWidth={1.6} aria-hidden />
                      )}
                    </div>
                    {title ? (
                      <h3 className="mt-4 text-[0.92rem] font-semibold leading-snug text-[#050A13] [overflow-wrap:anywhere]">
                        {title}
                      </h3>
                    ) : null}
                    {issuer ? (
                      <p className="mt-1 text-[0.78rem] leading-6 text-slate-500 [overflow-wrap:anywhere]">
                        {issuer}
                      </p>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ══════════════════ GOOGLE REVIEWS ══════════════════ */}
      {reviews?.enabled !== false && reviewItems.length > 0 ? (
        <section className="relative overflow-hidden bg-[linear-gradient(120deg,#050A13_0%,#0B1220_45%,#0d2135_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_35%,black,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0088FF]/25 blur-[110px]"
          />

          <div className="relative mx-auto w-full max-w-7xl">
            <SectionHeading block={reviews} language={language} tone="dark" />

            {/* Rating summary */}
            {reviewRating || reviewCount || googleLink ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {reviewRating ? (
                  <span className="inline-flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3 backdrop-blur">
                    <span className="text-2xl font-semibold tracking-[-0.03em] text-white">{reviewRating}</span>
                    <span>
                      <Stars value={reviewRating} />
                      {reviewCount ? (
                        <span className="mt-1 block text-[11px] text-slate-400">{reviewCount}</span>
                      ) : null}
                    </span>
                  </span>
                ) : null}

                {googleLink && googleLabel ? (
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-3 text-[0.85rem] font-semibold text-white backdrop-blur transition-all duration-300 hover:border-[#1AB2FF]/60 hover:bg-white/[0.13]"
                  >
                    {googleLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-[-90deg]" aria-hidden />
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviewItems.map((review, i) => (
                <ReviewCard
                  key={`${review?.name || "review"}-${i}`}
                  review={review}
                  index={i}
                  language={language}
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ══════════════════ CTA ══════════════════ */}
      {cta?.enabled !== false && (ctaHeading || ctaGradient || ctaDescription) ? (
        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#0088FF]/12 bg-[linear-gradient(120deg,#EEF6FF_0%,#F8FBFF_55%,#E8F2FF_100%)] px-6 py-14 text-center sm:px-10 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.16),transparent_68%)] blur-xl"
              />
              <div className="relative mx-auto max-w-2xl">
                {ctaHeading || ctaGradient ? (
                  <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-[#050A13] [overflow-wrap:anywhere]">
                    {ctaHeading ? <span className="block">{ctaHeading}</span> : null}
                    {ctaGradient ? (
                      <span className="mt-2 block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-[clamp(1.3rem,2.3vw,1.9rem)] leading-[1.2] tracking-[-0.035em] text-transparent">
                        {ctaGradient}
                      </span>
                    ) : null}
                  </h2>
                ) : null}

                {ctaDescription ? (
                  <RichText
                    text={ctaDescription}
                    className="mx-auto mt-4 block max-w-xl text-sm leading-7 text-slate-500 sm:text-[0.95rem] [overflow-wrap:anywhere]"
                  />
                ) : null}

                {(ctaPrimary && ctaPrimaryLink) || (ctaSecondary && ctaSecondaryLink) ? (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {ctaPrimary && ctaPrimaryLink ? (
                      <Link
                        href={ctaPrimaryLink}
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#0088FF,#1AB2FF)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,136,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,136,255,0.38)]"
                      >
                        {ctaPrimary}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                      </Link>
                    ) : null}
                    {ctaSecondary && ctaSecondaryLink ? (
                      <Link
                        href={ctaSecondaryLink}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0F1E33] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0088FF]/40 hover:text-[#0088FF]"
                      >
                        {ctaSecondary}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
