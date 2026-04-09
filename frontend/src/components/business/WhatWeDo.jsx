"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function BusinessWhatWeDo() {
  const images = [
    "Frame0p1171276920.png",
    "Frame09k1171276921.png",
    "Frame1171276894.png",
    "Frame781171276922.png",
    "Frame--1171276919.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [blurredImages, setBlurredImages] = useState([]);

  useEffect(() => {
    const clearTime = 3000; // clear for 3 sec
    const totalCycle = 6000; // full cycle

    const timer = setTimeout(() => {
      // Move current to blurred stack
      setBlurredImages((prev) => [
        ...prev,
        {
          id: currentIndex,
          src: images[currentIndex],
        },
      ]);

      // Move to next image
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, clearTime);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Remove blurred image after 3 seconds
  useEffect(() => {
    if (blurredImages.length === 0) return;

    const removeTimer = setTimeout(() => {
      setBlurredImages((prev) => prev.slice(1));
    }, 3000);

    return () => clearTimeout(removeTimer);
  }, [blurredImages]);

  const rotation = currentIndex % 2 === 0 ? 8 : -8;

  return (
    <section className="py-24 md:py-20 sm:py-16 overflow-hidden max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-2 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-14 sm:mb-10"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-slate-900 mb-4">
            What We Do
          </h2>
          <p className="text-[#50576B] text-lg sm:text-base font-medium">
            HalaPark makes parking simple, stress-free and profitable. With our
            innovative platform you can:
          </p>
        </motion.div>

        {/* Visual Banner */}
        {/* <div
          className="relative w-full h-64 md:h-80 sm:h-56
      rounded-3xl bg-gradient-to-t from-[#0088FFBA] to-[#0088FF0A]/10
      mb-20 md:mb-16 sm:mb-12
      overflow-hidden flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt=""
              initial={{ y: -250, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: rotation }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="absolute w-72 md:w-80 sm:w-64 h-auto z-10"
            />
          </AnimatePresence>
        </div> */}

        <div
          className="relative w-full h-64 md:h-80 sm:h-56
      rounded-3xl bg-gradient-to-t from-[#0088FFBA] to-[#0088FF0A]/10
      mb-20 md:mb-16 sm:mb-12
      overflow-hidden flex items-center justify-center"
        >
          {/* Blurred Previous Images */}
          <AnimatePresence>
            {blurredImages.map((img) => (
              <motion.img
                key={`blur-${img.id}`}
                src={img.src}
                initial={{ opacity: 1 }}
                animate={{ filter: "blur(5px)", opacity: 0.5 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.8 }}
                className="absolute w-72 md:w-80 sm:w-64 h-auto z-10"
              />
            ))}
          </AnimatePresence>

          {/* Current Image */}
          <motion.img
            key={`current-${currentIndex}`}
            src={images[currentIndex]}
            initial={{ y: -250, opacity: 0, rotate: 0 }}
            animate={{ y: 0, opacity: 1, rotate: rotation }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
            className="absolute w-72 md:w-80 sm:w-64 h-auto z-20"
          />
        </div>

        {/* Split Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-6 sm:gap-5">
          {/* Drivers Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-8 sm:p-6 rounded-[12px] shadow-sm border border-slate-100"
          >
            <span className="inline-block px-3 py-3 bg-[rgba(0,136,255,0.08)] text-[#0088FF] text-[14px] font-semibold rounded-[10px] mb-4">
              For Drivers
            </span>

            <h3 className="text-3xl sm:text-3xl lg:text-[32px] font-medium text-slate-900 mb-2">
              Stress-Free Parking at Your Fingertips
            </h3>

            <p className="text-[#737373] text-base sm:text-sm font-medium mb-8 sm:mb-6">
              No more circling the block. No more cash payments. No more
              uncertainty.
            </p>

            <button className="w-full py-3 border border-slate-200 rounded-lg text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group shadow-md">
              Schedule A Call
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <ul className="mt-8 sm:mt-6 space-y-4 sm:space-y-3">
              {[
                "Find available parking instantly",
                "Book your spot in advance",
                "Pay securely and cashlessly",
                "Enjoy touchless entry with smart camera access",
                "Extend or auto-renew your session anytime",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base sm:text-sm font-normal text-[#171717]"
                >
                  <div className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[#737373]">
                    <Check size={18} strokeWidth={2} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Owners Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-8 sm:p-6 rounded-[12px] shadow-sm"
          >
            <span className="inline-block px-3 py-3 bg-[rgba(0,136,255,0.08)] text-[#0088FF] text-[14px] font-semibold rounded-[10px] mb-4">
              For Property Owners
            </span>

            <h3 className="text-3xl sm:text-3xl lg:text-[32px] font-medium text-slate-900 mb-2">
              Turn Space Into Revenue
            </h3>

            <p className="text-[#737373] text-base sm:text-sm font-medium mb-8 sm:mb-6">
              HalaPark empowers property owners, developers, and facility
              managers.
            </p>

            <button className="w-full py-3 bg-[#171717] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#171717]/80 transition-colors flex items-center justify-center gap-2 group">
              Schedule A Call
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <ul className="mt-8 sm:mt-6 space-y-4 sm:space-y-3">
              {[
                "Smart parking management solutions",
                "Increased occupancy and revenue potential",
                "Automated booking and payment systems",
                "Real-time monitoring and reporting",
                "Marketing exposure through the HalaPark network",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base sm:text-sm font-normal text-[#171717]"
                >
                  <div className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[#737373]">
                    <Check size={18} strokeWidth={2} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
