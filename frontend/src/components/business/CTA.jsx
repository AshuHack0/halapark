"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BusinessCTA() {
  return (
    <section
      id="contact"
      className="py-24 max-md:py-16 max-sm:py-14 bg-white max-w-7xl mx-auto"
    >
      <div className="container mx-auto px-6 max-sm:px-4 text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="
              text-[64px] 
              max-md:text-[48px] 
              max-sm:text-[34px] 
              font-bold 
              text-slate-900 
              mb-3 
              w-full 
              text-nowrap 
              max-md:text-wrap
            "
          >
            Simple. Smart. Profitable.
          </h2>

          <p
            className="
              text-xl 
              max-md:text-lg 
              max-sm:text-base 
              text-[#50576B] 
              font-medium 
              mb-10 
              max-md:mb-8 
              max-sm:mb-6
            "
          >
            Whether you are a daily commuter, a business traveler, or a property
            owner, HalaPark gives you control, clarity, and convenience in every
            interaction.
          </p>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-8
                py-3
                max-sm:px-6
                max-sm:py-3
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
              Let's Connect
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
