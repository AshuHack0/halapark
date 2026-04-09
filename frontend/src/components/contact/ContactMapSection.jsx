import { MapPinned } from "lucide-react";

export default function ContactMapSection() {
  return (
    <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(0,136,255,0.05)_0%,#FFFFFF_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
            Map
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Office location
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            This area is reserved for the embedded Google Map of the office
            location. Once the client confirms the address, the live map can be
            dropped in here without changing the surrounding layout.
          </p>
        </div>

        <div className="flex min-h-[280px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,136,255,0.12)_0%,rgba(0,136,255,0.05)_38%,#FFFFFF_100%)] p-6">
          <div className="flex w-full max-w-md flex-col items-center rounded-[28px] border border-dashed border-slate-300 bg-white/85 px-6 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,136,255,0.08)] text-[#0088FF]">
              <MapPinned className="h-8 w-8" />
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">
              Google Map placeholder
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Embed the confirmed office location here when it becomes
              available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
