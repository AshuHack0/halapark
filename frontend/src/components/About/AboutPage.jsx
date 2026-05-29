"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Check, Zap, CreditCard, Shield, BarChart3,
  Cpu, Leaf, Building2, Car, Network, CalendarCheck,
  Target, Eye, Globe, Users, TrendingUp,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function AboutHero() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.play()?.catch(() => {});
  }, []);

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <video ref={videoRef} src="/HalaParkVideo.mp4"
              poster="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png"
              muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-xl">
              <h1 className="text-5xl font-semibold leading-[1.01] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
                Smart Parking Beyond Expectations
              </h1>
              <p className="mt-4 text-base font-medium text-white/80 sm:text-lg">
                Intelligent Parking. Smarter Cities. Seamless Movement.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                HalaPark is not just a parking company. We are building the intelligence behind modern mobility.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110 sm:text-base">
                  Partner With HalaPark <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/contact" className="inline-block rounded-full border border-white/35 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm sm:text-base">
                  Speak With Our Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Who We Are ───────────────────────────────────────────────────────────────

function AboutIntro() {
  const reduced = useReducedMotion();
  const stats = [
    { value: "8+",  label: "Years of Experience" },
    { value: "120+", label: "Locations" },
    { value: "40+", label: "Enterprise Clients" },
    { value: "1M+", label: "Monthly Transactions" },
  ];
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13]">
              Born in Dubai.<br />Built for the Future.
            </h2>
            <div className="mt-8 space-y-5 text-[0.93rem] leading-7 text-slate-500">
              <p>
                HalaPark is transforming how cities, businesses, and communities experience parking. What was once fragmented, stressful, and time-consuming is now evolving into a seamless digital journey powered by smart technology, automation, and integrated mobility solutions.
              </p>
              <p className="font-medium text-[#050A13]">
                Born in Dubai and built for the future of urban movement, HalaPark transforms traditional parking into intelligent infrastructure where drivers, property owners, businesses, and cities move effortlessly together.
              </p>
              <p>
                Through AI-powered automation, digital access, real-time visibility, and operational intelligence, HalaPark delivers future-ready mobility solutions built for modern cities and next-generation developments.
              </p>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.12 }} className="flex flex-col gap-3">
            {/* Photo */}
            <div className="relative h-52 w-full overflow-hidden rounded-[20px] sm:h-60">
              <Image src="/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" alt="HalaPark parking facility" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
            </div>
            {/* Stats grid below photo */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-[#E0EAFF]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-start bg-white px-6 py-6">
                  <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-[#050A13]">{stat.value}</p>
                  <p className="mt-1.5 text-[0.75rem] font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Mission ──────────────────────────────────────────────────────────────────

function OurMission() {
  const reduced = useReducedMotion();
  const pillars = [
    { icon: Target, title: "Redefine Parking", desc: "Transform every parking touchpoint into a seamless digital experience." },
    { icon: Globe, title: "Smarter Cities", desc: "Support evolving urban mobility needs through intelligent infrastructure." },
    { icon: Users, title: "People First", desc: "Human-centered design at every step — from entry to exit." },
  ];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — heading + body text only */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Our Mission
            </h2>
            <p className="mb-7 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Creating Smarter Movement for Modern Cities
            </p>
            <div className="space-y-5 text-[0.93rem] leading-7 text-slate-500">
              <p>Our mission is to redefine how people experience parking and urban mobility through intelligent technology, seamless automation, and integrated digital platforms.</p>
              <p>HalaPark is committed to building smarter mobility environments that simplify movement, enhance convenience, improve operational performance, and support the evolving needs of modern communities and future-ready cities.</p>
              <p>Through innovation, scalable infrastructure, and human-centered experiences, we are shaping a future where mobility feels effortless, intuitive, and intelligently embedded into everyday life.</p>
            </div>
          </motion.div>

          {/* RIGHT — image on top, pillars below */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="flex flex-col gap-5">
            <div className="relative h-56 w-full overflow-hidden rounded-[20px] sm:h-64">
              <Image src="/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png" alt="Smart city mobility" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="space-y-3">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.08 }} className="flex gap-4 border-b border-[#E7EAF0] pb-4 last:border-0 last:pb-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <div>
                      <p className="text-[0.95rem] font-semibold text-[#050A13]">{p.title}</p>
                      <p className="mt-1 text-[0.83rem] leading-5 text-slate-500">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision ───────────────────────────────────────────────────────────────────

function OurVision() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Our Vision
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              A Future Where Parking Feels Invisible
            </p>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark is creating a future where parking becomes invisible, seamlessly integrated into the way cities move, operate, and evolve.</p>
              <p>A future where vehicles move effortlessly through intelligent environments. Where access is automated. Where payments are frictionless. Where operations are data-driven.</p>
              <p>As urban mobility continues to evolve, HalaPark innovates through intelligent systems that support smart city initiatives, EV integration, digital infrastructure, and next-generation transportation environments.</p>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-[#06111f] p-8 sm:p-10">
            <div className="absolute inset-0">
              <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-25" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/95 via-[#06111f]/80 to-[#06111f]/50" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Our Vision</span>
                </div>
                <p className="text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-[1.3] tracking-[-0.03em] text-white">
                  A Future Where Parking Feels Invisible
                </p>
                <p className="mt-4 text-[0.88rem] leading-6 text-white/55">
                  Seamlessly integrated into the way cities move, operate, and evolve.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {[["AI-Driven", "Operations"], ["Frictionless", "Payments"], ["Smart City", "Ready"]].map(([l1, l2]) => (
                  <div key={l1} className="text-center">
                    <p className="text-[0.78rem] font-semibold text-white">{l1}</p>
                    <p className="text-[0.72rem] text-white/45">{l2}</p>
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

// ─── Our Story ────────────────────────────────────────────────────────────────

function OurStory() {
  const reduced = useReducedMotion();
  const milestones = [
    { year: "Founded", text: "Solving parking inefficiency in modern cities" },
    { year: "Expanded", text: "120+ locations across the UAE and region" },
    { year: "Today", text: "An intelligent mobility network for next-gen cities" },
  ];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Our Story
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Built from a Vision to Simplify Urban Movement
            </p>
            <div className="space-y-5 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark was founded with one clear mission: to solve one of the most overlooked challenges in modern cities — parking inefficiency.</p>
              <p>As urban environments expanded and mobility demands accelerated, traditional parking systems struggled to evolve. Manual operations, disconnected infrastructure, and payment frustrations created unnecessary friction for both operators and drivers.</p>
              <p className="font-medium text-[#050A13]">We saw an opportunity to reimagine parking through technology.</p>
              <p>What began as a parking platform evolved into an intelligent mobility network designed to simplify vehicle movement, optimize operations, and unlock asset value.</p>
              <p className="font-medium text-[#050A13]">We are not simply managing parking spaces. We are engineering smarter mobility experiences for the next generation of urban environments.</p>
            </div>
          </motion.div>

          {/* Right column — photo with stats overlay */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease, delay: 0.12 }}>
            <div className="relative overflow-hidden rounded-[24px]">
              <div className="relative h-72 w-full sm:h-80">
                <Image src="/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" alt="HalaPark story" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-[#06111f]/20 to-transparent" />
              </div>
              {/* Stats pinned to bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
                {[["8+", "Years"], ["120+", "Locations"]].map(([v, l]) => (
                  <div key={l} className="bg-[#06111f]/70 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[1.8rem] font-semibold leading-none tracking-[-0.04em] text-white">{v}</p>
                    <p className="mt-1 text-[0.72rem] text-white/50">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["40+", "Enterprise Clients"], ["1M+", "Monthly Transactions"]].map(([v, l]) => (
                <div key={l} className="rounded-[16px] bg-[#F4F8FF] px-5 py-4">
                  <p className="text-[1.8rem] font-semibold leading-none tracking-[-0.04em] text-[#050A13]">{v}</p>
                  <p className="mt-1 text-[0.72rem] text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.08 }}>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0088FF]">{m.year}</p>
                  <p className="mt-0.5 text-[0.88rem] font-medium leading-snug text-[#050A13]">{m.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── What We Do ───────────────────────────────────────────────────────────────

const ecosystem = [
  "AI-Powered Parking Management", "Free Flow & Ticketless Parking",
  "Mobile Parking Applications", "Digital Payments & Wallet Systems",
  "Residential & Community Access Control", "Public & On-Street Parking",
  "Parking Guidance Systems", "Space Sharing & Monetization",
  "Digital Permit Management", "Real-Time Parking Analytics",
  "Data Intelligence & Operational Insights", "Smart Mobility Integrations",
  "EV & Future Mobility Readiness",
];

function WhatWeDo() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              What We Do
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Smart Parking Solutions for Modern Cities
            </p>
            <p className="text-[0.93rem] leading-7 text-slate-500">
              HalaPark delivers intelligent parking and mobility solutions that seamlessly combine automation, AI technology, operations, infrastructure, and digital experiences into one unified platform.
            </p>
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-[18px]">
              <Image src="/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" alt="HalaPark smart parking" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/15" />
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, ease }} className="grid gap-2.5 sm:grid-cols-2">
            {ecosystem.map((item, i) => (
              <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.025 }} className="flex items-center gap-3 rounded-[12px] bg-white px-4 py-3.5 shadow-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[0.85rem] font-medium text-[#050A13]">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Technology & Innovation ──────────────────────────────────────────────────

function TechnologyInnovation() {
  const reduced = useReducedMotion();
  const techPoints = [
    { icon: Cpu, label: "AI-Driven Automation", desc: "Machine learning at the core of every decision." },
    { icon: BarChart3, label: "Real-Time Data Intelligence", desc: "Live insights across all facilities and transactions." },
    { icon: Shield, label: "Cloud-Based Infrastructure", desc: "Scalable, secure, always-on platform architecture." },
    { icon: Zap, label: "Smart Access Systems", desc: "Frictionless entry and exit powered by smart recognition." },
  ];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — full image */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="relative h-72 w-full overflow-hidden rounded-[24px] sm:h-80 lg:h-[420px]">
            <Image src="/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" alt="HalaPark technology" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">AI-Powered Platform</span>
              </span>
            </div>
          </motion.div>

          {/* RIGHT — heading + 4 feature cards */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Technology & Innovation
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Powered by Intelligent Mobility Technology
            </p>
            <p className="text-[0.93rem] leading-7 text-slate-500">
              HalaPark combines AI-driven automation, real-time data intelligence, cloud-based infrastructure, and digital mobility platforms to create scalable parking environments built for modern cities.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {techPoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: i * 0.07 }} className="rounded-[16px] border border-[#E7EAF0] bg-[#F4F8FF] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white shadow-sm">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <p className="mt-3 text-[0.88rem] font-semibold leading-snug text-[#050A13]">{p.label}</p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-slate-500">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-6 text-[0.86rem] leading-6 text-slate-400">
              Through continuous innovation, HalaPark is building the technological foundation for smarter urban movement and future-ready transportation environments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Why HalaPark ─────────────────────────────────────────────────────────────

const whyItems = [
  { icon: Zap, title: "Smart & Seamless Experience", description: "Easily find, access, book, and manage parking through a user-friendly digital platform designed for speed, simplicity, and convenience." },
  { icon: CreditCard, title: "Cashless Secure Payments", description: "A fully digital payment environment that is fast, reliable, secure, and designed for frictionless modern transactions." },
  { icon: Shield, title: "Automated Smart Access", description: "Advanced entry and exit systems powered by AI cameras, smart barriers, and intelligent automation for effortless access control." },
  { icon: BarChart3, title: "Maximize Parking Value", description: "Optimize parking utilization, improve operational efficiency, and unlock additional revenue opportunities from underutilized parking assets." },
  { icon: Cpu, title: "AI-Driven Parking Intelligence", description: "Leverage AI-powered systems for intelligent space allocation, automated operations, predictive insights, and live monitoring." },
  { icon: Leaf, title: "Future-Ready Mobility Infrastructure", description: "Built for the evolving future of smart cities, HalaPark continuously innovates through advanced technologies and EV-ready infrastructure." },
];

function WhyHalaPark() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Why HalaPark
            </h2>
            <p className="mb-7 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              More Than Parking. A Smart Mobility Ecosystem.
            </p>
            <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
              <Image src="/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" alt="HalaPark experience" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
          </motion.div>

          <div className="divide-y divide-[#E7EAF0]">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, ease, delay: i * 0.05 }} className="flex gap-5 py-5 first:pt-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-[#050A13]">{item.title}</p>
                    <p className="mt-1.5 text-[0.84rem] leading-6 text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Core Values ──────────────────────────────────────────────────────────────

const coreValues = [
  { icon: TrendingUp, label: "Innovation First",                desc: "We lead with bold ideas and continuously push boundaries." },
  { icon: Users,      label: "Customer-Centered Experiences",  desc: "Every decision starts and ends with the people we serve." },
  { icon: Target,     label: "Operational Excellence",         desc: "We deliver with precision, consistency, and reliability." },
  { icon: Leaf,       label: "Smart & Sustainable Growth",     desc: "Growth that is responsible, scalable, and future-focused." },
  { icon: Shield,     label: "Transparency & Trust",           desc: "Open, honest, and dependable in everything we do." },
  { icon: Eye,        label: "Future-Focused Thinking",        desc: "We build for today while engineering for tomorrow." },
];

function CoreValues() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* LEFT — photo */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="relative h-72 w-full overflow-hidden rounded-[24px] sm:h-[420px]">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="HalaPark values" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/50">Our Core Values</p>
              <p className="mt-1 text-[1.1rem] font-semibold leading-snug text-white">The foundation of everything we build and deliver.</p>
            </div>
          </motion.div>

          {/* RIGHT — values list */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Our Core Values
            </h2>
            <p className="mb-8 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              The foundation of everything we build and deliver.
            </p>
            <div className="divide-y divide-[#E7EAF0]">
              {coreValues.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex gap-4 py-4 first:pt-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </div>
                    <div>
                      <p className="text-[0.95rem] font-semibold text-[#050A13]">{item.label}</p>
                      <p className="mt-1 text-[0.83rem] leading-5 text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Who We Serve ─────────────────────────────────────────────────────────────

const serveItems = [
  { icon: Building2, label: "Residential Communities" },
  { icon: Building2, label: "Commercial Towers" },
  { icon: Building2, label: "Retail & Shopping Destinations" },
  { icon: Building2, label: "Hospitality & Hotels" },
  { icon: Building2, label: "Healthcare Facilities" },
  { icon: Building2, label: "Government & Public Infrastructure" },
  { icon: Network,   label: "Smart City Projects" },
  { icon: Building2, label: "Mixed-Use Developments" },
  { icon: Car,       label: "Airports & Transportation Hubs" },
  { icon: Building2, label: "Corporate & Enterprise Facilities" },
];

function WhoWeServe() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-[clamp(2.2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Who We Serve
            </h2>
            <p className="mb-7 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Intelligent Mobility Solutions for Every Environment
            </p>
            <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
              <Image src="/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" alt="Properties we serve" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {serveItems.map((item, i) => (
              <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease, delay: i * 0.04 }} className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF6FF]">
                  <item.icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="text-[0.83rem] font-medium leading-snug text-[#050A13]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sustainability & Smart Cities ────────────────────────────────────────────

const sustainabilityPoints = [
  { icon: Car,    title: "Reduced Congestion",        desc: "Intelligent parking guidance minimises unnecessary vehicle movement and traffic build-up around facilities." },
  { icon: Leaf,   title: "Lower Fuel Consumption",    desc: "Drivers spend less time circling for parking, directly cutting fuel use and vehicle emissions." },
  { icon: Zap,    title: "EV-Ready Ecosystems",       desc: "Built-in EV charging integration supports the transition to electric mobility and sustainable transportation." },
  { icon: Cpu,    title: "Data-Driven Efficiency",    desc: "AI-powered operations eliminate waste, optimise space utilisation, and reduce the environmental footprint of parking." },
];

function SustainabilitySmartCities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Full-width heading at top */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12 max-w-[640px]">
          <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Sustainability & Smart Cities
          </h2>
          <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Supporting Smarter & More Sustainable Urban Living
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            {sustainabilityPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="rounded-[18px] border border-[#E7EAF0] bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.9rem] font-semibold leading-snug text-[#050A13]">{p.title}</p>
                  <p className="mt-2 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="lg:pt-2">
            <div className="relative h-52 w-full overflow-hidden rounded-[18px] sm:h-60">
              <Image src="/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png" alt="Sustainable smart city" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="mt-6 space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark helps reduce congestion, unnecessary vehicle movement, fuel consumption, and operational inefficiencies through intelligent parking technologies and optimized mobility systems.</p>
              <p>By supporting digital infrastructure, EV-ready ecosystems, automation, and data-driven operations, HalaPark contributes to smarter, cleaner, and more sustainable urban environments.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust, Security & Reliability ───────────────────────────────────────────

const trustPoints = [
  { icon: Shield,   title: "Secure Digital Infrastructure", desc: "End-to-end secure access management and encrypted data handling across every system touchpoint." },
  { icon: BarChart3, title: "Real-Time Monitoring",         desc: "Live operational dashboards and intelligent alerts ensure continuous visibility across all facilities." },
  { icon: Zap,      title: "High-Demand Performance",       desc: "Scalable architecture built to handle peak traffic, large-scale deployments, and enterprise-grade operations." },
  { icon: CreditCard, title: "Data Protection",             desc: "Robust data governance and privacy practices that businesses and communities can trust." },
];

function TrustSecurityReliability() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Trust, Security & Reliability
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Built for Enterprise-Grade Operations
            </p>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark prioritizes operational reliability, secure digital infrastructure, data protection, and scalable system performance across every mobility environment.</p>
              <p>Our intelligent systems are designed to support high-demand operations with secure access management, real-time monitoring, and seamless digital experiences that businesses and communities can trust.</p>
            </div>
          </motion.div>

          <div className="space-y-3">
            {trustPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="flex gap-4 rounded-[16px] bg-white px-5 py-5 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-[#050A13]">{p.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Our Impact ───────────────────────────────────────────────────────────────

const impactItems = [
  { icon: Building2, label: "Residential Communities"          },
  { icon: Building2, label: "Commercial Towers"                },
  { icon: Building2, label: "Shopping Destinations"            },
  { icon: Network,   label: "Public Infrastructure"            },
  { icon: Network,   label: "Smart Cities"                     },
  { icon: Building2, label: "Mixed-Use Developments"           },
  { icon: Building2, label: "Hospitality & Entertainment Venues"},
  { icon: Globe,     label: "Government & Institutional Projects"},
];

function OurImpact() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pull-quote style top heading */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12">
          <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Our Impact
          </h2>
          <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Driving Smarter Urban Experiences
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {impactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex flex-col items-center gap-2.5 rounded-[14px] border border-[#E7EAF0] bg-white p-5 text-center shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="text-[0.8rem] font-medium leading-snug text-[#050A13]">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col gap-5">
            <div className="relative h-48 w-full overflow-hidden rounded-[18px] sm:h-56">
              <Image src="/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" alt="Urban mobility impact" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark is helping reshape how people interact with parking and mobility infrastructure across modern developments and urban environments.</p>
              <p className="font-medium text-[#0088FF]">
                By connecting people, properties, businesses, and mobility systems through intelligent technology, HalaPark creates experiences that are more efficient, sustainable, scalable, and future-focused.
              </p>
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400 pt-1">Our Technology-Driven Platform Supports</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Future of Mobility ───────────────────────────────────────────────────────

function FutureOfMobility() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[28px] bg-[#06111f] px-8 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,136,255,0.12),transparent_70%)] blur-2xl" />

          <div className="relative z-10 mx-auto max-w-[780px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">The Future of Mobility</span>
            </div>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              The Future of Mobility{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">is Intelligent</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[0.88rem] leading-7 text-white/55 sm:text-[0.94rem]">
              Parking is no longer just about spaces. It is becoming part of a larger intelligent mobility environment powered by AI, automation, digital infrastructure, and advanced urban systems.
            </p>
            <p className="mx-auto mt-4 max-w-[580px] text-[0.88rem] leading-7 text-white/55 sm:text-[0.94rem]">
              HalaPark is building technology that enables cities, businesses, and communities to move toward a smarter and more efficient future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── The HalaPark Experience ──────────────────────────────────────────────────

function HalaParkExperience() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              The HalaPark Experience
            </h2>
            <p className="mb-6 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Parking Designed Around People
            </p>
            <div className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>At HalaPark, parking becomes more than a destination. It becomes part of a smarter journey.</p>
              <p>From intelligent entry systems and automated recognition technology to seamless digital payments and real-time operational control, every interaction is carefully designed to create a premium mobility experience that feels modern, effortless, and intuitive.</p>
              <p>Whether entering a residential community, visiting a commercial destination, managing parking operations, or navigating a busy urban district — HalaPark makes every experience smoother, smarter, and stress-free.</p>
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: 0.2 }}
              className="mt-8 rounded-[18px] bg-[#F4F8FF] px-6 py-5"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0088FF]">Our Goal is Simple</p>
              <p className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13]">
                To make movement within cities smarter, faster, and more human.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#06111f]"
          >
            <div className="absolute inset-0">
              <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-30" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/95 via-[#06111f]/70 to-[#06111f]/40" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-8 sm:p-10">
              {[
                { step: "01", label: "Intelligent Entry",       desc: "AI-powered recognition — no tickets, no friction." },
                { step: "02", label: "Seamless Payments",       desc: "Digital, cashless, and instant at every touchpoint." },
                { step: "03", label: "Real-Time Control",       desc: "Live dashboards and monitoring for operators." },
                { step: "04", label: "Premium Experience",      desc: "Modern, effortless, and human-centered by design." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-4 border-b border-white/8 pb-5 last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 text-[0.72rem] font-bold tabular-nums text-white/30">{item.step}</span>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-[0.8rem] leading-5 text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Partnerships ─────────────────────────────────────────────────────────────

const partnershipOps = [
  "Smart City Infrastructure", "Mobility Technology Integration",
  "AI & Automation Systems", "Digital Mobility Platforms",
  "Parking Asset Optimization", "EV & Sustainable Mobility Solutions",
  "Public & Private Sector Collaborations", "Future Urban Development Projects",
];

function PartnershipsInvestment() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — image on top, text below */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="flex flex-col">
            <div className="relative h-56 w-full overflow-hidden rounded-[20px] sm:h-64">
              <Image src="/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png" alt="Partnership network" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-[#050A13]/20" />
            </div>
            <div className="mt-6 flex flex-1 flex-col justify-center space-y-4 text-[0.93rem] leading-7 text-slate-500">
              <p>HalaPark believes the future of mobility is built through collaboration.</p>
              <p>We actively partner with developers, technology providers, operators, government entities, real estate groups, and forward-thinking organizations to accelerate the transformation of parking and mobility infrastructure across the region.</p>
              <p>Through strategic partnerships, HalaPark creates scalable frameworks that combine intelligent technology, operational excellence, and long-term infrastructure growth.</p>
            </div>
          </motion.div>

          {/* RIGHT — heading + checklist */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col justify-center">
            <h2 className="mb-3 text-[clamp(2.1rem,3.2vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13]">
              Our Partnerships
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Collaborating to Build Smarter Mobility Networks
            </p>
            <p className="mb-5 mt-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400">Collaboration Opportunities Include</p>
            <div className="grid grid-cols-2 gap-2">
              {partnershipOps.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, ease, delay: i * 0.04 }} className="flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-3 shadow-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.79rem] font-medium leading-tight text-[#050A13]">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-[0.86rem] font-medium leading-6 text-[#0088FF]">
              Together with our partners, HalaPark is building smarter, more efficient, and more sustainable mobility experiences for the future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Investment Opportunities ─────────────────────────────────────────────────

const investmentAreas = [
  "Expansion of Smart Mobility Infrastructure",
  "AI-Powered Mobility Technologies",
  "Urban Mobility Innovation & Future Transportation",
  "Sustainable & EV-Ready Infrastructure",
  "Regional Growth & Market Expansion",
  "Infrastructure Modernization & Digital Transformation",
  "Future-Ready Parking Operations",
  "Strategic Technology Innovation & Product Development",
];

function InvestmentOpportunities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial: label above, then wide 2-col layout */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mb-12">
          <h2 className="mb-3 max-w-[640px] text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
            Investment Opportunities
          </h2>
          <p className="max-w-[640px] text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Investing in the Future of Smart Mobility
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="space-y-4 text-[0.93rem] leading-7 text-slate-500">
            <p>As cities evolve toward smarter and more advanced infrastructure, the demand for intelligent mobility technology continues to grow rapidly.</p>
            <p>HalaPark operates at the intersection of smart cities, digital infrastructure, AI-driven operations, and future transportation systems. We welcome strategic investors and visionary stakeholders who share our ambition to redefine urban mobility through scalable technology and intelligent parking innovation.</p>
            <p className="font-medium text-[#0088FF]">
              By investing in HalaPark, stakeholders become part of the next generation of intelligent urban infrastructure shaping how future cities move, operate, and grow.
            </p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-400">Investment Focus Areas Include</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {investmentAreas.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.04 }} className="flex items-center gap-3 rounded-[12px] border border-[#E7EAF0] bg-[#F4F8FF] px-4 py-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.85rem] font-medium text-[#050A13]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Powering Future Cities ───────────────────────────────────────────────────

function PoweringFutureCities() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-[820px]"
        >
          {/* Wide photo banner */}
          <div className="relative mb-10 h-56 w-full overflow-hidden rounded-[22px] sm:h-72">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="Future cities" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050A13]/50 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/60">HalaPark</p>
              <p className="mt-1 text-[1.1rem] font-semibold leading-tight text-white">Powering Future Cities</p>
            </div>
          </div>
          <h2 className="mb-3 text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.06em] text-[#050A13]">
            Powering Future Cities
          </h2>
          <p className="mb-8 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
            Powering the Movement of Future Cities
          </p>
          <div className="space-y-4 text-[0.95rem] leading-7 text-slate-500">
            <p>Cities are evolving faster than ever: becoming smarter, more advanced, and driven by digital experiences. HalaPark powers that transformation through intelligent parking and seamless mobility innovation.</p>
            <p>By combining AI, automation, and real-time technology, HalaPark transforms everyday parking into an integrated mobility environment designed for smarter cities and frictionless urban experiences.</p>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
            className="mt-10 border-t border-[#E7EAF0] pt-8 text-[1.15rem] font-semibold leading-[1.5] tracking-[-0.02em] text-[#050A13] sm:text-[1.25rem]"
          >
            Because the future of mobility is not just about movement:{" "}
            <span className="text-[#0088FF]">
              it&apos;s about creating smarter journeys for everyone.
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">

          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-20" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-br from-[#06111f] via-[#06111f]/95 to-[#0a1a2e]/90" />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-16 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.10),transparent_65%)] blur-2xl" />

          <div className="relative z-10 grid items-center gap-10 px-8 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-16 lg:py-20">

            <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">Build With Us</span>
              </div>
              <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
                Build the Future of{" "}
                <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                  Mobility With Us
                </span>
              </h2>
              <p className="mt-4 text-[clamp(1.15rem,1.8vw,1.4rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white/70">
                The Future of Urban Mobility Starts Here
              </p>
              <div className="mt-5 space-y-3 text-[0.88rem] leading-6 text-white/45 sm:text-[0.94rem]">
                <p>HalaPark continues to collaborate with developers, businesses, property owners, operators, technology partners, and investors to create the next generation of intelligent parking experiences.</p>
                <p>Together, we are building smarter mobility ecosystems powered by innovation, automation, intelligent technology, and future-focused infrastructure.</p>
                <p>HalaPark is shaping a future where mobility becomes seamless, cities become smarter, and parking becomes an invisible part of everyday life.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110">
                  Partner With HalaPark <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15">
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Speak With Our Experts
                </Link>
              </div>
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="w-full lg:w-[300px]">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/35">HalaPark at a Glance</p>
                <div className="space-y-4">
                  {[
                    { value: "8+",   label: "Years of Experience"     },
                    { value: "120+", label: "Locations"               },
                    { value: "40+",  label: "Enterprise Clients"      },
                    { value: "1M+",  label: "Monthly Transactions"    },
                  ].map((s, i) => (
                    <motion.div key={s.label} initial={reduced ? false : { opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.07 }} className="flex items-center justify-between border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <span className="text-[0.82rem] text-white/45">{s.label}</span>
                      <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-white">{s.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 rounded-[14px] bg-[#0088FF]/15 px-4 py-3 text-center">
                  <p className="text-[0.78rem] font-semibold text-[#5BC4FF]">Shaping the future of</p>
                  <p className="text-[0.78rem] font-semibold text-[#5BC4FF]">intelligent urban mobility</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── App Download CTA ─────────────────────────────────────────────────────────

function AppDownloadCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="mb-3 text-[clamp(2.4rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[#050A13]">
              Get the App
            </h2>
            <p className="mb-5 text-[clamp(1rem,1.5vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-slate-500">
              Next-Gen Parking at Your Fingertips
            </p>
            <p className="max-w-[480px] text-[0.93rem] leading-7 text-slate-500">
              Find, book, and manage parking easily from your phone. Get real-time availability, instant access, and a smooth, hassle-free experience anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-[14px] bg-[#050A13] px-5 py-3 transition hover:opacity-85">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div>
                  <p className="text-[10px] font-medium leading-none text-white/60">Download on the</p>
                  <p className="mt-0.5 text-[0.88rem] font-semibold leading-none text-white">App Store</p>
                </div>
              </Link>
              <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-[14px] bg-[#050A13] px-5 py-3 transition hover:opacity-85">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden><path d="M3.18 23.76c.3.17.64.24.99.2l13.12-7.57-2.83-2.83-11.28 10.2zM.42 1.6C.16 1.9 0 2.33 0 2.89v18.22c0 .56.16.99.43 1.28l.07.07 10.21-10.21v-.24L.49 1.53.42 1.6zM20.13 9.53l-2.81-1.62-3.17 3.17 3.17 3.18 2.84-1.64c.81-.47.81-1.23-.03-1.7zM3.18.24L16.3 7.81l-2.83 2.83L2.19.44c.35-.04.7.03.99.2v-.4z"/></svg>
                <div>
                  <p className="text-[10px] font-medium leading-none text-white/60">Get it on</p>
                  <p className="mt-0.5 text-[0.88rem] font-semibold leading-none text-white">Google Play</p>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex flex-col gap-4">
            {/* App mockup photo */}
            <div className="relative h-48 w-full overflow-hidden rounded-[20px] sm:h-56">
              <Image src="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" alt="HalaPark mobile app" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/30 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap,        label: "Instant Access",       desc: "Enter and exit in seconds with automated recognition." },
              { icon: BarChart3,  label: "Real-Time Availability",desc: "See live space availability before you arrive."          },
              { icon: CreditCard, label: "Seamless Payments",    desc: "Cashless, fast, and fully digital transactions."         },
              { icon: Shield,     label: "Hassle-Free",          desc: "A smooth, stress-free experience every single time."     },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.07 }} className="rounded-[18px] border border-[#E7EAF0] bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.88rem] font-semibold text-[#050A13]">{item.label}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-5 text-slate-500">{item.desc}</p>
                </motion.div>
              );
            })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Page Export ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutIntro />
      <OurMission />
      <OurVision />
      <OurStory />
      <WhatWeDo />
      <TechnologyInnovation />
      <PartnershipsInvestment />
      <InvestmentOpportunities />
      <WhyHalaPark />
      <WhoWeServe />
      <SustainabilitySmartCities />
      <TrustSecurityReliability />
      <OurImpact />
      <FutureOfMobility />
      <HalaParkExperience />
      <CoreValues />
      <PoweringFutureCities />
      <FinalCTA />
      <AppDownloadCTA />
    </main>
  );
}
