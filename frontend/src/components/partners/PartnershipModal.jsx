"use client";

import { useRef, useState } from "react";
import { Check, CloudUpload, FileText, Loader2 } from "lucide-react";
import { useLanguage, t } from "@/context/LanguageContext";
import { ModalShell, inputClass } from "@/components/business/BusinessLeadModals";

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
    phonePh: "50 000 0000",
    help: "How Can We Help?",
    helpPh: "Tell us about your partnership opportunity",
    doc: "Supporting Document",
    optional: "(Optional)",
    docDrop: "Drag & drop a file here, or",
    docBrowse: "browse",
    docHint: "PDF, Word, PowerPoint, Excel or image — max 10MB",
    uploading: "Uploading",
    remove: "Remove",
    submit: "Submit Request",
    submitting: "Submitting…",
    close: "Close",
    errName: "Full name is required.",
    errCompany: "Company name is required.",
    errEmail: "A valid email address is required.",
    errPhone: "Enter a valid phone number (digits only).",
    errHelp: "Please tell us how we can help.",
    errDocType: "Unsupported file type. Upload a PDF, Word, PowerPoint, Excel or image file.",
    errDocSize: "File is too large (max 10MB).",
    errDocUpload: "Document upload failed. Please try again.",
    errWait: "Please wait for the document to finish uploading.",
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
    phonePh: "50 000 0000",
    help: "كيف يمكننا مساعدتك؟",
    helpPh: "أخبرنا عن فرصة الشراكة",
    doc: "مستند داعم",
    optional: "(اختياري)",
    docDrop: "اسحب الملف وأفلته هنا، أو",
    docBrowse: "تصفّح",
    docHint: "PDF أو Word أو PowerPoint أو Excel أو صورة — بحد أقصى 10 ميجابايت",
    uploading: "جارٍ الرفع",
    remove: "إزالة",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    close: "إغلاق",
    errName: "الاسم الكامل مطلوب.",
    errCompany: "اسم الشركة مطلوب.",
    errEmail: "يرجى إدخال بريد إلكتروني صالح.",
    errPhone: "يرجى إدخال رقم هاتف صالح (أرقام فقط).",
    errHelp: "يرجى إخبارنا كيف يمكننا مساعدتك.",
    errDocType: "نوع الملف غير مدعوم. ارفع ملف PDF أو Word أو PowerPoint أو Excel أو صورة.",
    errDocSize: "حجم الملف كبير جدًا (بحد أقصى 10 ميجابايت).",
    errDocUpload: "فشل رفع المستند. يرجى المحاولة مرة أخرى.",
    errWait: "يرجى الانتظار حتى يكتمل رفع المستند.",
    errGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errNetwork: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
  },
};

const BLANK = { fullName: "", companyName: "", email: "", phone: "", message: "" };
const BLANK_DOC = { status: "idle", name: "", type: "", url: "", progress: 0, error: "" };

