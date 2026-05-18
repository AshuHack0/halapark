"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  X, ArrowUpRight, Check, Shield, Camera, BadgeCheck,
  CreditCard, Lock, ChevronRight, MapPin, Clock, ParkingCircle, ArrowRight, Zap,
  Building2, Home, Plane,
} from "lucide-react";
import { allServicesData, serviceNames } from "./allServicesData";

/* ─── Springs & easing ─── */
const springPop  = { type: "spring", stiffness: 380, damping: 24, mass: 0.85 };
const springSoft = { type: "spring", stiffness: 120, damping: 20 };
const ease       = [0.22, 1, 0.36, 1];

/* ═══════════════════════════ SERVICE MODAL ══════════════════════════ */

function ServiceModal({ service, onClose }) {
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [service]);

  useLayoutEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="svc-modal-bg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          key="svc-modal-panel"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:hidden sm:max-w-[640px] sm:rounded-[28px]"
        >
          {/* Drag handle — mobile only */}
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          {/* Close */}
          <button
            type="button" onClick={onClose} aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/28 text-white backdrop-blur-sm transition hover:bg-black/48"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Media — shorter on mobile */}
          <div className="relative h-40 w-full overflow-hidden rounded-t-[26px] bg-[#d2dae2] sm:h-60 sm:rounded-t-[28px]">
            {service.mediaType === "video" ? (
              <video src={service.mediaSrc} autoPlay={!reduced} loop muted playsInline preload="metadata" className="h-full w-full object-cover" />
            ) : (
              <img src={service.mediaSrc} alt={service.name} className="h-full w-full object-cover" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06111f]/50 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="rounded-full bg-[#0088FF] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-[0_4px_14px_rgba(0,136,255,0.35)]">
                Service {String(service.id).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="px-4 pt-4 sm:px-8 sm:pt-6">
            <h2 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-[#050A13] sm:text-[1.85rem]">{service.name}</h2>
            <p className="mt-2 text-[0.8rem] leading-6 text-slate-500 sm:mt-3 sm:text-[0.94rem] sm:leading-7">{service.fullDesc}</p>

            {/* What's Included */}
            <div className="mt-4 sm:mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">What&apos;s Included</p>
              <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2.5">
                {service.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-5 sm:w-5">
                      <Check className="h-2.5 w-2.5 text-[#0088FF] sm:h-3 sm:w-3" />
                    </span>
                    <span className="text-[0.78rem] leading-5 text-slate-700 sm:text-[0.84rem] sm:leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-categories */}
            {service.subCategories?.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Service Categories</p>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                  {service.subCategories.map((cat) => (
                    <span key={cat} className="rounded-full border border-[rgba(0,136,255,0.2)] bg-[rgba(0,136,255,0.06)] px-2.5 py-1 text-[11px] font-medium text-[#0078E0] sm:px-3 sm:py-1.5 sm:text-xs">{cat}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Packages */}
            {service.packages?.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Storage Packages</p>
                <div className="mt-2 space-y-2 sm:mt-3 sm:space-y-3">
                  {service.packages.map((pkg) => (
                    <div key={pkg.name} className="rounded-xl border border-[rgba(0,136,255,0.14)] bg-[#f4f9ff] p-3 sm:rounded-2xl sm:p-4">
                      <p className="text-sm font-semibold text-[#050A13]">{pkg.name}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{pkg.desc}</p>
                      <ul className="mt-1.5 space-y-1">
                        {pkg.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-[11px] text-slate-600 sm:text-xs">
                            <Check className="h-2.5 w-2.5 flex-shrink-0 text-[#0088FF]" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* spacer so content doesn't hide behind sticky bar */}
            <div className="h-4 sm:h-0" />
          </div>

          {/* CTA — sticky at bottom of scroll area so always visible */}
          <div className="sticky bottom-0 z-10 flex gap-2 border-t border-slate-100 bg-white px-4 py-3 sm:static sm:gap-3 sm:border-none sm:px-8 sm:pb-8 sm:pt-6">
            <Link
              href="/contact" onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-full bg-[#0088FF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,136,255,0.28)] transition hover:brightness-95 sm:flex-none sm:px-7 sm:py-3"
            >
              Book the Service
            </Link>
            <button type="button" onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 sm:flex-none sm:px-6 sm:py-3"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════ QUOTE MODAL ════════════════════════════ */

const BLANK_FORM = { fullName: "", companyName: "", email: "", phone: "", service: "", tower: "", slots: "", notRobot: false };

function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState(BLANK_FORM);
  const [done, setDone]   = useState(false);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useLayoutEffect(() => {
    const fn = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleClose = () => { setForm(BLANK_FORM); setDone(false); onClose(); };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="quote-bg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          key="quote-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.12),0_40px_100px_rgba(15,23,42,0.32)] [&::-webkit-scrollbar]:hidden sm:max-w-[560px] sm:rounded-[28px]"
        >
          {/* Drag handle — mobile only */}
          <div className="sticky top-0 z-20 flex justify-center bg-white pt-3 pb-1 sm:hidden">
            <span className="h-1 w-10 rounded-full bg-slate-200" />
          </div>

          <button type="button" onClick={handleClose} aria-label="Close"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="px-4 pb-4 pt-4 sm:px-8 sm:pt-6 sm:pb-8">
            {done ? (
              <div className="flex flex-col items-center py-6 text-center sm:py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)] sm:h-16 sm:w-16">
                  <Check className="h-7 w-7 text-[#0088FF] sm:h-8 sm:w-8" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-5 sm:text-2xl">Request Received!</h2>
                <p className="mt-2 text-[0.82rem] leading-6 text-slate-500 sm:mt-3 sm:text-sm sm:leading-7">Our team will review your request and get back to you within 24 hours.</p>
                <button type="button" onClick={handleClose}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0088FF] px-7 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 sm:mt-6 sm:py-3"
                >Close</button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0088FF]">Long-Term Parking</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#050A13] sm:mt-2 sm:text-2xl">Get a Quote</h2>
                <p className="mt-0.5 text-[0.78rem] text-slate-500 sm:text-[0.84rem]">Fill in the details and our team will be in touch.</p>

                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {/* compact input style shared */}
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {[["fullName","Full Name","John Smith","text",true],["companyName","Company Name","Acme Corp","text",false]].map(([name,label,ph,type,req]) => (
                      <div key={name}>
                        <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">{label}{req && <span className="ml-0.5 text-red-500">*</span>}</label>
                        <input required={req} type={type} name={name} value={form[name]} onChange={onChange} placeholder={ph}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {[["email","Email Address","john@company.com","email",true],["phone","Phone Number","+971 50 000 0000","tel",true]].map(([name,label,ph,type,req]) => (
                      <div key={name}>
                        <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">{label}{req && <span className="ml-0.5 text-red-500">*</span>}</label>
                        <input required={req} type={type} name={name} value={form[name]} onChange={onChange} placeholder={ph}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Select Service <span className="text-red-500">*</span></label>
                    <select required name="service" value={form.service} onChange={onChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                    >
                      <option value="">Choose a service…</option>
                      {serviceNames.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Tower / Location</label>
                      <input type="text" name="tower" value={form.tower} onChange={onChange} placeholder="Tower or address"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-slate-700 sm:mb-1.5 sm:text-xs">Slots Needed</label>
                      <input type="number" min="1" name="slots" value={form.slots} onChange={onChange} placeholder="e.g. 10"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0088FF] focus:bg-white focus:ring-2 focus:ring-[rgba(0,136,255,0.12)] sm:rounded-xl sm:px-4 sm:py-2.5"
                      />
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:rounded-xl sm:px-4 sm:py-3">
                    <input required type="checkbox" name="notRobot" checked={form.notRobot} onChange={onChange} className="h-4 w-4 accent-[#0088FF]" />
                    <span className="text-[0.82rem] text-slate-700 sm:text-sm">I&apos;m not a robot</span>
                    <div className="ml-auto flex flex-col items-center">
                      <div className="h-7 w-7 rounded bg-[rgba(0,136,255,0.08)] sm:h-8 sm:w-8" />
                      <p className="mt-0.5 text-[9px] text-slate-400">reCAPTCHA</p>
                    </div>
                  </label>
                  <button type="submit"
                    className="w-full rounded-full bg-[#0088FF] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,136,255,0.22)] transition hover:brightness-95 sm:py-3.5"
                  >Submit Request</button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════ SERVICE CARD ═══════════════════════════ */

const CAT_META = {
  parking: { label: "Parking",      color: "#0088FF", bg: "rgba(0,136,255,0.12)"  },
  valet:   { label: "Valet",        color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
  care:    { label: "Vehicle Care", color: "#16B364", bg: "rgba(22,179,100,0.12)" },
};

function ServiceCard({ service, index, onClick, category }) {
  const reduced = useReducedMotion();
  const col = index % 4;
  const cat = CAT_META[category] || CAT_META.parking;

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(3px)", transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.06, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.52, ease, delay: col * 0.06 }}
      whileHover={reduced ? undefined : { y: -8, scale: 1.02, transition: springSoft }}
      style={{ transformPerspective: 1200 }}
      className="group/card relative cursor-pointer"
      onClick={() => onClick(service)}
    >
      {/* Card shell */}
      <div className="relative overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_1px_3px_rgba(6,6,22,0.06),0_8px_32px_-8px_rgba(0,136,255,0.08)] transition-shadow duration-300 group-hover/card:shadow-[0_4px_8px_rgba(6,6,22,0.06),0_20px_48px_-8px_rgba(0,136,255,0.18)]">

        {/* Top accent line — category colour */}
        <div className="absolute inset-x-0 top-0 z-20 h-[2.5px] rounded-t-[20px]"
          style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }} />

        {/* Shimmer sweep */}
        {!reduced && (
          <span className="svc-shimmer pointer-events-none absolute -left-1/2 top-0 z-20 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:opacity-100" />
        )}

        {/* Hover blue glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}14, transparent 68%)` }} />

        {/* Media */}
        <div className="relative h-[185px] w-full overflow-hidden bg-[#d2dae2]">
          {service.mediaType === "video" ? (
            <video
              src={service.mediaSrc}
              autoPlay={!reduced}
              loop muted playsInline preload="metadata"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          ) : (
            <img
              src={service.mediaSrc}
              alt={service.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.07]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Number badge — bottom-left of media */}
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Category pill — top-right of media */}
          <div className="absolute right-2.5 top-2.5 z-10">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide backdrop-blur-sm"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.label}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pb-5 pt-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-[#050A13]">
              {service.name}
            </h3>
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-200 group-hover/card:border-transparent group-hover/card:text-white"
              style={{ "--hover-bg": cat.color }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors duration-200 group-hover/card:[color:var(--hover-bg)]" />
            </span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[0.775rem] leading-5 text-slate-400">
            {service.shortDesc}
          </p>

          {/* Read more row */}
          <div
            className="mt-3.5 flex items-center justify-between border-t border-slate-50 pt-3"
          >
            <span className="flex items-center gap-1 text-[11px] font-semibold transition-all duration-200 opacity-0 translate-x-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5"
              style={{ color: cat.color }}>
              Read More <ChevronRight className="h-3 w-3" />
            </span>
            {service.packages && (
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderColor: `${cat.color}33`, color: cat.color, background: cat.bg }}>
                Packages
              </span>
            )}
            {service.subCategories && !service.packages && (
              <span className="rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderColor: `${cat.color}33`, color: cat.color, background: cat.bg }}>
                {service.subCategories.length} Types
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════ HERO PHONE ══════════════════════════════ */

function SvcHeroPhone({ reduced }) {
  return (
    <div className="relative flex items-center justify-center">

      {/* Deep glow halo behind phone */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.18),rgba(37,99,235,0.08)_50%,transparent_75%)] blur-2xl lg:h-[440px] lg:w-[440px]" />

      {/* Outer slow-rotating dashed orbit ring */}
      {!reduced && (
        <div
          aria-hidden
          className="svc-orbit-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[310px] w-[310px] rounded-full border border-dashed border-[#0088FF]/18 lg:h-[420px] lg:w-[420px]"
        />
      )}

      {/* Inner counter-rotating ring */}
      {!reduced && (
        <div
          aria-hidden
          className="svc-orbit-ring-rev pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] rounded-full border border-[#0088FF]/10 lg:h-[340px] lg:w-[340px]"
          style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(0,136,255,0.12) 85%, transparent 100%)" }}
        />
      )}

      {/* ── Floating card: Service Booked — top-left ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16, rotate: -6 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.3 }}
        className="absolute left-[-2%] top-6 z-30 hidden sm:block lg:left-[-12%] lg:top-10"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-3 py-2.5 shadow-[0_16px_40px_rgba(15,23,42,0.13)]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0088FF] to-[#2563EB] text-white shadow-[0_4px_10px_rgba(0,136,255,0.35)]">
            <ParkingCircle aria-hidden className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">Service Booked</p>
            <p className="text-[10px] text-[#667085]">Valet — Dubai Mall</p>
          </div>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16B364] text-white">
            <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
          </span>
        </div>
        {/* Dashed connector */}
        <svg className="ml-10 mt-1" width="66" height="34" viewBox="0 0 66 34" fill="none" aria-hidden>
          <path d="M2 2C16 26 44 40 64 14" stroke="#0088FF" strokeWidth="1.3" strokeDasharray="4 4" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ── Services list card — right ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 22, rotate: 4 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.4 }}
        className="absolute right-[-2%] top-[22%] z-30 hidden md:block lg:right-[-12%]"
      >
        <div className="w-[152px] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.13)]">
          <div className="bg-gradient-to-r from-[#0078E0] to-[#2563EB] px-3 py-2.5">
            <p className="text-[11px] font-bold text-white">18 Services</p>
            <p className="text-[9px] text-white/70">Unified platform</p>
          </div>
          {[
            { label: "Self-Parking",  color: "#0088FF" },
            { label: "Valet Service", color: "#2563EB" },
            { label: "EV Charging",   color: "#16B364" },
            { label: "Car Storage",   color: "#F59E0B" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 border-b border-slate-50 px-3 py-1.5 last:border-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: item.color }} />
              <p className="text-[10px] font-medium text-[#1a1f2e]">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── EV Charging progress — bottom-right ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16, rotate: 5 }}
        animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.5 }}
        className="absolute bottom-[14%] right-[0%] z-30 hidden sm:block lg:right-[-8%]"
      >
        <div className="w-[162px] rounded-2xl border border-white/80 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.13)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Zap aria-hidden className="h-3.5 w-3.5 text-[#16B364]" fill="currentColor" />
              <p className="text-[11px] font-semibold text-[#050A13]">EV Charging</p>
            </div>
            <span className="rounded-full bg-[rgba(22,179,100,0.1)] px-1.5 py-0.5 text-[9px] font-bold text-[#16B364]">Live</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#0088FF] to-[#16B364]"
              initial={{ width: "0%" }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.7 }}
            />
          </div>
          <div className="mt-1.5 flex justify-between">
            <p className="text-[9px] text-slate-400">68% charged</p>
            <p className="text-[9px] font-semibold text-[#0088FF]">~22 min</p>
          </div>
        </div>
      </motion.div>

      {/* ── Pulsing location pin ── */}
      {!reduced && (
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[52%] z-30 hidden text-[#0088FF] sm:block"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full bg-[#0088FF]/12"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <MapPin aria-hidden className="h-10 w-10 drop-shadow-[0_8px_16px_rgba(0,136,255,0.4)]" fill="currentColor" />
          </div>
          <span className="mt-1 block h-1.5 w-8 rounded-full bg-[#0088FF]/20 blur-sm" />
        </motion.div>
      )}

      {/* ── Phone mockup ── */}
      <motion.div
        animate={reduced ? undefined : { y: [0, -11, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-[210px] rotate-[5deg] sm:w-[255px] lg:w-[300px] xl:w-[328px]"
      >
        {/* Bottom shadow */}
        <div className="absolute inset-x-[18%] bottom-[-2%] h-[8%] rounded-full bg-[#0F172A]/16 blur-[18px]" />

        <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_32px_60px_rgba(5,10,19,0.28)]">
          {/* Screen */}
          <div className="absolute bottom-[1.2%] left-[4.2%] right-[4.2%] top-[1%] z-20 translate-y-[1px] overflow-hidden rounded-[3.2rem] bg-white">
            <Image
              src="/Park.png"
              alt="HalaPark services screen"
              fill
              sizes="(min-width: 1280px) 328px, (min-width: 1024px) 300px, (min-width: 640px) 255px, 210px"
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Frame */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <Image
              src="/mobileframe.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 328px, (min-width: 1024px) 300px, (min-width: 640px) 255px, 210px"
              className="select-none object-contain"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════ HERO SECTION ════════════════════════════ */

function HeroSection({ onGetQuote }) {
  const sectionRef = useRef(null);
  const reduced    = useReducedMotion();

  /* Mouse spotlight */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 35, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 35, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(42% 38% at ${smoothX}px ${smoothY}px, rgba(0,136,255,0.16), rgba(37,99,235,0.08) 38%, transparent 72%)`;

  /* Scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: reduced ? 500 : 72, damping: reduced ? 80 : 22, mass: 0.28 });

  const parallaxA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -44]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0,  58]);
  const parallaxC = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -28]);
  const orbitRot  = useTransform(sp, [0, 1], reduced ? [0, 0] : [0, 108]);
  const gridFade  = useTransform(sp, [0, 0.25, 0.5, 0.75, 1], reduced ? [0.55,0.55,0.55,0.55,0.55] : [0.42, 0.58, 0.62, 0.55, 0.44]);
  const spotStr   = useTransform(sp, [0, 0.45, 0.55, 1], reduced ? [0.9,0.9,0.9,0.9] : [0.72, 1, 1, 0.78]);
  const readProg  = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true });

  const onMove = (e) => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };
  const onLeave = () => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.38);
  };

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseX.set(r.width * 0.5);
    mouseY.set(r.height * 0.36);
  }, [reduced, mouseX, mouseY]);

  /* Stagger variants */
  const container = reduced ? {} : {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp = reduced ? {} : {
    variants: {
      hidden:   { opacity: 0, y: 26 },
      visible:  { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
    },
  };

  const SERVICE_CHIPS = ["Self-Parking", "Valet Service", "EV Charging", "Car Storage", "Airport Parking", `+${allServicesData.length - 5} More`];
  const AVATAR_COLORS = ["#0088FF", "#2563EB", "#16B364", "#F59E0B"];

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/hero relative overflow-hidden bg-[#F4F8FF] py-16 sm:py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center"
    >
      {/* Rich layered background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#EBF4FF_0%,#F8FBFF_35%,#F0F7FF_65%,#EAF3FF_100%)]" />

      {/* Dot grid */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: gridFade }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.055)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_40%,black,transparent)]" />
      </motion.div>

      {/* Mouse spotlight */}
      {!reduced && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: spotlight, opacity: spotStr }} />
      )}

      {/* Large decorative arc top-right */}
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(0,136,255,0.11),rgba(37,99,235,0.05)_50%,transparent_72%)] blur-xl" />

      {/* Parallax blobs */}
      <motion.div aria-hidden style={{ y: parallaxA }} className="pointer-events-none absolute -left-24 top-[14%] z-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_38%_38%,rgba(0,136,255,0.13),transparent_68%)] blur-2xl" />
      <motion.div aria-hidden style={{ y: parallaxB }} className="pointer-events-none absolute -right-32 bottom-[4%] z-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(37,99,235,0.10),transparent_66%)] blur-2xl" />
      <motion.div aria-hidden style={{ y: parallaxC }} className="pointer-events-none absolute left-[55%] top-[20%] z-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_60%)] blur-3xl" />

      {/* Floating particles */}
      {!reduced && (
        <>
          <motion.div aria-hidden className="pointer-events-none absolute right-[6%] top-[22%] z-0 h-3 w-3 rounded-full bg-[#0088FF]/40"
            animate={{ y: [0,-14,0], opacity:[0.4,0.9,0.4], scale:[1,1.2,1] }}
            transition={{ duration: 5, repeat: Infinity, ease:"easeInOut" }} />
          <motion.div aria-hidden className="pointer-events-none absolute left-[10%] bottom-[30%] z-0 h-2 w-2 rounded-full bg-[#2563EB]/38"
            animate={{ y:[0,13,0], opacity:[0.3,0.72,0.3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease:"easeInOut", delay:0.6 }} />
          <motion.div aria-hidden className="pointer-events-none absolute right-[24%] bottom-[20%] z-0 h-2.5 w-2.5 rounded-full bg-[#0ea5e9]/32"
            animate={{ scale:[1,1.45,1], opacity:[0.25,0.62,0.25] }}
            transition={{ duration: 3.5, repeat: Infinity, ease:"easeInOut", delay:0.2 }} />
          <motion.div aria-hidden className="pointer-events-none absolute left-[40%] top-[10%] z-0 h-1.5 w-1.5 rounded-full bg-[#0088FF]/28"
            animate={{ y:[0,-10,0], x:[0,6,0], opacity:[0.2,0.55,0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease:"easeInOut", delay:1.2 }} />
        </>
      )}

      {/* Conic orbit — offset to phone side */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-10%] z-0 h-[min(100vw,720px)] w-[min(100vw,720px)] opacity-[0.07]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, transparent, rgba(0,136,255,0.35), transparent, rgba(37,99,235,0.25), transparent)",
          ...(reduced ? {} : { rotate: orbitRot }),
        }}
      />

      {/* Top border line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[#0088FF]/20 to-transparent" />

      {/* ══ CONTENT ══ */}
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 xl:gap-24">

          {/* ─── LEFT — text ─── */}
          <motion.div initial={reduced ? false : "hidden"} animate="visible" variants={container}>

            {/* Badge */}
            <motion.div {...fadeUp}>
              <div className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[#0088FF]/30 bg-white/80 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,136,255,0.10)] backdrop-blur-md">
                {/* Glow sweep */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#0088FF]/10 to-transparent" />
                <motion.span
                  className="relative h-2 w-2 rounded-full bg-[#0088FF]"
                  animate={{ scale:[1,1.6,1], opacity:[1,0.5,1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease:"easeInOut" }}
                />
                <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-[#0088FF]">Our Services</p>
                <span className="relative h-3.5 w-px bg-[#0088FF]/25" />
                <p className="relative text-[11px] font-medium text-slate-500">HalaPark</p>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp}
              className="mt-6 max-w-[580px] text-[clamp(2.6rem,5.2vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.065em]"
            >
              <span className="block text-[#050A13]">Smart Parking.</span>
              <span className="relative mt-1 block">
                <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_45%,#38BDF8_100%)] bg-clip-text text-transparent">
                  Vehicle Care
                </span>
                <span className="text-[#050A13]"> Partner.</span>
                {/* Underline decoration */}
                <svg aria-hidden className="absolute -bottom-2 left-0 w-[58%] opacity-60" height="6" viewBox="0 0 260 6" fill="none">
                  <path d="M1 5C60 1 140 1 259 5" stroke="url(#ug)" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0060CC"/>
                      <stop offset="1" stopColor="#38BDF8" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            {/* Description with left accent bar */}
            <motion.div {...fadeUp} className="mt-7 flex gap-4">
              <div className="mt-1 w-0.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#0088FF] via-[#0088FF]/40 to-transparent" />
              <p className="max-w-[440px] text-[0.9rem] leading-[1.75] text-slate-500">
                Smart parking and vehicle care built for convenience, safety, and innovation — 18 services, all in one seamless platform.
              </p>
            </motion.div>

            {/* Service chip tags */}
            <motion.div {...fadeUp} className="mt-6 flex flex-wrap gap-2">
              {SERVICE_CHIPS.map((chip, i) => (
                <span
                  key={chip}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition ${
                    i === SERVICE_CHIPS.length - 1
                      ? "bg-[#0088FF] text-white shadow-[0_4px_12px_rgba(0,136,255,0.28)]"
                      : "border border-slate-200/80 bg-white/80 text-slate-600 shadow-[0_1px_6px_rgba(6,6,22,0.06)]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
              >
                <Link href="/contact"
                  className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#0088FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.32),0_2px_8px_rgba(0,136,255,0.18)] transition hover:brightness-110"
                >
                  Get In Touch
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
              <motion.button
                type="button" onClick={onGetQuote}
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_2px_12px_rgba(6,6,22,0.07)] transition hover:border-[#0088FF]/50 hover:text-[#0088FF]"
              >
                Get a Quote
              </motion.button>
            </motion.div>

            {/* Trust strip */}
            <motion.div {...fadeUp} className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                {AVATAR_COLORS.map((color, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white shadow-sm"
                    style={{ background: color }}
                  >
                    {["A","B","C","D"][i]}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-slate-500">
                Trusted by <span className="font-semibold text-slate-700">500+</span> businesses across the UAE
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div {...fadeUp} className="mt-10 grid grid-cols-4 gap-0 border-t border-slate-100/80 pt-8">
              {[
                { value: `${allServicesData.length}+`, label: "Services",        dot: "#0088FF" },
                { value: "1",                          label: "Platform",         dot: "#2563EB" },
                { value: "24/7",                       label: "Operations",       dot: "#16B364" },
                { value: "UAE",                        label: "Coverage",         dot: "#F59E0B" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.38 + i * 0.07 }}
                  className={`${i > 0 ? "border-l border-slate-100 pl-4 sm:pl-6" : ""} pr-2`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                    <p className="text-[clamp(1.5rem,2.8vw,2rem)] font-bold tracking-[-0.04em] text-[#050A13]">{s.value}</p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* ─── RIGHT — phone ─── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
            className="relative mt-16 flex min-h-[480px] items-center justify-center lg:mt-0 lg:min-h-[620px]"
          >
            <SvcHeroPhone reduced={reduced} />
          </motion.div>

        </div>
      </div>

      {/* Section progress bar */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-[3px] origin-left bg-gradient-to-r from-[#0060CC] via-[#0088FF] to-[#38BDF8] shadow-[0_0_14px_rgba(0,136,255,0.4)]"
        style={{ scaleX: readProg }}
      />

      <style>{`
        @keyframes svc-shimmer {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(240%) skewX(-12deg); }
        }
        .svc-shimmer {
          animation: svc-shimmer 0.7s ease-in-out forwards;
          animation-play-state: paused;
        }
        .group\\/card:hover .svc-shimmer { animation-play-state: running; }

        @keyframes svc-orbit-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .svc-orbit-ring {
          animation: svc-orbit-spin 28s linear infinite;
        }
        @keyframes svc-orbit-rev {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        .svc-orbit-ring-rev {
          animation: svc-orbit-rev 18s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-shimmer, .svc-orbit-ring, .svc-orbit-ring-rev { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════ SERVICES GRID ═══════════════════════════ */

const SLUG_CATEGORY = {
  "self-parking": "parking",       "tenant-sharing-slot": "valet",
  "valet-service": "valet",        "valet-on-demand": "valet",
  "ev-charging": "care",           "vip-parking": "parking",
  "guest-visitor-parking": "parking", "car-storage": "care",
  "fleet-parking": "parking",      "bike-parking": "parking",
  "barrier-free-parking": "parking", "smart-public-parking": "parking",
  "airport-parking": "parking",    "yacht-parking": "parking",
  "car-wash": "care",              "air-tyre-service": "care",
  "battery-replacement": "care",   "jump-start": "care",
};

const FILTERS = [
  { id: "all",     label: "All Services",   emoji: "✦" },
  { id: "parking", label: "Parking",        emoji: "🅿" },
  { id: "valet",   label: "Valet & Access", emoji: "🚗" },
  { id: "care",    label: "Vehicle Care",   emoji: "🔧" },
];

function ServicesGrid({ onServiceClick }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const reduced  = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0,-70]);
  const blobB = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0, 90]);

  const filtered = activeFilter === "all"
    ? allServicesData
    : allServicesData.filter(s => SLUG_CATEGORY[s.slug] === activeFilter);

  const counts = FILTERS.map(f =>
    f.id === "all" ? allServicesData.length
    : allServicesData.filter(s => SLUG_CATEGORY[s.slug] === f.id).length
  );

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24">

      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F4F8FF_0%,#FFFFFF_22%,#FFFFFF_78%,#F8FBFF_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,136,255,0.04),transparent)]" />

      {/* Parallax blobs */}
      <motion.div aria-hidden style={{ y: blobA }} className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_65%)] blur-3xl" />
      <motion.div aria-hidden style={{ y: blobB }} className="pointer-events-none absolute -right-32 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06),transparent_65%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease }}
          className="mb-10 sm:mb-12 lg:flex lg:items-end lg:justify-between lg:gap-12"
        >
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,136,255,0.22)] bg-[rgba(0,136,255,0.05)] px-3.5 py-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#0088FF]"
                animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }}
                transition={{ duration: 2, repeat: Infinity, ease:"easeInOut" }}
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0088FF]">Explore Our Services</p>
            </div>

            <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-[#050A13]">
              Everything you need,{" "}
              <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
                one platform.
              </span>
            </h2>
            <p className="mt-2.5 max-w-[480px] text-[0.88rem] leading-6 text-slate-500">
              From self-parking to valet, EV charging to car storage — tap any card to explore full details and what's included.
            </p>
          </div>

          {/* Right — live count */}
          <div className="mt-6 shrink-0 lg:mt-0 lg:text-right">
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(2.4rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.06em] text-[#050A13]"
            >
              {filtered.length}
              <span className="text-[#0088FF]">+</span>
            </motion.p>
            <p className="mt-1 text-sm text-slate-400">
              {activeFilter === "all" ? "Services available" : `${FILTERS.find(f=>f.id===activeFilter)?.label} services`}
            </p>
          </div>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 flex gap-2 overflow-x-auto pb-1 sm:gap-3 [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f, i) => {
            const isActive = activeFilter === f.id;
            return (
              <motion.button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={springSoft}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0088FF] text-white shadow-[0_4px_14px_rgba(0,136,255,0.32)]"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#0088FF]/40 hover:text-[#0088FF]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[#0088FF]"
                    style={{ zIndex: -1 }}
                    transition={{ type:"spring", stiffness:380, damping:28 }}
                  />
                )}
                <span>{f.label}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {counts[i]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                onClick={onServiceClick}
                category={SLUG_CATEGORY[service.slug] || "parking"}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state (shouldn't happen but safety) ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-slate-400">No services in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}

/* ══════════════════════════ PARTNERS SECTION ════════════════════════ */

const PARTNERS_ROW1 = [
  { name: "Emirates NBD",    initials: "EN", color: "#0088FF", industry: "Banking"         },
  { name: "Emaar Properties",initials: "EP", color: "#6366F1", industry: "Real Estate"     },
  { name: "Dubai Mall",      initials: "DM", color: "#F59E0B", industry: "Retail"          },
  { name: "DEWA",            initials: "DW", color: "#16B364", industry: "Utilities"       },
  { name: "Jumeirah Group",  initials: "JG", color: "#EC4899", industry: "Hospitality"     },
  { name: "Aldar Properties",initials: "AP", color: "#0EA5E9", industry: "Real Estate"     },
  { name: "Majid Al Futtaim",initials: "MF", color: "#8B5CF6", industry: "Lifestyle"       },
  { name: "Abu Dhabi COOP",  initials: "AC", color: "#14B8A6", industry: "Cooperative"     },
];

const PARTNERS_ROW2 = [
  { name: "Rotana Hotels",   initials: "RH", color: "#F97316", industry: "Hospitality"     },
  { name: "Du Telecom",      initials: "DT", color: "#6366F1", industry: "Telecom"         },
  { name: "LuLu Hypermarket",initials: "LH", color: "#16B364", industry: "Retail"         },
  { name: "Azizi Developments",initials:"AD",color: "#0088FF", industry: "Development"    },
  { name: "Meraas",          initials: "ME", color: "#EC4899", industry: "Urban Lifestyle" },
  { name: "Nakheel",         initials: "NA", color: "#F59E0B", industry: "Real Estate"     },
  { name: "Sobha Realty",    initials: "SR", color: "#8B5CF6", industry: "Real Estate"     },
  { name: "IHG Hotels",      initials: "IH", color: "#0EA5E9", industry: "Hospitality"     },
];

const PARTNER_STATS = [
  { value: "50+",  label: "Enterprise clients"    },
  { value: "200+", label: "Properties managed"    },
  { value: "7",    label: "Emirates covered"      },
  { value: "99%",  label: "Client satisfaction"   },
];

function PartnerCard({ partner }) {
  return (
    <div className="group/partner relative flex min-w-[210px] items-center gap-3.5 overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(6,6,22,0.05)] transition-all duration-300 hover:border-slate-200 hover:shadow-[0_6px_24px_rgba(6,6,22,0.09)] sm:min-w-[240px]">
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/partner:opacity-100"
        style={{ background: `radial-gradient(circle at 20% 50%, ${partner.color}0C, transparent 70%)` }} />
      {/* Logo mark */}
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white shadow-sm"
        style={{ background: `linear-gradient(135deg, ${partner.color}, ${partner.color}CC)` }}
      >
        {partner.initials}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      {/* Text */}
      <div className="min-w-0">
        <p className="truncate text-[0.82rem] font-semibold text-[#050A13] transition-colors duration-200 group-hover/partner:text-[#0088FF]">
          {partner.name}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-400">{partner.industry}</p>
      </div>
    </div>
  );
}

function PartnersSection() {
  const reduced = useReducedMotion();
  const row1 = [...PARTNERS_ROW1, ...PARTNERS_ROW1];
  const row2 = [...PARTNERS_ROW2, ...PARTNERS_ROW2];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">

      {/* Subtle bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_30%,#FFFFFF_70%,#F4F8FF_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(0,136,255,0.04),transparent)]" />

      {/* ── Section header ── */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,136,255,0.22)] bg-[rgba(0,136,255,0.05)] px-3.5 py-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#0088FF]"
              animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }}
              transition={{ duration: 2, repeat: Infinity, ease:"easeInOut" }}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0088FF]">Clients & Partners</p>
          </div>

          <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#050A13]">
            Trusted by the UAE&apos;s{" "}
            <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
              leading brands.
            </span>
          </h2>
          <p className="mt-3 max-w-[460px] text-[0.88rem] leading-6 text-slate-500">
            From global hotel chains to residential towers and shopping destinations — HalaPark powers parking across every sector.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-4 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-[#F7FAFF] px-2 py-5 shadow-[0_2px_12px_rgba(6,6,22,0.05)]"
        >
          {PARTNER_STATS.map((s) => (
            <div key={s.label} className="px-2 text-center sm:px-4">
              <p className="text-[1.35rem] font-bold tracking-[-0.04em] text-[#050A13] sm:text-[1.6rem]">{s.value}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-400 sm:text-[11px]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div className="relative overflow-hidden pb-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className={`flex w-max items-center gap-3 ${!reduced ? "partners-row1" : ""}`}>
          {row1.map((p, i) => <PartnerCard key={`r1-${p.name}-${i}`} partner={p} />)}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div className="relative mt-3 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className={`flex w-max items-center gap-3 ${!reduced ? "partners-row2" : ""}`}>
          {row2.map((p, i) => <PartnerCard key={`r2-${p.name}-${i}`} partner={p} />)}
        </div>
      </div>

      {/* ── Bottom CTA line ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease, delay: 0.2 }}
        className="relative z-10 mt-12 text-center"
      >
        <p className="text-[0.82rem] text-slate-400">
          Want to become a partner?{" "}
          <Link href="/contact" className="font-semibold text-[#0088FF] underline-offset-2 hover:underline">
            Get in touch →
          </Link>
        </p>
      </motion.div>

      <style>{`
        .partners-row1 { animation: partners-left 36s linear infinite; }
        .partners-row2 { animation: partners-right 40s linear infinite; }
        @keyframes partners-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes partners-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .partners-row1, .partners-row2 { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════ TRUST SECTION ═══════════════════════════ */

const TRUST = [
  { Icon: Camera,     label: "24/7 Surveillance",        desc: "Round-the-clock CCTV monitoring at every facility, every moment.",   accent: "#38BDF8" },
  { Icon: BadgeCheck, label: "Verified Valet Staff",     desc: "Every attendant is professionally trained, certified, and vetted.",   accent: "#34D399" },
  { Icon: CreditCard, label: "Secure Payment System",    desc: "End-to-end encrypted, cashless transactions every single time.",     accent: "#A78BFA" },
  { Icon: Shield,     label: "Vehicle Safety Assurance", desc: "Full accountability and guaranteed protection for every vehicle.",    accent: "#FB923C" },
];

const TRUST_STATS = [
  { value: "500K+", label: "Sessions monitored" },
  { value: "24/7",  label: "Active security"    },
  { value: "100%",  label: "Vetted staff"        },
];

function TrustSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F4F8FF] py-20 sm:py-24 lg:py-28">

      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#EEF5FF_0%,#F4F8FF_40%,#FFFFFF_100%)]" />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Soft blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.07),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[40%] top-[20%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.05),transparent_65%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">

          {/* ─── Feature block — left col spans 2 rows ─── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-[24px] border border-[#0088FF]/12 bg-white p-7 shadow-[0_4px_24px_rgba(0,136,255,0.07)] lg:row-span-2 sm:p-8"
          >

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.08),transparent_70%)] blur-2xl" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0088FF]/20 bg-[rgba(0,136,255,0.05)] px-3.5 py-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#0088FF]"
                animate={{ scale:[1,1.6,1], opacity:[1,0.4,1] }}
                transition={{ duration: 2, repeat: Infinity, ease:"easeInOut" }}
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0088FF]">Trust & Safety</p>
            </div>

            {/* Headline */}
            <h2 className="mt-5 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#050A13]">
              Your safety is<br />
              <span className="bg-[linear-gradient(120deg,#0060CC,#0088FF_55%,#38BDF8)] bg-clip-text text-transparent">
                our #1 priority.
              </span>
            </h2>
            <p className="mt-3 text-[0.84rem] leading-6 text-slate-500">
              Every facility, every vehicle, every transaction — protected by industry-leading security standards and verified professionals.
            </p>

            {/* Animated shield */}
            <div className="relative my-8 flex justify-center">
              {!reduced && (
                <>
                  <motion.div
                    className="absolute h-36 w-36 rounded-full border border-[#0088FF]/14"
                    animate={{ scale:[1,1.18,1], opacity:[0.7,0,0.7] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease:"easeOut" }}
                  />
                  <motion.div
                    className="absolute h-28 w-28 rounded-full border border-[#0088FF]/20"
                    animate={{ scale:[1,1.14,1], opacity:[0.8,0,0.8] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease:"easeOut", delay: 0.5 }}
                  />
                </>
              )}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0088FF] to-[#2563EB] shadow-[0_8px_32px_rgba(0,136,255,0.35)]">
                <Shield className="h-9 w-9 text-white" fill="rgba(255,255,255,0.15)" aria-hidden />
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-[#F7FAFF] px-2 py-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="px-2 text-center sm:px-3">
                  <p className="text-[1.25rem] font-bold tracking-[-0.04em] text-[#050A13] sm:text-[1.5rem]">{s.value}</p>
                  <p className="mt-0.5 text-[10px] leading-4 text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Trust cards 1-4 ─── */}
          {TRUST.map(({ Icon, label, desc, accent }, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.08 }}
              whileHover={reduced ? undefined : { y: -5, scale: 1.018, transition: springSoft }}
              className="group/trust relative overflow-hidden rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_2px_16px_rgba(6,6,22,0.05)] transition-shadow duration-300 group-hover/trust:shadow-[0_8px_32px_rgba(6,6,22,0.09)] sm:p-6"
            >

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-400 group-hover/trust:opacity-100"
                style={{ background: `radial-gradient(circle at 30% 0%, ${accent}0D, transparent 65%)` }} />

              {/* Icon */}
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}0A)`, boxShadow: `0 4px 14px ${accent}18` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} aria-hidden />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent" />
              </div>

              <p className="mt-4 text-[0.92rem] font-semibold leading-snug text-[#050A13]">{label}</p>
              <p className="mt-1.5 text-[0.78rem] leading-5 text-slate-500">{desc}</p>

              {/* Bottom check badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
                style={{ borderColor: `${accent}28`, background: `${accent}0A` }}>
                <Check className="h-3 w-3" style={{ color: accent }} strokeWidth={3} aria-hidden />
                <span className="text-[10px] font-bold tracking-wide" style={{ color: accent }}>Guaranteed</span>
              </div>
            </motion.div>
          ))}

          {/* ─── Wide bottom card — Controlled Access Zones ─── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            whileHover={reduced ? undefined : { y: -4, transition: springSoft }}
            className="group/trust relative overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_2px_16px_rgba(6,6,22,0.05)] transition-shadow duration-300 group-hover/trust:shadow-[0_8px_32px_rgba(6,6,22,0.09)] lg:col-span-2"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-0 transition-opacity duration-500 group-hover/trust:opacity-100"
              style={{ background: "radial-gradient(circle at 80% 50%, rgba(168,85,247,0.05), transparent 65%)" }} />

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
              {/* Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(168,85,247,0.18),rgba(168,85,247,0.06))] shadow-[0_4px_14px_rgba(168,85,247,0.14)]">
                <Lock className="h-6 w-6 text-[#A855F7]" aria-hidden />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-[0.98rem] font-semibold text-[#050A13]">Controlled Access Zones</p>
                <p className="mt-1 text-[0.82rem] leading-6 text-slate-500">
                  Smart ANPR cameras, automated barriers, and digital validation ensure only authorized vehicles access our secured parking facilities — every time, without exception.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
                {["ANPR Technology", "Smart Barriers", "Digital Validation"].map(tag => (
                  <span key={tag} className="rounded-full border border-[rgba(168,85,247,0.2)] bg-[rgba(168,85,247,0.06)] px-3 py-1 text-[11px] font-semibold text-[#A855F7]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .svc-trust-flow { animation: svc-trust-gradient 14s ease-in-out infinite; }
        @keyframes svc-trust-gradient {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) { .svc-trust-flow { animation: none; } }
      `}</style>
    </section>
  );
}

/* ═══════════════════════ LONG-TERM CTA SECTION ═══════════════════════ */

const LT_FEATURES = [
  { icon: Check, text: "Flexible monthly contracts" },
  { icon: Check, text: "Multiple UAE locations"     },
  { icon: Check, text: "24/7 dedicated support"     },
  { icon: Check, text: "Smart access management"    },
];

const LT_USE_CASES = [
  {
    Icon: Building2,
    title: "Business & Corporate",
    desc: "Dedicated fleet slots, centralized billing, and monthly business plans tailored to your company size.",
    accent: "#0088FF",
    bg: "rgba(0,136,255,0.08)",
  },
  {
    Icon: Home,
    title: "Residential Towers",
    desc: "Long-term tenant parking with smart access, real-time monitoring, and hassle-free management.",
    accent: "#6366F1",
    bg: "rgba(99,102,241,0.08)",
  },
  {
    Icon: Plane,
    title: "Airport Long-Stay",
    desc: "Monthly airport parking with guaranteed availability, easy drop-off, and shuttle coordination.",
    accent: "#16B364",
    bg: "rgba(22,179,100,0.08)",
  },
];

function LongTermCTA({ onGetQuote }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F4F8FF] py-20 sm:py-24 lg:py-28">

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF5FF_45%,#F4F8FF_100%)]" />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,136,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Soft blobs */}
      <div className="pointer-events-none absolute -left-28 -bottom-28 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.08),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-28 -top-28 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_65%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="relative isolate overflow-hidden rounded-[28px] border border-[#0088FF]/10 bg-white shadow-[0_8px_48px_rgba(0,136,255,0.10),0_2px_12px_rgba(6,6,22,0.06)] sm:rounded-[32px]"
        >
          {/* Inner corner glow accents */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[32px]">
            <div className="absolute -left-16 bottom-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.09),transparent_65%)] blur-3xl" />
            <div className="absolute -right-16 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_65%)] blur-3xl" />
            <div className="absolute left-[38%] top-[15%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.05),transparent_65%)] blur-2xl" />
          </div>

          {/* Subtle dot grid inside card */}
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(rgba(0,136,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] sm:rounded-[32px]" />

          {/* Content */}
          <div className="relative z-10 grid gap-10 px-7 py-12 sm:px-12 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16">

            {/* ── LEFT — text ── */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0088FF]/20 bg-[rgba(0,136,255,0.06)] px-4 py-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#0088FF]"
                  animate={{ scale:[1,1.6,1], opacity:[1,0.4,1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease:"easeInOut" }}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0088FF]">Long-Term Parking</p>
              </div>

              {/* Headline */}
              <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.06em] text-[#050A13]">
                Looking for{" "}
                <span className="bg-[linear-gradient(120deg,#0060CC_0%,#0088FF_50%,#38BDF8_100%)] bg-clip-text text-transparent">
                  Long-Term Parking?
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-[52ch] text-[0.88rem] leading-7 text-slate-500 sm:text-[0.94rem]">
                Secure, flexible, and smart parking solutions for businesses, residents, airports, and yearly vehicle storage — designed to grow with you.
              </p>

              {/* Feature grid */}
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                {LT_FEATURES.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,136,255,0.1)]">
                      <Icon className="h-3 w-3 text-[#0088FF]" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[0.8rem] font-medium text-slate-600">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={onGetQuote}
                  whileHover={reduced ? undefined : { scale: 1.04 }}
                  whileTap={reduced ? undefined : { scale: 0.97 }}
                  transition={springSoft}
                  className="group/btn inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0088FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,136,255,0.30)] transition hover:brightness-110"
                >
                  Get a Quote
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </motion.button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-[#0088FF]/40 hover:text-[#0088FF]"
                >
                  Talk to Our Team
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-5 text-[11px] text-slate-400">
                Trusted by <span className="font-medium text-slate-600">500+ businesses</span> across the UAE
              </p>
            </motion.div>

            {/* ── RIGHT — use-case cards ── */}
            <div className="flex flex-col gap-3">
              {LT_USE_CASES.map(({ Icon, title, desc, accent, bg }, i) => (
                <motion.div
                  key={title}
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease, delay: 0.18 + i * 0.1 }}
                  whileHover={reduced ? undefined : { x: 4, transition: springSoft }}
                  className="group/uc relative overflow-hidden rounded-2xl border border-slate-100 bg-[#F7FAFF] p-4 transition-all duration-300 hover:border-slate-200 hover:shadow-[0_4px_20px_rgba(6,6,22,0.07)] sm:p-5"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/uc:opacity-100"
                    style={{ background: `radial-gradient(circle at 20% 50%, ${accent}0D, transparent 65%)` }} />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: bg, boxShadow: `0 4px 14px ${accent}1A` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} aria-hidden />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.88rem] font-semibold text-[#050A13]">{title}</p>
                      <p className="mt-1 text-[0.76rem] leading-5 text-slate-500">{desc}</p>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors duration-200 group-hover/uc:text-slate-500"
                      aria-hidden
                    />
                  </div>
                </motion.div>
              ))}

              {/* Bottom caption */}
              <p className="mt-1 text-center text-[11px] text-slate-400">
                Custom plans available for all property types
              </p>
            </div>

          </div>
        </motion.article>
      </div>
    </section>
  );
}

/* ═════════════════════════ MAIN PAGE ════════════════════════════════ */

export default function ServicesListPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [quoteOpen, setQuoteOpen]             = useState(false);

  return (
    <>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <QuoteModal   isOpen={quoteOpen}        onClose={() => setQuoteOpen(false)} />

      <main>
        <HeroSection    onGetQuote={() => setQuoteOpen(true)} />
        <ServicesGrid   onServiceClick={setSelectedService} />
        <PartnersSection />
        <TrustSection />
        <LongTermCTA    onGetQuote={() => setQuoteOpen(true)} />
      </main>
    </>
  );
}
