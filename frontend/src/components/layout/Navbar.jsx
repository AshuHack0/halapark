"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesData } from "@/modules/home/servicesData";
import { fetchPage } from "@/lib/cms";
import { useLanguage } from "@/context/LanguageContext";
import SearchModal from "@/components/layout/SearchModal";

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
  { href: "/app", key: "app" },
  { href: "/services", key: "services" },
  { href: "/solutions", key: "solutions", hasDropdown: "solutions" },
  { href: "/business", key: "business" },
  { href: "/about", key: "aboutUs" },
  { href: "/faqs", key: "faqs" },
  { href: "/careers", key: "careers" },
];

const SUPPORTED_LANGUAGES = ["en", "ar"];
const UI_TEXT = {
  en: {
    nav: {
      home: "Home",
      app: "App",
      services: "Services",
      solutions: "Solutions",
      business: "Business",
      aboutUs: "About Us",
      faqs: "FAQs",
      careers: "Careers",
    },
    cta: "Get In Touch",
    search: "Search",
    language: "Language",
  },
  ar: {
    nav: {
      home: "الرئيسية",
      app: "التطبيق",
      services: "الخدمات",
      solutions: "الحلول",
      business: "الأعمال",
      aboutUs: "من نحن",
      faqs: "الأسئلة الشائعة",
      careers: "الوظائف",
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

export default function Navbar() {
  const DROPDOWN_CLOSE_DELAY_MS = 220;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // Which solutions group is expanded in the dropdown (desktop hover, mobile tap).
  const [activeGroup, setActiveGroup] = useState(null);
  const [mobileActiveGroup, setMobileActiveGroup] = useState(null);
  // Raw Solutions CMS data (cards + group order + Arabic group names). The
  // labelled/grouped structure is derived at render time so it follows the
  // active language. Empty when the admin has no solutions.
  const [solutionsData, setSolutionsData] = useState(null);
  // Site logo from global Settings (falls back to the bundled asset).
  const [logo, setLogo] = useState({ image: "/logo-blue-11.svg", alt: "HalaPark" });

  useEffect(() => {
    fetchPage("solutions").then((page) => {
      setSolutionsData(page?.sections?.solutions ?? null);
    });
    fetchPage("settings").then((page) => {
      const l = page?.sections?.logo;
      if (l?.image) setLogo({ image: l.image, alt: l.alt || "HalaPark" });
    });
  }, []);
  const { language, setLanguage, isArabic } = useLanguage();

  // Build the dropdown groups in the active language. Card label → Arabic
  // `ar.name`/`ar.title` in AR (blank when missing). Group name → the parallel
  // `solutions.ar.groups` entry by index, falling back to the English name.
  const solutionGroups = (() => {
    const sol = solutionsData;
    const cards = Array.isArray(sol?.cards) ? sol.cards.filter((c) => c && c.slug) : [];
    if (cards.length === 0) return [];

    const enGroups = Array.isArray(sol?.groups) ? [...sol.groups] : [];
    const arGroups = Array.isArray(sol?.ar?.groups) ? sol.ar.groups : [];
    const order = [...enGroups];
    cards.forEach((c) => {
      if (c.group && !order.includes(c.group)) order.push(c.group);
    });

    // Translate a group name: in AR, use the parallel ar.groups entry (by the
    // group's index in the English list); fall back to the English name.
    const groupLabel = (g) => {
      if (language !== "ar") return g;
      const i = enGroups.indexOf(g);
      return (i >= 0 && arGroups[i]) || g;
    };
    // Card label: Arabic name in AR (ar.name → ar.title), else English.
    const cardLabel = (c) =>
      language === "ar"
        ? (c.ar?.name || c.ar?.title || c.name || c.title || c.slug)
        : (c.name || c.title || c.slug);

    const grouped = order
      .map((g) => ({
        group: groupLabel(g),
        links: cards
          .filter((c) => (c.group || "") === g)
          .map((c) => ({ href: `/solutions/${c.slug}`, label: cardLabel(c) })),
      }))
      .filter((g) => g.links.length > 0);

    const ungrouped = cards.filter((c) => !c.group);
    if (ungrouped.length > 0) {
      grouped.push({
        group: language === "ar" ? "الحلول" : "Solutions",
        links: ungrouped.map((c) => ({ href: `/solutions/${c.slug}`, label: cardLabel(c) })),
      });
    }
    return grouped;
  })();
  const [hash, setHash] = useState("");
  const copy = UI_TEXT[language];
  const servicesMenuRef = useRef(null);
  const servicesCloseTimerRef = useRef(null);
  const serviceLinks = servicesData.map((service) => ({
    href: `/services?open=${encodeURIComponent(service.slug)}`,
    label: isArabic ? (SERVICE_LABELS_AR[service.slug] || service.name) : service.name,
  }));
  // A dropdown nav item can be of type "services" or "solutions". Services uses a
  // flat `links` list; solutions uses grouped `groups`.
  const dropdownConfig = {
    services: { viewAllHref: "/services", viewAllLabel: "View All Services", links: serviceLinks },
    solutions: { viewAllHref: "/solutions", viewAllLabel: "View All Solutions", groups: solutionGroups },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncHash = () => {
      setHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      if (servicesCloseTimerRef.current) {
        window.clearTimeout(servicesCloseTimerRef.current);
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
      setActiveGroup(null);
      servicesCloseTimerRef.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  const handleLanguageChange = (nextLanguage) => {
    if (nextLanguage === language || !SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      return;
    }
    // Shared context updates language + dir + storage; sections re-render via t().
    setLanguage(nextLanguage);
  };

  const resolveLinkHref = (href) => (href.startsWith("#") ? `/${href}` : href);
  const isLinkActive = (href) => {
    if (href === "/services") {
      return pathname.startsWith("/services");
    }
    if (href === "/solutions") {
      return pathname.startsWith("/solutions");
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.image}
                alt={logo.alt}
                className="sm:h-12 h-7 w-auto"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);

                  if (link.hasDropdown) {
                    const dd = dropdownConfig[link.hasDropdown];

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
                          data-lenis-prevent
                          className={`absolute left-1/2 top-full z-[60] mt-2 max-h-[72vh] -translate-x-1/2 overflow-hidden overscroll-contain rounded-2xl border border-[#CFE2FA]/75 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-sm transition ${
                            dd.groups ? "w-[680px]" : "w-[320px]"
                          } ${
                            servicesOpen
                              ? "pointer-events-auto opacity-100 translate-y-0"
                              : "pointer-events-none opacity-0 -translate-y-1"
                          }`}
                          role="menu"
                        >
                          <Link
                            href={dd.viewAllHref}
                            className="flex items-center justify-between rounded-xl bg-[rgba(0,136,255,0.06)] px-3 py-3 text-sm font-semibold text-[#0078E0] mb-1 transition hover:bg-[rgba(0,136,255,0.12)]"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span>{dd.viewAllLabel}</span>
                            <span className="shrink-0 opacity-80"><ArrowRightIcon /></span>
                          </Link>
                          <div className="my-1 border-t border-slate-100" />

                          {dd.groups ? (
                            (() => {
                              // Two-pane: group list (left) + selected group's items (right).
                              const selected = dd.groups.find((g) => g.group === activeGroup) ?? dd.groups[0];
                              return (
                                <div className="flex gap-1">
                                  {/* LEFT: group names */}
                                  <div className="w-[44%] shrink-0 border-r border-slate-100 pr-1">
                                    {dd.groups.map((grp) => {
                                      const isSel = selected?.group === grp.group;
                                      return (
                                        <button
                                          key={grp.group}
                                          type="button"
                                          onMouseEnter={() => setActiveGroup(grp.group)}
                                          onFocus={() => setActiveGroup(grp.group)}
                                          onClick={() => setActiveGroup(grp.group)}
                                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-[12px] font-semibold transition ${
                                            isSel
                                              ? "bg-[rgba(0,136,255,0.10)] text-[#0078E0]"
                                              : "text-slate-700 hover:bg-[rgba(0,136,255,0.06)] hover:text-[#0078E0]"
                                          }`}
                                          aria-current={isSel}
                                        >
                                          <span className="leading-snug">{grp.group}</span>
                                          <span className={`shrink-0 opacity-70 transition-transform ${isSel ? "translate-x-0.5" : ""}`}>
                                            <ArrowRightIcon />
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* RIGHT: selected group's items */}
                                  <div className="min-w-0 flex-1 pl-1.5">
                                    <p className="px-3 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0088FF]">
                                      {selected?.group}
                                    </p>
                                    <div className="max-h-[58vh] overflow-y-auto overscroll-contain">
                                      {selected?.links.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition ${
                                            pathname === item.href
                                              ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                              : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                                          }`}
                                          onClick={() => setServicesOpen(false)}
                                        >
                                          <span className="leading-snug">{item.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            dd.links.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm transition ${
                                  pathname === item.href
                                    ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                    : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                                }`}
                                onClick={() => setServicesOpen(false)}
                              >
                                <span>{item.label}</span>
                                <span className="shrink-0 opacity-80">
                                  <ArrowRightIcon />
                                </span>
                              </Link>
                            ))
                          )}
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
                onClick={() => setSearchOpen(true)}
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
              onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
              className="w-full flex items-center gap-2 px-3 py-3 text-[1.03rem] font-medium text-gray-700 hover:text-[#0088FF] hover:bg-[rgba(0,136,255,0.08)] rounded-lg"
            >
              <SearchIcon />
              {copy.search}
            </button>
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              if (link.hasDropdown) {
                const dd = dropdownConfig[link.hasDropdown];

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
                        mobileServicesOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div data-lenis-prevent className="mt-1 space-y-1 overflow-y-auto overscroll-contain rounded-lg border border-slate-200 bg-slate-50 p-2 max-h-[500px]">
                        <Link
                          href={dd.viewAllHref}
                          onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                          className="flex items-center justify-between rounded-md bg-[rgba(0,136,255,0.08)] px-3 py-3 text-sm font-semibold text-[#0078E0] transition hover:bg-[rgba(0,136,255,0.14)]"
                        >
                          <span>{dd.viewAllLabel}</span>
                          <span className="shrink-0 opacity-80"><ArrowRightIcon /></span>
                        </Link>
                        <div className="border-t border-slate-200 my-1" />
                        {dd.groups
                          ? dd.groups.map((grp) => {
                              const isExpanded = mobileActiveGroup === grp.group;
                              return (
                                <div key={grp.group} className="pt-0.5">
                                  {/* Group heading — tap to reveal sub-items */}
                                  <button
                                    type="button"
                                    onClick={() => setMobileActiveGroup((g) => (g === grp.group ? null : grp.group))}
                                    className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                                      isExpanded ? "bg-[rgba(0,136,255,0.08)] text-[#0078E0]" : "text-[#0088FF]"
                                    }`}
                                    aria-expanded={isExpanded}
                                  >
                                    <span>{grp.group}</span>
                                    <span className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                                      <ChevronDownIcon open={isExpanded} />
                                    </span>
                                  </button>
                                  <div
                                    className={`overflow-hidden transition-all duration-200 ease-out ${
                                      isExpanded ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                  >
                                    <div className="pb-1 pl-1.5">
                                      {grp.links.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                                          className={`flex items-center rounded-md px-3 py-2 text-[13px] transition ${
                                            pathname === item.href
                                              ? "bg-[rgba(0,136,255,0.12)] font-semibold text-[#0078E0]"
                                              : "text-slate-700 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0078E0]"
                                          }`}
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : dd.links.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                                className={`flex items-center justify-between rounded-md px-3 py-3 text-sm transition ${
                                  pathname === item.href
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

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
