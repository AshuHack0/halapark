"use client";

import Link from "next/link";

/**
 * The Clients & Partners logo ticker.
 *
 * This is the single source of truth for that band — the Home, Business and
 * Services pages all render THIS component, so the three sections are identical
 * rather than three lookalikes. Logos only: no names, no industry labels.
 *
 * Props:
 *   heading     first line of the title
 *   headingEnd  second line, shown in the gradient
 *   logos       [{ image, alt }] — the alt text is also the hover tooltip
 *   placeholders  text chips used only when there are no logo images at all
 *   cta         { label, href, onClick } — the pill button under the row
 */
export default function LogoTicker({ heading, headingEnd, logos = [], placeholders = [], cta = null }) {
  const hasLogos = logos.length > 0;
  // Duplicate the list so the -50% loop is seamless (no jump / clipped card
  // borders mid-scroll).
  const items = hasLogos ? [...logos, ...logos] : [...placeholders, ...placeholders];

  if (!heading && !headingEnd && !hasLogos && placeholders.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 md:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-5 sm:p-7 md:p-8">
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="mx-auto w-full text-center">
                {/* Heading on one line, the second part on its own line with
                    the gradient — same pattern as the other sections. */}
                {heading || headingEnd ? (
                  <h2 className="mx-auto w-full text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
                    {heading ? <span className="block">{heading}</span> : null}
                    {headingEnd ? (
                      <span className="mt-2 block bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.04em] text-transparent">
                        {headingEnd}
                      </span>
                    ) : null}
                  </h2>
                ) : null}
              </div>
            </div>
          </div>

          {/* overflow-x-hidden (not overflow-hidden) so card top/bottom borders
              aren't clipped — fixes the "broken border" look. */}
          <div className="relative mt-6 overflow-x-hidden py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24" />

            <div className="clients-ticker flex w-max items-stretch gap-5 sm:gap-7">
              {hasLogos
                ? items.map((logo, index) => (
                    <div
                      key={`${logo.image}-${index}`}
                      className="flex h-[80px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 sm:h-[96px] sm:w-[210px]"
                    >
                      {/* Every card is the SAME fixed size; the logo fills the
                          whole tile and object-contain scales it to fit without
                          distorting or cropping. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.image}
                        alt={logo.alt || "Client logo"}
                        title={logo.alt || undefined}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))
                : items.map((name, index) => (
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
          {cta?.label ? (
            <div className="mt-8 flex justify-center">
              {cta.onClick ? (
                <button
                  type="button"
                  onClick={cta.onClick}
                  className="inline-flex min-h-[3.05rem] items-center justify-center rounded-full bg-[#0088FF] px-8 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.2)] transition hover:brightness-110 [overflow-wrap:anywhere]"
                >
                  {cta.label}
                </button>
              ) : (
                <Link
                  href={cta.href || "/contact"}
                  className="inline-flex min-h-[3.05rem] items-center justify-center rounded-full bg-[#0088FF] px-8 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.2)] transition hover:brightness-110 [overflow-wrap:anywhere]"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .clients-ticker {
          animation: clients-ticker-scroll 45s linear infinite;
        }

        /* Ease off when the user hovers, so a logo can be read. */
        .clients-ticker:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-ticker {
            animation-duration: 90s;
          }
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
