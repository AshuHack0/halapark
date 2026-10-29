"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowRight, Mail, PhoneCall } from "lucide-react";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { fetchPage } from "@/lib/cms";

export default function SupportContactCTA() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    fetchPage("home")
      .then((page) => setData(page?.sections?.supportCta ?? null))
      .finally(() => setResolved(true));
  }, []);

  if (!resolved) return null;
  if (data?.enabled === false) return null;
  // Hide the whole section when the admin has not filled it in.
  if (!data || (!data.heading && !data.eyebrow)) return null;

  const email = data.email || "";
  const phone = data.phone || "";
  const whatsappHref = data.whatsappHref || "";
  const contactMethods = [
    email ? { label: t(data, "emailLabel", language) || "Email", value: email, href: `mailto:${email}`, icon: Mail } : null,
    phone ? { label: t(data, "phoneLabel", language) || "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}`, icon: PhoneCall } : null,
  ].filter(Boolean);

  const contactLabel = t(data, "contactLabel", language) || (language === "ar" ? "" : "Contact Us");
  const whatsappLabel = t(data, "whatsappLabel", language) || (language === "ar" ? "" : "WhatsApp Us");
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#e9eef3] shadow-[0_28px_64px_rgba(15,23,42,0.16)]">
          {/* Phones/tablets: the photo is a strip at its own shape above the
              cards (it was cropped to a sliver behind tall stacked cards).
              lg+: full-bleed background behind the glass cards. */}
          {data.image ? (
            <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src={data.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}

          {/* Phones/tablets: photo, white panel and dark panel are one flush stack
              (no floating cards). lg+: glass cards over the full-bleed photo. */}
          <div className="relative grid lg:min-h-[520px] lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-10 lg:p-7">
            <div className="flex items-start">
              <div className="w-full bg-white p-6 sm:p-8 lg:mt-10 lg:max-w-[560px] lg:rounded-[1.75rem] lg:border lg:border-white/60 lg:bg-white/35 lg:shadow-[0_30px_60px_rgba(15,23,42,0.12)] lg:backdrop-blur-[3px]" dir={dir}>
                {t(data, "eyebrow", language) ? (
                  <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#0088FF] sm:text-[14px] [overflow-wrap:anywhere]">
                    {t(data, "eyebrow", language)}
                  </p>
                ) : null}
                <div className="relative mt-5 max-w-3xl">
                  <h2 className="text-3xl font-medium leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-[3.1rem] [overflow-wrap:anywhere]">
                    {t(data, "heading", language)}
                    {t(data, "headingAccent", language) ? (
                      <>{" "}<span className="text-[#0088FF]">{t(data, "headingAccent", language)}</span></>
                    ) : null}
                  </h2>
                </div>

                {t(data, "description", language) ? (
                  <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-700 sm:text-base lg:text-slate-900 lg:[text-shadow:0_1px_10px_rgba(255,255,255,0.85)] [overflow-wrap:anywhere]">
                    <RichText text={t(data, "description", language)} />
                  </p>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {contactLabel ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0088FF]"
                    >
                      {contactLabel}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  ) : null}

                  {whatsappHref && whatsappLabel ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-[rgba(0,136,255,0.16)] hover:bg-[rgba(0,136,255,0.08)]"
                    >
                      <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                      {whatsappLabel}
                    </a>
                  ) : null}
                </div>

                {contactMethods.length > 0 ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {contactMethods.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4 transition hover:border-[rgba(0,136,255,0.16)] hover:bg-white lg:border-white/60 lg:bg-white/30"
                        >
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,136,255,0.08)] text-[#0088FF]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 lg:text-slate-700">{item.label}</span>
                            <span className="mt-1 block text-[15px] font-medium text-slate-900 [overflow-wrap:anywhere] sm:text-base">{item.value}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-end lg:justify-end">
              <div className="w-full bg-[#0A1B33] p-6 text-white sm:p-8 lg:mb-6 lg:max-w-sm lg:rounded-[1.75rem] lg:border lg:border-white/30 lg:bg-slate-950/15 lg:p-6 lg:shadow-[0_24px_60px_rgba(15,23,42,0.26)] lg:backdrop-blur-[3px]" dir={dir}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] [overflow-wrap:anywhere]">
                      {t(data, "supportEyebrow", language) || (language === "ar" ? "" : "Support")}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl [overflow-wrap:anywhere]">
                      {t(data, "supportTitle", language) || (language === "ar" ? "" : "Talk to the team directly")}
                    </p>
                  </div>
                  <span className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-100 sm:inline-flex">
                    <PhoneCall className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>

                {contactMethods.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    {contactMethods.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 transition hover:border-cyan-300/35 hover:bg-white/14"
                        >
                          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-100">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">{item.label}</span>
                            <span className="mt-1 block text-[15px] font-medium text-white [overflow-wrap:anywhere] sm:text-lg">{item.value}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
