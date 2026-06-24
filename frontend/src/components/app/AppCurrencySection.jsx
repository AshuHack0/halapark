"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  MapPinned,
  ParkingCircle,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const quickFeatures = [
  { title: "Top Up", subtitle: "your wallet", icon: WalletCards },
  { title: "Book & Pay", subtitle: "in seconds", icon: ParkingCircle },
  { title: "Track", subtitle: "in real-time", icon: MapPinned },
];

const defaultContent = {
  title: "Pay Instantly. Park Effortlessly. Stay in Control.",
  subtitle: "Smart Parking Flow",
  description:
    "Fast, cashless parking across the UAE with wallet, Apple Pay, and card options.",
  cardFeatures: quickFeatures,
};

function PhonePreview() {
  return (
    <div className="relative mx-auto w-[230px] sm:w-[270px] lg:w-[300px] xl:w-[320px]">
      <div className="absolute inset-x-[18%] bottom-3 h-12 rounded-full bg-[#0F172A]/14 blur-[28px]" />
      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_28px_58px_rgba(15,23,42,0.2)]">
        <div className="absolute left-[4.1%] right-[4.1%] top-[1%] bottom-[1.2%] z-30 translate-y-[2px] overflow-hidden rounded-[3rem] bg-white">
          <Image
            src="/Payment.png"
            alt="HalaPark payment screen"
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 300px, (min-width: 640px) 270px, 230px"
            className="object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src="/mobileframe.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 300px, (min-width: 640px) 270px, 230px"
            className="select-none object-contain"
          />
        </div>
      </div>

      <div className="absolute -left-10 top-20 hidden rounded-2xl border border-[#DDEBFF] bg-white px-3 py-2 shadow-[0_14px_34px_rgba(15,23,42,0.1)] sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0088FF]">
          Wallet
        </p>
        <p className="mt-1 text-sm font-semibold text-[#050A13]">AED 240</p>
      </div>

      <div className="absolute -right-8 bottom-24 hidden items-center gap-2 rounded-2xl border border-[#DDEBFF] bg-white px-3 py-2 shadow-[0_14px_34px_rgba(15,23,42,0.1)] sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0088FF]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-[#050A13]">Secured</p>
          <p className="text-[10px] font-medium text-[#667085]">Fast checkout</p>
        </div>
      </div>
    </div>
  );
}

export default function AppCurrencySection() {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    fetchPage("app").then((data) => {
      const c = data?.sections?.currency;
      if (!c || typeof c !== "object") return;

      setContent((prev) => {
        const next = { ...prev };
        if (c.title) next.title = c.title;
        if (c.subtitle) next.subtitle = c.subtitle;
        if (c.description) next.description = c.description;
        if (c.ar && typeof c.ar === "object") next.ar = c.ar;
        if (Array.isArray(c.cardFeatures) && c.cardFeatures.length > 0) {
          next.cardFeatures = c.cardFeatures.map((cmsCard, i) => ({
            ...(prev.cardFeatures[i] ?? {}),
            ...cmsCard,
          }));
        }
        return next;
      });
    });
  }, []);

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#E5EEFF] bg-[linear-gradient(112deg,#FFFFFF_0%,#F9FCFF_38%,#EEF6FF_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.05)]">
        <div className="relative grid min-h-[600px] gap-8 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-4 lg:px-10 xl:min-h-[640px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-8%] top-[18%] h-[330px] w-[330px] rounded-full bg-[#DCEBFF] blur-[2px] sm:h-[420px] sm:w-[420px] lg:right-[-1%] lg:top-[20%] lg:h-[500px] lg:w-[500px]"
          />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="relative z-20 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo-blue-11.svg"
                alt="HalaPark"
                width={132}
                height={38}
                className="h-8 w-auto"
              />
              <span className="hidden h-8 w-px bg-[#D8E6F7] sm:block" />
              <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[#8A94A6] sm:inline">
                Payments
              </span>
            </div>

            <p className="mt-8 inline-flex w-fit rounded-full border border-[#D7E7FF] bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0088FF] shadow-[0_8px_22px_rgba(15,23,42,0.04)] [overflow-wrap:anywhere]">
              {t(content, "subtitle", language)}
            </p>

            <h2 className="mt-5 max-w-[590px] text-[clamp(2.25rem,5.6vw,4.25rem)] font-semibold leading-[1.03] tracking-tight text-[#050A13] lg:leading-[0.99] [overflow-wrap:anywhere]">
              {t(content, "title", language)}
            </h2>

            <p className="mt-5 max-w-[500px] text-base font-light leading-7 text-[#667085] sm:text-[17px] [overflow-wrap:anywhere]">
              {t(content, "description", language)}
            </p>

            <button
              type="button"
              className="mt-7 inline-flex w-full max-w-[315px] items-center justify-between rounded-2xl bg-[#0088FF] px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_32px_rgba(0,136,255,0.24)] transition hover:brightness-95"
            >
              <span className="inline-flex items-center gap-3">
                <WalletCards aria-hidden="true" className="h-6 w-6" />
                Top Up Wallet
              </span>
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </button>

            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[#667085]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0088FF] text-white">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              Top up once, pay instantly every time.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-auto lg:max-w-[610px]">
              {content.cardFeatures.map((item, index) => {
                const Icon = item.icon ?? quickFeatures[index]?.icon ?? WalletCards;

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-[#E4EAF2] bg-white/82 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.04)]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9F3FF] text-[#0088FF]">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <p className="text-sm leading-5 text-[#344054] [overflow-wrap:anywhere]">
                      <span className="font-semibold">{t(item, "title", language)}</span>
                      <br />
                      <span className="text-[#667085]">{t(item, "subtitle", language)}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="relative z-10 flex min-h-[420px] items-center justify-center lg:min-h-0 lg:justify-center"
          >
            <PhonePreview />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
