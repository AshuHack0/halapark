"use client";

import { useState, useEffect, useRef } from "react";

export default function SmartFeatures() {
  const features = [
    {
      title: "Ticketless Parking",
      description: "Enter and exit without stopping for a ticket, ever.",
      video: "/Ticket.mp4",
    },
    {
      title: "24×7 Customer Support",
      description: "Round-the-clock help whenever you need it, instantly.",
      video: "/mobilemen.mp4",
    },
    {
      title: "Effortless Transactions",
      description: "Pay in seconds with any method — tap, scan, or card.",
      video: "/Cards.mp4",
    },
    {
      title: "Rent Out Your Parking",
      description: "Earn passive income by listing your unused parking spot.",
      video: "/cvc.mp4",
    },
    {
      title: "Valet On Demand",
      description: "Get valet service whenever you need it, without the wait.",
      video: "/huhuhuhu.mp4",
    },
    {
      title: "Seamless Experience",
      description: "EV charging built right into your parking experience.",
      video: "/Ev.mp4",
    },
  ];

  const GAP_PX = 12; // single gap value in px
  const TRANSITION_MS = 500;
  const totalFeatures = features.length;

  const [visibleCount, setVisibleCount] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // 1 on mobile, 2 on sm, 4 on lg
  useEffect(() => {
    const update = () => {
      let nextVisibleCount = 1;

      if (window.innerWidth >= 1024) nextVisibleCount = 4;
      else if (window.innerWidth >= 640) nextVisibleCount = 2;

      setVisibleCount((currentVisibleCount) => {
        if (currentVisibleCount !== nextVisibleCount) {
          setTransition(false);
          setIndex(nextVisibleCount);
        }

        return nextVisibleCount;
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  // Recalculate slide width whenever visibleCount or container width changes
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const totalGap = (visibleCount - 1) * GAP_PX;
      setSlideWidth((containerWidth - totalGap) / visibleCount + GAP_PX);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [visibleCount]);

  // Clone slides for infinite loop
  const extended = [
    ...features.slice(-visibleCount),
    ...features,
    ...features.slice(0, visibleCount),
  ];

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // Silent jump at boundaries
  useEffect(() => {
    if (index === totalFeatures + visibleCount) {
      setTimeout(() => {
        setTransition(false);
        setIndex(visibleCount);
      }, TRANSITION_MS);
    }
    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(totalFeatures);
      }, TRANSITION_MS);
    }
  }, [index, totalFeatures, visibleCount]);

  // Dot index (maps extended index back to real feature index)
  const activeDot =
    (((index - visibleCount) % totalFeatures) + totalFeatures) % totalFeatures;

  return (
    <section className="bg-white py-5 sm:py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6 bg-white">
          {/* <div className="flex items-center justify-center w-fit mx-auto gap-1.5 rounded-full px-3 py-1">
            <img
              src="/download(1).svg"
              alt="Features icon"
              className="w-4 h-4 shrink-0"
            />
            <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
              Features
            </p>
          </div> */}
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Smart Features for Modern <br className="hidden sm:block" /> Parking
          </h2> */}
          <div className="mx-auto max-w-[980px] text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#0088FF] sm:text-[14px]">
              Features
            </p>

            <h2
              id="ai-powered-parking-service-title"
              className="mx-auto mt-4 max-w-[900px] text-[clamp(2.25rem,4vw,3.55rem)] font-normal leading-[1.03] tracking-[-0.06em] text-[#050A13]"
            >
              Smart Features for Modern <br className="hidden sm:block" />{" "}
              Parking
            </h2>
          </div>
          <p className="text-sm sm:text-[15px] font-medium text-[#6D6D6D] max-w-xl mx-auto">
            Designed to support smooth operations and better experiences for
            customers and property owners alike.
          </p>
        </div>

        {/* Nav arrows */}
        <div className="flex justify-end gap-2 mb-2 sm:mb-3">
          <button
            onClick={prev}
            className="bg-[#0088FF] text-white p-1.5 rounded-lg shadow hover:brightness-95 transition-colors z-10 flex items-center justify-center"
            aria-label="Previous feature"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="bg-[#0088FF] text-white p-1.5 rounded-lg shadow hover:brightness-95 transition-colors z-10 flex items-center justify-center"
            aria-label="Next feature"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Carousel */}
        <div ref={containerRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              gap: `${GAP_PX}px`,
              transform: `translateX(-${index * slideWidth}px)`,
              transition: transition
                ? `transform ${TRANSITION_MS}ms ease`
                : "none",
            }}
          >
            {extended.map((f, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width:
                    slideWidth > 0
                      ? `${slideWidth - GAP_PX}px`
                      : `calc(${100 / visibleCount}% - ${
                          ((visibleCount - 1) * GAP_PX) / visibleCount
                        }px)`,
                }}
              >
                <div className="h-[330px] sm:h-[300px] md:h-[320px] lg:h-[370px] rounded-xl sm:rounded-2xl overflow-hidden relative">
                  <video onContextMenu={(e) => e.preventDefault()}
                    src={f.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  {/* Top gradient */}
                  <div className="pointer-events-none absolute top-0 left-0 w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-black/60 to-transparent z-10" />
                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 sm:h-24 lg:h-28 bg-gradient-to-t from-black/70 to-transparent z-10" />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3 z-20 group">
                    <div className="relative min-h-[64px] sm:min-h-[72px] lg:min-h-[84px]">
                      <h3 className="text-white text-lg sm:text-lg md:text-xl font-bold transition-all duration-300 ease-out translate-y-3 group-hover:-translate-y-1">
                        {f.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mt-1 opacity-0 translate-y-6 transition-all duration-300 ease-out delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators — visible on mobile only */}
        <div className="flex justify-center gap-2 mt-3 sm:hidden">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i + visibleCount)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeDot ? "bg-[#0088FF] w-5 h-2" : "bg-gray-300 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
