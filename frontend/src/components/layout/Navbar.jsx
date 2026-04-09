"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "/how-it-works", label: "How It Works" },
  { href: "/app", label: "App" },
  { href: "#services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/business", label: "Business" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    const scrollTarget = scrollContainer ?? window;
    const getScrollTop = () =>
      scrollContainer instanceof HTMLElement
        ? scrollContainer.scrollTop
        : window.scrollY;
    const handleScroll = () => setScrolled(getScrollTop() > 8);

    handleScroll();
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hero = document.getElementById("hero-section");
    if (!hero) {
      const frameId = window.requestAnimationFrame(() => {
        setHeroVisible(false);
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    const initialFrameId = window.requestAnimationFrame(() => {
      setHeroVisible(true);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(hero);
    return () => {
      window.cancelAnimationFrame(initialFrameId);
      observer.disconnect();
    };
  }, [pathname]);

  const showShadow = pathname === "/" ? scrolled && !heroVisible : scrolled;
  const resolveLinkHref = (href) => (href.startsWith("#") ? `/${href}` : href);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white ${
          showShadow ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 flex-shrink-0">
              <Image
                src="/logo-blue-11.svg"
                alt="HalaPark"
                width={160}
                height={48}
                className="sm:h-10 h-6 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center rounded-full  bg-white p-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={resolveLinkHref(link.href)}
                    className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium text-slate-900 hover:bg-[#0088FF] hover:text-white"
                  >
                    <span className="block whitespace-nowrap">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 bg-[#0088FF] hover:brightness-95 active:bg-[#0088FF] text-white text-sm font-light px-5 py-2.5 rounded-full shadow-sm hover:shadow-md"
              >
                Download the App
                <PhoneIcon />
              </Link>
              <Link
                href="/pay"
                className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-slate-50"
              >
                Pay
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0088FF] hover:brightness-95 active:bg-[#0088FF] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md"
              >
                Get In Touch
              </Link>
              <button
                type="button"
                aria-label="Search"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <SearchIcon />
              </button>
            </div>

            {/* Mobile: compact CTA + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 bg-[#0088FF] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                <span className="hidden sm:inline">Download the App</span>
                <span className="sm:hidden">Download</span>
                <PhoneIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-[#0088FF] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                Get In Touch
              </Link>
              <Link
                href="/pay"
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2 rounded-full"
              >
                Pay
              </Link>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-lg text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[0.9375rem] font-medium text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] rounded-lg"
            >
              <SearchIcon />
              Search
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={resolveLinkHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-3 py-2.5 text-[0.9375rem] font-medium text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-[70px]" />
    </>
  );
}
