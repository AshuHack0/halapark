import BusinessHero from "@/components/business/Hero";
import BusinessValueProps from "@/components/business/ValueProps";
import BusinessWhoItsFor from "@/components/business/WhoItsFor";
import BusinessHowToGetStarted from "@/components/business/HowToGetStarted";
import SectionReveal from "@/components/common/SectionReveal";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <SectionReveal>
        <BusinessHero />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <BusinessValueProps />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <BusinessWhoItsFor />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <BusinessHowToGetStarted />
      </SectionReveal>
      <SectionReveal delay={0.12}>
        <HalaParkInAction />
      </SectionReveal>
    </div>
  );
}
