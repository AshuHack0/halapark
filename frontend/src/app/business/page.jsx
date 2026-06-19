import BusinessHero from "@/components/business/Hero";
import BuiltForEverySpace from "@/components/business/BuiltForEverySpace";
import WhyChooseHalaPark from "@/components/business/WhyChooseHalaPark";
import BusinessSolutions from "@/components/business/BusinessSolutions";
import WhoWeWorkWith from "@/components/business/WhoWeWorkWith";
import PartnersShowcase from "@/components/business/PartnersShowcase";
import TransformParking from "@/components/business/TransformParking";
import HalaParkAdvantage from "@/components/business/HalaParkAdvantage";
import BusinessValueProps from "@/components/business/ValueProps";
import BusinessWhoItsFor from "@/components/business/WhoItsFor";
import BusinessHowToGetStarted from "@/components/business/HowToGetStarted";
import SectionReveal from "@/components/common/SectionReveal";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";
import BusinessCTA from "@/components/business/BusinessCTA";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

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
        <WhyChooseHalaPark />
      </SectionReveal>
      <SectionReveal delay={0.055}>
        <BusinessSolutions />
      </SectionReveal>
      <SectionReveal delay={0.06}>
        <WhoWeWorkWith />
      </SectionReveal>
      <SectionReveal delay={0.065}>
        <PartnersShowcase />
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
