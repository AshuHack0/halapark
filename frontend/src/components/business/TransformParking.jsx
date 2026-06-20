"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessSection } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1];

const DEFAULT_PARKING_PARTNER_PERKS = [
  "Smart parking management dashboard",
  "Digital payment integration",
  "Parking categorization & organization",
  "Real-time occupancy monitoring",
  "Traffic & congestion management",
  "Advanced reporting & analytics",
  "Secure automated access systems",
  "Mobile & cloud-based management",
  "Revenue optimization tools",
  "Flexible subscription & booking models",
];

const DEFAULT_SERVICE_PARTNER_PERKS = [
  "Smart parking hardware",
  "AI & automation systems",
  "EV charging infrastructure",
  "Security & surveillance solutions",
  "Facility management services",
  "Mobility & logistics solutions",
  "Software integrations",
  "IoT & smart city technologies",
];

export default function TransformParking() {
  const reduced = useReducedMotion();
  const [transformData, setTransformData] = useState({
    title: "Ready to Transform Your Parking Business?",
    titleAccent: "Parking Business?",
    description: "Partner with HalaPark and unlock the future of intelligent parking management, smart mobility, and connected urban infrastructure.",
    parkingPartnerTitle: "Become a Parking Partner",
    parkingPartnerSubtitle: "Turn your parking assets into profitable smart mobility solutions.",
    parkingPartnerDescription: "HalaPark enables landlords, parking operators, residential buildings, commercial properties, and public entities to digitize and monetize their parking infrastructure through advanced automation and intelligent management tools. Existing parking platforms increasingly focus on ticketless entry, occupancy optimization, AI-powered access control, and cloud-based management systems to improve efficiency and user convenience.",
    parkingPartnerPerks: DEFAULT_PARKING_PARTNER_PERKS,
    servicePartnerTitle: "Become a Service Partner",
    servicePartnerSubtitle: "Join the future of smart mobility and parking innovation.",
    servicePartnerDescription1: "HalaPark collaborates with service providers, technology suppliers, hardware manufacturers, and mobility partners to deliver integrated parking experiences across the UAE and beyond.",
    servicePartnerDescription2: "Whether you specialize in automation, EV charging, security systems, maintenance services, mobility solutions, or smart city technologies, we create opportunities for strategic growth and long-term collaboration.",
    servicePartnerPerks: DEFAULT_SERVICE_PARTNER_PERKS,
  });

  useEffect(() => {
    fetchBusinessSection("transformParking").then((section) => {
      if (section) {
        setTransformData((prev) => ({ ...prev, ...section }));
      }
    });
  }, []);

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-14 max-w-[980px] text-center"
        >
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
            {(() => {
              const accent = transformData.titleAccent?.trim() || "";
              const full = transformData.title || "";
              const base = accent && full.endsWith(accent) ? full.slice(0, full.length - accent.length).trimEnd() : full;
              const showAccent = accent && full.endsWith(accent);
              return (
                <>
                  {base}
                  {showAccent ? (
                    <>
                      {" "}
                      <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                        {accent}
                      </span>
                    </>
                  ) : null}
                </>
              );
            })()}
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            {transformData.description}
          </p>
        </motion.div>

        {/* Two partner cards */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Parking Partner */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease }}
            className="flex flex-col rounded-[28px] border border-[#E7EAF0] bg-white p-8 shadow-[0_4px_24px_rgba(6,6,22,0.06)] sm:p-10"
          >
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#EEF6FF] px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[#0088FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Parking Partner</span>
            </div>
            <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#050A13]">
              {transformData.parkingPartnerTitle}
            </h3>
            <p className="mt-2 text-[0.94rem] font-medium text-[#050A13]">
              {transformData.parkingPartnerSubtitle}
            </p>
            <p className="mt-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
              {transformData.parkingPartnerDescription}
            </p>

            <p className="mt-8 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-[#0088FF]">What You Get</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {transformData.parkingPartnerPerks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.88rem] text-slate-700">{perk}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:brightness-110"
              >
                Start Earning with HalaPark <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>

          {/* Service Partner */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="flex flex-col rounded-[28px] bg-[#06111f] p-8 shadow-[0_4px_24px_rgba(6,6,22,0.12)] sm:p-10"
          >
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[#5BC4FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">Service Partner</span>
            </div>
            <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              {transformData.servicePartnerTitle}
            </h3>
            <p className="mt-2 text-[0.94rem] font-medium text-white/80">
              {transformData.servicePartnerSubtitle}
            </p>
            <p className="mt-4 text-[0.88rem] leading-6 text-white/55 sm:text-[0.94rem]">
              {transformData.servicePartnerDescription1}
            </p>
            <p className="mt-3 text-[0.88rem] leading-6 text-white/55 sm:text-[0.94rem]">
              {transformData.servicePartnerDescription2}
            </p>

            <p className="mt-8 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-[#5BC4FF]">Partnership Opportunities</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {transformData.servicePartnerPerks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5BC4FF]/20 border border-[#5BC4FF]/40">
                    <Check className="h-3 w-3 text-[#5BC4FF]" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.88rem] text-white/70">{perk}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Partner With Us Today <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
