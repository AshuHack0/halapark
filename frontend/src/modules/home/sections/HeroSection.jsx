"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchHomeHeroSlides } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

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
        poster={slide.image || undefined}
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
  const { language } = useLanguage();
  // Start empty; once the CMS fetch resolves we use whatever it returns —
  // including an empty list (client deleted all slides → hero is hidden).
  const [slides, setSlides] = useState([]);
  const [resolved, setResolved] = useState(false);
  const visibleSlides = slides.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = visibleSlides[activeSlide] ?? visibleSlides[0];
  const shouldWaitForVideoEnd = activeSlide === 0 && Boolean(currentSlide?.video);

  useEffect(() => {
    fetchHomeHeroSlides().then((cmsSlides) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[CMS] HeroSection slides loaded", { count: cmsSlides?.length ?? null });
      }
      // null = fetch failed → keep placeholder; array (even empty) = use as-is.
      if (Array.isArray(cmsSlides)) {
        setSlides(cmsSlides);
      }
      setResolved(true);
    });
  }, []);

  useEffect(() => {
    if (shouldWaitForVideoEnd || visibleSlides.length === 0) {
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

  // While the CMS slides are still loading, render nothing (avoids a flash of the
  // empty dark hero box + the first video popping in/autoplaying before it's ready).
  if (!resolved) {
    return null;
  }

  // Hero deleted in CMS (no slides) → render nothing.
  if (visibleSlides.length === 0) {
    return null;
  }

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

          {/* Manual prev/next arrows */}
          {visibleSlides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPreviousSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-5 sm:h-11 sm:w-11"
              >
                <ArrowLeftIcon />
              </button>
              <button
                type="button"
                onClick={showNextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-5 sm:h-11 sm:w-11"
              >
                <ArrowRightIcon />
              </button>
            </>
          ) : null}

          <div className="relative flex min-h-125 w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-4xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-5xl md:text-6xl line-clamp-3">
                {t(currentSlide, "tag", language)}
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 [overflow-wrap:anywhere] line-clamp-4 sm:text-base">
                {t(currentSlide, "title", language)}
              </p>

              <Link href="/contact">
                <button className="mt-7 bg-[#0088FF] px-10 rounded-full py-3 text-white font-medium text-sm sm:text-base">
                  {language === "ar" ? "تواصل معنا" : "Get In Touch"}
                </button>
              </Link>

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
