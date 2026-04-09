"use client";

import { motion } from "framer-motion";
import RatingBadge from "@/components/common/RatingBadge";

export default function BusinessHero() {
  return (
    <section className="relative pt-32 lg:pt-38 flex items-end overflow-hidden max-h-screen bg-gradient-to-l from-[rgba(0,136,255,0.22)] to-white">
      <div className="container mx-auto sm:px-0 px-4 max-w-7xl ">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-md:gap-10 max-sm:gap-8 ">
          {/* Text Content */}
          <div className="lg:w-1/2 z-10 max-lg:text-center mt-20 sm:mt-0 ">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                text-sm
                max-sm:text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#0088FF]
                mb-4
              "
            >
              For Business
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="
                text-5xl 
                lg:text-6xl 
                max-md:text-4xl 
                max-sm:text-3xl 
                font-bold 
                text-slate-900 
                leading-[1.1] 
                mb-6
              "
            >
              Turn Your Parking Into a{" "}
              <span className="text-[#0088FF]">Profit Centre</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
                text-lg 
                max-md:text-base 
                max-sm:text-sm 
                text-[#636363] 
                mb-8 
                max-md:mb-6 
                max-w-lg 
                leading-relaxed 
                max-lg:mx-auto
              "
            >
              Whether you own one bay or manage a 500-space facility, HalaPark
              gives you the tools, technology, and team to run a smarter, more
              profitable parking operation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                flex 
                flex-col 
                sm:flex-row 
                items-center 
                gap-6 
                max-sm:gap-4
                max-lg:justify-center
              "
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 
                  py-3 
                  max-sm:px-6 
                  bg-[#0088FF] 
                  text-white 
                  rounded-full 
                  font-medium 
                  text-base 
                  max-sm:text-sm 
                  hover:brightness-95 
                  transition-colors
                "
              >
                Connect With Us
              </motion.button>

              <RatingBadge
                rating="4.9"
                totalReviews="4268"
                textColor="transparent"
                shadow="none"
                border="true"
              />
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="lg:w-1/2 relative flex justify-center lg:self-end">
            <img
              src="/asnkjadnkan.png"
              alt=""
              className="
                pl-15 
                w-[72%]
                max-w-[420px]
                max-lg:pl-0 
                max-md:w-[70%] 
                max-sm:w-[58%] 
                h-auto
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
