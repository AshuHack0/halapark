import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, ShieldCheck } from "lucide-react";
import { fetchSolutionDetails, fetchSolutionAdvantages, fetchSolutionCards } from "@/lib/cms";
import {
  DEFAULT_SOLUTION_DETAILS,
  getSolutionDetailBySlug,
} from "@/lib/solutionDetailsDefaults";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return DEFAULT_SOLUTION_DETAILS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = getSolutionDetailBySlug(slug, await fetchSolutionDetails());
  if (!detail) return { title: "Solution — HalaPark" };
  return {
    title: `${detail.eyebrow || detail.title} — HalaPark Solutions`,
    description: detail.intro,
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const [details, advantages, cards] = await Promise.all([
    fetchSolutionDetails(),
    fetchSolutionAdvantages(),
    fetchSolutionCards(),
  ]);
  const detail = getSolutionDetailBySlug(slug, details);

  if (!detail) {
    notFound();
  }

  // The card's image (managed via CMS "Our Solutions" cards) is the source of
  // truth for this solution. Fall back to the detail's own image, then default.
  const card = cards.find((c) => c.slug === slug);
  const heroImage = card?.image || detail.image || "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png";

  // v14 uses `systemComponents`; older details use `systems`. Render whichever exists.
  const components = (Array.isArray(detail.systemComponents) && detail.systemComponents.length > 0)
    ? detail.systemComponents
    : (Array.isArray(detail.systems) ? detail.systems : []);
  const componentsHeading = detail.systemComponentsHeading || detail.systemsHeading || "Integrated Systems";

  return (
    <main className="bg-white">
      {/* ── Hero / intro ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_38%,#F0F7FF_66%,#EAF3FF_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0088FF]/20 to-transparent" />

        <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* LEFT — title, intro */}
            <div>
              <h1 className="max-w-[620px] text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
                {detail.title}
              </h1>

              {detail.intro ? (
                <p className="mt-6 max-w-[560px] text-[1rem] italic leading-[1.8] text-slate-500">
                  {detail.intro}
                </p>
              ) : null}

              {detail.howItOperates ? (
                <div className="mt-6 max-w-[560px] rounded-2xl border border-[rgba(0,136,255,0.15)] bg-white/70 p-5 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0088FF]">How It Operates</p>
                  <p className="mt-2 text-[0.95rem] leading-7 text-slate-600">{detail.howItOperates}</p>
                </div>
              ) : null}
            </div>

            {/* RIGHT — diagram / image (uses the card image managed via CMS) */}
            {heroImage ? (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] lg:mx-0 lg:ml-auto lg:max-w-[540px]">
                <Image
                  src={heroImage}
                  alt={detail.title}
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

      {/* ── Integrated Systems + Key Benefit ─────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-6 lg:gap-8 ${components.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
            {/* System Components / Integrated Systems */}
            {components.length > 0 ? (
              <div className="rounded-[24px] border border-[rgba(0,136,255,0.14)] bg-[#F6FAFF] p-7 sm:p-9">
                <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-[#050A13] sm:text-[1.6rem]">
                  {componentsHeading}
                </h2>
                <ul className="mt-6 space-y-3">
                  {components.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]/10 text-[#0088FF]">
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-[0.95rem] leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Key Benefit */}
            {Array.isArray(detail.benefits) && detail.benefits.length > 0 ? (
              <div className="rounded-[24px] border border-[rgba(0,136,255,0.14)] bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-9">
                <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-[#050A13] sm:text-[1.6rem]">
                  {detail.benefitsHeading || "Key Benefit"}
                </h2>
                <ul className={`mt-6 grid gap-3 ${components.length > 0 ? "" : "sm:grid-cols-2"}`}>
                  {detail.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF] text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-[0.95rem] leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* ── Problem We Solve ──────────────────────────────────────── */}
          {detail.problemBody ? (
            <div className="mt-6 overflow-hidden rounded-[24px] bg-[#06111f] p-8 sm:mt-8 sm:p-10 lg:p-12">
              <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.7rem]">
                {detail.problemHeading || "Problem We Solve"}
              </h2>
              <p className="mt-4 max-w-3xl text-[0.95rem] leading-8 text-white/70 sm:text-[1rem]">
                {detail.problemBody}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={detail.ctaLink || "/contact"}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.4)] transition hover:brightness-110"
                >
                  {detail.ctaLabel || "Talk to Our Team"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  View All Solutions
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Advantages of Our Solutions (shared) ─────────────────────── */}
      {advantages && Array.isArray(advantages.items) && advantages.items.length > 0 ? (
        <section className="bg-[#F4F8FF] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
                Why HalaPark
              </p>
              <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] text-[#050A13]">
                {advantages.heading || "Advantages of Our Solutions"}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.items.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-[22px] border border-[rgba(0,136,255,0.12)] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.1)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_6px_16px_rgba(0,136,255,0.3)]">
                    <ShieldCheck className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13]">
                    {adv.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-7 text-slate-500">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
