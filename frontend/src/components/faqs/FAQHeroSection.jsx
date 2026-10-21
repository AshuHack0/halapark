"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

// CMS-only hero: the DB is the single source of truth (seeded). No hardcoded
// fallbacks — anything deleted from the database simply doesn't render.
export default function FAQHeroSection() {
  const { language } = useLanguage();
  const [hero, setHero] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage("faqs")
      .then((data) => {
        if (active && data?.sections?.hero) {
          setHero(data.sections.hero);
        }
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!resolved) return null;
  if (hero?.enabled === false) return null;

  const image = (hero.image || "").trim();

  // Hide the whole hero when everything has been cleared from admin.
  const hasContent =
    (hero.title || "").trim() || (hero.description || "").trim() || image;
  if (!hasContent) return null;

  const title = t(hero, "title", language);
  const description = t(hero, "description", language);
  const titleParts = (title || "").split("?");
  const firstPart = titleParts[0] ? titleParts[0] + "?" : "";
  const secondPart = titleParts[1]?.trim() || "";

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#02376B] text-white">
          <div className="absolute inset-0">
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center"
                aria-hidden
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#02376B_0%,rgba(2,55,107,0.92)_30%,rgba(10,76,148,0.45)_60%,transparent_100%)] rtl:bg-[linear-gradient(270deg,#02376B_0%,rgba(2,55,107,0.92)_30%,rgba(10,76,148,0.45)_60%,transparent_100%)]" />
          </div>
          <div className="relative flex min-h-[320px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[380px] lg:px-20">
            <div className="relative z-10 w-full max-w-xl">
              {title ? (
                /* First part on one line; the gradient part on its own second
                   line, matching the sitewide heading pattern. */
                <h1 className="text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl [overflow-wrap:anywhere]">
                  <span className="block">{firstPart}</span>
                  {secondPart ? (
                    <span className="block bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                      {secondPart}
                    </span>
                  ) : null}
                </h1>
              ) : null}
              {description ? (
                <RichText text={description} className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base [overflow-wrap:anywhere] block" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
