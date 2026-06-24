"use client";

import { useState, useRef, useLayoutEffect, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/config/recaptcha.site";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  X, ArrowUpRight, Check, Shield, Camera, BadgeCheck,
  CreditCard, Lock, ChevronRight, ChevronDown, MapPin, Clock, ParkingCircle, ArrowRight, Zap, Search,
} from "lucide-react";
import { allServicesData, serviceNames } from "./allServicesData";
import { fetchPage } from "@/lib/cms";
import { useLanguage, t, ui } from "@/context/LanguageContext";
// import GoodLookingServiceHero from "./GoodLookingServiceHero"; // OLD dark hero (looked like home page) — replaced by the light HeroSection below

/* ─── Springs & easing ─── */
const springPop  = { type: "spring", stiffness: 380, damping: 24, mass: 0.85 };
const springSoft = { type: "spring", stiffness: 120, damping: 20 };
const ease       = [0.22, 1, 0.36, 1];

/* ═══════════════════════════ SERVICE MODAL ══════════════════════════ */

function ServiceModal({ service, onClose }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [service]);

  useLayoutEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!service || !mounted) return null;

  const includedLabel = t(service, "includedLabel", language) || "";
  const subCategoriesLabel =
    service.subCategoriesLabel || "";
  const normalizedSubCategories = (service.subCategories || []).map((cat) =>
    typeof cat === "string" ? { title: cat, description: null } : cat,
  );
  const hasDetailedSubCategories = normalizedSubCategories.some(
    (cat) => cat.description,
  );

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="svc-modal-bg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          key="svc-modal-panel"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
          data-lenis-prevent-wheel
          className="relative z-10 flex h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom)))] max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom)))] w-full flex-col overflow-hidden rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] sm:max-w-[640px] sm:rounded-[28px]"
        >
          {/* Drag handle — mobile only */}
          <div className="flex shrink-0 justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          {/* Media */}
          <div className="relative h-36 w-full shrink-0 overflow-hidden bg-[#d2dae2] sm:h-48">
            {service.mediaType === "video" ? (
              <video
                src={service.mediaSrc}
                autoPlay={!reduced}
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={service.mediaSrc}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06111f]/50 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/28 text-white backdrop-blur-sm transition hover:bg-black/48"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-4">
              <span className="rounded-full bg-[#0088FF] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-[0_4px_14px_rgba(0,136,255,0.35)]">
                Service {String(service.id).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Scrollable body — lenis-prevent so Mac trackpad scroll works inside modal */}
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 [-webkit-overflow-scrolling:touch] sm:px-8 sm:py-5"
          >
            <h2 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-[#050A13] sm:text-[1.85rem]">
              {t(service, "name", language)}
            </h2>
            <p className="mt-2 text-[0.8rem] leading-6 text-slate-500 sm:mt-3 sm:text-[0.94rem] sm:leading-7">
              {t(service, "fullDesc", language)}
            </p>

            {service.whatsIncluded?.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {includedLabel}
                </p>
                <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2.5">
                  {service.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-5 sm:w-5">
                        <Check className="h-2.5 w-2.5 text-[#0088FF] sm:h-3 sm:w-3" />
                      </span>
                      <span className="text-[0.78rem] leading-5 text-slate-700 sm:text-[0.84rem] sm:leading-6">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {normalizedSubCategories.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {subCategoriesLabel}
                </p>
                {hasDetailedSubCategories ? (
                  <ul className="mt-2 space-y-3 sm:mt-3 sm:space-y-4">
                    {normalizedSubCategories.map((cat) => (
                      <li
                        key={cat.title}
                        className="rounded-xl border border-[rgba(0,136,255,0.12)] bg-[#f8fbff] p-3 sm:p-4"
                      >
                        <p className="text-[0.82rem] font-semibold text-[#050A13] sm:text-sm">
                          {cat.title}
                        </p>
                        {cat.description ? (
                          <p className="mt-1.5 text-[0.78rem] leading-5 text-slate-600 sm:text-[0.84rem] sm:leading-6">
                            {cat.description}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {normalizedSubCategories.map((cat) => (
                      <span
                        key={cat.title}
                        className="rounded-full border border-[rgba(0,136,255,0.2)] bg-[rgba(0,136,255,0.06)] px-2.5 py-1 text-[11px] font-medium text-[#0078E0] sm:px-3 sm:py-1.5 sm:text-xs"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {service.packages?.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Packages
                </p>
                <div className="mt-2 space-y-2 sm:mt-3 sm:space-y-3">
                  {service.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="rounded-xl border border-[rgba(0,136,255,0.14)] bg-[#f4f9ff] p-3 sm:rounded-2xl sm:p-4"
                    >
                      <p className="text-sm font-semibold text-[#050A13]">
                        {pkg.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                        {pkg.desc}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {pkg.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[11px] text-slate-600 sm:text-xs"
                          >
                            <Check className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 text-[#0088FF]" />
                            <span className="leading-5">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-1 shrink-0" aria-hidden />
          </div>

          {/* CTA — fixed footer, never shrinks */}
          <div className="shrink-0 border-t border-slate-100 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-2.5 px-4 pt-3 pb-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:gap-3 sm:px-8 sm:py-4 sm:pb-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-[#0088FF] px-5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,136,255,0.28)] transition hover:brightness-95 sm:h-12 sm:min-w-[200px] sm:flex-1 sm:px-7"
              >
                Book the Service
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 sm:h-12 sm:w-auto sm:min-w-[120px] sm:px-6"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/* ═══════════════════════════ QUOTE MODAL ════════════════════════════ */

const BLANK_FORM = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  tower: "",
  slots: "",
};

function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState(BLANK_FORM);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const recaptchaRef = useRef(null);

  const filteredServices = serviceNames.filter((s) =>
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  useLayoutEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useLayoutEffect(() => {
    const fn = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  // Phone field: only allow digits, +, spaces, hyphens, parentheses.
  const onPhoneChange = (e) => {
    const filtered = e.target.value.replace(/[^\d+\s\-().]/g, "");
    setForm((p) => ({ ...p, phone: filtered }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "A valid email is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (/[a-zA-Z]/.test(form.phone)) return "Phone number must not contain letters.";
    if (!form.service) return "Please select a service.";
    return null;
  };

  const handleClose = () => {
    setForm(BLANK_FORM);
    setDone(false);
    setFormError("");
    setSubmitting(false);
    recaptchaRef.current?.reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const validationError = validate();
    if (validationError) { setFormError(validationError); return; }

    if (!RECAPTCHA_SITE_KEY) {
      setFormError("reCAPTCHA is not configured. Add your site key in src/config/recaptcha.site.js");
      return;
    }

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setFormError("Please complete the captcha.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        recaptchaRef.current?.reset();
        return;
      }

      setDone(true);
      recaptchaRef.current?.reset();
    } catch {
      setFormError("Network error. Please try again.");
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="quote-bg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <motion.div
          key="quote-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          className="relative z-10 w-full max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:hidden sm:max-w-[560px] sm:rounded-[28px]"
        >
          {/* Drag handle — mobile only */}
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          <button type="button" onClick={handleClose} aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-4 pb-4 pt-4 sm:px-8 sm:pt-6 sm:pb-8">
            {done ? (
              <div className="flex flex-col items-center py-6 text-center sm:py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-16 sm:w-16">
                  <Check className="h-7 w-7 text-[#0088FF] sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-5 sm:text-2xl">Request Received!</h2>
                <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:mt-3 sm:text-sm sm:leading-7">Our team will review your request and get back to you within 24 hours.</p>
                <button type="button" onClick={handleClose}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 sm:mt-6 sm:py-3"
                >Close</button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0088FF]">Long-Term Parking</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-2 sm:text-2xl">Get a Quote</h2>
                <p className="mt-0.5 text-[0.78rem] text-slate-500 sm:text-[0.84rem]">Fill in the details and our team will be in touch.</p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {/* compact input style shared */}
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {[["fullName","Full Name","John Smith","text",true],["companyName","Company Name","Acme Corp","text",false]].map(([name,label,ph,type,req]) => (
                      <div key={name}>
                        <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">{label}{req && <span className="ml-0.5 text-red-500">*</span>}</label>
                        <input required={req} type={type} name={name} value={form[name]} onChange={onChange} placeholder={ph}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Email Address <span className="ml-0.5 text-red-500">*</span></label>
                      <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Phone Number <span className="ml-0.5 text-red-500">*</span></label>
                      <input required type="tel" name="phone" value={form.phone} onChange={onPhoneChange}
                        placeholder="+971 50 000 0000"
                        inputMode="tel"
                        pattern="[\d+\s\-().]+"
                        title="Phone number must contain only digits, +, spaces, or hyphens"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Select Service <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setServiceOpen(!serviceOpen)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-900 outline-none transition focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5 flex items-center justify-between"
                      >
                        <span className={form.service ? "text-slate-900" : "text-slate-400"}>
                          {form.service || "Choose a service…"}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
                      </button>

                      {serviceOpen && (
                        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                          <input
                            type="text"
                            placeholder="Search services…"
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            autoFocus
                            className="w-full rounded-t-lg border-b border-slate-200 px-3 py-2 text-sm outline-none focus:ring-0 sm:px-4 sm:py-2.5"
                          />
                          <ul className="max-h-48 overflow-y-auto">
                            {filteredServices.length === 0 ? (
                              <li className="px-3 py-2 text-sm text-slate-400 sm:px-4">No services found</li>
                            ) : (
                              filteredServices.map((service) => (
                                <li key={service}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setForm((p) => ({ ...p, service }));
                                      setServiceOpen(false);
                                      setServiceSearch("");
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm transition hover:bg-slate-100 sm:px-4 sm:py-2.5 ${
                                      form.service === service ? "bg-[#0088FF] text-white hover:bg-[#0088FF]" : "text-slate-700"
                                    }`}
                                  >
                                    {service}
                                  </button>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Tower / Location</label>
                      <input type="text" name="tower" value={form.tower} onChange={onChange} placeholder="Tower or address"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Slots Needed</label>
                      <input type="number" min="1" name="slots" value={form.slots} onChange={onChange} placeholder="e.g. 10"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    {RECAPTCHA_SITE_KEY ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={() => setFormError("")}
                      />
                    ) : (
                      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                        Add your site key in src/config/recaptcha.site.js to enable captcha.
                      </p>
                    )}
                  </div>
                  {formError ? (
                    <p className="text-sm text-red-600" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5"
                  >
                    {submitting ? "Submitting…" : "Submit Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════ SERVICE CARD ═══════════════════════════ */

const CAT_META = {
  parking: { label: "Parking",      color: "#0088FF", bg: "rgba(0,136,255,0.12)" },
  valet:   { label: "Valet",        color: "#0088FF", bg: "rgba(0,136,255,0.12)" },
  care:    { label: "Vehicle Care", color: "#0088FF", bg: "rgba(0,136,255,0.12)" },
};

function ServiceCard({ service, index, onClick, category }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const col = index % 4;
  const cat = CAT_META[category] || CAT_META.parking;

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(3px)", transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.06, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.52, ease, delay: col * 0.06 }}
      whileHover={reduced ? undefined : { y: -8, scale: 1.02, transition: springSoft }}
      style={{ transformPerspective: 1200 }}
      className="group/card relative cursor-pointer"
      onClick={() => onClick(service)}
    >
      {/* Card shell */}
      <div className="relative overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_1px_3px_rgba(6,6,22,0.06),0_8px_32px_-8px_rgba(0,136,255,0.08)] transition-shadow duration-300 group-hover/card:shadow-[0_4px_8px_rgba(6,6,22,0.06),0_20px_48px_-8px_rgba(0,136,255,0.18)]">

        {/* Shimmer sweep */}
        {!reduced && (
          <span className="svc-shimmer pointer-events-none absolute -left-1/2 top-0 z-20 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100" />
        )}

        {/* Hover blue glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}14, transparent 68%)` }} />

        {/* Media */}
        <div className="relative h-[185px] w-full overflow-hidden bg-[#d2dae2]">
          {service.mediaType === "video" ? (
            <video
              src={service.mediaSrc}
              autoPlay={!reduced}
              loop muted playsInline preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          ) : (
            <img
              src={service.mediaSrc}
              alt={service.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Number badge — bottom-left of media */}
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

        </div>

        {/* Body */}
        <div className="px-4 pb-5 pt-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13]">
              {t(service, "name", language)}
            </h3>
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-200 group-hover/card:border-transparent group-hover/card:text-white"
              style={{ "--hover-bg": cat.color }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors duration-200 group-hover/card:[color:var(--hover-bg)]" />
            </span>
          </div>
          <p className="mt-1.5 line-clamp-3 text-[0.775rem] leading-5 text-slate-500">
            {t(service, "fullDesc", language)}
          </p>

          {/* Read more row */}
          <div
            className="mt-3.5 flex items-center justify-between border-t border-slate-50 pt-3"
          >
            <span className="flex items-center gap-1 text-[11px] font-semibold transition-all duration-200 opacity-0 translate-x-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5"
              style={{ color: cat.color }}>
              Read More <ChevronRight className="h-3 w-3" />
            </span>
            {service.packages && (
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderColor: `${cat.color}33`, color: cat.color, background: cat.bg }}>
                Packages
              </span>
            )}
            {service.subCategories && !service.packages && (
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderColor: `${cat.color}33`, color: cat.color, background: cat.bg }}>
                {service.subCategories.length} Types
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════ HERO VISUAL ═════════════════════════════ */
/* Auto-cycling stack of real service images + floating accent chips.
   (Replaces the old phone mockup — client wanted service imagery here.) */

const HERO_SERVICE_SLIDES = [
  { img: "/valets.jpeg",                     name: "Valet Service",    tag: "Parking" },
  { img: "/Electric Vehicle Charging.jpeg",  name: "EV Charging",      tag: "Vehicle Care" },
  { img: "/Car Wash Services .jpeg",         name: "Car Wash",         tag: "Vehicle Care" },
  { img: "/selfParking.jpeg",                name: "Self-Parking",     tag: "Parking" },
  { img: "/Airport Parking Services  .jpeg", name: "Airport Parking",  tag: "Parking" },
  { img: "/Battery Replacement Service.jpeg",name: "Battery Service",  tag: "Vehicle Care" },
];

function SvcHeroVisual({ reduced }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % HERO_SERVICE_SLIDES.length);
    }, 3200);
    return () => clearInterval(id);
  }, [reduced]);

  const current = HERO_SERVICE_SLIDES[active];

  return (
    <div className="relative flex items-center justify-center">

      {/* Deep glow halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),rgba(37,99,235,0.08)_50%,transparent_75%)] blur-2xl lg:h-[460px] lg:w-[460px]" />

      {/* Outer slow-rotating dashed orbit ring */}
      {!reduced && (
        <div
          aria-hidden
          className="svc-orbit-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full border border-dashed border-[#0088FF]/18 lg:h-[460px] lg:w-[460px]"
        />
      )}

      {/* Inner counter-rotating ring */}
      {!reduced && (
        <div
          aria-hidden
          className="svc-orbit-ring-rev pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full border border-[#0088FF]/10 lg:h-[380px] lg:w-[380px]"
          style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(0,136,255,0.12) 85%, transparent 100%)" }}
        />
      )}

      {/* ── Stacked decorative cards behind the main one ── */}
      <div aria-hidden className="absolute z-10 h-[300px] w-[230px] -rotate-6 rounded-[28px] bg-white/55 shadow-[0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:h-[360px] sm:w-[270px] lg:h-[420px] lg:w-[320px]" />
      <div aria-hidden className="absolute z-10 h-[300px] w-[230px] rotate-3 rounded-[28px] bg-white/70 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:h-[360px] sm:w-[270px] lg:h-[420px] lg:w-[320px]" />

      {/* ── Main image card (cross-fading service imagery) ── */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 h-[300px] w-[230px] overflow-hidden rounded-[28px] border border-white/80 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:h-[360px] sm:w-[270px] lg:h-[420px] lg:w-[320px]"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.img}
              alt={current.name}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 270px, 230px"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050A13]/75 via-[#050A13]/10 to-transparent" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-block rounded-full bg-[#0088FF] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_12px_rgba(0,136,255,0.4)]">
            {current.tag}
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.name}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="mt-2 text-[1.25rem] font-semibold leading-tight tracking-[-0.03em] text-white"
            >
              {current.name}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute left-5 top-5 flex gap-1.5">
          {HERO_SERVICE_SLIDES.map((s, i) => (
            <span
              key={s.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Floating card: Service Booked — top-left ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16, rotate: -6 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.3 }}
        className="absolute left-[-6%] top-2 z-30 hidden sm:block lg:left-[-16%] lg:top-6"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.13)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
            <ParkingCircle aria-hidden className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">Service Booked</p>
            <p className="text-[10px] text-[#667085]">Valet, Dubai Mall</p>
          </div>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16B364] text-white">
            <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
          </span>
        </div>
      </motion.div>

      {/* ── EV Charging progress — bottom-right ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.5 }}
        className="absolute bottom-[10%] right-[-6%] z-30 hidden sm:block lg:right-[-14%]"
      >
        <div className="w-[162px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.13)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Zap aria-hidden className="h-3.5 w-3.5 text-[#16B364]" fill="currentColor" />
              <p className="text-[11px] font-semibold text-[#050A13]">EV Charging</p>
            </div>
            <span className="rounded-full bg-[rgba(22,179,100,0.1)] px-1.5 py-0.5 text-[9px] font-bold text-[#16B364]">Live</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0088FF] to-[#16B364]"
              initial={{ width: "0%" }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.7 }}
            />
          </div>
          <div className="mt-1.5 flex justify-between">
            <p className="text-[9px] text-slate-400">68% charged</p>
            <p className="text-[9px] font-semibold text-[#0088FF]">~22 min</p>
          </div>
        </div>
      </motion.div>

      {/* ── Pulsing location pin ── */}
      {!reduced && (
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[6%] left-[6%] z-30 hidden text-[#0088FF] sm:block lg:left-[0%]"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full bg-[#0088FF]/12"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <MapPin aria-hidden className="h-10 w-10 drop-shadow-[0_8px_16px_rgba(0,136,255,0.4)]" fill="currentColor" />
          </div>
          <span className="mt-1 block h-1.5 w-8 rounded-full bg-[#0088FF]/20 blur-sm" />
        </motion.div>
      )}
    </div>
  );
}

/* ══════════════════════════ HERO SECTION ════════════════════════════ */

function HeroSection({ onGetQuote, hero }) {
  const sectionRef = useRef(null);
  const reduced    = useReducedMotion();
  const { language } = useLanguage();
  const heroTitle = (t(hero, "title", language) || "").trim();
  const heroSubtitle = (t(hero, "subtitle", language) || "").trim();

  /* Mouse spotlight */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 35, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 35, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(42% 38% at ${smoothX}px ${smoothY}px, rgba(0,136,255,0.16), rgba(37,99,235,0.08) 38%, transparent 72%)`;

  /* Scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: reduced ? 500 : 72, damping: reduced ? 80 : 22, mass: 0.28 });

  const parallaxA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -44]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0,  58]);
  const parallaxC = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -28]);
  const orbitRot  = useTransform(sp, [0, 1], reduced ? [0, 0] : [0, 108]);
  const gridFade  = useTransform(sp, [0, 0.25, 0.5, 0.75, 1], reduced ? [0.55,0.55,0.55,0.55,0.55] : [0.42, 0.58, 0.62, 0.55, 0.44]);
  const spotStr   = useTransform(sp, [0, 0.45, 0.55, 1], reduced ? [0.9,0.9,0.9,0.9] : [0.72, 1, 1, 0.78]);

  const onMove = (e) => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };
  const onLeave = () => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.38);
  };

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.36);
  }, [reduced, mouseX, mouseY]);

  /* Stagger variants */
  const container = reduced ? {} : {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp = reduced ? {} : {
    variants: {
      hidden:   { opacity: 0, y: 26 },
      visible:  { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
    },
  };

  const SERVICE_CHIPS = ["Self-Parking", "Valet Service", "EV Charging", "Car Storage", "Airport Parking", `+${allServicesData.length - 5} More`];

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/hero relative overflow-hidden bg-[#F4F8FF] py-16 sm:py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center"
    >
      {/* Rich layered background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_35%,#F0F7FF_65%,#EAF3FF_100%)]" />

      {/* Dot grid */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: gridFade }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_40%,black,transparent)]" />
      </motion.div>

      {/* Mouse spotlight */}
      {!reduced && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: spotlight, opacity: spotStr }} />
      )}

      {/* Large decorative arc top-right */}
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(0,136,255,0.11),rgba(37,99,235,0.05)_50%,transparent_72%)] blur-xl" />

      {/* Parallax blobs */}
      <motion.div aria-hidden style={{ y: parallaxA }} className="pointer-events-none absolute -left-24 top-[14%] z-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_38%_38%,rgba(0,136,255,0.13),transparent_68%)] blur-2xl" />
      <motion.div aria-hidden style={{ y: parallaxB }} className="pointer-events-none absolute -right-32 bottom-[4%] z-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(37,99,235,0.10),transparent_66%)] blur-2xl" />
      <motion.div aria-hidden style={{ y: parallaxC }} className="pointer-events-none absolute left-[55%] top-[20%] z-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_60%)] blur-3xl" />

      {/* Floating particles */}
      {!reduced && (
        <>
          <motion.div aria-hidden className="pointer-events-none absolute right-[6%] top-[22%] z-0 h-3 w-3 rounded-full bg-[#0088FF]/40"
            animate={{ y: [0,-14,0], opacity:[0.4,0.9,0.4], scale:[1,1.2,1] }}
            transition={{ duration: 5, repeat: Infinity, ease:"easeInOut" }} />
          <motion.div aria-hidden className="pointer-events-none absolute left-[10%] bottom-[30%] z-0 h-2 w-2 rounded-full bg-[#2563EB]/38"
            animate={{ y:[0,13,0], opacity:[0.3,0.72,0.3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease:"easeInOut", delay:0.6 }} />
          <motion.div aria-hidden className="pointer-events-none absolute right-[24%] bottom-[20%] z-0 h-2.5 w-2.5 rounded-full bg-[#0ea5e9]/32"
            animate={{ scale:[1,1.45,1], opacity:[0.25,0.62,0.25] }}
            transition={{ duration: 3.5, repeat: Infinity, ease:"easeInOut", delay:0.2 }} />
          <motion.div aria-hidden className="pointer-events-none absolute left-[40%] top-[10%] z-0 h-1.5 w-1.5 rounded-full bg-[#0088FF]/28"
            animate={{ y:[0,-10,0], x:[0,6,0], opacity:[0.2,0.55,0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease:"easeInOut", delay:1.2 }} />
        </>
      )}

      {/* Conic orbit — offset to phone side */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-10%] z-0 h-[min(100vw,720px)] w-[min(100vw,720px)] opacity-[0.07]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, transparent, rgba(0,136,255,0.35), transparent, rgba(37,99,235,0.25), transparent)",
          ...(reduced ? {} : { rotate: orbitRot }),
        }}
      />

      {/* Top border line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[#0088FF]/20 to-transparent" />

      {/* ══ CONTENT ══ */}
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 xl:gap-24">

          {/* ─── LEFT — text ─── */}
          <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={container}>

            {/* Headline */}
            <motion.h1
              {...fadeUp}
              className="max-w-[580px] text-[clamp(2.6rem,5.2vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.065em] text-[#050A13] [overflow-wrap:anywhere]"
            >
              {heroTitle}
            </motion.h1>

            {/* Description with left accent bar */}
            <motion.div {...fadeUp} className="mt-7 flex gap-4">
              <div className="mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#0088FF] via-[#0088FF]/40 to-transparent" />
              <p className="max-w-[440px] text-[0.9rem] leading-[1.75] text-slate-500 [overflow-wrap:anywhere] line-clamp-6">
                {heroSubtitle}
              </p>
            </motion.div>

            {/* Service chip tags */}
            <motion.div {...fadeUp} className="mt-6 flex flex-wrap gap-2">
              {SERVICE_CHIPS.map((chip, i) => (
                <span
                  key={chip}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition ${
                    i === SERVICE_CHIPS.length - 1
                      ? "bg-[#0088FF] text-white shadow-[0_4px_12px_rgba(0,136,255,0.28)]"
                      : "border border-slate-200/80 bg-white/80 text-slate-600 shadow-[0_1px_6px_rgba(6,6,22,0.06)]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
              >
                <Link href="/contact"
                  className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32),0_2px_8px_rgba(0,136,255,0.18)] transition hover:brightness-110"
                >
                  {ui("getInTouch", language)}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
              <motion.button
                type="button" onClick={onGetQuote}
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
              >
                {ui("getAQuote", language)}
              </motion.button>
            </motion.div>

          </motion.div>

          {/* ─── RIGHT — service imagery ─── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
            className="relative mt-16 flex min-h-[480px] items-center justify-center lg:mt-0 lg:min-h-[620px]"
          >
            <SvcHeroVisual reduced={reduced} />
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes svc-shimmer {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(240%) skewX(-12deg); }
        }
        .svc-shimmer {
          animation: svc-shimmer 0.7s ease-in-out forwards;
          animation-play-state: paused;
        }
        .group\\/card:hover .svc-shimmer { animation-play-state: running; }

        @keyframes svc-orbit-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .svc-orbit-ring {
          animation: svc-orbit-spin 28s linear infinite;
        }
        @keyframes svc-orbit-rev {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        .svc-orbit-ring-rev {
          animation: svc-orbit-rev 18s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-shimmer, .svc-orbit-ring, .svc-orbit-ring-rev { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════ SERVICES GRID ═══════════════════════════ */

const SLUG_CATEGORY = {
  "self-parking": "parking",       "tenant-sharing-slot": "valet",
  "valet-service": "valet",        "valet-on-demand": "valet",
  "ev-charging": "care",           "vip-parking": "parking",
  "guest-visitor-parking": "parking", "car-storage": "care",
  "fleet-parking": "parking",      "bike-parking": "parking",
  "barrier-free-parking": "parking", "smart-public-parking": "parking",
  "airport-parking": "parking",    "yacht-parking": "parking",
  "car-wash": "care",              "air-tyre-service": "care",
  "battery-replacement": "care",   "jump-start": "care",
};

const FILTERS = [
  { id: "all",     label: "All Services",   emoji: "✦" },
  { id: "parking", label: "Parking",        emoji: "🅿" },
  { id: "valet",   label: "Valet & Access", emoji: "🚗" },
  { id: "care",    label: "Vehicle Care",   emoji: "🔧" },
];

function ServicesGrid({ onServiceClick, cmsServices, gridHeader }) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const reduced  = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0,-70]);
  const blobB = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0, 90]);

  // CMS-only: render exactly the services from the CMS (empty → empty grid).
  // Each CMS service is enriched with any matching local extras (subCategories,
  // packages, etc.) so the detail modal still works for known slugs.
  const services = useMemo(() => {
    if (!Array.isArray(cmsServices) || cmsServices.length === 0) return [];
    const localBySlug = new Map(allServicesData.map((s) => [s.slug, s]));
    return cmsServices.map((cms) => {
      const local = localBySlug.get(cms.slug);
      return local ? { ...local, ...cms } : cms;
    });
  }, [cmsServices]);

  const filtered = activeFilter === "all"
    ? services
    : services.filter(s => SLUG_CATEGORY[s.slug] === activeFilter);

  const counts = FILTERS.map(f =>
    f.id === "all" ? services.length
    : services.filter(s => SLUG_CATEGORY[s.slug] === f.id).length
  );

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24">

      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F4F8FF_0%,#FFFFFF_22%,#FFFFFF_78%,#F8FBFF_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,136,255,0.04),transparent)]" />

      {/* Parallax blobs */}
      <motion.div aria-hidden style={{ y: blobA }} className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_65%)] blur-3xl" />
      <motion.div aria-hidden style={{ y: blobB }} className="pointer-events-none absolute -right-32 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06),transparent_65%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease }}
          className="mb-10 sm:mb-12 lg:flex lg:items-end lg:justify-between lg:gap-12"
        >
          {/* Left */}
          <div>
            <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
              {t(gridHeader, "heading", language)}
              {t(gridHeader, "headingGradient", language) ? (
                <>
                  {" "}
                  <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
                    {t(gridHeader, "headingGradient", language)}
                  </span>
                </>
              ) : null}
            </h2>
            <p className="mt-3 max-w-[480px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
              {t(gridHeader, "subtitle", language)}
            </p>
            <p className="mt-3 max-w-[480px] text-[0.88rem] leading-6 text-slate-500 [overflow-wrap:anywhere]">
              {t(gridHeader, "description", language)}
            </p>
          </div>

          {/* Right — live count */}
          <div className="mt-6 shrink-0 lg:mt-0 lg:text-right">
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(2.4rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.06em] text-[#050A13]"
            >
              {filtered.length}
              <span className="text-[#0088FF]">+</span>
            </motion.p>
            <p className="mt-1 text-sm text-slate-400">
              {activeFilter === "all" ? "Services available" : `${FILTERS.find(f=>f.id===activeFilter)?.label} services`}
            </p>
          </div>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 flex gap-2 overflow-x-auto pb-1 sm:gap-3 [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f, i) => {
            const isActive = activeFilter === f.id;
            return (
              <motion.button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0088FF] text-white shadow-[0_4px_14px_rgba(0,136,255,0.32)]"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#0088FF]/40 hover:text-[#0088FF]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[#0088FF]"
                    style={{ zIndex: -1 }}
                    transition={{ type:"spring", stiffness:380, damping:28 }}
                  />
                )}
                <span>{f.label}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {counts[i]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                onClick={onServiceClick}
                category={SLUG_CATEGORY[service.slug] || "parking"}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state (shouldn't happen but safety) ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-slate-400">No services in this category.</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes svc-shimmer {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(240%) skewX(-12deg); }
        }
        .svc-shimmer {
          animation: svc-shimmer 0.7s ease-in-out forwards;
          animation-play-state: paused;
        }
        .group\\/card:hover .svc-shimmer { animation-play-state: running; }
        @media (prefers-reduced-motion: reduce) {
          .svc-shimmer { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════ PARTNERS SECTION ════════════════════════ */

const PARTNERS_ROW1 = [
  { name: "Emirates NBD",    initials: "EN", color: "#0088FF", industry: "Banking"         },
  { name: "Emaar Properties",initials: "EP", color: "#6366F1", industry: "Real Estate"     },
  { name: "Dubai Mall",      initials: "DM", color: "#F59E0B", industry: "Retail"          },
  { name: "DEWA",            initials: "DW", color: "#16B364", industry: "Utilities"       },
  { name: "Jumeirah Group",  initials: "JG", color: "#EC4899", industry: "Hospitality"     },
  { name: "Aldar Properties",initials: "AP", color: "#0EA5E9", industry: "Real Estate"     },
  { name: "Majid Al Futtaim",initials: "MF", color: "#8B5CF6", industry: "Lifestyle"       },
  { name: "Abu Dhabi COOP",  initials: "AC", color: "#14B8A6", industry: "Cooperative"     },
];

const PARTNERS_ROW2 = [
  { name: "Rotana Hotels",   initials: "RH", color: "#F97316", industry: "Hospitality"     },
  { name: "Du Telecom",      initials: "DT", color: "#6366F1", industry: "Telecom"         },
  { name: "LuLu Hypermarket",initials: "LH", color: "#16B364", industry: "Retail"         },
  { name: "Azizi Developments",initials:"AD",color: "#0088FF", industry: "Development"    },
  { name: "Meraas",          initials: "ME", color: "#EC4899", industry: "Urban Lifestyle" },
  { name: "Nakheel",         initials: "NA", color: "#F59E0B", industry: "Real Estate"     },
  { name: "Sobha Realty",    initials: "SR", color: "#8B5CF6", industry: "Real Estate"     },
  { name: "IHG Hotels",      initials: "IH", color: "#0EA5E9", industry: "Hospitality"     },
];

const PARTNER_STATS = [
  { value: "50+",  label: "Enterprise clients"    },
  { value: "200+", label: "Properties managed"    },
  { value: "7",    label: "Emirates covered"      },
  { value: "99%",  label: "Client satisfaction"   },
];

function PartnerCard({ partner }) {
  const { language } = useLanguage();
  return (
    <div className="group/partner relative flex min-w-[210px] items-center gap-3.5 overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(6,6,22,0.05)] transition-all duration-300 hover:border-slate-200 hover:shadow-[0_6px_24px_rgba(6,6,22,0.09)] sm:min-w-[240px]">
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/partner:opacity-100"
        style={{ background: `radial-gradient(circle at 20% 50%, ${partner.color}0C, transparent 70%)` }} />
      {/* Logo mark — uploaded image if present, else colored initials */}
      {partner.logo ? (
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={partner.logo} alt={partner.name} className="h-full w-full object-contain p-1" />
        </div>
      ) : (
        <div
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${partner.color}, ${partner.color}CC)` }}
        >
          {partner.initials}
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      )}
      {/* Text */}
      <div className="min-w-0">
        <p className="truncate text-[0.82rem] font-semibold text-[#050A13] transition-colors duration-200 group-hover/partner:text-[#0088FF]">
          {t(partner, "name", language)}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-400">{t(partner, "industry", language)}</p>
      </div>
    </div>
  );
}

function PartnersSection({ partners }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  // Use the CMS partner list when provided; otherwise the built-in defaults.
  // A single CMS list is split across the two marquee rows.
  const cmsList = Array.isArray(partners?.partners) ? partners.partners.filter((p) => p && (p.name || p.logo)) : [];
  let base1 = PARTNERS_ROW1;
  let base2 = PARTNERS_ROW2;
  if (cmsList.length > 0) {
    const mid = Math.ceil(cmsList.length / 2);
    base1 = cmsList.slice(0, mid);
    base2 = cmsList.slice(mid).length > 0 ? cmsList.slice(mid) : cmsList.slice(0, mid);
  }
  const row1 = [...base1, ...base1];
  const row2 = [...base2, ...base2];
  const heading = (t(partners, "heading", language) || "").trim();
  const headingGradient = (t(partners, "headingGradient", language) || "").trim();
  const subtitle = (t(partners, "subtitle", language) || "").trim();
  const description = (t(partners, "description", language) || "").trim();

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">

      {/* Subtle bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_30%,#FFFFFF_70%,#F4F8FF_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(0,136,255,0.04),transparent)]" />

      {/* ── Section header ── */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
            {heading}
            {headingGradient ? (
              <>
                {" "}
                <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
                  {headingGradient}
                </span>
              </>
            ) : null}
          </h2>
          <p className="mt-3 max-w-[460px] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
            {subtitle}
          </p>
          <p className="mt-3 max-w-[460px] text-[0.88rem] leading-6 text-slate-500 [overflow-wrap:anywhere]">
            {description}
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        {/* <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-4 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-[#F7FAFF] px-2 py-5 shadow-[0_2px_12px_rgba(6,6,22,0.05)]"
        >
          {PARTNER_STATS.map((s) => (
            <div key={s.label} className="px-2 text-center sm:px-4">
              <p className="text-[1.35rem] font-bold tracking-[-0.04em] text-[#050A13] sm:text-[1.6rem]">{s.value}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-400 sm:text-[11px]">{s.label}</p>
            </div>
          ))}
        </motion.div> */}
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div className="relative overflow-hidden pb-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className={`flex w-max items-center gap-3 ${!reduced ? "partners-row1" : ""}`}>
          {row1.map((p, i) => <PartnerCard key={`r1-${p.name}-${i}`} partner={p} />)}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div className="relative mt-3 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className={`flex w-max items-center gap-3 ${!reduced ? "partners-row2" : ""}`}>
          {row2.map((p, i) => <PartnerCard key={`r2-${p.name}-${i}`} partner={p} />)}
        </div>
      </div>

      {/* ── Bottom CTA line ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease, delay: 0.2 }}
        className="relative z-10 mt-12 text-center"
      >
        <p className="text-[0.82rem] text-slate-400">
          Want to become a partner?{" "}
          <Link href="/contact" className="font-semibold text-[#0088FF] underline-offset-2 hover:underline">
            Get in touch →
          </Link>
        </p>
      </motion.div>

      <style>{`
        .partners-row1 { animation: partners-left 36s linear infinite; }
        .partners-row2 { animation: partners-right 40s linear infinite; }
        @keyframes partners-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes partners-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .partners-row1, .partners-row2 { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════ TRUST SECTION ═══════════════════════════ */

const TRUST = [
  { Icon: Camera,     label: "24/7 Surveillance"                  },
  { Icon: Shield,     label: "Insurance / Vehicle Safety Assurance" },
  { Icon: BadgeCheck, label: "Verified Valet Staff"               },
  { Icon: CreditCard, label: "Secure Payment System"              },
  { Icon: Lock,       label: "Controlled Access Zones"            },
];

// Map the admin's icon-name string to its lucide component (fallback: Shield).
const TRUST_ICONS = { Camera, Shield, BadgeCheck, CreditCard, Lock };

function TrustSection({ trust }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const heading = (t(trust, "heading", language) || "").trim();
  const headingGradient = (t(trust, "headingGradient", language) || "").trim();
  const subtitle = (t(trust, "subtitle", language) || "").trim();
  // Render the CMS trust items when present; otherwise the bundled defaults.
  const trustItems =
    Array.isArray(trust?.items) && trust.items.length > 0
      ? trust.items.map((it) => ({ ...it, Icon: TRUST_ICONS[it.icon] || Shield }))
      : TRUST;

  return (
    <section className="relative overflow-hidden bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#EEF5FF_0%,#F4F8FF_50%,#FFFFFF_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.05),transparent_68%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center"
        >
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
            {heading}
            {headingGradient ? (
              <>
                {" "}
                <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
                  {headingGradient}
                </span>
              </>
            ) : null}
          </h2>
          <p className="mt-3 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
            {subtitle}
          </p>
        </motion.div>

        {/* 5 cards — 2 col mobile, 3 col md, 5 col lg */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item, i) => {
            const { Icon } = item;
            return (
            <motion.div
              key={item.label || i}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              whileHover={reduced ? undefined : { y: -6, transition: springSoft }}
              className={`group/trust relative flex flex-col items-center overflow-hidden rounded-[20px] border border-slate-100 bg-white px-5 py-7 text-center shadow-[0_2px_14px_rgba(6,6,22,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,136,255,0.12)] ${
                i === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,136,255,0.07),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover/trust:opacity-100" />

              {/* Icon circle */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,136,255,0.08)] shadow-[0_4px_14px_rgba(0,136,255,0.12)] transition-all duration-300 group-hover/trust:bg-[rgba(0,136,255,0.14)]">
                <Icon className="h-6 w-6 text-[#0088FF]" aria-hidden />
              </div>

              {/* Label */}
              <p className="mt-4 text-[0.82rem] font-semibold leading-snug text-[#050A13]">{t(item, "label", language)}</p>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════ LONG-TERM CTA SECTION ═══════════════════════ */

function LongTermCTA({ onGetQuote, cta }) {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const heading = (t(cta, "heading", language) || "").trim();
  const headingGradient = (t(cta, "headingGradient", language) || "").trim();
  const subtitle = (t(cta, "subtitle", language) || "").trim();
  const ctaLabel = (t(cta, "ctaLabel", language) || "").trim();

  return (
    <section className="bg-[#F4F8FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="text-[clamp(2.65rem,4.5vw,4rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]">
            {heading}
            {headingGradient ? (
              <>
                {" "}
                <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">{headingGradient}</span>
              </>
            ) : null}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
            {subtitle}
          </p>
          <button
            type="button"
            onClick={onGetQuote}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {ctaLabel}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═════════════════════════ MAIN PAGE ════════════════════════════════ */

export default function ServicesListPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [quoteOpen, setQuoteOpen]             = useState(false);
  const [cms, setCms] = useState(null);

  // Pull the Services page CMS content (hero + section text). Falls back to the
  // hardcoded defaults when a field is empty/unavailable.
  useEffect(() => {
    fetchPage("services").then((page) => {
      if (page?.sections) setCms(page.sections);
    });
  }, []);

  // Auto-open service modal when ?open=<slug> is in the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("open");
    if (!slug) return;
    const service = allServicesData.find((s) => s.slug === slug);
    if (service) setSelectedService(service);
    // Remove the query param from the URL without a page reload.
    const url = new URL(window.location.href);
    url.searchParams.delete("open");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return (
    <>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <QuoteModal   isOpen={quoteOpen}        onClose={() => setQuoteOpen(false)} />

      <main>
        {/* OLD hero (dark, mirrored the home page — client disliked it):
        <GoodLookingServiceHero onGetQuote={() => setQuoteOpen(true)} /> */}
        <HeroSection    onGetQuote={() => setQuoteOpen(true)} hero={cms?.hero} />
        <ServicesGrid   onServiceClick={setSelectedService} cmsServices={cms?.services} gridHeader={cms?.servicesGridHeader} />
        <PartnersSection partners={cms?.partnersSection} />
        <TrustSection trust={cms?.trustSection} />
        <LongTermCTA    onGetQuote={() => setQuoteOpen(true)} cta={cms?.ctaSection} />
      </main>
    </>
  );
}
