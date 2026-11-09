"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Hosts that are this same website: production, staging and the Vercel preview.
// Admin-entered links sometimes carry a full address (e.g.
// https://halapark-umber.vercel.app/contact). Without this, clicking one from
// halapark.com would leave the site for the preview domain.
const OWN_HOSTS = /(^|\.)halapark\.com$|^halapark-umber\.vercel\.app$/i;

function sameSitePath(anchor) {
  const raw = anchor.getAttribute("href");
  if (!raw || !/^https?:\/\//i.test(raw)) return null;
  let url;
  try { url = new URL(raw); } catch { return null; }
  if (!OWN_HOSTS.test(url.hostname)) return null;
  return `${url.pathname}${url.search}${url.hash}` || "/";
}

// Site-wide: any link to one of our own hosts opens on the CURRENT domain.
//  • Plain click → in-app navigation (no full reload, new page at its top).
//  • Ctrl/Cmd/middle click, "open in new tab", hover preview → the href is
//    rewritten to the current domain just before, so those stay on-site too.
export default function SameSiteLinks() {
  const router = useRouter();

  useEffect(() => {
    const rewrite = (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      const path = sameSitePath(a);
      if (path) a.setAttribute("href", path);
    };

    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      const path = sameSitePath(a);
      if (!path) return;
      const plain =
        e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey &&
        (!a.target || a.target === "_self") && !a.hasAttribute("download");
      a.setAttribute("href", path);
      if (!plain) return; // browser opens the (now same-domain) href itself
      e.preventDefault();
      e.stopImmediatePropagation();
      router.push(path);
    };

    // Capture phase on document runs before React/Next's own link handlers.
    document.addEventListener("pointerover", rewrite, true);
    document.addEventListener("focusin", rewrite, true);
    document.addEventListener("pointerdown", rewrite, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", rewrite, true);
      document.removeEventListener("focusin", rewrite, true);
      document.removeEventListener("pointerdown", rewrite, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [router]);

  return null;
}
