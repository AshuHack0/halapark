"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiSnapchat,
  SiTiktok,
} from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { t, useLanguage } from "@/context/LanguageContext";
import { fetchPage } from "@/lib/cms";

// Social key → icon component. Which socials render (and their hrefs) comes
// from the CMS; unrecognized keys are skipped.
const SOCIAL_ICONS = {
  linkedin: SlSocialLinkedin,
  instagram: SiInstagram,
  facebook: SiFacebook,
  tiktok: SiTiktok,
  snapchat: SiSnapchat,
};

export default function Footer() {
  const { language } = useLanguage();
  // Site logo from global Settings (falls back to the bundled asset).
  const [logo, setLogo] = useState({ image: "/logo-blue-11.svg", alt: "HalaPark" });
  // Footer content is fully CMS-driven (settings → sections.footer) — no
  // hardcoded fallbacks; anything missing in the DB simply doesn't render.
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    fetchPage("settings").then((page) => {
      const l = page?.sections?.logo;
      if (l?.image) setLogo({ image: l.image, alt: l.alt || "HalaPark" });
      if (page?.sections?.footer) setFooter(page.sections.footer);
    });
  }, []);

  const f = footer ?? {};
  // Strict Arabic: AR mode shows ar.<field> or blank; EN shows the EN field.
  const tr = (key) => t(f, key, language);

  const tagline = tr("tagline");
  const email = f.email ?? "";
  const phone = f.phone ?? "";
  const socials = (Array.isArray(f.socials) ? f.socials : []).filter(
    (s) => s?.href && SOCIAL_ICONS[s?.key],
  );
  const quickLinksHeading = tr("quickLinksHeading");
  const quickLinks = (Array.isArray(f.quickLinks) ? f.quickLinks : [])
    .map((link) => ({
      href: link?.href ?? "",
      label: language === "ar" ? link?.ar?.label ?? "" : link?.label ?? "",
    }))
    .filter((link) => link.label && link.href);
  const appHeading = tr("appHeading");
  const appText = tr("appText");
  const appDownloadUrl = (f.appDownloadUrl ?? "").trim();
  // One link per store badge; a badge renders only when its link is set.
  const appStoreUrl = (f.appStoreUrl ?? "").trim();
  const playStoreUrl = (f.playStoreUrl ?? "").trim();
  const appGalleryUrl = (f.appGalleryUrl ?? "").trim();
  const hasStoreLinks = Boolean(appStoreUrl || playStoreUrl || appGalleryUrl);
  const rights = tr("rights");
  const dataSafe = tr("dataSafe");
  const uaeProud = tr("uaeProud");

  // Admin-uploaded QR image wins; otherwise generate one from the download URL.
  const qrImage = (f.qrImage || "").trim();
  const qrCodeSrc =
    qrImage ||
    (appDownloadUrl
      ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
          appDownloadUrl,
        )}`
      : "");

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#E4EAF2] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFDFF_52%,#F6FAFF_100%)] font-sans text-[#050A13]">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#0088FF]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#0088FF]/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-12">
        {/* <div className="rounded-2xl border border-[#CDE0F7] bg-white/80 p-5 shadow-[0_14px_34px_rgba(0,136,255,0.08)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0088FF]">
                HalaPark
              </p>
              <h3 className="mt-1 text-[1.15rem] font-semibold leading-tight text-[#0A1728] sm:text-[1.35rem]">
                Smarter Parking Starts Here
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/contact"
                className="inline-flex min-h-[2.8rem] items-center justify-center rounded-full bg-[#0088FF] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.24)] transition hover:brightness-95"
              >
                Talk to Us
              </Link>
              <Link
                href={appDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.8rem] items-center justify-center rounded-full border border-[#C5D9F2] bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-[#0088FF] hover:text-[#0088FF]"
              >
                Download App
              </Link>
            </div>
          </div>
        </div> */}

        <div className="mt-8 grid items-start gap-8 border-b border-[#E4EAF2] pb-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          <div className="flex h-full max-w-[22.5rem] flex-col md:justify-self-start">
            <div>
              <Link href="/" className="inline-flex items-center gap-1">
                <img
                  src={logo.image}
                  alt={logo.alt}
                  className="h-10 w-auto"
                />
              </Link>
              {tagline ? (
                <p className="mt-2 max-w-[17rem] text-sm leading-5 text-[#667085] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
                  {tagline}
                </p>
              ) : null}
            </div>

            {email || phone ? (
              <div className="mt-4">
                <ul className="space-y-2 text-sm leading-5 text-[#667085]">
                  {email ? (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="transition hover:text-[#0088FF]"
                      >
                        {email}
                      </a>
                    </li>
                  ) : null}
                  {phone ? (
                    <li>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="transition hover:text-[#0088FF]"
                      >
                        {phone}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}

            {socials.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.key];
                  return (
                    <Link
                      key={social.key + social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.key}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D8E6F7] bg-[#F2F8FF] text-[#0088FF] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-[#0088FF] hover:bg-[#0088FF] hover:text-white hover:shadow-[0_10px_24px_rgba(0,136,255,0.18)]"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          {quickLinks.length > 0 ? (
            <div className="w-full md:justify-self-start">
              {quickLinksHeading ? (
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#050A13]" dir={language === "ar" ? "rtl" : "ltr"}>
                  {quickLinksHeading}
                </h4>
              ) : null}
              <ul className="mt-3 grid grid-cols-2 gap-x-7 gap-y-2.5 text-left rtl:text-right md:gap-x-10" dir={language === "ar" ? "rtl" : "ltr"}>
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#667085] transition hover:text-[#0088FF] [overflow-wrap:anywhere]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {appHeading || appText || appDownloadUrl || hasStoreLinks ? (
            <div className="w-full md:col-span-2 lg:col-span-1 lg:max-w-[22.5rem] lg:justify-self-end lg:text-right rtl:lg:text-left">
              {appHeading ? (
                <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#050A13] lg:text-right rtl:lg:text-left" dir={language === "ar" ? "rtl" : "ltr"}>
                  {appHeading}
                </h4>
              ) : null}
              {appText ? (
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#667085] lg:ml-auto lg:text-right rtl:lg:ml-0 rtl:lg:mr-auto rtl:lg:text-left [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
                  {appText}
                </p>
              ) : null}
              {appDownloadUrl || hasStoreLinks ? (
                <div className="mt-4 flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-start lg:justify-end">
                  {appDownloadUrl && qrCodeSrc ? (
                    <Link
                      href={appDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <img
                        src={qrCodeSrc}
                        alt="QR code for HalaPark app download"
                        className="h-36 w-36 rounded-xl border border-[#D7E5F6] bg-white p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                      />
                    </Link>
                  ) : null}
                  {hasStoreLinks ? (
                    <div className="flex w-[7.25rem] flex-col items-start gap-2 lg:items-end">
                      {/* Google Play + App Store are built like the Huawei badge
                          (real text + vector icon) instead of the old SVG files,
                          whose embedded bitmap text was tiny and blurry. */}
                      {playStoreUrl ? (
                        <Link
                          href={playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-[7.25rem] items-center gap-1.5 rounded-2xl border-2 border-black bg-black px-2.5"
                          aria-label="Get it on Google Play"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
                            <path fill="#00D7FE" d="M3.6 1.8c-.4.2-.6.6-.6 1.1v18.2c0 .5.2.9.6 1.1L13.6 12 3.6 1.8z" />
                            <path fill="#FFCE00" d="M17 15.4 13.6 12 17 8.6l4 2.3c1.1.6 1.1 1.6 0 2.2l-4 2.3z" />
                            <path fill="#FF3A44" d="M17 15.4 13.6 12 3.6 22.2c.4.2.9.1 1.5-.2L17 15.4z" />
                            <path fill="#00F076" d="M17 8.6 5.1 2c-.6-.3-1.1-.4-1.5-.2L13.6 12 17 8.6z" />
                          </svg>
                          <span className="flex min-w-0 flex-col items-start text-start leading-none text-white">
                            <span className="whitespace-nowrap text-[8px] font-medium opacity-90">
                              {language === "ar" ? "احصل عليه من" : "Get it on"}
                            </span>
                            <span className="mt-0.5 whitespace-nowrap text-[13px] font-semibold">
                              Google Play
                            </span>
                          </span>
                        </Link>
                      ) : null}
                      {appStoreUrl ? (
                        <Link
                          href={appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-[7.25rem] items-center gap-1.5 rounded-2xl border-2 border-black bg-black px-2.5"
                          aria-label="Download on the App Store"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="#ffffff" aria-hidden>
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                          </svg>
                          <span className="flex min-w-0 flex-col items-start text-start leading-none text-white">
                            <span className="whitespace-nowrap text-[8px] font-medium opacity-90">
                              {language === "ar" ? "حمّله من" : "Download on the"}
                            </span>
                            <span className="mt-0.5 whitespace-nowrap text-[13px] font-semibold">
                              App Store
                            </span>
                          </span>
                        </Link>
                      ) : null}
                      {appGalleryUrl ? (
                        <Link
                          href={appGalleryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-[7.25rem] items-center gap-1.5 rounded-2xl border-2 border-black bg-black px-2.5"
                          aria-label="Download on Huawei AppGallery"
                        >
                          <img
                            src="/channels4_profile.jpg"
                            alt="Huawei AppGallery"
                            className="h-4 w-4 rounded-sm object-cover"
                          />
                          <span className="flex min-w-0 flex-col items-start text-start leading-none text-white">
                            <span className="whitespace-nowrap text-[8px] font-medium opacity-90">
                              {language === "ar" ? "متوفر على" : "Get it on"}
                            </span>
                            <span className="mt-0.5 text-[13px] font-semibold">
                              Huawei
                            </span>
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-4 text-sm font-medium text-[#667085] sm:text-base md:flex-row md:items-center md:justify-between">
          <p className="text-left rtl:text-right" dir={language === "ar" ? "rtl" : "ltr"}>© {new Date().getFullYear()} HalaPark.{rights ? ` ${rights}` : ""}</p>
          {dataSafe || uaeProud ? (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-left rtl:text-right text-[#050A13] md:justify-end md:text-right rtl:md:text-left" dir={language === "ar" ? "rtl" : "ltr"}>
              {dataSafe ? (
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#0088FF]" aria-hidden="true" />
                  {dataSafe}
                </span>
              ) : null}
              {uaeProud ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-base leading-none" aria-hidden="true">🇦🇪</span>
                  {uaeProud}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>

      </div>
    </footer>
  );
}