// UAE numbers are entered after the fixed +971 prefix. A leading 0 (common
// local habit, e.g. 050…) is dropped; the rest must be 8–9 digits.
function normalizeUaeDigits(raw) {
  return raw.replace(/\D/g, "").replace(/^0+/, "").slice(0, 9);
}

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
export default function PartnershipModal({ isOpen, onClose, config, source }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = COPY[isAr ? "ar" : "en"];
  const dir = isAr ? "rtl" : "ltr";

  const [form, setForm] = useState(BLANK);
  const [doc, setDoc] = useState(BLANK_DOC);
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const heading = t(config, "heading", language) || c.heading;
  const subtitle = t(config, "subtitle", language) || c.subtitle;
  const successTitle = t(config, "successTitle", language) || c.successTitle;
  const successMessage = t(config, "successMessage", language) || c.successMessage;

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const close = () => {
    setForm(BLANK);
    setDoc(BLANK_DOC);
    setDragOver(false);
    setDone(false);
    setError("");
    setSubmitting(false);
    onClose();
  };

  async function handleFile(file) {
    if (!file) return;
    const lower = file.name.toLowerCase();
    if (!DOC_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      setDoc({ ...BLANK_DOC, status: "error", error: c.errDocType });
      return;
    }
    if (file.size > DOC_MAX_BYTES) {
      setDoc({ ...BLANK_DOC, status: "error", error: c.errDocSize });
      return;
    }
    setDoc({ ...BLANK_DOC, status: "uploading", name: file.name, type: file.type });
    try {
      const sigRes = await fetch(`${API}/api/partner-requests/document-signature`);
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok || !sig?.signature || !sig?.cloudName) throw new Error("signature");
      const url = await uploadToCloudinary(file, sig, (progress) =>
        setDoc((p) => (p.status === "uploading" ? { ...p, progress } : p)),
      );
      setDoc({ status: "done", name: file.name, type: file.type, url, progress: 100, error: "" });
    } catch {
      setDoc({ ...BLANK_DOC, status: "error", error: c.errDocUpload });
    }
  }

  function removeDoc() {
    setDoc(BLANK_DOC);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.fullName.trim()) return setError(c.errName);
    if (!form.companyName.trim()) return setError(c.errCompany);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError(c.errEmail);
    if (!/^\d{8,9}$/.test(form.phone)) return setError(c.errPhone);
    if (!form.message.trim()) return setError(c.errHelp);
    if (doc.status === "uploading") return setError(c.errWait);

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/partner-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phone: `+971 ${form.phone}`,
          message: form.message.trim(),
          ...(doc.status === "done" && doc.url
            ? { document: { url: doc.url, name: doc.name, type: doc.type } }
            : {}),
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
      <form onSubmit={submit} className="mt-5 space-y-3.5" dir={dir} noValidate>
        <div>
          <label className={labelCls}>{c.fullName} {req}</label>
          <input
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={inputClass}
            placeholder={c.fullNamePh}
            maxLength={120}
            autoComplete="name"
          />
        </div>

        <div>
          <label className={labelCls}>{c.company} {req}</label>
          <input
            value={form.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            className={inputClass}
            placeholder={c.companyPh}
            maxLength={160}
            autoComplete="organization"
          />
        </div>

        <div>
          <label className={labelCls}>{c.email} {req}</label>
          <input
            type="email"
            dir="ltr"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${inputClass} ${isAr ? "text-right" : ""}`}
            placeholder={c.emailPh}
            autoComplete="email"
          />
        </div>

        <div>
          <label className={labelCls}>{c.phone} {req}</label>
          {/* Phone numbers always read left-to-right, even in Arabic. */}
          <div dir="ltr" className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-[#0088FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[rgba(0,136,255,0.12)]">
            <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-600">
              +971
            </span>
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => set("phone", normalizeUaeDigits(e.target.value))}
              className="w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              placeholder={c.phonePh}
              autoComplete="tel-national"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>{c.help} {req}</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className={inputClass}
            placeholder={c.helpPh}
            maxLength={3000}
          />
        </div>

        <div>
          <label className={labelCls}>
            {c.doc} <span className="font-normal text-slate-400">{c.optional}</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept={DOC_EXTENSIONS.join(",")}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              handleFile(file);
            }}
          />
          {doc.status === "uploading" ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#0088FF]" aria-hidden />
                <span className="truncate">{c.uploading} — {doc.name} ({doc.progress}%)</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-[#0088FF] transition-[width] duration-200" style={{ width: `${doc.progress}%` }} />
              </div>
            </div>
          ) : doc.status === "done" ? (
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="flex min-w-0 items-center gap-2 text-xs text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.12)]">
                  <Check className="h-3 w-3 text-[#0088FF]" strokeWidth={3} aria-hidden />
                </span>
                <FileText className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                <span className="truncate">{doc.name}</span>
              </span>
              <button type="button" onClick={removeDoc} className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-red-500">
                {c.remove}
              </button>
            </div>
          ) : (
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
                handleFile(e.dataTransfer?.files?.[0]);
              }}
              className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-5 text-center transition ${
                dragOver ? "border-[#0088FF] bg-[#EEF6FF]" : "border-slate-300 bg-slate-50 hover:border-[#0088FF]/60 hover:bg-[#F6FAFF]"
              }`}
            >
              <CloudUpload className={`h-6 w-6 ${dragOver ? "text-[#0088FF]" : "text-slate-400"}`} aria-hidden />
              <p className="text-xs font-medium text-slate-600">
                {c.docDrop} <span className="font-semibold text-[#0088FF]">{c.docBrowse}</span>
              </p>
              <p className="text-[10px] text-slate-400">{c.docHint}</p>
            </div>
          )}
          {doc.status === "error" && doc.error ? (
            <p className="mt-1.5 text-xs text-red-600" role="alert">{doc.error}</p>
          ) : null}
        </div>

        {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting || doc.status === "uploading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? c.submitting : c.submit}
        </button>
      </form>
    </ModalShell>
  );
}
