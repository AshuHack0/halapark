"use client";

import Link from "next/link";

const steps = [
  {
    id: "1",
    title: "Search",
    description: "Find available parking near you",
  },
  {
    id: "2",
    title: "Book",
    description: "Reserve instantly or schedule ahead",
  },
  {
    id: "3",
    title: "Park",
    description: "Arrive stress-free - your spot is ready",
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
              className="mx-auto mt-4 max-w-[900px] text-[clamp(2.35rem,3.9vw,3.45rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#050A13]"
            >
               HOW IT{" "}
              <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                WORKS
              </span>{" "}
              
            </h2>
            <p className="mx-auto mt-3 max-w-[690px] text-[0.95rem] leading-relaxed text-slate-600 sm:text-[1rem]">
            Watch the quick demo showing how easy it is to discover an open spot, reserve
instantly, and complete payment inside HalaPark.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="relative pl-14">
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-2 bottom-2 w-px bg-[#CFE2FA]"
                />
                <span
                  aria-hidden="true"
                  className="how-it-works-progress absolute left-[19px] top-2 h-12 w-px bg-gradient-to-b from-[#0078E0] via-[#1AB2FF] to-[#7DD3FC]"
                />

                <div className="space-y-7">
                  {steps.map((step) => (
                    <article key={step.id} className="relative">
                      <span className="absolute -left-14 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#A5D1FF] bg-[#F0F8FF] text-sm font-semibold text-[#0078E0]">
                        {step.id}
                      </span>
                      <h3 className="text-[1.22rem] font-semibold text-[#0F172A]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[0.98rem] leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(0,136,255,0.34)] transition hover:brightness-95"
                >
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