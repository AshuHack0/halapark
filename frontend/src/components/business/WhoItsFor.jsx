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
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const SEGMENT_ICONS = [
  Building2,
  Landmark,
  Store,
  HeartPulse,
  BriefcaseBusiness,
  Hotel,
];

export default function BusinessWhoItsFor() {
  const { language } = useLanguage();
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchBusinessContent().then((data) => {
      const w = data?.whoItsFor;
      if (!w || typeof w !== "object") return;

      setContent((prev) => {
        const next = { ...prev };

        if (w.ar && typeof w.ar === "object") next.ar = w.ar;
        if (typeof w.eyebrow === "string" && w.eyebrow.trim() !== "") {
          next.eyebrow = w.eyebrow;
        }
        if (typeof w.heading === "string" && w.heading.trim() !== "") {
          next.heading = w.heading;
        }
        if (typeof w.description === "string" && w.description.trim() !== "") {
          next.description = w.description;
        }
        if (Array.isArray(w.items) && w.items.length > 0) {
          next.items = w.items.map((item, index) => ({
            icon: SEGMENT_ICONS[index] || Building2,
            ...item,
          }));
        }

        return next;
      });
    });
  }, []);

  const segments = content.items || [];

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
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
            {t(content, "eyebrow", language) || (language === "ar" ? "" : "Who It's For")}
          </p>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 max-sm:text-3xl [overflow-wrap:anywhere]">
            {t(content, "heading", language)}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5E6578] max-sm:text-base [overflow-wrap:anywhere]">
            {segments.map((segment, index) => (
              <span key={segment.title}>
                {t(segment, "title", language)}
                {index < segments.length - 1 && (
                  <span className="px-3 text-[#0088FF]">|</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {segments.slice(0, 4).map((segment, index) => {
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
                  <h3 className="max-w-[14rem] text-xl font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">
                    {t(segment, "title", language)}
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
              <p className="max-w-2xl text-lg leading-8 text-[#2A3347] max-sm:text-base [overflow-wrap:anywhere]">
                {t(content, "description", language)}
              </p>

              <div className="flex flex-wrap gap-3">
                {segments.slice(0, 3).map((segment) => (
                  <span
                    key={`${segment.title}-pill`}
                    className="rounded-full border border-[rgba(0,136,255,0.12)] bg-white px-4 py-2 text-sm font-medium text-[#2A3347]"
                  >
                    {t(segment, "title", language)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {segments.slice(4).map((segment, index) => {
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
                  <h3 className="max-w-[14rem] text-xl font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">
                    {t(segment, "title", language)}
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
