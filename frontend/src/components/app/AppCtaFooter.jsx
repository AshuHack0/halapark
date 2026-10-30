"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import MobilePicture from "@/components/common/MobilePicture";

// App-page CTA footer band. CMS shape (page "app" → sections.ctaFooter):
//   { heading, description, stores: [{ key, label, icon, href }], ar: { heading, description } }
// Strict Arabic via t() (no hardcoded fallbacks); every piece hides when blank.
export default function AppCtaFooter() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("app")
      .then((page) => setData(page?.sections?.ctaFooter ?? null))
      .finally(() => setResolved(true));
  }, []);

  if (!resolved) return null;
  if (data?.enabled === false) return null;

  const heading = t(data, "heading", language);
  const description = t(data, "description", language);

  // Optional banner artwork for the left half (admin → App page → CTA Footer).
  const bannerImage = (data?.image || "").trim();

  // A store renders only with an href AND (icon or label).
  const stores = (Array.isArray(data?.stores) ? data.stores : []).filter(
    (s) => s && (s.href ?? "").trim() && ((s.icon ?? "").trim() || (s.label ?? "").trim()),
  );

  // Hide the whole section when there's nothing to show.
  if (!heading.trim() && !description.trim() && stores.length === 0) return null;

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          dir={dir}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,#050A13_0%,#0B1220_42%,#0088FF_140%)] px-6 py-14 shadow-[0_28px_64px_rgba(15,23,42,0.28)] sm:px-10 sm:py-20 lg:px-16"
        >
          {/* Decorative layers: blueprint grid + soft glows + top hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0088FF]/35 blur-[100px] rtl:right-auto rtl:-left-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1AB2FF]/20 blur-[110px] rtl:left-auto rtl:-right-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1AB2FF]/60 to-transparent"
          />
          {/* Faint parking "P" watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 end-6 select-none text-[16rem] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[20rem]"
          >
            P
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            {/* LEFT — visual */}
            <div className="relative">
              {bannerImage ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] shadow-[0_24px_56px_rgba(2,8,20,0.45)] ring-1 ring-white/15">
                  <MobilePicture mobileSrc={data?.mobileImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bannerImage} alt="" aria-hidden className="h-full w-full object-cover object-center" />
                  </MobilePicture>
                  <div className="absolute inset-0 bg-[linear-gradient(140deg,transparent_35%,rgba(5,10,19,0.45)_100%)]" />
                </div>
              ) : (
                /* No artwork uploaded → a plain decorative panel keeps the split intact */
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px] bg-white/[0.04] ring-1 ring-white/10">
                  <div aria-hidden="true" className="absolute h-[70%] w-[70%] rounded-full border border-white/10">
                    <div className="absolute inset-8 rounded-full border border-white/[0.08]" />
                    <div className="absolute inset-16 rounded-full border border-white/[0.06]" />
                  </div>
                  <span aria-hidden="true" className="relative select-none text-[9rem] font-bold leading-none tracking-tighter text-white/[0.07]">
                    P
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT — headline, text, then the store buttons */}
            <div className="text-center lg:text-start">
              {heading.trim() ? (
                <h2 className="bg-[linear-gradient(180deg,#FFFFFF_55%,#9CC8F5_100%)] bg-clip-text text-3xl font-semibold leading-tight tracking-[-0.03em] text-transparent sm:text-4xl md:text-[3.2rem] [overflow-wrap:anywhere]">
                  {heading}
                </h2>
              ) : null}

              {description.trim() ? (
                <RichText
                  text={description}
                  className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:mx-0 [overflow-wrap:anywhere] block"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="mx-auto mt-7 block h-1 w-20 rounded-full bg-[linear-gradient(90deg,#0088FF,#1AB2FF)] lg:mx-0"
              />

              {/* Store buttons — below the text */}
              {stores.length > 0 ? (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  {stores.map((store, i) => {
                    const icon = (store.icon ?? "").trim();
                    // Store names are brand-like: in Arabic prefer ar.label but
                    // fall back to the English label (never blank out a brand).
                    const label =
                      language === "ar"
                        ? (store.ar?.label ?? "").trim() || (store.label ?? "").trim()
                        : (store.label ?? "").trim();
                    return (
                      <a
                        key={store.key || store.href || i}
                        href={store.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label || "App store"}
                        className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1AB2FF]/60 hover:bg-white/[0.13] hover:shadow-[0_14px_34px_rgba(0,136,255,0.32),inset_0_1px_0_rgba(255,255,255,0.12)]"
                      >
                        {icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={icon} alt={label || "Store"} className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9" />
                        ) : (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0088FF]/25 text-[#7CC4FF] transition-colors group-hover:bg-[#0088FF] group-hover:text-white">
                            <Download className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                          </span>
                        )}
                        {label ? (
                          <span className="text-[0.95rem] font-semibold text-white [overflow-wrap:anywhere]">{label}</span>
                        ) : null}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
