"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1];

export default function BuiltForEverySpace() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [data, setData] = useState({});

  useEffect(() => {
    fetchBusinessSection("builtForSpace").then((section) => {
      if (section) setData(section);
    });
  }, []);

  // Admin "Show this section on the website" toggle.
  if (data?.enabled === false) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-[980px] text-center"
        >
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            {(t(data, "title", language) || "").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              {(t(data, "title", language) || "").split(" ").slice(-2).join(" ")}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            {t(data, "description", language) || ""}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
