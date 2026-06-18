"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Check,
  Clock,
  MapPin,
  ParkingCircle,
  Star,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "4.8",
    suffix: "/5",
    label: "(1,200+ reviews)",
    icon: Star,
    extra: "stars",
  },
  {
    value: "700K+",
    label: "Parking sessions",
    icon: Car,
  },
  {
    value: "10K+",
    label: "Happy users",
    icon: Users,
  },
];

function CityBackdrop() {
  const towers = [
    "h-24 w-3",
    "h-36 w-5",
    "h-48 w-6",
    "h-28 w-4",
    "h-56 w-7",
    "h-40 w-5",
    "h-32 w-4",
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-28 left-[28%] hidden items-end gap-2 opacity-35 blur-[0.2px] lg:flex"
    >
      {towers.map((tower, index) => (
        <span
          key={`${tower}-${index}`}
          className={`${tower} rounded-t-full bg-[linear-gradient(180deg,rgba(0,136,255,0.42),rgba(0,136,255,0.05))]`}
        />
      ))}
    </div>
  );
}

function StatStrip() {
  return (
    <div className="mt-7 w-full max-w-[620px] rounded-[24px] bg-white/92 px-4 py-3.5 shadow-[0_14px_38px_rgba(15,23,42,0.08)] backdrop-blur sm:px-5 lg:absolute lg:bottom-8 lg:left-8 lg:z-[99] lg:mt-0">
      <div className="grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-[#E4EAF2]">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3 sm:px-3 first:sm:pl-0 last:sm:pr-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0088FF]">
                <Icon aria-hidden="true" className="h-5 w-5" fill={item.extra === "stars" ? "currentColor" : "none"} />
              </span>
              <div className="min-w-0">
                <p className="text-xl font-semibold leading-none text-[#050A13]">
                  {item.value}
                  {item.suffix ? (
                    <span className="ml-1 text-sm font-medium text-[#667085]">
                      {item.suffix}
                    </span>
                  ) : null}
                </p>
                {item.extra === "stars" ? (
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-[#0088FF]">
                    *****
                  </p>
                ) : null}
                <p className="mt-1 text-xs font-medium text-[#667085]">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroPhone() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative z-20 w-[160px] rotate-0 sm:w-[220px] md:w-[260px] lg:w-[290px] lg:rotate-[8deg] xl:w-[320px]"
    >
      <div className="absolute inset-x-[16%] bottom-2 h-14 rounded-full bg-[#0F172A]/18 blur-[24px]" />
      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_30px_58px_rgba(5,10,19,0.28)]">
        <div className="absolute left-[4.2%] right-[4.2%] top-[1%] bottom-[1.2%] z-20 translate-y-[1px] overflow-hidden rounded-[1.6rem] bg-white lg:rounded-[3.2rem]">
          <Image
            src="/Park.png"
            alt="HalaPark booking screen"
            fill
            sizes="(min-width: 1280px) 365px, (min-width: 1024px) 340px, (min-width: 640px) 290px, 235px"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10">
          <Image
            src="/mobileframe.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 365px, (min-width: 1024px) 340px, (min-width: 640px) 290px, 235px"
            className="select-none object-contain"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

function FloatingCards({ prefersReducedMotion }) {
  return (
    <>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -14, rotate: -8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: -8 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
        className="absolute left-[4%] top-8 z-30 hidden lg:block lg:left-[7%] lg:top-14"
      >
        <div className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-[0_14px_32px_rgba(15,23,42,0.12)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0088FF] text-white">
            <ParkingCircle aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-[#050A13]">
              Booking Confirmed
            </p>
            <p className="text-[10px] font-medium text-[#667085]">
              Your parking is reserved
            </p>
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#16B364] text-white">
            <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        </div>
        <svg className="ml-14 mt-1.5" width="76" height="42" viewBox="0 0 76 42" fill="none" aria-hidden>
          <path d="M2 2C20 32 52 48 74 18" stroke="#0088FF" strokeWidth="1.4" strokeDasharray="5 5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 18, rotate: 4 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
        className="absolute right-[2%] top-[30%] z-30 hidden lg:block"
      >
        <div className="w-[148px] rounded-2xl bg-white p-2.5 shadow-[0_14px_34px_rgba(15,23,42,0.13)]">
          <p className="rounded-lg bg-[#0088FF] px-3 py-1.5 text-center text-[11px] font-semibold text-white">
            Active Session
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[#050A13]">
            <Clock aria-hidden="true" className="h-4 w-4 text-[#0088FF]" />
            <p className="text-xl font-semibold tracking-tight">01:59:42</p>
          </div>
          <p className="mt-2 text-center text-[11px] font-medium text-[#667085]">
            Dubai Mall Parking
          </p>
          <p className="text-center text-[11px] font-medium text-[#667085]">
            Zone 385C
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-[#CFE3FF] bg-white py-2 text-[11px] font-semibold text-[#0088FF]"
          >
            Extend Time
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 22, rotate: 8 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0, rotate: 8 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.45 }}
        className="absolute bottom-[19%] right-[7%] z-30 hidden lg:block"
      >
        <div className="w-[160px] rounded-2xl bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.13)]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#050A13]">
              Payment Successful
            </p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#16B364] text-white">
              <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
          <p className="mt-2 text-lg font-semibold text-[#050A13]">AED 10.00</p>
          <p className="mt-1 text-[10px] font-medium text-[#667085]">
            Transaction ID
          </p>
          <p className="text-[10px] font-semibold text-[#050A13]">H4892328442S</p>
        </div>
      </motion.div>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-[14%] left-[58%] z-30 hidden text-[#0088FF] lg:block"
      >
        <MapPin aria-hidden="true" className="h-12 w-12 drop-shadow-[0_12px_18px_rgba(0,136,255,0.24)]" fill="currentColor" />
        <span className="absolute bottom-[-3px] left-1/2 h-2.5 w-10 -translate-x-1/2 rounded-full bg-[#0088FF]/25 blur-md" />
      </motion.div>
    </>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-x-hidden bg-[linear-gradient(118deg,#FFFFFF_0%,#F8FBFF_42%,#EAF3FF_100%)] lg:overflow-visible">
      <CityBackdrop />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20"
        >
          <h1 className="max-w-[580px] text-[clamp(2.7rem,6vw,4.9rem)] font-semibold leading-[0.98] tracking-tight text-[#050A13]">
            Find Parking
            <br />
            <span className="text-[#0088FF]">in Seconds</span>
            <br />
            <span className="text-[#0088FF]">Across UAE</span>
          </h1>

          <p className="mt-5 max-w-[460px] text-base font-light leading-7 text-[#4F5B6F] sm:text-[17px]">
            Find nearby parking, reserve instantly, and pay cashless, all in one
            seamless app experience.
          </p>

          <Link href="/app">
            <button
              type="button"
              className="mt-7 inline-flex w-full max-w-[295px] items-center justify-between rounded-2xl bg-[#005BFF] px-4 py-3.5 text-base font-semibold text-white shadow-[0_16px_34px_rgba(0,91,255,0.28)] transition hover:brightness-95 sm:px-5"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#005BFF]">
                  <MapPin aria-hidden="true" className="h-6 w-6" fill="currentColor" />
                </span>
                Explore Parking
              </span>
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
          className="relative z-10 flex min-h-[430px] items-center justify-center lg:min-h-[570px]"
        >
          <motion.div
            aria-hidden="true"
            animate={
              prefersReducedMotion ? undefined : { scale: [1, 1.025, 1] }
            }
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-[-20%] left-[-10%] right-[-10%] top-[-12%] z-0 opacity-75 sm:bottom-[-36%] sm:left-[-24%] sm:right-[-18%] sm:top-[-18%] lg:bottom-[-42%] lg:left-[-20%] lg:right-[-18%] lg:top-[-22%]"
          >
            <div className="absolute inset-x-[9%] bottom-[18%] z-0 h-[24%] rounded-full bg-[#0F172A]/20 blur-[42px] sm:inset-x-[12%] sm:bottom-[16%] lg:bottom-[14%] lg:blur-[56px]" />
            <Image
              src="/j3.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 1240px, 155vw"
              className="relative z-10 object-cover object-center drop-shadow-[0_34px_48px_rgba(15,23,42,0.22)]"
              priority
            />
            <div className="absolute bottom-0 left-0 top-0 z-20 w-[34%] bg-[linear-gradient(90deg,#F8FBFF_0%,rgba(248,251,255,0.88)_32%,rgba(248,251,255,0.38)_68%,rgba(248,251,255,0)_100%)] blur-[0.2px] sm:w-[30%] lg:w-[28%]" />
            <div className="absolute bottom-[12%] left-[6%] top-[12%] z-20 w-[18%] rounded-full bg-[#0F172A]/10 blur-[34px] sm:left-[5%] lg:left-[4%]" />
          </motion.div>

          <FloatingCards prefersReducedMotion={prefersReducedMotion} />
          <HeroPhone />

        </motion.div>

        <StatStrip />
      </div>
    </section>
  );
}
