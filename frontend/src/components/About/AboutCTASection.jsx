import Link from "next/link";
import SectionFrame from "@/components/About/SectionFrame";
import { aboutCta } from "@/components/About/aboutContent";

export default function AboutCTASection() {
  return (
    <SectionFrame label={aboutCta.eyebrow}>
      <div className="rounded-[32px] bg-slate-900 p-6 lg:p-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {aboutCta.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          {aboutCta.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={aboutCta.primaryAction.href}
            className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0088FF]"
          >
            {aboutCta.primaryAction.label}
          </Link>
          <Link
            href={aboutCta.secondaryAction.href}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            {aboutCta.secondaryAction.label}
          </Link>
        </div>
      </div>
    </SectionFrame>
  );
}
