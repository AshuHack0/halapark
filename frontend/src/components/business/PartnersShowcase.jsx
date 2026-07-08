"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1];

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

function MarqueeRow({ partners, reverse = false, language }) {
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
            className="flex w-[200px] shrink-0 items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-4 py-3.5 shadow-sm hover:shadow-md transition"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white"
              style={{ background: p.color }}
            >
              {p.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.82rem] font-semibold text-[#050A13]">{t(p, "name", language)}</p>
              <p className="text-[0.72rem] text-slate-400">{t(p, "industry", language)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersShowcase() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [showcase, setShowcase] = useState({});

  useEffect(() => {
    fetchBusinessSection("partnersShowcase").then((section) => {
      if (section) {
        setShowcase(section);
      }
    });
  }, []);

  // The CTA block is a nested object; the admin stores its Arabic in the block's
  // own `ar` (ctaSection.ar.{title,description}), so read it straight through.
  const ctaSection = showcase.ctaSection || {};

  // Admin "Show this section on the website" toggle.
  if (showcase?.enabled === false) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Content: Image Left + Content Right */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16"
        >
          {/* Left: Image */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="relative h-80 sm:h-96 lg:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,136,255,0.15)] border border-[#E7EAF0]"
          >
            <Image
              src={showcase.image || "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png"}
              alt="Trusted Partners"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-[#050A13]/20 to-transparent"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-4">
              {t(showcase, "heading", language)}{" "}
              <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                {t(showcase, "headingGradient", language)}
              </span>
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#050A13] mb-6">
              {t(showcase, "subheading", language)}
            </h3>

            <p className="text-base leading-7 text-slate-600 mb-8">
              {t(showcase, "description", language)}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {(showcase.stats || []).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.1 }}
                  className="rounded-[20px] border border-[#E7EAF0] bg-gradient-to-br from-[#F8FAFC] to-white p-4 text-center"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-[#050A13]">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">{t(stat, "label", language)}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0088FF]/30 transition"
            >
              {t(showcase, "ctaLabel", language)}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Partner Logo Carousel */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
          className="mt-20 pt-16 border-t border-[#E7EAF0]"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
            className="mb-12"
          >
            <h3
              dir={language === "ar" ? "rtl" : "ltr"}
              className="text-2xl sm:text-3xl font-bold text-[#050A13] text-center mb-2 [overflow-wrap:anywhere]"
            >
              {t(showcase, "carouselHeading", language) || (language === "ar" ? "" : "Trusted by Industry Leaders")}
            </h3>
            <p
              dir={language === "ar" ? "rtl" : "ltr"}
              className="text-center text-slate-600 [overflow-wrap:anywhere]"
            >
              {t(showcase, "carouselSubheading", language) || (language === "ar" ? "" : "Work with some of the most recognized brands and organizations")}
            </p>
          </motion.div>

          {/* Marquee rows */}
          {!reduced ? (
            <div className="space-y-4 overflow-hidden">
              <MarqueeRow partners={showcase.partners?.row1?.length ? showcase.partners.row1 : PARTNERS_ROW1} language={language} />
              <MarqueeRow partners={showcase.partners?.row2?.length ? showcase.partners.row2 : PARTNERS_ROW2} reverse language={language} />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[...(showcase.partners?.row1?.length ? showcase.partners.row1 : PARTNERS_ROW1), ...(showcase.partners?.row2?.length ? showcase.partners.row2 : PARTNERS_ROW2)].map((p) => (
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
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.4 }}
          className="relative mt-20 overflow-hidden rounded-[28px] bg-[#06111f]"
        >
          <div className="absolute inset-0">
            <Image src={showcase.ctaSection?.image || "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png"} alt="" fill className="object-cover object-center opacity-25" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/75 to-[#06111f]/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
            <h3 className="max-w-[580px] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              {t(ctaSection, "title", language)}{" "}
            </h3>
            <p className="mx-auto mt-3 max-w-[500px] text-[0.88rem] leading-6 text-white/60 sm:text-[0.94rem]">
              {t(ctaSection, "description", language)}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
            >
              <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">
                {t(showcase, "ctaSectionLabel", language) || (language === "ar" ? "" : "Get in Touch")}
              </span>{" "}
              <ArrowRight className="h-4 w-4" aria-hidden />
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
