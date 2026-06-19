"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";

const serviceAudienceCards = [
  {
    title: "For User",
    ctaLabel: "View for Customer",
    audienceTag: "APP EXPERIENCE",
    description:
      "Intelligent automation helps you find and access available parking faster, reducing wait time and making every journey smooth and stress-free.",
    href: "/app",
    imageSrc: "/ForCustomers.png",
    imageAlt: "Parking service for customers",
    backgroundColor: "#ffffff",
    activeImageX: -10,
    imageClassName:
      "object-cover object-center lg:object-[center_35%] xl:object-[center_32%]",
  },
  {
    title: "For Businesses /\nProperty owners",
    ctaLabel: "View for Business",
    audienceTag: "BUSINESS SUITE",
    description:
      "Advanced automation streamlines parking management, improves space utilization, and delivers real-time insights to increase efficiency and revenue.",
    href: "/business",
    imageSrc: "/ForEnterprises.png",
    imageAlt: "Parking service for businesses and property owners",
    backgroundColor: "#ffffff",
    activeImageX: 10,
    imageClassName:
      "object-cover object-center lg:object-[center_28%] xl:object-[center_24%]",
  },
];

const shellShadowClass =
  "shadow-[-8.333px_8.333px_58.333px_16.667px_rgba(0,0,0,0.10)]";
const shellShadowValue = "-8.333px 8.333px 58.333px 16.667px rgba(0,0,0,0.10)";
const cardLiftShadow = "-10px 14px 68px 14px rgba(0,0,0,0.10)";
const cardSpring = { type: "spring", stiffness: 118, damping: 24, mass: 0.95 };
const contentSpring = {
  type: "spring",
  stiffness: 160,
  damping: 24,
  mass: 0.88,
};
const gentleEase = { duration: 0.58, ease: [0.22, 1, 0.36, 1] };

