"use client";
import { motion } from "framer-motion";

export default function BusinessFeatures() {
  const features = [
    {
      image: "dollar 1.png",
      title: "Seamless Barrier",
      desc: "Enjoy hassle-free parking with Parkin's intuitive solutions.",
    },
    {
      image: "dollar 2.png",
      title: "Park Now, Pay Later",
      desc: "Easily manage all your parking needs, from booking to subscription, with Parking.",
    },
    {
      image: "dollar 2-1.png",
      title: "Custom Integration",
      desc: "Get reliable assistance round the clock for all your parking needs.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 max-md:py-16 max-sm:py-14 bg-white max-w-7xl mx-auto"
    >
      <div className="container mx-auto sm:px-0 px-4 max-sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 max-md:mb-12 max-sm:mb-10"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-slate-900 mb-4">
            Why HalaPark?
          </h2>
          <p className="text-[#50576B] text-lg max-md:text-base max-sm:text-sm font-medium">
            Discover a simpler way to find, book, and manage parking with
            seamless digital access across the UAE.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-md:gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
              }}
              className="p-6 lg:p-8 max-sm:p-5 rounded-2xl bg-white border-2 border-slate-100 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8 max-sm:mb-6">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <h3 className="text-lg max-sm:text-base font-medium text-slate-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-slate-600 text-base max-sm:text-sm font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
