"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const serviceAudienceCards = [
  {
    title: "For Customers",
    description:
      "Easily locate available spaces, enter without delays, and complete payments through a smooth, fully digital experience.",
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
    description:
      "Easily integrate with barriers, cameras, and payment systems to create a unified parking solution without disrupting your current setup.",
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
  description,
  desktopWeight,
  href,
  imageAlt,
  imageClassName,
  imageSrc,
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
      className="relative isolate flex min-h-[420px] overflow-hidden rounded-[20px] bg-white p-4 will-change-transform sm:min-h-[520px] lg:min-h-[666px] lg:basis-0 lg:rounded-[12.5px] lg:p-[16.667px]"
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
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.32)_18%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0)_54%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: active && isDesktop ? 0.88 : 1 }
        }
        transition={prefersReducedMotion ? { duration: 0 } : gentleEase}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_38%,rgba(255,255,255,0.08)_66%,rgba(255,255,255,0.14)_100%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: active && isDesktop ? 0.72 : 1 }
        }
        transition={prefersReducedMotion ? { duration: 0 } : gentleEase}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        <motion.h3
          className="whitespace-pre-line pr-6 text-[clamp(2.2rem,2.6vw,2.95rem)] font-normal leading-[1.1] tracking-[-0.058em] text-black lg:pr-10"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: active && isDesktop ? 3 : 0 }
          }
          transition={prefersReducedMotion ? { duration: 0 } : contentSpring}
        >
          {title}
        </motion.h3>

        <motion.div
          className="relative flex flex-col gap-[11.667px] rounded-[18px] border border-white/25 bg-[rgba(217,217,217,0.20)] p-5 backdrop-blur-[12.5px] lg:rounded-[8.333px] lg:p-[16.667px]"
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
          <p className="max-w-[31ch] text-[0.95rem] leading-[1.4] tracking-[-0.02em] text-black sm:text-[1rem] lg:max-w-[500px] lg:text-[17px] lg:leading-[1.3]">
            {description}
          </p>

          <Link
            href={href}
            className={`inline-flex w-fit items-center justify-center rounded-full bg-black px-6 py-3 text-[1rem] leading-none tracking-[-0.035em] text-white transition-[transform,filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:brightness-105 focus-visible:scale-[1.03] focus-visible:outline-none lg:px-[18.333px] lg:py-[10px] lg:text-[19.167px] ${shellShadowClass}`}
          >
            Learn More
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
      className="bg-[#F4F8FF] py-14 sm:py-16 lg:py-[94px] xl:py-[108px]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[#0088FF] sm:text-[16px]">
            AI-POWERED PARKING SERVICE
          </p>

          <h2
            id="ai-powered-parking-service-title"
            className="mx-auto mt-4 max-w-[900px] text-[clamp(2.25rem,4vw,3.55rem)] font-medium leading-[1.03] tracking-[-0.06em] text-[#050A13]"
          >
            AI That Drives Smarter Parking Operations
          </h2>
        </div>

        <div
          className={`mx-auto mt-12 max-w-[1417px] rounded-[24px] bg-white p-4 ${shellShadowClass} sm:p-5 lg:mt-[88px] lg:rounded-[20px] lg:px-[25px] lg:py-[25px]`}
        >
          <div
            className="flex flex-col gap-[10px] lg:flex-row"
            onMouseLeave={() => setActiveCard(null)}
          >
            {serviceAudienceCards.map((card, index) => (
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
