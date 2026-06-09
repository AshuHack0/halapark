"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBusinessSection } from "@/lib/cms";

const DEFAULT_HERO = {
  title: "Turning Smart Parking into Business Growth",
  description: "HalaPark helps businesses maximize revenue, automate parking operations, and deliver seamless smart mobility experiences through AI-powered parking technology.",
  image: "/HalaParkVideo.mp4",
};

export default function BusinessHero() {
  const videoRef = useRef(null);
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetchBusinessSection("hero").then((section) => {
      if (section) {
        setHero(section);
      }
    });
  }, []);

  useEffect(() => {
    if (videoRef.current && hero.image?.endsWith(".mp4")) {
      videoRef.current.play()?.catch(() => {});
    }
  }, [hero.image]);

  const isVideo = hero.image?.endsWith(".mp4") || hero.image?.endsWith(".webm");

  return (
    <section id="hero-section" className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            {isVideo ? (
              <video
                ref={videoRef}
                src={hero.image}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={hero.image}
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative flex min-h-[500px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[620px] lg:px-20">
            <div className="relative z-10 w-full max-w-lg">
              <h1 className="text-5xl font-semibold text-white sm:text-6xl md:text-7xl">
                {hero.title}
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
                {hero.description}
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
