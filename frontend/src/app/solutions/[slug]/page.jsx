import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { fetchSolutionDetails } from "@/lib/cms";
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
  const details = await fetchSolutionDetails();
  const detail = getSolutionDetailBySlug(slug, details);

  if (!detail) {
    notFound();
  }

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
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
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
            </div>

            {/* RIGHT — diagram / image */}
            {detail.image ? (
              <div className="relative overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.14)]">
                <Image
                  src={detail.image}
                  alt={detail.title}
                  width={900}
                  height={680}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
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
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Integrated Systems */}
            {Array.isArray(detail.systems) && detail.systems.length > 0 ? (
              <div className="rounded-[24px] border border-[rgba(0,136,255,0.14)] bg-[#F6FAFF] p-7 sm:p-9">
                <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-[#050A13] sm:text-[1.6rem]">
                  {detail.systemsHeading || "Integrated Systems"}
                </h2>
                <ul className="mt-6 space-y-3">
                  {detail.systems.map((item) => (
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
                <ul className="mt-6 space-y-3">
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

    </main>
  );
}
