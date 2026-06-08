import Link from "next/link";
import SectionFrame from "@/components/About/SectionFrame";
import { teamSection } from "@/components/About/aboutContent";

export default function TeamSection() {
  return (
    <SectionFrame label={teamSection.eyebrow}>
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 lg:p-8">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {teamSection.title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          {teamSection.body}
        </p>
        <div className="mt-6">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Join our team
          </Link>
        </div>
      </div>
    </SectionFrame>
  );
}
