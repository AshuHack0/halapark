"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Handshake, Trophy } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const stats = [
  { icon: Building2, value: "120+", label: "Building Partners" },
  { icon: Handshake, value: "40+",  label: "Business Partners" },
  { icon: Trophy,    value: "500+", label: "Success Stories"   },
];

const PARTNERS_ROW1 = [
  { name: "Emirates NBD",     initials: "EN", color: "#0088FF", industry: "Banking"         },
  { name: "Emaar Properties", initials: "EP", color: "#6366F1", industry: "Real Estate"     },
  { name: "Dubai Mall",       initials: "DM", color: "#F59E0B", industry: "Retail"          },
  { name: "DEWA",             initials: "DW", color: "#16B364", industry: "Utilities"       },
  { name: "Jumeirah Group",   initials: "JG", color: "#EC4899", industry: "Hospitality"     },
  { name: "Aldar Properties", initials: "AP", color: "#0EA5E9", industry: "Real Estate"     },
  { name: "Majid Al Futtaim", initials: "MF", color: "#8B5CF6", industry: "Lifestyle"       },
  { name: "Abu Dhabi COOP",   initials: "AC", color: "#14B8A6", industry: "Cooperative"     },
];

const PARTNERS_ROW2 = [
  { name: "Rotana Hotels",      initials: "RH", color: "#F97316", industry: "Hospitality"     },
  { name: "Du Telecom",         initials: "DT", color: "#6366F1", industry: "Telecom"         },
  { name: "LuLu Hypermarket",   initials: "LH", color: "#16B364", industry: "Retail"          },
  { name: "Azizi Developments", initials: "AD", color: "#0088FF", industry: "Development"     },
  { name: "Meraas",             initials: "ME", color: "#EC4899", industry: "Urban Lifestyle" },
  { name: "Nakheel",            initials: "NA", color: "#F59E0B", industry: "Real Estate"     },
  { name: "Sobha Realty",       initials: "SR", color: "#8B5CF6", industry: "Real Estate"     },
  { name: "Damac Properties",   initials: "DP", color: "#0EA5E9", industry: "Development"     },
];

function MarqueeRow({ partners, reverse = false }) {
  const doubled = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="flex w-[200px] shrink-0 items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white"
              style={{ background: p.color }}
            >
              {p.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.82rem] font-semibold text-[#050A13]">{p.name}</p>
              <p className="text-[0.72rem] text-slate-400">{p.industry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersShowcase() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[780px] text-center"
        >
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Trusted by Leading{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13]">
            Showcasing our building partners, business partners, and parking success stories.
          </p>
          <p className="mx-auto mt-4 max-w-[580px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            Navigate through HalaPark parking facilities, partner properties, commercial destinations, residential communities, and intelligent mobility spaces designed for convenience, efficiency, and seamless parking experiences.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease }}
          className="mb-12 grid grid-cols-3 gap-4 sm:gap-6"
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 rounded-[20px] border border-[#E7EAF0] bg-white p-6 text-center shadow-[0_4px_24px_rgba(6,6,22,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#EEF6FF]">
                  <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                </div>
                <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-[#050A13] sm:text-[2.4rem]">{s.value}</p>
                <p className="text-[0.78rem] font-medium text-slate-400">{s.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Marquee rows */}
        {!reduced ? (
          <div className="space-y-4 overflow-hidden">
            <MarqueeRow partners={PARTNERS_ROW1} />
            <MarqueeRow partners={PARTNERS_ROW2} reverse />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...PARTNERS_ROW1, ...PARTNERS_ROW2].map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white" style={{ background: p.color }}>
                  {p.initials}
                </span>
                <div>
                  <p className="text-[0.82rem] font-semibold text-[#050A13]">{p.name}</p>
                  <p className="text-[0.72rem] text-slate-400">{p.industry}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
          className="relative mt-12 overflow-hidden rounded-[28px] bg-[#06111f]"
        >
          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-25" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/75 to-[#06111f]/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
            <h3 className="max-w-[580px] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              Explore All HalaPark{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                Destinations
              </span>
            </h3>
            <p className="mx-auto mt-3 max-w-[500px] text-[0.88rem] leading-6 text-white/60 sm:text-[0.94rem]">
              Browse our full network of parking locations, partner properties, and smart mobility spaces across the UAE.
            </p>
            <Link
              href="/destinations"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
            >
              Explore HalaPark Destinations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee         { animation: marquee 30s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 30s linear infinite; }
      `}</style>
    </section>
  );
}
