"use client";

import Link from "next/link";
import { CalendarCheck2, CarFront, CircleParking, Search } from "lucide-react";

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
            <h2
              id="how-it-works-title"
              className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]"
            >
              HOW IT{" "}
              <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                WORKS
              </span>{" "}
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              Watch the quick demo showing how easy it is to discover an open
              spot, reserve instantly, and complete payment inside HalaPark.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <div className="mx-auto w-full max-w-[620px] lg:mx-0">
              <div className="relative pl-[88px] sm:pl-[116px]">
                <span
                  aria-hidden="true"
                  className="absolute left-[20px] top-9 bottom-[48px] border-l-2 border-dashed border-[#BDD0E6] sm:left-[28px]"
                />
                <span
                  aria-hidden="true"
                  className="how-it-works-progress absolute left-[20px] top-9 h-14 border-l-2 border-dashed border-[#0088FF] sm:left-[28px]"
                />

                <div className="space-y-3.5 sm:space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const AccentIcon = step.accent;

                    return (
                      <article
                        key={step.id}
                        className="relative flex min-h-[82px] items-center gap-3.5 rounded-[15px] border border-[#E5EEF8] bg-white p-3 shadow-[0_7px_18px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-[#BFDFFF] hover:shadow-[0_14px_30px_rgba(0,136,255,0.13)] sm:min-h-[94px] sm:gap-4 sm:rounded-[18px] sm:p-3.5"
                      >
                        <span className="absolute -left-[86px] top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#168EFF] text-[0.9rem] font-bold text-white shadow-[0_8px_18px_rgba(0,136,255,0.34)] ring-4 ring-white sm:-left-[110px] sm:h-[48px] sm:w-[48px] sm:text-[0.95rem]">
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
                              className="absolute right-4 top-3 h-6 w-6 fill-white stroke-[2.4]"
                            />
                          ) : null}
                          <Icon
                            aria-hidden="true"
                            className="relative h-9 w-9 stroke-[2.7] sm:h-10 sm:w-10"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[1.08rem] font-bold leading-tight text-[#182238] sm:text-[1.18rem]">
                            {step.title}
                          </h3>
                          <p className="mt-1 max-w-[260px] text-[0.84rem] font-medium leading-snug text-[#6C7587] sm:text-[0.92rem]">
                            {step.description}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 pl-[88px] sm:pl-[116px]">
                <Link
                  href="/app"
                  className="inline-flex min-h-11 items-center justify-center gap-3 rounded-[10px] bg-[#168EFF] px-7 py-3 text-[0.98rem] font-bold text-white shadow-[0_10px_24px_rgba(0,136,255,0.34)] transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  <CarFront
                    aria-hidden="true"
                    className="h-5 w-5 stroke-[2.6]"
                  />
                  Find Parking
                </Link>
                {/* <span className="text-sm font-medium text-slate-500">
                  Takes less than a minute
                </span> */}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[24px] bg-[#0088FF]/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[24px] border border-[#D6E8FF] bg-[#08142A] p-2 shadow-[0_24px_46px_rgba(15,23,42,0.25)]">
                <video
                  className="h-full w-full rounded-[18px] object-cover"
                  src="/HalaPark.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes how-it-works-drop {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(220px);
            opacity: 0.15;
          }
        }

        .how-it-works-progress {
          animation: how-it-works-drop 2.8s linear infinite;
        }
      `}</style>
    </section>
  );
}
