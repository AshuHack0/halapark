"use client";

import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

export default function BlackBanner() {
  const { language } = useLanguage();
  const [featureCard, setFeatureCard] = useState({});

  useEffect(() => {
    fetchHomeSection("blackBanner").then((data) => {
      if (data && typeof data === "object") {
        setFeatureCard({
          ar: data.ar,
          title: data.title || "",
          description: data.description || "",
          ctas: Array.isArray(data.ctas) ? data.ctas : [],
        });
      }
    });
  }, []);

  // Hide the section entirely when the admin hasn't entered any content:
  // no title (EN), no description (EN) and no CTAs.
  if (
    !featureCard.title &&
    !featureCard.description &&
    (featureCard.ctas || []).length === 0
  )
    return null;

  return (
    <section className="bg-white pb-4 pt-0 font-sans sm:pb-5 lg:pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] pb-12 pt-0 sm:pb-16">
          <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[500px]">
            <article
              className="black-banner-flow relative isolate flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[390px] lg:px-[56px] lg:py-[46px] xl:px-[72px]"
              style={{
                background:
                  "linear-gradient(135deg, #0088FF 0%, #163A63 900%)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div
                  className="absolute inset-0 rounded-[24px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 38%)",
                  }}
                />
                <div
                  className="absolute left-[-4%] top-[70%] h-[180px] w-[180px] rounded-full blur-[90px] sm:left-[6%]"
                  style={{ background: "rgba(0,136,255,0.58)" }}
                />
                <div
                  className="absolute left-[16%] top-[64%] h-[230px] w-[230px] rounded-full blur-[110px] sm:left-[26%]"
                  style={{ background: "rgba(189, 227, 255, 0.6)" }}
                />
                <div
                  className="absolute right-[-6%] top-[56%] h-[300px] w-[260px] rounded-full blur-[95px] sm:right-[0%]"
                  style={{ background: "rgba(22, 58, 99, 0.5)" }}
                />
                <div
                  className="absolute right-[12%] top-[18%] h-[140px] w-[140px] rounded-full blur-[90px]"
                  style={{ background: "rgba(189, 227, 255, 0.24)" }}
                />
                <div className="absolute inset-[1px] rounded-[24px] border border-white/5" />
                <div
                  className="absolute inset-x-[8%] bottom-[-72px] h-[140px] rounded-full border border-white/40"
                  style={{ filter: "blur(0.25px)" }}
                />
              </div>

              <div className="relative z-10 grid flex-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h2 className="max-w-[16ch] text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
                    {t(featureCard, "title", language)}
                  </h2>

                  <p className="mt-5 max-w-[650px] text-justify text-[0.88rem] leading-6 tracking-[-0.02em] text-white/74 [overflow-wrap:anywhere] sm:text-[0.94rem]">
                    {t(featureCard, "description", language)}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {(featureCard.ctas || []).map((cta, index) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-5 text-[14px] font-semibold tracking-[-0.03em] transition-all duration-200 sm:min-h-[52px] sm:min-w-[210px] sm:text-[15px] ${
                          index === 0
                            ? "bg-white text-[#090d1d] hover:bg-white/90"
                            : "border border-white/18 bg-white/6 text-white backdrop-blur-sm hover:bg-white/10"
                        }`}
                      >
                        {t(cta, "label", language)}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-start lg:col-span-4 lg:justify-end lg:-translate-y-3">
                  <div className="relative overflow-hidden">
                    <div className="black-logo-shine absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <img
                      src="/Layer_1.svg"
                      alt="Hala Park logo"
                      className="relative z-[1] h-44 w-auto sm:h-52 lg:h-64"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <style jsx>{`
        .black-banner-flow {
          background-size: 180% 180%;
          animation: blackBannerGradientFlow 10s ease-in-out infinite;
        }

        .black-logo-shine {
          transform: skewX(-16deg) translateX(-180%);
          animation: blackLogoShineLoop 3.2s ease-in-out infinite;
          mix-blend-mode: screen;
          opacity: 0.5;
          filter: blur(0.5px);
        }

        @keyframes blackBannerGradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes blackLogoShineLoop {
          0% {
            transform: skewX(-16deg) translateX(-180%);
            opacity: 0;
          }
          16% {
            opacity: 0.42;
          }
          44% {
            transform: skewX(-16deg) translateX(360%);
            opacity: 0.52;
          }
          56% {
            opacity: 0;
          }
          100% {
            transform: skewX(-16deg) translateX(360%);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .black-banner-flow {
            animation: none;
          }
          .black-logo-shine {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
