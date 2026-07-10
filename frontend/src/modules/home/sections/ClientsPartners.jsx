"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

export default function ClientsPartners() {
  const { language } = useLanguage();
  const [cp, setCp] = useState({});

  useEffect(() => {
    fetchHomeSection("clientsPartners").then((d) => {
      if (d && typeof d === "object") {
        setCp({
          ar: d.ar,
          heading: d.heading || "",
          headingEnd: d.headingEnd || "",
          // Admin toggle: split the heading onto two lines (default: one line).
          headingBr: d.headingBr === true,
          ctaLabel: d.ctaLabel || "",
          ctaHref: d.ctaHref || "",
          logos: Array.isArray(d.logos) ? d.logos.filter((l) => l && l.image) : [],
          logoPlaceholders: Array.isArray(d.logoPlaceholders)
            ? d.logoPlaceholders
            : [],
        });
      }
    });
  }, []);

  // Prefer uploaded logo images; fall back to text placeholders if none.
  const hasLogos = (cp.logos || []).length > 0;
  const placeholderItems = [...(cp.logoPlaceholders || []), ...(cp.logoPlaceholders || [])];

  // Hide the section entirely when the admin hasn't entered any content:
  // no heading (EN), no headingEnd (EN), and no logos or placeholders.
  if (cp?.enabled === false) return null;
  if (
    !cp.heading &&
    !cp.headingEnd &&
    !hasLogos &&
    (cp.logoPlaceholders || []).length === 0
  )
    return null;

  return (
    <section className="py-10 sm:py-12 md:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-5 sm:p-7 md:p-8">
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center">
              {/* <div className="flex w-full justify-center">
                <div className="flex w-fit items-center justify-center gap-1.5 rounded-full px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
                  <img
                    src="/download(1).svg"
                    alt="About HalaPark"
                    className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                  />
                  <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
                    Our Clients & Partners
                  </p>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                Trusted Across Properties, Retail Spaces, and Enterprise
                Networks
              </h2> */}
              <div className="mx-auto max-w-[980px] text-center">
                {/* <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#0088FF] sm:text-[14px]">
                Clients We've Partnered With
                </p> */}

                <h2
                  id="clients-partners-title"
                  className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]"
                >
                  {t(cp, "heading", language)}
                  {t(cp, "headingEnd", language) ? (
                    <>
                      {cp.headingBr ? <br /> : " "}
                      {t(cp, "headingEnd", language)}
                    </>
                  ) : null}
                </h2>
              </div>
            </div>
          </div>
          {/* ========================= from right to left to right =============================== */}
          {/* overflow-x-hidden (not overflow-hidden) so card top/bottom borders
              aren't clipped — fixes the "broken border" look. */}
          <div className="relative mt-8 overflow-x-hidden py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24" />

            <div className="clients-ticker flex w-max items-stretch gap-5 sm:gap-7">
              {hasLogos
                ? // Duplicate the list so the -50% loop is seamless (no jump /
                  // clipped card borders mid-scroll). Each card auto-sizes to its
                  // logo: fixed height, width fits the image (no distortion, no
                  // forced min/max that leaves empty space).
                  [...cp.logos, ...cp.logos].map((logo, index) => (
                    <div
                      key={`${logo.image}-${index}`}
                      className="flex h-[72px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 sm:h-[84px] sm:px-7"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.image}
                        alt={logo.alt || "Client logo"}
                        className="h-9 w-auto max-w-[180px] object-contain sm:h-11"
                      />
                    </div>
                  ))
                : placeholderItems.map((name, index) => (
                    <div
                      key={`${name}-${index}`}
                      className="flex min-w-[140px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 px-4 py-5 text-center text-[0.78rem] font-medium text-slate-500 sm:min-w-[200px] sm:px-7 sm:py-6 sm:text-sm"
                    >
                      {name}
                    </div>
                  ))}
            </div>
          </div>

          {/* CTA — CMS-driven; hidden when no label is set in admin. */}
          {t(cp, "ctaLabel", language) ? (
            <div className="mt-8 flex justify-center">
              <Link
                href={cp.ctaHref || "/contact"}
                className="inline-flex min-h-[3.05rem] items-center justify-center rounded-full bg-[#0088FF] px-8 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.2)] transition hover:brightness-110 [overflow-wrap:anywhere]"
              >
                {t(cp, "ctaLabel", language)}
              </Link>
            </div>
          ) : null}
          {/* ========================= from left to right =============================== */}
          {/* <div className="relative mt-6 overflow-hidden py-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24" />

            <div className="clients-ticker flex w-max items-center gap-2.5 sm:gap-3">
              {tickerItems.map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex min-w-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 px-4 py-5 text-center text-sm font-medium text-slate-500 sm:min-w-[190px] sm:text-base"
                >
                  {name}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .clients-ticker {
          animation: clients-ticker-scroll 24s linear infinite;
        }

        @keyframes clients-ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
