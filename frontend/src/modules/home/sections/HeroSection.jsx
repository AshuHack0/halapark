"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_HOME_SLIDES, fetchHomeHeroSlides } from "@/lib/cms";

const AUTO_SLIDE_DELAY = 4500;

const ArrowLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function HeroBackgroundMedia({ slide, isActive, onVideoEnd }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!slide.video || !videoRef.current) {
      return undefined;
    }

    const videoElement = videoRef.current;

    if (isActive) {
      videoElement.currentTime = 0;
      const playPromise = videoElement.play();
      playPromise?.catch(() => {});
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    return undefined;
  }, [isActive, slide.video]);

  if (slide.video) {
    return (
      <video
        ref={videoRef}
        src={slide.video}
        muted
        autoPlay
        playsInline
        preload="auto"
        onEnded={onVideoEnd}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <img
      src={slide.image}
      alt={slide.title}
      className="h-full w-full object-cover"
    />
  );
}

export default function HeroSection() {
  const [slides, setSlides] = useState(DEFAULT_HOME_SLIDES);
  const visibleSlides = slides.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = visibleSlides[activeSlide] ?? visibleSlides[0];
  const shouldWaitForVideoEnd = activeSlide === 0 && Boolean(currentSlide?.video);

  useEffect(() => {
    fetchHomeHeroSlides().then((slides) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[CMS] HeroSection slides loaded", { count: slides.length });
      }
      setSlides(slides);
    });
  }, []);

  useEffect(() => {
    if (shouldWaitForVideoEnd) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % visibleSlides.length);
    }, AUTO_SLIDE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlide, shouldWaitForVideoEnd, visibleSlides.length]);

  const showPreviousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + visibleSlides.length) % visibleSlides.length,
    );
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % visibleSlides.length);
  };

  return (
    <section id="hero-section" className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            {visibleSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <HeroBackgroundMedia
                  slide={slide}
                  isActive={activeSlide === index}
                  onVideoEnd={
                    activeSlide === index && index === 0 ? showNextSlide : undefined
                  }
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>

          <div className="relative flex min-h-125 w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
                {currentSlide.tag}
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                {currentSlide.title}
              </p>

              <button className="mt-7 bg-[#0088FF] px-10 rounded-full py-3 text-white font-medium text-sm sm:text-base">
                Get In Touch
              </button>

              <div className="mt-8 flex items-center gap-2">
                {visibleSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${slide.id}`}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
