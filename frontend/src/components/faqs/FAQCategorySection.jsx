"use client";

import { useState } from "react";
import { faqCategories } from "./faqData";

function FAQCategoryCard({ category, openItems, onToggle }) {
  return (
    <section
      aria-labelledby={`${category.id}-heading`}
      className="rounded-[26px] border border-[rgba(0,136,255,0.14)] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
    >
      <div className="grid gap-0 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="border-b border-[rgba(0,136,255,0.12)] px-6 py-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
            {category.label}
          </p>
          <h2
            id={`${category.id}-heading`}
            className="mt-2 text-2xl font-bold text-[#0088FF]"
          >
            {category.title}
          </h2>
        </div>

        <div className="px-4 py-3 sm:px-6 sm:py-4">
          {category.items.map((item, index) => {
            const isOpen = openItems[category.id] === item.id;

            return (
              <div
                key={item.id}
                className={`border-[rgba(0,136,255,0.12)] ${
                  index !== category.items.length - 1 ? "border-b" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggle(category.id, item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-content`}
                  className="flex w-full items-center justify-between gap-4 px-2 py-4 text-left"
                >
                  <span className="text-base font-medium leading-7 text-[#1A2B45] sm:text-lg">
                    {item.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(0,136,255,0.14)] text-[#0088FF]">
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 3.333v9.334M3.333 8h9.334"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen ? (
                  <div
                    id={`${item.id}-content`}
                    className="px-2 pb-4"
                  >
                    <p className="max-w-3xl text-sm leading-7 text-[#5A6B85] sm:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function FAQCategorySection() {
  const [openItems, setOpenItems] = useState(
    faqCategories.reduce((accumulator, category) => {
      accumulator[category.id] = category.items[0]?.id ?? null;
      return accumulator;
    }, {})
  );

  const handleToggle = (categoryId, itemId) => {
    setOpenItems((current) => ({
      ...current,
      [categoryId]: current[categoryId] === itemId ? null : itemId,
    }));
  };

  return (
    <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {faqCategories.map((category) => (
          <FAQCategoryCard
            key={category.id}
            category={category}
            openItems={openItems}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}

