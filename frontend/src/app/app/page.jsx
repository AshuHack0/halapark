import AppHero from "@/components/app/Hero";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";
// import AppDownloadCTA from "@/components/app/AppDownloadCTA";
import AppFeatureHighlights from "@/components/app/AppFeatureHighlights";
import AppScreenshots from "@/components/app/AppScreenshots";
import AppSectionRow from "@/components/app/AppSectionRow";
import AppServiceTabs from "@/components/app/AppServiceTabs";
import AppUserSection from "@/components/app/AppUserSection";
import AboutFeatures from "@/components/About/Features";
import { featureHighlights } from "@/components/app/appContent";
export default function AppPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHero />
      <AppUserSection />
      <AppServiceTabs />

      <AppScreenshots />

      {/* <AppFeatureHighlights /> */}
      <AboutFeatures data={featureHighlights} />
      <HalaParkInAction />
    </div>
  );
}
