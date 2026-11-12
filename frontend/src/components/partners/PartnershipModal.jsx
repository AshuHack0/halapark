"use client";

import { useEffect, useRef, useState } from "react";
import { Check, CloudUpload, FileText, Loader2 } from "lucide-react";
import { useLanguage, t } from "@/context/LanguageContext";
import { ModalShell, inputClass } from "@/components/business/BusinessLeadModals";
import { validateForm, focusFirstError, errorInputClass, isValidUaeMobile, formatUaeMobile } from "@/lib/formValidation";
import UaePhoneInput from "@/components/common/UaePhoneInput";
import FieldError from "@/components/common/FieldError";

const API = process.env.NEXT_PUBLIC_API_URL || "";

const DOC_MAX_BYTES = 10 * 1024 * 1024;
const DOC_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"];

const COPY = {
  en: {
    heading: "Become a Partner",
    subtitle: "Share a few details and our partnerships team will get in touch.",
    successTitle: "Request Received!",
    successMessage: "Thank you for your interest in partnering with HalaPark. Our partnerships team will get back to you shortly.",
    fullName: "Full Name",
    fullNamePh: "Enter your full name",
    company: "Company Name",
    companyPh: "Enter your company name",
    email: "Email Address",
    emailPh: "you@company.com",
    phone: "Phone Number",
    phonePh: "50 123 4567",
    type: "Partner Type",
    typeParking: "Parking Partner",
    typeParkingHint: "List or manage your parking spaces with HalaPark",
    typeService: "Service Partner",
    typeServiceHint: "Offer services (valet, car wash, EV…) through HalaPark",
    errType: "Please choose Parking Partner or Service Partner.",
    help: "How Can We Help?",
    helpPh: "Tell us about your partnership opportunity",
    doc: "Supporting Documents",
    optional: "(Optional — up to 5)",
    docDrop: "Drag & drop files here, or",
    docBrowse: "browse",
    docHint: "PDF, Word, PowerPoint, Excel or image — up to 5 files, max 10MB each",
    docAddMore: "Add another file",
    uploading: "Uploading",
    remove: "Remove",
    submit: "Submit Request",
    submitting: "Submitting…",
    close: "Close",
    errName: "Full name is required.",
    errCompany: "Company name is required.",
    errEmail: "A valid email address is required.",
    errPhone: "Enter a valid UAE mobile number: 9 digits starting with 50, 52, 54, 55, 56 or 58 (e.g. 50 123 4567).",
    errHelp: "Please tell us how we can help.",
    errDocType: "Unsupported file type. Upload a PDF, Word, PowerPoint, Excel or image file.",
    errDocSize: "File is too large (max 10MB).",
    errDocUpload: "Document upload failed. Please try again.",
    errWait: "Please wait for the documents to finish uploading.",
    errDocCount: "You can upload up to 5 documents.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error. Please try again.",
  },
  ar: {
    heading: "كن شريكًا",
    subtitle: "شاركنا بعض التفاصيل وسيتواصل معك فريق الشراكات لدينا.",
    successTitle: "تم استلام الطلب!",
    successMessage: "شكرًا لاهتمامك بالشراكة مع هالا بارك. سيتواصل معك فريق الشراكات قريبًا.",
    fullName: "الاسم الكامل",
    fullNamePh: "أدخل اسمك الكامل",
    company: "اسم الشركة",
    companyPh: "أدخل اسم شركتك",
    email: "البريد الإلكتروني",
    emailPh: "you@company.com",
    phone: "رقم الهاتف",
    phonePh: "50 123 4567",
    type: "نوع الشراكة",
    typeParking: "شريك مواقف",
    typeParkingHint: "أدرج مواقفك أو أدِرها مع هالا بارك",
    typeService: "شريك خدمات",
    typeServiceHint: "قدّم خدماتك (صف السيارات، الغسيل، الشحن…) عبر هالا بارك",
    errType: "يرجى اختيار شريك مواقف أو شريك خدمات.",
    help: "كيف يمكننا مساعدتك؟",
    helpPh: "أخبرنا عن فرصة الشراكة",
    doc: "مستندات داعمة",
    optional: "(اختياري — حتى 5 ملفات)",
    docDrop: "اسحب الملفات وأفلتها هنا، أو",
    docBrowse: "تصفّح",
    docHint: "PDF أو Word أو PowerPoint أو Excel أو صورة — حتى 5 ملفات، بحد أقصى 10 ميجابايت لكل ملف",
    docAddMore: "إضافة ملف آخر",
    uploading: "جارٍ الرفع",
    remove: "إزالة",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    close: "إغلاق",
    errName: "الاسم الكامل مطلوب.",
    errCompany: "اسم الشركة مطلوب.",
    errEmail: "يرجى إدخال بريد إلكتروني صالح.",
    errPhone: "أدخل رقم جوال إماراتي صحيحًا: 9 أرقام تبدأ بـ 50 أو 52 أو 54 أو 55 أو 56 أو 58 (مثال: ‎50 123 4567).",
    errHelp: "يرجى إخبارنا كيف يمكننا مساعدتك.",
    errDocType: "نوع الملف غير مدعوم. ارفع ملف PDF أو Word أو PowerPoint أو Excel أو صورة.",
    errDocSize: "حجم الملف كبير جدًا (بحد أقصى 10 ميجابايت).",
    errDocUpload: "فشل رفع المستند. يرجى المحاولة مرة أخرى.",
    errWait: "يرجى الانتظار حتى يكتمل رفع المستند.",
    errDocCount: "يمكنك رفع حتى 5 مستندات.",
    errGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errNetwork: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
  },
};

