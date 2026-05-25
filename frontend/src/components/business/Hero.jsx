"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function BusinessHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()?.catch(() => {});
    }
  }, []);

  return (
    <section id="hero-section" className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src="/HalaParkVideo.mp4"
              poster="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png"
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
                Turning Smart Parking into Business Growth
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                HalaPark helps businesses maximize revenue, automate parking operations, and deliver seamless smart mobility experiences through AI-powered parking technology.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-[#0088FF] px-8 py-3 text-sm font-medium text-white sm:text-base"
                >
                  Get Proposal
                </Link>
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm sm:text-base"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
