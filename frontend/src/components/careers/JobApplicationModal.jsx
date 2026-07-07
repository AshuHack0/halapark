"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Check, Loader2, Paperclip, X } from "lucide-react";
import { RECAPTCHA_SITE_KEY } from "@/config/recaptcha.site";
import { useLanguage } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5";

// Resume upload — bilingual labels (inline EN/AR, matching the page's label pattern).
const RESUME_TEXT = {
  label: { en: "Resume / CV", ar: "السيرة الذاتية" },
  choose: { en: "Upload your resume", ar: "ارفع سيرتك الذاتية" },
  hint: { en: "PDF, DOC or DOCX — max 5MB", ar: "PDF أو DOC أو DOCX — بحد أقصى 5 ميجابايت" },
  uploading: { en: "Uploading", ar: "جارٍ الرفع" },
  remove: { en: "Remove", ar: "إزالة" },
  errorType: { en: "Please upload a PDF, DOC, or DOCX file.", ar: "يرجى رفع ملف بصيغة PDF أو DOC أو DOCX." },
  errorSize: { en: "File is too large (max 5MB).", ar: "حجم الملف كبير جدًا (بحد أقصى 5 ميجابايت)." },
  errorUpload: { en: "Resume upload failed. Please try again.", ar: "فشل رفع السيرة الذاتية. يرجى المحاولة مرة أخرى." },
};

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

// POST the file to Cloudinary with a signed payload; reports upload progress.
function uploadResumeToCloudinary(file, sig, onProgress) {
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
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject(new Error("Cloudinary upload failed"));
        }
      } catch {
        reject(new Error("Cloudinary upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Cloudinary upload failed"));
    xhr.send(fd);
  });
}

export default function JobApplicationModal({ isOpen, onClose, job }) {
  const { language } = useLanguage();
  const rt = (key) => RESUME_TEXT[key]?.[language === "ar" ? "ar" : "en"] ?? "";
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    linkedIn: "",
  });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  // Resume upload state: idle | uploading | done | error
  const [resume, setResume] = useState({ status: "idle", name: "", url: "", progress: 0, error: "" });
  const recaptchaRef = useRef(null);
  const resumeInputRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const fn = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen]);

  function handleClose() {
    setForm({ fullName: "", email: "", phone: "", location: "", message: "", linkedIn: "" });
    setDone(false);
    setFormError("");
    setSubmitting(false);
    setResume({ status: "idle", name: "", url: "", progress: 0, error: "" });
    recaptchaRef.current?.reset();
    onClose();
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function removeResume() {
    setResume({ status: "idle", name: "", url: "", progress: 0, error: "" });
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }

  async function handleResumeChange(e) {
    const file = e.target.files?.[0];
    // Allow re-selecting the same file after a remove/error.
    e.target.value = "";
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!RESUME_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      setResume({ status: "error", name: "", url: "", progress: 0, error: rt("errorType") });
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResume({ status: "error", name: "", url: "", progress: 0, error: rt("errorSize") });
      return;
    }

    setResume({ status: "uploading", name: file.name, url: "", progress: 0, error: "" });
    try {
      const sigRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/resume-signature`,
      );
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok || !sig?.signature || !sig?.cloudName) {
        throw new Error("Failed to get upload signature");
      }
      const secureUrl = await uploadResumeToCloudinary(file, sig, (progress) => {
        setResume((prev) =>
          prev.status === "uploading" ? { ...prev, progress } : prev,
        );
      });
      setResume({ status: "done", name: file.name, url: secureUrl, progress: 100, error: "" });
    } catch {
      setResume({ status: "error", name: "", url: "", progress: 0, error: rt("errorUpload") });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    // Wait for the resume upload to finish before submitting.
    if (resume.status === "uploading") return;

    if (!job?.title) {
      setFormError("Job details are missing. Please refresh and try again.");
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setFormError("reCAPTCHA is not configured.");
      return;
    }

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setFormError("Please complete the captcha.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recaptchaToken,
          jobTitle: job.title,
          department: job.department ?? "",
          resumeUrl: resume.url || "",
        }),
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
  }

  if (!isOpen || !job) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="job-apply-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <motion.div
          key="job-apply-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          className="relative z-10 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:hidden sm:max-w-[560px] sm:rounded-[28px]"
        >
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-4 pb-4 pt-4 sm:px-8 sm:pb-8 sm:pt-6">
            {done ? (
              <div className="flex flex-col items-center py-6 text-center sm:py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-16 sm:w-16">
                  <Check className="h-7 w-7 text-[#0088FF] sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-5 sm:text-2xl">
                  Application Submitted!
                </h2>
                <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:mt-3 sm:text-sm sm:leading-7">
                  Thank you for applying for {job.title}. Our team will review your application and
                  get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 sm:mt-6 sm:py-3"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
                  Careers
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-2 sm:text-2xl">
                  Apply for {job.title}
                </h2>
                <p className="mt-0.5 text-[0.78rem] text-slate-500 sm:text-[0.84rem]">
                  Fill in your details and we&apos;ll be in touch.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+971 50 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Your location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      placeholder="City, country"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      LinkedIn profile
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={form.linkedIn}
                      onChange={onChange}
                      placeholder="https://linkedin.com/in/..."
                      className={inputClass}
                    />
                  </div>

                  <div dir={language === "ar" ? "rtl" : "ltr"}>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      {rt("label")}
                    </label>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                    {resume.status === "uploading" ? (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:rounded-xl sm:px-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#0088FF]" aria-hidden />
                          <span className="truncate [overflow-wrap:anywhere]">
                            {rt("uploading")} — {resume.name} ({resume.progress}%)
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0088FF] transition-[width] duration-200"
                            style={{ width: `${resume.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : resume.status === "done" ? (
                      <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:rounded-xl sm:px-4">
                        <span className="flex min-w-0 items-center gap-2 text-xs text-slate-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.12)]">
                            <Check className="h-3 w-3 text-[#0088FF]" strokeWidth={3} aria-hidden />
                          </span>
                          <span className="truncate [overflow-wrap:anywhere]">{resume.name}</span>
                        </span>
                        <button
                          type="button"
                          onClick={removeResume}
                          className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-red-500"
                        >
                          {rt("remove")}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        className="flex w-full items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-500 transition hover:border-[#0088FF]/60 hover:text-[#0088FF] sm:rounded-xl sm:px-4"
                      >
                        <Paperclip className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>{rt("choose")}</span>
                        <span className="ms-auto text-[10px] text-slate-400">{rt("hint")}</span>
                      </button>
                    )}
                    {resume.status === "error" && resume.error ? (
                      <p className="mt-1.5 text-xs text-red-600" role="alert">
                        {resume.error}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Cover message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      rows={4}
                      placeholder="Tell us why you're a great fit..."
                      className={inputClass}
                    />
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
                        reCAPTCHA is not configured.
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
                    disabled={submitting || resume.status === "uploading"}
                    className="w-full rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.22)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5"
                  >
                    {submitting ? "Submitting…" : "Submit Application"}
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
