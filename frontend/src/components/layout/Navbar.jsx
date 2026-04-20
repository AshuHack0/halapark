"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesData } from "@/modules/home/servicesData";

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

const ChevronDownIcon = ({ open = false }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const navLinks = [
  { href: "/", key: "home" },
  // { href: "/how-it-works", key: "howItWorks" },
  { href: "/app", key: "parkuser", dropdownType: "parkuser" },
  { href: "#services", key: "services", dropdownType: "services" },
  // { href: "/solutions", key: "solutions" },
  { href: "/business", key: "business" },
  { href: "/about", key: "aboutUs" },
  { href: "/faqs", key: "faqs" },
];

const LANGUAGE_STORAGE_KEY = "halapark-language";
const SUPPORTED_LANGUAGES = ["en", "ar"];
const UI_TEXT = {
  en: {
    nav: {
      home: "Home",
      parkuser: "Park User",
      parkLocation: "Park Location",
      mobileApp: "Mobile App",
      services: "Services",
      solutions: "Solutions",
      business: "Business",
      aboutUs: "About Us",
      faqs: "FAQs",
    },
    cta: "Get In Touch",
    search: "Search",
    language: "Language",
  },
  ar: {
    nav: {
      home: "الرئيسية",
      parkuser: "مستخدم بارك",
      parkLocation: "موقع الموقف",
      mobileApp: "تطبيق الجوال",
      services: "الخدمات",
      solutions: "الحلول",
      business: "الأعمال",
      aboutUs: "من نحن",
      faqs: "الأسئلة الشائعة",
    },
    cta: "تواصل معنا",
    search: "بحث",
    language: "اللغة",
  },
};

const SERVICE_LABELS_AR = {
  "smart-public-parking": "مواقف عامة ذكية",
  "private-parking-rental": "تأجير المواقف الخاصة",
  "ev-charging": "شحن المركبات الكهربائية",
  "valet-on-demand": "خدمة صفّ السيارات عند الطلب",
  "barrier-free-parking": "مواقف بدون حواجز",
  "parking-management": "إدارة المواقف",
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "en";
};

const setTranslateCookie = (language) => {
  const targetLanguage = language === "ar" ? "ar" : "en";
  const cookieValue = targetLanguage === "en" ? "/en/en" : `/en/${targetLanguage}`;
  document.cookie = `googtrans=${cookieValue}; path=/`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
};

export default function Navbar() {
  const DROPDOWN_CLOSE_DELAY_MS = 220;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [parkuserOpen, setParkuserOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileParkuserOpen, setMobileParkuserOpen] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [hash, setHash] = useState("");
  const isArabic = language === "ar";
  const copy = UI_TEXT[language];
  const servicesMenuRef = useRef(null);
  const parkuserMenuRef = useRef(null);
  const servicesCloseTimerRef = useRef(null);
  const parkuserCloseTimerRef = useRef(null);
  const serviceLinks = servicesData.map((service) => ({
    href: `/services/${service.slug}`,
    label: isArabic ? (SERVICE_LABELS_AR[service.slug] || service.name) : service.name,
  }));
  const parkuserLinks = [
    { href: "/app#park-location", label: copy.nav.parkLocation },
    { href: "/app#mobile-app", label: copy.nav.mobileApp },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [isArabic, language]);


  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncHash = () => {
      setHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
      if (
        parkuserMenuRef.current &&
        !parkuserMenuRef.current.contains(event.target)
      ) {
        setParkuserOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setParkuserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      if (servicesCloseTimerRef.current) {
        window.clearTimeout(servicesCloseTimerRef.current);
      }
      if (parkuserCloseTimerRef.current) {
        window.clearTimeout(parkuserCloseTimerRef.current);
      }
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const openServicesDropdown = () => {
    if (servicesCloseTimerRef.current) {
      window.clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesDropdownWithDelay = () => {
    if (servicesCloseTimerRef.current) {
      window.clearTimeout(servicesCloseTimerRef.current);
    }
    servicesCloseTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  const openParkuserDropdown = () => {
    if (parkuserCloseTimerRef.current) {
      window.clearTimeout(parkuserCloseTimerRef.current);
      parkuserCloseTimerRef.current = null;
    }
    setParkuserOpen(true);
  };

  const closeParkuserDropdownWithDelay = () => {
    if (parkuserCloseTimerRef.current) {
      window.clearTimeout(parkuserCloseTimerRef.current);
    }
    parkuserCloseTimerRef.current = window.setTimeout(() => {
      setParkuserOpen(false);
      parkuserCloseTimerRef.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  const handleLanguageChange = (nextLanguage) => {
    if (nextLanguage === language || !SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setTranslateCookie(nextLanguage);

    if (nextLanguage === "ar") {
      window.location.href = window.location.href;
      return;
    }

    setLanguage(nextLanguage);
    window.dispatchEvent(
      new CustomEvent("halapark-language-change", { detail: nextLanguage }),
    );
  };

  const resolveLinkHref = (href) => (href.startsWith("#") ? `/${href}` : href);
  const isLinkActive = (href) => {
    if (href === "#services") {
      return pathname.startsWith("/services") || (pathname === "/" && hash === "#services");
    }
    if (href.includes("#") && !href.startsWith("#")) {
      const [hrefPath, hrefHash] = href.split("#");
      return pathname === hrefPath && hash === `#${hrefHash}`;
    }
    if (href.startsWith("#")) {
      return pathname === "/" && hash === href;
    }
    return pathname === href;
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#CFE2FA]/70 bg-[linear-gradient(90deg,rgba(0,136,255,0.08)_0%,rgba(255,255,255,0.82)_22%,rgba(255,255,255,0.82)_78%,rgba(0,136,255,0.08)_100%)] backdrop-blur-md shadow-none"
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
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);

                  if (link.dropdownType === "services") {
                    return (
                      <div
                        key={link.key}
                        ref={servicesMenuRef}
                        className="relative"
                        onMouseEnter={openServicesDropdown}
                        onMouseLeave={closeServicesDropdownWithDelay}
                      >
                        <button
                          type="button"
                          className={`inline-flex h-11 items-center justify-center gap-1 border-b-2 px-4 text-[1.02rem] font-semibold transition ${
                            isActive
                              ? "border-[#0088FF] text-[#0078E0]"
                              : "border-transparent text-slate-900 hover:text-[#0078E0]"
                          }`}
                          aria-haspopup="menu"
                          aria-expanded={servicesOpen}
                          onClick={() => setServicesOpen((v) => !v)}
                        >
                          <span className="block whitespace-nowrap">
                            {copy.nav[link.key]}
                          </span>
                          <ChevronDownIcon open={servicesOpen} />
                        </button>

                        <div
                          className={`absolute left-1/2 top-full z-[60] mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-[#CFE2FA]/75 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-sm transition ${
                            servicesOpen
                              ? "pointer-events-auto opacity-100 translate-y-0"
                              : "pointer-events-none opacity-0 -translate-y-1"
                          }`}
                          role="menu"
                        >
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm transition ${
                                pathname === service.href
                                  ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                  : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                              }`}
                              onClick={() => setServicesOpen(false)}
                            >
                              <span>{service.label}</span>
                              <span className="shrink-0 opacity-80">
                                <ArrowRightIcon />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (link.dropdownType === "parkuser") {
                    const parkuserActive = pathname === "/app";
                    return (
                      <div
                        key={link.key}
                        ref={parkuserMenuRef}
                        className="relative"
                        onMouseEnter={openParkuserDropdown}
                        onMouseLeave={closeParkuserDropdownWithDelay}
                      >
                        <button
                          type="button"
                          className={`inline-flex h-11 items-center justify-center gap-1 border-b-2 px-4 text-[1.02rem] font-semibold transition ${
                            parkuserActive
                              ? "border-[#0088FF] text-[#0078E0]"
                              : "border-transparent text-slate-900 hover:text-[#0078E0]"
                          }`}
                          aria-haspopup="menu"
                          aria-expanded={parkuserOpen}
                          onClick={() => setParkuserOpen((v) => !v)}
                        >
                          <span className="block whitespace-nowrap">
                            {copy.nav[link.key]}
                          </span>
                          <ChevronDownIcon open={parkuserOpen} />
                        </button>

                        <div
                          className={`absolute left-1/2 top-full z-[60] mt-2 w-[250px] -translate-x-1/2 rounded-2xl border border-[#CFE2FA]/75 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-sm transition ${
                            parkuserOpen
                              ? "pointer-events-auto opacity-100 translate-y-0"
                              : "pointer-events-none opacity-0 -translate-y-1"
                          }`}
                          role="menu"
                        >
                          {parkuserLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm transition ${
                                isLinkActive(item.href)
                                  ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                  : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                              }`}
                              onClick={() => setParkuserOpen(false)}
                            >
                              <span>{item.label}</span>
                              <span className="shrink-0 opacity-80">
                                <ArrowRightIcon />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.key}
                      href={resolveLinkHref(link.href)}
                      className={`inline-flex h-11 items-center justify-center border-b-2 px-4 text-[1.02rem] font-semibold transition ${
                        isActive
                          ? "border-[#0088FF] text-[#0078E0]"
                          : "border-transparent text-slate-900 hover:text-[#0078E0]"
                      }`}
                    >
                      <span className="block whitespace-nowrap">
                        {copy.nav[link.key]}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
              <div className="inline-flex items-center rounded-full border border-[#CFE2FA] bg-white/90 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    language === "en"
                      ? "bg-[#0088FF] text-white shadow-[0_8px_18px_rgba(0,136,255,0.28)]"
                      : "text-slate-700 hover:text-[#0078E0]"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("ar")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    language === "ar"
                      ? "bg-[#0088FF] text-white shadow-[0_8px_18px_rgba(0,136,255,0.28)]"
                      : "text-slate-700 hover:text-[#0078E0]"
                  }`}
                >
                  AR
                </button>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0088FF] hover:brightness-95 active:bg-[#0088FF] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md"
              >
                {copy.cta}
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
                {copy.cta}
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
            menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
            <div className="flex items-center justify-between rounded-lg border border-[#CFE2FA] bg-[rgba(0,136,255,0.04)] px-3 py-2.5">
              <span className="text-sm font-medium text-slate-700">{copy.language}</span>
              <div className="inline-flex items-center rounded-full border border-[#CFE2FA] bg-white p-1">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    language === "en"
                      ? "bg-[#0088FF] text-white shadow-[0_8px_18px_rgba(0,136,255,0.28)]"
                      : "text-slate-700 hover:text-[#0078E0]"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("ar")}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    language === "ar"
                      ? "bg-[#0088FF] text-white shadow-[0_8px_18px_rgba(0,136,255,0.28)]"
                      : "text-slate-700 hover:text-[#0078E0]"
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-3 text-[1.03rem] font-medium text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] rounded-lg"
            >
              <SearchIcon />
              {copy.search}
            </button>
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              if (link.dropdownType === "services") {
                return (
                  <div key={link.key} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-[1.03rem] font-medium transition ${
                        isActive || mobileServicesOpen
                          ? "bg-[rgba(0,136,255,0.12)] text-[#0078E0]"
                          : "text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)]"
                      }`}
                    >
                      <span>{copy.nav[link.key]}</span>
                      <ChevronDownIcon open={mobileServicesOpen} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        mobileServicesOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="mt-1 space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-2">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                            className={`flex items-center justify-between rounded-md px-3 py-3 text-sm transition ${
                              pathname === service.href
                                ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                            }`}
                          >
                            <span>{service.label}</span>
                            <span className="shrink-0 opacity-80">
                              <ArrowRightIcon />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.dropdownType === "parkuser") {
                const parkuserActive = pathname === "/app";
                return (
                  <div key={link.key} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => setMobileParkuserOpen((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-[1.03rem] font-medium transition ${
                        parkuserActive || mobileParkuserOpen
                          ? "bg-[rgba(0,136,255,0.12)] text-[#0078E0]"
                          : "text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)]"
                      }`}
                    >
                      <span>{copy.nav[link.key]}</span>
                      <ChevronDownIcon open={mobileParkuserOpen} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        mobileParkuserOpen ? "max-h-[240px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="mt-1 space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-2">
                        {parkuserLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setMobileParkuserOpen(false);
                            }}
                            className={`flex items-center justify-between rounded-md px-3 py-3 text-sm transition ${
                              isLinkActive(item.href)
                                ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className="shrink-0 opacity-80">
                              <ArrowRightIcon />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={resolveLinkHref(link.href)}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center rounded-lg px-3 py-3 text-[1.03rem] font-medium transition ${
                    isActive
                      ? "bg-[rgba(0,136,255,0.12)] text-[#0078E0]"
                      : "text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)]"
                  }`}
                >
                  {copy.nav[link.key]}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-[78px]" />
    </>
  );
}
