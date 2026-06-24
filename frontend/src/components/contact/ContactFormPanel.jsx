"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

import { contactSubjects, contactSubjectsAr } from "./contactData";

// Fixed UI copy (not CMS-driven) — translated inline.
const COPY = {
  en: {
    eyebrow: "Contact Form",
    heading: "Send us a message",
    note: "Select the right subject so our team can respond faster.",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email",
    emailPlaceholder: "Enter your email address",
    phone: "Phone",
    phonePlaceholder: "Enter your phone number",
    company: "Company (Optional)",
    companyPlaceholder: "Enter your company name",
    subject: "Subject",
    message: "Message",
    messagePlaceholder: "Tell us how we can help",
    send: "Send Message",
    sending: "Sending…",
    success: "✓ Message sent! Our team will get back to you shortly.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Network error. Please try again.",
  },
  ar: {
    eyebrow: "نموذج التواصل",
    heading: "أرسل لنا رسالة",
    note: "اختر الموضوع المناسب حتى يتمكن فريقنا من الرد بشكل أسرع.",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    phone: "الهاتف",
    phonePlaceholder: "أدخل رقم هاتفك",
    company: "الشركة (اختياري)",
    companyPlaceholder: "أدخل اسم شركتك",
    subject: "الموضوع",
    message: "الرسالة",
    messagePlaceholder: "أخبرنا كيف يمكننا المساعدة",
    send: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    success: "✓ تم إرسال الرسالة! سيتواصل معك فريقنا قريبًا.",
    genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    networkError: "حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
  },
};

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: contactSubjects[0],
  message: "",
};

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10"
      />
    </label>
  );
}

export default function ContactFormPanel() {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const isAr = language === "ar";
  const [formData, setFormData]     = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting]  = useState(false);
  const [formError, setFormError]    = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError("");
    setIsSubmitted(false);
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.error || c.genericError);
        return;
      }
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setFormError(c.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-[rgba(0,136,255,0.06)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#0088FF]">
            {c.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl [overflow-wrap:anywhere]">
            {c.heading}
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-6 text-slate-500 [overflow-wrap:anywhere]">
          {c.note}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            id="fullName"
            label={c.fullName}
            placeholder={c.fullNamePlaceholder}
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            id="email"
            label={c.email}
            type="email"
            placeholder={c.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            id="phone"
            label={c.phone}
            type="tel"
            placeholder={c.phonePlaceholder}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormField
            id="company"
            label={c.company}
            placeholder={c.companyPlaceholder}
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            {c.subject}
          </span>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10"
          >
            {contactSubjects.map((subject, index) => (
              <option key={subject} value={subject}>
                {isAr ? contactSubjectsAr[index] || subject : subject}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            {c.message}
          </span>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder={c.messagePlaceholder}
            className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10"
          />
        </label>

        {formError ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </p>
        ) : null}

        {isSubmitted ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {c.success}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0088FF] px-6 py-3.5 text-base font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? c.sending : c.send}
          </button>
        </div>
      </form>
    </div>
  );
}
