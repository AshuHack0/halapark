"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// Dynamic promotional / advertisement pop-up (image OR video + text + CTA).
// Fully CMS-driven via sections.promoPopup — content is added/updated/removed
// from the admin panel with no code changes. Shows on every home-page load when
// enabled and the admin has provided media or text. Strict Arabic (blank, never
// English fallback).
export default function PromoPopup() {
  const { language } = useLanguage();
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);

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
  // Nothing to show unless there is media or at least a heading.
  const hasContent = hasMedia || Boolean((heading || "").trim());

  // Open on every load (small delay so it doesn't fight the first paint).
  useEffect(() => {
    if (!popup || !enabled || !hasContent) return;
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, [popup, enabled, hasContent]);

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

  if (!open || !enabled || !hasContent) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={heading || "Announcement"}
    >
      {/* Backdrop — click to dismiss */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/60 backdrop-blur-[2px]"
      />

      {/* Split card: media on the left, content panel on the right.
          Stacks (media on top) on mobile. */}
      <div
        className={`relative z-[1] grid w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(2,6,23,0.4)] ${
          hasMedia ? "sm:grid-cols-2" : "sm:grid-cols-1"
        }`}
        dir={dir}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute end-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-[0_4px_14px_rgba(2,6,23,0.18)] backdrop-blur transition hover:bg-white hover:text-slate-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Media panel (left) */}
        {hasMedia ? (
          <div className="relative min-h-[220px] w-full overflow-hidden bg-slate-100 sm:min-h-[380px]">
            {mediaType === "video" ? (
              <video
                src={video}
                poster={image || undefined}
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={heading || "Promotion"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        ) : null}

        {/* Content panel (right) */}
        {(eyebrow || heading || description || (ctaLabel && ctaHref)) ? (
          <div className="flex flex-col items-center justify-center px-6 py-9 text-center sm:px-9 sm:py-11">
            {eyebrow ? (
              <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#0088FF] [overflow-wrap:anywhere]">
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-[2rem] [overflow-wrap:anywhere]">
                {heading}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-500 sm:text-[0.95rem] [overflow-wrap:anywhere]">
                {description}
              </p>
            ) : null}
            {ctaLabel && ctaHref ? (
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#0088FF] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(0,136,255,0.32)] transition hover:brightness-110 sm:w-auto [overflow-wrap:anywhere]"
              >
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
