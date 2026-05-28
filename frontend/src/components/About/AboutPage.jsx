"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Check, Zap, CreditCard, Shield, BarChart3,
  Cpu, Leaf, Building2, Car, Network, CalendarCheck,
  Target, Eye, BookOpen, Globe, Users, TrendingUp,
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Who We{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Are</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Born in Dubai. Built for the Future.
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
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

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
            <div className="absolute inset-0">
              <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-30" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/90 via-[#06111f]/50 to-transparent" />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-px p-1">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center px-6 py-10 text-center">
                  <p className="text-[2.8rem] font-semibold leading-none tracking-[-0.04em] text-white">{stat.value}</p>
                  <p className="mt-2 text-[0.78rem] font-medium text-white/55">{stat.label}</p>
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
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Creating Smarter Movement for Modern Cities
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>Our mission is to redefine how people experience parking and urban mobility through intelligent technology, seamless automation, and integrated digital platforms.</p>
              <p>HalaPark is committed to building smarter mobility environments that simplify movement, enhance convenience, improve operational performance, and support the evolving needs of modern communities and future-ready cities.</p>
              <p>Through innovation, scalable infrastructure, and human-centered experiences, we are shaping a future where mobility feels effortless, intuitive, and intelligently embedded into everyday life.</p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }} className="flex gap-4 rounded-[20px] border border-[#E7EAF0] bg-white p-5 shadow-[0_4px_24px_rgba(6,6,22,0.05)]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#EEF6FF]">
                    <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-[#050A13]">{p.title}</p>
                    <p className="mt-1 text-[0.83rem] leading-5 text-slate-500">{p.desc}</p>
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

// ─── Vision ───────────────────────────────────────────────────────────────────

function OurVision() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Vision</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              A Future Where Parking Feels Invisible
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
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
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Story</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Built from a Vision to Simplify Urban Movement
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark was founded with one clear mission: to solve one of the most overlooked challenges in modern cities — parking inefficiency.</p>
              <p>As urban environments expanded and mobility demands accelerated, traditional parking systems struggled to evolve. Manual operations, disconnected infrastructure, and payment frustrations created unnecessary friction for both operators and drivers.</p>
              <p className="font-medium text-[#050A13]">We saw an opportunity to reimagine parking through technology.</p>
              <p>What began as a parking platform evolved into an intelligent mobility network designed to simplify vehicle movement, optimize operations, and unlock asset value.</p>
              <p className="font-medium text-[#050A13]">We are not simply managing parking spaces. We are engineering smarter mobility experiences for the next generation of urban environments.</p>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
            <div className="absolute inset-0">
              <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-40" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/80 via-[#06111f]/40 to-transparent" />
            </div>
            <div className="relative z-10 p-8 sm:p-10">
              <p className="mb-6 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/40">HalaPark by the Numbers</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "8+",   label: "Years of Experience" },
                  { value: "120+", label: "Locations" },
                  { value: "40+",  label: "Enterprise Clients" },
                  { value: "1M+",  label: "Monthly Transactions" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-[16px] border border-white/10 bg-white/5 px-5 py-5 text-center backdrop-blur-sm">
                    <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white">{stat.value}</p>
                    <p className="mt-2 text-[0.75rem] font-medium text-white/50">{stat.label}</p>
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
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            What We{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Do</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            Smart Parking Solutions Designed for Modern Cities
          </p>
          <p className="mx-auto mt-4 max-w-[600px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            HalaPark delivers intelligent parking and mobility solutions that seamlessly combine automation, AI technology, operations, infrastructure, and digital experiences into one unified platform.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.map((item, i) => (
            <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.03 }} className="flex items-center gap-3 rounded-[14px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
              </span>
              <span className="text-[0.85rem] font-medium text-[#050A13]">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Technology & Innovation ──────────────────────────────────────────────────

