"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";
import { useLanguage, t, ui } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1];

export default function BusinessSolutions() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [solutions, setSolutions] = useState([]);
  const [header, setHeader] = useState({});

  useEffect(() => {
    fetchBusinessContent().then((content) => {
      if (content?.solutions && Array.isArray(content.solutions)) {
        setSolutions(content.solutions);
      }
      if (content?.solutionsHeader && typeof content.solutionsHeader === "object") {
        setHeader((prev) => ({ ...prev, ...Object.fromEntries(Object.entries(content.solutionsHeader).filter(([, v]) => v !== "" && v != null)) }));
      }
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white via-[#F8FAFC] to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout: Left Sticky + Right Scrollable */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">

          {/* LEFT: Sticky Heading & Description */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-6 [overflow-wrap:anywhere]">
                {t(header, "heading", language)}
                {t(header, "headingAccent", language) ? (
                  <>
                    {" "}
                    <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                      {t(header, "headingAccent", language)}
                    </span>
                  </>
                ) : null}
              </h2>

              <p className="text-base leading-7 text-slate-600 mb-4 [overflow-wrap:anywhere]">
                {t(header, "description", language)}
              </p>

              <p className="text-sm leading-6 text-slate-500 mb-8 [overflow-wrap:anywhere]">
                {t(header, "description2", language)}
              </p>

              {/* CTA Button */}
              <Link href="/solutions">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088FF] text-white font-semibold rounded-full hover:bg-[#0066CC] transition"
                >
                  <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">
                    {t(header, "ctaLabel", language) || (language === "ar" ? "" : "Explore All Solutions")}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: 2-Column Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {(solutions || []).map((card, i) => (
              <motion.article
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[24px] bg-white border border-[#E7EAF0] shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:border-[rgba(0,136,255,0.3)] hover:shadow-[0_20px_50px_rgba(0,136,255,0.15)]"
              >
                {/* Image Container with Icon Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/50 via-transparent to-transparent" />

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#0088FF]/40 to-transparent flex items-end p-4"
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-xs font-semibold flex items-center gap-2"
                    >
                      {ui("learnMore", language)}
                      <ArrowRight className="h-3 w-3" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Container */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold leading-tight tracking-[-0.02em] text-[#050A13] group-hover:text-[#0088FF] transition">
                    {t(card, "title", language)}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-5 text-slate-600">
                    {t(card, "description", language)}
                  </p>

                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: 40 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 h-1 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] rounded-full"
                  ></motion.div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
