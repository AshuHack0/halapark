import BlurEllipse1 from "@/components/Gradient/BlurEllipse1";
import Hero from "@/components/HowItWorks/Hero";
import Profit from "@/components/HowItWorks/Profit";
import WhyChooseUs from "@/components/HowItWorks/Why";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";

export default function HowItWorks() {
  return (
    <div className="min-h-screen relative bg-white">
      <div className="relative">
        <Hero />
        <Profit />
        <WhyChooseUs />
        <HalaParkInAction />
      </div>
    </div>
  );
}
