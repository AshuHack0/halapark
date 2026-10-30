"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { PARTNER_FORM_LINK } from "@/components/partners/PartnershipFormProvider";
import MobilePicture from "@/components/common/MobilePicture";

const ease = [0.22, 1, 0.36, 1];

export default function TransformParking() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // The DB is the single source of truth — no hardcoded content fallbacks.
  const [transformData, setTransformData] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchBusinessSection("transformParking").then((section) => {
      setTransformData(section && typeof section === "object" ? section : {});
      setResolved(true);
    });
  }, []);

  // Perks are arrays of plain strings; the Arabic variants live under `ar.*`.
  // Arabic mode is strict — show the Arabic list only (empty when not provided).
  // Default to an empty array and drop blank entries.
  const parkingPartnerPerks = (
    language === "ar"
      ? (Array.isArray(transformData.ar?.parkingPartnerPerks) ? transformData.ar.parkingPartnerPerks : [])
      : (Array.isArray(transformData.parkingPartnerPerks) ? transformData.parkingPartnerPerks : [])
  ).filter((p) => (p || "").trim());
  const servicePartnerPerks = (
    language === "ar"
      ? (Array.isArray(transformData.ar?.servicePartnerPerks) ? transformData.ar.servicePartnerPerks : [])
      : (Array.isArray(transformData.servicePartnerPerks) ? transformData.servicePartnerPerks : [])
  ).filter((p) => (p || "").trim());

  // Card badges + list headings (admin-editable, with Arabic under `ar.*`).
  // English shows the built-in wording only until the admin saves the field;
  // a cleared field hides the label. Arabic is strict — blank until entered.
  const label = (key, builtIn) =>
    (t(transformData, key, language) || "").trim() ||
    (language === "ar" || key in transformData ? "" : builtIn);
  const parkingPartnerBadge = label("parkingPartnerBadge", "Parking Partner");
  const parkingPartnerPerksLabel = label("parkingPartnerPerksLabel", "What You Get");
  const servicePartnerBadge = label("servicePartnerBadge", "Service Partner");
  const servicePartnerPerksLabel = label("servicePartnerPerksLabel", "Partnership Opportunities");

  const parkingPartnerCtaLabel = (t(transformData, "parkingPartnerCtaLabel", language) || "").trim();
  const servicePartnerCtaLabel = (t(transformData, "servicePartnerCtaLabel", language) || "").trim();

  // With a background photo the text is confined to the left of the diagonal
  // (like the reference design) so copy never sits on top of the image.
  const parkingHasBg = Boolean((transformData.parkingPartnerBgImage || "").trim());
  const serviceHasBg = Boolean((transformData.servicePartnerBgImage || "").trim());

  // Wait for the fetch before rendering so nothing flashes before load.
  if (!resolved) return null;

  // Admin "Show this section on the website" toggle.
  if (transformData?.enabled === false) return null;

  // Hide the whole section when there's no content to show.
  const hasContent =
    (t(transformData, "title", language) || "").trim() ||
    (t(transformData, "description", language) || "").trim() ||
    (t(transformData, "parkingPartnerTitle", language) || "").trim() ||
    (t(transformData, "servicePartnerTitle", language) || "").trim() ||
    parkingPartnerPerks.length ||
    servicePartnerPerks.length;
  if (!hasContent) return null;

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top heading */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto mb-10 max-w-[980px] text-center sm:mb-14"
        >
          <h2 className="text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.05em] text-[#050A13] [overflow-wrap:anywhere] sm:text-[clamp(3rem,5.5vw,5rem)] sm:leading-[1.01] sm:tracking-[-0.06em]">
            <span className="block">{t(transformData, "title", language)}</span>
            {(t(transformData, "titleAccent", language) || "").trim() ? (
              <span className="mt-1.5 block bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-[1.35rem] leading-[1.2] tracking-[-0.03em] text-transparent sm:mt-2 sm:text-[clamp(1.75rem,3vw,2.6rem)] sm:leading-[1.15] sm:tracking-[-0.04em]">
                {t(transformData, "titleAccent", language)}
              </span>
            ) : null}
          </h2>
          <RichText text={t(transformData, "description", language)} className="mx-auto mt-5 max-w-[650px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] block" />
        </motion.div>

        {/* Two partner cards */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Parking Partner */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease }}
            className={`relative isolate flex flex-col overflow-hidden rounded-[28px] border border-[#E7EAF0] bg-white p-6 shadow-[0_4px_24px_rgba(6,6,22,0.06)] sm:p-10 ${parkingHasBg ? "pt-[calc(56%+1.25rem)] sm:pe-[36%] sm:pt-10" : ""}`}
          >
            {/* Background photo in a triangular wedge (admin-set); falls back to
                subtle CSS triangles when no image is uploaded. */}
            {(transformData.parkingPartnerBgImage || "").trim() ? (
              <>
              {/* Phones: photo strip across the top of the card with a chevron
                  edge along the bottom (the side wedge below is sm+ only). */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 aspect-[16/9] sm:hidden">
                <div className="absolute inset-0 bg-[#1AB2FF]/25 [clip-path:polygon(0_0,100%_0,100%_78%,50%_100%,0_78%)]" />
                <div className="absolute inset-0 overflow-hidden [clip-path:polygon(0_0,100%_0,100%_74%,50%_96%,0_74%)]">
                  <MobilePicture mobileSrc={transformData.parkingPartnerMobileBgImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={transformData.parkingPartnerBgImage} alt="" className="h-full w-full object-cover object-center" />
                  </MobilePicture>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                </div>
              </div>
              {/* Arabic: the whole photo/chevron layer mirrors to the left side; the
                  photo itself is flipped back so it never shows reversed. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block rtl:-scale-x-100">
                {/* Chevron accent stripes echoing the photo's diagonal edge */}
                <div className="absolute inset-y-0 right-0 w-[48%] bg-[#0088FF]/15 [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]" />
                <div className="absolute inset-y-0 right-0 w-[45%] bg-[#1AB2FF]/25 [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]" />
                {/* Photo panel with a left-pointing chevron edge */}
                <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]">
                  <MobilePicture mobileSrc={transformData.parkingPartnerMobileBgImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={transformData.parkingPartnerBgImage}
                      alt=""
                      className="h-full w-full object-cover object-center rtl:-scale-x-100"
                    />
                  </MobilePicture>
                  {/* Soft fade toward the text side so copy stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/35 to-transparent" />
                </div>
              </div>
              </>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-px right-0 -z-10 h-64 w-64 bg-gradient-to-bl from-[#0088FF]/[0.09] to-transparent [clip-path:polygon(100%_0,100%_100%,0_0)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-16 top-0 -z-10 h-40 w-40 bg-gradient-to-bl from-[#1AB2FF]/[0.07] to-transparent [clip-path:polygon(100%_0,100%_100%,0_0)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-px left-0 -z-10 h-48 w-48 bg-gradient-to-tr from-[#0088FF]/[0.06] to-transparent [clip-path:polygon(0_100%,100%_100%,0_0)]"
                />
              </>
            )}
            {parkingPartnerBadge ? (
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#EEF6FF] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#0088FF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0088FF] rtl:tracking-normal">{parkingPartnerBadge}</span>
              </div>
            ) : null}
            <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#050A13]">
              {t(transformData, "parkingPartnerTitle", language)}
            </h3>
            <p className="mt-2 text-[0.94rem] font-medium text-[#050A13]">
              {t(transformData, "parkingPartnerSubtitle", language)}
            </p>
            <RichText text={t(transformData, "parkingPartnerDescription", language)} className="mt-4 text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] block" />

            {parkingPartnerPerksLabel && parkingPartnerPerks.length > 0 ? (
              <p className="mt-8 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-[#0088FF] rtl:tracking-normal">{parkingPartnerPerksLabel}</p>
            ) : null}
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {parkingPartnerPerks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0088FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.88rem] text-slate-700">{perk}</span>
                </motion.li>
              ))}
            </ul>

            {parkingPartnerCtaLabel ? (
              <div className="mt-auto pt-10">
                <Link
                  href={transformData.parkingPartnerCtaPopup ? PARTNER_FORM_LINK : (transformData.parkingPartnerCtaLink || "").trim() || "/contact"}
                  data-partner-source="Business · Parking Partner"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,136,255,0.35)] transition hover:brightness-110"
                >
                  {parkingPartnerCtaLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                </Link>
              </div>
            ) : null}
          </motion.div>

          {/* Service Partner */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className={`relative isolate flex flex-col overflow-hidden rounded-[28px] bg-[#06111f] p-6 shadow-[0_4px_24px_rgba(6,6,22,0.12)] sm:p-10 ${serviceHasBg ? "pt-[calc(56%+1.25rem)] sm:pe-[36%] sm:pt-10" : ""}`}
          >
            {/* Background photo in a triangular wedge (admin-set); falls back to
                subtle CSS triangles when no image is uploaded. */}
            {(transformData.servicePartnerBgImage || "").trim() ? (
              <>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 aspect-[16/9] sm:hidden">
                <div className="absolute inset-0 bg-[#1AB2FF]/35 [clip-path:polygon(0_0,100%_0,100%_78%,50%_100%,0_78%)]" />
                <div className="absolute inset-0 overflow-hidden [clip-path:polygon(0_0,100%_0,100%_74%,50%_96%,0_74%)]">
                  <MobilePicture mobileSrc={transformData.servicePartnerMobileBgImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={transformData.servicePartnerBgImage} alt="" className="h-full w-full object-cover object-center" />
                  </MobilePicture>
                  <div className="absolute inset-0 bg-[#0044AA]/30 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/90 via-[#06111f]/20 to-transparent" />
                </div>
              </div>
              {/* Arabic: the whole photo/chevron layer mirrors to the left side; the
                  photo itself is flipped back so it never shows reversed. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block rtl:-scale-x-100">
                {/* Chevron accent stripes echoing the photo's diagonal edge */}
                <div className="absolute inset-y-0 right-0 w-[48%] bg-[#0088FF]/30 [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]" />
                <div className="absolute inset-y-0 right-0 w-[45%] bg-[#1AB2FF]/35 [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]" />
                {/* Photo panel with a left-pointing chevron edge */}
                <div className="absolute inset-y-0 right-0 w-[42%] overflow-hidden [clip-path:polygon(26%_0,100%_0,100%_100%,26%_100%,0_50%)]">
                  <MobilePicture mobileSrc={transformData.servicePartnerMobileBgImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={transformData.servicePartnerBgImage}
                      alt=""
                      className="h-full w-full object-cover object-center rtl:-scale-x-100"
                    />
                  </MobilePicture>
                  {/* Blue tint + fade toward the text side (matches the reference) */}
                  <div className="absolute inset-0 bg-[#0044AA]/30 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/40 to-transparent" />
                </div>
              </div>
              </>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-px right-0 -z-10 h-64 w-64 bg-gradient-to-bl from-[#0088FF]/[0.22] to-transparent [clip-path:polygon(100%_0,100%_100%,0_0)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-16 top-0 -z-10 h-40 w-40 bg-gradient-to-bl from-[#5BC4FF]/[0.12] to-transparent [clip-path:polygon(100%_0,100%_100%,0_0)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-px left-0 -z-10 h-48 w-48 bg-gradient-to-tr from-[#1AB2FF]/[0.10] to-transparent [clip-path:polygon(0_100%,100%_100%,0_0)]"
                />
              </>
            )}
            {servicePartnerBadge ? (
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#5BC4FF]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 rtl:tracking-normal">{servicePartnerBadge}</span>
              </div>
            ) : null}
            <h3 className="mt-4 text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              {t(transformData, "servicePartnerTitle", language)}
            </h3>
            <p className="mt-2 text-[0.94rem] font-medium text-white/80">
              {t(transformData, "servicePartnerSubtitle", language)}
            </p>
            <RichText text={t(transformData, "servicePartnerDescription1", language)} className="mt-4 text-[0.88rem] leading-6 text-white/55 sm:text-[0.94rem] block" />
            <RichText text={t(transformData, "servicePartnerDescription2", language)} className="mt-3 text-[0.88rem] leading-6 text-white/55 sm:text-[0.94rem] block" />

            {servicePartnerPerksLabel && servicePartnerPerks.length > 0 ? (
              <p className="mt-8 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-[#5BC4FF] rtl:tracking-normal">{servicePartnerPerksLabel}</p>
            ) : null}
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {servicePartnerPerks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5BC4FF]/20 border border-[#5BC4FF]/40">
                    <Check className="h-3 w-3 text-[#5BC4FF]" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[0.88rem] text-white/70">{perk}</span>
                </motion.li>
              ))}
            </ul>

            {servicePartnerCtaLabel ? (
              <div className="mt-auto pt-10">
                <Link
                  href={transformData.servicePartnerCtaPopup ? PARTNER_FORM_LINK : (transformData.servicePartnerCtaLink || "").trim() || "/contact"}
                  data-partner-source="Business · Service Partner"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {servicePartnerCtaLabel} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                </Link>
              </div>
            ) : null}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
