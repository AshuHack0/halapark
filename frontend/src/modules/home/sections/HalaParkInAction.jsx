"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchHomeSection, fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const sectionEase = [0.22, 1, 0.36, 1];

const copyStackVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const copyItemVariants = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: sectionEase,
    },
  },
};

const badgeVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.34 + index * 0.08,
      ease: sectionEase,
    },
  }),
};

const previewImageVariants = {
  hidden: {
    opacity: 0,
    y: 56,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.35,
      delay: 0.14,
      ease: sectionEase,
    },
  },
};

function StoreBadge({
  icon,
  alt,
  eyebrow,
  label,
  href,
  index,
  prefersReducedMotion,
}) {
  const content = (
    <>
      {icon ? (
        <div className="relative shrink-0">
          <div className="absolute inset-1 rounded-[18px] bg-[#0088FF]/12 blur-md" />
          <Image
            src={icon}
            alt={alt || label || "Store"}
            width={50}
            height={50}
            className="relative h-10 w-10 rounded-[14px] object-contain shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:h-[50px] sm:w-[50px] sm:rounded-[16px]"
          />
        </div>
      ) : null}

      <div className="min-w-0 text-start leading-none">
        <p className="truncate text-[8px] font-normal text-white/70 sm:text-[9.2px]">
          {eyebrow}
        </p>
        <p className="mt-1.5 truncate text-[13px] font-medium tracking-[-0.03em] text-white sm:mt-2 sm:overflow-visible sm:whitespace-normal sm:text-[15.5px] lg:text-[16.6px]">
          {label}
        </p>
      </div>
    </>
  );

  const sharedProps = {
    custom: index,
    variants: prefersReducedMotion ? undefined : badgeVariants,
    whileHover: prefersReducedMotion
      ? undefined
      : { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
    className: "flex w-full min-w-0 items-center gap-3 sm:w-auto sm:gap-3",
  };

  // With a store URL the whole badge is a link; without one it stays static.
  return href ? (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label || alt || "App store"}
      {...sharedProps}
    >
      {content}
    </motion.a>
  ) : (
    <motion.div {...sharedProps}>{content}</motion.div>
  );
}

// `cmsKey`/`pageSlug` let the same component pull from the right CMS section:
//   • Home page  → fetchHomeSection("halaParkInAction")
//   • App page   → fetchPage("app").sections.halapark
export default function HalaParkInAction({ cmsKey = "halaParkInAction", pageSlug }) {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [copy, setCopy] = useState({});

  useEffect(() => {
    const apply = (d) => {
      if (!d || typeof d !== "object") return;
      setCopy({
        // Admin saves the heading as `heading` (EN + ar.heading); the render reads
        // `title`, so remap the `ar` sub-object's heading→title to match.
        ar: { ...d.ar, title: d.ar?.heading ?? d.ar?.title, subtitle: d.ar?.subtitle },
        enabled: d.enabled,
        title: d.heading || d.title || "",
        subtitle: d.subtitle || "",
        // Right-side preview image — admin upload overrides the built-in art.
        image: (d.image || "").trim(),
        imageAlt: (d.imageAlt || "").trim(),
        // Only store links with real text count — a cleared item must not
        // render an empty icon/badge shell.
        storeLinks: (Array.isArray(d.storeLinks) ? d.storeLinks : []).filter(
          (s) =>
            s &&
            (((s.label ?? "").trim()) || ((s.eyebrow ?? "").trim())),
        ),
      });
    };
    if (pageSlug) {
      fetchPage(pageSlug).then((data) => apply(data?.sections?.[cmsKey]));
    } else {
      fetchHomeSection(cmsKey).then(apply);
    }
  }, [cmsKey, pageSlug]);

  const storeLinks = copy.storeLinks || [];

  // Admin can hide the section via the "Show this section" toggle.
  if (copy.enabled === false) return null;

  // Hide the section entirely when the admin has cleared all content:
  // no title/subtitle (EN, non-blank) and no store links with text.
  if (
    !((copy.title ?? "").trim()) &&
    !((copy.subtitle ?? "").trim()) &&
    storeLinks.length === 0
  )
    return null;

  return (
    <motion.section
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.28 }}
      className="relative isolate overflow-hidden bg-[#06111f]"
    >
      {/* Full-width banner: the image IS the section background, with the copy
          written over it. Removes the empty half the two-column card left. */}
      {copy.image ? (
        <>
          <Image
            src={copy.image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="-z-10 object-cover object-center"
            priority
          />
          {/* Scrim: heaviest behind the copy, clearing toward the far side.
              Mirrors for Arabic. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,20,0.9)_0%,rgba(3,10,20,0.72)_40%,rgba(3,10,20,0.35)_72%,rgba(3,10,20,0.15)_100%)] rtl:bg-[linear-gradient(270deg,rgba(3,10,20,0.9)_0%,rgba(3,10,20,0.72)_40%,rgba(3,10,20,0.35)_72%,rgba(3,10,20,0.15)_100%)]"
          />
          {/* Phones show the copy full width, so the sideways scrim alone is
              not enough — flat wash below lg. */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(3,10,20,0.5)] lg:hidden" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[520px] lg:px-8 lg:py-28">
        <motion.div
          variants={prefersReducedMotion ? undefined : copyStackVariants}
          className="max-w-[640px]"
        >
          <motion.h1
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-white [text-shadow:0_2px_24px_rgba(3,10,20,0.45)] [overflow-wrap:anywhere]"
          >
            {t(copy, "title", language)}
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="mt-4 max-w-[560px] text-[0.95rem] leading-7 text-slate-200 sm:text-[1rem] [overflow-wrap:anywhere]"
          >
            {t(copy, "subtitle", language)}
          </motion.p>

          {storeLinks.length > 0 ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : copyItemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
            >
              {storeLinks.map((store, index) => (
                <StoreBadge
                  key={store.label || index}
                  {...store}
                  eyebrow={t(store, "eyebrow", language)}
                  label={t(store, "label", language)}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
}
