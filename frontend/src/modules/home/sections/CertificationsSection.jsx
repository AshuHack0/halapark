"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, CreditCard, Scale, ShieldCheck } from "lucide-react";

const certifications = [
  {
    standard: "ISO 27001",
    focus: "Information Security Management",
    status: "Certified",
    issued: "2026",
    icon: ShieldCheck,
  },
  {
    standard: "ISO 9001",
    focus: "Quality Management Systems",
    status: "Certified",
    issued: "2025",
    icon: BadgeCheck,
  },
  {
    standard: "PCI DSS",
    focus: "Secure Payment Processing",
    status: "Compliant",
    issued: "2026",
    icon: CreditCard,
  },
  {
    standard: "UAE Data Law",
    focus: "Data Privacy & Governance",
    status: "Aligned",
    issued: "2026",
    icon: Scale,
  },
];

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-9 sm:py-11 md:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0088FF] p-5 sm:p-7 md:p-8 text-white overflow-hidden relative">
          <div className="absolute -top-20 -right-10 w-52 h-52 rounded-full bg-[#0088FF]/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 md:gap-6 items-start">
            <div>
              <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm text-[#0088FF]">
                Certifications & Compliance
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Built on certified standards for security and operations
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-lg">
                Our platform is audited against recognized frameworks so enterprise clients and partners can integrate with confidence.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-md">
                <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-center">
                  <p className="text-lg sm:text-xl font-semibold">4</p>
                  <p className="text-[11px] sm:text-xs text-slate-200">Standards</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-center">
                  <p className="text-lg sm:text-xl font-semibold">100%</p>
                  <p className="text-[11px] sm:text-xs text-slate-200">Data Encrypted</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-center">
                  <p className="text-lg sm:text-xl font-semibold">24/7</p>
                  <p className="text-[11px] sm:text-xs text-slate-200">Monitoring</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((item, i) => {
                const isActive = i === activeIndex;
                const Icon = item.icon;

                return (
                  <button
                    key={item.standard}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    className={`text-left rounded-2xl border p-4 transition-all duration-400 ${
                      isActive
                        ? "bg-white text-slate-900 border-white shadow-[0_12px_30px_rgba(15,23,42,0.35)]"
                        : "bg-white/10 border-white/15 text-white hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? "border-slate-900/10 bg-slate-900 text-white"
                            : "border-white/15 bg-white/10 text-[#0088FF]"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className={`text-xs sm:text-sm ${isActive ? "text-slate-500" : "text-slate-200"}`}>
                          {item.status} - {item.issued}
                        </p>
                        <p className="mt-1 text-lg sm:text-xl font-semibold">{item.standard}</p>
                      </div>
                    </div>

                    <p className={`mt-2 text-sm leading-relaxed ${isActive ? "text-slate-600" : "text-slate-100"}`}>
                      {item.focus}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
