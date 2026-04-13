"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { href: "/faqs", label: "FAQs" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [hash, setHash] = useState("");

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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncHash = () => {
      setHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const showShadow = pathname === "/" ? scrolled && !heroVisible : scrolled;
  const resolveLinkHref = (href) => (href.startsWith("#") ? `/${href}` : href);
  const isLinkActive = (href) => {
    if (href.startsWith("#")) {
      return pathname === "/" && hash === href;
    }
    return pathname === href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[#CFE2FA]/70 bg-[linear-gradient(90deg,rgba(0,136,255,0.08)_0%,rgba(255,255,255,0.82)_22%,rgba(255,255,255,0.82)_78%,rgba(0,136,255,0.08)_100%)] backdrop-blur-md ${
          showShadow ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[78px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 flex-shrink-0">
              <Image
                src="/logo-blue-11.svg"
                alt="HalaPark"
                width={190}
                height={58}
                className="sm:h-12 h-7 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  (() => {
                    const isActive = isLinkActive(link.href);
                    return (
                  <Link
                    key={link.label}
                    href={resolveLinkHref(link.href)}
                    className={`inline-flex h-11 items-center justify-center border-b-2 px-4 text-[1.02rem] font-semibold transition ${
                      isActive
                        ? "border-[#0088FF] text-[#0078E0]"
                        : "border-transparent text-slate-900 hover:text-[#0078E0]"
                    }`}
                  >
                    <span className="block whitespace-nowrap">
                      {link.label}
                    </span>
                  </Link>
                    );
                  })()
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0088FF] hover:brightness-95 active:bg-[#0088FF] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md"
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
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-[#0088FF] hover:brightness-95 text-white text-sm font-semibold px-4 py-2 rounded-full"
              >
                Get In Touch
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
              className="w-full flex items-center gap-2 px-3 py-3 text-[1.03rem] font-medium text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] rounded-lg"
            >
              <SearchIcon />
              Search
            </button>
            {navLinks.map((link) => (
              (() => {
                const isActive = isLinkActive(link.href);
                return (
              <Link
                key={link.label}
                href={resolveLinkHref(link.href)}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center rounded-lg px-3 py-3 text-[1.03rem] font-medium transition ${
                  isActive
                    ? "bg-[rgba(0,136,255,0.12)] text-[#0078E0]"
                    : "text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)]"
                }`}
              >
                {link.label}
              </Link>
                );
              })()
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-[78px]" />
    </>
  );
}
