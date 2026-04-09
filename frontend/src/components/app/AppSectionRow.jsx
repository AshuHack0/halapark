export default function AppSectionRow({
  title,
  badge,
  children,
  isLast = false,
}) {
  return (
    <div
      className={`grid gap-6 px-6 py-8 md:grid-cols-[240px_1fr] md:px-8 md:py-10 ${
        isLast ? "" : "border-b border-slate-200"
      }`}
    >
      <div className="md:pr-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[28px]">
            {title}
          </h2>
          {badge ? (
            <span className="rounded-full bg-[#0088FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0088FF]">
              {badge}
            </span>
          ) : null}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
