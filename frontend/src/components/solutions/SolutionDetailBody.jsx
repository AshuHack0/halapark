"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ShieldCheck, AlertTriangle, Lightbulb } from "lucide-react";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

/**
 * Client body for a solution detail page (new standardized template).
 *
 * Sections (all bilingual — English + Arabic `ar` sibling, strict Arabic so an
 * untranslated field renders blank in AR):
 *   1. Banner            — title, subtitle, shortDescription, CTA, image
 *   2. Why X Matters     — heading + multi-paragraph body + image
 *   3. Problem We Face    — heading + body
 *   4. Our Solution       — heading + body
 *   5. Key Benefits       — list of { title, description } cards
 *   6. How It Works       — numbered steps { title, description }, or a paragraph
 *   7. Other Related      — links to other solution detail pages (by slug)
 *
 * `relatedList` is the full details array, used to resolve the related-service
 * slugs into clickable links. `heroImage` is the per-solution image from the CMS
 * card (source of truth), falling back to the detail's own image.
 */
export default function SolutionDetailBody({ detail, heroImage, relatedList = [], relatedCards = [] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const dir = isAr ? "rtl" : "ltr";

  // Bilingual scalar (strict Arabic: blank in AR when no Arabic value).
  const tx = (key) => t(detail, key, language);

  // Bilingual paragraph block: a field may be a single string or an array of
  // paragraphs. In AR, prefer the parallel ar.<field> (string or array).
  const paras = (key) => {
    const src = isAr ? detail.ar?.[key] : detail[key];
    if (Array.isArray(src)) return src.filter((p) => typeof p === "string" && p.trim());
    // Split on blank lines into paragraphs; keep single newlines INSIDE a
    // paragraph so `whitespace-pre-line` preserves admin line breaks/spacing.
    if (typeof src === "string" && src.trim()) return src.split(/\n{2,}/).filter((p) => p.trim());
    return [];
  };

  // Bilingual list-of-objects ({ title, description }). In AR, read the parallel
  // ar.<field> array by index (strict — blank when the AR entry is missing).
  const objList = (key) => {
    const en = Array.isArray(detail[key]) ? detail[key] : [];
    if (!isAr) return en;
    const ar = Array.isArray(detail.ar?.[key]) ? detail.ar[key] : [];
    return en.map((_, i) => ar[i] || {});
  };

  const banner = {
    title: tx("title") || (isAr ? "" : detail.title || ""),
    subtitle: tx("subtitle"),
    shortDescription: tx("shortDescription"),
    ctaLabel: tx("ctaLabel") || (isAr ? "" : "Contact Us"),
    ctaLink: detail.ctaLink || "/contact",
  };

  const whyHeading = tx("whyHeading");
  const whyBody = paras("whyBody");
  const whyImage = detail.whyImage || heroImage;

  const problemHeading = tx("problemHeading") || (isAr ? "" : "Problem We Face");
  const problemBody = paras("problemBody");
  const problemImage = detail.problemImage || "";

  const solutionHeading = tx("solutionHeading") || (isAr ? "" : "Our Solution");
  const solutionBody = paras("solutionBody");
  const solutionImage = detail.solutionImage || "";

  const benefitsHeading = tx("benefitsHeading") || (isAr ? "" : "Key Benefits");
  const keyBenefits = objList("keyBenefits");

  const howHeading = tx("howItWorksHeading") || (isAr ? "" : "How It Works");
  const steps = objList("steps");
  const howBody = paras("howItWorksBody");

  const relatedHeading = tx("relatedHeading") || (isAr ? "" : "Other Related Services");
  // Resolve related slugs → { slug, label, image } using the live details list
  // (label) and the cards list (canonical image, like the hero).
  // Only related items that are LIVE solutions (a current card exists for the
  // slug) render — orphaned/seeded detail pages never appear as related links.
  const liveSlugs = new Set(
    (Array.isArray(relatedCards) ? relatedCards : [])
      .map((c) => (c?.slug || "").trim())
      .filter(Boolean),
  );
  const related = (Array.isArray(detail.relatedServices) ? detail.relatedServices : [])
    .map((slug) => {
      const match = relatedList.find((d) => d.slug === slug);
      if (!match) return null;
      if (liveSlugs.size > 0 && !liveSlugs.has((slug || "").trim())) return null;
      // A related item is a NAVIGATION LINK, not prose — so it must never vanish
      // just because an Arabic title is missing. Prefer the Arabic title in AR,
      // then fall back to the English title / slug so every related service the
      // admin picked always shows (this fixes "only 2 appear in Arabic").
      const label = isAr
        ? (match.ar?.title || match.title || match.slug)
        : (match.title || match.slug);
      if (!label) return null;
      // Image priority: card image (CMS source of truth) → detail image. No
      // fallback — if there's no real image, the card renders without an image.
      const card = relatedCards.find((c) => c.slug === slug);
      const cardImg = card?.image && card.image !== "/image.png" ? card.image : null;
      const detailImg = match.image && match.image !== "/image.png" ? match.image : null;
      const image = cardImg || detailImg || null;
      return { slug, label, image };
    })
    .filter(Boolean);

  return (
    <main className="bg-white" dir={dir}>
      {/* ── 1. Banner ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_38%,#F0F7FF_66%,#EAF3FF_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0088FF]/20 to-transparent" />

        <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              {banner.subtitle ? (
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0088FF] [overflow-wrap:anywhere]">
                  {banner.subtitle}
                </p>
              ) : null}
              <h1 className="max-w-[620px] text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere]">
                {banner.title}
              </h1>
              {banner.shortDescription ? (
                <p className="mt-6 max-w-[560px] whitespace-pre-line text-[1.05rem] leading-[1.85] text-slate-600 sm:text-[1.12rem] [overflow-wrap:anywhere]">
                  {banner.shortDescription}
                </p>
              ) : null}
              {banner.ctaLabel ? (
                <Link
                  href={banner.ctaLink}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.4)] transition hover:brightness-110"
                >
                  {banner.ctaLabel}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                </Link>
              ) : null}
            </div>

            {heroImage ? (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] lg:mx-0 lg:ms-auto lg:max-w-[540px]">
                <Image
                  src={heroImage}
                  alt={banner.title}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 540px, 560px"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── 2. Why X Matters ───────────────────────────────────────────── */}
      {whyHeading || whyBody.length > 0 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                {whyHeading ? (
                  <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-[#050A13] [overflow-wrap:anywhere]">
                    {whyHeading}
                  </h2>
                ) : null}
                <div className="mt-5 space-y-4">
                  {whyBody.map((p, i) => (
                    <p key={i} className="whitespace-pre-line text-[0.98rem] leading-[1.9] text-slate-600 [overflow-wrap:anywhere]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              {whyImage ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-[rgba(0,136,255,0.12)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                  <Image
                    src={whyImage}
                    alt={whyHeading || banner.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 540px, 90vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 3. Problem We Face + 4. Our Solution ──────────────────────── */}
      {problemBody.length > 0 || solutionBody.length > 0 || problemImage || solutionImage ? (
        <section className="bg-[#F4F8FF] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {problemBody.length > 0 || problemImage ? (
                <div className="rounded-[24px] border border-[rgba(239,68,68,0.18)] bg-white p-7 shadow-[0_4px_24px_rgba(6,6,22,0.05)] sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#EF4444]">
                      <AlertTriangle className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-[#050A13] sm:text-[1.5rem] [overflow-wrap:anywhere]">
                      {problemHeading}
                    </h2>
                  </div>
                  <div className="mt-5 space-y-4">
                    {problemBody.map((p, i) => (
                      <p key={i} className="whitespace-pre-line text-[0.95rem] leading-8 text-slate-600 [overflow-wrap:anywhere]">{p}</p>
                    ))}
                  </div>
                  {problemImage ? (
                    <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[rgba(239,68,68,0.14)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                      <Image
                        src={problemImage}
                        alt={problemHeading || banner.title}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 540px, 90vw"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {solutionBody.length > 0 || solutionImage ? (
                <div className="rounded-[24px] border border-[rgba(0,136,255,0.18)] bg-white p-7 shadow-[0_4px_24px_rgba(6,6,22,0.05)] sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#0088FF]">
                      <Lightbulb className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-[#050A13] sm:text-[1.5rem] [overflow-wrap:anywhere]">
                      {solutionHeading}
                    </h2>
                  </div>
                  <div className="mt-5 space-y-4">
                    {solutionBody.map((p, i) => (
                      <p key={i} className="whitespace-pre-line text-[0.95rem] leading-8 text-slate-600 [overflow-wrap:anywhere]">{p}</p>
                    ))}
                  </div>
                  {solutionImage ? (
                    <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[rgba(0,136,255,0.14)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                      <Image
                        src={solutionImage}
                        alt={solutionHeading || banner.title}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 540px, 90vw"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 5. Key Benefits ────────────────────────────────────────────── */}
      {keyBenefits.length > 0 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#050A13] [overflow-wrap:anywhere]">
              {benefitsHeading}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {keyBenefits.map((b, i) => {
                const bt = isAr ? b.title : b.title;
                const bd = isAr ? b.description : b.description;
                if (!bt && !bd) return null;
                return (
                  <div
                    key={i}
                    className="group rounded-[22px] border border-[rgba(0,136,255,0.12)] bg-[#F8FBFF] p-6 transition hover:-translate-y-1 hover:border-[#0088FF]/30 hover:bg-white hover:shadow-[0_16px_40px_rgba(0,136,255,0.1)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_6px_16px_rgba(0,136,255,0.3)]">
                      <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                    </span>
                    {bt ? (
                      <h3 className="mt-4 text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere]">{bt}</h3>
                    ) : null}
                    {bd ? (
                      <p className="mt-2 text-[0.88rem] leading-7 text-slate-500 [overflow-wrap:anywhere]">{bd}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 6. How It Works ────────────────────────────────────────────── */}
      {steps.length > 0 || howBody.length > 0 ? (
        <section className="bg-[#06111f] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-white [overflow-wrap:anywhere]">
              {howHeading}
            </h2>

            {steps.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {steps.map((s, i) => {
                  if (!s.title && !s.description) return null;
                  return (
                    <div key={i} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088FF] text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      {s.title ? (
                        <h3 className="mt-4 text-[1.02rem] font-semibold leading-tight text-white [overflow-wrap:anywhere]">{s.title}</h3>
                      ) : null}
                      {s.description ? (
                        <RichText text={s.description} className="mt-2 text-[0.88rem] leading-7 text-white/65 [overflow-wrap:anywhere] block" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-4">
                {howBody.map((p, i) => (
                  <p key={i} className="whitespace-pre-line text-[0.98rem] leading-8 text-white/70 [overflow-wrap:anywhere]">{p}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ── 7. Other Related Services ─────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold tracking-[-0.04em] text-[#050A13] [overflow-wrap:anywhere]">
              {relatedHeading}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/solutions/${r.slug}`}
                  className="group overflow-hidden rounded-[22px] border border-[rgba(0,136,255,0.14)] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:border-[#0088FF]/40 hover:shadow-[0_18px_44px_rgba(0,136,255,0.14)]"
                >
                  {/* Image cell — only when the solution has a real image */}
                  {r.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF3FF]">
                      <Image
                        src={r.image}
                        alt={r.label}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                  ) : null}
                  {/* Title + arrow */}
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-[0.95rem] font-semibold text-[#050A13] [overflow-wrap:anywhere]">{r.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#0088FF] transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
