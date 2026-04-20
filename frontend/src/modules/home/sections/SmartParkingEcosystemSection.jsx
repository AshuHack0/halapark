import Link from "next/link";

const ecosystemPoints = [
  {
    title: "Revenue Optimization",
    description:
      "Turn underutilized parking spaces into consistent, predictable income through smart demand matching and automated booking.",
  },
  {
    title: "Operational Efficiency",
    description:
      "Automate parking operations including access, billing, and space management, reducing manual work and operational friction.",
  },
  {
    title: "Full Visibility & Control",
    description:
      "Gain real-time insights across all locations with dashboards, performance tracking, and usage analytics.",
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate with your existing infrastructure without disruption, we enhance what you already have.",
  },
];

const whyPartnerPoints = [
  "Market leader in smart parking solutions",
  "Cloud-based analytics and reporting",
  "Support for multi-location operations",
  "Enterprise-ready integrations",
];

const industries = [
  "Airport",
  "Hospitality",
  "Education",
  "Municipal",
  "Office",
  "Retail",
];

export default function SmartParkingEcosystemSection() {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14 lg:py-16">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] shadow-[0_20px_42px_rgba(15,23,42,0.22)]">
          <div className="relative bg-[url('/banner2.png')] bg-cover bg-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute inset-0 bg-[rgba(3,22,47,0.78)]" />

            <div className="relative">
              <div className="mx-auto max-w-[980px] text-center">
                {/* <p className="mx-auto inline-flex items-center rounded-full border border-[#7AB9FF]/45 bg-white/15 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#BEE3FF] sm:text-[13px]">
                  WHY HALAPARK
                </p> */}
                <h2 className="mx-auto mt-4 max-w-[900px] text-[clamp(2.35rem,3.9vw,3.45rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
                  Why{" "}
                  <span className="bg-[linear-gradient(120deg,#7CC8FF_10%,#C8ECFF_90%)] bg-clip-text text-transparent">
                    HalaPark
                  </span>
                </h2>
                <p className="mx-auto mt-3 max-w-[690px] text-[0.95rem] leading-relaxed text-[#D5E8FF] sm:text-[1rem]">
                  A smart parking ecosystem designed to maximize revenue,
                  efficiency, and control.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {ecosystemPoints.map((point) => (
                  <article
                    key={point.title}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold text-white">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#D5E8FF] sm:text-base">
                      {point.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-7 text-white lg:grid-cols-[1.2fr_0.8fr]">
                <div>
         
                  <ul className="mt-4 space-y-2.5 text-sm leading-7 text-[#D5E8FF] sm:text-base">
                    {whyPartnerPoints.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8BC4FF]">
                    Proven Industry Fit
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-[#D5E8FF] sm:text-base">
                    {industries.map((industry) => (
                      <li key={industry}>- {industry}</li>
                    ))}
                  </ul>

                  <Link
                    href="/business"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                  >
                    Markets We Serve
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
