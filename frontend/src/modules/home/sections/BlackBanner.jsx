"use client";

import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { ArrowRight, Cctv, BarChart3, Car, ShieldCheck } from "lucide-react";
import MobilePicture from "@/components/common/MobilePicture";
import Link from "next/link";

// Hosts that are this same website (production, staging, Vercel preview).
const OWN_HOSTS = /(^|\.)halapark\.com$|^halapark-umber\.vercel\.app$/i;

// CTA links from the CMS → an in-site path where possible, so the button
// navigates within the current domain instead of jumping to another host or
// scrolling the home page:
//  • https://halapark.com/services, https://halapark-umber.vercel.app/services → /services
//  • #services, /#services (the home Services section) → /services page
// Anything else (other sites, mailto:, tel:) is left exactly as entered.
function resolveCtaHref(href) {
  const raw = (href ?? "").trim();
  if (!raw) return "";
  let path = raw;
  try {
    const u = new URL(raw);
    if (OWN_HOSTS.test(u.hostname)) path = `${u.pathname}${u.search}${u.hash}` || "/";
  } catch {
    /* relative path or non-URL — keep as is */
  }
  // "View Our Services" (#services, /#services or /services) lands straight on
  // the services list of the Services page, not at the top of its hero.
  if (/^\/?#services$/i.test(path) || /^\/services\/?$/i.test(path)) return "/services#services-grid";
  return path;
}

// Built-in marks for the ring nodes, used when no icon is uploaded.
const BANNER_NODE_ICONS = [Cctv, Car, BarChart3, ShieldCheck];

// Desktop geometry in SVG units (0–100 across the circle box). Dots sit on the
// thin outer ring (r≈49) at the four 45° points; each line starts just outside
// its icon (icon centres follow the `spot` offsets below, radius ≈ 6.3 units).
const BANNER_NODE_GEOMETRY = (() => {
  const dots = [
    [15.4, 15.4],
    [84.6, 15.4],
    [15.4, 84.6],
    [84.6, 84.6],
  ];
  const icons = [
    [-0.6, 2.3],
    [100.6, 2.3],
    [-0.6, 98.3],
    [100.6, 98.3],
  ];
  const R = 7.4; // icon radius + a little breathing room
  return dots.map(([dx, dy], i) => {
    const [ix, iy] = icons[i];
    const len = Math.hypot(dx - ix, dy - iy) || 1;
    return { x1: ix + ((dx - ix) / len) * R, y1: iy + ((dy - iy) / len) * R, x2: dx, y2: dy };
  });
})();

export default function BlackBanner() {
  const { language } = useLanguage();
  const [featureCard, setFeatureCard] = useState({});

  useEffect(() => {
    fetchHomeSection("blackBanner").then((data) => {
      if (data && typeof data === "object") {
        setFeatureCard({
          enabled: data.enabled,
          ar: data.ar,
          title: data.title || "",
          titleAccent: (data.titleAccent || "").trim(),
          eyebrow: (data.eyebrow || "").trim(),
          description: data.description || "",
          image: data.image || "",
          mobileImage: data.mobileImage || "",
          // Labelled nodes around the circular image. Each needs a label; an
          // uploaded iconImage replaces the built-in mark.
          features: (Array.isArray(data.features) ? data.features : []).filter(
            (f) => f && ((f.label ?? "").trim()),
          ),
          // Only CTAs with a real label count — cleared CTA shells must not
          // render ghost buttons or keep the section alive.
          ctas: (Array.isArray(data.ctas) ? data.ctas : []).filter(
            (c) => c && ((c.label ?? "").trim()),
          ),
        });
      }
    });
  }, []);

  // Hide the section entirely when the admin has cleared all TEXT content —
  // an image alone does not keep the box alive.
  if (featureCard?.enabled === false) return null;
  if (
    !((featureCard.title ?? "").trim()) &&
    !((featureCard.description ?? "").trim()) &&
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
                {/* Dotted grids, bottom-left and top-right */}
                <div
                  className="absolute bottom-[14%] left-[46%] h-[70px] w-[110px] opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.55)_1.2px,transparent_1.2px)] [background-size:13px_13px]"
                />
                <div
                  className="absolute right-[3%] top-[8%] h-[80px] w-[120px] opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.5)_1.2px,transparent_1.2px)] [background-size:13px_13px]"
                />
                {/* Deeper blue shape sweeping behind the circle */}
                <div
                  className="absolute -right-[8%] top-[-18%] h-[420px] w-[420px] rounded-full"
                  style={{ background: "radial-gradient(circle at 40% 40%, rgba(10,80,165,0.42), transparent 62%)" }}
                />
                <div className="absolute inset-[1px] rounded-[24px] border border-white/5" />

              </div>

              <div className="relative z-10 grid flex-1 gap-12 sm:gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
                {/* ── LEFT: eyebrow, heading, copy, buttons ── */}
                <div className="lg:col-span-7">
                  {t(featureCard, "eyebrow", language) ? (
                    <div className="mb-5 flex items-center gap-3">
                      <span aria-hidden className="h-px w-10 bg-white/50" />
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80 [overflow-wrap:anywhere]">
                        {t(featureCard, "eyebrow", language)}
                      </span>
                    </div>
                  ) : null}

                  <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
                    <span className="block">{t(featureCard, "title", language)}</span>
                    {t(featureCard, "titleAccent", language) ? (
                      <span className="block text-[#A9D8FF]">{t(featureCard, "titleAccent", language)}</span>
                    ) : null}
                  </h2>

                  <p className="mt-5 max-w-[540px] text-[0.92rem] leading-7 tracking-[-0.01em] text-white/80 [overflow-wrap:anywhere]">
                    <RichText text={t(featureCard, "description", language)} />
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {(featureCard.ctas || []).map((cta, index) => {
                      const href = resolveCtaHref(cta.href);
                      const cls = `group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold tracking-[-0.02em] transition-all duration-200 sm:text-[15px] ${
                        index === 0
                          ? "bg-white text-[#0A1B33] hover:bg-white/90"
                          : "border border-white/45 text-white hover:bg-white/10"
                      }`;
                      const inner = (
                        <>
                          {t(cta, "label", language)}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
                        </>
                      );
                      // In-site paths use Next's router: the new page opens at
                      // its top, no full reload. Everything else stays a plain link.
                      return href.startsWith("/") && !href.startsWith("//") ? (
                        <Link key={cta.label} href={href} scroll className={cls}>
                          {inner}
                        </Link>
                      ) : (
                        <a key={cta.label} href={href || undefined} className={cls}>
                          {inner}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* ── RIGHT: circular image ringed by labelled feature nodes ── */}
                {featureCard.image ? (
                  <div className="lg:col-span-5">
                    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[340px] md:my-10 md:mb-20 lg:max-w-[380px]">
                      {/* Connector lines: from each icon's edge to a dot that sits
                          ON the thin outer ring (45° points), like the reference. */}
                      {(featureCard.features || []).length > 0 ? (
                        <svg
                          aria-hidden
                          viewBox="0 0 100 100"
                          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
                        >
                          {BANNER_NODE_GEOMETRY.slice(0, (featureCard.features || []).length).map((g, i) => (
                            <g key={i}>
                              <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke="rgba(255,255,255,0.7)" strokeWidth="0.35" />
                              <circle cx={g.x2} cy={g.y2} r="1.5" fill="#ffffff" />
                            </g>
                          ))}
                        </svg>
                      ) : null}

                      {/* Thin outer ring with clear space, then the glowing photo */}
                      <div aria-hidden className="absolute inset-0 rounded-full border border-white/60" />
                      <div aria-hidden className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),transparent_64%)] blur-[2px]" />
                      <div aria-hidden className="absolute inset-[2%] rounded-full border-[5px] border-[#4FB0FF]/75 shadow-[0_0_44px_rgba(79,176,255,0.45)]" />
                      <div className="absolute inset-[5%] overflow-hidden rounded-full ring-1 ring-white/30">
                        <MobilePicture mobileSrc={featureCard.mobileImage}>
                          <img
                            src={featureCard.image}
                            alt="Banner visual"
                            className="h-full w-full object-cover object-center"
                          />
                        </MobilePicture>
                      </div>

                      {/* Nodes — placed at the four corners from tablet (md) up */}
                      {(featureCard.features || []).slice(0, 4).map((f, i) => {
                        const Icon = BANNER_NODE_ICONS[i % BANNER_NODE_ICONS.length];
                        // Pushed out diagonally so each connector runs at ~45°
                        // into its dot on the outer ring (see BANNER_NODE_GEOMETRY).
                        // Spots are physical (left/right), so in Arabic the icon
                        // alignment is flipped back to keep it on the line.
                        const spot = [
                          "md:-left-[28%] md:-top-[4%] md:text-end md:items-end rtl:md:text-start rtl:md:items-start",
                          "md:-right-[28%] md:-top-[4%] md:text-start md:items-start rtl:md:text-end rtl:md:items-end",
                          "md:-left-[28%] md:-bottom-[16%] md:text-end md:items-end rtl:md:text-start rtl:md:items-start",
                          "md:-right-[28%] md:-bottom-[16%] md:text-start md:items-start rtl:md:text-end rtl:md:items-end",
                        ][i];
                        return (
                          <div
                            key={`${f.label}-${i}`}
                            className={`hidden md:absolute md:flex md:w-[128px] md:flex-col md:gap-2 ${spot}`}
                          >
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_26px_rgba(3,25,56,0.28)]">
                              {(f.iconImage || "").trim() ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={f.iconImage} alt="" className="h-6 w-6 object-contain" />
                              ) : (
                                <Icon className="h-5 w-5 text-[#0A6FD8]" aria-hidden />
                              )}
                            </span>
                            <span className="text-[0.82rem] font-semibold leading-tight text-white [overflow-wrap:anywhere]">
                              {t(f, "label", language)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Same nodes as a simple grid below the circle on phones */}
                    {(featureCard.features || []).length > 0 ? (
                      <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
                        {(featureCard.features || []).slice(0, 4).map((f, i) => {
                          const Icon = BANNER_NODE_ICONS[i % BANNER_NODE_ICONS.length];
                          return (
                            <div key={`m-${f.label}-${i}`} className="flex items-center gap-2.5">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(3,25,56,0.25)]">
                                {(f.iconImage || "").trim() ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={f.iconImage} alt="" className="h-5 w-5 object-contain" />
                                ) : (
                                  <Icon className="h-4 w-4 text-[#0A6FD8]" aria-hidden />
                                )}
                              </span>
                              <span className="text-[0.8rem] font-semibold leading-tight text-white [overflow-wrap:anywhere]">
                                {t(f, "label", language)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : null}
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
