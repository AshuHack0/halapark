"use client";

import Link from "next/link";

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const CardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

function FloatingIconButton({ href, label, className, children }) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 rounded-full bg-[#0F172A] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-0.5 group-focus-within:opacity-100">
        {label}
      </span>
      <Link
        href={href}
        aria-label={label}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition ${className}`}
      >
        {children}
      </Link>
    </div>
  );
}

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-2.5">
      <FloatingIconButton
        href="/pay"
        label="Pay"
        className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
      >
        <CardIcon />
      </FloatingIconButton>
      <FloatingIconButton
        href="/app"
        label="Download App"
        className="border-[#0088FF] bg-[#0088FF] text-white hover:brightness-95 active:bg-[#0088FF]"
      >
        <PhoneIcon />
      </FloatingIconButton>
    </div>
  );
}
