import SectionFrame from "@/components/About/SectionFrame";
import { aboutStory } from "@/components/About/aboutContent";

export default function StorySection() {
  return (
    <SectionFrame label={aboutStory.eyebrow}>
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] lg:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {aboutStory.headline}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          {aboutStory.body}
        </p>
      </div>
    </SectionFrame>
  );
}
