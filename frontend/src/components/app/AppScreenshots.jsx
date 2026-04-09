"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { appScreenshots } from "./appContent";

const desktopLayouts = [
  {
    finalX: -700,
    finalY: 122,
    finalRotate: 0,
    finalScale: 1,
    fromX: -700,
    fromY: 244,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 10,
    opacity: 1,
  },
  {
    finalX: -365,
    finalY: 28,
    finalRotate: 0,
    finalScale: 1,
    fromX: -365,
    fromY: 208,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 20,
    opacity: 1,
  },
  {
    finalX: 0,
    finalY: 8,
    finalRotate: 0,
    finalScale: 1.2,
    fromX: 0,
    fromY: 0,
    fromRotate: 0,
    fromScale: 1.2,
    zIndex: 40,
    opacity: 1,
  },
  {
    finalX: 365,
    finalY: 28,
    finalRotate: 0,
    finalScale: 1,
    fromX: 365,
    fromY: 208,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 20,
    opacity: 1,
  },
  {
    finalX: 700,
    finalY: 122,
    finalRotate: 0,
    finalScale: 1,
    fromX: 700,
    fromY: 244,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 10,
    opacity: 1,
  },
];

function HeroPhone({ screen, layout, progress, priority = false }) {
  const reduceMotion = useReducedMotion();

  const x = useTransform(
    progress,
    [0, 0.38, 1],
    reduceMotion
      ? [layout.finalX, layout.finalX, layout.finalX]
      : [layout.fromX, layout.finalX, layout.finalX],
  );
  const rawY = useTransform(
    progress,
    [0, 0.38, 1],
    reduceMotion
      ? [layout.finalY, layout.finalY, layout.finalY]
      : [layout.fromY, layout.finalY, layout.finalY - 28],
  );
  const y = useSpring(
    rawY,
    reduceMotion
      ? { stiffness: 1000, damping: 120, mass: 0.2 }
      : { stiffness: 180, damping: 34, mass: 0.42 },
  );
  const rotate = useTransform(
    progress,
    [0, 0.38, 1],
    reduceMotion
      ? [layout.finalRotate, layout.finalRotate, layout.finalRotate]
      : [layout.fromRotate, layout.finalRotate, layout.finalRotate],
  );
  const scale = useTransform(
    progress,
    [0, 0.38, 1],
    reduceMotion
      ? [layout.finalScale, layout.finalScale, layout.finalScale]
      : [layout.fromScale, layout.finalScale, layout.finalScale * 1.015],
  );
  const opacity = useTransform(
    progress,
    [0, 0.22, 1],
    [0, layout.opacity, layout.opacity],
  );

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex: layout.zIndex }}
      className="absolute left-1/2 top-0 w-[180px] -translate-x-1/2 xl:w-[280px]"
    >
      <div className="absolute inset-x-[22%] bottom-6 h-10 rounded-full bg-black/10 blur-2xl" />

      <div className="relative aspect-[1439/2920] drop-shadow-[0_26px_50px_rgba(15,23,42,0.18)]">
        <div className="absolute left-[3.1%] right-[3.1%] top-[2.05%] bottom-[2.55%] overflow-hidden rounded-[2rem] bg-white">
          <Image
            src={screen.image}
            alt={screen.title}
            fill
            sizes="(min-width: 1280px) 208px, 180px"
            className="object-cover object-top"
            priority={priority}
          />
        </div>

        <Image
          src="/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
          alt=""
          fill
          sizes="(min-width: 1280px) 208px, 180px"
          className="pointer-events-none select-none object-contain"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}

export default function AppScreenshots() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden px-4 py-20 sm:px-0 lg:px-0 lg:py-28"
    >
      <div className="w-full">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium tracking-[0.14em] text-[#7C8597]">
            Built for a cleaner parking flow
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0F172A] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
            The HalaPark app looks polished from home to receipt.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5E6578]">
            A five-screen hero inspired by the Pop Site layout, now rebuilt in a
            white theme with cleaner spacing and scroll-tuned motion.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#6B7280]">
          {appScreenshots.map((screen) => (
            <span key={screen.id} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
              <span>{screen.label}</span>
            </span>
          ))}
        </div>

        <div className="relative mt-14 hidden max-h-[150vh] lg:block w-full">
          <div className="sticky top-10 h-[calc(100vh-2.5rem)]">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />

            <div className="relative mx-auto h-full max-w-full">
              <div className="pointer-events-none absolute left-1/2 top-[46%] h-28 w-[54rem] -translate-x-1/2 rounded-full bg-[#E5EEF9] blur-[42px]" />

              {appScreenshots.map((screen, index) => (
                <HeroPhone
                  key={screen.id}
                  screen={screen}
                  layout={desktopLayouts[index]}
                  progress={scrollYProgress}
                  priority={index === 2}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:hidden">
          {appScreenshots.map((screen, index) => (
            <motion.article
              key={screen.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="rounded-[2rem] border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#94A3B8]">
                    {screen.step}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#0F172A]">
                    {screen.label}
                  </h3>
                </div>
                <div className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#64748B]">
                  Screen
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#5E6578]">
                {screen.description}
              </p>

              <div className="relative mt-6 mx-auto w-full max-w-[260px]">
                <div className="absolute inset-x-[24%] bottom-6 h-10 rounded-full bg-black/10 blur-2xl" />

                <div className="relative aspect-[1439/2920] drop-shadow-[0_22px_48px_rgba(15,23,42,0.14)]">
                  <div className="absolute left-[3.1%] right-[3.1%] top-[2.05%] bottom-[2.55%] overflow-hidden rounded-[2rem] bg-white">
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      fill
                      sizes="260px"
                      className="object-cover object-top"
                    />
                  </div>

                  <Image
                    src="/Mock.png"
                    alt=""
                    fill
                    sizes="260px"
                    className="pointer-events-none select-none object-contain"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
