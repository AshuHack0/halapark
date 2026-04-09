import SectionFrame from "@/components/About/SectionFrame";
import { companyStats } from "@/components/About/aboutContent";

export default function CompanyStatsSection() {
  return (
    <SectionFrame label={companyStats.eyebrow}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {companyStats.items.map((stat) => (
          <div
            key={stat}
            className="rounded-[28px] border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)]"
          >
            <p className="text-2xl font-bold tracking-tight text-slate-900">
              {stat}
            </p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
