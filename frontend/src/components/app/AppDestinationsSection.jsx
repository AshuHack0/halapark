"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { servicesData } from "@/modules/home/servicesData";

const CARDS_PER_VIEW_DESKTOP = 3;
const CARDS_PER_VIEW_TABLET = 2;

export default function AppDestinationsSection() {
  const prefersReducedMotion = useReducedMotion();
  const services = useMemo(() => servicesData.slice(0, 10), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, services.length - CARDS_PER_VIEW_DESKTOP);

  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <section className="bg-[#F3F4F6] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#0F172A] sm:text-5xl">
            Explore HalaPark Services
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-6 text-[#4B5563] sm:grid-cols-3 sm:gap-8">
            <p>
              Access the complete HalaPark ecosystem from booking and valet to EV
              charging and operations support.
            </p>
            <p>
              Discover services built for drivers, operators, property owners,
              airports, and high-demand urban locations.
            </p>
            <div className="flex items-start justify-start gap-2 sm:justify-end">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="rounded-full border border-[#CBD5E1] bg-white px-3 py-1 text-xs font-semibold text-[#334155] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === maxIndex}
                className="rounded-full border border-[#0088FF]/30 bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#0F62C7] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-9 overflow-hidden">
          <motion.div
            animate={{
              x: `-${(activeIndex * 100) / CARDS_PER_VIEW_DESKTOP}%`,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.45, ease: "easeInOut" }
            }
            className="flex"
          >
            {services.map((service, index) => (
              <motion.article
                key={service.slug}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: 0.03 * (index % 3),
                }}
                className="w-full flex-none px-2 sm:w-1/2 lg:w-1/3"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-[22px] border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-[185px] overflow-hidden rounded-[16px] bg-[radial-gradient(120%_120%_at_20%_0%,#EAF2FF_0%,#D7E7FF_52%,#C6D9FB_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,136,255,0.2),rgba(0,136,255,0)_60%)]" />
                    <p className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F62C7]">
                      Service
                    </p>
                    <p className="absolute bottom-4 left-4 right-4 text-lg font-semibold leading-6 text-[#0F172A]">
                      {service.name}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#4B5563]">
                    {service.summary}
                  </p>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="rounded-full bg-[#0088FF] px-9 py-3 text-sm font-semibold text-white transition hover:bg-[#0F62C7]"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
