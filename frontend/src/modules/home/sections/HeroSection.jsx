"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_SLIDE_DELAY = 4500;

const slides = [
  {
    id: 1,
    cardImg: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    tag: "Transform Parking Into a Scalable Revenue Engine",
    title:
      "Hala Park enables property owners, developers, and operators to convert parking infrastructure into fully automated, revenue-generating assets powered by smart technology and AI-driven operations.",
    subtitle:
      "Hala Park enables property owners, developers, and operators to convert parking infrastructure into fully automated, revenue-generating assets powered by smart technology and AI-driven operations.",
    description:
      "Real-time availability helps you lock in your spot before you even step out. No circling, no guessing, just smooth, predictable parking every time.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    video: "/HalaParkVideo.mp4",
  },
  {
    id: 2,
    cardImg: "/3ca506f760b463d2f3eb686fb08621c5.jpg.jpeg",
    tag: "Seamlessly Connect Your Parking Ecosystem",
    title:
      "Integrate hardware, software, and operations into one unified system for smarter, more efficient parking management.",

    subtitle:
      "From single properties to large portfolios, Hala Park enables you to grow revenue streams, reduce operational costs, and future-proof your parking ecosystem.",
    description:
      "List your space in minutes and start earning effortlessly. Smart pricing and secure bookings ensure consistent returns.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
  },
  {
    id: 3,
    cardImg: "/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png",
    tag: "Scale Effortlessly. Earn Continuously.",
    title:
      "From single properties to large portfolios, Hala Park enables you to grow revenue streams, reduce operational costs, and future-proof your parking ecosystem.",
    subtitle: "Charging that fits your routine.",
    description:
      "Locate and reserve charging-enabled parking in one go. Power up while you go about your day, no extra stops needed.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  },
  {
    id: 4,
    cardImg: "/valet on demand short image.png",
    tag: "Valet On Demand",
    title: "Walk In Like You Own the Place",
    subtitle: "Premium parking without the wait.",
    description:
      "Request a valet instantly and skip the hassle of finding a spot. Arrive, hand over, and move on, effortless from start to finish.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  },
  {
    id: 5,
    cardImg: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    tag: "Barrier-Free Parking",
    title: "Blink and You're Already In",
    subtitle: "Seamless entry, zero friction.",
    description:
      "License plate recognition handles access automatically. No tickets, no delays, just drive in and out with ease.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
  {
    id: 6,
    cardImg: "/37ea36b9e2f10ae7848280afbc3236af.jpg.jpeg",
    tag: "Parking Management",
    title: "Less Chaos. More Control. More Revenue.",
    subtitle: "Everything managed from one place.",
    description:
      "Monitor, optimize, and scale operations across all locations. Smart insights and automation keep everything running at peak efficiency.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  },
];

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
        poster={slide.image}
        muted
        playsInline
        preload="metadata"
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
  const visibleSlides = slides.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = visibleSlides[activeSlide];
  const shouldWaitForVideoEnd = activeSlide === 0 && Boolean(currentSlide.video);

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
              <h1 className="text-4xl font-semibold  text-white sm:text-5xl md:text-6xl">
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
