"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchPage } from "@/lib/cms";
import PartnershipModal from "./PartnershipModal";

// Put this value in ANY button/link field in the admin panel to make that
// button open the partnership popup instead of navigating.
export const PARTNER_FORM_LINK = "#partner-form";

const PartnershipFormContext = createContext({ openPartnerForm: () => {} });

// Which partnership a button is for: an explicit data-partner-type="parking" /
// "service" on the link wins; otherwise the button text is read ("Become a
// Parking Partner" / "Become a Service Partner", also Arabic). "" = let the
// visitor choose in the popup.
function partnerTypeOf(anchor) {
  const explicit = (anchor?.dataset?.partnerType || "").toLowerCase();
  if (explicit === "parking" || explicit === "service") return explicit;
  const text = (anchor?.textContent || "").toLowerCase();
  if (/parking\s+partner|شريك\s*(في\s*)?(مواقف|الموقف|المواقف)/.test(text)) return "parking";
  if (/service\s+partner|شريك\s*(في\s*)?(خدمات|الخدمات|الخدمة)/.test(text)) return "service";
  return "";
}

export function usePartnershipForm() {
  return useContext(PartnershipFormContext);
}

export default function PartnershipFormProvider({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("website");
  const [partnerType, setPartnerType] = useState("");
  const [config, setConfig] = useState(null);
  const configRequested = useRef(false);

  const openPartnerForm = useCallback((src, type = "") => {
    setSource(src || "website");
    setPartnerType(type === "parking" || type === "service" ? type : "");
    setOpen(true);
    if (!configRequested.current) {
      configRequested.current = true;
      fetchPage("settings").then((page) => setConfig(page?.sections?.partnershipForm ?? null));
    }
  }, []);

  // Any link pointing at #partner-form on the current page opens the popup.
  // Registered on window (capture) so it runs before Next's <Link> handler.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!anchor) return;
      let url;
      try {
        url = new URL(anchor.getAttribute("href"), window.location.href);
      } catch {
        return;
      }
      if (url.hash !== PARTNER_FORM_LINK) return;
      // A #partner-form link to ANOTHER page navigates normally; the popup
      // then opens on arrival (effect below).
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      const label = (anchor.textContent || "").replace(/\s+/g, " ").trim();
      openPartnerForm(
        anchor.dataset.partnerSource || `${window.location.pathname}${label ? ` · ${label}` : ""}`,
        partnerTypeOf(anchor),
      );
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [openPartnerForm]);

  // Landing on a URL ending in #partner-form (shared link or cross-page
  // button) opens the popup, then clears the hash from the address bar.
  useEffect(() => {
    if (window.location.hash !== PARTNER_FORM_LINK) return undefined;
    const id = window.setTimeout(() => {
      openPartnerForm(`${window.location.pathname} · link`);
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, openPartnerForm]);

  return (
    <PartnershipFormContext.Provider value={{ openPartnerForm }}>
      {children}
      <PartnershipModal isOpen={open} onClose={() => setOpen(false)} config={config} source={source} initialType={partnerType} />
    </PartnershipFormContext.Provider>
  );
}
