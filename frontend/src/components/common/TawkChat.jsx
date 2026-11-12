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
// Tawk's bubble is hidden — the "Chat with us" button in FloatingActions
// opens the chat (see openTawkChat below).
const PROPERTY_ID = (process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "").trim();
const WIDGET_ID = (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "").trim();
const WIDGET_ID_AR = (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID_AR || "").trim();

const widgetFor = (language) => (language === "ar" && WIDGET_ID_AR ? WIDGET_ID_AR : WIDGET_ID);

export const TAWK_ENABLED = Boolean(PROPERTY_ID && WIDGET_ID);
// Unread-message count from the agent → our "Chat with us" button badge.
export const TAWK_UNREAD_EVENT = "halapark-tawk-unread";
// Chat window opened / closed → FloatingActions hides its buttons while open
// (Tawk's own close button sits in the same corner).
export const TAWK_OPEN_EVENT = "halapark-tawk-open";
const announceOpen = (open) => window.dispatchEvent(new CustomEvent(TAWK_OPEN_EVENT, { detail: open }));

// Tawk's own round bubble is hidden: the site's "Chat with us" button
// (FloatingActions) opens the chat window instead, and the window hides again
// when the visitor minimises it.
let openWhenReady = false;
export function openTawkChat() {
  const api = typeof window !== "undefined" ? window.Tawk_API : null;
  if (api && typeof api.maximize === "function") {
    api.showWidget?.();
    api.maximize();
  } else {
    openWhenReady = true; // script still loading → open as soon as it's ready
  }
}

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

    // Chat window opens bottom-right (above our "Chat with us" button).
    const position = "br";
    const api = (window.Tawk_API = window.Tawk_API || {});
    window.Tawk_LoadStart = new Date();
    api.customStyle = {
      visibility: {
        desktop: { position, xOffset: 24, yOffset: 24 },
        mobile: { position, xOffset: 16, yOffset: 16 },
      },
    };
    api.onLoad = () => {
      if (openWhenReady) {
        openWhenReady = false;
        api.showWidget?.();
        api.maximize?.();
      } else {
        api.hideWidget?.();
      }
    };
    api.onChatMaximized = () => announceOpen(true);
    api.onChatMinimized = () => {
      api.hideWidget?.();
      announceOpen(false);
    };
    api.onUnreadCountChanged = (count) => {
      window.dispatchEvent(new CustomEvent(TAWK_UNREAD_EVENT, { detail: Number(count) || 0 }));
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
