"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const focusItems = [
  {
    id: "01",
    title: "For Drivers",
    headline: "For Customers",
    description: "For Customers.",
    badge: "Daily Parking",
    metricLabel: "Book Fast",
    metricValue: "2 taps",
    href: "/app",
    image: "/ForCustomers.png",
  },
  {
    id: "02",
    title: "For Property Owners",
    headline: "For Businesses",
    description: "Turn empty bays into reliable monthly income.",
    badge: "Property Revenue",
    metricLabel: "Earn More",
    metricValue: "AED+",
    href: "/how-it-works",
    image: "/Business2.png",
  },
  {
    id: "03",
    title: "For Enterprises",
    headline: "For Enterprises",
    description: "Manage your entire parking operation from one platform.",
    badge: "Portfolio Control",
    metricLabel: "Site View",
    metricValue: "24/7",
    href: "/solutions",
    image:
      "https://unsplash.com/photos/VBLHICVh-lI/download?force=true&w=1200&q=80",
    // image: "/ForEnterprises.png",
  },
];

export default function MajorFocusHighlight() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden p-5  sm:p-7 md:p-8">
          <div className="gap-8">
            <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-0">
              <div className="flex items-center justify-center w-fit mx-auto gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Image
                  src="/download(1).svg"
                  alt="Major Focus Highlight"
                  width={20}
                  height={20}
                  className="w-4 h-4 shrink-0 sm:w-5 sm:h-5"
                />
                <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
                  Major Focus Highlight
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                Smart Parking Starts Here
              </h2>
              <p className="text-sm sm:text-base lg:text-[16px] font-medium text-[#6D6D6D] max-w-2xl mx-auto px-4 sm:px-0">
                HalaPark is built around the three parking journeys that matter
                most: everyday drivers, property owners, and enterprise
                operators.
              </p>
            </div>

            <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {focusItems.map((item, index) => (
                <article
                  key={item.id}
                  className={`major-focus-cursor-target group relative isolate min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200/80 shadow-[0_18px_44px_rgba(15,23,42,0.12)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[rgba(0,136,255,0.24)] hover:shadow-[0_24px_58px_rgba(13,90,122,0.18)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 140}ms` }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,24,40,0.08)_0%,rgba(10,24,40,0.08)_28%,rgba(10,24,40,0.22)_56%,rgba(7,39,50,0.78)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_30%),linear-gradient(180deg,transparent_48%,rgba(14,123,149,0.18)_100%)]" />

                  <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3"></div>

                    <div className="space-y-4">
                      <h3 className="max-w-[11ch] text-[2.15rem] font-semibold leading-[0.93] tracking-tight text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)] sm:text-[2.45rem]">
                        {item.headline}
                      </h3>

                      <Link
                        href={item.href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0088FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13697f] sm:col-start-3 sm:row-start-1 sm:w-auto sm:min-w-[132px]"
                      >
                        Learn More
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-4 w-4"
                        >
                          <path
                            d="M6 14L14 6M8 6H14V12"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
