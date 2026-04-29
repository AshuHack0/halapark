"use client";

import { motion, useReducedMotion } from "framer-motion";

const features = [
  {
    title: "Real-Time\nParking Rates",
    description:
      "Always get the most accurate rates when booking across supported parking zones.",
    icon: "🚗",
    highlighted: false,
  },
  {
    title: "Low Booking\nFees",
    description:
      "Transparent pricing with no hidden charges - what you see is what you pay.",
    icon: "↓",
    highlighted: false,
  },
  {
    title: "Seamless\nCity Transactions",
    description:
      "Reserve, extend, and pay effortlessly for your parking sessions in one flow.",
    icon: "◔",
    highlighted: false,
  },
];

export default function AppFeatureCardsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 pt-0">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {features.map((item, index) => (
          <motion.article
            key={item.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 * index }}
            className="group rounded-3xl border border-[#E5E7EB] bg-[#F2F5F8] p-5 text-[#0F172A] transition-all duration-300 hover:border-[#0F62C7]/45 hover:bg-[#0F62C7] hover:text-white hover:shadow-[0_12px_30px_rgba(15,98,199,0.35)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="whitespace-pre-line text-[31px] font-semibold leading-[1.1] tracking-[-0.03em]">
                {item.title}
              </h3>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  "bg-[#E5E7EB] text-[#334155] group-hover:bg-white/25 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>
            </div>
            <p
              className="mt-10 max-w-[300px] text-sm leading-6 text-[#6B7280] group-hover:text-[#EAF1FF]"
            >
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
