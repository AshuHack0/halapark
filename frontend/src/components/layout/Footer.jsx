"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const appDownloadUrl = "https://halapark.com/app";
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    appDownloadUrl,
  )}`;

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/solutions" },
    { name: "About Us", href: "/about" },
    { name: "App", href: "/app" },
    { name: "Business", href: "/business" },
    { name: "Blog", href: "/blog" },
    { name: "FAQS", href: "/faqs" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/hala-car-park-rental-management-llc", icon: FaLinkedinIn },
    { name: "Instagram", href: "https://www.instagram.com/halapark.info/", icon: FaInstagram },
    { name: "Facebook", href: "https://www.facebook.com/Halapark.Info", icon: FaFacebookF },
  ];

  return (
    <footer className="relative mt-12 w-full overflow-hidden border-t border-[#DCE8F7] bg-[linear-gradient(180deg,#F4F8FF_0%,#EEF5FF_100%)] text-black font-sans">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#E2EEFF] to-transparent" />

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

        <div className="mt-8 grid gap-7 border-b border-[#C8D9EE] pb-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
             <Link href="/" className="inline-flex items-center gap-1">
              <img src="/logo-blue-11.svg" alt="HalaPark" className="h-10 w-auto  " />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-black/70">
              Smart parking technology built for drivers, properties, and cities
              across the UAE.
            </p>
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9DCF3] bg-white text-[#0088FF] transition hover:border-[#0088FF] hover:bg-[#0088FF] hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#0A1728]">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/75 transition hover:text-[#0088FF]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#0A1728]">
              Support
            </h4>
            <ul className="mt-3 space-y-2.5 text-sm text-black/75">
              <li>
                <a
                  href="mailto:info@halapark.com"
                  className="transition hover:text-[#0088FF]"
                >
                  info@halapark.com
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
              <li>
                <Link href="/contact" className="transition hover:text-[#0088FF]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#0A1728]">
              Get The App
            </h4>
            <p className="mt-3 text-sm text-black/70">
              Scan to open the HalaPark app download page.
            </p>
            <Link
              href={appDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block"
            >
              <img
                src={qrCodeSrc}
                alt="QR code for HalaPark app download"
                className="h-28 w-28 rounded-xl border border-[#D7E5F6] bg-white p-2"
              />
            </Link>
            <div className="mt-3 flex items-center gap-2">
              <img
                src="/google-play.svg"
                alt="Get it on Google Play"
                className="h-8 w-auto"
              />
              <img
                src="/app-store.svg"
                alt="Download on the App Store"
                className="h-8 w-auto"
              />
              <Link
                href={appDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-2xl border-2 border-black bg-black px-3"
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
                  <span className="mt-0.5 text-[10px] font-semibold">Huawei</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6   pt-4 text-xs text-black/60 sm:text-sm">
          <p>© {new Date().getFullYear()} HalaPark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
