"use client";

import {
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Hotel,
  Landmark,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";

const audienceSegments = [
  { title: "Residential Towers", icon: Building2 },
  { title: "Commercial Properties", icon: Landmark },
  { title: "Retail Centres", icon: Store },
  { title: "Hospitals & Healthcare", icon: HeartPulse },
  { title: "Corporate Campuses", icon: BriefcaseBusiness },
  { title: "Hospitality & Hotels", icon: Hotel },
];

export default function BusinessWhoItsFor() {
  return (
    <section className="bg-white py-20 max-md:py-16 max-sm:py-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-4xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Who It&apos;s For
          </p>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 max-sm:text-3xl">
            Who It&apos;s For
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5E6578] max-sm:text-base">
            {audienceSegments.map((segment, index) => (
              <span key={segment.title}>
                {segment.title}
                {index < audienceSegments.length - 1 && (
                  <span className="px-3 text-[#0088FF]">|</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {audienceSegments.slice(0, 4).map((segment, index) => {
            const Icon = segment.icon;

            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)] md:min-h-[220px] xl:col-span-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(0,136,255,0.12)] bg-[rgba(0,136,255,0.06)] text-[#0088FF]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <div className="mt-12 flex items-end justify-between gap-4">
                  <h3 className="max-w-[14rem] text-xl font-semibold leading-snug text-slate-900">
                    {segment.title}
                  </h3>
                  <span className="text-sm font-semibold text-slate-300">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="order-first rounded-[28px] border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_100%)] p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)] md:p-8 xl:order-none xl:col-span-6 xl:min-h-[220px]"
          >
            <div className="flex h-full flex-col justify-between gap-8">
              <p className="max-w-2xl text-lg leading-8 text-[#2A3347] max-sm:text-base">
                Designed for residential, commercial, retail, healthcare, and
                hospitality environments, HalaPark adapts to the needs of every
                property with smoother access, better control, and a more
                efficient parking experience.
              </p>

              <div className="flex flex-wrap gap-3">
                {audienceSegments.slice(0, 3).map((segment) => (
                  <span
                    key={`${segment.title}-pill`}
                    className="rounded-full border border-[rgba(0,136,255,0.12)] bg-white px-4 py-2 text-sm font-medium text-[#2A3347]"
                  >
                    {segment.title}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {audienceSegments.slice(4).map((segment, index) => {
            const Icon = segment.icon;

            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.24 + index * 0.08 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)] md:min-h-[220px] xl:col-span-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(0,136,255,0.12)] bg-[rgba(0,136,255,0.06)] text-[#0088FF]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <div className="mt-12 flex items-end justify-between gap-4">
                  <h3 className="max-w-[14rem] text-xl font-semibold leading-snug text-slate-900">
                    {segment.title}
                  </h3>
                  <span className="text-sm font-semibold text-slate-300">
                    0{index + 5}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
