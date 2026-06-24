"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const valuePropImages = [
  "/hf_20260327_074228_600dfc1a-c1a5-43ad-99e3-3e4d48603f22-removebg-preview.png",
  "/hf_20260327_080707_02b7a402-e902-49e6-862c-01e6227260ab-removebg-preview.png",
  "/ea3689b3ea3d1b451f1ff37653eab8a9.jpg-removebg-preview.png",
];

const CARD_STYLES = [
  { theme: "light", ticketTilt: "-rotate-6", rounded: "bl" },
  { theme: "dark", ticketTilt: "-rotate-1", rounded: "none" },
  { theme: "light", ticketTilt: "rotate-6", rounded: "tr" },
];

export default function BusinessValueProps() {
  const { language } = useLanguage();
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchBusinessContent().then((data) => {
      const vp = data?.valueProps;
      if (!vp || typeof vp !== "object") return;

      setContent((prev) => {
        const next = { ...prev };
        if (vp.ar && typeof vp.ar === "object") next.ar = vp.ar;
        if (typeof vp.eyebrow === "string" && vp.eyebrow.trim() !== "") {
          next.eyebrow = vp.eyebrow;
        }
        if (typeof vp.heading === "string" && vp.heading.trim() !== "") {
          next.heading = vp.heading;
        }
        if (typeof vp.description === "string" && vp.description.trim() !== "") {
          next.description = vp.description;
        }
        if (Array.isArray(vp.items) && vp.items.length > 0) {
          next.items = vp.items.map((item, i) => ({
            ...(CARD_STYLES[i % CARD_STYLES.length]),
            ...item,
          }));
        }
        return next;
      });
    });
  }, []);

  return (
    <section className="py-20 max-md:py-16 max-sm:py-14 bg-white">
      <div className="container mx-auto sm:px-0 px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          {/* button */}
          <button
            type="button"
            className="mb-5 inline-flex items-center gap-3 rounded-full bg-[#0088FF] px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(0,136,255,0.22)] transition-transform hover:-translate-y-0.5 hover:brightness-95"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#0088FF]">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
            <span>{t(content, "eyebrow", language)}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#0088FF]">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
          </button>
          <h2 className="text-3xl max-sm:text-2xl font-bold text-slate-900 [overflow-wrap:anywhere]">
            {t(content, "heading", language)}
          </h2>
          <p className="mt-4 text-lg max-sm:text-base leading-relaxed text-[#5E6578] [overflow-wrap:anywhere]">
            {t(content, "description", language)}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-4">
          {(content.items || []).map((item, index) => {
            const valuePropImage =
              valuePropImages[index % valuePropImages.length];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={[
                  "relative flex min-h-[500px] h-full flex-col overflow-hidden px-6 pb-6 pt-6",
                  // Dynamic rounded classes
                  item.rounded === "bl" && "rounded-bl-[55px]",
                  item.rounded === "tr" && "rounded-tr-[55px]",
                  item.rounded === "none" && "",
                  item.theme === "dark"
                    ? "bg-[#0088FF] text-white"
                    : " bg-[rgba(0,136,255,0.05)] text-slate-900",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    "pointer-events-none absolute inset-0",
                    item.theme === "dark"
                      ? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]"
                      : "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_40%),linear-gradient(180deg,rgba(0,136,255,0.18),rgba(255,255,255,0.08))]",
                  ].join(" ")}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={[
                      "mb-7 flex h-12 w-12 items-center justify-center rounded-full",
                      item.theme === "dark" ? "bg-white" : "bg-[#0088FF]",
                    ].join(" ")}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={[
                        "h-5 w-5",
                        item.theme === "dark" ? "text-[#0088FF]" : "text-white",
                      ].join(" ")}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 7.25c0-1.8-1.2-3.25-2.75-3.25S6.5 5.45 6.5 7.25 7.7 10.5 9.25 10.5 12 9.05 12 7.25Z" />
                      <path d="M17.5 7.25c0-1.8-1.2-3.25-2.75-3.25S12 5.45 12 7.25s1.2 3.25 2.75 3.25 2.75-1.45 2.75-3.25Z" />
                      <path d="M12 16.75c0-1.8-1.2-3.25-2.75-3.25S6.5 14.95 6.5 16.75 7.7 20 9.25 20 12 18.55 12 16.75Z" />
                      <path d="M17.5 16.75c0-1.8-1.2-3.25-2.75-3.25S12 14.95 12 16.75 13.2 20 14.75 20s2.75-1.45 2.75-3.25Z" />
                    </svg>
                  </div>

                  <div className="max-w-[16rem]">
                    <h3
                      className={[
                        "text-[2rem] leading-tight max-sm:text-[1.7rem] font-semibold [overflow-wrap:anywhere]",
                        item.theme === "dark" ? "text-white" : "text-slate-900",
                      ].join(" ")}
                    >
                      {t(item, "title", language)}
                    </h3>
                    <p
                      className={[
                        "mt-4 text-base max-sm:text-sm leading-7 [overflow-wrap:anywhere]",
                        item.theme === "dark"
                          ? "text-white/72"
                          : "text-slate-700/80",
                      ].join(" ")}
                    >
                      {t(item, "description", language)}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-center px-2 pt-10">
                    <div
                      className={[
                        "w-full max-w-[240px] overflow-hidden rounded-[22px]  p-4 text-left",
                        item.ticketTilt,
                      ].join(" ")}
                    >
                      <Image
                        src={valuePropImage}
                        alt={item.title}
                        width={240}
                        height={240}
                        sizes="(max-width: 768px) 220px, 240px"
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