function TechnologyInnovation() {
  const reduced = useReducedMotion();
  const techPoints = [
    { icon: Cpu, label: "AI-Driven Automation" },
    { icon: BarChart3, label: "Real-Time Data Intelligence" },
    { icon: Shield, label: "Cloud-Based Infrastructure" },
    { icon: Zap, label: "Smart Access Systems" },
  ];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Technology &{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Innovation</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Powered by Intelligent Mobility Technology
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark combines AI-driven automation, real-time data intelligence, cloud-based infrastructure, smart access systems, and digital mobility platforms to create scalable parking environments built for modern cities.</p>
              <p>Our technology enables operators, businesses, and property owners to optimize performance, automate operations, improve visibility, and deliver seamless mobility experiences through intelligent infrastructure and advanced systems.</p>
              <p>Through continuous innovation, HalaPark is building the technological foundation for smarter urban movement and future-ready transportation environments.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {techPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.label} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="group rounded-[20px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                    <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.9rem] font-semibold leading-snug text-[#050A13]">{p.label}</p>
                </motion.div>
              );
            })}
          </div>
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
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Why{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">HalaPark</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            More Than Parking. A Smart Mobility Ecosystem.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.07 }} className="group rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_16px_40px_rgba(0,136,255,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                  <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
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
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Values</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            The foundation of everything we build and deliver.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.07 }} className="group flex gap-4 rounded-[20px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                  <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                </div>
                <div>
                  <p className="text-[0.95rem] font-semibold text-[#050A13]">{item.label}</p>
                  <p className="mt-1.5 text-[0.82rem] leading-5 text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }} className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Who We{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            Intelligent Mobility Solutions for Every Environment
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {serveItems.map((item, i) => (
            <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.05 }} className="group flex flex-col items-center gap-3 rounded-[18px] border border-[#E7EAF0] bg-white px-4 py-6 text-center shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                <item.icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
              </span>
              <span className="text-[0.82rem] font-semibold leading-snug text-[#050A13]">{item.label}</span>
            </motion.div>
          ))}
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
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Sustainability &{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Smart Cities</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Supporting Smarter & More Sustainable Urban Living
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark helps reduce congestion, unnecessary vehicle movement, fuel consumption, and operational inefficiencies through intelligent parking technologies and optimized mobility systems.</p>
              <p>By supporting digital infrastructure, EV-ready ecosystems, automation, and data-driven operations, HalaPark contributes to smarter, cleaner, and more sustainable urban environments.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {sustainabilityPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="group rounded-[20px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                    <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.9rem] font-semibold leading-snug text-[#050A13]">{p.title}</p>
                  <p className="mt-2 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div className="grid grid-cols-2 gap-4">
            {trustPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.08 }} className="group rounded-[20px] border border-[#E7EAF0] bg-[#F4F8FF] p-6 shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white transition duration-300 group-hover:bg-[#0088FF]">
                    <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.9rem] font-semibold leading-snug text-[#050A13]">{p.title}</p>
                  <p className="mt-2 text-[0.82rem] leading-5 text-slate-500">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Trust, Security &{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Reliability</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Built for Enterprise-Grade Operations
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark prioritizes operational reliability, secure digital infrastructure, data protection, and scalable system performance across every mobility environment.</p>
              <p>Our intelligent systems are designed to support high-demand operations with secure access management, real-time monitoring, and seamless digital experiences that businesses and communities can trust.</p>
            </div>
          </motion.div>

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
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Driving Smarter Urban Experiences
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark is helping reshape how people interact with parking and mobility infrastructure across modern developments and urban environments.</p>
            </div>
            <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: 0.2 }} className="mt-6 text-[0.88rem] font-medium leading-6 text-[#0088FF]">
              By connecting people, properties, businesses, and mobility systems through intelligent technology, HalaPark creates experiences that are more efficient, sustainable, scalable, and future-focused.
            </motion.p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Our Technology-Driven Platform Supports</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {impactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex items-center gap-3 rounded-[14px] border border-[#E7EAF0] bg-white px-4 py-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                      <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="text-[0.85rem] font-medium text-[#050A13]">{item.label}</span>
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

// ─── Future of Mobility ───────────────────────────────────────────────────────

function FutureOfMobility() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[28px] bg-[#06111f] px-8 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          {/* Subtle grid overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          {/* Glow */}
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
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              The HalaPark{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Parking Designed Around People
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>At HalaPark, parking becomes more than a destination. It becomes part of a smarter journey.</p>
              <p>From intelligent entry systems and automated recognition technology to seamless digital payments and real-time operational control, every interaction is carefully designed to create a premium mobility experience that feels modern, effortless, and intuitive.</p>
              <p>Whether entering a residential community, visiting a commercial destination, managing parking operations, or navigating a busy urban district — HalaPark makes every experience smoother, smarter, and stress-free.</p>
            </div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: 0.2 }}
              className="mt-8 rounded-[20px] border border-[#0088FF]/20 bg-white px-6 py-5"
            >
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Our Goal is Simple</p>
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
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Partnerships</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Collaborating to Build Smarter Mobility Networks
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>HalaPark believes the future of mobility is built through collaboration.</p>
              <p>We actively partner with developers, technology providers, operators, government entities, real estate groups, and forward-thinking organizations to accelerate the transformation of parking and mobility infrastructure across the region.</p>
              <p>Through strategic partnerships, HalaPark creates scalable frameworks that combine intelligent technology, operational excellence, and long-term infrastructure growth.</p>
            </div>
            <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: 0.2 }} className="mt-6 text-[0.88rem] font-medium leading-6 text-[#0088FF]">
              Together with our partners, HalaPark is building smarter, more efficient, and more sustainable mobility experiences for the future.
            </motion.p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Collaboration Opportunities Include</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {partnershipOps.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex items-center gap-3 rounded-[14px] border border-[#E7EAF0] bg-white px-4 py-3.5">
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
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Investment{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="mt-4 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
              Investing in the Future of Smart Mobility
            </p>
            <div className="mt-5 space-y-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              <p>As cities evolve toward smarter and more advanced infrastructure, the demand for intelligent mobility technology continues to grow rapidly.</p>
              <p>HalaPark operates at the intersection of smart cities, digital infrastructure, AI-driven operations, and future transportation systems. We welcome strategic investors and visionary stakeholders who share our ambition to redefine urban mobility through scalable technology and intelligent parking innovation.</p>
            </div>
            <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: 0.2 }} className="mt-6 text-[0.88rem] font-medium leading-6 text-[#0088FF]">
              By investing in HalaPark, stakeholders become part of the next generation of intelligent urban infrastructure shaping how future cities move, operate, and grow.
            </motion.p>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }}>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Investment Focus Areas Include</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {investmentAreas.map((item, i) => (
                <motion.div key={item} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex items-center gap-3 rounded-[14px] border border-[#E7EAF0] bg-[#F4F8FF] px-4 py-3.5">
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
          className="mx-auto max-w-[820px] text-center"
        >
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Powering the Movement of{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Future Cities</span>
          </h2>
          <div className="mx-auto mt-6 max-w-[680px] space-y-4 text-[0.88rem] leading-7 text-slate-500 sm:text-[0.94rem]">
            <p>Cities are evolving faster than ever: becoming smarter, more advanced, and driven by digital experiences. HalaPark powers that transformation through intelligent parking and seamless mobility innovation.</p>
            <p>By combining AI, automation, and real-time technology, HalaPark transforms everyday parking into an integrated mobility environment designed for smarter cities and frictionless urban experiences.</p>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
            className="mx-auto mt-8 max-w-[580px] text-[1rem] font-semibold leading-[1.5] tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]"
          >
            Because the future of mobility is not just about movement:{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              it's about creating smarter journeys for everyone.
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

          {/* Background image + overlay */}
          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-20" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-br from-[#06111f] via-[#06111f]/95 to-[#0a1a2e]/90" />
          </div>

          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

          {/* Blue glow */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),transparent_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -left-16 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.10),transparent_65%)] blur-2xl" />

          <div className="relative z-10 grid items-center gap-10 px-8 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-16 lg:py-20">

            {/* LEFT — text */}
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

            {/* RIGHT — stat panel */}
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

          {/* LEFT */}
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Next-Gen Parking at{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">Your Fingertips</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[0.88rem] leading-7 text-slate-500 sm:text-[0.94rem]">
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

          {/* RIGHT — feature chips */}
          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap,        label: "Instant Access",       desc: "Enter and exit in seconds with automated recognition." },
              { icon: BarChart3,  label: "Real-Time Availability",desc: "See live space availability before you arrive."          },
              { icon: CreditCard, label: "Seamless Payments",    desc: "Cashless, fast, and fully digital transactions."         },
              { icon: Shield,     label: "Hassle-Free",          desc: "A smooth, stress-free experience every single time."     },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.07 }} className="group rounded-[20px] border border-[#E7EAF0] bg-white p-5 shadow-[0_4px_24px_rgba(6,6,22,0.05)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_12px_32px_rgba(0,136,255,0.10)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                    <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                  </div>
                  <p className="mt-4 text-[0.88rem] font-semibold text-[#050A13]">{item.label}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-5 text-slate-500">{item.desc}</p>
                </motion.div>
              );
            })}
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
