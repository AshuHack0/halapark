"use client";

import { MessageCircleMore } from "lucide-react";

import { useLanguage, t } from "@/context/LanguageContext";

// CMS-only: the DB is the source of truth. Deleted content is not rendered;
// the whole section hides when it has no heading/body/button.
export default function WhatsAppSection({ whatsappCta }) {
  const { language } = useLanguage();

  const eyebrow = t(whatsappCta, "eyebrow", language);
  const heading = t(whatsappCta, "heading", language);
  const body = t(whatsappCta, "body", language);
  const button = t(whatsappCta, "button", language);
  const note = t(whatsappCta, "note", language);
  const link =
    typeof whatsappCta?.link === "string" && whatsappCta.link.trim()
      ? whatsappCta.link.trim()
      : "";

  if (!heading && !body && !button) return null;

  return (
    <section className="mt-8 rounded-[32px] border border-emerald-200 bg-[linear-gradient(135deg,#EFFFF6_0%,#FFFFFF_100%)] p-6 shadow-[0_20px_70px_rgba(22,101,52,0.08)] sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700 [overflow-wrap:anywhere]">
              {eyebrow}
            </span>
          ) : null}
          {heading ? (
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl [overflow-wrap:anywhere]">
              {heading}
            </h2>
          ) : null}
          {body ? (
            <p className="mt-4 text-base leading-7 text-slate-600 [overflow-wrap:anywhere]">
              {body}
            </p>
          ) : null}
        </div>

        {button ? (
          <div className="flex flex-col items-start gap-3">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition hover:brightness-95 [overflow-wrap:anywhere]"
              >
                <MessageCircleMore className="h-5 w-5 shrink-0" />
                {button}
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white opacity-80 [overflow-wrap:anywhere]"
              >
                <MessageCircleMore className="h-5 w-5 shrink-0" />
                {button}
              </button>
            )}
            {note ? (
              <p className="text-sm text-slate-500 [overflow-wrap:anywhere]">
                {note}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
