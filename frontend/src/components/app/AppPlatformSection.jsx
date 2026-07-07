"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const NAVY = "#050A13";
const ACCENT = "#0088FF";
const ACCENT_SOFT = "#EAF3FF";
const phoneFrameSrc = "/mobileframe.png";

// Built-in decorative icons rendered by index when a feature has no custom
// `iconImage`. These are chrome only — no text content lives here.
const appFeatureIcons = [
  (
    <svg key="app-0" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="7"
        y="3"
        width="10"
        height="18"
        rx="2.5"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
      <circle cx="12" cy="17.5" r="1" fill={ACCENT} />
    </svg>
  ),
  (
    <svg key="app-1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke={ACCENT} strokeWidth="1.6" />
      <path
        d="M12 7.5v5l3 2"
        stroke={ACCENT}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="app-2" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
      <path d="M4 11h16" stroke={ACCENT} strokeWidth="1.6" />
      <circle cx="16" cy="15" r="1.2" fill={ACCENT} />
    </svg>
  ),
];

const websiteFeatureIcons = [
  (
    <svg key="web-0" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="12"
        rx="1.6"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
      <path d="M9 20h6M12 17v3" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="web-1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19V11M10 19V7M16 19v-5M22 19V4"
        stroke={ACCENT}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="web-2" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"
        stroke={ACCENT}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5l2 2 4-4"
        stroke={ACCENT}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
];

const defaultFeatureIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="8.5" stroke={ACCENT} strokeWidth="1.6" />
    <path
      d="M8.5 12l2.4 2.4 4.6-5"
      stroke={ACCENT}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// A feature is "real" only when it has a title or description (CMS-only; blank
// rows configured in admin are hidden).
function hasFeatureText(feature, language) {
  return (
    (t(feature, "title", language) || "").trim() !== "" ||
    (t(feature, "description", language) || "").trim() !== ""
  );
}

function HalaparkMonogram({ size = 28, color = ACCENT }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 6v28M30 6v28M10 20h20"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureRow({ feature, fallbackIcon, title, description }) {
  const iconImage = (feature?.iconImage || "").trim();
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: ACCENT_SOFT }}
      >
        {iconImage ? (
          <Image
            src={iconImage}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        ) : (
          fallbackIcon
        )}
      </span>
      <div>
        {title ? (
          <p
            className="text-[15px] font-semibold [overflow-wrap:anywhere]"
            style={{ color: NAVY }}
          >
            {title}
          </p>
        ) : null}
        {description ? (
          <p className="mt-1 text-[13px] leading-6 text-[#5C667A] [overflow-wrap:anywhere]">
            {description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function SectionHeading({ brand, accent }) {
  const hasBrand = (brand || "").trim() !== "";
  const hasAccent = (accent || "").trim() !== "";
  // Hide the whole heading when both parts are blank.
  if (!hasBrand && !hasAccent) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl [overflow-wrap:anywhere]">
        {hasBrand ? <span style={{ color: ACCENT }}>{brand}</span> : null}
        {hasBrand && hasAccent ? " " : null}
        {hasAccent ? <span style={{ color: NAVY }}>{accent}</span> : null}
      </h2>
      <span
        className="mt-3 block h-[3px] w-16 rounded-full"
        style={{ backgroundColor: ACCENT }}
      />
    </div>
  );
}

function PhonePreview({ screen, alt = "HalaPark app screen" }) {
  const src = (screen || "").trim();
  // No screenshot configured → no phone block (frame overlay is decorative).
  if (!src) return null;

  return (
    <div className="relative mx-auto w-[205px] sm:w-[240px] lg:w-[260px] ">
      <div className="absolute inset-x-[18%] bottom-3 h-10 rounded-full bg-[#0F172A]/14 blur-[26px]" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_28px_58px_rgba(15,23,42,0.18)]">
        <div className="absolute left-[3.8%] right-[3.8%] top-[1%] bottom-[1.2%] z-30 translate-y-[1px] overflow-hidden rounded-[1.4rem] bg-white sm:rounded-[2.45rem]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 240px, 205px"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 240px, 205px"
            className="select-none object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function WebsitePreview() {
  return (
    <div className="relative w-full max-w-[430px]">
      <div className="absolute -right-5 top-5 h-44 w-44 rounded-full bg-[#EAF3FF] blur-[2px]" />
      <div className="absolute -left-4 bottom-8 h-28 w-28 rounded-full bg-[rgba(0,136,255,0.08)] blur-[18px]" />

      <div className="relative overflow-hidden rounded-[22px] border border-[#D8E6F7] bg-[#050A13] p-2 shadow-[0_24px_58px_rgba(15,23,42,0.16)]">
        <div className="overflow-hidden rounded-[16px] bg-white">
          <div className="flex items-center justify-between border-b border-[#E4EAF2] bg-[#F8FBFF] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="hidden h-6 w-[46%] items-center justify-center rounded-full border border-[#E4EAF2] bg-white text-[9px] font-medium text-[#8A94A6] sm:flex">
              app.halapark.com/login
            </div>
            <span className="h-2 w-8 rounded-full bg-[#D8E6F7]" />
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[linear-gradient(135deg,#F8FBFF_0%,#EAF3FF_58%,#DCEBFF_100%)] px-5 py-5">

            <div className="relative mx-auto flex min-h-[260px] w-full max-w-[310px] flex-col items-center justify-center">


              <div className="w-full rounded-[22px] border border-[#E4EAF2] bg-white/95 p-5 shadow-[0_18px_42px_rgba(15,23,42,0.1)] backdrop-blur">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0088FF]">
                  Welcome back
                </p>
                <h3 className="mt-1 text-center text-[1.35rem] font-semibold leading-tight text-[#050A13]">
                  Sign in to your account
                </h3>
                <p className="mx-auto mt-1.5 max-w-[210px] text-center text-[11px] font-light leading-5 text-[#667085]">
                  Access your dashboard and manage parking activity.
                </p>

                <div className="mt-4 space-y-2.5">
                  <label className="block">
                    <span className="mb-1 block text-[9px] font-semibold text-[#667085]">
                      Email address
                    </span>
                    <span className="flex h-9 items-center rounded-xl border border-[#E4EAF2] bg-[#F8FBFF] px-3 text-[10px] font-medium text-[#8A94A6]">
                      user@halapark.com
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-[9px] font-semibold text-[#667085]">
                      Password
                    </span>
                    <span className="flex h-9 items-center rounded-xl border border-[#E4EAF2] bg-[#F8FBFF] px-3 text-[12px] font-semibold tracking-[0.18em] text-[#8A94A6]">
                      ********
                    </span>
                  </label>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[9px] font-medium text-[#667085]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded border border-[#0088FF] bg-[#0088FF] text-white">
                      <svg width="9" height="9" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M5 10.5 8.3 13.5 15 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Remember me
                  </span>
                  <span className="text-[9px] font-semibold text-[#0088FF]">
                    Forgot?
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 flex h-9 w-full items-center justify-center rounded-xl bg-[#0088FF] text-[11px] font-semibold text-white shadow-[0_12px_24px_rgba(0,136,255,0.2)]"
                >
                  Log In
                </button>

                <p className="mt-3 text-center text-[9px] font-medium text-[#8A94A6]">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold text-[#0088FF]">Sign up</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-4 w-[42%] rounded-b-xl bg-[#050A13]" />
      <div className="mx-auto h-1.5 w-[62%] rounded-full bg-[#CBD5E1]" />
    </div>
  );
}

export default function AppPlatformSection() {
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
        const p = data?.sections?.platform;
        if (active && p && typeof p === "object") {
          setContent(p);
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

  const dir = language === "ar" ? "rtl" : "ltr";

  // Prefer the new brand/accent fields; fall back to the legacy suffix fields
  // for the accent part only (back-compat, still CMS-sourced).
  const appBrand = t(content, "appBrand", language);
  const appBrandAccent =
    t(content, "appBrandAccent", language) || t(content, "appSuffix", language);
  const webBrand = t(content, "webBrand", language);
  const webBrandAccent =
    t(content, "webBrandAccent", language) || t(content, "webSuffix", language);

  const title = t(content, "title", language);
  const subtitle = t(content, "subtitle", language);
  const description = t(content, "description", language);

  const appScreen = (content.appScreen || "").trim();

  const appButtonLabel = t(content, "appButtonLabel", language);
  const appButtonLink = content.appButtonLink || "#";
  const webButtonLabel = t(content, "webButtonLabel", language);
  const webButtonLink = content.webButtonLink || "#";

  const appFeatures = (
    Array.isArray(content.appFeatures) ? content.appFeatures : []
  ).filter((f) => hasFeatureText(f, language));
  const websiteFeatures = (
    Array.isArray(content.websiteFeatures) ? content.websiteFeatures : []
  ).filter((f) => hasFeatureText(f, language));

  // Each card hides entirely when it has no real content of its own.
  const showAppCard =
    (appBrand || "").trim() !== "" ||
    (appBrandAccent || "").trim() !== "" ||
    (title || "").trim() !== "" ||
    (description || "").trim() !== "" ||
    appFeatures.length > 0 ||
    appScreen !== "";

  const showWebCard =
    (webBrand || "").trim() !== "" ||
    (webBrandAccent || "").trim() !== "" ||
    (subtitle || "").trim() !== "" ||
    websiteFeatures.length > 0;

  // Whole section hides when neither card would render.
  if (!showAppCard && !showWebCard) return null;

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 z-[99]">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-10 z-[99]">
        {showAppCard ? (
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[16px] border border-[#E4EAF2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_52%,#EEF6FF_100%)] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] sm:rounded-[28px] sm:p-10"
          >
            <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] z-[99]">
              <div dir={dir}>
                <SectionHeading brand={appBrand} accent={appBrandAccent} />

                {title ? (
                  <p
                    className="mt-7 whitespace-pre-line text-2xl font-semibold leading-snug sm:text-[26px] [overflow-wrap:anywhere]"
                    style={{ color: NAVY }}
                  >
                    {title}
                  </p>
                ) : null}

                {description ? (
                  <p className="mt-3 whitespace-pre-line text-[14px] leading-6 text-[#5C667A] [overflow-wrap:anywhere]">
                    {description}
                  </p>
                ) : null}

                {appFeatures.length > 0 ? (
                  <ul className="mt-7 space-y-5">
                    {appFeatures.map((feature, i) => (
                      <FeatureRow
                        key={feature.title ?? i}
                        feature={feature}
                        fallbackIcon={appFeatureIcons[i] ?? defaultFeatureIcon}
                        title={t(feature, "title", language)}
                        description={t(feature, "description", language)}
                      />
                    ))}
                  </ul>
                ) : null}

                {appButtonLabel ? (
                  <Link
                    href={appButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(0,136,255,0.24)] transition hover:brightness-95"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="[overflow-wrap:anywhere]">{appButtonLabel}</span>
                  </Link>
                ) : null}
              </div>

              <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[420px]">
                <div
                  className="absolute right-6 top-8 h-56 w-56 rounded-full blur-[2px] sm:h-64 sm:w-64"
                  style={{ backgroundColor: ACCENT_SOFT, opacity: 0.7 }}
                />

                <div className="relative">
                  {appScreen ? (
                    <PhonePreview screen={appScreen} alt="HalaPark booking app screen" />
                  ) : null}

                  <div className="absolute -left-8 top-16 hidden rounded-2xl border border-[#E4EAF2] bg-white px-3 py-2 shadow-[0_14px_30px_rgba(15,23,42,0.1)] sm:block rtl:-left-auto rtl:-right-8">
                    <p className="text-[11px] font-semibold text-[#050A13]">
                      Live booking
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-[#667085]">
                      452 spaces nearby
                    </p>
                  </div>

                  <div className="absolute -bottom-2 -right-8 hidden items-center gap-2 rounded-2xl border border-[#E4EAF2] bg-white px-3 py-2 shadow-[0_14px_30px_rgba(15,23,42,0.1)] sm:flex rtl:-right-auto rtl:-left-8">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF]">
                      <HalaparkMonogram size={18} />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-[#050A13]">
                        HalaPark
                      </p>
                      <p className="text-[10px] font-medium text-[#667085]">
                        Mobile ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ) : null}

        {showWebCard ? (
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="relative overflow-hidden rounded-[16px] border border-[#E4EAF2] bg-[linear-gradient(135deg,#FFFFFF_0%,#FBFDFF_48%,#F3F8FF_100%)] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] sm:rounded-[28px] sm:p-10"
          >
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.05fr]">
              <div dir={dir}>
                <SectionHeading brand={webBrand} accent={webBrandAccent} />

                {subtitle ? (
                  <p
                    className="mt-7 whitespace-pre-line text-2xl font-semibold leading-snug sm:text-[26px] [overflow-wrap:anywhere]"
                    style={{ color: NAVY }}
                  >
                    {subtitle}
                  </p>
                ) : null}

                {websiteFeatures.length > 0 ? (
                  <ul className="mt-7 space-y-5">
                    {websiteFeatures.map((feature, i) => (
                      <FeatureRow
                        key={feature.title ?? i}
                        feature={feature}
                        fallbackIcon={websiteFeatureIcons[i] ?? defaultFeatureIcon}
                        title={t(feature, "title", language)}
                        description={t(feature, "description", language)}
                      />
                    ))}
                  </ul>
                ) : null}

                {webButtonLabel ? (
                  <Link
                    href={webButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 inline-flex items-center gap-3 rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition hover:bg-[#E8EFFF]"
                    style={{ borderColor: ACCENT, color: NAVY }}
                  >
                    <span className="[overflow-wrap:anywhere]">{webButtonLabel}</span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="rtl:rotate-180">
                        <path
                          d="M5 12h14m0 0l-5-5m5 5l-5 5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                ) : null}
              </div>

              <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[420px]">
                <WebsitePreview />
              </div>
            </div>
          </motion.article>
        ) : null}
      </div>
    </section>
  );
}
