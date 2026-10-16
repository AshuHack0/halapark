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
          
          <Image
            src={icon}
            alt={alt || label || "Store"}
            width={50}
            height={50}
            className="relative h-7 w-7 rounded-[9px] object-contain sm:h-8 sm:w-8 sm:rounded-[10px]"
          />
        </div>
      ) : null}

      <div className="min-w-0 text-start leading-none">
        <p className="truncate text-[7px] font-normal uppercase tracking-[0.06em] text-white/70 sm:text-[7.5px]">
          {eyebrow}
        </p>
        <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-white sm:text-[13px]">
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
    className: "flex min-w-0 shrink-0 items-center gap-2 rounded-[10px] bg-[#0A1B33] px-2.5 py-1.5",
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
      className="relative overflow-hidden bg-[#F6FBFF] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      {/* Background rebuilt from the reference: white on the left, and on the
          right one huge sky-blue circle (its left arc cuts through the section)
          over a lighter wash, with a pale sphere top-right and a deeper glow in
          the bottom-right corner. Pure CSS. */}
      {/* Light blue wash on the far right, behind the circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(199,230,253,0)_55%,#C7E6FD_100%)] rtl:-scale-x-100"
      />
      {/* One perfect circle that runs off the top, right and bottom edges, so
          only its left arc shows (bulging to ~54% of the width mid-height, as
          in the client's sketch) and the artwork sits inside. Inside: a glossy
          highlight, two concentric rings and a dot grid at the bottom-right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8%] right-0 aspect-square h-[100%] translate-x-1/2 overflow-hidden rounded-full bg-[linear-gradient(172deg,#7AC6F7_0%,#93D2FB_30%,#B9E1FC_60%,#D4ECFD_85%,#E0F1FD_100%)] shadow-[inset_0_0_0_26px_rgba(255,255,255,0.22)] lg:bottom-auto lg:left-[54%] lg:top-[-63%] lg:h-[201%] lg:translate-x-0 rtl:right-auto rtl:left-0 rtl:-translate-x-1/2 rtl:lg:left-auto rtl:lg:right-[54%] rtl:lg:translate-x-0 rtl:-scale-x-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.18)_26%,rgba(255,255,255,0)_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1.6px)] bg-[size:22px_22px] opacity-35 [mask-image:radial-gradient(circle_at_60%_70%,#000_0%,transparent_55%)]" />
        <div className="absolute inset-[5%] rounded-full border border-white/45" />
        <div className="absolute inset-[11%] rounded-full border border-white/25" />
      </div>
      {/* Pale sphere at the top-right, as in the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-30%] hidden aspect-square h-[88%] rounded-full bg-[radial-gradient(circle_at_40%_42%,#DCEFFE_0%,#C6E6FD_58%,#B9E0FC_100%)] lg:block rtl:right-auto rtl:left-[-10%]"
      />
      {/* Second, smaller circle in the bottom-right corner that sits behind the
          phone in the artwork; a touch deeper so it reads as its own ring. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12%] right-[-18%] aspect-square h-[46%] overflow-hidden rounded-full bg-[linear-gradient(115deg,#9AD6FE_0%,#73C6FA_45%,#5EB5F3_100%)] shadow-[0_0_0_1.5px_rgba(255,255,255,0.6),0_-18px_50px_rgba(31,112,196,0.18)] lg:bottom-[-36%] lg:right-[-12%] lg:h-[88%] rtl:right-auto rtl:left-[-18%] rtl:lg:left-[-12%] rtl:-scale-x-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.15)_28%,rgba(255,255,255,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1.6px)] bg-[size:22px_22px] opacity-50 [mask-image:radial-gradient(circle_at_40%_40%,#000_0%,transparent_60%)]" />
        <div className="absolute inset-[5%] rounded-full border border-white/45" />
        <div className="absolute inset-[11%] rounded-full border border-white/25" />
      </div>
      {/* Deeper glow in the bottom-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_102%_106%,#5EBAF9_0%,rgba(94,186,249,0.5)_9%,rgba(94,186,249,0)_22%)] rtl:-scale-x-100"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        {/* ── LEFT: eyebrow, heading, copy, download strip ── */}
        <motion.div variants={prefersReducedMotion ? undefined : copyStackVariants}>
          {eyebrow ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : copyItemVariants}
              className="mb-4 flex items-center gap-3"
            >
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#4A5A70] [overflow-wrap:anywhere]">
                {eyebrow}
              </span>
              <span aria-hidden className="h-px w-24 bg-gradient-to-r from-[#0088FF]/60 to-transparent" />
            </motion.div>
          ) : null}

          <motion.h2
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0A1B33] [overflow-wrap:anywhere]"
          >
            <span className="block">{t(copy, "title", language)}</span>
            {headingAccent ? <span className="block text-[#0088FF]">{headingAccent}</span> : null}
          </motion.h2>

          <motion.p
            variants={prefersReducedMotion ? undefined : copyItemVariants}
            className="mt-4 max-w-[460px] text-[0.9rem] leading-6 text-[#49566B] [overflow-wrap:anywhere]"
          >
            {t(copy, "subtitle", language)}
          </motion.p>

          {storeLinks.length > 0 ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : copyItemVariants}
              className="mt-8 inline-flex w-full flex-col gap-3 rounded-[18px] bg-[#E8F3FF]/80 p-3 ring-1 ring-white sm:w-auto sm:flex-row sm:items-center sm:gap-4 sm:p-3.5"
            >
              {downloadLabel ? (
                <p className="max-w-[120px] shrink-0 text-[0.85rem] font-semibold leading-tight tracking-[-0.02em] text-[#0A1B33] [overflow-wrap:anywhere]">
                  {downloadLabel}
                </p>
              ) : null}
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto sm:gap-2.5 sm:overflow-visible">
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

        {/* ── RIGHT: artwork floats on the blue sphere ── */}
        {copy.image ? (
          <motion.div
            variants={prefersReducedMotion ? undefined : previewImageVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            className="relative ms-auto aspect-[4/3] w-full lg:w-[88%]"
          >
            {/* No mask or frame: the uploaded image (ideally a transparent PNG
                render) is shown whole, with a soft shadow for lift. */}
            <Image
              src={copy.image}
              alt={copy.imageAlt || t(copy, "title", language) || "HalaPark app preview"}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-contain object-center drop-shadow-[0_34px_60px_rgba(10,27,51,0.32)]"
              priority
            />
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}
