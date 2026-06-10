"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";

const ease = [0.22, 1, 0.36, 1];

const DEFAULT_SOLUTIONS = [
  {
    title: "Smart Public Parking",
    description: "Modernize public parking operations with mobile payments, virtual tickets, real-time availability tracking, and seamless digital parking experiences.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    icon: "🅿️",
  },
  {
    title: "Private Parking Rental",
    description: "Enable property owners and businesses to monetize unused parking spaces through hourly, daily, monthly, or annual rentals.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    icon: "🏠",
  },
  {
    title: "Residential Parking Management",
    description: "Simplify resident and visitor parking with secure access control, automated entry systems, guest management, and smart allocation tools.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    icon: "🏢",
  },
  {
    title: "Commercial & Retail Parking",
    description: "Enhance customer convenience with frictionless parking experiences designed for malls, offices, retail destinations, and hospitality environments.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    icon: "🛍️",
  },
  {
    title: "AI Access & Gate Control",
    description: "Automate entry and exit using smart gate systems, license plate recognition, and digital verification technologies.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    icon: "🤖",
  },
  {
    title: "Fleet & Mobility Solutions",
    description: "Support businesses with fleet parking management, mobility integration, logistics coordination, and operational parking optimization.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    icon: "🚗",
  },
  {
    title: "Smart City Parking Integration",
    description: "Connect parking systems with city infrastructure for real-time traffic coordination, municipal dashboards, and urban mobility optimization.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
    icon: "🌆",
  },
  {
    title: "Mobile App Parking Ecosystem",
    description: "Provide users with booking, payments, navigation, and parking history in one seamless mobile platform.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
    icon: "📱",
  },
  {
    title: "Data & AI Analytics Dashboard",
    description: "Deliver actionable insights on occupancy trends, peak hours, revenue performance, and space utilization.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    icon: "📊",
  },
  {
    title: "Cashless Payment Ecosystem",
    description: "Support multiple payment methods including cards, wallets, QR payments, and subscription billing models.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    icon: "💳",
  },
  {
    title: "Security & Surveillance Integration",
    description: "Integrate CCTV, ANPR/LPR systems, and automated alerts to enhance safety and compliance.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    icon: "🔒",
  },
  {
    title: "EV Charging Parking Integration",
    description: "Combine parking with electric vehicle charging stations for future-ready mobility infrastructure.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    icon: "⚡",
  },
];

export default function BusinessSolutions() {
  const reduced = useReducedMotion();
  const [solutions, setSolutions] = useState(DEFAULT_SOLUTIONS);

  useEffect(() => {
    fetchBusinessContent().then((content) => {
      if (content?.solutions && Array.isArray(content.solutions)) {
        setSolutions(content.solutions);
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em] text-[#050A13] mb-6">
                Our Business{" "}
                <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>

              <p className="text-base leading-7 text-slate-600 mb-4">
                Intelligent parking systems built for every business type, from single sites to large-scale multi-location operations.
              </p>

              <p className="text-sm leading-6 text-slate-500 mb-8">
                We make it possible to invest in parking infrastructure with simple, transparent and comprehensive protection.
              </p>

              {/* CTA Button */}
              <Link href="/solutions">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088FF] text-white font-semibold rounded-full hover:bg-[#0066CC] transition"
                >
                  Explore All Solutions
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: 2-Column Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {solutions.map((card, i) => (
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
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Container */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold leading-tight tracking-[-0.02em] text-[#050A13] group-hover:text-[#0088FF] transition">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-5 text-slate-600">
                    {card.description}
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
