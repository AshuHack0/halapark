"use client";

import { useEffect, useRef, useState } from "react";

export default function TrustedUsers() {
  const stats = [
    {
      label: "Years in Market",
      value: 8,
      prefix: "",
      suffix: "+",
    },
    {
      label: "Properties",
      value: 500,
      prefix: "",
      suffix: "+",
    },
    {
      label: "Enterprise Clients",
      value: 40,
      prefix: "",
      suffix: "+",
    },
    {
      label: "Integration Partners",
      value: 25,
      prefix: "",
      suffix: "+",
    },
  ];

  const [animatedValues, setAnimatedValues] = useState(() =>
    stats.map(() => 0),
  );
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = statsRef.current;

    if (!element || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) {
      return;
    }

    let frameId;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        stats.map((item) => Math.round(item.value * easedProgress)),
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [hasAnimated]);

  const formatStatValue = (item, index) =>
    `${item.prefix}${animatedValues[index]}${item.suffix}`;

  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#e5e7eb] bg-[#f4f5f7] p-5 sm:p-7 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="max-w-xl">
              <div className="flex w-full items-start">
                {/* <div className="flex w-fit items-center justify-center gap-1.5 rounded-full px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
                  <img
                    src="/download(1).svg"
                    alt="About HalaPark"
                    className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                  />
                  <p className="mx-auto max-w-2xl text-xs text-black sm:text-sm lg:text-[14px]">
                    About HalaPark
                  </p>
                </div> */}
              </div>

              {/* <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl md:text-[3.25rem]">
                Building Smarter Parking Ecosystems for Modern Cities
              </h2> */}
              <div className="mx-auto max-w-[980px]">
                <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#0088FF] sm:text-[14px]">
                  About HalaPark
                </p>

                <h2
                  id="ai-powered-parking-service-title"
                  className="mx-auto mt-4 max-w-[900px] text-[clamp(2.6rem,4.4vw,3.95rem)] font-normal leading-[1.03] tracking-[-0.06em] text-[#050A13]"
                >
                  Building Smarter Parking Ecosystems for Modern Cities
                </h2>
              </div>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                HalaPark is a UAE-based smart parking platform helping property
                owners, enterprises, and drivers make the most of every parking
                space. From AI-powered access to digital payments and real-time
                reporting, we manage the full parking lifecycle so you do not
                have to.
              </p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
                Operating since 2016, we have grown to serve 120+ locations and
                over 40 enterprise clients across the UAE.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,136,255,0.25)] transition hover:bg-[#0088FF] sm:px-7"
                >
                  Get Started
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(0,136,255,0.16)] bg-white px-6 py-3 text-sm font-semibold text-[#0088FF] transition hover:border-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] sm:px-7"
                >
                  Free trial
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-[#d9d8d3]">
              <img
                src="/AboutHalaParkbg.png"
                alt="Placeholder portrait for about section"
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          </div>

          <div
            ref={statsRef}
            className="mt-8 border-t border-[#dde1e7] pt-8 sm:mt-10 sm:pt-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {stats.map((item, index) => (
                <div key={item.label} className="min-w-0">
                  <p className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                    {formatStatValue(item, index)}
                  </p>
                  <p className="mt-2 max-w-[12rem] text-sm leading-6 text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
