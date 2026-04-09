"use client";
import { motion } from "framer-motion";
import RatingBadge from "../common/RatingBadge";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-14 overflow-hidden bg-white max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <div className="flex flex-col items-center text-center w-full h-full">
          {/* Rating Badge */}
          <div className="mb-4">
            <RatingBadge
              rating="4.9"
              totalReviews="4268"
              textColor="transparent"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0088FF]"
          >
            About HalaPark
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              text-4xl 
              sm:text-5xl 
              lg:text-[64px] 
              max-md:text-[40px] 
              max-sm:text-[30px] 
              font-bold 
              text-slate-900 
              leading-15 
              max-md:leading-snug
              tracking-tight 
              mb-6 
              max-w-4xl
            "
          >
            We Are Redefining How the UAE Parks
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              text-lg 
              max-md:text-base 
              max-sm:text-sm 
              text-slate-600 
              mb-0 
              max-w-xl
            "
          >
            Founded with a clear mission, to eliminate the friction of parking
            through intelligent technology and local expertise.
          </motion.p>

          {/* Phone Mockup with Map Background */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full mt-10 max-sm:mt-8"
          >
            <div className="inset-0 w-full h-full flex items-center justify-center relative">
              {/* Map Background */}
              <img
                src="/Frame9991171276918.png"
                alt="HalaPark"
                className="
                  h-200 
                  w-300 
                  max-lg:w-full 
                  max-lg:h-auto 
                  object-cover
                "
              />

              {/* Phone */}
              <div
                className="
                  absolute 
                  top-110 
                  max-lg:top-1/2
                  left-1/2 
                  transform 
                  -translate-x-1/2 
                  -translate-y-1/2 
                  rounded-[2.5rem] 
                  p-3
                "
              >
                <img
                  src="/aboutherophoneimg.png"
                  alt="HalaPark"
                  className="
                    w-140 
                    h-230 
                    max-lg:w-[280px] 
                    max-lg:h-auto 
                    max-sm:w-[220px] 
                    object-cover
                  "
                />

                {/* Gradients */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 max-sm:h-16 bg-gradient-to-t from-white/95 via-white/90 to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 max-sm:h-14 bg-gradient-to-t from-white to-transparent z-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
