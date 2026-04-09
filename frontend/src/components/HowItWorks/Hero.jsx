"use client";

import { motion } from "framer-motion";
import RatingBadge from "../common/RatingBadge";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-10 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-14 overflow-hidden bg-white max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center w-full h-full"
        >
          {/* Rating Badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <RatingBadge
              rating="4.9"
              totalReviews="4268"
              textColor="#000000"
              className={{ text: "!text-[#000000]" }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="
              text-4xl 
              sm:text-5xl 
              lg:text-[64px] 
              max-md:text-[40px] 
              max-sm:text-[30px] 
              font-bold 
              text-slate-900 
              leading-tight
              tracking-tight 
              my-6 
              max-w-4xl
            "
          >
            How HalaPark Works
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="
              text-lg 
              max-md:text-base 
              max-sm:text-sm 
              text-slate-600 
              max-w-3xl
            "
          >
            HalaPark connects drivers with available parking spaces in seconds,
            making city parking easier,
            <br className="max-sm:hidden" />
            faster, and stress-free.
          </motion.p>

          {/* Mockup Section */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-14 max-sm:mt-10"
          >
            <div className="relative flex items-center justify-center">
              <motion.img
                src="/work-banner.webp"
                alt="Map Background"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="max-lg:w-full max-lg:h-auto object-cover"
              />

              

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}