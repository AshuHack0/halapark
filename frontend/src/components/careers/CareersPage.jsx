"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
} from "lucide-react";
import JobApplicationModal from "./JobApplicationModal";

const ease = [0.22, 1, 0.36, 1];

function CareersHero({ hero }) {
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            {hero?.image ? (
              <Image
                src={hero.image}
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
                priority
              />
            ) : null}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>
          <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center px-8 py-14 text-center sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-3xl">
              <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-white">
                {hero?.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                {hero?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildingSmarterMobility({ building }) {
  const reduced = useReducedMotion();
  const titleLines = (building?.title ?? "").split("\n");

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
              {titleLines.map((line, i) => (
                <span key={`${line}-${i}`}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h2>
            <div className="mt-8 space-y-5 text-[0.94rem] leading-7 text-slate-500 sm:text-base">
              {(building?.paragraphs ?? []).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function JobOpenings({ openPositions }) {
  const reduced = useReducedMotion();
  const posts = openPositions?.posts ?? [];
  const [applyJob, setApplyJob] = useState(null);

  if (posts.length === 0) return null;

  return (
    <>
      <JobApplicationModal
        isOpen={Boolean(applyJob)}
        onClose={() => setApplyJob(null)}
        job={applyJob}
      />
    <section id="open-positions" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[780px] text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
            {openPositions?.title ?? "Open Positions"}
          </h2>
          {openPositions?.subtitle ? (
            <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              {openPositions.subtitle}
            </p>
          ) : null}
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-4">
          {posts.map((post, i) => {
              const useForm = post.applyMode === "form";
              const applyHref = post.applyLink || "/contact";
              const ApplyTag = !useForm && applyHref.startsWith("/") ? Link : "a";

              return (
                <motion.article
                  key={`${post.title}-${i}`}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                  className="rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#050A13] sm:text-lg">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.department ? (
                          <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0088FF]">
                            {post.department}
                          </span>
                        ) : null}
                        {post.employmentType ? (
                          <span className="rounded-full border border-[#E7EAF0] bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600">
                            {post.employmentType}
                          </span>
                        ) : null}
                      </div>
                      {post.location ? (
                        <p className="mt-3 text-sm text-slate-500">{post.location}</p>
                      ) : null}
                      {post.description ? (
                        <p className="mt-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
                          {post.description}
                        </p>
                      ) : null}
                    </div>
                    {useForm ? (
                      <button
                        type="button"
                        onClick={() => setApplyJob(post)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,136,255,0.35)] transition hover:brightness-110"
                      >
                        {post.applyLabel ?? "Apply Now"}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    ) : (
                      <ApplyTag
                        href={applyHref}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,136,255,0.35)] transition hover:brightness-110"
                      >
                        {post.applyLabel ?? "Apply Now"}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </ApplyTag>
                    )}
                  </div>
                </motion.article>
              );
            })}
        </div>
      </div>
    </section>
    </>
  );
}

function WhyJoinUs({ whyJoin }) {
  const reduced = useReducedMotion();
  const reasons = whyJoin?.reasons ?? [];

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
              {whyJoin?.title}
            </h2>
            <p className="mt-4 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-600">
              {whyJoin?.subtitle}
            </p>
            <div className="mt-8 rounded-[20px] border border-[#E7EAF0] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#050A13]">
                More Than Colleagues. One Team.
              </h3>
              <p className="mt-3 text-[0.93rem] leading-7 text-slate-500">
                {whyJoin?.bodyParagraph}
              </p>
            </div>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="space-y-3"
          >
            {reasons.map((reason, i) => (
              <motion.li
                key={`${reason}-${i}`}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.05 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[0.94rem] font-medium text-[#050A13]">{reason}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function CareersCTA({ cta, heroImage, hasOpenPositions }) {
  const reduced = useReducedMotion();
  const primaryHref = cta?.primaryCtaLink || "/contact";
  const secondaryHref = cta?.secondaryCtaLink || "#open-positions";
  const SecondaryTag = secondaryHref.startsWith("#") ? "a" : Link;

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          <div className="absolute inset-0">
            {heroImage ? (
              <Image
                src={heroImage}
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
              />
            ) : null}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24"
          >
            <h2 className="max-w-[640px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-white">
              {cta?.title}
            </h2>
            <p className="mt-3 text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium text-white/85">
              {cta?.subtitle}
            </p>
            <p className="mt-5 max-w-[620px] text-[0.88rem] leading-6 text-white/70 sm:text-[0.94rem]">
              {cta?.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-10 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
              >
                {cta?.primaryCtaText} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {hasOpenPositions ? (
                <SecondaryTag
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-10 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  {cta?.secondaryCtaText}
                </SecondaryTag>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function CareersPage({ content }) {
  if (!content) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white px-4">
        <p className="text-center text-slate-500">
          Careers page content is unavailable. Please ensure the backend is running.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <CareersHero hero={content.hero} />
      <BuildingSmarterMobility building={content.building} />
      <JobOpenings openPositions={content.openPositions} />
      <WhyJoinUs whyJoin={content.whyJoin} />
      <CareersCTA
        cta={content.cta}
        heroImage={content.hero?.image}
        hasOpenPositions={(content.openPositions?.posts?.length ?? 0) > 0}
      />
    </main>
  );
}
