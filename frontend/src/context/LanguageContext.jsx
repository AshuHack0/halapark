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
 *   t(section, "title", language)  →  ar value when language==="ar" and present,
 *                                     otherwise the English value (fallback).
 */
export function t(section, key, language) {
  if (!section || typeof section !== "object") return "";
  if (language === "ar") {
    const arVal = section.ar?.[key];
    if (arVal != null && String(arVal).trim() !== "") return arVal;
  }
  return section[key] ?? "";
}
