"use client";

import { useEffect, useState } from "react";
import { useLanguage, ui } from "@/context/LanguageContext";
import { fetchPage } from "@/lib/cms";

// ─── Store icons ──────────────────────────────────────────────────────────────
// The icon glyph is chosen by the store's `key` (a recognizable brand mark), but
// every URL / label / which stores appear is CMS-driven (settings.floatingApp).

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 12.54c-.02-2.02 1.65-2.99 1.73-3.04-.94-1.38-2.4-1.57-2.92-1.59-1.24-.13-2.43.73-3.06.73-.63 0-1.6-.71-2.64-.69-1.36.02-2.61.79-3.31 2-1.41 2.45-.36 6.07 1.01 8.06.67.97 1.47 2.06 2.51 2.02 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.99 2.44-1.97.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.15-3.24zM15.03 6.6c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.56-.85 2.48.9.07 1.83-.46 2.39-1.14z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#00D3FF" d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l9.1-9.7L3.6 2.3z" />
    <path fill="#00F076" d="M3.6 2.3 15.9 9.4l2.9-3.1L5.3 1.5c-.6-.3-1.2-.3-1.7.8z" />
    <path fill="#FFCE00" d="m18.8 6.3-2.9 3.1 2.9 3.1 3.4-1.9c.9-.5.9-1.9 0-2.4l-3.4-1.9z" />
    <path fill="#FF3A44" d="m15.9 12.6-12.3 9.1c.5.9 1.1.9 1.7.6l13.5-7.7-2.9-2z" />
  </svg>
);

const AppGalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 1.7a8.3 8.3 0 1 1-8.3 8.3A8.31 8.31 0 0 1 12 3.7zM8.4 8.2a3.6 3.6 0 0 0 7.2 0h-1.3a2.3 2.3 0 0 1-4.6 0zm-.9 3.1-1.9 4.6h1.2l.4-1h2.1l.4 1h1.2L9 11.3zm.1 2.6.6-1.5.6 1.5zm6.7-2.6v4.6h1.2v-1.8h1a1.4 1.4 0 1 0 0-2.8zm1.2 1h.9a.4.4 0 0 1 0 .8h-.9z" />
  </svg>
);

// Known store keys → glyph. Anything else falls back to the generic download mark.
const STORE_ICONS = {
  appstore: AppleIcon,
  apple: AppleIcon,
  ios: AppleIcon,
  playstore: GooglePlayIcon,
  google: GooglePlayIcon,
  android: GooglePlayIcon,
  appgallery: AppGalleryIcon,
  huawei: AppGalleryIcon,
};

// Brand names shown in the download menu when the admin left the label blank
// (with the common Arabic transliterations for AR mode).
const STORE_LABELS = {
  appstore: { en: "App Store", ar: "آب ستور" },
  apple: { en: "App Store", ar: "آب ستور" },
  ios: { en: "App Store", ar: "آب ستور" },
  playstore: { en: "Google Play", ar: "جوجل بلاي" },
  google: { en: "Google Play", ar: "جوجل بلاي" },
  android: { en: "Google Play", ar: "جوجل بلاي" },
  appgallery: { en: "AppGallery", ar: "آب جاليري" },
  huawei: { en: "AppGallery", ar: "آب جاليري" },
};

const DownloadAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2.5" width="14" height="19" rx="3" />
    <path d="M12 7.5v6" />
    <path d="m9.5 11 2.5 2.5 2.5-2.5" />
    <line x1="9" y1="17.5" x2="15" y2="17.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const PayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" />
    <circle cx="16.8" cy="14.4" r="1.4" />
  </svg>
);

// Tawk.to live chat sits in the bottom-right corner (see common/TawkChat.jsx);
// when it's configured these buttons stack just above its bubble.
const CHAT_ENABLED = Boolean(
  (process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "").trim() && (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "").trim(),
);

// Labelled pill: icon in a coloured circle + always-visible text, so each
// action is clear without hovering (hover tooltips don't exist on phones).
const PILL =
  "group relative inline-flex h-11 items-center gap-2 rounded-full border bg-white py-1 ps-1 pe-4 text-[13px] font-semibold text-slate-800 shadow-[0_10px_26px_rgba(15,23,42,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0088FF]/45 focus-visible:ring-offset-2 sm:h-12 sm:text-sm";
const PILL_ICON = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white sm:h-10 sm:w-10";

