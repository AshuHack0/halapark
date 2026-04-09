import SectionFrame from "@/components/About/SectionFrame";
import { missionVision } from "@/components/About/aboutContent";

export default function MissionVisionSection() {
  return (
    <SectionFrame label={missionVision.eyebrow}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-[rgba(0,136,255,0.10)] p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
            Mission
          </p>
          <p className="mt-4 text-xl font-semibold leading-8 text-slate-900">
            {missionVision.mission}
          </p>
        </div>
        <div className="rounded-[28px] bg-slate-900 p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
            Vision
          </p>
          <p className="mt-4 text-xl font-semibold leading-8 text-white">
            {missionVision.vision}
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
