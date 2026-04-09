export default function FAQHeroSection() {
  return (
    <section className="px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-[rgba(0,136,255,0.14)] bg-[rgba(0,136,255,0.08)] px-6 py-7 shadow-[0_18px_50px_rgba(0,136,255,0.08)] sm:px-8">
          <div className="inline-flex items-center rounded-full border border-[rgba(0,136,255,0.14)] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0088FF]">
            FAQ
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0088FF] sm:text-4xl lg:text-[2.8rem]">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#0088FF] sm:text-base">
            Everything you need to know about using HalaPark for drivers,
            property owners, and businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

