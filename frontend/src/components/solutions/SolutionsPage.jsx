"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Building2,
  CreditCard,
  Zap,
  Shield,
  Car,
  Cctv,
  MonitorDot,
  Tablet,
  MapPin,
  BadgeCheck,
  BarChart3,
  Lock,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function MonitorMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="relative rounded-[18px] border-[10px] border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_32px_80px_rgba(80,40,160,0.22),0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="absolute -top-[7px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#2d2d4e]" />
        <div className="overflow-hidden rounded-[8px] bg-[#f0f4ff]">
          <div className="flex items-center gap-1.5 bg-[#e8ecf8] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-2 flex-1 rounded-full bg-white/80 px-3 py-0.5 text-[9px] text-[#888]">
              app.halapark.ae/dashboard
            </div>
          </div>
          <div className="flex h-[290px] bg-white">
            <div className="flex w-10 flex-col items-center gap-3 border-r border-[#f0f0f0] bg-[#07112a] pt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-2 w-5 rounded-sm ${i === 0 ? "bg-[#0088FF]" : "bg-white/20"}`} />
              ))}
            </div>
            <div className="flex-1 p-3">
              <div className="mb-3 grid grid-cols-4 gap-2">
                {[
                  { label: "Active Bays", val: "3,009", color: "text-[#0088FF]" },
                  { label: "Users", val: "720", color: "text-[#7C3AED]" },
                  { label: "Sessions", val: "149", color: "text-[#059669]" },
                  { label: "Revenue", val: "AED 35k", color: "text-[#D97706]" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-[#f0f0f0] bg-[#fafbff] p-2">
                    <p className={`text-[11px] font-bold ${s.color}`}>{s.val}</p>
                    <p className="mt-0.5 text-[8px] text-[#999]">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[#f0f0f0] bg-[#fafbff] p-2">
                  <p className="mb-2 text-[9px] font-semibold text-[#333]">Vehicle Status</p>
                  <div className="flex items-center gap-2">
                    <div className="relative h-16 w-16 shrink-0">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e8eef8" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#0088FF" strokeWidth="4" strokeDasharray="40 88" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#7C3AED" strokeWidth="4" strokeDasharray="25 88" strokeDashoffset="-40" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#059669" strokeWidth="4" strokeDasharray="23 88" strokeDashoffset="-65" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      {[["Single Entry","#0088FF"],["Multiple","#7C3AED"],["App User","#059669"]].map(([l,c])=>(
                        <div key={l} className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full" style={{background:c}} />
                          <span className="text-[8px] text-[#666]">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-[#f0f0f0] bg-[#fafbff] p-2">
                  <p className="mb-2 text-[9px] font-semibold text-[#333]">Most Repeated Customers</p>
                  <div className="flex h-[60px] items-end gap-[2px]">
                    {[90,75,82,68,55,70,60,50,65,58,45,72,48,62,40,55,38,50,44,36].map((h,i)=>(
                      <div key={i} className="flex-1 rounded-sm bg-[#0088FF]" style={{height:`${h}%`, opacity: 0.7 + i * 0.01}} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-0 h-5 w-16 rounded-b-lg bg-[#1a1a2e]" />
      <div className="mx-auto h-2 w-28 rounded-full bg-[#1a1a2e]/60" />
    </div>
  );
}

function NewHero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#fce8f0]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image src="/business-wave.jpg" alt="" fill className="object-cover object-center" priority />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <h1 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              <span className="bg-gradient-to-r from-[#0088FF] to-[#0078E0] bg-clip-text text-transparent">Intelligent Parking Infrastructure</span>
              <br />
              for Modern Facilities.
            </h1>
            <p className="mt-4 max-w-[500px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              HalaPark delivers an AI-powered smart parking solution for large-scale residential, commercial, and mixed-use developments across the UAE. It enables real-time visibility, automated access, and intelligent parking control to optimize space usage and operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110">
                Request a Demo <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#0088FF] px-8 py-3.5 text-[0.95rem] font-semibold text-[#0088FF] transition hover:-translate-y-0.5 hover:bg-[#0088FF] hover:text-white">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease, delay: 0.12 }} className="relative pb-6">
            <MonitorMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Parking Challenges ────────────────────────────────────────────────────────

function GlobeIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px]" aria-hidden>
      <defs>
        <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="50%" stopColor="#0078E0" />
          <stop offset="100%" stopColor="#1AB2FF" />
        </linearGradient>
        <radialGradient id="shadowGrad" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="#00000022" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <clipPath id="halfClip">
          <rect x="0" y="0" width="480" height="260" />
        </clipPath>
      </defs>
      <g clipPath="url(#halfClip)">
        <circle cx="240" cy="260" r="220" stroke="url(#globeGrad)" strokeWidth="1.5" fill="none" opacity="0.3" />
        <circle cx="240" cy="260" r="180" stroke="url(#globeGrad)" strokeWidth="1" fill="none" opacity="0.15" />
        <path d="M80 180 C75 160, 85 130, 95 110 C105 90, 110 80, 108 65 C115 55, 125 50, 130 60 C138 75, 135 95, 128 115 C145 100, 155 85, 160 70 C165 55, 170 50, 178 55 C185 60, 183 80, 175 100 C168 118, 155 130, 148 150 C140 170, 138 195, 132 215 C125 235, 115 248, 105 252 C95 256, 85 250, 82 235 C78 218, 80 198, 80 180Z" fill="url(#globeGrad)" opacity="0.85" />
        <path d="M210 60 C215 50, 225 45, 235 48 C245 51, 250 58, 248 68 C255 65, 265 63, 270 70 C275 77, 272 87, 265 92 C258 97, 248 95, 240 100 C232 105, 225 110, 218 105 C210 100, 207 88, 210 78 C208 72, 207 66, 210 60Z" fill="url(#globeGrad)" opacity="0.9" />
        <path d="M220 115 C228 108, 240 106, 250 110 C262 115, 268 128, 268 142 C270 158, 265 175, 258 190 C250 205, 240 215, 230 215 C220 215, 212 205, 208 190 C203 175, 204 158, 208 142 C210 128, 213 120, 220 115Z" fill="url(#globeGrad)" opacity="0.9" />
        <path d="M268 105 C275 100, 285 98, 292 103 C300 108, 302 118, 298 128 C293 138, 282 142, 274 138 C265 133, 262 120, 268 105Z" fill="url(#globeGrad)" opacity="0.85" />
        <path d="M290 55 C305 45, 330 42, 355 48 C378 54, 398 65, 408 80 C418 95, 415 115, 405 128 C395 140, 378 145, 360 142 C342 139, 325 130, 312 118 C298 106, 290 92, 288 78 C287 68, 290 60, 290 55Z" fill="url(#globeGrad)" opacity="0.9" />
        <path d="M368 180 C378 172, 395 170, 408 176 C420 182, 425 195, 420 208 C415 220, 402 226, 390 223 C378 220, 368 210, 365 198 C362 188, 365 185, 368 180Z" fill="url(#globeGrad)" opacity="0.8" />
        {[40, 80, 120, 160, 200].map((y, i) => {
          const ry = Math.abs(y - 260);
          const rx = Math.sqrt(Math.max(0, 220 * 220 - ry * ry));
          return rx > 10 ? (
            <ellipse key={i} cx="240" cy={y} rx={rx * 0.95} ry="8" stroke="url(#globeGrad)" strokeWidth="0.6" fill="none" opacity="0.15" />
          ) : null;
        })}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx="240" cy="260" rx={Math.sin((angle * Math.PI) / 180) * 220} ry="220" stroke="url(#globeGrad)" strokeWidth="0.6" fill="none" opacity="0.12" />
        ))}
      </g>
      <ellipse cx="240" cy="265" rx="200" ry="18" fill="url(#shadowGrad)" />
    </svg>
  );
}

function GlobalExpansionSection() {
  const reduced = useReducedMotion();
  const challenges = [
    "Limited real-time parking visibility",
    "Manual vehicle entry and exit processes",
    "Inefficient space utilization",
    "Friction at access and payment points",
  ];
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
            <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Parking Challenges</p>
            <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Solving Parking Inefficiencies{" "}
              <span className="text-[#667085]">Through Smart Mobility.</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              Traditional parking systems are manual, fragmented, and lack real-time visibility causing congestion, operational inefficiencies, and poor user experience. HalaPark transforms parking into a connected ecosystem powered by automation, AI, and real-time control.
            </p>
            <ul className="mt-8 space-y-3">
              {challenges.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-[#F4F8FF] px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 sm:text-[0.94rem]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/app" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:-translate-y-0.5 hover:brightness-110">
              View App Features <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="flex justify-center lg:justify-end">
            <GlobeIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Our Solutions ─────────────────────────────────────────────────────────────

const solutionItems = [
  { icon: MonitorDot, title: "Smart Parking Management", description: "Centralized platform for monitoring occupancy, controlling parking operations, and managing multiple facilities in real time.", image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" },
  { icon: Car, title: "Automated Access Control", description: "ANPR and smart barrier systems enabling seamless and secure vehicle access.", image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" },
  { icon: MapPin, title: "Parking Guidance System", description: "Real-time wayfinding and space guidance to reduce congestion and improve traffic flow inside facilities.", image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" },
  { icon: Tablet, title: "Mobile & Digital Experience", description: "Mobile reservations, digital payments, subscriptions, and contactless parking interactions.", image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" },
  { icon: BadgeCheck, title: "Digital Valet Operations", description: "Structured valet workflows with digital ticketing, vehicle tracking, and retrieval management.", image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" },
  { icon: Zap, title: "EV Charging Integration", description: "Integrated EV charging infrastructure with smart billing and charging management.", image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" },
  { icon: BarChart3, title: "AI & Parking Analytics", description: "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards.", image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" },
];

function StatsSection() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Our Solutions</p>
          <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Intelligent parking systems built for{" "}
            <span className="text-[#667085]">efficiency, control, and scale</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutionItems.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.06 }} className="group overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]">
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/50 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-4 w-4 text-[#0088FF]" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1rem]">{card.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-6 text-slate-600 sm:text-[0.88rem]">{card.description}</p>
                  <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#0088FF] transition hover:gap-2.5">
                    Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Solution Integration ──────────────────────────────────────────────────────

const integrationCards = [
  { title: "All-in-One Barrier Integration", description: "All-in-one compact system with barriers, AI cameras, and lighting for efficient parking.", points: ["Smart barrier control", "AI camera integration", "Automated lighting"], image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png", gradient: "from-[#0078E0]/85 via-[#0088FF]/60 to-[#0088FF]/20" },
  { title: "ANPR & AI Camera Integration", description: "ANPR and AI cameras enable secure, real-time parking detection.", points: ["License plate recognition", "Real-time detection", "Secure access control"], image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png", gradient: "from-[#0050B3]/85 via-[#0066CC]/60 to-[#0088FF]/20" },
  { title: "Software & Kiosk Integration", description: "Unified system with apps, operations, and kiosks for quick payments and access.", points: ["Mobile app & web portal", "Self-service kiosks", "Integrated payments"], image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png", gradient: "from-[#005FA3]/85 via-[#0078C8]/60 to-[#1AB2FF]/20" },
  { title: "End-to-End System Integration", description: "Integrated platform for scalable, automated parking operations.", points: ["IoT sensor management", "Guidance display system", "Full stack automation"], image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png", gradient: "from-[#003F7F]/85 via-[#0060B8]/60 to-[#0088FF]/20" },
];

function SectorSolutionsSection() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Solution Integration</p>
          <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            End-to-End Integrated{" "}
            <span className="text-[#667085]">Parking Solution</span>
          </h2>
          <p className="mt-4 text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
            HalaPark connects hardware, software, and operations into one unified platform — without disrupting your existing setup.
          </p>
        </div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {integrationCards.map((card, i) => (
            <motion.article key={`mob-${card.title}`} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, ease, delay: i * 0.07 }} className="group relative h-[320px] overflow-hidden rounded-[18px] bg-slate-800">
              <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="50vw" />
              <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-4">
                <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-white">{card.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Desktop: staggered flex */}
        <div className="hidden items-start gap-4 lg:flex">
          {integrationCards.map((card, i) => (
            <motion.article key={card.title} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }} className={`group relative flex-1 overflow-hidden rounded-[22px] bg-slate-800 ${i % 2 === 0 ? "h-[520px]" : "mt-12 h-[520px]"}`}>
              <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" />
              <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                <h3 className="text-[1.1rem] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-sm sm:text-[1.25rem] lg:text-[1.4rem]">{card.title}</h3>
                <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.78rem] leading-relaxed text-white/85 sm:text-[0.82rem]">{card.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-[0.75rem] font-medium text-white/90">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Smart Cities + Seamless Integrations ─────────────────────────────────────

const smartCityCapabilities = [
  "Traffic system integration",
  "Municipality dashboards",
  "Mobility data sharing",
  "Scalable infrastructure layer",
];

const integrationSystems = [
  { icon: CreditCard, label: "Payment gateways" },
  { icon: Car, label: "Access control systems (ANPR, RFID, barriers)" },
  { icon: Cctv, label: "CCTV security systems" },
  { icon: Building2, label: "Building Management Systems (BMS)" },
  { icon: Zap, label: "EV charging networks" },
];

function TrustedBySection() {
  const reduced = useReducedMotion();
  return (
    <>
      {/* Built for Smart Cities */}
      <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Built for Smart Cities</p>
              <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
                Beyond Parking,{" "}
                <span className="text-[#667085]">Into Urban Mobility.</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
                HalaPark extends beyond parking into urban mobility infrastructure, supporting large-scale smart city development and city-wide optimization.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {smartCityCapabilities.map((item) => (
                  <motion.li key={item} initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease }} className="flex items-center gap-3 rounded-xl border border-[rgba(0,136,255,0.12)] bg-white px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 shadow-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f] p-8 sm:p-10 lg:p-12">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#0088FF]/15 blur-3xl" />
              <div className="relative z-10 flex h-[260px] items-center justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-[20px] bg-[#0088FF] shadow-[0_0_50px_rgba(0,136,255,0.5)]">
                  <Image src="/Layer_1.svg" alt="HalaPark" width={44} height={56} className="h-12 w-auto" />
                </div>
                {smartCityCapabilities.map((cap, i) => {
                  const pos = ["left-[6%] top-[14%]", "right-[6%] top-[14%]", "left-[6%] bottom-[14%]", "right-[6%] bottom-[14%]"];
                  return (
                    <div key={cap} className={`absolute ${pos[i]} max-w-[130px] rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center text-[10px] font-medium leading-snug text-white/85 backdrop-blur-sm sm:text-[11px]`}>
                      {cap}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seamless Integrations */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Seamless Integrations</p>
            <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Connects with Your{" "}
              <span className="text-[#667085]">Existing Infrastructure</span>
            </h2>
            <p className="mt-4 text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              HalaPark connects with existing infrastructure to create a unified operational ecosystem without disrupting current systems.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrationSystems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div key={sys.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, ease, delay: i * 0.06 }} className="flex items-center gap-4 rounded-[18px] border border-slate-100 bg-[#F4F8FF] px-5 py-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF6FF]">
                    <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.8} aria-hidden />
                  </div>
                  <p className="text-[0.88rem] font-medium text-slate-800 sm:text-[0.94rem]">{sys.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Industries + Deployment Journey ──────────────────────────────────────────

const industryItems = [
  { icon: Zap, label: "Airports" },
  { icon: Building2, label: "Shopping Malls" },
  { icon: BadgeCheck, label: "Hotels" },
  { icon: Cctv, label: "Residential Towers" },
  { icon: Shield, label: "Hospitals" },
  { icon: MapPin, label: "Universities" },
  { icon: Lock, label: "Government Facilities" },
  { icon: TrendingUp, label: "Smart Cities" },
];

const deploymentSteps = [
  { step: "01", title: "Audit Current Setup", description: "Mapping gates, cameras, payment flows, access rules, and workflows." },
  { step: "02", title: "Connect the Stack", description: "Integration with hardware, software, and payment systems while preserving operations." },
  { step: "03", title: "Launch & Optimize", description: "Go live with dashboards, alerts, reporting, and continuous optimization." },
];

function FeatureHighlightsSection() {
  const reduced = useReducedMotion();
  return (
    <>
      {/* Industries */}
      <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Industries</p>
            <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
              Built for High-Demand{" "}
              <span className="text-[#667085]">Environments</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {industryItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.05 }} className="flex flex-col items-center gap-3 rounded-[20px] border border-slate-100 bg-white px-4 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#0088FF]/20 hover:shadow-[0_8px_24px_rgba(0,136,255,0.1)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EEF6FF]">
                    <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.8} aria-hidden />
                  </div>
                  <p className="text-[0.88rem] font-semibold text-[#050A13] sm:text-[0.94rem]">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deployment Journey */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={reduced ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease }}>
              <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">Deployment Journey</p>
              <h2 className="mt-3 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
                Modernize without{" "}
                <span className="text-[#667085]">disrupting your operations</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
                We ensure a smooth rollout by understanding your environment, integrating with existing systems, and improving performance over time without disruption.
              </p>
              <div className="mt-10 space-y-5">
                {deploymentSteps.map((step, i) => (
                  <motion.div key={step.step} initial={reduced ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.1 }} className="flex gap-5 rounded-2xl border border-slate-100 bg-[#F4F8FF] p-5">
                    <span className="text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#0088FF]/30">{step.step}</span>
                    <div>
                      <h3 className="font-semibold text-[#050A13]">{step.title}</h3>
                      <p className="mt-1 text-[0.88rem] leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={reduced ? false : { opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease, delay: 0.1 }} className="relative overflow-hidden rounded-[28px] bg-[#06111f] p-8 sm:p-10">
              <div className="absolute inset-0">
                <Image src="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" alt="" fill className="object-cover object-center" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/40" />
              </div>
              <div className="relative z-10 flex h-[280px] flex-col justify-between sm:h-[320px]">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Why HalaPark</p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
                    Why Leading Developments{" "}
                    <span className="text-[#5BC4FF]">Choose Halapark</span>
                  </h3>
                </div>
                <ul className="space-y-3">
                  {["End-to-end parking automation", "Real-time operational visibility", "Scalable multi-site infrastructure", "Seamless user experience", "Built for UAE smart city standards"].map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[0.88rem] text-white/80">
                      <Check className="h-4 w-4 shrink-0 text-[#5BC4FF]" strokeWidth={2.5} aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function NewFinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          <div className="absolute inset-0">
            <Image src="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" alt="" fill className="object-cover object-center" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/80 to-[#06111f]/50" />
          </div>
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease }} className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <BarChart3 className="h-3.5 w-3.5 text-[#5BC4FF]" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Transform Your Parking</span>
            </div>
            <h2 className="max-w-[680px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              Transform Parking Into a{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0066CC] bg-clip-text text-transparent">
                Fully Connected Mobility Infrastructure
              </span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[0.88rem] leading-6 text-white/65 sm:text-[0.94rem]">
              Halapark replaces fragmented parking systems with one intelligent platform that connects access control, real-time operations, and data-driven intelligence. Built for scale, designed for modern developments, and engineered to upgrade existing infrastructure without disruption.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110">
                Request Demo <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ───────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NewHero />
      <GlobalExpansionSection />
      <StatsSection />
      <SectorSolutionsSection />
      <TrustedBySection />
      <FeatureHighlightsSection />
      <NewFinalCTA />
    </main>
  );
}
