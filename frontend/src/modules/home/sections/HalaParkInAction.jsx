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
        <p className="truncate text-[8px] font-normal text-[#5B6779] sm:text-[9.2px]">
          {eyebrow}
        </p>
        <p className="mt-1.5 truncate text-[13px] font-medium tracking-[-0.03em] text-[#0A1B33] sm:mt-2 sm:overflow-visible sm:whitespace-normal sm:text-[15px]">
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
    className: "flex min-w-0 items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-[0_2px_10px_rgba(15,23,42,0.08)]",
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
        ar: {
          ...d.ar,
          title: d.ar?.heading ?? d.ar?.title,
          subtitle: d.ar?.subtitle,
          eyebrow: d.ar?.eyebrow,
          headingAccent: d.ar?.headingAccent,
          downloadLabel: d.ar?.downloadLabel,
        },
        enabled: d.enabled,
        title: d.heading || d.title || "",
        subtitle: d.subtitle || "",
        // Small label above the heading, the blue second line, and the label
        // beside the store buttons — each hides when the admin leaves it blank.
        eyebrow: (d.eyebrow || "").trim(),
        headingAccent: (d.headingAccent || "").trim(),
        downloadLabel: (d.downloadLabel || "").trim(),
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

  const eyebrow = t(copy, "eyebrow", language);
  const headingAccent = t(copy, "headingAccent", language);
  const downloadLabel = t(copy, "downloadLabel", language);

  return (
    <motion.section
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.28 }}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#F4F9FF_0%,#EAF4FF_48%,#DBEDFF_100%)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        {/* ── LEFT: eyebrow, heading, copy, download strip ── */}
        <motion.div variants={prefersReducedMotion ? undefined : copyStackVariants}>
          {eyebrow ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : copyItemVariants}
              className="mb-5 flex items-center gap-3"
            >
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#4A5A70] [overflow-wrap:anywhere]">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-24 bg-gradient-to-r from-[#0088FF]/60 to-transparent" />
            </motion.div>
          ) : null}

          <motion.h2
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#0A1B33] [overflow-wrap:anywhere]"
          >
            <span className="block">{t(copy, "title", language)}</span>
            {headingAccent ? <span className="block text-[#0088FF]">{headingAccent}</span> : null}
          </motion.h2>

          <motion.p
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="mt-5 max-w-[520px] text-[0.95rem] leading-7 text-[#49566B] sm:text-[1rem] [overflow-wrap:anywhere]"
          >
            {t(copy, "subtitle", language)}
          </motion.p>

          {storeLinks.length > 0 ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : copyItemVariants}
              className="mt-9 inline-flex w-full flex-col gap-4 rounded-[22px] bg-white/70 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-white sm:w-auto sm:flex-row sm:items-center sm:gap-5 sm:p-5"
            >
              {downloadLabel ? (
                <p className="max-w-[140px] text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-[#0A1B33] [overflow-wrap:anywhere]">
                  {downloadLabel}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
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
              </div>
            </motion.div>
          ) : null}
        </motion.div>

        {/* ── RIGHT: artwork on a soft blue disc ── */}
        {copy.image ? (
          <motion.div
            variants={prefersReducedMotion ? undefined : previewImageVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,136,255,0.18),rgba(0,136,255,0.06)_55%,transparent_72%)]"
            />
            <Image
              src={copy.image}
              alt={copy.imageAlt || t(copy, "title", language) || "HalaPark app preview"}
              width={1600}
              height={1200}
              className="relative h-auto w-full"
              priority
            />
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}