function AudienceCard({
  active,
  activeImageX,
  audienceTag,
  description,
  desktopWeight,
  href,
  imageAlt,
  imageClassName,
  imageSrc,
  ctaLabel,
  isDesktop,
  prefersReducedMotion,
  title,
  backgroundColor,
  onActivate,
  onDeactivate,
}) {
  return (
    <motion.article
      layout={!prefersReducedMotion}
      className="relative isolate flex min-h-[360px] overflow-hidden rounded-[20px] border border-white/60 bg-white p-3.5 ring-1 ring-[#cfe5ff] will-change-transform sm:min-h-[430px] lg:min-h-[520px] lg:basis-0 lg:rounded-[16px] lg:p-3.5"
      style={{ backgroundColor }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              flexGrow: isDesktop ? desktopWeight : 1,
              y: isDesktop && active ? -2 : 0,
              boxShadow:
                isDesktop && active
                  ? cardLiftShadow
                  : "0px 0px 0px 0px rgba(0,0,0,0)",
            }
      }
      transition={prefersReducedMotion ? { duration: 0 } : cardSpring}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onDeactivate();
        }
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: active ? 1.02 : 1,
                x: active ? activeImageX : 0,
                y: active ? -6 : 0,
                filter: active ? "saturate(1.04)" : "saturate(1)",
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : contentSpring}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 48vw, 100vw"
          className={`${imageClassName} select-none`}
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_22%,rgba(255,255,255,0.14)_40%,rgba(255,255,255,0.02)_58%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: active && isDesktop ? 0.88 : 1 }
        }
        transition={prefersReducedMotion ? { duration: 0 } : gentleEase}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0)_32%,rgba(10,22,40,0.12)_66%,rgba(10,22,40,0.36)_100%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: active && isDesktop ? 0.72 : 1 }
        }
        transition={prefersReducedMotion ? { duration: 0 } : gentleEase}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center rounded-full border border-[#b9d9ff] bg-white/85 px-3 py-1 text-[10px] font-semibold tracking-[0.13em] text-[#006fd2] backdrop-blur-sm sm:text-[11px]">
            {audienceTag}
          </span>
          <motion.h3
            className="whitespace-pre-line pr-6 text-[clamp(2.2rem,2.7vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#071221] lg:pr-8"
            animate={
              prefersReducedMotion
                ? undefined
                : { y: active && isDesktop ? 3 : 0 }
            }
            transition={prefersReducedMotion ? { duration: 0 } : contentSpring}
          >
            {title}
          </motion.h3>
        </div>

        <motion.div
          className="relative flex flex-col gap-3 rounded-[18px] border border-white/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(210,230,255,0.38))] p-4 backdrop-blur-[13px] lg:rounded-[12px] lg:p-4"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: !isDesktop || active ? 1 : 0,
                  y: !isDesktop || active ? 0 : 108,
                  scale: !isDesktop || active ? 1 : 0.985,
                  boxShadow:
                    !isDesktop || active
                      ? shellShadowValue
                      : "0px 0px 0px 0px rgba(0,0,0,0)",
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  ...contentSpring,
                  delay: active && isDesktop ? 0.06 : 0,
                }
          }
          style={{
            pointerEvents: !isDesktop || active ? "auto" : "none",
          }}
        >
          <p className="max-w-[31ch] text-[0.82rem] leading-[1.42] tracking-[-0.015em] text-black [overflow-wrap:anywhere] line-clamp-5 sm:text-[0.88rem] lg:max-w-[420px] lg:text-[14px] lg:leading-[1.38]">
            {description}
          </p>

          <Link
            href={href}
            className={`inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/45 bg-[linear-gradient(135deg,#0750b9_0%,#0088FF_100%)] px-5 py-2.5 text-[0.96rem] font-semibold leading-none tracking-[-0.01em] text-white ring-1 ring-black/10 transition-[transform,filter,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:brightness-105 focus-visible:scale-[1.03] focus-visible:outline-none lg:px-5 lg:py-2.5 lg:text-[16px] ${shellShadowClass}`}
          >
            {ctaLabel}
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
//
export default function AiPoweredParkingService() {
  const [activeCard, setActiveCard] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  // Merge CMS text fields onto the hardcoded cards (keep UI-only props like image).
  const [cards, setCards] = useState(serviceAudienceCards);

  useEffect(() => {
    fetchHomeSection("aiPoweredParking").then((d) => {
      const cmsCards = d?.cards;
      if (Array.isArray(cmsCards) && cmsCards.length) {
        setCards(serviceAudienceCards.map((base, i) => ({ ...base, ...(cmsCards[i] ?? {}) })));
      }
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncDesktopState = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncDesktopState();
    mediaQuery.addEventListener("change", syncDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", syncDesktopState);
    };
  }, []);

  return (
    <section
      aria-labelledby="ai-powered-parking-service-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F7FBFF_0%,#EAF4FF_100%)] py-10 sm:py-12 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,136,255,0.03)_0,rgba(0,136,255,0.03)_1px,transparent_1px,transparent_64px)] opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-14 h-64 w-64 rounded-full bg-[#0088FF]/15 blur-3xl" />
      <div className="pointer-events-none absolute left-[42%] top-2 h-52 w-52 rounded-full bg-[#74D1FF]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-4 h-72 w-72 rounded-full bg-[#6CC0FF]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <h2
            id="ai-powered-parking-service-title"
            className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold uppercase leading-[1.01] tracking-[-0.06em] text-[#050A13]"
          >
            AI-POWERED PARKING{" "}
            <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
              SERVICE
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
            Smarter Parking Operations with AI Intelligence. AI-powered
            automation enhances the parking experience for both users and
            operators with faster access, smoother operations, and reliable
            management.
          </p>
        </div>

        <div
          className={`mx-auto mt-8 max-w-[1417px] rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(246,251,255,0.84))] p-3.5 backdrop-blur-sm ${shellShadowClass} sm:p-4 lg:mt-10 lg:rounded-[24px] lg:px-4 lg:py-4`}
        >
          <div
            className="flex flex-col gap-3 lg:flex-row"
            onMouseLeave={() => setActiveCard(null)}
          >
            {cards.map((card, index) => (
              <AudienceCard
                key={card.title}
                {...card}
                active={activeCard === index}
                desktopWeight={
                  activeCard === null ? 1 : activeCard === index ? 1.086 : 0.914
                }
                isDesktop={isDesktop}
                prefersReducedMotion={prefersReducedMotion}
                onActivate={() => setActiveCard(index)}
                onDeactivate={() => setActiveCard(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
