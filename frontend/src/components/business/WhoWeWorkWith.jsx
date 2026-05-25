"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const partners = [
  {
    title: "Property Developers",
    description: "Transform residential and commercial projects with intelligent parking infrastructure that increases property value, improves traffic flow, and delivers future-ready smart mobility experiences.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
  },
  {
    title: "Shopping Malls & Retail Destinations",
    description: "Create faster, smoother, and stress-free visitor experiences with automated parking, digital payments, real-time availability tracking, and seamless customer journeys.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  },
  {
    title: "Residential Communities",
    description: "Deliver secure, organized, and hassle-free parking management for residents, visitors, and tenants with smart access control and automated entry systems.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  },
  {
    title: "Hotels & Hospitality",
    description: "Enhance guest experiences with premium valet integration, frictionless parking access, digital visitor management, and luxury smart parking services.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  },
  {
    title: "Government & Public Entities",
    description: "Support smart city initiatives with scalable parking ecosystems, AI-powered mobility solutions, real-time analytics, and intelligent urban traffic management.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
  {
    title: "Service Providers & Suppliers",
    description: "Collaborate with HalaPark to integrate innovative parking technologies, EV charging systems, automation tools, and mobility solutions into a growing smart ecosystem.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
  },
  {
    title: "Commercial Towers & Office Buildings",
    description: "Simplify employee and visitor parking with automated access control, reserved parking management, and seamless daily parking experiences for modern workplaces.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  },
  {
    title: "Airports & Transportation Hubs",
    description: "Reduce congestion and improve vehicle movement with intelligent parking systems designed for high-traffic environments and large-scale mobility operations.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
  },
  {
    title: "Universities & Educational Campuses",
    description: "Manage student, faculty, and visitor parking efficiently using smart permits, digital parking management, and real-time occupancy monitoring.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
  },
  {
    title: "Healthcare & Medical Facilities",
    description: "Provide stress-free parking experiences for patients, staff, and visitors with smart guidance systems, automated entry, and optimized traffic flow.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  },
  {
    title: "Event Venues & Entertainment Destinations",
    description: "Handle large parking demand during concerts, exhibitions, and events with intelligent crowd management, dynamic parking allocation, and faster vehicle access.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
];

export default function WhoWeWorkWith() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-12 max-w-[980px] text-center"
        >
          <h2 className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            Who We{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
        </motion.div>

        {/* Row 1 - 4 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.slice(0, 4).map((card, i) => (
            <motion.article
              key={card.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/40 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="flex-1">
                  <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">{card.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">{card.description}</p>
                </div>
                <Link href="/contact" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white" aria-label={`Learn more about ${card.title}`}>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Row 2 - 4 cards */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.slice(4, 8).map((card, i) => (
            <motion.article
              key={card.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/40 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="flex-1">
                  <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">{card.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">{card.description}</p>
                </div>
                <Link href="/contact" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white" aria-label={`Learn more about ${card.title}`}>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Row 3 - 3 cards centered */}
        <div className="mx-auto mt-5 grid w-full gap-5 sm:grid-cols-2 lg:w-3/4 lg:grid-cols-3">
          {partners.slice(8).map((card, i) => (
            <motion.article
              key={card.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group overflow-hidden rounded-[22px] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,136,255,0.12)]"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A13]/40 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="flex-1">
                  <h3 className="text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-[#050A13] sm:text-[1.05rem]">{card.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:text-[0.88rem]">{card.description}</p>
                </div>
                <Link href="/contact" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0088FF] transition group-hover:bg-[#0088FF] group-hover:text-white" aria-label={`Learn more about ${card.title}`}>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="relative mt-16 overflow-hidden rounded-[28px] bg-[#06111f]"
        >
          <div className="absolute inset-0">
            <Image src="/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png" alt="" fill className="object-cover object-center opacity-30" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/50" />
          </div>
          <div className="relative z-10 flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16">
            <h3 className="max-w-[640px] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              Trusted by Leading Properties{" "}
              <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                & Enterprises
              </span>
            </h3>
            <p className="mx-auto mt-4 max-w-[560px] text-[0.88rem] leading-6 text-white/65 sm:text-[0.94rem]">
              Smart Parking Across Connected Locations. Navigate through HalaPark parking facilities, partner properties, commercial destinations, residential communities, and intelligent mobility spaces designed for convenience, efficiency, and seamless parking experiences.
            </p>
            <p className="mx-auto mt-2 max-w-[560px] text-[0.88rem] leading-6 text-white/50 sm:text-[0.94rem]">
              Showcasing all our building partners, business partners, and parking success stories.
            </p>
            <Link
              href="/destinations"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.45)] transition hover:brightness-110"
            >
              Explore HalaPark Destinations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
