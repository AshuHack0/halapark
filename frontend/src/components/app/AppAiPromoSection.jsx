"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function AppAiPromoSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-12 pt-3 sm:px-6 lg:px-8">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[32px] bg-[radial-gradient(130%_120%_at_0%_0%,#0F62C7_0%,#0A3F84_38%,#071A3D_65%,#020617_100%)] md:grid-cols-2"
      >
        <div className="ml-auto flex w-full max-w-[560px] flex-col justify-center px-8 py-10 text-white sm:px-10 sm:py-14 md:px-10">
          <h2 className="max-w-[460px] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            Park smarter across the UAE with HalaPark
          </h2>
          <p className="mt-5 max-w-[460px] text-sm leading-7 text-[#C6CDD8] sm:text-base">
            Find nearby parking, reserve in seconds, and pay cashless from one
            reliable app experience built for daily drivers, business trips, and
            weekend plans.
          </p>

          <div className="mt-8 flex items-center gap-5">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <button
                type="button"
                className="rounded-full bg-[#0088FF] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0F62C7]"
              >
                Get the App →
              </button>
            </a>
            <Link href="/app">
              <button
                type="button"
                className="text-sm font-semibold text-[#CFE3FF] transition hover:text-white"
              >
                More
              </button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-10">
            <div>
              <p className="text-4xl font-semibold tracking-[-0.03em]">4.8</p>
              <p className="mt-1 text-sm text-[#C6D4EC]">App Store rating</p>
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-[-0.03em]">700k+</p>
              <p className="mt-1 text-sm text-[#C6D4EC]">Parking sessions completed</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center px-4   sm:min-h-[500px] md:-ml-0">
          <div className="pointer-events-none absolute right-[22%] top-[20%] h-52 w-52 rounded-full bg-[#0088FF]/20 blur-[85px]" />
          <motion.div
           
            transition={{
              duration: 5.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative w-[280px] sm:w-[360px] lg:w-[400px]"
          >
            <Image
              src="/aboutherophoneimg.png"
              alt="Hand holding phone"
              width={840}
              height={1260}
              className="h-auto w-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
