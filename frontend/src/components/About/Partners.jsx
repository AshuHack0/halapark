"use client";
import { motion } from "framer-motion";
export default function AboutPartners() {
  return (
    <section
      id="partners"
      className="py-20 bg-white border-t border-slate-100 max-w-7xl mx-auto"
    >
      <div className="container mx-auto sm:px-0 px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-500 mb-8"
        >
          In collaboration with
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {/* Partner 1 */}
          <div className="flex items-center gap-2 transition-opacity">
            <img
              src="/QMobilityLogo-colored 2.png"
              alt="Parking"
              className="w-40 h-full object-cover"
            />
          </div>

          {/* Partner 2 */}
          <div className="flex items-center gap-2 transition-opacity">
            <img
              src="/PARKIN.AE_BIG 2.png"
              alt="Parking"
              className="w-20 h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
