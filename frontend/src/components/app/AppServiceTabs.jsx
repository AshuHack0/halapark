"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { serviceFlows } from "./appContent";

const AUTO_STEP_INTERVAL_MS = 2400;
const LAST_STEP_TICK_HOLD_MS = 260;

const serviceShowcase = {
  public: {
    screen: "/Park.png",
    stepScreens: {
      Search: "/Map.png",
      Book: "/Park.png",
      Pay: "/Payment.png",
    },
    cta: "Start parking now",
    cardKicker: "Live inventory",
    cardTitle: "City Access Pass",
    cardCaption: "Fast entry",
    cardNote: "Live bays, smooth checkout, and reliable turnover.",
    cardGradient:
      "linear-gradient(135deg, #fbf5ea 0%, #f1e4d2 48%, #dcc4b0 100%)",
    cardFooter: "#8D7A77",
    halo: "bg-[#F6EEE2]",
  },
  private: {
    screen: "/Booking.png",
    stepScreens: {
      List: "/Booking.png",
      Manage: "/Home (1).png",
      Earn: "/recipt.png",
    },
    cta: "List your private bay",
    cardKicker: "Owner control",
    cardTitle: "Revenue Access Card",
    cardCaption: "Private rental",
    cardNote: "Availability, pricing, and payouts managed in one place.",
    cardGradient:
      "linear-gradient(135deg, #f6f1ec 0%, #e8ddd5 52%, #d1c0b4 100%)",
    cardFooter: "#7B6B67",
    halo: "bg-[#EEE6DF]",
  },
  valet: {
    screen: "/Find.png",
    stepScreens: {
      Request: "/Find.png",
      Track: "/Map.png",
      Retrieve: "/Done.png",
    },
    cta: "Request valet service",
    cardKicker: "Premium handoff",
    cardTitle: "Priority Drop-Off",
    cardCaption: "Valet flow",
    cardNote: "Collection, status tracking, and retrieval without friction.",
    cardGradient:
      "linear-gradient(135deg, #f7efe7 0%, #eddccc 48%, #d4bea8 100%)",
    cardFooter: "#8A7167",
    halo: "bg-[#F4E8DD]",
  },
  ev: {
    screen: "/Payment.png",
    stepScreens: {
      Locate: "/Map.png",
      Charge: "/Find.png",
      Pay: "/Payment.png",
    },
    cta: "Find EV-ready bays",
    cardKicker: "Charge ready",
    cardTitle: "Energy Lane Pass",
    cardCaption: "EV charging",
    cardNote: "Charging sessions and payments stay in one clean mobile flow.",
    cardGradient:
      "linear-gradient(135deg, #f8f3ea 0%, #ece2d7 50%, #d6c6b5 100%)",
    cardFooter: "#7D6F69",
    halo: "bg-[#F2EBE1]",
  },
};

const phoneFrameSrc = "/THis.avif";

function PhonePreview({ screen, label }) {
  return (
    <div className="relative mx-auto w-[156px] scale-95 sm:w-[228px] sm:scale-100 lg:w-[320px]">
      <div className="absolute inset-x-[18%] bottom-3 h-12 rounded-full bg-[#0F172A]/14 blur-[28px]" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_28px_60px_-28px_rgba(15,23,42,0.45)]">
        <div className="absolute left-[4.4%] right-[4.4%] top-[1.8%] bottom-[2.2%] z-10 overflow-hidden rounded-[2.4rem] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={screen}
                alt={`${label} screen preview`}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 228px, 156px"
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 228px, 156px"
            className="select-none object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function StepStatusIcon({ state, stepNumber }) {
  if (state === "completed") {
    return (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#16B364] bg-[#16B364] text-white shadow-[0_10px_24px_-16px_rgba(22,179,100,0.8)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 10.5 8.25 13.75 15 7" />
        </svg>
      </motion.span>
    );
  }

  if (state === "active") {
    return (
      <motion.span
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0088FF] bg-white text-[#0088FF] shadow-[0_0_0_4px_rgba(4,113,209,0.14)]"
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="h-4 w-4 rounded-full bg-[#0088FF]"
        />
      </motion.span>
    );
  }

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D0D5DD] bg-white text-[13px] font-semibold text-[#98A2B3]">
      {stepNumber}
    </span>
  );
}