const BLANK = { partnerType: "", fullName: "", companyName: "", email: "", phone: "", message: "" };
const FIELD_ORDER = ["partnerType", "fullName", "companyName", "email", "phone", "message"];
const DOC_MAX_COUNT = 5;
const BLANK_DOC = { status: "idle", name: "", type: "", url: "", progress: 0, error: "" };

function uploadToCloudinary(file, sig, onProgress) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", sig.apiKey);
    fd.append("timestamp", sig.timestamp);
    fd.append("signature", sig.signature);
    fd.append("folder", sig.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) resolve(data.secure_url);
        else reject(new Error("upload failed"));
      } catch {
        reject(new Error("upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("upload failed"));
    xhr.send(fd);
  });
}

/**
 * Site-wide partnership popup. Opened by every partner CTA via
 * usePartnershipForm() (see PartnershipFormProvider) — `config` is the
 * admin-editable copy from Settings → Partnership Form, `source` records which
 * button opened it.
 */
export default function PartnershipModal({ isOpen, onClose, config, source, initialType = "" }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = COPY[isAr ? "ar" : "en"];
  const dir = isAr ? "rtl" : "ltr";

  const [form, setForm] = useState(BLANK);
  // Up to DOC_MAX_COUNT files, each uploaded independently with its own progress.
  const [docs, setDocs] = useState([]);
  const [docError, setDocError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const fileRef = useRef(null);
  const formRef = useRef(null);

  // The button that opened the popup pre-selects the partner type
  // (Become a Parking Partner → parking, Become a Service Partner → service).
  useEffect(() => {
    if (isOpen) setForm((p) => ({ ...p, partnerType: initialType || p.partnerType }));
  }, [isOpen, initialType]);

  const heading = t(config, "heading", language) || c.heading;
  const subtitle = t(config, "subtitle", language) || c.subtitle;
  const successTitle = t(config, "successTitle", language) || c.successTitle;
  const successMessage = t(config, "successMessage", language) || c.successMessage;

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setFieldErrors((p) => (p[k] ? { ...p, [k]: "" } : p));
  };
  const errCls = (k) => (fieldErrors[k] ? errorInputClass : "");

  const close = () => {
    setForm(BLANK);
    setDocs([]);
    setDocError("");
    setDragOver(false);
    setDone(false);
    setError("");
    setFieldErrors({});
    setSubmitting(false);
    onClose();
  };

  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;
    setDocError("");
    const room = DOC_MAX_COUNT - docs.length;
    if (files.length > room) setDocError(c.errDocCount);
    files.slice(0, Math.max(room, 0)).forEach((file) => void uploadOne(file));
  }

  async function uploadOne(file) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const lower = file.name.toLowerCase();
    if (!DOC_EXTENSIONS.some((ext) => lower.endsWith(ext))) return setDocError(c.errDocType);
    if (file.size > DOC_MAX_BYTES) return setDocError(c.errDocSize);
    const patch = (next) => setDocs((p) => p.map((d) => (d.id === id ? { ...d, ...next } : d)));
    setDocs((p) => [...p, { ...BLANK_DOC, id, status: "uploading", name: file.name, type: file.type }]);
    try {
      const sigRes = await fetch(`${API}/api/partner-requests/document-signature`);
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok || !sig?.signature || !sig?.cloudName) throw new Error("signature");
      const url = await uploadToCloudinary(file, sig, (progress) => patch({ progress }));
      patch({ status: "done", url, progress: 100 });
    } catch {
      setDocs((p) => p.filter((d) => d.id !== id));
      setDocError(c.errDocUpload);
    }
  }

  function removeDoc(id) {
    setDocs((p) => p.filter((d) => d.id !== id));
    setDocError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    // Shared rules (src/lib/formValidation.js) + this form's specifics:
    // partner type chosen, UAE mobile (9 digits after the fixed +971).
    const errors = validateForm(form, {
      fullName: { label: c.fullName, required: true },
      companyName: { label: c.company, required: true },
      email: { label: c.email, required: true, email: true },
      message: { label: c.help, required: true },
    }, language);
    if (!form.partnerType) errors.partnerType = c.errType;
    if (!isValidUaeMobile(form.phone)) errors.phone = c.errPhone;
    if (errors.fullName) errors.fullName = c.errName;
    if (errors.companyName) errors.companyName = c.errCompany;
    if (errors.email) errors.email = c.errEmail;
    if (errors.message) errors.message = c.errHelp;
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      if (FIELD_ORDER.find((k) => errors[k]) === "partnerType") {
        formRef.current?.querySelector('[data-field="partnerType"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        focusFirstError(formRef.current, errors, FIELD_ORDER);
      }
      return;
    }
    if (docs.some((d) => d.status === "uploading")) return setError(c.errWait);

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/partner-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerType: form.partnerType,
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phone: formatUaeMobile(form.phone),
          message: form.message.trim(),
          documents: docs
            .filter((d) => d.status === "done" && d.url)
            .map((d) => ({ url: d.url, name: d.name, type: d.type })),
          source: source || "website",
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || c.errGeneric);
        return;
      }
      setDone(true);
    } catch {
      setError(c.errNetwork);
    } finally {
      setSubmitting(false);
    }
  }

  const labelCls = "mb-1 block text-[11px] font-medium text-slate-700";
  const req = <span className="text-red-500">*</span>;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={close}
      title={heading}
      subtitle={subtitle}
      done={done}
      successTitle={successTitle}
      successMessage={successMessage}
    >
      <form ref={formRef} onSubmit={submit} className="mt-5 space-y-3.5" dir={dir} noValidate>
        {/* Partner type — pre-selected by the button that opened the popup */}
        <div data-field="partnerType">
          <p className={labelCls}>{c.type} {req}</p>
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={c.type}>
            {[
              ["parking", c.typeParking, c.typeParkingHint],
              ["service", c.typeService, c.typeServiceHint],
            ].map(([value, label, hint]) => {
              const checked = form.partnerType === value;
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 transition ${
                    checked
                      ? "border-[#0088FF] bg-[rgba(0,136,255,0.06)]"
                      : fieldErrors.partnerType
                        ? "border-red-300 bg-white"
                        : "border-slate-200 bg-white hover:border-[#0088FF]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="partnerType"
                    value={value}
                    checked={checked}
                    onChange={() => set("partnerType", value)}
                    className="mt-0.5 h-4 w-4 accent-[#0088FF]"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#050A13]">{label}</span>
                    <span className="block text-[11px] leading-4 text-slate-500">{hint}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <FieldError message={fieldErrors.partnerType} />
        </div>

        <div>
          <label className={labelCls}>{c.fullName} {req}</label>
          <input
            name="fullName"
            aria-invalid={Boolean(fieldErrors.fullName)}
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={`${inputClass} ${errCls("fullName")}`}
            placeholder={c.fullNamePh}
            maxLength={120}
            autoComplete="name"
          />
          <FieldError message={fieldErrors.fullName} />
        </div>

        <div>
          <label className={labelCls}>{c.company} {req}</label>
          <input
            name="companyName"
            aria-invalid={Boolean(fieldErrors.companyName)}
            value={form.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            className={`${inputClass} ${errCls("companyName")}`}
            placeholder={c.companyPh}
            maxLength={160}
            autoComplete="organization"
          />
          <FieldError message={fieldErrors.companyName} />
        </div>

        <div>
          <label className={labelCls}>{c.email} {req}</label>
          <input
            type="email"
            name="email"
            aria-invalid={Boolean(fieldErrors.email)}
            dir="ltr"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${inputClass} ${errCls("email")} ${isAr ? "text-right" : ""}`}
            placeholder={c.emailPh}
            autoComplete="email"
          />
          <FieldError message={fieldErrors.email} />
        </div>

        <div>
          <label className={labelCls}>{c.phone} {req}</label>
          <UaePhoneInput
            size="md"
            value={form.phone}
            onChange={(v) => set("phone", v)}
            invalid={Boolean(fieldErrors.phone)}
            placeholder={c.phonePh}
          />
          <FieldError message={fieldErrors.phone} />
        </div>

        <div>
          <label className={labelCls}>{c.help} {req}</label>
          <textarea
            name="message"
            aria-invalid={Boolean(fieldErrors.message)}
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${inputClass} ${errCls("message")}`}
            placeholder={c.helpPh}
            maxLength={3000}
          />
          <FieldError message={fieldErrors.message} />
        </div>

        <div>
          <label className={labelCls}>
            {c.doc} <span className="font-normal text-slate-400">{c.optional}</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept={DOC_EXTENSIONS.join(",")}
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              handleFiles(files);
              e.target.value = "";
            }}
          />
          {docs.length > 0 ? (
            <ul className="mb-2 space-y-2">
              {docs.map((d) => (
                <li key={d.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2 text-xs text-slate-700">
                      {d.status === "uploading" ? (
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#0088FF]" aria-hidden />
                      ) : (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.12)]">
                          <Check className="h-3 w-3 text-[#0088FF]" strokeWidth={3} aria-hidden />
                        </span>
                      )}
                      <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                      <span className="truncate">
                        {d.name}
                        {d.status === "uploading" ? ` — ${c.uploading} ${d.progress}%` : ""}
                      </span>
                    </span>
                    <button type="button" onClick={() => removeDoc(d.id)} className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-red-500">
                      {c.remove}
                    </button>
                  </div>
                  {d.status === "uploading" ? (
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-[#0088FF] transition-[width] duration-200" style={{ width: `${d.progress}%` }} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {docs.length < DOC_MAX_COUNT ? (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer?.files);
              }}
              className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed px-4 text-center transition ${
                docs.length > 0 ? "py-3" : "py-5"
              } ${dragOver ? "border-[#0088FF] bg-[#EEF6FF]" : "border-slate-300 bg-slate-50 hover:border-[#0088FF]/60 hover:bg-[#F6FAFF]"}`}
            >
              <CloudUpload className={`h-6 w-6 ${dragOver ? "text-[#0088FF]" : "text-slate-400"}`} aria-hidden />
              <p className="text-xs font-medium text-slate-600">
                {docs.length > 0 ? c.docAddMore : c.docDrop}{" "}
                {docs.length > 0 ? null : <span className="font-semibold text-[#0088FF]">{c.docBrowse}</span>}
              </p>
              <p className="text-[10px] text-slate-400">{c.docHint}</p>
            </div>
          ) : null}
          {docError ? (
            <p className="mt-1.5 text-xs text-red-600" role="alert">{docError}</p>
          ) : null}
        </div>

        {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting || docs.some((d) => d.status === "uploading")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? c.submitting : c.submit}
        </button>
      </form>
    </ModalShell>
  );
}
