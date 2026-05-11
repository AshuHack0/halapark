"use client";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiSnapchat,
  SiTiktok,
} from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

export default function Footer() {
  const appDownloadUrl = "https://halapark.com/app";
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    appDownloadUrl,
  )}`;

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "App", href: "/app" },
    { name: "Services", href: "/solutions" },
    { name: "Solutions", href: "/solutions" },
    { name: "Business", href: "/business" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faqs" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/109206771/admin/dashboard/",
      icon: SlSocialLinkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/halapark.ai/",
      icon: SiInstagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61571036017442",
      icon: SiFacebook,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@halapark.ai",
      icon: SiTiktok,
    },
    {
      name: "Snapchat",
      href: "https://www.snapchat.com/@halapark.ai",
      icon: SiSnapchat,
    },
  ];

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

        <div className="mt-8 grid items-start gap-8 border-b border-[#E4EAF2] pb-10 md:grid-cols-3 md:gap-8 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10">
          <div className="flex h-full max-w-[22.5rem] flex-col md:justify-self-start">
            <div>
              <Link href="/" className="inline-flex items-center gap-1">
                <img
                  src="/logo-blue-11.svg"
                  alt="HalaPark"
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mt-2 max-w-[17rem] text-sm leading-5 text-[#667085]">
                Smart parking solutions across the UAE, making parking simple and
                efficient.
              </p>
            </div>

            <div className="mt-4">
              <ul className="space-y-2 text-sm leading-5 text-[#667085]">
                <li>
                  <a
                    href="mailto:info@halapark.com"
                    className="transition hover:text-[#0088FF]"
                  >
                    support@halapark.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+97143782022"
                    className="transition hover:text-[#0088FF]"
                  >
                    +971 4 378 2022
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D8E6F7] bg-[#F2F8FF] text-[#0088FF] shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:border-[#0088FF] hover:bg-[#0088FF] hover:text-white hover:shadow-[0_10px_24px_rgba(0,136,255,0.18)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-full md:justify-self-start">
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#050A13]">
              Quick Links
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-7 gap-y-2.5 text-left md:gap-x-10">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#667085] transition hover:text-[#0088FF]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:max-w-[22.5rem] md:justify-self-end md:text-right">
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#050A13] md:text-right">
              Get The App
            </h4>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#667085] md:ml-auto md:text-right">
              Scan the QR code to download the HalaPark app.
            </p>
            <div className="mt-4 flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-start md:justify-end">
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
              <div className="flex w-[6.75rem] flex-col items-start gap-2 md:items-end">
                <img
                  src="/google-play.svg"
                  alt="Get it on Google Play"
                  className="h-9 w-[6.75rem] object-contain"
                />
                <img
                  src="/app-store.svg"
                  alt="Download on the App Store"
                  className="h-9 w-[6.75rem] object-contain"
                />
                <Link
                  href={appDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-[6.75rem] items-center gap-1.5 rounded-2xl border-2 border-black bg-black px-2.5"
                  aria-label="Download on Huawei AppGallery"
                >
                  <img
                    src="/channels4_profile.jpg"
                    alt="Huawei AppGallery"
                    className="h-4 w-4 rounded-sm object-cover"
                  />
                  <span className="flex flex-col leading-none text-white">
                    <span className="text-[7px] font-medium opacity-90">
                      Get it on
                    </span>
                    <span className="mt-0.5 text-[13px] font-semibold">
                      Huawei 
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-4 text-sm font-medium text-[#667085] sm:text-base md:flex-row md:items-center md:justify-between">
          <p className="text-left">© {new Date().getFullYear()} HalaPark. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-left text-[#050A13] md:justify-end md:text-right">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#0088FF]" aria-hidden="true" />
              Your data is safe with us.
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-base leading-none" aria-hidden="true">🇦🇪</span>
              UAE made, UAE proud.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
