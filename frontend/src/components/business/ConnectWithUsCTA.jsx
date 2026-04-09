"use client";

import { motion } from "framer-motion";

export default function BusinessConnectWithUsCTA() {
  return (
    <section className="py-16 md:py-14 sm:py-12 bg-white">
      <div className="container mx-auto sm:px-0 px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[24px] border border-slate-200 bg-gradient-to-r from-[rgba(0,136,255,0.05)] to-white px-6 py-8 md:px-8 md:py-10 shadow-sm"
        >
          <div className="grid items-start gap-6 md:grid-cols-[230px_1fr] md:gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Connect With Us
            </h2>

            <div>
              <h3 className="text-2xl md:text-[32px] font-semibold leading-tight text-slate-900">
                Ready to Unlock Your Parking Revenue?
              </h3>

              <p className="mt-4 max-w-3xl text-lg md:text-xl leading-relaxed text-[#2A3347]">
                Speak to our business team today. We will walk you through the
                options, costs, and timeline for your property.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-base md:text-lg font-medium">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-[#0088FF] px-7 py-3 text-white transition-colors hover:brightness-95"
                >
                  Get in Touch
                </motion.button>

                <span className="text-[#0088FF]">|</span>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-slate-300 px-7 py-3 text-slate-900 transition-colors hover:bg-slate-50"
                >
                  WhatsApp Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
