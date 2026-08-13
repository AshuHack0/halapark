"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowRight, MapPin, Layers, Zap, Car } from "lucide-react";
import { fetchPage } from "@/lib/cms";
import { useLanguage } from "@/context/LanguageContext";

// ─── Static search index ────────────────────────────────────────────────────
// `ar` is the Arabic display label; search matches against label + ar + keywords
// in BOTH languages so Arabic queries work everywhere.
const SEARCH_INDEX = [
  // Pages
  { type: "Page", label: "Home",     ar: "الرئيسية",        href: "/",          keywords: "home landing parking halapark" },
  { type: "Page", label: "Services", ar: "الخدمات",         href: "/services",  keywords: "services parking solutions features" },
  { type: "Page", label: "Solutions", ar: "الحلول",         href: "/solutions", keywords: "solutions enterprise smart city integration" },
  { type: "Page", label: "Business", ar: "الأعمال",         href: "/business",  keywords: "business partner operator property owner" },
  { type: "Page", label: "About Us", ar: "من نحن",          href: "/about",     keywords: "about halapark company history team" },
  { type: "Page", label: "Careers",  ar: "الوظائف",         href: "/careers",   keywords: "careers jobs hiring valet operator" },
  { type: "Page", label: "FAQs",     ar: "الأسئلة الشائعة", href: "/faqs",      keywords: "faq questions help support answers" },
  { type: "Page", label: "Contact",  ar: "اتصل بنا",        href: "/contact",   keywords: "contact us get in touch support" },
  { type: "Page", label: "App",      ar: "التطبيق",         href: "/app",       keywords: "app download mobile ios android" },

  // Services
  { type: "Service", label: "Smart Public Parking",         ar: "مواقف عامة ذكية",              href: "/services?open=smart-public-parking",   keywords: "smart public parking book reserve digital cashless" },
  { type: "Service", label: "Private Parking Rental",       ar: "تأجير مواقف خاصة",             href: "/services?open=private-parking-rental", keywords: "private rental monthly lease tenant" },
  { type: "Service", label: "EV Charging",                  ar: "شحن السيارات الكهربائية",      href: "/services?open=ev-charging",            keywords: "ev electric vehicle charging station" },
  { type: "Service", label: "Valet On Demand",              ar: "خدمة صف السيارات عند الطلب",   href: "/services?open=valet-on-demand",        keywords: "valet on demand premium drop off" },
  { type: "Service", label: "Barrier-Free Parking",         ar: "مواقف بدون حواجز",             href: "/services?open=barrier-free-parking",   keywords: "barrier free anpr automatic entry exit" },
  { type: "Service", label: "Parking Management",           ar: "إدارة المواقف",                href: "/services?open=parking-management",     keywords: "parking management operator dashboard analytics" },
  { type: "Service", label: "Airport Services",             ar: "خدمات المطار",                 href: "/services?open=Airport%20Services",     keywords: "airport parking terminal transfer" },
  { type: "Service", label: "Car Wash Services",            ar: "خدمات غسيل السيارات",          href: "/services?open=Car%20Wash%20Services%20(Interior%20%26%20Exterior)", keywords: "car wash clean interior exterior detailing" },
  { type: "Service", label: "Air Tyre Service",             ar: "خدمة نفخ الإطارات",            href: "/services?open=Air%20Tyre%20Service",   keywords: "air tyre tires inflation service" },
  { type: "Service", label: "Battery Replacement Service",  ar: "خدمة استبدال البطارية",        href: "/services?open=Battery%20Replacement%20Service", keywords: "battery replacement jump start car" },

  // Solutions are NOT hardcoded here — they're loaded live from the CMS at
  // runtime (see SOLUTIONS fetch below) so search never shows deleted/static
  // solutions or 404 links.

  // Locations
  { type: "Location", label: "Dubai Media City — HQ", ar: "مدينة دبي للإعلام — المقر الرئيسي", href: "/contact", keywords: "dubai media city concord tower hq headquarters" },
  { type: "Location", label: "Business Bay",          ar: "الخليج التجاري",       href: "/contact", keywords: "business bay dubai tower" },
  { type: "Location", label: "Dubai Mall",            ar: "دبي مول",              href: "/contact", keywords: "dubai mall parking downtown" },
  { type: "Location", label: "DIFC — Gate District",  ar: "مركز دبي المالي العالمي", href: "/contact", keywords: "difc gate district financial centre dubai" },
  { type: "Location", label: "Dubai Marina",          ar: "دبي مارينا",           href: "/contact", keywords: "dubai marina deck parking" },
  { type: "Location", label: "JBR Beachfront",        ar: "شاطئ جي بي آر",        href: "/contact", keywords: "jbr jumeirah beach residence beachfront" },
  { type: "Location", label: "Mall of the Emirates",  ar: "مول الإمارات",         href: "/contact", keywords: "mall of the emirates moe dubai" },
  { type: "Location", label: "Deira City Centre",     ar: "ديرة سيتي سنتر",       href: "/contact", keywords: "deira city centre dubai" },
  { type: "Location", label: "DXB Airport",           ar: "مطار دبي الدولي",      href: "/contact", keywords: "dubai international airport dxb terminal" },
  { type: "Location", label: "Palm Jumeirah",         ar: "نخلة جميرا",           href: "/contact", keywords: "palm jumeirah crescent dubai" },
  { type: "Location", label: "Abu Dhabi",             ar: "أبوظبي",               href: "/contact", keywords: "abu dhabi uae capital parking" },
  { type: "Location", label: "Sharjah",               ar: "الشارقة",              href: "/contact", keywords: "sharjah uae parking public" },
  { type: "Location", label: "Ajman",                 ar: "عجمان",                href: "/contact", keywords: "ajman uae parking" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  Page:     { icon: Layers,   color: "text-slate-500",  bg: "bg-slate-100",  ar: "صفحة" },
  Service:  { icon: Car,      color: "text-[#0088FF]",  bg: "bg-[#EEF6FF]",  ar: "خدمة" },
  Solution: { icon: Zap,      color: "text-purple-600", bg: "bg-purple-50",  ar: "حل" },
  Location: { icon: MapPin,   color: "text-emerald-600",bg: "bg-emerald-50", ar: "موقع" },
};

// Modal UI strings (chrome only — item labels come from the index/CMS).
const UI_TEXT = {
  placeholder: { en: "Search services, solutions, locations…", ar: "ابحث عن الخدمات والحلول والمواقع…" },
  popular:     { en: "Popular", ar: "الأكثر بحثًا" },
  noResults:   { en: "No results for", ar: "لا توجد نتائج عن" },
  navigate:    { en: "navigate", ar: "تنقّل" },
  open:        { en: "open", ar: "فتح" },
  close:       { en: "close", ar: "إغلاق" },
  brand:       { en: "HalaPark Search", ar: "بحث هالا بارك" },
};

function score(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  // Match against English label, Arabic label and keywords — so the same index
  // works for queries typed in either language.
  const label = `${item.label} ${item.ar ?? ""}`.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  if (item.label.toLowerCase() === q || (item.ar ?? "").toLowerCase() === q) return 100;
  if (label.startsWith(q)) return 80;
  if (label.includes(q)) return 60;
  if (keywords.includes(q)) return 40;
  // word-by-word partial match
  const words = q.split(/\s+/);
  const matched = words.filter((w) => label.includes(w) || keywords.includes(w));
  if (matched.length) return (matched.length / words.length) * 30;
  return 0;
}

function search(query, index) {
  if (!query.trim()) return [];
  return index
    .map((item) => ({ ...item, _score: score(item, query) }))
    .filter((item) => item._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SearchModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const ut = (key) => UI_TEXT[key]?.[isAr ? "ar" : "en"] ?? "";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Live CMS solutions — no hardcoded solution list. Only solutions with a real
  // detail page are searchable, so search never leads to a 404 or static page.
  const [cmsSolutions, setCmsSolutions] = useState([]);
  const inputRef = useRef(null);

  // Load solutions from the CMS once (when the modal first opens).
  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetchPage("solutions").then((page) => {
      if (!active) return;
      const s = page?.sections?.solutions ?? {};
      const detailSlugs = new Set(
        (Array.isArray(page?.sections?.details) ? page.sections.details : [])
          .map((d) => (d?.slug || "").trim())
          .filter(Boolean),
      );
      const cards = Array.isArray(s.cards) ? s.cards : [];
      const items = cards
        .map((c) => ({
          slug: (c?.slug || "").trim(),
          label: (c?.title || "").trim(),
          // Arabic title for AR display + search (falls back to EN label —
          // search results are navigation links, never blanked).
          ar: (c?.ar?.title || "").trim(),
          keywords: (c?.description || "").trim(),
        }))
        .filter((c) => c.slug && c.label && detailSlugs.has(c.slug))
        .map((c) => ({
          type: "Solution",
          label: c.label,
          ar: c.ar,
          href: `/solutions/${c.slug}`,
          keywords: `${c.label} ${c.keywords}`.toLowerCase(),
        }));
      setCmsSolutions(items);
    });
    return () => { active = false; };
  }, [isOpen]);

  // Full searchable index = static pages/services/locations + live solutions.
  const searchIndex = useMemo(() => [...SEARCH_INDEX, ...cmsSolutions], [cmsSolutions]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  function handleQuery(e) {
    const q = e.target.value;
    setQuery(q);
    const res = search(q, searchIndex);
    setResults(res);
    setActiveIndex(0);
  }

  function handleKeyDown(e) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      onClose();
      window.location.href = results[activeIndex].href;
    }
  }

  // Popular defaults when query is empty
  const defaultItems = SEARCH_INDEX.filter((r) =>
    ["Smart Public Parking", "Valet On Demand", "EV Charging", "Solutions", "FAQs", "Dubai Marina"].includes(r.label)
  );

  const displayItems = query.trim() ? results : defaultItems;
  const isEmpty = query.trim() && results.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[10vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            dir={isAr ? "rtl" : "ltr"}
            className="relative z-10 w-full max-w-[620px] overflow-hidden rounded-[20px] bg-white shadow-[0_32px_80px_rgba(2,6,23,0.28),0_4px_16px_rgba(2,6,23,0.1)]"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-[#0088FF]" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={handleQuery}
                onKeyDown={handleKeyDown}
                placeholder={ut("placeholder")}
                className="flex-1 bg-transparent text-[0.94rem] text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Results / defaults */}
            <div className="max-h-[380px] overflow-y-auto overscroll-contain py-2">
              {!query.trim() && (
                <p className="px-4 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {ut("popular")}
                </p>
              )}

              {isEmpty ? (
                <div className="px-4 py-8 text-center text-sm text-slate-400">
                  {ut("noResults")} &ldquo;{query}&rdquo;
                </div>
              ) : (
                displayItems.map((item, i) => {
                  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.Page;
                  const Icon = cfg.icon;
                  const isActive = query.trim() && i === activeIndex;
                  // Arabic label with English fallback — results are links,
                  // an untranslated one must never disappear.
                  const label = isAr ? (item.ar || item.label) : item.label;
                  const typeLabel = isAr ? cfg.ar : item.type;
                  return (
                    <Link
                      key={`${item.type}-${item.label}`}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        isActive ? "bg-[#F4F8FF]" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${cfg.bg}`}>
                        <Icon className={`h-4 w-4 ${cfg.color}`} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.88rem] font-medium text-[#050A13]">{label}</p>
                        <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${cfg.color}`}>{typeLabel}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300 rtl:rotate-180" />
                    </Link>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd> {ut("navigate")}</span>
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">↵</kbd> {ut("open")}</span>
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">esc</kbd> {ut("close")}</span>
              </div>
              <span className="text-[10px] text-slate-300">{ut("brand")}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
