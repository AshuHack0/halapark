"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Paperclip, X, Loader2, FileText } from "lucide-react";

import { useLanguage, t } from "@/context/LanguageContext";
import { validateForm, focusFirstError, errorInputClass } from "@/lib/formValidation";
import FieldError from "@/components/common/FieldError";

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
    attachments: "Attachments (Optional)",
    attachmentsHint: "Attach images, photos, or documents (PDF, DOC). Up to 5 files, 10MB each.",
    addFiles: "Add files",
    uploading: "Uploading…",
    remove: "Remove",
    attachmentTypeError: "Unsupported file type. Use an image or a PDF/DOC/DOCX file.",
    attachmentSizeError: "File is too large (max 10MB).",
    attachmentCountError: "You can attach up to 5 files.",
    attachmentUploadError: "Attachment upload failed. Please try again.",
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
    attachments: "المرفقات (اختياري)",
    attachmentsHint: "أرفق صورًا أو مستندات (PDF أو DOC). حتى 5 ملفات، 10 ميجابايت لكل ملف.",
    addFiles: "إضافة ملفات",
    uploading: "جارٍ الرفع…",
    remove: "إزالة",
    attachmentTypeError: "نوع الملف غير مدعوم. استخدم صورة أو ملف PDF/DOC/DOCX.",
    attachmentSizeError: "حجم الملف كبير جدًا (بحد أقصى 10 ميجابايت).",
    attachmentCountError: "يمكنك إرفاق حتى 5 ملفات.",
    attachmentUploadError: "فشل رفع المرفق. يرجى المحاولة مرة أخرى.",
  },
};

// Attachment constraints.
const ATTACH_MAX_BYTES = 10 * 1024 * 1024;
const ATTACH_MAX_COUNT = 5;
const ATTACH_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ATTACH_ALLOWED_TYPES = new Set(ATTACH_ACCEPT.split(","));
// Some browsers report DOC/DOCX with an empty or generic MIME type; fall back
// to the extension so legitimate documents aren't rejected.
const ATTACH_ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".doc", ".docx"];

