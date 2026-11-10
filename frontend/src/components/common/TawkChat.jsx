"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Tawk.to live chat (https://www.tawk.to). The IDs come from the Tawk
// dashboard → Administration → Chat Widget → "Direct Chat Link"
// (https://tawk.to/chat/<PROPERTY_ID>/<WIDGET_ID>). Nothing loads when the
// property / widget IDs are not set.
//
// Optional: a second widget set to Arabic in the Tawk dashboard
// (NEXT_PUBLIC_TAWK_WIDGET_ID_AR) — the site switches to it in Arabic mode.
//
// The bubble sits on the opposite side to the WhatsApp / Pay / Download App
// buttons (FloatingActions, bottom-end), so the two never overlap.
const PROPERTY_ID = (process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "").trim();
const WIDGET_ID = (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "").trim();
const WIDGET_ID_AR = (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID_AR || "").trim();

const widgetFor = (language) => (language === "ar" && WIDGET_ID_AR ? WIDGET_ID_AR : WIDGET_ID);

export default function TawkChat() {
  const { language } = useLanguage();
  const loadedWidget = useRef(null);

  useEffect(() => {
    if (!PROPERTY_ID || !WIDGET_ID) return;
    const widgetId = widgetFor(language);

    // Already on the page → only swap widgets when the language needs another one.
    if (loadedWidget.current) {
      if (loadedWidget.current !== widgetId && typeof window.Tawk_API?.switchWidget === "function") {
        window.Tawk_API.switchWidget({ propertyId: PROPERTY_ID, widgetId });
        loadedWidget.current = widgetId;
      }
      return;
    }
    if (document.getElementById("tawk-script")) return;

    // Start side of the page: bottom-left in English, bottom-right in Arabic.
    const position = language === "ar" ? "br" : "bl";
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: { position, xOffset: 20, yOffset: 20 },
        mobile: { position, xOffset: 12, yOffset: 16 },
      },
    };

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${PROPERTY_ID}/${widgetId}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
    loadedWidget.current = widgetId;
  }, [language]);

  return null;
}
