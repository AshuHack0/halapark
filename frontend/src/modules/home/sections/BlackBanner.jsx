const featureCard = {
  title: "AI-Powered Smart Parking Solutions",
  description:
    "Seamlessly manage parking for customers and landlords with intelligent automation and real-time insights.",
  ctas: [
    {
      label: "View for Customers",
      href: "/solutions?view=customers",
    },
    {
      label: "View for Landlords",
      href: "/solutions?view=landlords",
    },
  ],
};

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7 text-white sm:h-8 sm:w-8"
      fill="currentColor"
    >
      <path d="M13.08 2.15a1.18 1.18 0 0 0-2.16 0L9.18 6.79a1.2 1.2 0 0 1-.7.7l-4.64 1.74a1.18 1.18 0 0 0 0 2.16l4.64 1.74a1.2 1.2 0 0 1 .7.7l1.74 4.64a1.18 1.18 0 0 0 2.16 0l1.74-4.64a1.2 1.2 0 0 1 .7-.7l4.64-1.74a1.18 1.18 0 0 0 0-2.16l-4.64-1.74a1.2 1.2 0 0 1-.7-.7z" />
    </svg>
  );
}

export default function BlackBanner() {
  return (
    <section className="bg-white py-4 font-sans sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] py-12 sm:py-16">
          <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[500px]">
            <article
              className="relative isolate flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[390px] lg:px-[56px] lg:py-[46px] xl:px-[72px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(9, 14, 30, 0.98) 0%, rgba(9, 13, 29, 0.98) 42%, rgba(11, 8, 24, 0.98) 100%)",
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
                  style={{ background: "rgba(154, 66, 255, 0.54)" }}
                />
                <div
                  className="absolute right-[-6%] top-[56%] h-[300px] w-[260px] rounded-full blur-[95px] sm:right-[0%]"
                  style={{ background: "rgba(255, 178, 240, 0.74)" }}
                />
                <div
                  className="absolute right-[12%] top-[18%] h-[140px] w-[140px] rounded-full blur-[90px]"
                  style={{ background: "rgba(41, 65, 110, 0.14)" }}
                />
                <div className="absolute inset-[1px] rounded-[23px] border border-white/5" />
                <div
                  className="absolute inset-x-[8%] bottom-[-72px] h-[140px] rounded-full border border-white/40"
                  style={{ filter: "blur(0.25px)" }}
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 sm:gap-12">
                <div
                  className="flex h-[58px] w-[58px] items-center justify-center rounded-full sm:h-[66px] sm:w-[66px]"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 28%, rgba(0,136,255,0.72) 0%, rgba(43, 52, 96, 0.95) 38%, rgba(11, 17, 34, 1) 100%)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255, 255, 255, 0.18), 0 18px 28px rgba(0, 0, 0, 0.28)",
                  }}
                >
                  <img
                    src="/hala.svg"
                    alt="Hala Park logo"
                    className="h-8 w-auto sm:h-9"
                  />
                </div>

                <div className="max-w-[760px]">
                  <h2 className="max-w-[14ch] text-[28px] font-semibold leading-[1.03] tracking-[-0.05em] text-white sm:text-[36px] lg:text-[44px]">
                    {featureCard.title}
                  </h2>

                  <p className="mt-6 max-w-[760px] text-justify text-[14px] leading-[1.5] tracking-[-0.02em] text-white/74 sm:text-[16px]">
                    {featureCard.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {featureCard.ctas.map((cta, index) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-5 text-[14px] font-semibold tracking-[-0.03em] transition-all duration-200 sm:min-h-[52px] sm:min-w-[210px] sm:text-[15px] ${
                          index === 0
                            ? "bg-white text-[#090d1d] hover:bg-white/90"
                            : "border border-white/18 bg-white/6 text-white backdrop-blur-sm hover:bg-white/10"
                        }`}
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
