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

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-2"> 
      <Link
        href="/pay"
        className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:bg-slate-50"
      >
        Pay
      </Link>
      <Link
        href="/app"
        className="inline-flex items-center gap-2 bg-[#0088FF] hover:brightness-95 active:bg-[#0088FF] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg"
      >
        Download the App
        <PhoneIcon />
      </Link>
    
    </div>
  );
}
