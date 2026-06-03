import Image from "next/image";

export default function FAQHeroSection() {
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#06111f] text-white">
          <div className="absolute inset-0">
            <Image
              src="/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png"
              alt=""
              fill
              className="object-cover object-center opacity-30"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/90 via-[#06111f]/70 to-[#06111f]/40" />
          </div>
          <div className="relative flex min-h-[320px] w-full flex-col justify-center px-8 py-14 sm:px-12 md:min-h-[380px] lg:px-20">
            <div className="relative z-10 w-full max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5BC4FF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Help Center</span>
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                Got Questions?{" "}
                <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                  We&apos;ve Got Answers.
                </span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                Find helpful information about HalaPark&apos;s smart parking solutions, system features, payments, access, and operations — all organized into easy-to-browse categories for a faster and smoother experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
