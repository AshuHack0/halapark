"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "halapark-language";

function setGoogleTranslateCookie(language) {
  const targetLanguage = language === "ar" ? "ar" : "en";
  const value = targetLanguage === "en" ? "/en/en" : `/en/${targetLanguage}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
}

function applyTranslateLanguage(language) {
  setGoogleTranslateCookie(language);

  const combo = document.querySelector(".goog-te-combo");
  if (!(combo instanceof HTMLSelectElement)) {
    return false;
  }

  const targetLanguage = language === "ar" ? "ar" : "en";
  if (combo.value === targetLanguage) {
    return true;
  }

  combo.value = targetLanguage;
  combo.dispatchEvent(new Event("change"));
  return true;
}

export default function GooglePageTranslateBridge() {
  const retryTimerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const clearRetryTimer = () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };

    const tryApplyWithRetry = (language, attemptsLeft = 20) => {
      clearRetryTimer();
      const applied = applyTranslateLanguage(language);
      if (applied || attemptsLeft <= 0) {
        return;
      }

      retryTimerRef.current = window.setTimeout(() => {
        tryApplyWithRetry(language, attemptsLeft - 1);
      }, 250);
    };

    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) {
          return;
        }

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ar",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element",
        );

        const initialLanguage = window.localStorage.getItem(STORAGE_KEY) || "en";
        tryApplyWithRetry(initialLanguage);
      };
    }

    const hasScript = document.querySelector('script[data-google-translate="true"]');
    if (!hasScript) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      const currentLanguage = window.localStorage.getItem(STORAGE_KEY) || "en";
      tryApplyWithRetry(currentLanguage);
    }

    const handleLanguageChange = (event) => {
      const nextLanguage = event?.detail || window.localStorage.getItem(STORAGE_KEY) || "en";
      tryApplyWithRetry(nextLanguage);
    };

    observerRef.current = new MutationObserver(() => {
      const currentLanguage = window.localStorage.getItem(STORAGE_KEY) || "en";
      applyTranslateLanguage(currentLanguage);
    });
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("halapark-language-change", handleLanguageChange);
    return () => {
      clearRetryTimer();
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      window.removeEventListener("halapark-language-change", handleLanguageChange);
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="pointer-events-none fixed bottom-0 left-0 h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    />
  );
}
