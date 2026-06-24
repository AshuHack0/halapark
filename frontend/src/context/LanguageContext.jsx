"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LANGUAGE_STORAGE_KEY = "halapark-language";
const LANGUAGE_EVENT = "halapark-language-change";
const SUPPORTED = ["en", "ar"];

const LanguageContext = createContext(null);

function readInitial() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED.includes(stored) ? stored : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  // Resolve the real value on mount (localStorage is client-only) and keep all
  // tabs/components in sync via storage + a custom event.
  useEffect(() => {
    setLanguageState(readInitial());

    const sync = () => setLanguageState(readInitial());
    window.addEventListener(LANGUAGE_EVENT, sync);
    window.addEventListener("storage", (e) => {
      if (e.key === LANGUAGE_STORAGE_KEY) sync();
    });
    return () => window.removeEventListener(LANGUAGE_EVENT, sync);
  }, []);

  // Reflect direction + persist whenever the language changes.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (next) => {
    const value = SUPPORTED.includes(next) ? next : "en";
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    }
    setLanguageState(value);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isArabic: language === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  // Safe fallback if a component renders outside the provider (SSR/edge cases).
  if (!ctx) return { language: "en", setLanguage: () => {}, isArabic: false };
  return ctx;
}

/**
 * Pick the right-language value for a CMS section that stores Arabic in an `ar`
 * sibling object (Shape A):  hero = { title, subtitle, ar: { title, subtitle } }
 *
 * Arabic mode is STRICT — no English fallback. When the site is in Arabic and a
 * field has no Arabic value, this returns "" (blank), so the page shows pure
 * Arabic only. English mode returns the English value as usual.
 */
export function t(section, key, language) {
  if (!section || typeof section !== "object") return "";
  if (language === "ar") {
    // Arabic only — blank when the Arabic value is missing/empty.
    return section.ar?.[key] ?? "";
  }
  return section[key] ?? "";
}

// Fixed UI labels (not CMS-driven) shared across pages — buttons, generic chrome.
const UI_LABELS = {
  getInTouch: { en: "Get In Touch", ar: "تواصل معنا" },
  getAQuote: { en: "Get a Quote", ar: "احصل على عرض سعر" },
  learnMore: { en: "Learn More", ar: "اعرف المزيد" },
  viewAppFeatures: { en: "View App Features", ar: "عرض ميزات التطبيق" },
  downloadNow: { en: "Download Now", ar: "حمّل الآن" },
  visitWebsite: { en: "Visit Website", ar: "زيارة الموقع" },
  findMyParking: { en: "Find My Parking", ar: "ابحث عن موقفي" },
  step: { en: "Step", ar: "خطوة" },
  viewOpenPositions: { en: "View Open Positions", ar: "عرض الوظائف المتاحة" },
};

/** Translate a fixed UI label by key:  ui("getInTouch", language). */
export function ui(key, language) {
  const entry = UI_LABELS[key];
  if (!entry) return "";
  return language === "ar" ? entry.ar : entry.en;
}
