"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck2, CarFront, CircleParking, Search } from "lucide-react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

const steps = [
  {
    id: "01",
    title: "Search",
    description: "Find available parking near you.",
    icon: Search,
    accent: CircleParking,
  },
  {
    id: "02",
    title: "Book",
    description: "Reserve instantly or schedule ahead.",
    icon: CalendarCheck2,
  },
  {
    id: "03",
    title: "Park",
    description: "Arrive stress-free - your spot is ready.",
    icon: CarFront,
    accent: CircleParking,
  },
];

export default function HowItWorksDemoSection() {
  const { language } = useLanguage();
  const [content, setContent] = useState({});
  const [stepItems, setStepItems] = useState([]);

  useEffect(() => {
    fetchHomeSection("howItWorks").then((d) => {
      if (!d || typeof d !== "object") return;
      setContent({ ...d });
      // Steps come strictly from the CMS (text); the hardcoded base only
      // supplies UI-only props (icons) by index. Cleared steps (no text) are
      // dropped so no empty card shells/icons render.
      setStepItems(
        (Array.isArray(d.steps) ? d.steps : [])
          .map((c, i) => ({
            ...(steps[i] ?? {}),
            id: steps[i]?.id ?? String(i + 1).padStart(2, "0"),
            title: c?.title ?? "",
            description: c?.description ?? "",
            ar: c?.ar,
          }))
          .filter(
            (s) => ((s.title ?? "").trim()) || ((s.description ?? "").trim()),
          ),
      );
    });
  }, []);

  // Hide the section entirely when the admin has cleared all content: no
  // heading/subtitle (EN, non-blank), no steps with text, and no video.
  const hasHeading =
    ((content.heading ?? "").trim()) ||
    ((content.headingGradient ?? "").trim()) ||
    ((content.subtitle ?? "").trim());
  if (content?.enabled === false) return null;
  if (!hasHeading && stepItems.length === 0 && !content.videoUrl) return null;

  return (
    <section
      aria-labelledby="how-it-works-title"
      className="bg-[linear-gradient(160deg,#F8FCFF_0%,#FFFFFF_45%,#EEF6FF_100%)] py-12 sm:py-14 lg:py-16"
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-[980px] text-center">
            {/* <p className="mx-auto inline-flex items-center rounded-full border border-[#7AB9FF]/45 bg-white/85 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0078E0] sm:text-[13px]">
              HOW IT WORKS
            </p> */}
            {/* Heading on its own line; the gradient part sits on a second line
                below it (never flowing into / overlapping the heading text). */}
            <h2
              id="how-it-works-title"
              className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]"
            >
              <span className="block">{t(content, "heading", language)}</span>
              {t(content, "headingGradient", language) ? (
                <span className="block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                  {t(content, "headingGradient", language)}
                </span>
              ) : null}
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem] [overflow-wrap:anywhere]">
              {t(content, "subtitle", language)}
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <div className="mx-auto w-full max-w-[620px] lg:mx-0">
              {stepItems.length > 0 ? (
              <div className="relative ps-[72px] sm:ps-[116px]">
                <span
                  aria-hidden="true"
                  className="absolute start-[16px] top-9 bottom-[48px] border-s-2 border-dashed border-[#BDD0E6] sm:start-[28px]"
                />
                <span
                  aria-hidden="true"
                  className="how-it-works-progress absolute start-[16px] top-9 h-14 border-s-2 border-dashed border-[#0088FF] sm:start-[28px]"
                />

                <div className="space-y-3.5 sm:space-y-4">
                  {stepItems.map((step) => {
                    // CMS can hold more steps than the hardcoded icon list —
                    // fall back to a generic icon so extra steps never crash.
                    const Icon = step.icon ?? CircleParking;
                    const AccentIcon = step.accent;

                    return (
                      <article
                        key={step.id}
                        className="relative flex min-h-[82px] items-center gap-3.5 rounded-[15px] border border-[#E5EEF8] bg-white p-3 shadow-[0_7px_18px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-[#BFDFFF] hover:shadow-[0_14px_30px_rgba(0,136,255,0.13)] sm:min-h-[94px] sm:gap-4 sm:rounded-[18px] sm:p-3.5"
                      >
                        <span className="absolute -start-[70px] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#168EFF] text-[0.85rem] font-bold text-white shadow-[0_8px_18px_rgba(0,136,255,0.34)] ring-4 ring-white sm:-start-[110px] sm:h-[48px] sm:w-[48px] sm:text-[0.95rem]">
                          {step.id}
                        </span>
                        <div className="relative flex h-[62px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#F1F7FF] text-[#168EFF] sm:h-[68px] sm:w-[96px]">
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-45 [background-image:linear-gradient(135deg,rgba(0,136,255,0.12)_25%,transparent_25%),linear-gradient(225deg,rgba(0,136,255,0.1)_25%,transparent_25%),linear-gradient(45deg,rgba(0,136,255,0.1)_25%,transparent_25%),linear-gradient(315deg,rgba(0,136,255,0.12)_25%,#F1F7FF_25%)] [background-position:12px_0,12px_0,0_0,0_0] [background-size:24px_24px]"
                          />
                          {AccentIcon ? (
                            <AccentIcon
                              aria-hidden="true"
                              className="absolute end-4 top-3 h-6 w-6 fill-white stroke-[2.4]"
                            />
                          ) : null}
                          <Icon
                            aria-hidden="true"
                            className="relative h-9 w-9 stroke-[2.7] sm:h-10 sm:w-10"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[1.08rem] font-bold leading-tight text-[#182238] sm:text-[1.18rem] [overflow-wrap:anywhere]">
                            {t(step, "title", language)}
                          </h3>
                          {/* line-clamp keeps over-long admin text from stretching the card. */}
                          <RichText text={t(step, "description", language)} className="mt-1 max-w-[260px] text-[0.84rem] font-medium leading-snug text-[#6C7587] sm:text-[0.92rem] line-clamp-3 [overflow-wrap:anywhere]" />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
              ) : null}

              {t(content, "ctaLabel", language) ? (
                <div className="mt-4 flex flex-wrap items-center gap-3 ps-[88px] sm:ps-[116px]">
                  <Link
                    href={content.ctaHref || "/app"}
                    className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[10px] bg-[#168EFF] px-7 py-3 text-[0.98rem] font-bold text-white shadow-[0_10px_24px_rgba(0,136,255,0.34)] transition hover:-translate-y-0.5 hover:brightness-95"
                  >
                    <CarFront
                      aria-hidden="true"
                      className="h-5 w-5 stroke-[2.6]"
                    />
                    {t(content, "ctaLabel", language)}
                  </Link>
                </div>
              ) : null}
            </div>

            {content.videoUrl ? (
              <div className="relative">
                <div className="absolute inset-0 rounded-[24px] bg-[#0088FF]/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[24px] border border-[#D6E8FF] bg-[#08142A] p-2 shadow-[0_24px_46px_rgba(15,23,42,0.25)]">
                  <video
                    className="h-full w-full rounded-[18px] object-cover"
                    src={content.videoUrl}
                    key={content.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes how-it-works-drop {
          0% {
            top: 36px;
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            /* Travel the full track: segment bottom lands at the grey line's
               end (48px from the container bottom; segment is 56px tall).
               Using top + calc keeps it correct for any number of steps. */
            top: calc(100% - 104px);
            opacity: 0.15;
          }
        }

        .how-it-works-progress {
          animation: how-it-works-drop 3.4s linear infinite;
        }
      `}</style>
    </section>
  );
}
