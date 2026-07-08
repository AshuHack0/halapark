"use client";

import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// Shared renderer for the long-text legal pages (Terms, Privacy, Refund).
// Fully CMS-driven: the DB `sections.legal` is the single source of truth.
// The body is plain text rendered with `whitespace-pre-line` so the line breaks
// and blank lines the admin typed are preserved. Strict Arabic — an empty
// Arabic value stays blank (never falls back to English).
export default function LegalPage({ slug, fallbackTitle }) {
  const { language } = useLanguage();
  const [legal, setLegal] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage(slug)
      .then((page) => {
        if (active) setLegal(page?.sections?.legal ?? null);
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!resolved) return null;

  const title = t(legal, "title", language) || (language === "ar" ? "" : fallbackTitle);
  const body = t(legal, "body", language);
  const dir = language === "ar" ? "rtl" : "ltr";

  // Hide the page entirely when the admin has not entered a body.
  if (!body || !body.trim()) {
    return (
      <main className="min-h-[60vh] bg-white">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 text-slate-500">
            {language === "ar" ? "المحتوى غير متوفر حالياً." : "This content is not available yet."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8" dir={dir}>
        {title ? (
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl [overflow-wrap:anywhere]">
            {title}
          </h1>
        ) : null}
        <div className="mt-8 whitespace-pre-line text-[0.95rem] leading-8 text-slate-700 [overflow-wrap:anywhere] sm:text-base">
          {body}
        </div>
      </div>
    </main>
  );
}
