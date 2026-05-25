import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function FAQBottomCTA() {
  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0088FF] px-8 py-12 text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" aria-hidden />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/60">Still have questions?</p>
              <h2 className="mt-2 text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem]">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="mt-2 max-w-[480px] text-[0.88rem] leading-6 text-white/75">
                Our team is ready to help with bookings, onboarding, account access, and business setup. Reach out anytime.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0088FF] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:brightness-95"
              >
                Contact Support <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="https://wa.me/97143782022"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
