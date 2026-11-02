"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinessContent } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";
import { ConsultationModal } from "./BusinessLeadModals";
import MobilePicture from "@/components/common/MobilePicture";

const ease = [0.22, 1, 0.36, 1];

export default function BusinessCTA() {
  const reduced = useReducedMotion();
  const { language } = useLanguage();
  const [consultOpen, setConsultOpen] = useState(false);
  const [cta, setCta] = useState({
    heading: "Start a Smart Parking Business with",
    headingAccent: "No Upfront Investment",
    description: "Partner with HalaPark to launch intelligent parking solutions powered by automation, AI, and seamless digital operations.",
    ctaLabel: "Book a Free Consultation",
    ctaLink: "/contact",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  });

  useEffect(() => {
    fetchBusinessContent().then((content) => {
      if (content?.cta && typeof content.cta === "object") {
        setCta((prev) => ({ ...prev, ...Object.fromEntries(Object.entries(content.cta).filter(([, v]) => v !== "" && v != null)) }));
      }
    });
  }, []);

  // Admin "Show this section on the website" toggle.
  if (cta?.enabled === false) return null;

  return (
    <section className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Text + button on the start side, photo on the end side. The grid
            follows the page direction, so Arabic (RTL) mirrors it: text on
            the right, photo on the left. Stacked (text, then photo) on phones. */}
        <div className="relative grid overflow-hidden rounded-[28px] bg-[#06111f] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* Glowing network SVG behind the text */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
            <defs>
              <radialGradient id="businessNodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0088FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[
              [120,80,400,200],[280,300,400,200],[600,120,400,200],[680,300,400,200],
              [50,200,400,200],[750,200,400,200],[200,50,400,200],[580,350,400,200],
            ].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0088FF" strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="4 6" />
            ))}
            {[[120,80],[280,300],[600,120],[680,300],[50,200],[750,200],[200,50],[580,350]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#0088FF" fillOpacity="0.7" />
            ))}
            <circle cx="400" cy="200" r="60" fill="url(#businessNodeGlow)" />
            <circle cx="400" cy="200" r="6" fill="#0088FF" />
          </svg>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="relative z-10 flex flex-col items-start justify-center gap-5 px-6 py-8 sm:px-10 sm:py-10"
          >
            <div>
              <h2 className="text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[1.6rem] rtl:tracking-normal [overflow-wrap:anywhere]">
                {t(cta, "heading", language)}
                {t(cta, "headingAccent", language) ? (
                  <>
                    {" "}
                    <span className="bg-gradient-to-r from-[#3AADFF] to-[#0088FF] bg-clip-text text-transparent">
                      {t(cta, "headingAccent", language)}
                    </span>
                  </>
                ) : null}
              </h2>
              <RichText text={t(cta, "description", language)} className="mt-1.5 text-[0.82rem] leading-5 text-white/60 sm:text-[0.88rem] [overflow-wrap:anywhere] block" />
            </div>
            {/* With `usePopup` on (or no link set), the button opens the same
                Book-a-Free-Consultation popup as the hero; otherwise it
                redirects to the configured link. */}
            {cta.usePopup === true || !(cta.ctaLink || "").trim() ? (
              <button
                type="button"
                onClick={() => setConsultOpen(true)}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,136,255,0.4)] transition hover:brightness-110"
              >
                {t(cta, "ctaLabel", language)} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </button>
            ) : (
              <Link
                href={cta.ctaLink}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0088FF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,136,255,0.4)] transition hover:brightness-110"
              >
                {t(cta, "ctaLabel", language)} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </Link>
            )}
          </motion.div>

          {/* Photo only — no text over it. Flush to the card edges (no padding),
              full card height; the card's rounded corners clip it. */}
          <div className="relative z-10">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full md:min-h-[220px]">
              <MobilePicture mobileSrc={cta.mobileImage}>
                <Image src={cta.image || "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png"} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-center" aria-hidden />
              </MobilePicture>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />
    </section>
  );
}
