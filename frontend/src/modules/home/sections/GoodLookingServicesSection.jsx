"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

// Map a CMS service (from the Services page) to the card shape this section uses.
function toCard(svc) {
  return {
    slug: svc.slug,
    name: svc.name,
    summary: svc.summary || svc.fullDesc || svc.description || "",
    mediaType: svc.mediaType,
    mediaSrc: svc.mediaSrc,
    ar: svc.ar,
  };
}

function ServiceCard({ service, index, cardRef, isActive, language }) {
  const prefersReducedMotion = useReducedMotion();

  const highlights = Array.isArray(service.highlights)
    ? service.highlights.slice(0, 5)
    : [];

  const scrollMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: {
          once: false,
          amount: 0.15,
          margin: "0px 0px -100px 0px",
        },
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.06,
        },
      };

  return (
    <motion.article
      ref={cardRef}
      {...scrollMotion}
      className={`group relative rounded-[22px] transition-shadow duration-300 sm:rounded-[26px] lg:rounded-[30px] ${
        isActive
          ? "shadow-[0_0_34px_rgba(0,136,255,0.42)]"
          : ""
      }`}
    >
      <Link
        href="/services"
        className="block overflow-hidden rounded-[22px] bg-[#fbfdff] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_4px_rgba(6,6,22,0.1),0_10px_24px_-6px_rgba(6,6,22,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 sm:rounded-[26px] lg:rounded-[30px] focus-visible:outline-none focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_4px_rgba(6,6,22,0.1),0_10px_24px_-6px_rgba(6,6,22,0.14),0_0_34px_rgba(0,136,255,0.42)]"
        aria-label={`Open services page`}
      >
        <div className="relative h-[190px] w-full bg-[#d2dae2] sm:h-[230px] lg:h-[260px]">
          {service.mediaType === "video" && service.mediaSrc ? (
            <video
              src={service.mediaSrc}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : service.mediaSrc ? (
            <Image
              src={service.mediaSrc}
              alt={service.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_55%)] opacity-70" />
        </div>

        <div className="px-6 pb-7 pt-6 sm:px-7 sm:pb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Service 0{index + 1}
              </p>
              <h3 className="mt-2 text-[1.35rem] font-medium tracking-tight text-slate-950 sm:text-[1.6rem]">
                {t(service, "name", language)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {t(service, "summary", language)}
              </p>
            </div>

            <span className="mt-1 inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#fbfdff] text-slate-900 shadow-[0_4px_14px_rgba(6,6,22,0.06)] transition-transform duration-300 ease-out group-hover:rotate-12">
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          
        </div>
      </Link>
    </motion.article>
  );
}

export default function GoodLookingServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const cardRefs = useRef([]);

  // Home Services cards are managed in the Home editor (goodLookingServices.cards).
  const [services, setServices] = useState([]);
  const [copy, setCopy] = useState({});

  useEffect(() => {
    fetchHomeSection("goodLookingServices").then((d) => {
      if (d && typeof d === "object") {
        // Only cards with real text count — a cleared card must not render an
        // empty card shell.
        setServices(
          (Array.isArray(d.cards) ? d.cards : [])
            .map(toCard)
            .filter(
              (c) => ((c.name ?? "").trim()) || ((c.summary ?? "").trim()),
            ),
        );
        setCopy((prev) => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(d)
              .filter(([k]) => k !== "cards" && k !== "parkingIntegrations")
              .filter(([, v]) => v !== "" && v != null),
          ),
        }));
      }
    });
  }, []);

  const featuredServices = services;

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    const scrollTarget =
      scrollContainer instanceof HTMLElement ? scrollContainer : window;
    let frameId = null;

    const updateActiveService = () => {
      frameId = null;

      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) {
        return;
      }

      const viewportHeight =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.clientHeight
          : window.innerHeight;
      const anchorY = viewportHeight * 0.48;
      let nextIndex = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((cardEl, index) => {
        const rect = cardEl.getBoundingClientRect();
        const isVisible = rect.bottom > 120 && rect.top < viewportHeight - 80;
        if (!isVisible) {
          return;
        }

        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenterY - anchorY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== null) {
        setActiveServiceIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      }
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }
      frameId = window.requestAnimationFrame(updateActiveService);
    };

    requestUpdate();
    scrollTarget.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      scrollTarget.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeService = featuredServices[activeServiceIndex] ?? featuredServices[0] ?? {};
  const activeHighlights = Array.isArray(activeService?.highlights)
    ? activeService.highlights.slice(0, 3)
    : [];

  // Hide the section entirely when the admin hasn't entered any content:
  // no heading (EN) and no service cards.
  // Hide the section entirely when the admin has cleared all content: no
  // heading, no cards with text, and no CTA labels.
  if (copy?.enabled === false) return null;
  if (
    !((copy.heading ?? "").trim()) &&
    featuredServices.length === 0 &&
    !((copy.exploreCtaLabel ?? "").trim()) &&
    !((copy.contactCtaLabel ?? "").trim())
  )
    return null;

  return (
    <section
      id="services"
      aria-labelledby="services-section-title"
      className="relative overflow-x-clip bg-[#f0f2f4] py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-[linear-gradient(180deg,rgba(240,242,244,1)_0%,rgba(240,242,244,0)_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 z-[1] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,136,255,0.22),rgba(0,136,255,0)_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-[1] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.18),rgba(20,184,166,0)_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-[980px] text-center sm:mb-12 lg:mb-16">
          
          <h2
            id="services-section-title"
            className="mx-auto mt-4 max-w-[980px] text-[clamp(2.75rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]"
          >
            {t(copy, "heading", language)}
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:pb-10">
          <motion.div
            className="max-w-xl lg:sticky lg:top-28 lg:self-start"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 32 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: {
                    once: false,
                    amount: 0.2,
                    margin: "0px 0px -80px 0px",
                  },
                  transition: {
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  },
                })}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
              Service 0{activeServiceIndex + 1}
            </p>
            <motion.div
              key={activeService.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Service 0{activeServiceIndex + 1}
              </p> */}
              <h2 className="mt-3 text-[clamp(2rem,3.25vw,3rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-[#050A13]">
                {t(activeService, "name", language)}
              </h2>
              <p className="mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
                {t(activeService, "summary", language)}
              </p>
              {/* <div className="mt-5 flex flex-wrap gap-2.5">
                {activeHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-slate-300/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-700 backdrop-blur-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div> */}
            </motion.div>

            {t(copy, "exploreCtaLabel", language) || t(copy, "contactCtaLabel", language) ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {t(copy, "exploreCtaLabel", language) ? (
                  <Link
                    href={copy.exploreCtaLink || "/services"}
                    className="inline-flex min-h-[3.05rem] items-center justify-center rounded-full bg-[#0088FF] px-7 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.14)] transition hover:bg-[#0088FF]"
                  >
                    {t(copy, "exploreCtaLabel", language)}
                  </Link>
                ) : null}
                {t(copy, "contactCtaLabel", language) ? (
                  <Link
                    href={copy.contactCtaLink || "/contact"}
                    className="inline-flex min-h-[3.05rem] items-center justify-center rounded-full border border-slate-300/70 bg-white/60 px-7 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-[#0088FF] hover:text-[#0088FF]"
                  >
                    {t(copy, "contactCtaLabel", language)}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:flex lg:grid-cols-none lg:gap-6"
          >
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                isActive={activeServiceIndex === index}
                language={language}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-[#f0f2f4] via-[#f0f2f4]/82 to-transparent backdrop-blur-md [mask-image:linear-gradient(180deg,transparent_0%,black_38%,black_100%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,black_38%,black_100%)] sm:h-48 md:h-56"
      />
    </section>
  );
}
