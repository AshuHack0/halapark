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
      </div>
    </SectionFrame>
  );
}
