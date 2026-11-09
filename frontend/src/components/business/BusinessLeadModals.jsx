"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { useLanguage, t } from "@/context/LanguageContext";
import { validateForm, focusFirstError, sanitizePhone, errorInputClass } from "@/lib/formValidation";
import FieldError from "@/components/common/FieldError";

const API = process.env.NEXT_PUBLIC_API_URL || "";

// Resolve a bilingual list of options. Each option is { label, ar } (or a plain
// string). Returns [{ value, label }] where value is the canonical EN label
// (what gets stored) and label is what's shown for the current language.
function resolveOptions(options, language) {
  if (!Array.isArray(options)) return [];
  return options
    .map((o) => (typeof o === "string" ? { label: o } : o))
    .filter((o) => o && (o.label || "").trim())
    .map((o) => ({
      value: (o.label || "").trim(),
      label: language === "ar" ? ((o.ar || "").trim() || (o.label || "").trim()) : (o.label || "").trim(),
    }));
}

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)]";

// Shared shell: backdrop, close, scroll-lock, success screen.
export function ModalShell({ isOpen, onClose, title, subtitle, done, successTitle, successMessage, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // data-lenis-prevent: wheel/touch inside the popup scrolls the popup, not the page behind it.
    <div data-lenis-prevent className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-slate-950/60 backdrop-blur-[2px]" />
      <div className="relative z-[1] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_28px_80px_rgba(2,6,23,0.35)] sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {done ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)]">
              <Check className="h-7 w-7 text-[#0088FF]" />
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#050A13] [overflow-wrap:anywhere]">{successTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 [overflow-wrap:anywhere]">{successMessage}</p>
            <button type="button" onClick={onClose} className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-95">Close</button>
          </div>
        ) : (
          <>
            <h2 className="pr-8 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:text-2xl [overflow-wrap:anywhere]">{title}</h2>
            {subtitle ? <p className="mt-1 text-[0.84rem] text-slate-500 [overflow-wrap:anywhere]">{subtitle}</p> : null}
            {children}
          </>
        )}
      </div>
    </div>
  );
}

