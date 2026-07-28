"use client";

import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// Shared renderer for the long-text legal pages (Terms, Privacy, Refund).
// Fully CMS-driven: the DB `sections.legal` is the single source of truth.
// The body is rich HTML authored with the admin's TinyMCE editor; bodies saved
// before the rich editor existed (plain text) still render with their line
// breaks preserved. Strict Arabic — an empty Arabic value stays blank (never
// falls back to English).

// Content authored in the admin's rich editor starts with an HTML tag.
const looksLikeHtml = (s) => /^\s*</.test(s || "");
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
        {looksLikeHtml(body) ? (
          <div
            className="legal-body mt-8 text-[0.95rem] leading-8 text-slate-700 [overflow-wrap:anywhere] sm:text-base"
            // Admin-authored rich text (TinyMCE) — trusted CMS content.
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="mt-8 whitespace-pre-line text-[0.95rem] leading-8 text-slate-700 [overflow-wrap:anywhere] sm:text-base">
            {body}
          </div>
        )}
        <style jsx global>{`
          .legal-body h1, .legal-body h2, .legal-body h3 { color: #050a13; font-weight: 600; letter-spacing: -0.02em; margin: 1.6em 0 0.6em; line-height: 1.25; }
          .legal-body h1 { font-size: 1.6em; }
          .legal-body h2 { font-size: 1.35em; }
          .legal-body h3 { font-size: 1.15em; }
          .legal-body p { margin: 0.9em 0; }
          .legal-body ul, .legal-body ol { margin: 0.9em 0; padding-inline-start: 1.6em; }
          .legal-body ul { list-style: disc; }
          .legal-body ol { list-style: decimal; }
          .legal-body li { margin: 0.35em 0; }
          .legal-body a { color: #0088ff; text-decoration: underline; text-underline-offset: 2px; }
          .legal-body strong { color: #0f172a; }
          .legal-body table { width: 100%; border-collapse: collapse; margin: 1.2em 0; font-size: 0.92em; }
          .legal-body th, .legal-body td { border: 1px solid #e2e8f0; padding: 0.55em 0.75em; text-align: start; }
          .legal-body th { background: #f8fafc; font-weight: 600; }
        `}</style>
      </div>
    </main>
  );
}
