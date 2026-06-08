"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Wrench, Brain, Smile, BarChart3, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1];

const reasons = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Transform unused or underutilized parking spaces into new revenue opportunities through hourly bookings, subscriptions, reservations, and dynamic parking management.",
    bgGradient: "from-[#0088FF] to-[#0066CC]",
    accentColor: "bg-[#0088FF]",
  },
  {
    icon: Wrench,
    title: "Reduce Operational Costs",
    description: "Automate parking operations with ticketless systems, digital payments, and intelligent access management that reduce manpower dependency and operational overhead.",
    bgGradient: "from-[#1AB2FF] to-[#0088FF]",
    accentColor: "bg-[#1AB2FF]",
  },
  {
    icon: Brain,
    title: "AI-Powered Parking Management",
    description: "Leverage smart automation, license plate recognition, occupancy monitoring, and real-time parking intelligence to create seamless vehicle experiences.",
    bgGradient: "from-[#0088FF] to-[#005FA3]",
    accentColor: "bg-[#0088FF]",
  },
  {
    icon: Smile,
    title: "Improve Customer Experience",
    description: "Deliver fast, frictionless entry and exit experiences with cashless payments, mobile booking, digital passes, and automated parking access.",
    bgGradient: "from-[#1AB2FF] to-[#0066CC]",
    accentColor: "bg-[#1AB2FF]",
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring & Reporting",
    description: "Access live dashboards, occupancy analytics, business intelligence reports, traffic insights, and parking performance data anytime, anywhere.",
    bgGradient: "from-[#0088FF] to-[#0070B3]",
    accentColor: "bg-[#0088FF]",
  },
  {
    icon: Layers,
    title: "Scalable & Flexible Solutions",
    description: "Whether you manage one parking space or a city-wide parking operation, HalaPark scales with your business and adapts to your operational requirements.",
    bgGradient: "from-[#1AB2FF] to-[#0088FF]",
    accentColor: "bg-[#1AB2FF]",
  },
];

export default function WhyChooseHalaPark() {
  const reduced = useReducedMotion();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.06em] text-[#050A13]">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              HalaPark
            </span>
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
            {reasons.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  data-card
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="flex-shrink-0 w-full sm:w-[500px] lg:w-[550px] rounded-[24px] overflow-hidden bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] hover:shadow-[0_16px_40px_rgba(0,136,255,0.10)] transition"
                >
                  {/* Card Layout: Image Left + Text Right */}
                  <div className="flex h-80">
                    {/* Left: Image with Gradient Background */}
                    <div className={`w-2/5 bg-gradient-to-br ${item.bgGradient} flex items-center justify-center relative overflow-hidden`}>
                      {/* Decorative gradient shapes */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
                        <div className="absolute bottom-2 left-4 w-24 h-24 bg-white rounded-full mix-blend-overlay"></div>
                      </div>

                      {/* Center Text Overlay */}
                      <div className="relative z-10 text-white text-center px-4">
                        <p className="text-sm font-medium opacity-90 mb-2">Smart Solutions</p>
                        <p className="text-lg font-bold leading-tight">{item.title}</p>
                      </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#050A13] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      {/* Icon at Bottom */}
                      <div className="flex justify-end">
                        <div className={`${item.accentColor} p-3 rounded-lg text-white`}>
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
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
