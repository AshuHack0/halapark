"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Check, X } from "lucide-react";
import { RECAPTCHA_SITE_KEY } from "@/config/recaptcha.site";

const ease = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5";

export default function JobApplicationModal({ isOpen, onClose, job }) {
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
  const recaptchaRef = useRef(null);

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
    recaptchaRef.current?.reset();
    onClose();
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

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
                    disabled={submitting}
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
