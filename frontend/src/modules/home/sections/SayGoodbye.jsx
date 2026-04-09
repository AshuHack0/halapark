"use client";

import { useEffect, useRef, useState } from "react";

export default function SayGoodbye() {
  const frustrations = [
    "Wasted parking bays",
    "Payment machines",
    "Ticketing queues",
    "Untracked spaces",
    "Revenue left on the table",
    "Manual bookings",
    "Chasing monthly payments",
    // =====================
    "Wasted parking bays",
    "Payment machines",
    "Ticketing queues",
    "Untracked spaces",
    "Revenue left on the table",
    "Manual bookings",
    "Chasing monthly payments",
    // =====================
    "Wasted parking bays",
    "Payment machines",
    "Ticketing queues",
    "Untracked spaces",
    "Revenue left on the table",
    "Manual bookings",
    "Chasing monthly payments",
  ];

  const [currentIndex, setCurrentIndex] = useState(4); // start at the blue "manual payments"
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frustrations.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calculate responsive offset based on screen size
  const getOffset = () => {
    if (windowWidth >= 1024) return 64; // Desktop
    if (windowWidth >= 768) return 48; // Tablet
    return 40; // Mobile
  };

  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-18 font-sans w-full overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.9)] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)]
[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)] bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative flex flex-row gap-4 sm:gap-5 w-full">
          {/* LEFT: primary heading */}
          <div className="w-[43%] text-center lg:text-end flex items-center justify-center lg:justify-end relative mb-4 sm:mb-6 lg:mb-0">
            <img
              src="/imgi_168_5qfWioz2YlGmZ4gVXknKz1yjY.svg"
              alt="Say goodbye to"
              className="w-24 h-18 sm:w-32 sm:h-24 md:w-36 md:h-27 lg:w-40 lg:h-30 object-cover absolute top-2 sm:top-2.5 md:top-3 -right-4 sm:-right-5 md:-right-6 lg:-right-7"
            />
            <img
              src="/imgi_167_8BXeBQObnslmzSi9htBC7WTLXM.svg"
              alt="Say goodbye to"
              className="w-5 h-6 sm:w-6 sm:h-7 lg:w-7 lg:h-8 object-cover absolute top-12 sm:top-14 md:top-16 lg:top-19 -left-2 sm:left-16 md:left-18 lg:left-21"
            />
            <h2 className="relative text-base sm:text-3xl md:text-4xl lg:text-[52px] font-semibold text-gray-900 leading-tight">
              <span className="inline-block align-middle">Say goodbye to</span>
            </h2>
          </div>

          {/* RIGHT: stack of frustrations */}
          <div
            ref={containerRef}
            className="relative w-[66%] h-40 sm:h-44 md:h-48 lg:h-56 overflow-visible"
            aria-hidden
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {frustrations.map((text, index) => {
                  // compute vertical offset so the active word sits in center
                  const offset = (index - currentIndex) * getOffset(); // responsive gap between lines

                  const isActive = index === currentIndex;
                  const className = `absolute left-0 transition-all duration-700 ease-out will-change-transform text-left font-semibold`;

                  // styles applied inline to allow per-item translateY and subtle blur/opacity changes
                  const style = {
                    top:
                      windowWidth >= 1024
                        ? "36%"
                        : windowWidth >= 768
                          ? "38%"
                          : "40%",
                    transform: `translateY(${offset}px) scale(${
                      isActive ? 1 : 1
                    })`,
                    opacity: isActive ? 1 : 0.58,
                    color: isActive ? undefined : "#9CA3AF", // tailwind gray-400 fallback
                    filter: isActive ? "none" : "blur(0.2px)",
                  };

                  // size varies with viewport using responsive classes + inline fontSize fallback
                  const sizeClass =
                    "text-[15px] sm:text-2xl md:text-3xl lg:text-[50px] text-nowrap text-left";

                  return (
                    <div
                      key={index}
                      className={className + " " + sizeClass}
                      style={style}
                    >
                      <span
                        className={`px-1 sm:px-1.5 md:px-2 ${
                          isActive
                            ? "text-[#0088FF] text-left text-align-left drop-shadow-[0_0_14px_rgba(255,255,255,0.95)]"
                            : "text-black/70"
                        }`}
                        style={{
                          // ensure the active item uses the bold blue look from the image
                          color: isActive ? undefined : undefined,
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* small extra CSS to smooth the transform on low-power devices */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
