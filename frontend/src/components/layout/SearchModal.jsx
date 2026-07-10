"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search, X, ArrowRight, MapPin, Layers, Zap, Car } from "lucide-react";
import { fetchPage } from "@/lib/cms";

// ─── Static search index ────────────────────────────────────────────────────
const SEARCH_INDEX = [
  // Pages
  { type: "Page", label: "Home",              href: "/",           keywords: "home landing parking halapark" },
  { type: "Page", label: "Services",          href: "/services",   keywords: "services parking solutions features" },
  { type: "Page", label: "Solutions",         href: "/solutions",  keywords: "solutions enterprise smart city integration" },
  { type: "Page", label: "Business",          href: "/business",   keywords: "business partner operator property owner" },
  { type: "Page", label: "About Us",          href: "/about",      keywords: "about halapark company history team" },
  { type: "Page", label: "Careers",           href: "/careers",    keywords: "careers jobs hiring valet operator" },
  { type: "Page", label: "FAQs",             href: "/faqs",       keywords: "faq questions help support answers" },
  { type: "Page", label: "Contact",           href: "/contact",    keywords: "contact us get in touch support" },
  { type: "Page", label: "App",               href: "/app",        keywords: "app download mobile ios android" },

  // Services
  { type: "Service", label: "Smart Public Parking",                href: "/services?open=smart-public-parking",       keywords: "smart public parking book reserve digital cashless" },
  { type: "Service", label: "Private Parking Rental",             href: "/services?open=private-parking-rental",     keywords: "private rental monthly lease tenant" },
  { type: "Service", label: "EV Charging",                        href: "/services?open=ev-charging",                keywords: "ev electric vehicle charging station" },
  { type: "Service", label: "Valet On Demand",                    href: "/services?open=valet-on-demand",            keywords: "valet on demand premium drop off" },
  { type: "Service", label: "Barrier-Free Parking",               href: "/services?open=barrier-free-parking",       keywords: "barrier free anpr automatic entry exit" },
  { type: "Service", label: "Parking Management",                 href: "/services?open=parking-management",         keywords: "parking management operator dashboard analytics" },
  { type: "Service", label: "Airport Services",                   href: "/services?open=Airport%20Services",          keywords: "airport parking terminal transfer" },
  { type: "Service", label: "Car Wash Services",                  href: "/services?open=Car%20Wash%20Services%20(Interior%20%26%20Exterior)", keywords: "car wash clean interior exterior detailing" },
  { type: "Service", label: "Air Tyre Service",                   href: "/services?open=Air%20Tyre%20Service",        keywords: "air tyre tires inflation service" },
  { type: "Service", label: "Battery Replacement Service",        href: "/services?open=Battery%20Replacement%20Service", keywords: "battery replacement jump start car" },

  // Solutions are NOT hardcoded here — they're loaded live from the CMS at
  // runtime (see SOLUTIONS fetch below) so search never shows deleted/static
  // solutions or 404 links.

  // Locations
  { type: "Location", label: "Dubai Media City — HQ",       href: "/contact",  keywords: "dubai media city concord tower hq headquarters" },
  { type: "Location", label: "Business Bay",                 href: "/contact",  keywords: "business bay dubai tower" },
  { type: "Location", label: "Dubai Mall",                   href: "/contact",  keywords: "dubai mall parking downtown" },
  { type: "Location", label: "DIFC — Gate District",         href: "/contact",  keywords: "difc gate district financial centre dubai" },
  { type: "Location", label: "Dubai Marina",                 href: "/contact",  keywords: "dubai marina deck parking" },
  { type: "Location", label: "JBR Beachfront",               href: "/contact",  keywords: "jbr jumeirah beach residence beachfront" },
  { type: "Location", label: "Mall of the Emirates",         href: "/contact",  keywords: "mall of the emirates moe dubai" },
  { type: "Location", label: "Deira City Centre",            href: "/contact",  keywords: "deira city centre dubai" },
  { type: "Location", label: "DXB Airport",                  href: "/contact",  keywords: "dubai international airport dxb terminal" },
  { type: "Location", label: "Palm Jumeirah",                href: "/contact",  keywords: "palm jumeirah crescent dubai" },
  { type: "Location", label: "Abu Dhabi",                    href: "/contact",  keywords: "abu dhabi uae capital parking" },
  { type: "Location", label: "Sharjah",                      href: "/contact",  keywords: "sharjah uae parking public" },
  { type: "Location", label: "Ajman",                        href: "/contact",  keywords: "ajman uae parking" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  Page:     { icon: Layers,   color: "text-slate-500",  bg: "bg-slate-100" },
  Service:  { icon: Car,      color: "text-[#0088FF]",  bg: "bg-[#EEF6FF]" },
  Solution: { icon: Zap,      color: "text-purple-600", bg: "bg-purple-50" },
  Location: { icon: MapPin,   color: "text-emerald-600",bg: "bg-emerald-50" },
};

function score(item, query) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const label = item.label.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  if (label === q) return 100;
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
        .map((c) => ({ slug: (c?.slug || "").trim(), label: (c?.title || "").trim(), keywords: (c?.description || "").trim() }))
        .filter((c) => c.slug && c.label && detailSlugs.has(c.slug))
        .map((c) => ({ type: "Solution", label: c.label, href: `/solutions/${c.slug}`, keywords: `${c.label} ${c.keywords}`.toLowerCase() }));
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
                placeholder="Search services, solutions, locations…"
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
                  Popular
                </p>
              )}

              {isEmpty ? (
                <div className="px-4 py-8 text-center text-sm text-slate-400">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                displayItems.map((item, i) => {
                  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.Page;
                  const Icon = cfg.icon;
                  const isActive = query.trim() && i === activeIndex;
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
                        <p className="truncate text-[0.88rem] font-medium text-[#050A13]">{item.label}</p>
                        <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${cfg.color}`}>{item.type}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                    </Link>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd> navigate</span>
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">↵</kbd> open</span>
                <span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px]">esc</kbd> close</span>
              </div>
              <span className="text-[10px] text-slate-300">HalaPark Search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
