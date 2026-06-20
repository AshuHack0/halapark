"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Check,
  CreditCard,
  Landmark,
  MapPin,
  WalletCards,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPage } from "@/lib/cms";

const features = [
  {
    title: "Real-Time\nParking Rates",
    description:
      "Always get the most accurate rates when booking across supported parking zones.",
    icon: BarChart3,
    preview: "rates",
  },
  {
    title: "Low Booking\nFees",
    description:
      "Transparent pricing with no hidden charges - what you see is what you pay.",
    icon: WalletCards,
    preview: "summary",
  },
  {
    title: "Seamless\nCity Transactions",
    description:
      "Reserve, extend, and pay effortlessly for your parking sessions in one smooth flow.",
    icon: Zap,
    preview: "payment",
  },
];

function RatesPreview() {
  return (
    <div className="relative h-[150px] overflow-hidden rounded-2xl bg-[#EEF6FF]">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-8%] top-[18%] h-8 w-[120%] rotate-[-24deg] bg-white" />
        <div className="absolute left-[-8%] top-[58%] h-8 w-[120%] rotate-[-24deg] bg-white" />
        <div className="absolute left-[28%] top-[-10%] h-[130%] w-8 rotate-[34deg] bg-white" />
        <div className="absolute left-[62%] top-[-10%] h-[130%] w-8 rotate-[34deg] bg-white" />
        <div className="absolute left-0 top-[46%] h-7 w-full rotate-[16deg] bg-[#DDF7DD]" />
      </div>

      <div className="absolute left-4 top-5 rounded-xl bg-white px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.12)]">
        <p className="text-xs font-semibold text-[#050A13]">AED 12/hr</p>
        <p className="text-[10px] font-medium text-[#8A94A6]">2 spots</p>
      </div>
      <div className="absolute right-12 top-10 rounded-xl bg-[#0088FF] px-4 py-3 text-white shadow-[0_16px_30px_rgba(0,136,255,0.28)]">
        <p className="text-xs font-semibold">AED 8/hr</p>
        <p className="text-[10px] font-medium text-white/80">5 spots</p>
      </div>
      <div className="absolute bottom-5 right-8 rounded-xl bg-white px-3 py-2 shadow-[0_12px_26px_rgba(15,23,42,0.12)]">
        <p className="text-xs font-semibold text-[#050A13]">AED 16/hr</p>
        <p className="text-[10px] font-medium text-[#8A94A6]">1 spot</p>
      </div>
      <span className="absolute bottom-[42px] left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#0088FF] text-white shadow-[0_12px_24px_rgba(0,136,255,0.24)]">
        <MapPin aria-hidden="true" className="h-5 w-5" fill="currentColor" />
      </span>
    </div>
  );
}

function SummaryPreview() {
  const rows = [
    ["Parking Zone", "Dubai Mall"],
    ["Duration", "2 Hours"],
    ["Parking Fee", "AED 16.00"],
    ["Booking Fee", "AED 1.00"],
  ];

  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-semibold text-[#050A13]">Booking Summary</p>
      <div className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#667085]">{label}</span>
            <span
              className={`font-semibold ${
                value === "AED 1.00" ? "text-[#16B364]" : "text-[#344054]"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#D8E1EE] pt-4">
        <span className="text-sm font-semibold text-[#050A13]">Total Payable</span>
        <span className="text-sm font-semibold text-[#0088FF]">AED 17.00</span>
      </div>
    </div>
  );
}

function PaymentPreview() {
  const methods = [
    { label: "VISA", value: "•••• 4242", active: true },
    { label: "MC", value: "•••• 8888", active: false },
    { label: "Pay", value: "", active: false },
  ];

  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-semibold text-[#050A13]">Select Payment Method</p>
      <div className="mt-4 space-y-2.5">
        {methods.map((method) => (
          <div
            key={method.label}
            className="flex items-center gap-3 rounded-xl border border-[#E8EEF7] bg-[#FBFDFF] px-3 py-2.5"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                method.active
                  ? "border-[#0088FF] text-[#0088FF]"
                  : "border-[#C8D0DC] text-transparent"
              }`}
            >
              <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="flex h-6 min-w-12 items-center justify-center rounded-md bg-white px-2 text-xs font-bold text-[#050A13] shadow-sm">
              {method.label === "MC" ? (
                <span className="flex items-center -space-x-1">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#F04438]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[#FDB022]" />
                </span>
              ) : method.label === "Pay" ? (
                <span className="text-sm">Pay</span>
              ) : (
                method.label
              )}
            </span>
            <span className="text-xs font-semibold text-[#344054]">
              {method.value}
            </span>
            {method.active ? (
              <span className="ml-auto rounded-md bg-[#E9FBEF] px-2 py-1 text-[10px] font-semibold text-[#16B364]">
                Default
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturePreview({ type }) {
  if (type === "rates") return <RatesPreview />;
  if (type === "summary") return <SummaryPreview />;
  return <PaymentPreview />;
}

export default function AppFeatureCardsSection() {
  const prefersReducedMotion = useReducedMotion();
  // Merge CMS text fields onto the hardcoded cards (keep UI-only props like icon/preview visual).
  const [cards, setCards] = useState(features);
  const [header, setHeader] = useState({
    heading: "Parking Made",
    headingAccent: "Simple, Smart & Reliable",
    description: "Powerful features designed to save you time, money, and effort.",
  });

  useEffect(() => {
    fetchPage("app").then((data) => {
      const cmsCards = data?.sections?.featureCards;
      if (Array.isArray(cmsCards) && cmsCards.length) {
        setCards(
          cmsCards.map((cms, i) => ({ ...(features[i] ?? {}), ...cms })),
        );
      }
      const h = data?.sections?.featureCardsHeader;
      if (h && typeof h === "object") {
        setHeader((prev) => ({
          ...prev,
          ...Object.fromEntries(Object.entries(h).filter(([, v]) => v !== "" && v != null)),
        }));
      }
    });
  }, []);

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight text-[#050A13] [overflow-wrap:anywhere]">
            {header.heading}
            {header.headingAccent ? (
              <>
                {" "}
                <span className="text-[#0088FF]">{header.headingAccent}</span>
              </>
            ) : null}
          </h2>
          <p className="mt-3 text-base font-medium text-[#667085] [overflow-wrap:anywhere]">
            {header.description}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {cards.map((item, index) => {
            const Icon = item.icon ?? BarChart3;

            return (
              <motion.article
                key={`${item.title ?? "card"}-${index}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 * index }}
                className="rounded-[24px] border border-[#E4EAF2] bg-white p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(15,23,42,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0088FF]">
                    <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="whitespace-pre-line text-[1.6rem] font-semibold leading-[1.05] tracking-tight text-[#050A13] [overflow-wrap:anywhere]">
                      {item.title}
                    </h3>
                    <span className="mt-4 block h-0.5 w-8 rounded-full bg-[#0088FF]" />
                  </div>
                </div>

                <p className="mt-6 min-h-[4.5rem] text-[15px] font-medium leading-6 text-[#4F5B6F] [overflow-wrap:anywhere]">
                  {item.description}
                </p>

                <FeaturePreview type={item.preview} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
