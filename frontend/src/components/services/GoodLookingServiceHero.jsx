"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const HERO_IMAGE =
  "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png";

export default function GoodLookingServiceHero({ onGetQuote }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-title"
      className="bg-white py-4 sm:py-5 lg:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
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
              <h1
                id="services-hero-title"
                className="max-w-[720px] text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-white"
              >
                Smart Parking.{" "}
                <span className="text-[#0088FF]">Vehicle Care</span> Partner.
              </h1>

              <p className="mt-5 max-w-[480px] text-[0.95rem] leading-7 text-white/65">
                Smart parking and vehicle care built for convenience, safety,
                and innovation.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onGetQuote}
                  className="rounded-full bg-[#0088FF] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
                >
                  Get a Quote
                </button>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/30 bg-white/10 px-9 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
