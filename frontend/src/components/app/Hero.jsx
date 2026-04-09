"use client";
import { motion } from "framer-motion";
import RatingBadge from "../common/RatingBadge";

export default function AppHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-14 overflow-hidden bg-white max-w-full mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center w-full h-full"
        >
          {/* Rating Badge */}
          <motion.div variants={itemVariants} className="mb-4 z-20">
            <RatingBadge
              rating="4.9"
              totalReviews="4268"
              textColor="transparent"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
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
              z-10
            "
          >
            Find Parking Services in <br className="max-sm:hidden" /> UAE Fast,
            Smart, Cashless
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="
              text-lg 
              max-md:text-base 
              max-sm:text-sm 
              text-slate-600 
              mb-0 
              max-w-xl
            "
          >
            Discover public, private & yacht parking with seamless{" "}
            <br className="max-sm:hidden" />
            digital access.
          </motion.p>

          {/* Phone Mockup with Map Background */}
          <motion.div
            variants={itemVariants}
            className="relative w-full mt-10 max-sm:mt-8"
          >
            <div className="inset-0 w-full h-full flex items-center justify-center relative">
              {/* Map Background */}
              <motion.img
                src="/Frame9991171276918.png"
                alt="HalaPark"
                animate={{ scale: [1, 1.02, 1], opacity: [0.92, 1, 0.92] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="
                  h-130 
                  w-230 
                  max-lg:w-full 
                  max-lg:h-auto 
                  object-cover
                "
              />

              {/* Phone */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="
                  absolute 
                  top-90 
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
                  src="/Group-1000004401.png"
                  alt="HalaPark"
                  className="
                    sm:w-68
                    sm:h-100 
                    w-50
                    h-55
                    object-cover
                  "
                />

                {/* Gradients */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 max-sm:h-16 bg-gradient-to-t from-white/95 via-white/90 to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 max-sm:h-14 bg-gradient-to-t from-white to-transparent z-20" />
              </motion.div>

              {/* ellipse1 purple background */}
              <motion.img
                src="/Ellipse3432.png"
                alt="HalaPark"
                animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                className="
                  absolute -top-50 left-0
                  sm:w-200
                  sm:h-200
                  w-150
                  h-150
                  object-cover
                  sm:block hidden
                "
              />
              {/* ellipse2 blue background */}
              <motion.img
                src="/Ellipse23456.png"
                alt="HalaPark"
                animate={{ y: [0, 10, 0], x: [0, 6, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                className="
                  absolute -top-200 -right-50
                  w-300
                  h-300
                  object-cover
                  z-0
                  sm:block hidden
                "
              />
              {/* split 1 background */}
              <motion.img
                src="/Gro4567800004394.png"
                alt="HalaPark"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="
                  absolute sm:top-50 sm:left-50 top-10 left-0
                  sm:w-70
                  sm:h-40
                  w-30
                  h-17
                  object-cover
                  z-10
                "
              />
              {/* split 2 background */}
              <motion.img
                src="/Group0981000004395.png"
                alt="HalaPark"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                className="
                  absolute sm:bottom-0 sm:right-60 bottom-4 right-0
                  sm:w-70
                  sm:h-40
                  w-30
                  h-17
                  object-cover
                  z-10
                "
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
