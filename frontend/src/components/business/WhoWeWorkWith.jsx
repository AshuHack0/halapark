"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { fetchBusinessSection } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1];

export default function WhoWeWorkWith() {
  const reduced = useReducedMotion();
  const [partners, setPartners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchBusinessSection("whoWeWork").then((section) => {
      if (Array.isArray(section) && section.length > 0) {
        setPartners(section);
      }
    });
  }, []);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScroll();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (partners.length ? (prev + 1) % partners.length : 0));
      setDirection(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTabs = (dir) => {
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
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activePartner = partners[activeIndex] || {};

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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-4">
            Who We{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="text-base text-slate-600 mt-4">Trusted by leading organizations across industries</p>
        </motion.div>

        {/* Tabs Navigation with Enhanced Styling */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="relative mb-16"
        >
          {/* Left Arrow */}
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

          {/* Tabs Container */}
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-3 px-2"
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
                  {partner.title}
                </motion.button>
              ))}
            </div>

            {/* Gradient fade effect on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>

          {/* Right Arrow */}
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
        </motion.div>

        {/* Content Area with Enhanced Animations */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left: Title, Description & Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#0088FF]/10 text-[#0088FF] text-xs font-semibold rounded-full mb-2">
                Category
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#050A13]">
                {activePartner.title}
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base leading-7 text-slate-600 mb-8"
            >
              {activePartner.description}
            </motion.p>

            {/* Benefits List */}
            <motion.div variants={itemVariants} className="mb-8">
              <h4 className="text-sm font-semibold text-[#050A13] mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#0088FF]" />
                Key Benefits
              </h4>
              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {(activePartner.benefits || []).map((benefit) => (
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

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0088FF]/30 transition"
            >
              Learn More
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right: Image with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="relative h-80 sm:h-96 lg:h-[480px] rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,136,255,0.2)] border border-[#E7EAF0]"
          >
            <Image
              src={activePartner.image || "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png"}
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

            {/* Animated Corner Accent */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 136, 255, 0.3)",
                  "0 0 40px rgba(0, 136, 255, 0.5)",
                  "0 0 20px rgba(0, 136, 255, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-4 w-20 h-20 border-2 border-[#0088FF]/30 rounded-[16px] pointer-events-none"
            />
          </motion.div>
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
