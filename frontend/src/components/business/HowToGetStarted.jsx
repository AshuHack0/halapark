"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardCheck, PhoneCall, Rocket, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";

const DEFAULT_STEPS = [
  {
    title: "Book a free consultation",
    icon: PhoneCall,
  },
  {
    title: "We assess your site and design a custom setup",
    icon: ClipboardCheck,
  },
  {
    title: "Installation and onboarding",
    icon: Wrench,
  },
  {
    title: "Go live -- fully managed from day one",
    icon: Rocket,
  },
];

const DEFAULT_CONTENT = {
  eyebrow: "How It Works",
  heading: "How to Get Started",
  description: "",
  steps: DEFAULT_STEPS,
};

export default function BusinessHowToGetStarted() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetchBusinessContent().then((data) => {
      const h = data?.howToGetStarted;
      if (!h || typeof h !== "object") return;
      setContent((prev) => {
        const next = { ...prev };
        if (typeof h.eyebrow === "string" && h.eyebrow !== "") next.eyebrow = h.eyebrow;
        if (typeof h.heading === "string" && h.heading !== "") next.heading = h.heading;
        if (typeof h.description === "string" && h.description !== "") next.description = h.description;
        if (Array.isArray(h.steps) && h.steps.length > 0) {
          next.steps = DEFAULT_STEPS.map((defaultStep, i) =>
            h.steps[i] ? { ...defaultStep, ...h.steps[i] } : defaultStep
          );
        }
        return next;
      });
    });
  }, []);

  return (
    <section className="bg-white py-20 max-md:py-16 max-sm:py-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[30px]  bg-white px-6 py-8  md:px-8 md:py-10 lg:grid lg:grid-cols-[minmax(260px,0.88fr)_minmax(0,1.12fr)] lg:gap-16"
        >
          <div className="max-w-md lg:pt-2">
            {content.eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
                {content.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] text-slate-900 max-sm:text-3xl [overflow-wrap:anywhere]">
              {content.heading}
            </h2>

            {content.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600 [overflow-wrap:anywhere]">
                {content.description}
              </p>
            ) : null}

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 rounded-full bg-[#0088FF] px-7 py-3 text-base font-medium text-white transition-colors hover:brightness-95"
              >
                Book a Consultation
              </motion.button>
            </Link>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div
              className="pointer-events-none absolute left-[18px] top-4 h-[calc(100%-2rem)] w-px bg-[linear-gradient(180deg,rgba(141,134,255,0.34)_0%,rgba(141,134,255,0.08)_100%)]"
              aria-hidden="true"
            />

            <div className="space-y-9">
              {content.steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-5 sm:gap-6"
                  >
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(0,136,255,0.12)] bg-white text-[#0088FF] shadow-[0_10px_24px_rgba(0,136,255,0.12)]">
                      <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                    </div>

                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-[#0088FF]">
                        Step {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1.5 max-w-[34rem] text-[1.7rem] font-semibold leading-[1.15] text-slate-900 max-md:text-[1.35rem] max-sm:text-xl [overflow-wrap:anywhere]">
                        {step.title}
                      </h3>
                      {step.description ? (
                        <p className="mt-2 max-w-[34rem] text-base leading-7 text-slate-600 [overflow-wrap:anywhere]">
                          {step.description}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
