"use client";

import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/us/app/halapark-all-about-parking/id1590800416";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.app.halapark&pli=1";

// Returns the correct store URL for the current device:
// Android → Play Store, iOS → App Store, everything else (desktop) → App Store.
function getStoreUrl() {
  if (typeof navigator === "undefined") return APP_STORE_URL;
  const ua = (navigator.userAgent || navigator.vendor || "").toLowerCase();
  if (/android/.test(ua)) return PLAY_STORE_URL;
  // iOS, iPadOS-as-desktop, and all desktop browsers → App Store.
  return APP_STORE_URL;
}

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

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
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
  external = false,
  onClick,
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
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
        href="https://wa.me/97143782022"
        label="Chat on WhatsApp"
        external
        animationClass="motion-safe:animate-[floatButton_5s_ease-in-out_infinite]"
        className="border-[#25D366]/40 bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.40)] hover:bg-[#20BB5A] hover:shadow-[0_14px_36px_rgba(37,211,102,0.52)]"
      >
        <WhatsAppIcon />
      </FloatingIconButton>
      <FloatingIconButton
        href="/pay"
        label="Pay"
        animationClass="motion-safe:animate-[floatButton_4.4s_ease-in-out_infinite]"
        className="border-[#D9E3F0] bg-white text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:border-[#BDD8FB] hover:text-[#0078E0] hover:shadow-[0_14px_28px_rgba(0,136,255,0.18)]"
      >
        <PayIcon />
      </FloatingIconButton>
      <FloatingIconButton
        href={APP_STORE_URL}
        label="Download App"
        prominent
        external
        onClick={(e) => {
          // Route to the correct store for the current device. Keep the href as a
          // fallback for no-JS / "open in new tab".
          const target = getStoreUrl();
          e.preventDefault();
          window.open(target, "_blank", "noopener,noreferrer");
        }}
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
