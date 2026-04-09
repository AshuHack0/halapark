export default function SectionFrame({ label, children }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}
