import AboutCTASection from "@/components/About/AboutCTASection";
import CompanyStatsSection from "@/components/About/CompanyStatsSection";
import CoreValuesSection from "@/components/About/CoreValuesSection";
import AboutHero from "@/components/About/Hero";
import MissionVisionSection from "@/components/About/MissionVisionSection";
import StorySection from "@/components/About/StorySection";
import TeamSection from "@/components/About/TeamSection";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <section className="max-w-7xl mx-auto pb-20 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="space-y-6 lg:space-y-8">
            <StorySection />
            <MissionVisionSection />
            <CoreValuesSection />
            <CompanyStatsSection />
            <TeamSection />
            <AboutCTASection />
          </div>
        </div>
      </section>
      <HalaParkInAction />
    </div>
  );
}
