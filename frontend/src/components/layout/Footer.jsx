"use client";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const appDownloadUrl = "https://halapark.com/app";
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    appDownloadUrl,
  )}`;
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/service" },
    { name: "About Us", href: "/about" },
    { name: "App", href: "/app" },
    { name: "Business", href: "/business" },
    { name: "Blog", href: "/blog" },
    { name: "FAQS", href: "/faqs" },
  ];
  const quickLinks2 = [
    { name: "About Us", href: "/about" },
    { name: "App", href: "/app" },
    { name: "Business", href: "/business" },
    { name: "Blog", href: "/blog" },
  ];

  const ContactLinks = [{ name: "Contact Us", href: "/contact" }];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook />, href: "#" },
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "Linkedin", icon: <FaLinkedin />, href: "#" },
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
  ];

  return (
    <footer className="relative mt-12 border-t border-[#DCE8F7] bg-[#F4F8FF] text-black font-sans w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E8F1FF] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 border-b border-[#C8D9EE] pb-10">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1 sm:w-2/5 w-full">
            <a href="/" className="flex items-center gap-1 flex-shrink-0">
              <img src="logo-blue-11.svg" alt="" className="sm:h-16 h-6" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-black/70">
              Smart parking technology built for drivers, properties, and cities
              across the UAE.
            </p>
          </div>

          <div className="flex flex-row flex-wrap justify-between items-start sm:w-3/5 w-full gap-6 relative sm:pb-0 pb-20">
            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-1">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-black transition-colors text-xs sm:text-sm underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Quick Links */}
            {/* <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-1">
                {quickLinks2.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-black transition-colors text-xs sm:text-sm underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            {/* contact */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Support
              </h4>
              <ul className="space-y-2 sm:space-y-1">
                <li>
                  <Link
                    href={""}
                    className="text-black transition-colors text-xs sm:text-sm"
                  >
                    {"Mail : info@halapark.com"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="text-black transition-colors text-xs sm:text-sm"
                  >
                    {"Phone : +971 4 3782022"}
                  </Link>
                </li>
                {ContactLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-black transition-colors text-xs sm:text-sm underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-auto max-w-[220px]">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Download App
              </h4>
              <p className="text-xs sm:text-sm text-black/70 mb-3">
                Scan to open the HalaPark app download page.
              </p>
              <Link
                href={appDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={qrCodeSrc}
                  alt="QR code for HalaPark app download"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border border-gray-200 p-2 bg-white"
                />
              </Link>
              <div className="flex items-center gap-2 mt-3">
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
              </div>
            </div>
          </div>
        </div>
        {/* bottom menu */}
        <div className="w-full py-4 px-0 flex sm:flex-row flex-col sm:items-center justify-between gap-5 sm:gap-0  mt-2">
          <div className="flex items-center">
            <button className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-900 hover:shadow-sm transition">
              <span className="w-6 h-6 flex items-center justify-center bg-[rgba(0,136,255,0.10)] rounded-full">
                <img src="/Figure09mailicon.png" alt="" />
              </span>
              support@halapark.com
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-start justify-end gap-4">
            <span className="text-base text-black">Social media:</span>

            <div className="flex gap-3">
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    href={social.href}
                    className="w-9 h-9 text-black flex items-center justify-center hover:bg-white hover:border hover:border-gray-200 rounded-lg bg-gray-50"
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