function FloatingPill({ href, label, iconClass, borderClass, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${PILL} ${borderClass}`}>
      <span className={`${PILL_ICON} ${iconClass}`}>{children}</span>
      <span dir="auto" className="whitespace-nowrap">{label}</span>
    </a>
  );
}

export default function FloatingActions() {
  const { language } = useLanguage();
  // Everything is CMS-driven (settings.floatingApp) — no hardcoded links.
  //   floatingApp: { whatsapp, pay: { href }, stores: [{ key, label, href }] }
  const [cfg, setCfg] = useState(null);
  // One "Download App" button opens a menu listing all configured stores.
  const [storesOpen, setStoresOpen] = useState(false);

  useEffect(() => {
    fetchPage("settings").then((page) => {
      setCfg(page?.sections?.floatingApp ?? {});
    });
  }, []);

  // Keep the stack just above the Tawk chat bubble. Its size differs by device
  // and by Tawk's own settings, so measure where it actually sits (the small
  // bubble iframe in the bottom-right corner — not the open chat window).
  const [chatGap, setChatGap] = useState(null);
  useEffect(() => {
    if (!CHAT_ENABLED) return undefined;
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const tops = [...document.querySelectorAll("iframe")]
        .map((f) => f.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.width < 200 && r.height < 200 && r.right > vw - 220 && r.bottom > vh - 240)
        .map((r) => r.top);
      if (tops.length) setChatGap(Math.round(vh - Math.min(...tops) + 10));
    };
    measure();
    const timer = window.setInterval(measure, 1500);
    window.addEventListener("resize", measure);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!storesOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") setStoresOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [storesOpen]);

  if (!cfg) return null;

  const whatsapp = (cfg.whatsapp || "").trim();
  const payHref = (cfg.payHref || "").trim();
  // Store buttons — one per configured store with a link. Icon = uploaded
  // custom image when set, else the built-in glyph for the store key.
  const stores = (Array.isArray(cfg.stores) ? cfg.stores : [])
    .map((s) => ({
      key: String(s?.key || "").trim().toLowerCase(),
      label: (s?.label || "").trim(),
      labelAr: (s?.ar?.label || "").trim(),
      href: (s?.href || "").trim(),
      iconImage: (s?.iconImage || "").trim(),
    }))
    .filter((s) => s.href);

  // Nothing configured → render nothing (no default buttons).
  if (!whatsapp && !payHref && stores.length === 0) return null;

  return (
    // Hidden while the mobile nav menu is open (body gets .nav-menu-open) so
    // the buttons never overlap the menu on short screens. Always on the
    // right (both languages), stacked above the chat bubble when chat is on.
    <div
      className={`fixed right-4 z-[60] sm:right-6 [.nav-menu-open_&]:hidden ${
        CHAT_ENABLED ? "bottom-[88px] sm:bottom-[150px]" : "bottom-5 sm:bottom-6"
      }`}
      style={chatGap ? { bottom: chatGap } : undefined}
    >
      <div className="flex flex-col items-end gap-2.5">
        {whatsapp ? (
          <FloatingPill
            href={whatsapp}
            label={ui("chatOnWhatsApp", language)}
            iconClass="bg-[#25D366]"
            borderClass="border-[#25D366]/30 hover:border-[#25D366]"
          >
            <WhatsAppIcon />
          </FloatingPill>
        ) : null}

        {payHref ? (
          <FloatingPill
            href={payHref}
            label={ui("payParking", language)}
            iconClass="bg-slate-800"
            borderClass="border-slate-200 hover:border-slate-400"
          >
            <PayIcon />
          </FloatingPill>
        ) : null}

        {/* "Download App" — opens a menu with all configured stores. */}
        {stores.length > 0 ? (
          <div className="relative">
            {storesOpen ? (
              <>
                {/* Invisible click-away backdrop */}
                <button
                  type="button"
                  aria-label="Close download menu"
                  onClick={() => setStoresOpen(false)}
                  className="fixed inset-0 cursor-default"
                />
                <div
                  role="menu"
                  className="absolute bottom-[calc(100%+0.6rem)] right-0 w-60 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_18px_44px_rgba(2,6,23,0.2)]"
                >
                  {stores.map((store, i) => {
                    const Icon = STORE_ICONS[store.key] || DownloadAppIcon;
                    return (
                      <a
                        key={store.key || store.href || i}
                        role="menuitem"
                        href={store.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setStoresOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-[#EEF6FF] hover:text-[#0078E0]"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(165deg,#0A97FF_0%,#0088FF_50%,#006FD2_100%)] text-white">
                          {store.iconImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={store.iconImage} alt="" className="h-6 w-6 object-contain" />
                          ) : (
                            <Icon />
                          )}
                        </span>
                        <span className="truncate" dir="auto">
                          {(language === "ar" ? store.labelAr || store.label : store.label) ||
                            STORE_LABELS[store.key]?.[language === "ar" ? "ar" : "en"] ||
                            ui("downloadApp", language)}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </>
            ) : null}
            <button
              type="button"
              aria-expanded={storesOpen}
              aria-haspopup="menu"
              onClick={() => setStoresOpen((v) => !v)}
              className={`${PILL} border-[#0088FF] bg-[linear-gradient(165deg,#0A97FF_0%,#0088FF_50%,#006FD2_100%)] text-white`}
            >
              <span className={`${PILL_ICON} bg-white/20`}>
                <DownloadAppIcon />
              </span>
              <span dir="auto" className="whitespace-nowrap">{ui("downloadApp", language)}</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
