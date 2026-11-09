"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Check, CloudUpload, Loader2, X } from "lucide-react";
import { RECAPTCHA_SITE_KEY } from "@/config/recaptcha.site";
import { validateForm, focusFirstError, errorInputClass } from "@/lib/formValidation";
import FieldError from "@/components/common/FieldError";

// Shared validation rules (src/lib/formValidation.js).
const GENERAL_RULES = {
  firstName: { label: "First name", required: true },
  lastName: { label: "Last name", required: true },
  email: { label: "Email address", required: true, email: true },
};

const ease = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5";

const CV_MAX_BYTES = 5 * 1024 * 1024;
const CV_EXTENSIONS = [".pdf", ".doc", ".docx", ".rtf", ".odt", ".txt"];

const HEAR_ABOUT_OPTIONS = [
  "LinkedIn",
  "Facebook",
  "Instagram",
  "TikTok",
  "Company Website",
  "Google / Search Engine",
  "Internal Employee",
  "Recruitment Agency",
  "Job Fair / Career Event",
  "Walk-in",
  "Other",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
// Oldest applicants ~1950; youngest sensible working age.
const YEARS = Array.from({ length: new Date().getFullYear() - 14 - 1950 + 1 }, (_, i) => new Date().getFullYear() - 14 - i);

// POST the file to Cloudinary with a signed payload; reports upload progress.
function uploadCvToCloudinary(file, sig, onProgress) {
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

/**
 * General "Join Our Team" application modal (not tied to a specific opening).
 * Fields per the client spec: CV upload (mandatory, drag & drop or browse),
 * first/last name, email (all mandatory), birth date (D/M/Y) and a
 * "How did you hear about us?" dropdown. Submits through the same
 * /api/job-application pipeline as per-job applications with
 * jobTitle "General Application".
 */
export default function GeneralApplicationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    hearAbout: "",
  });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  const cvBoxRef = useRef(null);
  // CV upload state: idle | uploading | done | error
  const [cv, setCv] = useState({ status: "idle", name: "", url: "", progress: 0, error: "" });
  const [dragOver, setDragOver] = useState(false);
  const recaptchaRef = useRef(null);
  const cvInputRef = useRef(null);

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
    setForm({ firstName: "", lastName: "", email: "", birthDay: "", birthMonth: "", birthYear: "", hearAbout: "" });
    setDone(false);
    setFormError("");
    setFieldErrors({});
    setSubmitting(false);
    setCv({ status: "idle", name: "", url: "", progress: 0, error: "" });
    setDragOver(false);
    recaptchaRef.current?.reset();
    onClose();
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const key = name.startsWith("birth") ? "birthDate" : name;
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function removeCv() {
    setCv({ status: "idle", name: "", url: "", progress: 0, error: "" });
    if (cvInputRef.current) cvInputRef.current.value = "";
  }

  async function handleCvFile(file) {
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      setCv({ status: "error", name: "", url: "", progress: 0, error: "Please upload a PDF or document file (PDF, DOC, DOCX, RTF, ODT, TXT)." });
      return;
    }
    if (file.size > CV_MAX_BYTES) {
      setCv({ status: "error", name: "", url: "", progress: 0, error: "File is too large (max 5MB)." });
      return;
    }

    setCv({ status: "uploading", name: file.name, url: "", progress: 0, error: "" });
    try {
      const sigRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/resume-signature`,
      );
      const sig = await sigRes.json().catch(() => ({}));
      if (!sigRes.ok || !sig?.signature || !sig?.cloudName) {
        throw new Error("Failed to get upload signature");
      }
      const secureUrl = await uploadCvToCloudinary(file, sig, (progress) => {
        setCv((prev) => (prev.status === "uploading" ? { ...prev, progress } : prev));
      });
      setCv({ status: "done", name: file.name, url: secureUrl, progress: 100, error: "" });
      setFormError("");
      setFieldErrors((prev) => ({ ...prev, cv: "" }));
    } catch {
      setCv({ status: "error", name: "", url: "", progress: 0, error: "CV upload failed. Please try again." });
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (cv.status === "uploading") return;
    handleCvFile(e.dataTransfer?.files?.[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    // Wait for the CV upload to finish before submitting.
    if (cv.status === "uploading") return;

    // Field checks (shared rules) + CV mandatory + birth date all-or-nothing.
    const errors = validateForm(form, GENERAL_RULES, "en");
    if (cv.status !== "done" || !cv.url) errors.cv = "Please upload your CV.";
    const birthParts = [form.birthDay, form.birthMonth, form.birthYear].filter(Boolean).length;
    if (birthParts > 0 && birthParts < 3) errors.birthDate = "Select day, month and year (or leave the birth date empty).";
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      if (errors.cv) {
        cvBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        focusFirstError(formRef.current, { ...errors, birthDay: errors.birthDate }, ["firstName", "lastName", "email", "birthDay"]);
      }
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

    const birthDate =
      form.birthDay && form.birthMonth && form.birthYear
        ? `${form.birthDay} ${form.birthMonth} ${form.birthYear}`
        : "";

    setSubmitting(true);
    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptchaToken,
          fullName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email,
          birthDate,
          hearAbout: form.hearAbout,
          jobTitle: "General Application",
          resumeUrl: cv.url,
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="general-apply-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
        <motion.div
          key="general-apply-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          className="relative z-10 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent sm:max-w-[560px] sm:rounded-[28px]"
        >
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 rtl:right-auto rtl:left-4"
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
                  Thank you for your interest in joining HalaPark. Our team will review your
                  application and get back to you soon.
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
                  Join Our Team
                </h2>
                <p className="mt-0.5 text-[0.78rem] text-slate-500 sm:text-[0.84rem]">
                  Fill in your details and upload your CV — we&apos;ll be in touch.
                </p>

                <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {/* CV upload — mandatory, drag & drop or browse */}
                  <div ref={cvBoxRef}>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Upload Your CV <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.rtf,.odt,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        handleCvFile(file);
                      }}
                      className="hidden"
                    />
                    {cv.status === "uploading" ? (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#0088FF]" aria-hidden />
                          <span className="truncate [overflow-wrap:anywhere]">
                            Uploading — {cv.name} ({cv.progress}%)
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-[#0088FF] transition-[width] duration-200"
                            style={{ width: `${cv.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : cv.status === "done" ? (
                      <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="flex min-w-0 items-center gap-2 text-xs text-slate-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.12)]">
                            <Check className="h-3 w-3 text-[#0088FF]" strokeWidth={3} aria-hidden />
                          </span>
                          <span className="truncate [overflow-wrap:anywhere]">{cv.name}</span>
                        </span>
                        <button
                          type="button"
                          onClick={removeCv}
                          className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => cvInputRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            cvInputRef.current?.click();
                          }
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
                          dragOver
                            ? "border-[#0088FF] bg-[#EEF6FF]"
                            : "border-slate-300 bg-slate-50 hover:border-[#0088FF]/60 hover:bg-[#F6FAFF]"
                        }`}
                      >
                        <CloudUpload className={`h-6 w-6 ${dragOver ? "text-[#0088FF]" : "text-slate-400"}`} aria-hidden />
                        <p className="text-xs font-medium text-slate-600">
                          Drag &amp; drop your CV here, or{" "}
                          <span className="font-semibold text-[#0088FF]">browse</span>
                        </p>
                        <p className="text-[10px] text-slate-400">PDF, DOC, DOCX, RTF, ODT or TXT — max 5MB</p>
                      </div>
                    )}
                    {cv.status === "error" && cv.error ? (
                      <p className="mt-1.5 text-xs text-red-600" role="alert">
                        {cv.error}
                      </p>
                    ) : null}
                    {cv.status !== "error" ? <FieldError message={fieldErrors.cv} /> : null}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder="First name"
                        aria-invalid={Boolean(fieldErrors.firstName)}
                        className={`${inputClass} ${fieldErrors.firstName ? errorInputClass : ""}`}
                      />
                      <FieldError message={fieldErrors.firstName} />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder="Last name"
                        aria-invalid={Boolean(fieldErrors.lastName)}
                        className={`${inputClass} ${fieldErrors.lastName ? errorInputClass : ""}`}
                      />
                      <FieldError message={fieldErrors.lastName} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@email.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className={`${inputClass} ${fieldErrors.email ? errorInputClass : ""}`}
                    />
                    <FieldError message={fieldErrors.email} />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      Birth Date
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <select name="birthDay" value={form.birthDay} onChange={onChange} className={inputClass}>
                        <option value="">Day</option>
                        {DAYS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <select name="birthMonth" value={form.birthMonth} onChange={onChange} className={inputClass}>
                        <option value="">Month</option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <select name="birthYear" value={form.birthYear} onChange={onChange} className={inputClass}>
                        <option value="">Year</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <FieldError message={fieldErrors.birthDate} />
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">
                      How did you hear about us?
                    </label>
                    <select name="hearAbout" value={form.hearAbout} onChange={onChange} className={inputClass}>
                      <option value="">Select an option</option>
                      {HEAR_ABOUT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
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
                    disabled={submitting || cv.status === "uploading"}
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