function isAllowedAttachment(file) {
  if (ATTACH_ALLOWED_TYPES.has(file.type)) return true;
  const name = (file.name || "").toLowerCase();
  return ATTACH_ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

// POST a single file to Cloudinary with signed params from the backend.
function uploadAttachmentToCloudinary(file, sig) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.apiKey);
    fd.append("timestamp", sig.timestamp);
    fd.append("signature", sig.signature);
    fd.append("folder", sig.folder);

    fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.secure_url) resolve(data.secure_url);
        else reject(new Error("Cloudinary upload failed"));
      })
      .catch(() => reject(new Error("Cloudinary upload failed")));
  });
}

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
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
  error = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10 ${error ? errorInputClass : ""}`}
      />
      <FieldError message={error} />
    </label>
  );
}

export default function ContactFormPanel({ form }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const isAr = language === "ar";
  const [formData, setFormData]     = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting]  = useState(false);
  const [formError, setFormError]    = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  // Attachments: each item is { name, type, url } once uploaded to Cloudinary.
  const [attachments, setAttachments] = useState([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  // CMS-only content — hidden when deleted from the database.
  const eyebrow = t(form, "eyebrow", language);
  const heading = t(form, "heading", language);
  const note = t(form, "note", language);

  // Subjects come from the CMS only; the AR list is parallel by index.
  const { subjects, subjectsAr } = useMemo(() => {
    const cmsSubjects = Array.isArray(form?.subjects)
      ? form.subjects.filter((s) => typeof s === "string" && s.trim())
      : [];
    return {
      subjects: cmsSubjects,
      subjectsAr: Array.isArray(form?.ar?.subjects) ? form.ar.subjects : [],
    };
  }, [form]);

  // Keep the selected subject valid if the CMS list arrives after mount.
  useEffect(() => {
    setFormData((current) =>
      subjects.includes(current.subject)
        ? current
        : { ...current, subject: subjects[0] || "" },
    );
  }, [subjects]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormError("");
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: "" }));
    setIsSubmitted(false);
    // Phone: digits, +, spaces, hyphens, parentheses only — letters are
    // rejected as they're typed. A "+" is kept only at the very start.
    const next =
      name === "phone"
        ? value.replace(/[^\d+\s\-().]/g, "").replace(/(?!^)\+/g, "")
        : value;
    setFormData((current) => ({ ...current, [name]: next }));
  };

  const handleFilesSelected = async (event) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = ""; // allow re-picking the same file
    if (picked.length === 0) return;

    setFormError("");
    setIsSubmitted(false);

    // Enforce the count cap up front (existing + newly selected).
    if (attachments.length + picked.length > ATTACH_MAX_COUNT) {
      setFormError(c.attachmentCountError);
      return;
    }
    // Validate each file before touching the network.
    for (const file of picked) {
      if (!isAllowedAttachment(file)) {
        setFormError(c.attachmentTypeError);
        return;
      }
      if (file.size > ATTACH_MAX_BYTES) {
        setFormError(c.attachmentSizeError);
        return;
      }
    }

    setUploadingCount((n) => n + picked.length);
    try {
      // One signed set of params is valid for this batch's folder.
      const sigRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/attachment-signature`,
      );
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok || !sig?.signature || !sig?.cloudName) {
        throw new Error("signature");
      }
      for (const file of picked) {
        const url = await uploadAttachmentToCloudinary(file, sig);
        setAttachments((prev) => [...prev, { name: file.name, type: file.type, url }]);
      }
    } catch {
      setFormError(c.attachmentUploadError);
    } finally {
      setUploadingCount((n) => Math.max(0, n - picked.length));
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Shared rules (src/lib/formValidation.js) — same flow as every other form:
  // message under each invalid field, first one scrolled to and focused.
  const CONTACT_RULES = {
    fullName: { label: c.fullName, required: true },
    email: { label: c.email, required: true, email: true },
    phone: { label: c.phone, required: true, phone: true },
    message: { label: c.message, required: true },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    const errors = validateForm(formData, CONTACT_RULES, language);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      focusFirstError(formRef.current, errors, Object.keys(CONTACT_RULES));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, attachments }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.error || c.genericError);
        return;
      }
      setIsSubmitted(true);
      setFormData({ ...initialFormData, subject: subjects[0] || "" });
      setAttachments([]);
    } catch {
      setFormError(c.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      {eyebrow || heading || note ? (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-[rgba(0,136,255,0.06)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#0088FF] [overflow-wrap:anywhere]">
                {eyebrow}
              </span>
            ) : null}
            {heading ? (
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl [overflow-wrap:anywhere]">
                {heading}
              </h2>
            ) : null}
          </div>

          {note ? (
            <p className="max-w-xs text-sm leading-6 text-slate-500 [overflow-wrap:anywhere]">
              {note}
            </p>
          ) : null}
        </div>
      ) : null}

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            id="fullName"
            label={c.fullName}
            placeholder={c.fullNamePlaceholder}
            value={formData.fullName}
            onChange={handleChange}
            required
            error={fieldErrors.fullName}
          />
          <FormField
            id="email"
            label={c.email}
            type="email"
            placeholder={c.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            required
            error={fieldErrors.email}
          />
          <FormField
            id="phone"
            label={c.phone}
            type="tel"
            placeholder={c.phonePlaceholder}
            value={formData.phone}
            onChange={handleChange}
            required
            error={fieldErrors.phone}
          />
          <FormField
            id="company"
            label={c.company}
            placeholder={c.companyPlaceholder}
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {subjects.length > 0 ? (
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
              {subjects.map((subject, index) => (
                <option key={subject} value={subject}>
                  {isAr ? subjectsAr[index] || subject : subject}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            {c.message} <span className="text-red-500">*</span>
          </span>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.message)}
            placeholder={c.messagePlaceholder}
            className={`w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10 ${fieldErrors.message ? errorInputClass : ""}`}
          />
          <FieldError message={fieldErrors.message} />
        </label>

        {/* Attachments (optional) */}
        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            {c.attachments}
          </span>

          {attachments.length > 0 ? (
            <ul className="mb-3 space-y-2">
              {attachments.map((file, index) => (
                <li
                  key={`${file.url}-${index}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
                >
                  {file.type?.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={file.url} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700 hover:text-[#0088FF]"
                    title={file.name}
                  >
                    {file.name || file.url}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                    {c.remove}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {attachments.length < ATTACH_MAX_COUNT ? (
            <label
              className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed px-4 py-3 text-sm font-medium transition ${
                uploadingCount > 0
                  ? "cursor-not-allowed border-slate-200 text-slate-400"
                  : "border-slate-300 text-slate-600 hover:border-[#0088FF] hover:text-[#0088FF]"
              }`}
            >
              {uploadingCount > 0 ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {c.uploading}
                </>
              ) : (
                <>
                  <Paperclip className="h-4 w-4" />
                  {c.addFiles}
                </>
              )}
              <input
                type="file"
                multiple
                accept={ATTACH_ACCEPT}
                className="hidden"
                disabled={uploadingCount > 0}
                onChange={handleFilesSelected}
              />
            </label>
          ) : null}
          <p className="mt-2 text-xs text-slate-400">{c.attachmentsHint}</p>
        </div>

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
            disabled={submitting || uploadingCount > 0}
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
