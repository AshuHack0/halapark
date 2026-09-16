"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const ease = [0.22, 1, 0.36, 1];

export default function WhoWeWorkWith() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [header, setHeader] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  // Declared before the effects that call it so it is defined at call time.
  function checkScroll() {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      // In RTL (Arabic) browsers report scrollLeft as 0 → -max, so normalize
      // to "distance scrolled from the start edge" before deciding the arrows.
      const isRtl = getComputedStyle(el).direction === "rtl";
      const fromStart = isRtl ? -scrollLeft : scrollLeft;
      setCanScrollLeft(isRtl ? fromStart < max - 10 : fromStart > 0);
      setCanScrollRight(isRtl ? fromStart > 0 : fromStart < max - 10);
      setHasOverflow(scrollWidth > clientWidth + 10);
    }
  }

  useEffect(() => {
    fetchBusinessSection("whoWeWork").then((section) => {
      if (Array.isArray(section) && section.length > 0) {
        setPartners(section);
      }
    });
    fetchBusinessSection("whoWeWorkHeader").then((section) => {
      if (section) {
        setHeader(section);
      }
    });
  }, []);

  useEffect(() => {
    checkScroll();
  }, [partners]);

  useEffect(() => {
    // Auto-advance stops once the user takes manual control (paused).
    if (paused || partners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partners.length);
      setDirection(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, partners.length]);

  const scrollTabs = (dir) => {
    setPaused(true);
    if (scrollRef.current) {
      const tabWidth = scrollRef.current.querySelector('[data-tab]')?.offsetWidth || 150;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -tabWidth : tabWidth,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleTabClick = (index) => {
    setPaused(true);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activePartner = partners[activeIndex] || {};
  const activeBenefits =
    language === "ar"
      ? (Array.isArray(activePartner.ar?.benefits) ? activePartner.ar.benefits : [])
      : activePartner.benefits || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  };

  // Admin "Show this section on the website" toggle.
  if (header?.enabled === false) return null;

  // Empty guard: hide the whole section when there are no meaningful partners
  // (a partner counts if it has a title, image or description) and no heading.
  const validPartners = partners.filter(
    (p) => p && (p.title || p.image || p.description)
  );
  const hasHeading =
    t(header, "heading", language) || t(header, "headingGradient", language);
  if (validPartners.length === 0 && !hasHeading) return null;

  return (
    <section className="bg-gradient-to-b from-white via-[#F8FAFC] to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mb-16 text-center"
        >
          <h2
            dir={language === "ar" ? "rtl" : "ltr"}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-4 [overflow-wrap:anywhere]"
          >
            <span className="block whitespace-nowrap">
              {t(header, "heading", language) || (language === "ar" ? "" : "Who We")}
            </span>
            <span className="mt-2 block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.04em] text-transparent">
              {t(header, "headingGradient", language) || (language === "ar" ? "" : "Work With")}
            </span>
          </h2>
          <p
            dir={language === "ar" ? "rtl" : "ltr"}
            className="text-base text-slate-600 mt-4 [overflow-wrap:anywhere]"
          >
            {t(header, "subtitle", language) || (language === "ar" ? "" : "Trusted by leading organizations across industries")}
          </p>
        </motion.div>

        {/* Tabs Navigation with Enhanced Styling */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="relative mb-16"
        >
          {/* Left Arrow — only shown when the tabs actually overflow */}
          {hasOverflow && (
            <motion.button
              onClick={() => scrollTabs('left')}
              disabled={!canScrollLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition border border-[#E7EAF0]"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="h-5 w-5 text-[#0088FF]" />
            </motion.button>
          )}

          {/* Tabs Container */}
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className={`flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-3 px-2 ${
                hasOverflow ? "" : "justify-center"
              }`}
            >
              {partners.map((partner, i) => (
                <motion.button
                  key={partner.title}
                  data-tab
                  onClick={() => handleTabClick(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0.8,
                    backgroundColor: activeIndex === i ? '#0088FF' : '#F1F5F9'
                  }}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition whitespace-nowrap border border-transparent ${
                    activeIndex === i
                      ? "text-white shadow-lg shadow-[#0088FF]/30"
                      : "text-slate-700 hover:bg-slate-200 border-[#E7EAF0]"
                  }`}
                >
                  {t(partner, "title", language)}
                </motion.button>
              ))}
            </div>

            {/* Gradient fade effect on sides — only while the tabs overflow,
                so a short tab row is never visually clipped. */}
            {hasOverflow ? (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </>
            ) : null}
          </div>

          {/* Right Arrow — only shown when the tabs actually overflow */}
          {hasOverflow && (
            <motion.button
              onClick={() => scrollTabs('right')}
              disabled={!canScrollRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition border border-[#E7EAF0]"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="h-5 w-5 text-[#0088FF]" />
            </motion.button>
          )}
        </motion.div>

        {/* Content Area with Enhanced Animations */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className={`grid grid-cols-1 gap-8 lg:gap-16 items-center ${
            activePartner.image ? "lg:grid-cols-2" : ""
          }`}
        >
          {/* Left: Title, Description & Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                dir={language === "ar" ? "rtl" : "ltr"}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0088FF]/10 text-[#0088FF] text-xs font-semibold rounded-full mb-2 [overflow-wrap:anywhere]"
              >
                {activePartner.icon && (
                  <Image
                    src={activePartner.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                )}
                {t(header, "categoryLabel", language) || (language === "ar" ? "" : "Category")}
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#050A13]">
                {t(activePartner, "title", language)}
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base leading-7 text-slate-600 mb-8"
            >
              <RichText text={t(activePartner, "description", language)} />
            </motion.p>

            {/* Benefits List */}
            <motion.div variants={itemVariants} className="mb-8">
              <h4
                dir={language === "ar" ? "rtl" : "ltr"}
                className="text-sm font-semibold text-[#050A13] mb-4 flex items-center gap-2 [overflow-wrap:anywhere]"
              >
                <Sparkles className="h-4 w-4 text-[#0088FF]" />
                {t(header, "benefitsLabel", language) || (language === "ar" ? "" : "Key Benefits")}
              </h4>
              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {activeBenefits.map((benefit) => (
                  <motion.li
                    key={benefit}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <span className="h-2 w-2 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] rounded-full flex-shrink-0" />
                    {benefit}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* CTA Button — links to header.ctaLink when set, otherwise a plain button */}
            {header.ctaLink ? (
              <motion.div variants={itemVariants} className="inline-block">
                <Link
                  href={header.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0088FF]/30 transition"
                >
                  <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">
                    {t(header, "ctaLabel", language) || (language === "ar" ? "" : "Learn More")}
                  </span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </motion.div>
            ) : (
              <motion.button
                variants={itemVariants}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0088FF]/30 transition"
              >
                <span dir={language === "ar" ? "rtl" : "ltr"} className="[overflow-wrap:anywhere]">
                  {t(header, "ctaLabel", language) || (language === "ar" ? "" : "Learn More")}
                </span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </motion.div>
              </motion.button>
            )}
          </motion.div>

          {/* Right: Image with Enhanced Effects — hidden entirely when the
              partner has no image (no empty frame shell). */}
          {activePartner.image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="relative h-80 sm:h-96 lg:h-[480px] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,136,255,0.2)] border border-[#E7EAF0]"
          >
            <Image
              src={activePartner.image}
              alt={activePartner.title || ""}
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlays */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-[#050A13]/30 via-transparent to-transparent"
            />

            {/* Corner badge — shows the partner's uploaded icon (from the
                admin "Icon" field). Hidden entirely when no icon is set, so
                no empty box ever renders over the photo. */}
            {activePartner.icon ? (
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 136, 255, 0.3)",
                    "0 0 40px rgba(0, 136, 255, 0.5)",
                    "0 0 20px rgba(0, 136, 255, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 flex h-20 w-20 items-center justify-center rounded-[16px] border-2 border-[#0088FF]/30 bg-white/85 p-3 backdrop-blur-sm pointer-events-none"
              >
                <Image
                  src={activePartner.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            ) : null}
          </motion.div>
          ) : null}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          {partners.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleTabClick(i)}
              animate={{
                width: activeIndex === i ? 32 : 8,
                backgroundColor: activeIndex === i ? '#0088FF' : '#D1D5DB',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full transition cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
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
