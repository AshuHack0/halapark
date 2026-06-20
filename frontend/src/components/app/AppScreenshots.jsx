"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Check, MapPin, Send, WalletCards } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { appScreenshots } from "./appContent";

const phoneFrameSrc = "/mobileframe.png";

const processSteps = [
  {
    title: "Find",
    text: "Set your location and get started",
    icon: Send,
  },
  {
    title: "Explore",
    text: "Find parking near you",
    icon: MapPin,
  },
  {
    title: "Book",
    text: "Choose your spot and duration",
    icon: CalendarCheck,
  },
  {
    title: "Pay",
    text: "Secure and flexible payment options",
    icon: WalletCards,
  },
  {
    title: "Confirm",
    text: "Instant confirmation in your inbox",
    icon: Check,
  },
];

const phoneLayouts = [
  "lg:mt-12 lg:w-[18%]",
  "lg:mt-4 lg:w-[19%]",
  "lg:z-20 lg:w-[22.5%]",
  "lg:mt-5 lg:w-[19%]",
  "lg:mt-12 lg:w-[18%]",
];

function StepItem({ step, index, prefersReducedMotion }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className="flex w-full min-w-0 items-center gap-3 md:min-w-[172px]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#E4EAF2] bg-white text-[#0088FF] shadow-[0_10px_26px_rgba(15,23,42,0.05)] sm:h-[52px] sm:w-[52px]">
        <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-sm font-semibold leading-none text-[#050A13] sm:text-[15px]">
          {step.title}
        </span>
        <span className="mt-1.5 block max-w-[11rem] text-[11px] font-medium leading-[1.25] text-[#6B7280] md:max-w-[106px]">
          {step.text}
        </span>
      </span>
    </motion.div>
  );
}

function PhoneFrame({ screen, index, prefersReducedMotion }) {
  let screenBounds =
    "left-[4.4%] right-[4.4%] top-[1.2%] bottom-[1.45%] rounded-[2.55rem]";

  if (index === 0 || index === 4) {
    screenBounds =
      "left-[3.2%] right-[3.2%] top-[0.8%] bottom-[1%] rounded-[2.35rem]";
  } else if (index === 1 || index === 3) {
    screenBounds =
      "left-[3.7%] right-[3.7%] top-[1%] bottom-[1.2%] rounded-[2.45rem]";
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.52, ease: "easeOut", delay: 0.12 + index * 0.05 }}
      className={`relative mx-auto w-full max-w-[230px] sm:max-w-[250px] md:max-w-[260px] lg:max-w-[270px] ${phoneLayouts[index] || ""}`}
    >
      <div className="absolute inset-x-[18%] bottom-3 h-10 rounded-full bg-[#0F172A]/14 blur-[28px]" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_26px_52px_rgba(15,23,42,0.18)]">
        <div
          className={`absolute z-30 translate-y-[1px] overflow-hidden bg-white ${screenBounds}`}
        >
          <Image
            src={screen.image || appScreenshots[index]?.image || phoneFrameSrc}
            alt={screen.title}
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 220px, (min-width: 640px) 250px, 230px"
            className="object-cover object-center"
            priority={index === 2}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 220px, (min-width: 640px) 250px, 230px"
            className="select-none object-contain"
            priority={index === 2}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AppScreenshots() {
  const prefersReducedMotion = useReducedMotion();
  // Merge CMS screenshot fields onto the hardcoded defaults (keep UI-only props
  // like id/step/label/phoneLayouts so layout + animations stay intact).
  const [screens, setScreens] = useState(appScreenshots);

  useEffect(() => {
    fetchPage("app").then((page) => {
      const cms = page?.sections?.screenshots;
      if (!Array.isArray(cms) || cms.length === 0) return;
      const count = Math.max(appScreenshots.length, cms.length);
      const merged = Array.from({ length: count }, (_, i) => ({
        ...(appScreenshots[i] ?? {}),
        ...(cms[i] ?? {}),
      }));
      setScreens(merged);
    });
  }, []);

  return (
    <section className="overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F8FBFF] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4F5B6F] sm:px-4 sm:text-[11px] sm:tracking-[0.12em]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] text-[#0088FF]">
              <Check aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            Built for a cleaner parking flow
          </p>

          <h2 className="mx-auto mt-4 max-w-[760px] text-[clamp(2.25rem,12vw,4.9rem)] font-semibold leading-[0.98] tracking-tight text-[#050A13] sm:leading-[0.95]">
            Parking made simple.
            <br />
            From <span className="text-[#0088FF]">start to finish.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-sm font-light leading-6 text-[#8A94A6] sm:text-[15px]">
            Find your spot, book in seconds, pay securely, and get instant
            confirmation all in the HalaPark app.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-[1180px] pb-2 sm:mt-9">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:min-w-[930px] md:items-center md:justify-center md:gap-2">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-center gap-2 rounded-2xl border border-[#E4EAF2] bg-white p-3 shadow-[0_10px_26px_rgba(15,23,42,0.04)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
                  index === processSteps.length - 1
                    ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[22rem] md:col-span-1 md:mx-0 md:max-w-none"
                    : ""
                }`}
              >
                <StepItem
                  step={step}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
                {index < processSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-7 border-t border-dashed border-[#C8D0DC] md:block"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-[1260px] sm:mt-10">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[54%] h-28 w-[86%] -translate-x-1/2 rounded-full bg-[#EAF4FF] blur-[42px]"
          />

          <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-start lg:justify-center lg:gap-4">
            {screens.map((screen, index) => (
              <PhoneFrame
                key={screen.id ?? `screen-${index}`}
                screen={screen}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
