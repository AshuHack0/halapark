"use client";
import { motion } from "framer-motion";

export default function AboutMissionVision() {
  const sections = [
    {
      tag: "Mission",
      tagColor: "bg-[#0088FF]",
      title: "Shaping the Future of Parking",
      desc: "From our mission and vision to expert consulting, we deliver smart, scalable parking solutions designed for modern urban mobility.",
      image: "Rectangle-947.png",
      imageAlt: "Modern parking garage with blue lighting",
    },
    {
      tag: "Vision",
      tagColor: "bg-[#FDAF57]",
      title: "Building Smarter Parking Ecosystems",
      desc: "Guided by a clear mission and vision, we help businesses and cities optimize parking through technology and strategic consulting.",
      image: "Rectangle-947-1.png",
      imageAlt: "Yellow parking garage level",
    },
    {
      tag: "Consulting",
      tagColor: "bg-[#0088FF]",
      title: "Purpose-Driven Parking Solutions",
      desc: "Combining innovation, strategy, and consulting to transform how parking is planned, managed, and experienced.",
      image: "Rectangle-948.png",
      imageAlt: "Smart parking barrier system",
    },
  ];

  return (
    <section id="mission" className="py-20 lg:py-28 bg-white max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Sticky Only On Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 self-start h-fit"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 sm:leading-15 tracking-tight mb-6">
              Driven by Purpose.
              <br className="sm:block hidden" />
              Built for Smarter
              <br className="sm:block hidden" />
              Parking.
            </h2>

            <p className="text-slate-600 sm:text-lg text-base sm:leading-relaxed max-w-md">
              Our mission, vision, and consulting expertise come together to
              create intelligent parking solutions that improve experiences for
              drivers, partners, and cities.
            </p>
          </motion.div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="bg-[rgba(0,136,255,0.10)] rounded-3xl p-6 lg:p-8 border border-[rgba(0,136,255,0.12)]"
              >
                <span
                  className={`inline-block px-4 py-1.5 ${section.tagColor} text-white sm:text-base text-sm font-regular rounded-full mb-4`}
                >
                  {section.tag}
                </span>

                <h3 className="text-lg lg:text-[32px] font-bold text-slate-900 mb-3">
                  {section.title}
                </h3>

                <p className="text-[#717171] mb-6 sm:leading-relaxed leading-tight sm:text-base text-[14px] font-medium">
                  {section.desc}
                </p>

                <div className="relative rounded-2xl overflow-hidden aspect-video sm:h-64 h-35 w-full">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Disable Animations on Tablet & Mobile */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .motion-reduce * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
