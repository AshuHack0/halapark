"use client";

import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import LogoTicker from "@/components/common/LogoTicker";

export default function ClientsPartners() {
  const { language } = useLanguage();
  const [cp, setCp] = useState({});

  useEffect(() => {
    fetchHomeSection("clientsPartners").then((d) => {
      if (d && typeof d === "object") {
        setCp({
          enabled: d.enabled,
          ar: d.ar,
          heading: d.heading || "",
          headingEnd: d.headingEnd || "",
          // Admin toggle: split the heading onto two lines (default: one line).
          headingBr: d.headingBr === true,
          ctaLabel: d.ctaLabel || "",
          ctaHref: d.ctaHref || "",
          logos: Array.isArray(d.logos) ? d.logos.filter((l) => l && l.image) : [],
          logoPlaceholders: Array.isArray(d.logoPlaceholders)
            ? d.logoPlaceholders
            : [],
        });
      }
    });
  }, []);

  // Prefer uploaded logo images; fall back to text placeholders if none.
  const hasLogos = (cp.logos || []).length > 0;
  const placeholderItems = [...(cp.logoPlaceholders || []), ...(cp.logoPlaceholders || [])];

  // Hide the section entirely when the admin hasn't entered any content:
  // no heading (EN), no headingEnd (EN), and no logos or placeholders.
  if (cp?.enabled === false) return null;
  if (
    !cp.heading &&
    !cp.headingEnd &&
    !hasLogos &&
    (cp.logoPlaceholders || []).length === 0
  )
    return null;

  // The band itself now lives in the shared LogoTicker, so Home, Business and
  // Services render exactly the same markup instead of three copies.
  return (
    <LogoTicker
      heading={t(cp, "heading", language)}
      headingEnd={t(cp, "headingEnd", language)}
      logos={(cp.logos || []).map((l) => ({ image: l.image, alt: l.alt }))}
      placeholders={cp.logoPlaceholders || []}
      cta={t(cp, "ctaLabel", language) ? { label: t(cp, "ctaLabel", language), href: cp.ctaHref } : null}
    />
  );
}
