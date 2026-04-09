"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, PhoneCall, Rocket, Wrench } from "lucide-react";

const steps = [
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

export default function BusinessHowToGetStarted() {
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] text-slate-900 max-sm:text-3xl">
              How to Get Started
            </h2>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 rounded-full bg-[#0088FF] px-7 py-3 text-base font-medium text-white transition-colors hover:brightness-95"
            >
              Book a Consultation
            </motion.button>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div
              className="pointer-events-none absolute left-[18px] top-4 h-[calc(100%-2rem)] w-px bg-[linear-gradient(180deg,rgba(141,134,255,0.34)_0%,rgba(141,134,255,0.08)_100%)]"
              aria-hidden="true"
            />

            <div className="space-y-9">
              {steps.map((step, index) => {
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
                      <h3 className="mt-1.5 max-w-[34rem] text-[1.7rem] font-semibold leading-[1.15] text-slate-900 max-md:text-[1.35rem] max-sm:text-xl">
                        {step.title}
                      </h3>
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
