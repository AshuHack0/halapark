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
  index,
  prefersReducedMotion,
}) {
  return (
    <motion.div
      custom={index}
      variants={prefersReducedMotion ? undefined : badgeVariants}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
    >
      <div className="relative shrink-0">
        <div className="absolute inset-1 rounded-[18px] bg-[#0088FF]/12 blur-md" />
        <Image
          src={icon}
          alt={alt}
          width={50}
          height={50}
          className="relative h-10 w-10 rounded-[14px] object-contain shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:h-[50px] sm:w-[50px] sm:rounded-[16px]"
        />
      </div>

      <div className="min-w-0 text-left leading-none">
        <p className="text-[8px] font-normal text-[#0F172A] sm:text-[9.2px]">
          {eyebrow}
        </p>
        <p className="mt-1.5 truncate text-[13px] font-medium tracking-[-0.03em] text-[#050A13] sm:mt-2 sm:text-[16.6px]">
          {label}
        </p>
      </div>
    </motion.div>
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
        title: d.heading || d.title || "",
        subtitle: d.subtitle || "",
        storeLinks: Array.isArray(d.storeLinks) ? d.storeLinks : [],
      });
    };
    if (pageSlug) {
      fetchPage(pageSlug).then((data) => apply(data?.sections?.[cmsKey]));
    } else {
      fetchHomeSection(cmsKey).then(apply);
    }
  }, [cmsKey, pageSlug]);

  const storeLinks = copy.storeLinks || [];

  // Hide the section entirely when the admin hasn't entered any content:
  // no title (EN), no subtitle (EN), and no store links.
  if (!copy.title && !copy.subtitle && storeLinks.length === 0) return null;

  return (
    <motion.section
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.28 }}
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[24px] border border-[rgba(0,136,255,0.14)] bg-[linear-gradient(92deg,#FFFFFF_0%,rgba(0,136,255,0.05)_27%,rgba(0,136,255,0.12)_60%,rgba(0,136,255,0.22)_100%)] shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
          <div className="grid items-center gap-6 lg:items-end lg:min-h-[390px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <motion.div
              variants={prefersReducedMotion ? undefined : copyStackVariants}
              className="flex h-full flex-col justify-between px-5 pb-6 pt-6 sm:px-10 md:px-14 lg:py-[40px] lg:pl-[58px] lg:pr-6"
            >
              <div className="max-w-[560px]">
                <motion.h1
                  variants={prefersReducedMotion ? undefined : copyItemVariants}
                  className="max-w-[560px] text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]"
                >
                  {t(copy, "title", language)}
                </motion.h1>

                <motion.p
                  variants={prefersReducedMotion ? undefined : copyItemVariants}
                  className="mt-3 max-w-[650px] text-[0.88rem] font-light leading-6 text-[#8A94A6] sm:text-[0.94rem] [overflow-wrap:anywhere]"
                >
                  {t(copy, "subtitle", language)}
                </motion.p>

               
              </div>

              <motion.div
                variants={prefersReducedMotion ? undefined : copyItemVariants}
                className="mt-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6"
              >
                {storeLinks.map((store, index) => (
                  <StoreBadge
                    key={store.label}
                    {...store}
                    eyebrow={t(store, "eyebrow", language)}
                    label={t(store, "label", language)}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            </motion.div>

            <div className="relative flex min-h-[250px] items-end justify-start sm:min-h-[310px] lg:min-h-[390px] lg:self-end">
              <div aria-hidden="true" className="absolute right-[6%] top-[15%]">
                <div className="h-[180px] w-[180px] rounded-full bg-[#0088FF]/25 blur-[78px] sm:h-[220px] sm:w-[220px] lg:h-[280px] lg:w-[280px]" />
              </div>

              <div className="relative z-10 flex h-full w-full max-w-[600px] items-end lg:translate-x-10 xl:max-w-[680px]">
                <div className="absolute bottom-[6%] left-[8%] right-[12%] h-10 rounded-full bg-[#0F172A]/12 blur-2xl sm:h-14" />

                <motion.div
                  variants={prefersReducedMotion ? undefined : previewImageVariants}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView={prefersReducedMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/UI/hf_20260401_051940_148a185a-d002-45bf-87b7-80e45dd5de5e 1.png"
                    alt="HalaPark mobile app preview"
                    width={2352}
                    height={1236}
                    className="relative h-full w-full object-contain object-bottom-right"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