// Shared checkbox group.
function CheckboxGroup({ label, options, selected, onToggle, dir, error }) {
  if (options.length === 0) return null;
  return (
    <div dir={dir} data-field="options">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <label key={opt.value} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${checked ? "border-[#0088FF] bg-[rgba(0,136,255,0.06)] text-[#050A13]" : "border-slate-200 bg-white text-slate-600 hover:border-[#0088FF]/40"}`}>
              <input type="checkbox" checked={checked} onChange={() => onToggle(opt.value)} className="h-4 w-4 accent-[#0088FF]" />
              <span className="[overflow-wrap:anywhere]">{opt.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

const BLANK = { fullName: "", email: "", phone: "", company: "", message: "" };

// Shared rules (src/lib/formValidation.js): name required, email format,
// mobile number 7–15 digits (optional +). Labels follow the UI language.
const leadRules = (c) => ({
  fullName: { label: c.fullName, required: true },
  email: { label: c.email, required: true, email: true },
  phone: { label: c.phone, required: true, phone: true },
});
const LEAD_ORDER = ["fullName", "email", "phone"];

// One submit check for both lead dialogs: field errors + "pick at least one
// option"; scrolls to / focuses the first problem. Returns true when valid.
function checkLead({ form, c, language, picked, hasOptions, formEl, setFieldErrors }) {
  const errors = validateForm(form, leadRules(c), language);
  if (hasOptions && picked.length === 0) errors.options = c.pickError;
  setFieldErrors(errors);
  if (Object.keys(errors).length === 0) return true;
  if (errors.options) {
    formEl?.querySelector('[data-field="options"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    focusFirstError(formEl, errors, LEAD_ORDER);
  }
  return false;
}

function LeadFields({ form, setForm, dir, c, errors = {}, clearError }) {
  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); clearError?.(k); };
  const cls = (k) => `${inputClass} ${errors[k] ? errorInputClass : ""}`;
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2" dir={dir}>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.fullName} <span className="text-red-500">*</span></label>
        <input name="fullName" aria-invalid={Boolean(errors.fullName)} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className={cls("fullName")} placeholder={c.fullName} />
        <FieldError message={errors.fullName} />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.company}</label>
        <input name="company" value={form.company} onChange={(e) => set("company", e.target.value)} className={inputClass} placeholder={c.company} />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.email} <span className="text-red-500">*</span></label>
        <input name="email" type="email" aria-invalid={Boolean(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} className={cls("email")} placeholder={c.email} />
        <FieldError message={errors.email} />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.phone} <span className="text-red-500">*</span></label>
        <input name="phone" type="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} value={form.phone} onChange={(e) => set("phone", sanitizePhone(e.target.value))} className={cls("phone")} placeholder="+971 50 000 0000" />
        <FieldError message={errors.phone} />
      </div>
    </div>
  );
}

const COPY = {
  en: { fullName: "Full Name", company: "Company", email: "Email", phone: "Phone", message: "Message", submit: "Submit", submitting: "Submitting…", pickError: "Please select at least one option." },
  ar: { fullName: "الاسم الكامل", company: "الشركة", email: "البريد الإلكتروني", phone: "الهاتف", message: "الرسالة", submit: "إرسال", submitting: "جارٍ الإرسال…", pickError: "يرجى اختيار خيار واحد على الأقل." },
};

// ── Get Proposal ─────────────────────────────────────────────────────────────
export function GetProposalModal({ isOpen, onClose, config, options }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const dir = language === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState(BLANK);
  const [solutions, setSolutions] = useState([]);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  const clearError = (k) => setFieldErrors((p) => (p[k] ? { ...p, [k]: "" } : p));

  const opts = resolveOptions(options, language);
  const heading = t(config, "heading", language) || (language === "ar" ? "احصل على عرض سعر" : "Get a Proposal");
  const subtitle = t(config, "subtitle", language) || (language === "ar" ? "اختر الحلول التي تهمك واملأ بياناتك." : "Select the solutions you're interested in and share your details.");
  const optionsLabel = t(config, "optionsLabel", language) || (language === "ar" ? "الحلول المطلوبة" : "Required Solutions");
  const successTitle = t(config, "successTitle", language) || (language === "ar" ? "تم استلام الطلب!" : "Request Received!");
  const successMessage = t(config, "successMessage", language) || (language === "ar" ? "سيتواصل معك فريقنا بعرض السعر قريبًا." : "Our team will get back to you with a proposal shortly.");

  const toggle = (v) => { setSolutions((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v])); clearError("options"); };

  const reset = () => { setForm(BLANK); setSolutions([]); setDone(false); setError(""); setFieldErrors({}); setSubmitting(false); };
  const close = () => { reset(); onClose(); };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!checkLead({ form, c, language, picked: solutions, hasOptions: opts.length > 0, formEl: formRef.current, setFieldErrors })) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/business/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, solutions, source: "business-hero" }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "Something went wrong. Please try again."); return; }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={close} title={heading} subtitle={subtitle} done={done} successTitle={successTitle} successMessage={successMessage}>
      <form ref={formRef} noValidate onSubmit={submit} className="mt-5 space-y-4">
        <CheckboxGroup label={optionsLabel} options={opts} selected={solutions} onToggle={toggle} dir={dir} error={fieldErrors.options} />
        <LeadFields form={form} setForm={setForm} dir={dir} c={c} errors={fieldErrors} clearError={clearError} />
        <div dir={dir}>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.message}</label>
          <textarea rows={3} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className={inputClass} />
        </div>
        {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
        <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? c.submitting : c.submit}
        </button>
      </form>
    </ModalShell>
  );
}

// ── Book a Free Consultation ─────────────────────────────────────────────────
export function ConsultationModal({ isOpen, onClose, config, options }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const dir = language === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState({ ...BLANK, preferredTime: "" });
  const [topics, setTopics] = useState([]);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  const clearError = (k) => setFieldErrors((p) => (p[k] ? { ...p, [k]: "" } : p));

  const opts = resolveOptions(options, language);
  const heading = t(config, "heading", language) || (language === "ar" ? "احجز استشارة مجانية" : "Book a Free Consultation");
  const subtitle = t(config, "subtitle", language) || (language === "ar" ? "اختر مواضيع النقاش واملأ بياناتك." : "Choose what you'd like to discuss and share your details.");
  const optionsLabel = t(config, "optionsLabel", language) || (language === "ar" ? "مواضيع النقاش" : "Discussion Topics");
  const timeLabel = t(config, "timeLabel", language) || (language === "ar" ? "الوقت المفضل (اختياري)" : "Preferred time (optional)");
  const successTitle = t(config, "successTitle", language) || (language === "ar" ? "تم استلام الطلب!" : "Request Received!");
  const successMessage = t(config, "successMessage", language) || (language === "ar" ? "سيتواصل معك فريقنا لتحديد موعد الاستشارة." : "Our team will reach out to schedule your consultation.");

  const toggle = (v) => { setTopics((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v])); clearError("options"); };

  const reset = () => { setForm({ ...BLANK, preferredTime: "" }); setTopics([]); setDone(false); setError(""); setFieldErrors({}); setSubmitting(false); };
  const close = () => { reset(); onClose(); };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!checkLead({ form, c, language, picked: topics, hasOptions: opts.length > 0, formEl: formRef.current, setFieldErrors })) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/business/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, topics, source: "business-hero" }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "Something went wrong. Please try again."); return; }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={close} title={heading} subtitle={subtitle} done={done} successTitle={successTitle} successMessage={successMessage}>
      <form ref={formRef} noValidate onSubmit={submit} className="mt-5 space-y-4">
        <CheckboxGroup label={optionsLabel} options={opts} selected={topics} onToggle={toggle} dir={dir} error={fieldErrors.options} />
        <LeadFields form={form} setForm={setForm} dir={dir} c={c} errors={fieldErrors} clearError={clearError} />
        <div dir={dir}>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">{timeLabel}</label>
          <input value={form.preferredTime} onChange={(e) => setForm((p) => ({ ...p, preferredTime: e.target.value }))} className={inputClass} placeholder="e.g. Weekday mornings" />
        </div>
        <div dir={dir}>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">{c.message}</label>
          <textarea rows={3} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className={inputClass} />
        </div>
        {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
        <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? c.submitting : c.submit}
        </button>
      </form>
    </ModalShell>
  );
}
