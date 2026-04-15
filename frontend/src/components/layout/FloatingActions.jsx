"use client";

import Link from "next/link";

const DownloadAppIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2.5" width="14" height="19" rx="3" />
    <path d="M12 7.5v6" />
    <path d="m9.5 11 2.5 2.5 2.5-2.5" />
    <line x1="9" y1="17.5" x2="15" y2="17.5" />
  </svg>
);

const PayIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" />
    <circle cx="16.8" cy="14.4" r="1.4" />
  </svg>
);

function FloatingIconButton({
  href,
  label,
  className,
  children,
  prominent = false,
  animationClass = "",
}) {
  return (
    <div className={`group relative ${animationClass}`}>
      <span className="pointer-events-none absolute right-[calc(100%+0.65rem)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0B1220] px-3 py-1.5 text-xs font-semibold tracking-[0.02em] text-white opacity-0 shadow-[0_12px_28px_rgba(2,6,23,0.3)] transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-0.5 group-focus-within:opacity-100">
        {label}
      </span>
      {prominent ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[#0088FF]/35 blur-[14px] transition duration-300 group-hover:bg-[#0088FF]/45"
        />
      ) : null}
      <Link
        href={href}
        aria-label={label}
        className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088FF]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
      >
        {children}
      </Link>
    </div>
  );
}

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-[60] sm:bottom-6 sm:right-6">
      <div className="flex flex-col items-end gap-2.5">
      <FloatingIconButton
        href="/pay"
        label="Pay"
        animationClass="motion-safe:animate-[floatButton_4.4s_ease-in-out_infinite]"
        className="border-[#D9E3F0] bg-white text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:border-[#BDD8FB] hover:text-[#0078E0] hover:shadow-[0_14px_28px_rgba(0,136,255,0.18)]"
      >
        <PayIcon />
      </FloatingIconButton>
      <FloatingIconButton
        href="/app"
        label="Download App"
        prominent
        animationClass="motion-safe:animate-[floatButton_3.6s_ease-in-out_infinite,softPulse_2.4s_ease-in-out_infinite]"
        className="border-[#0088FF] bg-[linear-gradient(165deg,#0A97FF_0%,#0088FF_50%,#006FD2_100%)] text-white shadow-[0_16px_34px_rgba(0,136,255,0.45)] hover:shadow-[0_20px_42px_rgba(0,136,255,0.52)] active:scale-[0.98]"
      >
        <DownloadAppIcon />
      </FloatingIconButton>
      </div>
      <style jsx>{`
        @keyframes floatButton {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes softPulse {
          0%,
          100% {
            filter: saturate(1);
          }
          50% {
            filter: saturate(1.08);
          }
        }
      `}</style>
    </div>
  );
}
