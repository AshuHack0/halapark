"use client";

import { useState, useRef, useLayoutEffect, useEffect, useMemo, useCallback, useId } from "react";
import { useRouter } from "next/navigation";
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
  CreditCard, Lock, ChevronLeft, ChevronRight, ChevronDown, MapPin, Clock, ParkingCircle, ArrowRight, Zap, Search, Loader2,
  ShieldCheck, CalendarCheck, Users,
} from "lucide-react";

// Built-in marks for the Long-Term CTA chips, used when no icon is uploaded.
const LT_CHIP_ICONS = [ShieldCheck, CalendarCheck, Users];
import { allServicesData, serviceNames } from "./allServicesData";
import { fetchPage } from "@/lib/cms";
import { usePrefersReducedMotionOS } from "@/hooks/usePrefersReducedMotionOS";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import LogoTicker from "@/components/common/LogoTicker";
import { PARTNER_FORM_LINK } from "@/components/partners/PartnershipFormProvider";
// import GoodLookingServiceHero from "./GoodLookingServiceHero"; // OLD dark hero (looked like home page) — replaced by the light HeroSection below

/* ─── Springs & easing ─── */
const springPop  = { type: "spring", stiffness: 380, damping: 24, mass: 0.85 };
const springSoft = { type: "spring", stiffness: 120, damping: 20 };
const ease       = [0.22, 1, 0.36, 1];

/* ═══════════════════════════ SERVICE MODAL ══════════════════════════ */

function ServiceModal({ service, onClose }) {
  // Muted background video keeps playing on phones; only a real OS
  // "reduce motion" setting stops it.
  const osReducedMotion = usePrefersReducedMotionOS();
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
              <video onContextMenu={(e) => e.preventDefault()}
                src={service.mediaSrc}
                autoPlay={!osReducedMotion}
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
              className="absolute right-4 top-4 rtl:right-auto rtl:left-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/28 text-white backdrop-blur-sm transition hover:bg-black/48"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4">
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
            <RichText text={t(service, "fullDesc", language)} className="mt-2 text-[0.8rem] leading-6 text-slate-500 sm:mt-3 sm:text-[0.94rem] sm:leading-7 block" />

            {service.whatsIncluded?.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {includedLabel}
                </p>
                <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2.5">
                  {service.whatsIncluded.map((item, index) => {
                    // Strict Arabic: in AR use the parallel ar.whatsIncluded[index]
                    // (blank when missing → hide that item), never the English text.
                    const text =
                      language === "ar"
                        ? (Array.isArray(service.ar?.whatsIncluded) ? service.ar.whatsIncluded[index] : "") || ""
                        : item;
                    if (!text) return null;
                    return (
                      <li key={`${index}-${text}`} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-5 sm:w-5">
                          <Check className="h-2.5 w-2.5 text-[#0088FF] sm:h-3 sm:w-3" />
                        </span>
                        <span className="text-[0.78rem] leading-5 text-slate-700 sm:text-[0.84rem] sm:leading-6">
                          {text}
                        </span>
                      </li>
                    );
                  })}
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
                          <RichText text={cat.description} className="mt-1.5 text-[0.78rem] leading-5 text-slate-600 sm:text-[0.84rem] sm:leading-6 block" />
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

// ── Attachment constraints + upload helper (shared by the quote form) ─────────
const ATTACH_MAX_BYTES = 10 * 1024 * 1024;
const ATTACH_MAX_COUNT = 5;
const ATTACH_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ATTACH_ALLOWED_TYPES = new Set(ATTACH_ACCEPT.split(","));
const ATTACH_ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".doc", ".docx"];

function isAllowedAttachment(file) {
  if (ATTACH_ALLOWED_TYPES.has(file.type)) return true;
  const name = (file.name || "").toLowerCase();
  return ATTACH_ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

// XHR upload with progress reporting — same approach as the job-application
// resume upload, so the user always sees that something is happening.
function uploadAttachmentToCloudinary(file, sig, onProgress) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.apiKey);
    fd.append("timestamp", sig.timestamp);
    fd.append("signature", sig.signature);
    fd.append("folder", sig.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`);
    xhr.timeout = 120000;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject(new Error("upload failed"));
        }
      } catch {
        reject(new Error("upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("upload failed"));
    xhr.ontimeout = () => reject(new Error("upload timed out"));
    xhr.send(fd);
  });
}

// Fetch the signed-upload credentials with a hard timeout so a slow/unreachable
// backend can never leave the form stuck in "uploading" (submit disabled).
async function fetchAttachmentSignature() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60000);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact/attachment-signature`,
      { signal: controller.signal },
    );
    const sig = await res.json().catch(() => ({}));
    if (!res.ok || !sig?.signature || !sig?.cloudName) throw new Error("signature");
    return sig;
  } finally {
    clearTimeout(timer);
  }
}

