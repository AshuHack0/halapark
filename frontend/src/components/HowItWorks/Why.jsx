"use client";
import { motion } from "framer-motion";

const features = [
  {
    
      image: "dollar 1.png",
    "title": "Real-time parking availability",
    "description": "Enjoy hassle-free parking with Parkin's intuitive solutions."
  },
  {
    
      image: "dollar 2.png",
    "title": "Secure digital payments",
    "description": "Easily manage all your parking needs, from booking to subscription, with Parking"
  },
  {
      image: "dollar call.svg",
    "title": "Reliable support",
    "description": "Get reliable assistance round the clock for all your parking needs."
  },
  {
     
     image: "dollar5.png",
    "title": "Flexible booking options",
    "description": "Easily manage all your parking needs, from booking to subscription, with Parking"
  },
  {
    image: "dollar6.png",
    "title": "User-friendly experience",
    "description": "Get reliable assistance round the clock for all your parking needs."
  }
];

export default function WhyChooseUs({ pagetype = "about" }) {

  return (
    <section
      id="features"
      className="py-20 lg:py-28 max-md:py-16 max-sm:py-14 bg-white max-w-7xl mx-auto"
    >
      <div className="container mx-auto sm:px-0 px-4 max-sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16 max-md:mb-12 max-sm:mb-10"
        >
          <h2
            className="
              text-3xl 
              sm:text-4xl 
              lg:text-[64px] 
              max-md:text-[42px] 
              max-sm:text-[30px] 
              font-bold 
              text-slate-900 
              mb-4 
              tracking-tight 
              text-nowrap 
              max-md:text-wrap
              text-center
            "
          >
            Why Choose HalaPark?
          </h2>

          <p className="text-slate-600 text-lg max-md:text-base max-sm:text-sm leading-relaxed">
            HalaPark is built to simplify parking for everyone, drivers and
            property owners alike{" "}
          </p>
        </motion.div>

        {/*<div className="grid md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 lg:gap-8 max-sm:gap-5">
          {features.map(
            (feature, idx) => (
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
                className="
                p-6 
                lg:p-8 
                max-sm:p-5 
                rounded-2xl 
                bg-white 
                border-2 
                border-slate-100 
                transition-all 
                duration-300
              "
              >
                <div className="flex items-center gap-4 mb-8 max-sm:mb-5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
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
                  {feature.description}
                </p>
              </motion.div>
            ),
          )}
        </div>*/}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-sm:gap-5">
  {features.map((feature, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
      }}
      className="
        w-full
        sm:w-[47%]
        lg:w-[30%]
        p-6
        lg:p-8
        max-sm:p-5
        rounded-2xl
        bg-white
        border-2
        border-slate-100
        transition-all
        duration-300
      "
    >
      <div className="flex items-center gap-4 mb-8 max-sm:mb-5">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
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
        {feature.description}
      </p>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}
