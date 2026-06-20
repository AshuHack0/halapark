"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1];

export default function BusinessCTA() {
  const reduced = useReducedMotion();
  const [cta, setCta] = useState({
    heading: "Start a Smart Parking Business with",
    headingAccent: "No Upfront Investment",
    description: "Partner with HalaPark to launch intelligent parking solutions powered by automation, AI, and seamless digital operations.",
    ctaLabel: "Book a Free Consultation",
    ctaLink: "/contact",
  });

  useEffect(() => {
    fetchBusinessContent().then((content) => {
      if (content?.cta && typeof content.cta === "object") {
        setCta((prev) => ({ ...prev, ...Object.fromEntries(Object.entries(content.cta).filter(([, v]) => v !== "" && v != null)) }));
      }
    });
  }, []);

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#06111f]">
          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-40" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06111f]/60 via-[#06111f]/40 to-[#06111f]/80" />
          </div>

          {/* Glowing network SVG overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <defs>
              <radialGradient id="businessNodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0088FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[
              [120,80,400,200],[280,300,400,200],[600,120,400,200],[680,300,400,200],
              [50,200,400,200],[750,200,400,200],[200,50,400,200],[580,350,400,200],
            ].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0088FF" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 6" />
            ))}
            {[[120,80],[280,300],[600,120],[680,300],[50,200],[750,200],[200,50],[580,350]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#0088FF" fillOpacity="0.7" />
            ))}
            <circle cx="400" cy="200" r="60" fill="url(#businessNodeGlow)" />
            <circle cx="400" cy="200" r="6" fill="#0088FF" />
          </svg>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="relative z-10 flex flex-col items-start gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10"
          >
            <div className="max-w-[580px]">
              <h2 className="text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[1.6rem] [overflow-wrap:anywhere]">
                {cta.heading}
                {cta.headingAccent ? (
                  <>
                    {" "}
                    <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                      {cta.headingAccent}
                    </span>
                  </>
                ) : null}
              </h2>
              <p className="mt-1.5 text-[0.82rem] leading-5 text-white/60 sm:text-[0.88rem] [overflow-wrap:anywhere]">
                {cta.description}
              </p>
            </div>
            <Link
              href={cta.ctaLink}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,136,255,0.4)] transition hover:brightness-110"
            >
              {cta.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
