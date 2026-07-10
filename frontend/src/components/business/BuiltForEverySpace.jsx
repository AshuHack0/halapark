"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

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

  // Heading: prefer the explicit Title + Title Gradient fields. For older content
  // that only has a single `title`, fall back to the previous behaviour (last two
  // words become the gradient) so nothing breaks.
  const fullTitle = (t(data, "title", language) || "").trim();
  const explicitGradient = (t(data, "titleGradient", language) || "").trim();
  let line1 = fullTitle;
  let line2 = explicitGradient;
  if (!explicitGradient && fullTitle) {
    const words = fullTitle.split(" ");
    line1 = words.slice(0, -2).join(" ");
    line2 = words.slice(-2).join(" ");
  }
  const description = t(data, "description", language) || "";

  // Hide the whole section when the admin cleared the title + description.
  if (!fullTitle && !description.trim()) return null;

  return (
    // Reduced bottom padding so this section sits closer to "Why Choose HalaPark"
    // below (removes the large white gap between the two).
    <section className="bg-white pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-24 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-[980px] text-center"
        >
          {/* Title on one line; the gradient accent drops to a second line. */}
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
            {line1 ? <span className="block">{line1}</span> : null}
            {line2 ? (
              <span className="block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                {line2}
              </span>
            ) : null}
          </h2>
          {description ? (
            <RichText text={description} className="mx-auto mt-5 max-w-[650px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] [overflow-wrap:anywhere] block" />
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
