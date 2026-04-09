"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How does HalaPark help with parking management?",
    answer:
      "HalaPark provides end-to-end parking management solutions—from finding available parking spots to managing reservations and payments, all in one convenient platform.",
    isOpen: true,
  },
  {
    id: 2,
    question: "Can HalaPark guarantee a parking spot?",
    answer:
      "While we cannot guarantee availability at all times, we provide real-time information about parking availability and help you find the best options near your destination.",
    isOpen: false,
  },
  {
    id: 3,
    question: "What types of parking does HalaPark support?",
    answer:
      "HalaPark supports a wide range of parking options including private, public, valet, and electric vehicle charging (EVC) stations.",
    isOpen: false,
  },
  {
    id: 4,
    question: "Does HalaPark help with electric vehicle charging?",
    answer:
      "Yes, HalaPark provides comprehensive support for finding and reserving electric vehicle charging stations through our platform.",
    isOpen: false,
  },
  {
    id: 5,
    question: "Can HalaPark guarantee a spot in a specific location?",
    answer:
      "We work to provide real-time availability information, but parking availability depends on current usage. We recommend booking in advance when possible.",
    isOpen: false,
  },
  {
    id: 6,
    question: "How long does the booking process take?",
    answer:
      "The booking process is quick and easy, typically taking just a few minutes through our mobile app or website.",
    isOpen: false,
  },
  {
    id: 7,
    question: "Does HalaPark offer customer support?",
    answer:
      "Yes, HalaPark provides ongoing customer support, including assistance with bookings, payments, and any issues you may encounter.",
    isOpen: false,
  },
];

export default function FAQSection() {
  const [openFaqId, setOpenFaqId] = useState(1); // First FAQ is open by default

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Description and Contact Box */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative flex items-center justify-center w-fit px-6 py-1 mb-4">
                <div className="absolute bottom-0 left-0 z-0">
                  <img src="/LeftSVG.png" alt="" className="w-3 h-3" />
                </div>
                <span className="text-[13px] text-[#0F1115] font-medium block">
                  FAQ
                </span>
                {/* Right L-shape at top-right */}
                <div className="absolute top-0 right-0 z-0">
                  <img src="/RightSVG.png" alt="" className="w-3 h-3" />
                </div>
              </div>
              <h2 className="text-[40px] font-bold text-gray-900 mb-6 leading-tight">
                Have questions,
                <br />
                <span className="text-[#50576B]">We got answers.</span>
              </h2>
              <p className="text-base text-gray-600 mb-10 leading-relaxed">
                Everything you need to know about our process, <br /> and how we
                deliver results.
              </p>
            </div>

            {/* Can't find your answer box */}
            <div className="bg-white rounded-[28px] p-6 shadow-lg max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can&apos;t find your answer?
              </h3>
              <p className="text-sm text-[#50576B] mb-5 leading-relaxed">
                Get in touch with our support team, they are friendly!
              </p>
              <a
                href="/contact"
                className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b border-b-[#E2E7EE] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4 text-base">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <svg
                        className="w-4 h-4 text-gray-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-gray-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
