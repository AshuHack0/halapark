import { featureHighlights } from "./appContent";

export default function AppFeatureHighlights() {
  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-base leading-7 text-[#5E6578]">
        These are the benefits worth surfacing immediately around the app
        experience and purchase journey.
      </p>

      <div className="flex flex-wrap gap-3">
        {featureHighlights.map((feature) => (
          <div
            key={feature}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
