"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t, ui } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const AUTO_STEP_INTERVAL_MS = 2400;
const LAST_STEP_TICK_HOLD_MS = 260;

const phoneFrameSrc = "/mobileframe.png";

function PhonePreview({ screen, label }) {
  return (
    <div className="relative mx-auto w-[205px] sm:w-[228px] lg:w-[320px]">
      <div className="absolute inset-x-[18%] bottom-3 h-12 rounded-full bg-[#0F172A]/14 blur-[28px]" />

      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_28px_60px_-28px_rgba(15,23,42,0.45)]">
        {screen ? (
          <div className="absolute left-[4.2%] right-[4.2%] top-[1.05%] bottom-[1.05%] z-10 overflow-hidden bg-white [border-radius:16.4%/7.6%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${label}-${screen}`}
                initial={{ opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute top-0 -bottom-[2.5%] left-0 right-0"
              >
                <Image
                  src={screen}
                  alt={`${label} screen preview`}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 228px, 205px"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="absolute left-[4.2%] right-[4.2%] top-[1.05%] bottom-[1.05%] z-10 overflow-hidden bg-[linear-gradient(170deg,#F2F8FF,#E3EFFC)] [border-radius:16.4%/7.6%]" />
        )}

        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={phoneFrameSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 228px, 205px"
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
  // Tabs come STRICTLY from CMS content.tabs — no merge with hardcoded defaults.
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const dir = language === "ar" ? "rtl" : "ltr";
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [activeStep, setActiveStep] = useState("");
  const [showLastStepTick, setShowLastStepTick] = useState(false);
  const [content, setContent] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("app")
      .then((data) => {
        const section = data?.sections?.serviceTabs;
        if (section && typeof section === "object") setContent(section);
        const cmsTabs = section?.tabs;
        // Keep only CMS tabs that carry a real label (either language) and steps.
        // Keep only CMS tabs with a real label. Blank step entries (the admin
        // saves [""] when the field is cleared) are dropped, so a tab may have
        // zero steps — it then shows its copy and screen with no step row.
        const validTabs = Array.isArray(cmsTabs)
          ? cmsTabs
              .filter(
                (tab) =>
                  tab &&
                  typeof tab === "object" &&
                  ((typeof tab.label === "string" && tab.label.trim()) ||
                    (typeof tab.ar?.label === "string" && tab.ar.label.trim())),
              )
              .map((tab) => {
                const keep = (Array.isArray(tab.steps) ? tab.steps : []).map((st, i) => [st, i]).filter(([st]) => typeof st === "string" && st.trim());
                return {
                  ...tab,
                  steps: keep.map(([st]) => st),
                  ar: { ...(tab.ar ?? {}), steps: keep.map(([, i]) => tab.ar?.steps?.[i] ?? "") },
                };
              })
          : [];
        setTabs(validTabs);
        if (validTabs.length) {
          setActiveTab(validTabs[0].key);
          setActiveStep(validTabs[0].steps[0] ?? null);
        }
      })
      .finally(() => setResolved(true));
  }, []);

  const hasTabs = tabs.length > 0;

  // Derive a valid active tab/step so CMS tab changes never leave a stale selection.
  const activeService = hasTabs
    ? tabs.find((service) => service.key === activeTab) || tabs[0]
    : null;
  const activeSteps = activeService?.steps ?? [];
  const safeActiveStep = activeSteps.includes(activeStep)
    ? activeStep
    : activeSteps[0];
  const activeScreen = activeService
    ? activeService.stepScreens?.[safeActiveStep] || activeService.screen || ""
    : "";
  const activeStepIndex = Math.max(activeSteps.indexOf(safeActiveStep), 0);
  const displayStepIndex = showLastStepTick
    ? activeSteps.length
    : activeStepIndex;

  useEffect(() => {
    if (!hasTabs) return undefined;
    const timer = window.setTimeout(
      () => {
        const currentTabIndex = tabs.findIndex(
          (service) => service.key === activeTab,
        );
        const safeTabIndex = currentTabIndex >= 0 ? currentTabIndex : 0;
        const currentService = tabs[safeTabIndex];
        if (currentService.steps.length === 0) {
          const nextTab = tabs[(safeTabIndex + 1) % tabs.length];
          setShowLastStepTick(false);
          setActiveTab(nextTab.key);
          setActiveStep(nextTab.steps[0] ?? null);
          return;
        }
        const currentStepIndex = currentService.steps.indexOf(activeStep);
        const safeStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
        const isLastStep = safeStepIndex >= currentService.steps.length - 1;

        if (isLastStep) {
          if (!showLastStepTick) {
            setShowLastStepTick(true);
            return;
          }
          const nextTab = tabs[(safeTabIndex + 1) % tabs.length];
          setShowLastStepTick(false);
          setActiveTab(nextTab.key);
          setActiveStep(nextTab.steps[0] ?? null);
          return;
        }

        const nextStepIndex = safeStepIndex + 1;
        setShowLastStepTick(false);
        setActiveStep(currentService.steps[nextStepIndex]);
      },
      showLastStepTick ? LAST_STEP_TICK_HOLD_MS : AUTO_STEP_INTERVAL_MS,
    );

    return () => window.clearTimeout(timer);
  }, [activeTab, activeStep, showLastStepTick, tabs, hasTabs]);

  // Render nothing until the fetch settles; hide the whole section if no valid CMS tabs.
  if (content?.enabled === false) return null;
  if (!resolved || !hasTabs) return null;

  // Per-tab pills — trimmed so whitespace-only test values never render empty.
  const cardKicker = (t(activeService, "cardKicker", language) || "").trim();
  const tabCta = (t(activeService, "cta", language) || "").trim();

  const featureChips = (
    language === "ar" ? content.ar?.featureChips : content.featureChips
  );
  // Trim chips and drop any blank/whitespace-only entries so no empty pill renders.
  const chips = Array.isArray(featureChips)
    ? featureChips
        .filter((c) => typeof c === "string" && c.trim())
        .map((c) => c.trim())
    : [];
  const ctaLabel = (t(content, "ctaLabel", language) || "").trim();
  const ctaLink = (content?.ctaLink || "").trim();

  // `animate` (not whileInView) so the blur-to-clear reveal reliably replays on
  // every tab switch — the elements are keyed by tab and remount each time.
  const titleMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* Phones: 2-column grid of pill tabs (all visible, no sideways scroll,
            so the auto-advancing tab never slides off-screen). From sm up: the
            single underlined row, one equal column per tab. */}
        <div
          role="tablist"
          aria-label="App services"
          className="mb-8 grid grid-cols-2 gap-2 sm:mb-0 sm:gap-0 sm:border-b sm:border-[#D8DDE5] sm:[grid-template-columns:repeat(var(--tab-cols),minmax(0,1fr))]"
          style={{ "--tab-cols": tabs.length }}
        >
          {tabs.map((service) => {
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
                className={`relative flex min-w-0 items-center justify-start gap-2 rounded-xl border px-3 py-2.5 text-start text-[14px] sm:justify-center sm:text-center font-medium transition-colors duration-300 odd:last:col-span-2 sm:odd:last:col-span-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-2 sm:pb-6 lg:px-6 sm:pt-1 sm:text-[15px] md:text-[17px] ${
                  isActive
                    ? "border-[#0088FF]/40 bg-[#F3F8FF] text-[#1F2940]"
                    : "border-[#E4E7EC] bg-white text-[#7C8596] sm:text-[#D2D6DD] hover:text-[#7C8596]"
                }`}
              >
                {service.iconImage ? (
                  <Image
                    src={service.iconImage}
                    alt=""
                    width={22}
                    height={22}
                    className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
                  />
                ) : null}
                <span className="min-w-0 leading-tight [overflow-wrap:anywhere] lg:whitespace-nowrap">{t(service, "label", language)}</span>
                <span
                  className={`absolute bottom-[-1px] start-0 hidden h-0.5 bg-[#0088FF]/70 transition-all duration-300 sm:block ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Copy is start-aligned at every size (title, description, chips and
            CTA share one edge) and spans the tab grid's width on phones —
            centred long paragraphs read ragged next to start-aligned chips. */}
        <div className="flex flex-col items-center gap-10 text-start md:flex-row md:items-center md:justify-between">
          <div
            dir={dir}
            className="w-full md:flex-1 md:max-w-[500px] md:pt-6 lg:max-w-[560px] lg:pt-10"
          >
            <motion.h3
              key={activeService.key}
              {...titleMotion}
              className="text-[30px] font-medium tracking-[-0.04em] text-black sm:text-[34px] lg:text-[42px] lg:leading-[0.98] [overflow-wrap:anywhere]"
            >
              {t(activeService, "label", language)}
            </motion.h3>

            {t(activeService, "description", language) ? (
              <motion.div key={`desc-${activeService.key}`} {...titleMotion}>
                <RichText
                  text={t(activeService, "description", language)}
                  className="mt-5 text-[16px] leading-[1.7] text-[#667085] sm:text-[17px] [overflow-wrap:anywhere] block"
                />
              </motion.div>
            ) : null}

            {t(activeService, "builtFor", language) ? (
              <p className="mt-3 text-[15px] leading-[1.7] text-[#7A8599] sm:text-[16px] [overflow-wrap:anywhere]">
                {t(activeService, "builtFor", language)}
              </p>
            ) : null}


            {cardKicker || tabCta ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {cardKicker ? (
                  <span className="inline-flex items-center rounded-full border border-[#D7E7FF] bg-[#F3F8FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F4B86] [overflow-wrap:anywhere]">
                    {cardKicker}
                  </span>
                ) : null}
                {tabCta ? (
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-[#CFE3FF] bg-white px-3 py-1 text-xs font-semibold text-[#0F62C7] transition-colors duration-200 hover:bg-[#F5F9FF] [overflow-wrap:anywhere]"
                  >
                    {tabCta}
                  </button>
                ) : null}
              </div>
            ) : null}

            {chips.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-[#E4E7EC] bg-white px-3 py-1 text-xs font-medium text-[#475467] [overflow-wrap:anywhere]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            {ctaLabel ? (
              // Navigates when a CTA link is set in admin; otherwise stays a
              // static button (unchanged previous behavior).
              (() => {
                const ctaCls =
                  "mt-6 inline-flex items-center gap-3 rounded-xl bg-[#1F6BFF] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,107,255,0.28)] transition-colors duration-200 hover:bg-[#0F62C7] [overflow-wrap:anywhere]";
                const inner = (
                  <>
                    {ctaLabel}
                    <span aria-hidden className="text-base leading-none rtl:rotate-180">
                      →
                    </span>
                  </>
                );
                return ctaLink ? (
                  <Link
                    href={ctaLink}
                    target={/^https?:\/\//.test(ctaLink) ? "_blank" : undefined}
                    rel={/^https?:\/\//.test(ctaLink) ? "noopener noreferrer" : undefined}
                    className={ctaCls}
                  >
                    {inner}
                  </Link>
                ) : (
                  <button type="button" className={ctaCls}>
                    {inner}
                  </button>
                );
              })()
            ) : null}
            {activeService.steps.length > 0 ? (
            <div className="mt-8 rounded-[36px] border border-[#E5E7EB] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-4  sm:p-5">
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
                      className="min-w-0 flex-1 rounded-[28px] p-2 text-start transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center">
                        <StepStatusIcon state={state} stepNumber={index + 1} />
                        {index < activeService.steps.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="ms-3 h-1.5 flex-1 overflow-hidden rounded-full bg-[#E4E7EC]"
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
                          {ui("step", language)} {index + 1}
                        </span>
                        <span className="text-[19px] font-medium leading-[1.15] text-[#101828] sm:text-[22px] [overflow-wrap:anywhere]">
                          {language === "ar" ? (activeService.ar?.steps?.[index] ?? "") : step}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            ) : null}
          </div>

          <div className="mt-2 flex h-full w-full justify-center md:mt-8 md:w-[44%] md:flex-none md:justify-end lg:mt-10">
            <PhonePreview
              screen={activeScreen}
              label={`${t(activeService, "label", language)} ${safeActiveStep ?? ""}`.trim()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
