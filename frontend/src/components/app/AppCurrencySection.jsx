"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function AppCurrencySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[rgba(0,136,255,0.14)] bg-[linear-gradient(102deg,#F8FBFF_0%,#EFF6FF_48%,#E6F1FF_100%)] md:grid-cols-2">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="px-8 py-12 sm:px-12 sm:py-16"
        >
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
            className="inline-flex items-center rounded-full border border-[#CFE3FF] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F62C7]"
          >
            Smart Parking Flow
          </motion.p>
          <h2 className="mt-5 max-w-[470px] text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0F172A] sm:text-5xl">
            Book, Pay, and Track Parking in One HalaPark App
          </h2>
          <p className="mt-5 max-w-[460px] text-sm leading-6 text-[#6B7280] sm:text-base sm:leading-7">
            From public and private bays to valet and EV charging, HalaPark gives
            drivers a fast, cashless, and reliable parking experience across the UAE.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0F62C7]"
          >
            Explore App Features
          </button>
        </motion.div>

        <div className="relative min-h-[440px] overflow-hidden md:min-h-[520px]">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24, scale: 0.98 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
            className="absolute right-32 bottom-12 w-[230px] md:right-40 md:bottom-16 md:w-[280px]"
          >
            <motion.div
             
              className="relative isolate aspect-[1439/2920]"
            >
              <div className="absolute left-[4.4%] right-[4.4%] top-[1.2%] bottom-[1.45%] z-10 translate-y-[1px] overflow-hidden rounded-[2.7rem] bg-white">
                <div className="absolute top-0 -bottom-[2.5%] left-0 right-0">
                  <Image
                    src="/Payment.png"
                    alt="HalaPark app screenshot"
                    fill
                    sizes="(min-width: 768px) 280px, 230px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                  src="/mobileframe.png"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 280px, 230px"
                  className="select-none object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
