"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function BusinessCTA() {
  const reduced = useReducedMotion();

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
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24"
          >
            <h2 className="max-w-[720px] text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-white">
              Start a Smart Parking Business with{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                No Upfront Investment
              </span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[0.88rem] leading-6 text-white/65 sm:text-[0.94rem]">
              Partner with HalaPark to launch intelligent parking solutions powered by automation, AI technology, and seamless digital operations.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20">
                Book a Free Consultation <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
