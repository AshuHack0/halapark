"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Network, Smartphone, Cpu, BarChart3 } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1];

const ICON_MAP = {
  "Smart Mobility Ecosystem": Network,
  "Seamless Digital Experience": Smartphone,
  "Future-Ready Technology": Cpu,
  "Data-Driven Operations": BarChart3,
};

export default function HalaParkAdvantage() {
  const reduced = useReducedMotion();
  const [advantages, setAdvantages] = useState([]);

  useEffect(() => {
    fetchBusinessSection("advantage").then((section) => {
      if (section && Array.isArray(section)) {
        setAdvantages(section);
      }
    });
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[980px] text-center"
        >
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            The HalaPark{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(advantages || []).map((item, i) => {
            const Icon = ICON_MAP[item.title] || Network;
            return (
              <motion.div
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="group rounded-[22px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:border-[rgba(0,136,255,0.2)] hover:shadow-[0_16px_40px_rgba(0,136,255,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#EEF6FF] transition duration-300 group-hover:bg-[#0088FF]">
                  <Icon className="h-5 w-5 text-[#0088FF] transition duration-300 group-hover:text-white" strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="mt-5 text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
