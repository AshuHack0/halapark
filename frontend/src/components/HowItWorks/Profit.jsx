"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import FeatureSplit from "./ProfitList";

export default function Profit() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-20 lg:pb-10 max-md:pt-24 max-md:pb-16 max-sm:pt-20 max-sm:pb-14 overflow-hidden bg-white max-w-7xl mx-auto">
      <div className="container mx-auto sm:px-0 px-4">
        <div className="flex flex-col items-center text-center w-full h-full">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
              my-6
            "
          >
            Seamless for Drivers. Profitable for Owners.
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              text-lg 
              max-md:text-base 
              max-sm:text-sm 
              text-slate-600 
              mb-0 
              max-w-3xl
            "
          >
            Whether you're looking for a spot or listing one, HalaPark makes the
            entire process simple, secure, and fully in your control.
          </motion.p>
          <div className="flex gap-2 items-center justify-center mt-4">
            <img src={"/google-play.svg"} alt="Google play" />
            <img src={"/app-store.svg"} alt="App Store" />
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          <FeatureSplit
      left={{
        heading: "For Drivers",
        items: [
          {
            title: "Search Instantly",
            description:
              "Open the app and find available parking spaces near your destination. View real-time availability, compare options, and choose what works best for you.",
          },
          {
            title: "Reserve with Confidence",
            description:
              "Select your preferred time and secure your space in just a few taps. Your spot is guaranteed before you even arrive.",
          },
          {
            title: "Pay Seamlessly",
            description:
              "All payments are handled securely inside the app. No cash. No tickets. No confusion.",
          },
          {
            title: "Arrive & Park",
            description:
              "Drive in, park, and get on with your day. Your booking details are already taken care of, simple and smooth.",
          },
        ],
      }}
      right={{
        heading: "For Parking Space Owners",
        items: [
          {
            title: "List Your Space Easily",
            description:
              "Add your parking space in minutes with simple details and photos to attract nearby drivers.",
          },
          {
            title: "Set Your Own Availability",
            description:
              "Choose when your space is available — full-time, part-time, or only during specific hours.",
          },
          {
            title: "Choose Your Pricing",
            description:
              "Stay in control by setting your own rates based on demand and convenience.",
          },
          {
            title: "Manage Everything from Your Dashboard",
            description:
              "Track bookings, manage schedules, and connect with verified drivers all from one simple, powerful dashboard.",
          },
        ],
      }}
    />
        </div>
      </div>
    </section>
  );
}
