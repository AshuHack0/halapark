"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, Wrench, Brain, Smile, BarChart3, Layers } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const reasons = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Transform unused or underutilized parking spaces into new revenue opportunities through hourly bookings, subscriptions, reservations, and dynamic parking management.",
  },
  {
    icon: Wrench,
    title: "Reduce Operational Costs",
    description: "Automate parking operations with ticketless systems, digital payments, and intelligent access management that reduce manpower dependency and operational overhead.",
  },
  {
    icon: Brain,
    title: "AI-Powered Parking Management",
    description: "Leverage smart automation, license plate recognition, occupancy monitoring, and real-time parking intelligence to create seamless vehicle experiences.",
  },
  {
    icon: Smile,
    title: "Improve Customer Experience",
    description: "Deliver fast, frictionless entry and exit experiences with cashless payments, mobile booking, digital passes, and automated parking access.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring & Reporting",
    description: "Access live dashboards, occupancy analytics, business intelligence reports, traffic insights, and parking performance data anytime, anywhere.",
  },
  {
    icon: Layers,
    title: "Scalable & Flexible Solutions",
    description: "Whether you manage one parking space or a city-wide parking operation, HalaPark scales with your business and adapts to your operational requirements.",
  },
];

export default function WhyChooseHalaPark() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[980px] text-center"
        >
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              HalaPark
            </span>
          </h2>
        </motion.div>

        {/* Row 1 - 3 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
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

        {/* Row 2 - 3 cards */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.slice(3).map((item, i) => {
            const Icon = item.icon;
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
