"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Check,
  Building2,
  CreditCard,
  Camera,
  Zap,
  Shield,
  Car,
} from "lucide-react";
import {
  solutionsHero,
  parkingChallenges,
  ourSolutions,
  solutionIntegration,
  smartCities,
  seamlessIntegrations,
  industries,
  deploymentJourney,
  whyHalapark,
  solutionsFinalCta,
} from "./solutionsContent";

const ease = [0.22, 1, 0.36, 1];

function SectionHeader({
  label,
  title,
  description,
  center = false,
  dark = false,
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
          {label}
        </p>
      ) : null}
      <h2
        className={`${label ? "mt-3" : ""} text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] ${
          dark ? "text-white" : "text-[#050A13]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-sm leading-7 sm:text-base ${
            dark ? "text-white/75" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SolutionsHero() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <img
              src={solutionsHero.image}
              alt=""
              aria-hidden
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>

          <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[600px] sm:px-8 md:min-h-[620px] lg:min-h-[680px]">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0088FF]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                  Our Solutions
                </p>
              </div>

              <h1 className="max-w-[720px] text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-white">
                {solutionsHero.title}
              </h1>
              <p className="mt-5 max-w-[480px] text-[0.95rem] leading-7 text-white/65">
                {solutionsHero.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-[#0088FF] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
                >
                  Request a Demo
                </Link>
                <a
                  href="#parking-challenges"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-9 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  Explore More
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParkingChallengesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="parking-challenges"
      className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionHeader
              title={parkingChallenges.title}
              description={parkingChallenges.description}
            />
            <ul className="mt-8 space-y-3">
              {parkingChallenges.challenges.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-white px-4 py-3.5 text-sm text-slate-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)]">
                    <Check className="h-3 w-3 text-[#0088FF]" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/app"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              View App Features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px]">
              <div className="absolute inset-x-[18%] bottom-3 h-10 rounded-full bg-[#0F172A]/14 blur-[28px]" />
              <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_26px_52px_rgba(15,23,42,0.18)]">
                <div className="absolute bottom-[1.2%] left-[4.2%] right-[4.2%] top-[1%] z-20 translate-y-[1px] overflow-hidden rounded-[3.2rem] bg-white">
                  <Image
                    src={parkingChallenges.appScreen}
                    alt="HalaPark mobile app"
                    fill
                    sizes="(min-width: 640px) 320px, 280px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 z-10">
                  <Image
                    src="/mobileframe.png"
                    alt=""
                    fill
                    sizes="(min-width: 640px) 320px, 280px"
                    className="select-none object-contain"
                  />
                </div>
              </div>
              <div className="absolute -right-4 top-8 z-20 grid w-[140px] gap-2 sm:-right-8 sm:w-[160px]">
                {parkingChallenges.collage.slice(0, 2).map((img) => (
                  <div
                    key={img.src}
                    className="relative h-20 overflow-hidden rounded-xl border border-white shadow-lg sm:h-24"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -left-4 bottom-8 z-20 grid w-[140px] gap-2 sm:-left-8 sm:w-[160px]">
                {parkingChallenges.collage.slice(2).map((img) => (
                  <div
                    key={img.src}
                    className="relative h-20 overflow-hidden rounded-xl border border-white shadow-lg sm:h-24"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OurSolutionsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="our-solutions" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Solutions"
          title={ourSolutions.title}
          center
        />
        <div className="mt-6 text-center">
          <a
            href="#our-solutions-grid"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0088FF]"
          >
            Explore Our Solutions
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        <div
          id="our-solutions-grid"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ourSolutions.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-[#f8fbff] shadow-[0_4px_20px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,136,255,0.12)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#e8eef5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-[#050A13]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,136,255,0.2)] bg-white text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white"
                  aria-label={`Learn more about ${item.title}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionIntegrationSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#F0F2F4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={solutionIntegration.title}
          center
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutionIntegration.points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, ease, delay: i * 0.05 }}
              className="rounded-[20px] border border-white bg-white p-6 shadow-[0_4px_18px_rgba(6,6,22,0.05)]"
            >
              <h3 className="text-base font-semibold text-[#050A13] sm:text-lg">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SmartCitiesSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            title={smartCities.title}
            description={smartCities.description}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {smartCities.capabilities.map((item) => (
              <motion.li
                key={item}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#f8fbff] px-4 py-4 text-sm font-medium text-slate-800"
              >
                <Building2 className="h-5 w-5 shrink-0 text-[#0088FF]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const INTEGRATION_ICONS = [CreditCard, Car, Camera, Shield, Zap];

function SeamlessIntegrationsSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <Image
              src={solutionsHero.image}
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>

          <div className="relative z-10 px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <SectionHeader
                title={seamlessIntegrations.title}
                description={seamlessIntegrations.description}
                dark
              />
              <div className="relative flex min-h-[280px] items-center justify-center">
                <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_center,rgba(0,136,255,0.2),transparent_70%)]" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-[#0088FF] shadow-[0_0_40px_rgba(0,136,255,0.5)]">
              <Image
                src="/Layer_1.svg"
                alt="HalaPark"
                width={48}
                height={60}
                className="h-14 w-auto"
              />
            </div>
            {seamlessIntegrations.systems.map((system, i) => {
              const Icon = INTEGRATION_ICONS[i % INTEGRATION_ICONS.length];
              const positions = [
                "left-[8%] top-[12%]",
                "right-[5%] top-[18%]",
                "left-[2%] bottom-[22%]",
                "right-[8%] bottom-[18%]",
                "left-1/2 top-[2%] -translate-x-1/2",
              ];
              return (
                <motion.div
                  key={system}
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`absolute ${positions[i]} max-w-[140px] rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-center text-[10px] font-medium leading-snug backdrop-blur-sm sm:max-w-[160px] sm:text-xs`}
                >
                  <Icon className="mx-auto mb-1 h-4 w-4 text-[#79CAFF]" />
                  {system}
                </motion.div>
              );
            })}
              </div>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
              {seamlessIntegrations.systems.map((system) => (
                <li
                  key={system}
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur-sm"
                >
                  {system}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src={industries.background}
          alt=""
          fill
          className="object-cover opacity-20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F8FF_0%,#FFFFFF_100%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={industries.title} center />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {industries.items.map((name, i) => (
            <motion.div
              key={name}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm"
            >
              <p className="text-sm font-semibold text-[#050A13] sm:text-base">
                {name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeploymentJourneySection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              title={deploymentJourney.title}
              description={deploymentJourney.description}
            />
            <div className="mt-10 space-y-6">
              {deploymentJourney.steps.map((step) => (
                <motion.div
                  key={step.step}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                  className="flex gap-5 rounded-2xl border border-slate-100 bg-[#f8fbff] p-5"
                >
                  <span className="text-2xl font-bold text-[#0088FF]/30">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#050A13]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px]">
              <div className="absolute inset-x-[18%] bottom-3 h-10 rounded-full bg-[#0F172A]/14 blur-[28px]" />
              <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_26px_52px_rgba(15,23,42,0.18)]">
                <div className="absolute bottom-[1.2%] left-[4.2%] right-[4.2%] top-[1%] z-20 translate-y-[1px] overflow-hidden rounded-[3.2rem] bg-white">
                  <Image
                    src={deploymentJourney.appScreen}
                    alt="Command center dashboard"
                    fill
                    sizes="(min-width: 640px) 320px, 280px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 z-10">
                  <Image
                    src="/mobileframe.png"
                    alt=""
                    fill
                    sizes="(min-width: 640px) 320px, 280px"
                    className="select-none object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyHalaparkSection() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeader title={whyHalapark.title} />
          <ul className="space-y-4">
            {whyHalapark.points.map((point, i) => (
              <motion.li
                key={point}
                initial={reduced ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 text-sm font-medium text-slate-800 shadow-sm sm:text-base"
              >
                <Check className="h-5 w-5 shrink-0 text-[#0088FF]" strokeWidth={2.5} />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SolutionsFinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <Image
              src={solutionsFinalCta.image}
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative z-10 max-w-3xl px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
          >
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.04em]">
              {solutionsFinalCta.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              {solutionsFinalCta.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Request Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
              >
                Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SolutionsHero />
      <ParkingChallengesSection />
      <OurSolutionsSection />
      <SolutionIntegrationSection />
      <SmartCitiesSection />
      <SeamlessIntegrationsSection />
      <IndustriesSection />
      <DeploymentJourneySection />
      <WhyHalaparkSection />
      <SolutionsFinalCTA />
    </main>
  );
}
