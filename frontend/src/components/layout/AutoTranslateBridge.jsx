"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "halapark-language";
const EVENT_NAME = "halapark-language-change";

function setTranslateCookie(language) {
  const targetLanguage = language === "ar" ? "ar" : "en";
  const cookieValue = targetLanguage === "en" ? "/en/en" : `/en/${targetLanguage}`;
  document.cookie = `googtrans=${cookieValue}; path=/`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
}

function applyViaCombo(language) {
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

export default function AutoTranslateBridge() {
  const retryTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const clearTimer = () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };

    const applyWithRetry = (language, attemptsLeft = 20) => {
      clearTimer();
      setTranslateCookie(language);
      const applied = applyViaCombo(language);
      if (applied || attemptsLeft <= 0) {
        return;
      }

      retryTimerRef.current = window.setTimeout(() => {
        applyWithRetry(language, attemptsLeft - 1);
      }, 200);
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
        applyWithRetry(initialLanguage);
      };
    }

    if (!document.querySelector('script[data-google-translate="true"]')) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.body.appendChild(script);
    } else {
      const currentLanguage = window.localStorage.getItem(STORAGE_KEY) || "en";
      applyWithRetry(currentLanguage);
    }

    const onLanguageChange = (event) => {
      const nextLanguage = event?.detail || window.localStorage.getItem(STORAGE_KEY) || "en";
      setTranslateCookie(nextLanguage);

      const applied = applyViaCombo(nextLanguage);
      if (!applied) {
        window.location.reload();
        return;
      }

      applyWithRetry(nextLanguage);
    };

    window.addEventListener(EVENT_NAME, onLanguageChange);

    return () => {
      clearTimer();
      window.removeEventListener(EVENT_NAME, onLanguageChange);
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

