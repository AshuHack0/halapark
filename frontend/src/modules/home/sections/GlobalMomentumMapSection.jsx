"use client";

import dynamic from "next/dynamic";

const DubaiLeafletMap = dynamic(() => import("./DubaiLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-50 via-white to-slate-100/80">
      <div
        className="halapark-map-loading-spin h-11 w-11 rounded-full border-2 border-[#0088FF]/25 border-t-[#0088FF] shadow-sm"
        aria-hidden
      />
      <p className="text-[13px] font-medium tracking-wide text-slate-600">
        Loading map…
      </p>
    </div>
  ),
});

export default function GlobalMomentumMapSection() {
  return (
    <div
      className="group/map overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.09)] bg-white shadow-[0_16px_48px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.03]"
      role="region"
      aria-label="HalaPark live parking coverage map"
    >
      <span className="sr-only">Live parking coverage — Dubai</span>
      <div className="relative isolate h-[280px] w-full sm:h-[320px] lg:h-[380px]">
        <div
          className="pointer-events-none absolute inset-0 z-[500] rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]"
          aria-hidden
        />
        <DubaiLeafletMap className="absolute inset-0 h-full w-full rounded-[inherit]" />
      </div>
    </div>
  );
}
