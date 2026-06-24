"use client";

import { useLanguage } from "@/context/LanguageContext";

import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactMapSection from "./ContactMapSection";
import WhatsAppSection from "./WhatsAppSection";

// Fixed UI copy (not CMS-driven) — translated inline.
const COPY = {
  en: {
    eyebrow: "Contact Us",
    heading: "Get In Touch With HalaPark",
    subtitle:
      "Have a question, want a demo, or ready to get started? Our team is here to help. Reach us through any of the channels below.",
  },
  ar: {
    eyebrow: "تواصل معنا",
    heading: "تواصل مع هالا بارك",
    subtitle:
      "هل لديك سؤال أو ترغب في عرض توضيحي أو أنت مستعد للبدء؟ فريقنا هنا للمساعدة. تواصل معنا عبر أي من القنوات أدناه.",
  },
};

export default function ContactSection() {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  return (
    <section className="bg-[linear-gradient(180deg,rgba(0,136,255,0.06)_0%,#FFFFFF_20%,#FFFFFF_100%)] pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
            {c.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl [overflow-wrap:anywhere]">
            {c.heading}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl [overflow-wrap:anywhere]">
            {c.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>

        <WhatsAppSection />
        <ContactMapSection />
      </div>
    </section>
  );
}
