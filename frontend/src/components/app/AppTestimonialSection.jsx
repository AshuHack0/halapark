"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const phoneFrameSrc = "/mobileframe.png";

function PhoneCard({ image, alt, className }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="absolute inset-x-[19%] bottom-3 h-10 rounded-full bg-black/35 blur-2xl" />
      <div className="relative isolate aspect-[1439/2920] drop-shadow-[0_24px_44px_rgba(2,8,23,0.5)]">
        <div className="absolute left-[4.4%] right-[4.4%] top-[1.2%] bottom-[1.45%] z-10 translate-y-[1px] overflow-hidden rounded-[1.7rem] bg-black">
          <div className="absolute top-0 -bottom-[2.5%] left-0 right-0">
            <Image src={image} alt={alt} fill sizes="220px" className="object-cover object-center" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={phoneFrameSrc} alt="" fill sizes="220px" className="select-none object-contain" />
        </div>
      </div>
    </motion.div>
  );
}

export default function AppTestimonialSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-7xl min-h-[520px] overflow-hidden rounded-[28px] bg-[radial-gradient(120%_120%_at_18%_0%,#0F62C7_0%,#0A3F84_38%,#071A3D_65%,#020617_100%)] sm:min-h-[600px] md:grid-cols-2"
      >
        <div className="relative flex min-h-[400px] items-center justify-center px-8 py-10 sm:min-h-[480px] sm:px-10 md:justify-end md:px-8">
          <div className="pointer-events-none absolute left-[18%] top-[18%] h-40 w-40 rounded-full bg-[#33A0FF]/30 blur-[70px] sm:h-52 sm:w-52" />
          <div className="relative h-[340px] w-[280px] sm:h-[390px] sm:w-[330px] md:translate-x-0">
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{
                duration: 5.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-1/2 w-[150px] -translate-y-[56%] sm:w-[180px]"
            >
              <PhoneCard image="/Map.png" alt="HalaPark map screen" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
              transition={{
                duration: 5.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute right-0 top-1/2 w-[165px] -translate-y-[44%] sm:w-[205px]"
            >
              <PhoneCard image="/Payment.png" alt="HalaPark payment screen" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 22 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="ml-0 flex min-h-[400px] w-full max-w-[520px] flex-col justify-center px-8 py-10 text-white sm:min-h-[480px] sm:px-12 md:px-6"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
            Driver Feedback
          </p>
          <h3 className="mt-4 max-w-[520px] text-3xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-4xl">
            "Easy to use, fast booking, and smooth checkout every time."
          </h3>
          <p className="mt-6 text-lg font-medium text-[#E2E8F0]">HalaPark User</p>
          <p className="mt-1 text-sm text-[#93C5FD]">Daily commuter in UAE</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
