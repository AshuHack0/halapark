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
    finalX: -665,
    finalY: 0,
    finalRotate: 0,
    finalScale: 1,
    fromX: -820,
    fromY: 100,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 10,
    opacity: 1,
  },
  {
    finalX: -345,
    finalY: 0,
    finalRotate: 0,
    finalScale: 1,
    fromX: -470,
    fromY: 80,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 20,
    opacity: 1,
  },
  {
    finalX: 0,
    finalY: 0,
    finalRotate: 0,
    finalScale: 1.18,
    fromX: 0,
    fromY: 50,
    fromRotate: 0,
    fromScale: 1.18,
    zIndex: 40,
    opacity: 1,
  },
  {
    finalX: 345,
    finalY: 0,
    finalRotate: 0,
    finalScale: 1,
    fromX: 470,
    fromY: 80,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 20,
    opacity: 1,
  },
  {
    finalX: 665,
    finalY: 0,
    finalRotate: 0,
    finalScale: 1,
    fromX: 820,
    fromY: 100,
    fromRotate: 0,
    fromScale: 1,
    zIndex: 10,
    opacity: 1,
  },
];

const phoneFrameSrc = "/THis.avif";

function HeroPhone({ screen, layout, progress, priority = false }) {
  const reduceMotion = useReducedMotion();

  const x = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [layout.finalX, layout.finalX] : [layout.fromX, layout.finalX],
  );
  const y = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [layout.finalY, layout.finalY] : [layout.fromY, layout.finalY],
  );
  const rotate = useTransform(
    progress,
    [0, 1],
    reduceMotion
      ? [layout.finalRotate, layout.finalRotate]
      : [layout.fromRotate, layout.finalRotate],
  );
  const scale = useTransform(
    progress,
    [0, 1],
    reduceMotion
      ? [layout.finalScale, layout.finalScale]
      : [layout.fromScale, layout.finalScale],
  );

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity: layout.opacity, zIndex: layout.zIndex }}
      className="absolute left-1/2 top-0 w-[180px] -translate-x-1/2 transform-gpu will-change-transform xl:w-[280px]"
    >
      <div className="absolute inset-x-[22%] bottom-6 h-10 rounded-full bg-black/10 blur-2xl" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_26px_50px_rgba(15,23,42,0.18)]">
        <div className="absolute left-[4.4%] right-[4.4%] top-[1.8%] bottom-[2.2%] z-10 overflow-hidden rounded-[2.4rem] bg-white">
          <Image
            src={screen.image}
            alt={screen.title}
            fill
            sizes="(min-width: 1280px) 208px, 180px"
            className="object-cover object-top"
            priority={priority}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-30">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 208px, 180px"
            className="select-none object-contain"
            priority={priority}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AppScreenshots() {
  const sectionRef = useRef(null);
  const desktopStageRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "end 30%"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 230,
    damping: reduceMotion ? 120 : 34,
    mass: reduceMotion ? 0.2 : 0.32,
    restDelta: 0.0008,
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden px-4 py-20 sm:px-0 lg:px-0 lg:py-28"
    >
      <div className="w-full">
        <div className="mx-auto mb-10 max-w-4xl text-center">
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

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#6B7280]">
          {appScreenshots.map((screen) => (
            <span key={screen.id} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" />
              <span>{screen.label}</span>
            </span>
          ))}
        </div>

        <div
          ref={desktopStageRef}
          className="relative mt-20 hidden w-full lg:mt-24 lg:block"
        >
          <div className="relative mx-auto h-[46rem] max-w-full">
            <div className="pointer-events-none absolute left-1/2 top-[62%] h-28 w-[54rem] -translate-x-1/2 rounded-full bg-[#E5EEF9] blur-[42px]" />

            {appScreenshots.map((screen, index) => (
              <HeroPhone
                key={screen.id}
                screen={screen}
                layout={desktopLayouts[index]}
                progress={smoothedProgress}
                priority={index === 2}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:hidden">
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

              <div className="relative mx-auto mt-6 w-full max-w-[260px]">
                <div className="absolute inset-x-[24%] bottom-6 h-10 rounded-full bg-black/10 blur-2xl" />

                <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_22px_48px_rgba(15,23,42,0.14)]">
                  <div className="absolute left-[4.4%] right-[4.4%] top-[1.8%] bottom-[2.2%] z-10 overflow-hidden rounded-[2.4rem] bg-white">
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      fill
                      sizes="260px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 z-30">
                    <Image
                      src={phoneFrameSrc}
                      alt=""
                      fill
                      sizes="260px"
                      className="select-none object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
