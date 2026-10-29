"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SiInstagram, SiFacebook, SiTiktok, SiX, SiYoutube, SiWhatsapp, SiSnapchat } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const ease = [0.22, 1, 0.36, 1];

// Social platform → icon. Which ones render (and their URLs) comes from the CMS.
const SOCIAL_ICONS = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  tiktok: SiTiktok,
  x: SiX,
  twitter: SiX,
  youtube: SiYoutube,
  linkedin: SlSocialLinkedin,
  whatsapp: SiWhatsapp,
  snapchat: SiSnapchat,
};

// Render the heading with an optional hand-drawn circle around a keyword the
// admin wraps in {{ }} — e.g. "Sign up and take {{15%}} off". No mark → plain.
function HeadingWithAccent({ text, reduced }) {
  const raw = text || "";
  const match = raw.match(/\{\{(.+?)\}\}/);
  if (!match) return <>{raw}</>;
  const [before, accentWord, after] = [raw.slice(0, match.index), match[1], raw.slice(match.index + match[0].length)];
  return (
    <>
      {before}
      <span className="relative inline-block whitespace-nowrap">
        {accentWord}
        {/* Hand-drawn ellipse that draws itself in. */}
        <svg
          className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)]"
          viewBox="0 0 120 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M60 6 C95 6 114 18 114 30 C114 46 88 55 58 55 C26 55 6 45 6 30 C6 17 24 8 54 6"
            fill="none"
            stroke="#F0B429"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
          />
        </svg>
      </span>
      {after}
    </>
  );
}

