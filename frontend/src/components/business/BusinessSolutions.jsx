"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { fetchBusinessContent } from "@/lib/cms";
import { useLanguage, t, ui } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const ease = [0.22, 1, 0.36, 1];

// Below lg the section renders fully visible with no scroll-triggered fade:
// on phones the in-view trigger can lag or miss, leaving blank cards.
const MOBILE_QUERY = "(max-width: 1023px)";
function useIsMobileViewport() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

export default function BusinessSolutions() {
  const isMobile = useIsMobileViewport();
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

  // Admin "Show this section on the website" toggle.
  if (header?.enabled === false) return null;

  // Only cards with real text/image count — so cleared cards don't render ghosts.
  const validCards = (Array.isArray(solutions) ? solutions : []).filter(
    (c) => c && ((c.title ?? "").trim() || (c.description ?? "").trim() || (c.image ?? "").trim()),
  );

  // Hide the whole section when the admin cleared everything (no cards and no
  // heading/description). No hardcoded defaults resurface after delete.
  const hasHeaderText =
    (t(header, "heading", language) || "").trim() ||
    (t(header, "description", language) || "").trim();
  if (validCards.length === 0 && !hasHeaderText) return null;

  return (
    <section className="bg-gradient-to-b from-white via-[#F8FAFC] to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout: Left Sticky + Right Scrollable */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">

          {/* LEFT: Sticky Heading & Description */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div>
              <h2 className="text-[2rem] sm:text-5xl lg:text-6xl font-bold leading-[1.1] sm:leading-tight tracking-[-0.05em] sm:tracking-[-0.06em] text-[#050A13] mb-5 sm:mb-6 [overflow-wrap:anywhere]">
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

              <RichText text={t(header, "description", language)} className="text-base leading-7 text-slate-600 mb-4 [overflow-wrap:anywhere] block" />

              <RichText text={t(header, "description2", language)} className="text-sm leading-6 text-slate-500 mb-8 [overflow-wrap:anywhere] block" />

              {/* CTA Button — link is admin-configurable (defaults to /solutions) */}
              {t(header, "ctaLabel", language) || (language !== "ar") ? (
                <Link href={(header.ctaLink || "").trim() || "/solutions"}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088FF] text-white font-semibold rounded-full hover:bg-[#0066CC] transition"
                  >
                    <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">
                      {t(header, "ctaLabel", language) || (language === "ar" ? "" : "Explore All Solutions")}
                    </span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </motion.button>
                </Link>
              ) : null}
            </div>
          </div>

          {/* RIGHT: 2-Column Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {validCards.map((card, i) => {
              // Per-card accent color (admin-picked); default to HalaPark blue.
              const accent = (card.color || "").trim() || "#0088FF";
              const href = (card.link || "").trim();
              const CardTag = href ? Link : "div";
              const cardProps = href ? { href } : {};
              return (
              <motion.article
                key={card.title || i}
                whileHover={isMobile ? undefined : { y: -8 }}
                className="group overflow-hidden rounded-[24px] bg-white border border-[#E7EAF0] shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:border-[rgba(0,136,255,0.3)] hover:shadow-[0_20px_50px_rgba(0,136,255,0.15)]"
              >
                <CardTag {...cardProps} className={`block h-full ${href ? "cursor-pointer" : ""}`}>
                {/* Image Container with Icon Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={t(card, "title", language) || ""}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/50 via-transparent to-transparent" />

                  {/* Emoji badge (admin-set), tinted with the card's accent color */}
                  {card.icon ? (
                    <span
                      className="absolute start-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm backdrop-blur-sm"
                      style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}55` }}
                      aria-hidden
                    >
                      {card.icon}
                    </span>
                  ) : null}

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-end p-4"
                    style={{ background: `linear-gradient(to top, ${accent}66, transparent)` }}
                  >
                    {href ? (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-xs font-semibold flex items-center gap-2"
                      >
                        {ui("learnMore", language)}
                        <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </motion.div>
                    ) : null}
                  </motion.div>
                </div>

                {/* Content Container */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold leading-tight tracking-[-0.02em] text-[#050A13] group-hover:text-[#0088FF] transition">
                    {t(card, "title", language)}
                  </h3>
                  <RichText text={t(card, "description", language)} className="mt-3 text-xs sm:text-sm leading-5 text-slate-600 [overflow-wrap:anywhere] block" />

                  {/* Learn More — only when the admin set a card link */}
                  {href ? (
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition group-hover:gap-2.5"
                      style={{ color: accent }}
                    >
                      {ui("learnMore", language)}
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </span>
                  ) : null}

                  {/* Bottom Accent Line — uses the card's accent color */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: 40 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 h-1 rounded-full"
                    style={{ background: `linear-gradient(to right, ${accent}, ${accent}99)` }}
                  ></motion.div>
                </div>
                </CardTag>
              </motion.article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