function QuoteModal({ isOpen, onClose, quoteForm, services }) {
  const { language } = useLanguage();
  const [form, setForm] = useState(BLANK_FORM);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  // Attachments: each item is { name, type, url } once uploaded to Cloudinary.
  const [attachments, setAttachments] = useState([]);
  // { name, progress } while a file is uploading, else null.
  const [attachUpload, setAttachUpload] = useState(null);
  const [attachError, setAttachError] = useState("");
  const uploadingCount = attachUpload ? 1 : 0;
  const recaptchaRef = useRef(null);

  // CMS-editable copy (bilingual, with sensible fallbacks so the form still
  // reads well when the admin hasn't customised it).
  const qEyebrow = t(quoteForm, "eyebrow", language) || (language === "ar" ? "" : "Long-Term Parking");
  const qHeading = t(quoteForm, "heading", language) || (language === "ar" ? "احصل على عرض سعر" : "Get a Quote");
  const qIntro = t(quoteForm, "intro", language) || (language === "ar" ? "" : "Fill in the details and our team will be in touch.");
  const qSuccessTitle = t(quoteForm, "successTitle", language) || (language === "ar" ? "تم استلام الطلب!" : "Request Received!");
  const qSuccessMessage = t(quoteForm, "successMessage", language) || (language === "ar" ? "سيراجع فريقنا طلبك ويتواصل معك خلال 24 ساعة." : "Our team will review your request and get back to you within 24 hours.");

  // Service options come from the backend services list (the same services the
  // admin manages on this page) — language-aware. The static list is only a
  // fallback while the CMS response hasn't arrived yet.
  const cmsServiceNames = Array.isArray(services)
    ? services
        .map((s) => ((language === "ar" ? s?.ar?.name || s?.name : s?.name) || "").trim())
        .filter(Boolean)
    : null;
  const serviceOptions = cmsServiceNames ?? serviceNames;
  const filteredServices = serviceOptions.filter((s) =>
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

  // Phone field: only allow digits, +, spaces, hyphens, parentheses. A leading
  // "+" is kept only at the very start (a phone can't have "+" mid-number).
  const onPhoneChange = (e) => {
    let v = e.target.value.replace(/[^\d+\s\-().]/g, "");
    // Collapse any "+" that isn't the first character.
    v = v.replace(/(?!^)\+/g, "");
    setForm((p) => ({ ...p, phone: v }));
  };

  const onAttachmentsSelected = async (event) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (picked.length === 0) return;
    setAttachError("");
    if (attachments.length + picked.length > ATTACH_MAX_COUNT) {
      setAttachError(`You can attach up to ${ATTACH_MAX_COUNT} files.`);
      return;
    }
    for (const file of picked) {
      if (!isAllowedAttachment(file)) { setAttachError("Unsupported file type. Use an image or a PDF/DOC/DOCX file."); return; }
      if (file.size > ATTACH_MAX_BYTES) { setAttachError("File is too large (max 10MB)."); return; }
    }
    try {
      const sig = await fetchAttachmentSignature();
      for (const file of picked) {
        setAttachUpload({ name: file.name, progress: 0 });
        const url = await uploadAttachmentToCloudinary(file, sig, (progress) =>
          setAttachUpload((prev) => (prev ? { ...prev, progress } : prev)),
        );
        setAttachments((prev) => [...prev, { name: file.name, type: file.type, url }]);
      }
    } catch {
      setAttachError("Attachment upload failed. Please try again.");
    } finally {
      setAttachUpload(null);
    }
  };

  const removeAttachment = (index) => setAttachments((prev) => prev.filter((_, i) => i !== index));

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
    setAttachments([]);
    setAttachUpload(null);
    setAttachError("");
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
        body: JSON.stringify({ ...form, attachments, recaptchaToken }),
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
          className="relative z-10 w-full max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent sm:max-w-[560px] sm:rounded-[28px]"
        >
          {/* Drag handle — mobile only */}
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          <button type="button" onClick={handleClose} aria-label="Close"
            className="absolute right-4 top-4 rtl:right-auto rtl:left-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-4 pb-4 pt-4 sm:px-8 sm:pt-6 sm:pb-8">
            {done ? (
              <div className="flex flex-col items-center py-6 text-center sm:py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-16 sm:w-16">
                  <Check className="h-7 w-7 text-[#0088FF] sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-5 sm:text-2xl [overflow-wrap:anywhere]">{qSuccessTitle}</h2>
                <RichText text={qSuccessMessage} className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:mt-3 sm:text-sm sm:leading-7 [overflow-wrap:anywhere] block" />
                <button type="button" onClick={handleClose}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 sm:mt-6 sm:py-3"
                >Close</button>
              </div>
            ) : (
              <>
                {qEyebrow ? <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0088FF] [overflow-wrap:anywhere]">{qEyebrow}</p> : null}
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-2 sm:text-2xl [overflow-wrap:anywhere]">{qHeading}</h2>
                {qIntro ? <p className="mt-0.5 text-[0.78rem] text-slate-500 sm:text-[0.84rem] [overflow-wrap:anywhere]">{qIntro}</p> : null}

                <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {/* compact input style shared */}
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {[["fullName","Full Name","John Smith","text",true],["companyName","Company Name","Acme Corp","text",false]].map(([name,label,ph,type,req]) => (
                      <div key={name}>
                        <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">{label}{req && <span className="ms-0.5 text-red-500">*</span>}</label>
                        <input required={req} type={type} name={name} value={form[name]} onChange={onChange} placeholder={ph}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Email Address <span className="ms-0.5 text-red-500">*</span></label>
                      <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Phone Number <span className="ms-0.5 text-red-500">*</span></label>
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
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-start text-sm text-slate-900 outline-none transition focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5 flex items-center justify-between"
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
                          {/* data-lenis-prevent + overscroll-contain: wheel/touch
                              over the list scrolls the LIST, not the page. */}
                          <ul data-lenis-prevent className="max-h-48 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
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
                                    className={`w-full px-3 py-2 text-start text-sm transition hover:bg-slate-100 sm:px-4 sm:py-2.5 ${
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
                  {/* Attachments (optional) */}
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Attachments (Optional)</label>
                    {attachments.length > 0 ? (
                      <ul className="mb-2 space-y-1.5">
                        {attachments.map((file, index) => (
                          <li key={`${file.url}-${index}`} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
                            <span className="min-w-0 flex-1 truncate text-xs text-slate-600" title={file.name}>{file.name || file.url}</span>
                            <button type="button" onClick={() => removeAttachment(index)} className="shrink-0 rounded-md border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600">Remove</button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {attachUpload ? (
                      <div className="mb-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#0088FF]" aria-hidden />
                          <span className="truncate [overflow-wrap:anywhere]">
                            Uploading — {attachUpload.name} ({attachUpload.progress}%)
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0088FF] transition-[width] duration-200"
                            style={{ width: `${attachUpload.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : null}
                    {attachments.length < ATTACH_MAX_COUNT && !attachUpload ? (
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-[#0088FF] hover:text-[#0088FF]">
                        Add files
                        <input type="file" multiple accept={ATTACH_ACCEPT} className="hidden" onChange={onAttachmentsSelected} />
                      </label>
                    ) : null}
                    {attachError ? (
                      <p className="mt-1.5 text-xs text-red-600" role="alert">{attachError}</p>
                    ) : null}
                    <p className="mt-1 text-[10px] text-slate-400">Images or documents (PDF, DOC). Up to 5 files, 10MB each.</p>
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
                    disabled={submitting || uploadingCount > 0}
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
  technical: { label: "Technical Service", color: "#0088FF", bg: "rgba(0,136,255,0.12)" },
};

function ServiceCard({ service, index, onClick, category, clickable = false }) {
  // Muted background video keeps playing on phones; only a real OS
  // "reduce motion" setting stops it.
  const osReducedMotion = usePrefersReducedMotionOS();
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
      className={`group/card relative h-full ${clickable ? "cursor-pointer" : "cursor-default"}`}
      onClick={clickable ? () => onClick(service) : undefined}
    >
      {/* Card shell — full height + column layout so every card in a row is
          the same height regardless of content length. */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_1px_3px_rgba(6,6,22,0.06),0_8px_32px_-8px_rgba(0,136,255,0.08)] transition-shadow duration-300 group-hover/card:shadow-[0_4px_8px_rgba(6,6,22,0.06),0_20px_48px_-8px_rgba(0,136,255,0.18)]">

        {/* Shimmer sweep */}
        {!reduced && (
          <span className="svc-shimmer pointer-events-none absolute -left-1/2 top-0 z-20 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100" />
        )}

        {/* Hover blue glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}14, transparent 68%)` }} />

        {/* Media — only rendered with a real source; a missing/cleared image
            shows the neutral block instead of the browser's broken-image alt. */}
        <div className="relative h-[185px] w-full shrink-0 overflow-hidden bg-[#d2dae2]">
          {service.mediaType === "video" && service.mediaSrc ? (
            <video onContextMenu={(e) => e.preventDefault()}
              src={service.mediaSrc}
              autoPlay={!osReducedMotion}
              loop muted playsInline preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          ) : service.mediaSrc ? (
            <img
              src={service.mediaSrc}
              alt={service.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Number badge — bottom-left of media */}
          <div className="absolute bottom-2.5 left-3 rtl:left-auto rtl:right-3 z-10">
            <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

        </div>

        {/* Body — flex column so the footer row pins to the bottom and all
            cards align. NOTE: no `block` on the clamped text — display:block
            overrides the -webkit-box display that line-clamp needs. */}
        <div className="flex flex-1 flex-col px-4 pb-5 pt-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13] [overflow-wrap:anywhere]">
              {t(service, "name", language)}
            </h3>
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-200 group-hover/card:border-transparent group-hover/card:text-white"
              style={{ "--hover-bg": cat.color }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors duration-200 group-hover/card:[color:var(--hover-bg)] rtl:-scale-x-100" />
            </span>
          </div>
          <RichText text={t(service, "fullDesc", language)} className="mt-1.5 line-clamp-3 text-[0.775rem] leading-5 text-slate-500 [overflow-wrap:anywhere]" />

          {/* Read more row — pinned to the card bottom */}
          <div
            className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3"
          >
            <span className="flex items-center gap-1 text-[11px] font-semibold transition-all duration-200 opacity-0 translate-x-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 rtl:group-hover/card:-translate-x-0.5"
              style={{ color: cat.color }}>
              Read More <ChevronRight className="h-3 w-3 rtl:rotate-180" />
            </span>
            {service.packages && (
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderColor: `${cat.color}33`, color: cat.color, background: cat.bg }}>
                Packages
              </span>
            )}
            {service.subCategories?.length > 0 && !service.packages && (
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

// CMS-driven right-side visual. `slides` and both floating cards come strictly
// from the CMS (sections.hero) — no hardcoded content, no defaults. When there
// are no slides the whole visual is hidden; each floating card hides on its own
// when the admin leaves it empty.
// Fanned card stack: the active service sits centred and upright with its
// neighbours peeking out behind it, tilted and scaled down. Only the centre
// card plays — the side cards show their still, so there is never more than
// one clip running. A video hands over when it ends; a still holds briefly.
const SVC_IMAGE_HOLD_MS = 5000;

function SvcHeroVisual({ reduced, slides }) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  const next = useCallback(() => {
    setActive((p) => (p + 1) % Math.max(count, 1));
  }, [count]);
  const prev = useCallback(() => {
    setActive((p) => (p - 1 + Math.max(count, 1)) % Math.max(count, 1));
  }, [count]);

  const current = count > 0 ? slides[active % count] : null;
  const isVideo = Boolean(current?.video);

  // Stills have no "ended" event, so they advance on a timer; videos advance
  // from onEnded so a clip is never cut short.
  useEffect(() => {
    if (count < 2 || isVideo) return undefined;
    const id = setTimeout(next, SVC_IMAGE_HOLD_MS);
    return () => clearTimeout(id);
  }, [active, count, isVideo, next]);

  if (count === 0 || !current) return null;

  // Where each card sits relative to the active one: 0 centre, 1 to the right,
  // -1 to the left, anything else parked behind the centre and hidden.
  const offsetOf = (i) => {
    const raw = (i - active + count) % count;
    if (raw === 0) return 0;
    if (raw === 1) return 1;
    if (raw === count - 1) return -1;
    return 2; // not one of the three visible positions
  };

  const layoutFor = (offset) => {
    if (offset === 0) return { x: "0%", scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
    if (offset === 1) return { x: "62%", scale: 0.82, rotate: 7, opacity: 0.9, zIndex: 20 };
    if (offset === -1) return { x: "-62%", scale: 0.82, rotate: -7, opacity: 0.9, zIndex: 20 };
    return { x: "0%", scale: 0.7, rotate: 0, opacity: 0, zIndex: 10 };
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
      {/* Soft glow behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.16),rgba(37,99,235,0.06)_52%,transparent_76%)] blur-2xl lg:h-[480px] lg:w-[480px]"
      />

      {/* The stack. Height comes from an invisible spacer so the absolutely
          positioned cards have a box to sit in. */}
      <div className="relative">
        <div aria-hidden className="mx-auto aspect-[9/16] w-[56%] opacity-0" />

        {slides.map((slide, i) => {
          const offset = offsetOf(i);
          const isActive = offset === 0;
          return (
            <motion.div
              key={`${slide.name || slide.img || slide.video}-${i}`}
              initial={false}
              animate={layoutFor(offset)}
              transition={reduced ? { duration: 0 } : { duration: 0.6, ease }}
              style={{ zIndex: layoutFor(offset).zIndex }}
              onClick={offset === 1 ? next : offset === -1 ? prev : undefined}
              className={`absolute inset-x-0 top-0 mx-auto aspect-[9/16] w-[56%] overflow-hidden rounded-[22px] shadow-[0_26px_60px_rgba(15,23,42,0.24)] lg:rounded-[26px] ${offset === 1 || offset === -1 ? "cursor-pointer" : ""}`}
            >
              {/* Only the centre card plays; the others show their still. */}
              {isActive && slide.video ? (
                <video
                  key={slide.video}
                  src={slide.video}
                  poster={slide.img || undefined}
                  autoPlay
                  muted
                  playsInline
                  loop={count < 2}
                  preload="auto"
                  onEnded={count > 1 ? next : undefined}
                  onError={count > 1 ? next : undefined}
                  onContextMenu={(e) => e.preventDefault()}
                  aria-label={slide.name || "Service"}
                  className="h-full w-full object-cover object-center"
                />
              ) : slide.img ? (
                <Image
                  src={slide.img}
                  alt={isActive ? slide.name || "" : ""}
                  fill
                  sizes="(min-width: 1024px) 260px, 230px"
                  className="object-cover object-center"
                  priority={isActive}
                />
              ) : slide.video ? (
                // A side card whose slide is video-only: show its first frame,
                // paused. Never autoplays, so only the centre card is playing.
                <video
                  src={slide.video}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="h-full w-full bg-slate-200" />
              )}

              {/* Accent ring on the active card; the others sit back behind a veil. */}
              {isActive ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[22px] ring-2 ring-[#0088FF] lg:rounded-[26px]"
                />
              ) : (
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-white/25" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ‹ › arrows: jump to any slide without waiting for the clip to end.
          A side card is clickable too. */}
      {count > 1 ? (
        <div className="relative z-30 mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous service"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE0F5] bg-white text-[#0A1B33] shadow-[0_6px_18px_rgba(6,6,22,0.08)] transition-all duration-300 hover:border-[#0088FF] hover:text-[#0088FF]"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next service"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE0F5] bg-white text-[#0A1B33] shadow-[0_6px_18px_rgba(6,6,22,0.08)] transition-all duration-300 hover:border-[#0088FF] hover:text-[#0088FF]"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </button>
        </div>
      ) : null}

      {/* Caption under the stack — belongs to the centre card */}
      {current.name || current.tag ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-caption`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease }}
            className="relative z-30 mt-4 text-center"
          >
            {current.name ? (
              <p className="text-[1.3rem] font-semibold leading-tight tracking-[-0.03em] text-[#050A13] [overflow-wrap:anywhere]">
                {current.name}
              </p>
            ) : null}
            {current.tag ? (
              <p className="mt-1 text-[0.9rem] font-medium text-slate-500 [overflow-wrap:anywhere]">
                {current.tag}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      ) : null}
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

  // Hero service chips — strictly from CMS (no hardcoded fallback list).
  const baseChips = (
    language === "ar"
      ? (Array.isArray(hero?.ar?.chips) ? hero.ar.chips : [])
      : (Array.isArray(hero?.chips) ? hero.chips : [])
  ).filter((c) => typeof c === "string" && c.trim());
  // Optional "+N more" pill — only when the admin sets it (no default).
  const moreChip = (t(hero, "chipsMore", language) || "").trim();
  const SERVICE_CHIPS = moreChip ? [...baseChips, moreChip] : baseChips;

  // CTA labels — CMS-driven; each button shows only when it has a label.
  const primaryCtaLabel = (t(hero, "ctaPrimary", language) || "").trim();
  const secondaryCtaLabel = (t(hero, "ctaSecondary", language) || "").trim();

  // Right-side visual — strictly CMS. Slides: [{ img, name, tag }]. Float cards
  // are objects (with their own ar sibling) resolved inside SvcHeroVisual.
  const heroSlides = (Array.isArray(hero?.slides) ? hero.slides : [])
    .map((s) => ({
      img: (s?.img || "").trim(),
      video: (s?.video || "").trim(),
      name: t(s, "name", language),
      tag: t(s, "tag", language),
    }))
    .filter((s) => s.img || s.video);

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
        <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 xl:gap-16">

          {/* ─── LEFT — text ─── */}
          <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={container}>

            {/* Headline */}
            <motion.h1
              {...fadeUp}
              className="max-w-[580px] text-[clamp(2.6rem,5.2vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.065em] text-[#050A13] [overflow-wrap:anywhere]"
            >
              {heroTitle}
            </motion.h1>

            {/* Description with left accent bar — hidden when empty */}
            {heroSubtitle ? (
              <motion.div {...fadeUp} className="mt-7 flex gap-4">
                <div className="mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#0088FF] via-[#0088FF]/40 to-transparent" />
                <p className="max-w-[440px] text-[0.9rem] leading-[1.75] text-slate-500 [overflow-wrap:anywhere] line-clamp-6">
                  {heroSubtitle}
                </p>
              </motion.div>
            ) : null}

            {/* Service chip tags — hidden entirely when the admin adds none */}
            {SERVICE_CHIPS.length > 0 ? (
            <motion.div {...fadeUp} className="mt-6 flex flex-wrap gap-2">
              {SERVICE_CHIPS.map((chip, i) => {
                const isLast = i === SERVICE_CHIPS.length - 1;
                const cls = `rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition ${
                  isLast
                    ? "bg-[#0088FF] text-white shadow-[0_4px_12px_rgba(0,136,255,0.28)]"
                    : "border border-slate-200/80 bg-white/80 text-slate-600 shadow-[0_1px_6px_rgba(6,6,22,0.06)]"
                }`;
                // The "+N more" pill becomes a link when the admin sets one.
                const moreLink = (hero?.chipsMoreLink || "").trim();
                if (Boolean(moreChip) && isLast && moreLink) {
                  return (
                    <Link key={chip} href={moreLink} className={`${cls} hover:-translate-y-0.5 hover:brightness-110`}>
                      {chip}
                    </Link>
                  );
                }
                return (
                  <span key={chip} className={cls}>
                    {chip}
                  </span>
                );
              })}
            </motion.div>
            ) : null}

            {/* CTAs — CMS-driven labels; each button hides when its label is empty */}
            {(primaryCtaLabel || secondaryCtaLabel) ? (
              <motion.div {...fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                {primaryCtaLabel ? (
                  <motion.div
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={springSoft}
                  >
                    {/* With a link set in admin the button redirects; with the
                        link empty it scrolls down to the services grid. */}
                    {(hero?.ctaPrimaryLink || "").trim() ? (
                      <Link href={(hero.ctaPrimaryLink || "").trim()}
                        className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32),0_2px_8px_rgba(0,136,255,0.18)] transition hover:brightness-110"
                      >
                        {primaryCtaLabel}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5">
                          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                        className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32),0_2px_8px_rgba(0,136,255,0.18)] transition hover:brightness-110"
                      >
                        {primaryCtaLabel}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover/btn:translate-y-0.5">
                          <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                        </span>
                      </button>
                    )}
                  </motion.div>
                ) : null}
                {secondaryCtaLabel ? (
                  <motion.button
                    type="button" onClick={onGetQuote}
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={springSoft}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
                  >
                    {secondaryCtaLabel}
                  </motion.button>
                ) : null}
              </motion.div>
            ) : null}

          </motion.div>

          {/* ─── RIGHT — service imagery (hidden when no CMS slides) ─── */}
          {heroSlides.length > 0 ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.12 }}
              className="relative mt-16 flex w-full items-center justify-center lg:mt-0"
            >
              <SvcHeroVisual reduced={reduced} slides={heroSlides} />
            </motion.div>
          ) : null}

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
  { id: "all",     label: "All Services",   labelAr: "كل الخدمات",     emoji: "✦" },
  { id: "parking", label: "Parking",        labelAr: "ركن السيارات",   emoji: "🅿" },
  { id: "valet",   label: "Valet & Access", labelAr: "صف السيارات والدخول", emoji: "🚗" },
  { id: "care",    label: "Vehicle Care",   labelAr: "العناية بالمركبة", emoji: "🔧" },
  { id: "technical", label: "Technical Service", labelAr: "الخدمات الفنية", emoji: "🛠" },
];

function ServicesGrid({ onServiceClick, cmsServices, gridHeader, detailSlugs }) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const reduced  = useReducedMotion();
  // Register the scroll target only once the <section> actually mounts. This
  // component early-returns null when there are no services, so a plain ref
  // would be handed to useScroll before its element exists → framer-motion's
  // "Target ref is defined but not hydrated" warning. A callback ref + state
  // means useScroll only gets a target after the element is in the DOM.
  const sectionRef = useRef(null);
  const [scrollTarget, setScrollTarget] = useState(null);
  const setSectionNode = (node) => {
    sectionRef.current = node;
    if (node) setScrollTarget(sectionRef);
  };
  const { scrollYProgress } = useScroll({
    target: scrollTarget ?? undefined,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const blobA = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0,-70]);
  const blobB = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0, 90]);

  // CMS-only: render exactly the services from the CMS (empty → empty grid).
  // Each CMS service is enriched with any matching local extras (subCategories,
  // packages, etc.) so the detail modal still works for known slugs. Each
  // service also carries a resolved `_category` used to build the tab bar.
  const services = useMemo(() => {
    if (!Array.isArray(cmsServices) || cmsServices.length === 0) return [];
    const localBySlug = new Map(allServicesData.map((s) => [s.slug, s]));
    return cmsServices.map((cms) => {
      const local = localBySlug.get(cms.slug);
      const merged = local ? { ...local, ...cms } : cms;
      // Category priority: explicit CMS category → legacy static map → default.
      const category =
        (typeof cms.category === "string" && cms.category.trim())
          ? cms.category.trim()
          : (SLUG_CATEGORY[cms.slug] || "parking");
      return { ...merged, _category: category };
    });
  }, [cmsServices]);

  // Build the tab bar DYNAMICALLY: always "All Services", then only the category
  // tabs that actually have at least one service. Add one service → 2 tabs.
  const visibleFilters = useMemo(() => {
    const present = new Set(services.map((s) => s._category));
    const catTabs = FILTERS.filter((f) => f.id !== "all" && present.has(f.id));
    return [FILTERS[0], ...catTabs];
  }, [services]);

  // If the active category tab is no longer visible (e.g. all its services were
  // deleted), fall back to "All Services" — derived during render, so we never
  // store an invalid filter (no setState-in-effect needed).
  const effectiveFilter = visibleFilters.some((f) => f.id === activeFilter) ? activeFilter : "all";

  const filtered = effectiveFilter === "all"
    ? services
    : services.filter(s => s._category === effectiveFilter);

  const counts = visibleFilters.map(f =>
    f.id === "all" ? services.length
    : services.filter(s => s._category === f.id).length
  );

  // Hide the whole section (header, tab bar, grid) when the admin has no
  // services — so nothing leftover/default shows after all data is deleted.
  if (services.length === 0) return null;

  return (
    <section id="services-grid" ref={setSectionNode} className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24" style={{ scrollMarginTop: "90px" }}>

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
            <RichText text={t(gridHeader, "description", language)} className="mt-3 max-w-[480px] text-[0.88rem] leading-6 text-slate-500 [overflow-wrap:anywhere] block" />
          </div>

          {/* Right — live count */}
          <div className="mt-6 shrink-0 lg:mt-0 lg:text-end">
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(2.4rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.06em] text-[#050A13]"
            >
              {filtered.length}
              <span className="text-[#0088FF]">+</span>
            </motion.p>
            <p className="mt-1 text-sm text-slate-400" dir={language === "ar" ? "rtl" : "ltr"}>
              {effectiveFilter === "all"
                ? (language === "ar" ? "خدمة متاحة" : "Services available")
                : language === "ar"
                  ? `خدمات ${FILTERS.find(f=>f.id===effectiveFilter)?.labelAr}`
                  : `${FILTERS.find(f=>f.id===effectiveFilter)?.label} services`}
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
          {visibleFilters.map((f, i) => {
            const isActive = effectiveFilter === f.id;
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
                <span>{language === "ar" ? f.labelAr : f.label}</span>
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
        <motion.div layout className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                onClick={onServiceClick}
                category={service._category}
                // Clickable ONLY when this service has its own detail page —
                // same rule as the Solutions grid (no popup, no dead clicks).
                clickable={Boolean(detailSlugs?.has((service.slug || "").trim()))}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state (shouldn't happen but safety) ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-slate-400" dir={language === "ar" ? "rtl" : "ltr"}>
              {language === "ar" ? "لا توجد خدمات في هذه الفئة." : "No services in this category."}
            </p>
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

// Logo-only card — same fixed-size white tile as the Home page's Clients &
// Partners section; no name/industry label underneath.
function PartnerCard({ partner }) {
  const { language } = useLanguage();
  return (
    <div className="flex h-[80px] w-[180px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 sm:h-[96px] sm:w-[210px]">
      {partner.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.logo} alt={t(partner, "name", language) || ""} title={t(partner, "name", language) || undefined} className="h-full w-full object-contain" />
      ) : (
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${partner.color}, ${partner.color}CC)` }}
          title={t(partner, "name", language) || undefined}
        >
          {partner.initials}
        </span>
      )}
    </div>
  );
}

function PartnersSection({ partners }) {
  const { language } = useLanguage();
  // CMS-only partner list — no hardcoded fallback. Only partners with a logo
  // render, since this band is logo-only.
  const logos = (Array.isArray(partners?.partners) ? partners.partners : [])
    .filter((p) => p && p.logo)
    .map((p) => ({ image: p.logo, alt: t(p, "name", language) }));

  const ctaLabel = (t(partners, "ctaLabel", language) || "").trim();

  // Renders the shared LogoTicker, so this band is identical to the Home
  // page's Clients & Partners section.
  return (
    <LogoTicker
      heading={(t(partners, "heading", language) || "").trim()}
      headingEnd={(t(partners, "headingGradient", language) || "").trim()}
      logos={logos}
      cta={
        ctaLabel
          ? {
              label: ctaLabel,
              href: partners?.ctaPopup
                ? PARTNER_FORM_LINK
                : (partners?.ctaLink || "").trim() || "/contact",
            }
          : null
      }
    />
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
  // CMS-only: render exactly the trust items from the admin. No hardcoded
  // fallback — when the admin deletes them all, the section disappears (the DB
  // is the single source of truth). Only items with a label count.
  const trustItems = (Array.isArray(trust?.items) ? trust.items : [])
    .filter((it) => it && ((it.label ?? "").trim() || (it.ar?.label ?? "").trim()))
    .map((it) => ({ ...it, Icon: TRUST_ICONS[it.icon] || Shield }));

  // Hide the whole section when the admin cleared everything (no items and no
  // heading/subtitle text).
  if (trustItems.length === 0 && !heading && !headingGradient && !subtitle) {
    return null;
  }

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

              {/* Icon circle — admin-uploaded icon image overrides the built-in */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,136,255,0.08)] shadow-[0_4px_14px_rgba(0,136,255,0.12)] transition-all duration-300 group-hover/trust:bg-[rgba(0,136,255,0.14)]">
                {(item.iconImage || "").trim() ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.iconImage} alt="" className="h-10 w-10 object-contain" />
                ) : (
                  <Icon className="h-6 w-6 text-[#0088FF]" aria-hidden />
                )}
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
  // Unique id for the SVG clipPath (the component can render more than once).
  const leafClipId = `lt-leaf-${useId().replace(/:/g, "")}`;
  const { language } = useLanguage();
  const heading = (t(cta, "heading", language) || "").trim();
  const headingGradient = (t(cta, "headingGradient", language) || "").trim();
  const subtitle = (t(cta, "subtitle", language) || "").trim();
  const ctaLabel = (t(cta, "ctaLabel", language) || "").trim();
  // Optional photo for the curved cutout on the right (admin upload).
  const image = (cta?.image || "").trim();
  const eyebrow = (t(cta, "eyebrow", language) || "").trim();
  // Small pills under the button. Each needs a label; an uploaded icon
  // replaces the built-in mark.
  const chips = (Array.isArray(cta?.features) ? cta.features : []).filter(
    (f) => f && ((f.label ?? "").trim()),
  );

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(118deg,#071327_0%,#0A1E3C_46%,#0B2E5E_100%)] shadow-[0_28px_64px_rgba(15,23,42,0.28)]">
          {/* Decorative layers: soft glows + top hairline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1AB2FF]/20 blur-[110px] rtl:left-auto rtl:-right-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1AB2FF]/60 to-transparent"
          />

          {/* ── Leaf-shaped image cutout on the right (matches the reference) ──
              One SVG path in bounding-box units clips the photo, so the same
              sweeping curve holds at every width; a blue rim layer sits behind
              it, offset a little, to trace the curve. */}
          {image ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 end-0 hidden w-[54%] md:block rtl:-scale-x-100"
            >
              <svg className="absolute h-0 w-0" aria-hidden="true">
                <defs>
                  <clipPath id={leafClipId} clipPathUnits="objectBoundingBox">
                    <path d="M0.16 0 C0.03 0.18 -0.03 0.42 0.01 0.62 C0.04 0.8 0.13 0.94 0.26 1 L1 1 L1 0 Z" />
                  </clipPath>
                  {/* Two smooth waves for the blue band along the bottom-right */}
                  <clipPath id={`${leafClipId}-w1`} clipPathUnits="objectBoundingBox">
                    <path d="M0.18 1 C0.45 0.92 0.7 0.76 1 0.6 L1 1 Z" />
                  </clipPath>
                  <clipPath id={`${leafClipId}-w2`} clipPathUnits="objectBoundingBox">
                    <path d="M0.3 1 C0.55 0.96 0.78 0.86 1 0.77 L1 1 Z" />
                  </clipPath>
                </defs>
              </svg>
              {/* Blue rim behind the photo */}
              <div
                className="absolute inset-0 -translate-x-3 translate-y-1 bg-[linear-gradient(160deg,#1AB2FF_0%,#0A66FF_55%,#0B2E5E_100%)] opacity-90"
                style={{ clipPath: `url(#${leafClipId})` }}
              />
              {/* The photo */}
              <div className="absolute inset-0" style={{ clipPath: `url(#${leafClipId})` }}>
                <Image src={image} alt="" fill className="object-cover object-center rtl:-scale-x-100" sizes="54vw" />
                {/* Light tint on the inner edge so the copy side stays legible */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,19,0.45)_0%,rgba(5,10,19,0.08)_30%,transparent_60%)]" />
                {/* Blue wave band sweeping along the bottom-right, cut by the leaf */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,#0A3F9E_0%,#1270F0_55%,#1AB2FF_100%)] opacity-95"
                  style={{ clipPath: `url(#${leafClipId}-w1)` }}
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(90deg,#071B3F_0%,#0A2F72_60%,#0E4CB8_100%)]"
                  style={{ clipPath: `url(#${leafClipId}-w2)` }}
                />
              </div>
            </div>
          ) : (
            /* No photo uploaded → keep the original glow so the band still
               has life on the right. */
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0088FF]/35 blur-[100px] rtl:right-auto rtl:-left-24"
            />
          )}

          {/* ── Copy on the left ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className={`relative px-6 py-14 sm:px-10 sm:py-20 lg:py-24 lg:ps-16 ${
              image ? "text-center md:max-w-[47%] md:pe-4 md:text-start lg:ps-16" : "mx-auto max-w-3xl text-center lg:px-16"
            }`}
          >
            {eyebrow ? (
              <p className={`mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70 [overflow-wrap:anywhere] ${image ? "" : "mx-auto"}`}>
                {eyebrow}
              </p>
            ) : null}

            <h2 className="text-[clamp(2.4rem,4.2vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
              {heading}
              {headingGradient ? (
                <span className="block bg-gradient-to-r from-[#4DAAFF] to-[#1AB2FF] bg-clip-text text-transparent">
                  {headingGradient}
                </span>
              ) : null}
            </h2>
            {subtitle ? (
              <p
                className={`mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base [overflow-wrap:anywhere] ${
                  image ? "mx-auto md:mx-0" : "mx-auto"
                }`}
              >
                {subtitle}
              </p>
            ) : null}
            {ctaLabel ? (
              <button
                type="button"
                onClick={onGetQuote}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#0088FF] px-9 py-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(0,136,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1AB2FF] hover:shadow-[0_18px_44px_rgba(26,178,255,0.5)]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
              </button>
            ) : null}

            {chips.length > 0 ? (
              <div className={`mt-8 flex flex-wrap gap-3 ${image ? "justify-center md:justify-start" : "justify-center"}`}>
                {chips.map((chip, i) => {
                  const Icon = LT_CHIP_ICONS[i % LT_CHIP_ICONS.length];
                  return (
                    <span
                      key={`${chip.label}-${i}`}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                        {(chip.iconImage || "").trim() ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={chip.iconImage} alt="" className="h-4 w-4 object-contain" />
                        ) : (
                          <Icon className="h-4 w-4 text-[#7CC4FF]" aria-hidden />
                        )}
                      </span>
                      <span className="text-[0.84rem] font-medium text-white [overflow-wrap:anywhere]">
                        {t(chip, "label", language)}
                      </span>
                    </span>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ MAIN PAGE ════════════════════════════════ */

export default function ServicesListPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [quoteOpen, setQuoteOpen]             = useState(false);
  const [cms, setCms] = useState(null);

  // Slugs that have their own detail page at /services/<slug> (stored under
  // sections.serviceDetails). Same rule as the Solutions page: a card NAVIGATES
  // to its detail page when one exists, and does NOTHING otherwise — the old
  // popup is retired for grid cards (no dead clicks, no popup).
  const detailSlugs = useMemo(() => {
    const details = Array.isArray(cms?.serviceDetails) ? cms.serviceDetails : [];
    return new Set(details.map((d) => (d?.slug || "").trim()).filter(Boolean));
  }, [cms]);

  const handleServiceClick = (service) => {
    const slug = (service?.slug || "").trim();
    if (slug && detailSlugs.has(slug)) {
      router.push(`/services/${slug}`);
    }
  };

  // Pull the Services page CMS content (hero + section text). Falls back to the
  // hardcoded defaults when a field is empty/unavailable. The ?open=<slug>
  // deep-link is resolved HERE (after the CMS answers) so it can prefer the
  // service's detail page when one exists, and only then fall back to the popup.
  useEffect(() => {
    fetchPage("services").then((page) => {
      const sections = page?.sections ?? null;
      if (sections) setCms(sections);

      const params = new URLSearchParams(window.location.search);
      const slug = params.get("open");
      if (!slug) return;
      // Remove the query param from the URL without a page reload.
      const url = new URL(window.location.href);
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());

      // ?open=<slug> goes to the service's detail page when one exists;
      // otherwise it's ignored (no popup — same rule as the Solutions page).
      const details = Array.isArray(sections?.serviceDetails) ? sections.serviceDetails : [];
      if (details.some((d) => (d?.slug || "").trim() === slug)) {
        router.push(`/services/${slug}`);
      }
    });
  }, [router]);

  return (
    <>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <QuoteModal   isOpen={quoteOpen}        onClose={() => setQuoteOpen(false)} quoteForm={cms?.quoteForm} services={cms?.services} />

      <main>
        {/* OLD hero (dark, mirrored the home page — client disliked it):
        <GoodLookingServiceHero onGetQuote={() => setQuoteOpen(true)} /> */}
        {/* Each section hides when its admin "Show this section" toggle is off
            (enabled === false). Undefined/true → show. */}
        {cms?.hero?.enabled !== false && (
          <HeroSection    onGetQuote={() => setQuoteOpen(true)} hero={cms?.hero} />
        )}
        {cms?.servicesGridHeader?.enabled !== false && (
          <ServicesGrid   onServiceClick={handleServiceClick} cmsServices={cms?.services} gridHeader={cms?.servicesGridHeader} detailSlugs={detailSlugs} />
        )}
        {cms?.partnersSection?.enabled !== false && (
          <PartnersSection partners={cms?.partnersSection} />
        )}
        {cms?.trustSection?.enabled !== false && (
          <TrustSection trust={cms?.trustSection} />
        )}
        {cms?.ctaSection?.enabled !== false && (
          <LongTermCTA    onGetQuote={() => setQuoteOpen(true)} cta={cms?.ctaSection} />
        )}
      </main>
    </>
  );
}
