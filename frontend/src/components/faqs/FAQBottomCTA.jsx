import Link from "next/link";

const whatsappHref =
  "https://wa.me/97143782022?text=Hello%20HalaPark%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20parking%20solutions.";

export default function FAQBottomCTA() {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-[rgba(0,136,255,0.14)] bg-[#0088FF] px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,39,70,0.22)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(0,136,255,0.28)]">
              Need More Help?
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-[2rem]">
              Still have questions?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#CFDDEF] sm:text-base">
              Our team can help with bookings, onboarding, account access, and
              business setup.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-0 sm:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0088FF] transition hover:bg-[rgba(0,136,255,0.08)]"
            >
              Contact Us
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