export default function AppServiceTabs() {
  const [activeTab, setActiveTab] = useState(serviceFlows[0].key);
  const [activeStep, setActiveStep] = useState(serviceFlows[0].steps[0]);
  const [showLastStepTick, setShowLastStepTick] = useState(false);
  const activeService =
    serviceFlows.find((service) => service.key === activeTab) ||
    serviceFlows[0];
  const activeShowcase =
    serviceShowcase[activeService.key] || serviceShowcase.public;
  const activeScreen =
    activeShowcase.stepScreens?.[activeStep] || activeShowcase.screen;
  const activeStepIndex = Math.max(activeService.steps.indexOf(activeStep), 0);
  const displayStepIndex = showLastStepTick
    ? activeService.steps.length
    : activeStepIndex;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentTabIndex = serviceFlows.findIndex(
        (service) => service.key === activeTab,
      );
      const safeTabIndex = currentTabIndex >= 0 ? currentTabIndex : 0;
      const currentService = serviceFlows[safeTabIndex];
      const currentStepIndex = currentService.steps.indexOf(activeStep);
      const safeStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
      const isLastStep = safeStepIndex >= currentService.steps.length - 1;

      if (isLastStep) {
        if (!showLastStepTick) {
          setShowLastStepTick(true);
          return;
        }
        const nextTab = serviceFlows[(safeTabIndex + 1) % serviceFlows.length];
        setShowLastStepTick(false);
        setActiveTab(nextTab.key);
        setActiveStep(nextTab.steps[0]);
        return;
      }

      const nextStepIndex = safeStepIndex + 1;
      setShowLastStepTick(false);
      setActiveStep(currentService.steps[nextStepIndex]);
    }, showLastStepTick ? LAST_STEP_TICK_HOLD_MS : AUTO_STEP_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeTab, activeStep, showLastStepTick]);

  return (
    <section className="w-full bg-white mt-10">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="App services"
            className="grid min-w-max border-b border-[#D8DDE5] sm:min-w-0"
            style={{
              gridTemplateColumns: `repeat(${serviceFlows.length}, minmax(180px, 1fr))`,
            }}
          >
            {serviceFlows.map((service) => {
              const isActive = service.key === activeService.key;

              return (
                <button
                  key={service.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setShowLastStepTick(false);
                    setActiveTab(service.key);
                    setActiveStep(service.steps[0]);
                  }}
                  className={`relative px-6 pb-6 pt-1 text-[15px] flex items-center text-center justify-center font-medium transition-colors duration-300 md:text-[17px] ${
                    isActive
                      ? "text-[#1F2940]"
                      : "text-[#D2D6DD] hover:text-[#7C8596]"
                  }`}
                >
                  <span className="whitespace-nowrap">{service.label}</span>
                  <span
                    className={`absolute bottom-[-1px] left-0 h-0.5 bg-[#0088FF]/70 transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="w-full max-w-[360px] md:flex-1 md:max-w-[500px] md:pt-6 lg:max-w-[560px] lg:pt-10">
            <h3 className="text-[30px] font-medium tracking-[-0.04em] text-black sm:text-[34px] lg:text-[42px] lg:leading-[0.98]">
              {activeService.label}
            </h3>

            <p className="mt-5 text-[16px] leading-[1.7] text-[#667085] sm:text-[17px]">
              {activeService.description}
            </p>

            <div className="mt-8 rounded-[28px] border border-[#E5E7EB] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-4  sm:p-5">
              <div className="flex gap-3">
                {activeService.steps.map((step, index) => {
                  const isCompleted = index < displayStepIndex;
                  const isActive = index === displayStepIndex;
                  const state = isCompleted
                    ? "completed"
                    : isActive
                      ? "active"
                      : "pending";

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => {
                        setShowLastStepTick(false);
                        setActiveStep(step);
                      }}
                      aria-pressed={isActive}
                      className="min-w-0 flex-1 rounded-[22px] p-2 text-left transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center">
                        <StepStatusIcon state={state} stepNumber={index + 1} />
                        {index < activeService.steps.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="ml-3 h-1.5 flex-1 overflow-hidden rounded-full bg-[#E4E7EC]"
                          >
                            {isCompleted ? (
                              <span className="block h-full w-full rounded-full bg-[#16B364]" />
                            ) : isActive ? (
                              <motion.span
                                key={`connector-${activeService.key}-${activeStep}`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: AUTO_STEP_INTERVAL_MS / 1000,
                                  ease: "linear",
                                }}
                                className="block h-full w-full origin-left rounded-full bg-[#0088FF]"
                              />
                            ) : (
                              <span className="block h-full w-0 rounded-full bg-[#D0D5DD]" />
                            )}
                          </span>
                        ) : null}
                      </span>

                      <span className="mt-4 flex flex-col gap-1">
                        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#667085]">
                          Step {index + 1}
                        </span>
                        <span className="text-[19px] font-medium leading-[1.15] text-[#101828] sm:text-[22px]">
                          {step}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex h-full w-full justify-center md:mt-8 md:w-[44%] md:flex-none md:justify-end lg:mt-10">
            <PhonePreview
              screen={activeScreen}
              label={`${activeService.label} ${activeStep}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
