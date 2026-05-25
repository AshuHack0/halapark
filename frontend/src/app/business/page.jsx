import BusinessHero from "@/components/business/Hero";
import BuiltForEverySpace from "@/components/business/BuiltForEverySpace";
import BusinessSolutions from "@/components/business/BusinessSolutions";
import WhoWeWorkWith from "@/components/business/WhoWeWorkWith";
import TransformParking from "@/components/business/TransformParking";
import HalaParkAdvantage from "@/components/business/HalaParkAdvantage";
import BusinessValueProps from "@/components/business/ValueProps";
import BusinessWhoItsFor from "@/components/business/WhoItsFor";
import BusinessHowToGetStarted from "@/components/business/HowToGetStarted";
import SectionReveal from "@/components/common/SectionReveal";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";
import BusinessCTA from "@/components/business/BusinessCTA";

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <SectionReveal>
        <BusinessHero />
      </SectionReveal>
      <SectionReveal delay={0.04}>
        <BuiltForEverySpace />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <BusinessSolutions />
      </SectionReveal>
      <SectionReveal delay={0.06}>
        <WhoWeWorkWith />
      </SectionReveal>
      <SectionReveal delay={0.07}>
        <TransformParking />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <HalaParkAdvantage />
      </SectionReveal>
      {/* <SectionReveal delay={0.09}>
        <BusinessValueProps />
      </SectionReveal> */}
      {/* <SectionReveal delay={0.08}>
        <BusinessWhoItsFor />
      </SectionReveal> */}
      {/* <SectionReveal delay={0.1}>
        <BusinessHowToGetStarted />
      </SectionReveal> */}
      {/* <SectionReveal delay={0.12}>
        <HalaParkInAction />
      </SectionReveal> */}
      <SectionReveal delay={0.14}>
        <BusinessCTA />
      </SectionReveal>
    </div>
  );
}
