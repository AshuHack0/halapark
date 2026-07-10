"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

import { ICON_BY_KEY } from "./contactData";

function ContactDetailItem({ detail }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const Icon = detail.icon;
  // Titles/descriptions are strict per language; the value (phone number,
  // email, address) is language-neutral data, so AR reuses it when no Arabic
  // variant is entered.
  const title = isAr ? detail.titleAr ?? "" : detail.title;
  const displayValue = isAr ? detail.valueAr || detail.value : detail.value;
  const description = isAr ? detail.descriptionAr ?? "" : detail.description;

  const value = detail.href ? (
    <a
      href={detail.href}
      className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 transition hover:text-[#0088FF]"
    >
      {displayValue}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  ) : (
    <p className="text-base font-semibold text-slate-900">{displayValue}</p>
  );

  return (
    <li className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,136,255,0.08)] text-[#0088FF]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500 [overflow-wrap:anywhere]">
            {title}
          </p>
          <div className="mt-2 break-words">{value}</div>
          {description ? (
            <RichText text={description} className="mt-2 text-sm leading-6 text-slate-600 [overflow-wrap:anywhere] block" />
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default function ContactInfoPanel({ details }) {
  const { language } = useLanguage();

  // CMS-only: items deleted from the database simply don't render.
  const detailsList = (Array.isArray(details?.items) ? details.items : [])
    .filter((item) => item && (item.title || item.value))
    .map((item) => ({
      key: item.key,
      title: item.title,
      titleAr: item.ar?.title,
      value: item.value,
      valueAr: item.ar?.value,
      href: item.href || undefined,
      description: item.description,
      descriptionAr: item.ar?.description,
      icon: ICON_BY_KEY[item.key] || ICON_BY_KEY.address,
    }));

  const eyebrow = t(details, "eyebrow", language);
  const heading = t(details, "heading", language);
  const intro = t(details, "intro", language);

  // Nothing in the CMS → hide the whole panel.
  if (detailsList.length === 0 && !eyebrow && !heading && !intro) return null;

  return (
    <aside className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(0,136,255,0.06)_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="max-w-md">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600 [overflow-wrap:anywhere]">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl [overflow-wrap:anywhere]">
            {heading}
          </h2>
        ) : null}
        {intro ? (
          <RichText text={intro} className="mt-4 text-base leading-7 text-slate-600 [overflow-wrap:anywhere] block" />
        ) : null}
      </div>

      {detailsList.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {detailsList.map((detail, index) => (
            <ContactDetailItem
              key={detail.key || detail.title || index}
              detail={detail}
            />
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