// Dynamic promotional / advertisement pop-up (image OR video + text + CTA).
// Fully CMS-driven via sections.promoPopup — content is added/updated/removed
// from the admin panel with no code changes. Shows on every home-page load when
// enabled and the admin has provided media or text. Strict Arabic (blank, never
// English fallback).
export default function PromoPopup() {
  const { language } = useLanguage();
  const reduced = !!useReducedMotion();
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);
  // Artwork width/height. Drives the layout so the media panel is always the
  // artwork's exact shape — full image/video visible, no letterbox strips.
  const [ratio, setRatio] = useState(null);

  useEffect(() => {
    let active = true;
    fetchPage("home").then((page) => {
      if (active) setPopup(page?.sections?.promoPopup ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  // Resolve display values (strict Arabic).
  const enabled = popup?.enabled !== false;
  const mediaType = popup?.mediaType === "video" ? "video" : "image";
  const image = (popup?.image || "").trim();
  const video = (popup?.video || "").trim();
  const hasMedia = mediaType === "video" ? Boolean(video) : Boolean(image);
  const eyebrow = t(popup, "eyebrow", language);
  const heading = t(popup, "heading", language);
  const description = t(popup, "description", language);
  const ctaLabel = t(popup, "ctaLabel", language);
  const ctaHref = (popup?.ctaHref || "").trim();
  // Social links — CMS-driven. Keep only entries with a known platform + URL.
  const socials = (Array.isArray(popup?.socials) ? popup.socials : [])
    .map((s) => ({
      platform: String(s?.platform || "").trim().toLowerCase(),
      url: String(s?.url || "").trim(),
    }))
    .filter((s) => s.url && SOCIAL_ICONS[s.platform]);
  // Nothing to show unless there is media or at least a heading.
  const hasContent = hasMedia || Boolean((heading || "").trim());

  // Read the artwork's natural size before opening (falls back to 16:9).
  useEffect(() => {
    if (!hasMedia) return;
    let active = true;
    let settled = false;
    const done = (w, h) => {
      if (!active || settled) return;
      settled = true;
      setRatio(w > 0 && h > 0 ? w / h : 16 / 9);
    };
    if (mediaType === "video") {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.muted = true;
      v.onloadedmetadata = () => done(v.videoWidth, v.videoHeight);
      v.onerror = () => done(0, 0);
      v.src = video;
    } else {
      const img = new window.Image();
      img.onload = () => done(img.naturalWidth, img.naturalHeight);
      img.onerror = () => done(0, 0);
      img.src = image;
    }
    const fallback = setTimeout(() => done(0, 0), 4000);
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, [hasMedia, mediaType, image, video]);

  // Open on every load (small delay so it doesn't fight the first paint).
  const ready = !hasMedia || ratio !== null;
  useEffect(() => {
    if (!popup || !enabled || !hasContent || !ready) return;
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, [popup, enabled, hasContent, ready]);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dir = language === "ar" ? "rtl" : "ltr";
  const hasText = eyebrow || heading || description || (ctaLabel && ctaHref) || socials.length > 0;
  const r = ratio || 16 / 9;
  // Wide artwork (banners) stacks media over text at every size; portrait /
  // square artwork sits beside the text from tablet up.
  const sideBySide = hasMedia && hasText && r < 1.15;

  // Staggered reveal for the content panel.
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
  };
  const item = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      };

  return (
    <AnimatePresence>
      {open && enabled && hasContent ? (
        <motion.div
          key="promo"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={(heading || "Announcement").replace(/\{\{|\}\}/g, "")}
        >
          {/* Backdrop — fades in; click to dismiss */}
          <motion.button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-slate-950/60 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Card. Stacked: width is capped so artwork + text fit the
              viewport height (r = artwork ratio, ~26rem reserved for text).
              Side by side: the artwork sets the card height and the text
              column scrolls inside it, so the media never letterboxes. */}
          <motion.div
            className={`relative z-[1] flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_rgba(2,6,23,0.45)] ${
              sideBySide ? "w-full max-w-md sm:w-fit sm:max-w-none sm:flex-row" : ""
            }`}
            style={
              hasMedia && !sideBySide
                ? { width: `max(min(18rem, 100%), min(100%, 46rem, calc((100dvh - 2rem - 26rem) * ${r})))` }
                : !hasMedia
                ? { width: "100%", maxWidth: "36rem" }
                : undefined
            }
            dir={dir}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute end-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-[0_6px_18px_rgba(2,6,23,0.16)] backdrop-blur transition hover:rotate-90 hover:bg-white hover:text-slate-900"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Single scroll area (mobile fallback on very short screens). */}
            <div className={`flex min-h-0 flex-1 flex-col overflow-y-auto ${sideBySide ? "sm:flex-row sm:overflow-visible" : ""}`}>
            {/* Media panel — exactly the artwork's aspect ratio, full width of
                its panel: the whole image/video shows, nothing cropped, no
                strips or edges around it. */}
            {hasMedia ? (
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={
                  sideBySide
                    ? { "--media-w": `min(calc(min(80dvh, 640px) * ${r}), calc(92vw - 420px))` }
                    : undefined
                }
              >
                {mediaType === "video" ? (
                  <video onContextMenu={(e) => e.preventDefault()}
                    src={video}
                    poster={image || undefined}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      const { videoWidth: w, videoHeight: h } = e.currentTarget;
                      if (w && h) setRatio(w / h);
                    }}
                    style={{ aspectRatio: r }}
                    className={`block h-auto w-full object-contain ${sideBySide ? "sm:w-[var(--media-w)]" : ""}`}
                  />
                ) : (
                  <motion.img
                    src={image}
                    alt={(heading || "Promotion").replace(/\{\{|\}\}/g, "")}
                    onLoad={(e) => {
                      const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                      if (w && h) setRatio(w / h);
                    }}
                    style={{ aspectRatio: r }}
                    className={`block h-auto w-full object-contain ${sideBySide ? "sm:w-[var(--media-w)]" : ""}`}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease }}
                  />
                )}
              </div>
            ) : null}

            {/* Content panel (right) — staggered reveal */}
            {hasText ? (
              <div className={sideBySide ? "relative shrink-0 sm:w-[380px] md:w-[420px]" : "w-full"}>
              <motion.div
                className={`flex flex-col items-center justify-center text-center ${
                  hasMedia ? "px-6 py-7 sm:px-9 sm:py-8" : "px-7 py-10 sm:px-10 sm:py-12"
                } ${sideBySide ? "sm:absolute sm:inset-0 sm:justify-start sm:overflow-y-auto sm:[&>:first-child]:mt-auto sm:[&>:last-child]:mb-auto" : ""}`}
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {eyebrow ? (
                  <motion.p
                    variants={item}
                    className="mb-4 font-serif text-[0.82rem] uppercase tracking-[0.32em] text-slate-500 [overflow-wrap:anywhere]"
                  >
                    {eyebrow}
                  </motion.p>
                ) : null}
                {heading ? (
                  <motion.h2
                    variants={item}
                    className="text-[1.6rem] font-semibold leading-[1.2] tracking-tight text-slate-950 sm:text-[2.1rem] [overflow-wrap:anywhere]"
                  >
                    <HeadingWithAccent text={heading} reduced={reduced} />
                  </motion.h2>
                ) : null}
                {description ? (
                  <motion.div
                    variants={item}
                    className="order-last mt-5 text-sm leading-7 text-slate-400 sm:text-[0.95rem] [overflow-wrap:anywhere]"
                  >
                    <RichText text={description} />
                  </motion.div>
                ) : null}
                {ctaLabel && ctaHref ? (
                  <motion.div variants={item} className="mt-6 w-full max-w-sm">
                    <Link
                      href={ctaHref}
                      onClick={() => setOpen(false)}
                      className="group inline-flex w-full items-center justify-center rounded-2xl bg-[#0088FF] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(0,136,255,0.34)] transition hover:-translate-y-0.5 hover:brightness-110 [overflow-wrap:anywhere]"
                    >
                      {ctaLabel}
                    </Link>
                  </motion.div>
                ) : null}
                {socials.length > 0 ? (
                  <motion.div
                    variants={item}
                    className="order-last mt-6 flex items-center justify-center gap-3.5"
                  >
                    {socials.map((s, i) => {
                      const Icon = SOCIAL_ICONS[s.platform];
                      return (
                        <a
                          key={`${s.platform}-${i}`}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:-translate-y-0.5 hover:border-[#0088FF] hover:bg-[#0088FF] hover:text-white"
                        >
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </motion.div>
                ) : null}
              </motion.div>
              </div>
            ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
