import Link from "next/link";

const benefits = [
  "List spaces and go live quickly",
  "Automated bookings and secure payouts",
  "Usage insights to improve occupancy",
  "Hands-on onboarding and partner support",
];

const partnerFlow = ["Submit your property", "Complete onboarding", "Start earning"];

export default function BecomePartnerSection() {
  return (
    <section
      aria-labelledby="become-partner-title"
      className="bg-[linear-gradient(120deg,#FFFFFF_0%,#EAF4FF_52%,#DCEEFF_100%)] py-12 sm:py-14 lg:py-16"
    >
      <div className="relative px-4 sm:px-6 lg:px-10">
        <div
          aria-hidden="true"
          className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[#0088FF]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-6 h-52 w-52 rounded-full bg-[#0EA5E9]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-[980px] text-center">
            {/* <p className="mx-auto inline-flex items-center rounded-full border border-[#7AB9FF]/45 bg-white/85 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0078E0] sm:text-[13px]">
              BECOME A PARTNER
            </p> */}
            <h2
              id="become-partner-title"
              className="mx-auto mt-4 max-w-[900px] text-[clamp(2.35rem,3.9vw,3.45rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#050A13]"
            >
               BECOME A{" "}
              <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                PARTNER
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-[690px] text-[0.95rem] leading-relaxed text-slate-600 sm:text-[1rem]">
              Join the HalaPark network and grow predictable parking income with
              a platform built for operators and property owners.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-[#CFE2FA]/50 shadow-[0_20px_44px_rgba(15,23,42,0.18)]">
            <div className="relative bg-[linear-gradient(130deg,#042347_0%,#073D73_48%,#0A2E56_100%)] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(26,178,255,0.2),transparent_42%),radial-gradient(circle_at_14%_80%,rgba(0,136,255,0.18),transparent_48%)]" />

              <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div>
                  <h3 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[38px]">
                    Launch your parking inventory in weeks, not months.
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D5E8FF] sm:text-base">
                    We help you onboard spaces, manage access and payments, and
                    unlock higher utilization with minimal operational effort.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href="/business"
                      className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,136,255,0.35)] transition hover:brightness-95"
                    >
                      Become a Partner
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/16"
                    >
                      Talk to Sales
                    </Link>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5">
                    {partnerFlow.map((step, index) => (
                      <span
                        key={step}
                        className="inline-flex items-center rounded-full border border-[#7CBFFF]/50 bg-white/12 px-3.5 py-2 text-xs font-semibold tracking-[0.08em] text-[#DDF0FF]"
                      >
                        {index + 1}. {step}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/25 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8BC4FF]">
                    Partner Benefits
                  </p>
                  <ul className="mt-4 space-y-3">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-6 text-[#D5E8FF] sm:text-base"
                      >
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#41B0FF]/25 text-[11px] font-bold text-[#BEE3FF]">
                          +
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
