"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const ease = [0.22, 1, 0.36, 1];

export default function WhyChooseHalaPark() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [header, setHeader] = useState({});

  useEffect(() => {
    fetchBusinessSection("whyChoose").then((section) => {
      // Honour the DB array exactly (including empty) — never keep stale state.
      setReasons(Array.isArray(section) ? section : []);
    });
    fetchBusinessSection("whyChooseHeader").then((section) => {
      if (section && typeof section === "object") setHeader(section);
    });
  }, []);

  function checkScroll() {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      // Whether the cards overflow the viewport (i.e. arrows are useful at all).
      setHasOverflow(scrollWidth > clientWidth + 10);
    }
  }

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Re-measure once the cards have loaded from the CMS so the arrows show/hide
  // correctly (e.g. hidden when there's only one card that fits).
  useEffect(() => {
    const id = setTimeout(checkScroll, 60);
    return () => clearTimeout(id);
  }, [reasons]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.offsetWidth || 0;
      const gap = 20;
      const scrollAmount = cardWidth + gap;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  // Admin "Show this section on the website" toggle.
  if (header?.enabled === false) return null;

  // Only cards with real content count — cleared cards must not render.
  const validReasons = (Array.isArray(reasons) ? reasons : []).filter(
    (c) => c && ((c.title ?? "").trim() || (c.description ?? "").trim() || (c.image ?? "").trim()),
  );

  const headingText = t(header, "heading", language) || (language === "ar" ? "" : "Why Choose");
  const gradientText = t(header, "headingGradient", language) || (language === "ar" ? "" : "HalaPark");

  // Hide the whole section when the admin cleared everything (no cards and no
  // heading). No hardcoded defaults resurface after delete.
  if (validReasons.length === 0 && !headingText.trim()) return null;

  return (
    <section className="bg-white pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mb-12"
        >
          {/* If the accent word already appears inside the heading, paint it
              gradient in place (no duplicate second line); otherwise the accent
              drops to its own line. Long headings wrap instead of clipping. */}
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
            {(() => {
              const gradientCls = "bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent";
              const idx = gradientText
                ? headingText.toLowerCase().indexOf(gradientText.toLowerCase())
                : -1;
              if (idx >= 0) {
                return (
                  <>
                    {headingText.slice(0, idx)}
                    <span className={gradientCls}>
                      {headingText.slice(idx, idx + gradientText.length)}
                    </span>
                    {headingText.slice(idx + gradientText.length)}
                  </>
                );
              }
              return (
                <>
                  <span className="block">{headingText}</span>
                  {gradientText ? (
                    <span className={`block ${gradientCls}`}>{gradientText}</span>
                  ) : null}
                </>
              );
            })()}
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          >
            {validReasons.map((item, i) => {
              // Left panel: an uploaded image if present, else a gradient built
              // from two admin-picked colors (inline style — always works, unlike
              // runtime Tailwind class strings).
              const from = (item.colorFrom || "").trim() || "#0088FF";
              const to = (item.colorTo || "").trim() || "#0066CC";
              const img = (item.image || "").trim();
              return (
              <motion.div
                key={item.title || i}
                data-card
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="flex-shrink-0 w-full sm:w-[500px] lg:w-[550px] rounded-[24px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] hover:shadow-[0_16px_40px_rgba(0,136,255,0.10)] transition"
              >
                {/* Card Layout: Image Left + Text Right. min-height (not fixed
                    height) so long descriptions grow the card instead of being
                    clipped at the bottom on narrow screens. */}
                <div className="flex min-h-[20rem]">
                  {/* Left: uploaded image OR color gradient */}
                  <div
                    className="w-2/5 flex items-center justify-center relative overflow-hidden"
                    style={img ? undefined : { background: `linear-gradient(135deg, ${from}, ${to})` }}
                  >
                    {img ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={t(item, "title", language) || ""} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/55 via-[#050A13]/10 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
                        <div className="absolute bottom-2 left-4 w-24 h-24 bg-white rounded-full mix-blend-overlay"></div>
                      </div>
                    )}

                    {/* Center Text Overlay */}
                    <div className="relative z-10 text-white text-center px-4">
                      <p className="text-sm font-medium opacity-90 mb-2" dir={language === "ar" ? "rtl" : "ltr"}>{t(header, "cardEyebrow", language) || (language === "ar" ? "" : "Smart Solutions")}</p>
                      <p className="text-lg font-bold leading-tight [overflow-wrap:anywhere]">{t(item, "title", language)}</p>
                    </div>
                  </div>

                  {/* Right: Text Content */}
                  <div className="w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#050A13] mb-3 [overflow-wrap:anywhere]">
                        {t(item, "title", language)}
                      </h3>
                      <RichText text={t(item, "description", language)} className="text-sm leading-6 text-slate-600 [overflow-wrap:anywhere] block" />
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows — only shown when the cards actually overflow
              (hidden when a single card, or a few, already fit on screen). */}
          {hasOverflow ? (
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#0088FF] bg-white text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#0088FF] bg-white text-[#0088FF] transition hover:bg-[#0088FF] hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
