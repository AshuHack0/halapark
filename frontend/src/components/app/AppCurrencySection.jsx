"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  MapPinned,
  ParkingCircle,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

// Name → lucide icon map for CMS-driven card features. `iconImage` (a URL)
// always overrides the mapped icon. No hardcoded text lives here.
const ICON_MAP = {
  WalletCards,
  ParkingCircle,
  MapPinned,
  ShieldCheck,
};

function CardIcon({ item }) {
  const iconImage = (item?.iconImage || "").trim();
  if (iconImage) {
    return (
      <Image
        src={iconImage}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
      />
    );
  }
  const Icon = ICON_MAP[item?.icon] ?? WalletCards;
  return <Icon aria-hidden="true" className="h-6 w-6" />;
}

function PhonePreview({ image }) {
  const src = (image || "").trim();
  if (!src) return null;

  return (
    <div className="relative mx-auto w-[230px] sm:w-[270px] lg:w-[300px] xl:w-[320px]">
      <div className="absolute inset-x-[18%] bottom-3 h-12 rounded-full bg-[#0F172A]/14 blur-[28px]" />
      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_28px_58px_rgba(15,23,42,0.2)]">
        <div className="absolute left-[4.1%] right-[4.1%] top-[1%] bottom-[1.2%] z-30 translate-y-[2px] overflow-hidden rounded-[3rem] bg-white">
          <Image
            src={src}
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

// Lightweight centered overlay modal explaining how to top up the wallet.
// Backdrop-click + Esc close, scroll lock. Steps are CMS-driven and RTL-aware.
function TopUpModal({ isOpen, onClose, title, steps, dir }) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="topup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4 py-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          dir={dir}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            key="topup-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[85vh] w-full max-w-[560px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-[0_32px_80px_rgba(2,6,23,0.28),0_4px_16px_rgba(2,6,23,0.1)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              {title ? (
                <h3 className="text-xl font-semibold text-[#050A13] [overflow-wrap:anywhere]">
                  {title}
                </h3>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0088FF] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    {step.title ? (
                      <p className="text-[15px] font-semibold text-[#050A13] [overflow-wrap:anywhere]">
                        {step.title}
                      </p>
                    ) : null}
                    {step.description ? (
                      <RichText
                        text={step.description}
                        className="mt-1 text-sm leading-6 text-[#667085] [overflow-wrap:anywhere] block"
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AppCurrencySection() {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  // CMS-only: the DB is the single source of truth. Start empty and render
  // strictly from what the fetch returns — no hardcoded content fallbacks.
  const [content, setContent] = useState({});
  const [resolved, setResolved] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPage("app")
      .then((data) => {
        const c = data?.sections?.currency;
        if (active && c && typeof c === "object") {
          setContent(c);
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
  if (content?.enabled === false) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  const title = t(content, "title", language);
  const description = t(content, "description", language);
  const image = (content.image || "").trim();

  // Card features: strictly CMS, keep only rows with real text.
  const cardFeatures = (
    Array.isArray(content.cardFeatures) ? content.cardFeatures : []
  ).filter(
    (c) => t(c, "title", language).trim() || t(c, "subtitle", language).trim()
  );

  // Top-up steps: keep only rows with a title or description in this language.
  const topUpSteps = (
    Array.isArray(content.topUpSteps) ? content.topUpSteps : []
  )
    .map((step) => ({
      title: t(step, "title", language),
      description: t(step, "description", language),
    }))
    .filter((step) => step.title.trim() || step.description.trim());

  const topUpLabel = t(content, "topUpLabel", language);
  const showTopUp = topUpLabel.trim() !== "" && topUpSteps.length > 0;

  // Hide the whole section when it carries no real content.
  const hasText = title.trim() !== "" || description.trim() !== "";
  if (!hasText && cardFeatures.length === 0 && image === "") return null;

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
            dir={dir}
          >
            {title ? (
              <h2 className="max-w-[590px] text-[clamp(2.25rem,5.6vw,4.25rem)] font-semibold leading-[1.03] tracking-tight text-[#050A13] lg:leading-[0.99] [overflow-wrap:anywhere]">
                {title}
              </h2>
            ) : null}

            {description ? (
              <RichText
                text={description}
                className="mt-5 block max-w-[500px] text-base font-light leading-7 text-[#667085] sm:text-[17px] [overflow-wrap:anywhere]"
              />
            ) : null}

            {showTopUp ? (
              <button
                type="button"
                onClick={() => setTopUpOpen(true)}
                className="mt-7 inline-flex w-full max-w-[315px] items-center justify-between rounded-2xl bg-[#0088FF] px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_32px_rgba(0,136,255,0.24)] transition hover:brightness-95"
              >
                <span className="inline-flex items-center gap-3">
                  <WalletCards aria-hidden="true" className="h-6 w-6" />
                  <span className="[overflow-wrap:anywhere]">{topUpLabel}</span>
                </span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 rtl:rotate-180" />
              </button>
            ) : null}

            {cardFeatures.length > 0 ? (
              <div
                className={`mt-8 grid gap-3 lg:max-w-[610px] ${
                  cardFeatures.length === 1
                    ? "sm:grid-cols-1"
                    : cardFeatures.length === 2
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-3"
                }`}
              >
                {cardFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-[#E4EAF2] bg-white/82 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.04)]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E9F3FF] text-[#0088FF]">
                      <CardIcon item={item} />
                    </span>
                    <p className="text-sm leading-5 text-[#344054] [overflow-wrap:anywhere]">
                      <span className="font-semibold">
                        {t(item, "title", language)}
                      </span>
                      {t(item, "subtitle", language).trim() ? (
                        <>
                          <br />
                          <span className="text-[#667085]">
                            {t(item, "subtitle", language)}
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>

          {image ? (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
              className="relative z-10 flex min-h-[420px] items-center justify-center lg:min-h-0 lg:justify-center"
            >
              <PhonePreview image={image} />
            </motion.div>
          ) : null}
        </div>
      </div>

      <TopUpModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        title={topUpLabel}
        steps={topUpSteps}
        dir={dir}
      />
    </motion.section>
  );
}
