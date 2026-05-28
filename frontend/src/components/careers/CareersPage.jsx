"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Check, Smartphone, Briefcase, Users, HeadphonesIcon, Building2,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function CareersHero() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.play()?.catch(() => {});
  }, []);

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src="/HalaParkVideo.mp4"
              poster="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png"
              muted loop playsInline preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-xl">
              <h1 className="text-5xl font-semibold leading-[1.01] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
                Join Our Growing{" "}
                <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">Team</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                We are always looking for passionate individuals who want to grow with us and be part of an innovative team transforming valet and parking operations through technology.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] sm:text-base">
                  Join Our Team <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────

function CareersIntro() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px]">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-8 text-center text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Who We&apos;re{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Looking For</span>
            </h2>
            <div className="space-y-5 text-center text-[0.94rem] leading-7 text-slate-500 sm:text-[1rem] sm:leading-8">
              <p>
                At HalaPark, we are building a smarter, faster, and more convenient parking and mobility experience across the UAE.
              </p>
              <p className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#050A13]">
                Whether you are experienced in valet services, customer service, operations, or technology — we welcome motivated individuals who are ready to deliver excellent service and be part of a dynamic environment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Smart Technology ─────────────────────────────────────────────────────────

function SmartTechnology() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Smart Technology{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">in Parking</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              AI-Powered Vehicle Retrieval
            </p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            <p>
              We are proud to introduce our AI-powered system that allows customers to easily locate their parked vehicles through our mobile application.
            </p>
            <p>
              This innovation helps improve customer experience by making vehicle retrieval faster, easier, and more efficient — reducing waiting time and enhancing overall satisfaction.
            </p>
            <div className="mt-2 inline-flex items-center gap-3 rounded-[14px] border border-[#C6DEFF] bg-[#EEF6FF] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#0088FF]">
                <Smartphone className="h-4 w-4 text-white" strokeWidth={1.8} aria-hidden />
              </div>
              <span className="text-[0.88rem] font-medium text-[#050A13]">Find your vehicle instantly via the HalaPark app</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Opportunities ────────────────────────────────────────────────────────────

const opportunities = [
  {
    icon: Briefcase,
    title: "Full-Time Valet Roles",
    description: "Join our professional valet team and work in premium locations across the UAE, delivering high-quality parking and vehicle handling services.",
    badge: "Full-Time",
  },
  {
    icon: Users,
    title: "Freelance Valet Opportunities",
    description: "We also welcome freelance valet partners who want flexible working arrangements. Be part of our network and choose shifts that suit your availability.",
    badge: "Freelance",
  },
  {
    icon: HeadphonesIcon,
    title: "CRM & Operations Support",
    description: "Join our CRM and operations team to help manage bookings, support customers, and ensure smooth daily operations across all platforms.",
    badge: "Operations",
  },
  {
    icon: Building2,
    title: "Office Team",
    description: "Be part of our office team supporting HR, recruitment, finance, marketing, business development, and other corporate roles that drive company growth.",
    badge: "Corporate",
  },
];

function Opportunities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Opportunities with{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">HalaPark</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            Find the role that fits your skills and ambitions.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {opportunities.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.07 }} className="group rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_16px_40px_rgba(0,136,255,0.10)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                    <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <span className="rounded-full border border-[#C6DEFF] bg-[#EEF6FF] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#0088FF]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">{item.title}</h3>
                <p className="mt-3 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Join Us ──────────────────────────────────────────────────────────────

const whyReasons = [
  "Work with a fast-growing mobility tech company",
  "Flexible freelance and full-time opportunities",
  "Exposure to smart AI-powered parking systems",
  "Career growth and training opportunities",
  "Be part of a supportive and professional team",
];

function WhyJoinUs() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Why{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Join Us?</span>
            </h2>
            <p className="mt-5 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              HalaPark offers more than a job. We offer a career with purpose, growth, and the chance to be part of something bigger.
            </p>
          </motion.div>

          <motion.ul initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="space-y-3">
            {whyReasons.map((reason, i) => (
              <motion.li key={reason} initial={reduced ? false : { opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.07 }} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
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

// ─── Final CTA ────────────────────────────────────────────────────────────────

function CareersCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-40" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06111f]/60 via-[#06111f]/40 to-[#06111f]/80" />
          </div>
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <defs>
              <radialGradient id="careersNodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0088FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[[120,80,400,200],[280,300,400,200],[600,120,400,200],[680,300,400,200],[50,200,400,200],[750,200,400,200]].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0088FF" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 6" />
            ))}
            {[[120,80],[280,300],[600,120],[680,300],[50,200],[750,200]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#0088FF" fillOpacity="0.7" />
            ))}
            <circle cx="400" cy="200" r="60" fill="url(#careersNodeGlow)" />
            <circle cx="400" cy="200" r="6" fill="#0088FF" />
          </svg>

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }} className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Be Part of HalaPark</span>
            </div>
            <h2 className="max-w-[640px] text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              Be Part of the{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                Future of Smart Parking
              </span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[0.88rem] leading-6 text-white/65 sm:text-[0.94rem]">
              If you are interested in joining our team, we welcome you to apply and become part of the future of smart parking and valet services in the UAE.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-10 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110">
                Join Our Team <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <CareersHero />
      <CareersIntro />
      <SmartTechnology />
      <Opportunities />
      <WhyJoinUs />
      <CareersCTA />
    </main>
  );
}
