"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { contactSubjects } from "./contactData";

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
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setIsSubmitted(false);
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-[rgba(0,136,255,0.06)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#0088FF]">
            Contact Form
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Send us a message
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-6 text-slate-500">
          Select the right subject so our team can respond faster.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {contactSubjects.map((subject) => (
          <span
            key={subject}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
          >
            {subject}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            id="phone"
            label="Phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormField
            id="company"
            label="Company (Optional)"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Subject
          </span>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10"
          >
            {contactSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Message
          </span>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us how we can help"
            className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-[#0088FF] focus:ring-4 focus:ring-[#0088FF]/10"
          />
        </label>

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-slate-500">
            This form UI is ready for backend integration whenever submission
            handling is connected.
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0088FF] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#0088FF]"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </div>

        {isSubmitted ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Thanks for reaching out. Your message has been captured in the UI
            and can be connected to your API next.
          </p>
        ) : null}
      </form>
    </div>
  );
}
