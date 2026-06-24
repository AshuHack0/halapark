"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const DEFAULT_HERO = {
  title: "Got Questions? We've Got Answers.",
  description: "Find helpful information about HalaPark's smart parking solutions, system features, payments, access, and operations — all organized into easy-to-browse categories for a faster and smoother experience.",
  image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
};

export default function FAQHeroSection() {
  const { language } = useLanguage();
  const [hero, setHero] = useState({});

  useEffect(() => {
    fetchPage("faqs").then((data) => {
      if (data?.sections?.hero) {
        setHero(data.sections.hero);
      }
    });
  }, []);

  const titleParts = (t(hero, "title", language) || "").split("?");
  const firstPart = titleParts[0] ? titleParts[0] + "?" : "";
  const secondPart = titleParts[1]?.trim() || "";

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <Image
              src={hero.image || DEFAULT_HERO.image}
              alt=""
              fill
              className="object-cover object-center opacity-30"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/40" />
          </div>
          <div className="relative flex min-h-[320px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[380px] lg:px-20">
            <div className="relative z-10 w-full max-w-xl">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                {firstPart}{" "}
                <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                  {secondPart}
                </span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                {t(hero, "description", language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
