"use client";

import { useMemo, useState } from "react";
import {
  BadgePercent,
  BellRing,
  Building2,
  CalendarCheck2,
  CarFront,
  Clock3,
  Headset,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Store,
  TriangleAlert,
  WalletCards,
} from "lucide-react";
import { faqCategories } from "./faqData";

const iconMap = {
  BadgePercent,
  BellRing,
  Building2,
  CalendarCheck2,
  CarFront,
  Clock3,
  Headset,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Store,
  TriangleAlert,
  WalletCards,
};

export default function FAQCategorySection() {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0]?.id);
  const [openQuestionId, setOpenQuestionId] = useState(
    faqCategories[0]?.items[0]?.id ?? null
  );

  const activeCategory = useMemo(
    () => faqCategories.find((category) => category.id === activeCategoryId),
    [activeCategoryId]
  );

  const handleCategoryClick = (category) => {
    setActiveCategoryId(category.id);
    setOpenQuestionId(category.items[0]?.id ?? null);
  };

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0088FF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[rgba(0,136,255,0.18)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
            FAQs
          </p>
          <h1 className="mx-auto mt-4 text-2xl font-semibold tracking-tight text-[#102b46] sm:text-3xl lg:max-w-2xl">
            What&apos;s Your Question About
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#4f6780]">
            Explore the categorised questions to find relevant information
            quickly. Choose a category below to get detailed answers and resolve
            your queries efficiently.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-3 xl:col-span-5">
            {faqCategories.map((category) => {
              const Icon = iconMap[category.icon] ?? Building2;
              const isActive = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`group relative rounded-2xl border px-3.5 py-4 text-left transition duration-200 ${
                    isActive
                      ? "border-[#0088FF] bg-[#0088FF] text-white shadow-[0_14px_30px_rgba(0,136,255,0.28)]"
                      : "border-[#d6e4f2] bg-white text-[#183c62] hover:-translate-y-0.5 hover:border-[#0088FF]/40 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isActive
                        ? "border-white/30 bg-white/20 text-white"
                        : "border-[rgba(0,136,255,0.2)] bg-[rgba(0,136,255,0.08)] text-[#0088FF]"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <span className="mt-2.5 block text-sm font-semibold leading-5">
                    {category.title}
                  </span>

                  <span
                    className={`absolute right-3 top-3 h-2 w-2 rounded-full transition ${
                      isActive ? "bg-white" : "bg-[#0088FF]/30 group-hover:bg-[#0088FF]/60"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="self-start rounded-2xl border border-[rgba(0,136,255,0.16)] bg-white px-4 py-2 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:px-6 lg:col-span-6 xl:col-span-7">
            <div className="border-b border-[rgba(0,136,255,0.1)] py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0088FF]">
                {activeCategory?.title}
              </p>
            </div>

            {activeCategory?.items.map((item, index) => {
              const isOpen = openQuestionId === item.id;

              return (
                <div
                  key={item.id}
                  className={
                    index !== activeCategory.items.length - 1
                      ? "border-b border-[#e8eef5]"
                      : ""
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenQuestionId((current) =>
                        current === item.id ? null : item.id
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                  >
                    <span
                      className={`text-sm font-medium leading-6 sm:text-base ${
                        isOpen ? "text-[#0f3760]" : "text-[#24496e]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-base font-semibold leading-none transition ${
                        isOpen
                          ? "border-[#0088FF] bg-[#0088FF] text-white"
                          : "border-[#c8d9ea] bg-white text-[#0088FF]"
                      }`}
                    >
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>

                  {isOpen ? (
                    <div id={`${item.id}-content`} className="pb-4 pr-8">
                      <p className="text-sm leading-6 text-[#5a6f87]">{item.answer}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
