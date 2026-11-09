"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { useLanguage, t } from "@/context/LanguageContext";

// Fixed UI chrome only (field labels) — the content itself is CMS-only.
const LABELS = {
  en: { eyebrow: "Map", addressLabel: "Address", phoneLabel: "Phone", emailLabel: "Email", hoursLabel: "Business Hours" },
  ar: { eyebrow: "الخريطة", addressLabel: "العنوان", phoneLabel: "الهاتف", emailLabel: "البريد الإلكتروني", hoursLabel: "ساعات العمل" },
};

export default function ContactMapSection({ map }) {
  const { language } = useLanguage();
  const c = LABELS[language] || LABELS.en;

  // CMS-only content: anything deleted from the database is not rendered.
  const heading = t(map, "heading", language);
  const officeName = t(map, "officeName", language);
  const address = t(map, "address", language);
  const hours = t(map, "hours", language);
  const weekend = t(map, "weekend", language);
  const phone = map?.phone || "";
  const email = map?.email || "";

  // Whole section hides when the CMS has no content for it.
  if (!heading && !address && !officeName && !phone && !email && !hours) {
    return null;
  }

  // Map pinned to the office: Google Maps searches the admin's (English)
  // address, so the embed shows a marker on the office and its "Open in Maps"
  // link opens that same pinned location. (The previous URL used a dummy place
  // id + fixed city-centre coordinates, so no office marker was shown.)
  const mapQuery = (map?.address || "").trim() || "HalaPark, Dubai";
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Panel: Office Info */}
        <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(0,136,255,0.05)_0%,#FFFFFF_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
            {c.eyebrow}
          </span>
          {heading ? (
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl [overflow-wrap:anywhere]">
              {heading}
            </h2>
          ) : null}

          <div className="mt-8 space-y-6">
            {address || officeName ? (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                  <MapPin className="h-5 w-5 text-[#0088FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                    {c.addressLabel}
                  </p>
                  {address ? (
                    <a
                      href={mapOpenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-base text-slate-900 font-medium transition hover:text-[#0088FF] [overflow-wrap:anywhere]"
                    >
                      {address}
                    </a>
                  ) : null}
                  {officeName ? (
                    <p className="mt-1 text-sm text-slate-500 [overflow-wrap:anywhere]">
                      {officeName}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {phone ? (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                  <Phone className="h-5 w-5 text-[#0088FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                    {c.phoneLabel}
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="mt-1 text-base text-[#0088FF] font-medium hover:underline"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            ) : null}

            {email ? (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                  <Mail className="h-5 w-5 text-[#0088FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                    {c.emailLabel}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 text-base text-[#0088FF] font-medium hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>
            ) : null}

            {hours || weekend ? (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                  <Clock className="h-5 w-5 text-[#0088FF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                    {c.hoursLabel}
                  </p>
                  {hours ? (
                    <p className="mt-1 text-base text-slate-900 font-medium [overflow-wrap:anywhere]">
                      {hours}
                    </p>
                  ) : null}
                  {weekend ? (
                    <p className="mt-1 text-sm text-slate-500 [overflow-wrap:anywhere]">
                      {weekend}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Panel: Google Map */}
        <div className="relative min-h-[400px] overflow-hidden bg-white">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
            title="HalaPark Office Location"
          />
        </div>
      </div>
    </section>
  );
}
