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

      <div
        className="relative z-[1] w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_28px_80px_rgba(2,6,23,0.35)]"
        dir={dir}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute end-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Media */}
        {hasMedia ? (
          <div className="relative w-full overflow-hidden bg-slate-100">
            {mediaType === "video" ? (
              <video
                src={video}
                poster={image || undefined}
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                className="h-auto max-h-[52vh] w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={heading || "Promotion"}
                className="h-auto max-h-[52vh] w-full object-cover"
              />
            )}
          </div>
        ) : null}

        {/* Text + CTA */}
        {(heading || description || (ctaLabel && ctaHref)) ? (
          <div className="px-6 py-6 sm:px-8 sm:py-7 text-center">
            {heading ? (
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[1.7rem] [overflow-wrap:anywhere]">
                {heading}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base [overflow-wrap:anywhere]">
                {description}
              </p>
            ) : null}
            {ctaLabel && ctaHref ? (
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,136,255,0.28)] transition hover:brightness-110 [overflow-wrap:anywhere]"
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
