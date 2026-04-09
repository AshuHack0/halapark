import SectionFrame from "@/components/About/SectionFrame";
import { coreValues } from "@/components/About/aboutContent";

export default function CoreValuesSection() {
  return (
    <SectionFrame label={coreValues.eyebrow}>
      <div className="grid gap-4 md:grid-cols-2">
        {coreValues.items.map((value) => (
          <div
            key={value.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 lg:p-8"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {value.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
