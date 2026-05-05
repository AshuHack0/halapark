import AppHero from "@/components/app/Hero";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";
// import AppDownloadCTA from "@/components/app/AppDownloadCTA";
import AppFeatureHighlights from "@/components/app/AppFeatureHighlights";
import AppFeatureCardsSection from "@/components/app/AppFeatureCardsSection";
import AppAiPromoSection from "@/components/app/AppAiPromoSection";
import AppCurrencySection from "@/components/app/AppCurrencySection";
import AppDestinationsSection from "@/components/app/AppDestinationsSection";
import HeroSection from "@/components/app/HeroSection";
import AppPlatformSection from "@/components/app/AppPlatformSection";
import AppScreenshots from "@/components/app/AppScreenshots";
import AppSectionRow from "@/components/app/AppSectionRow";
import AppServiceTabs from "@/components/app/AppServiceTabs";
import AppTestimonialSection from "@/components/app/AppTestimonialSection";
import AppUserSection from "@/components/app/AppUserSection";
import AboutFeatures from "@/components/About/Features";
import { featureHighlights } from "@/components/app/appContent";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* <AppHero /> */}
      <HeroSection />
      {/* <AppAiPromoSection /> */}
      {/* <AppUserSection /> */}
      <AppPlatformSection />
      <AppServiceTabs />
      <AppScreenshots />
      <AppCurrencySection />
      <AppFeatureCardsSection />
      {/* <AppTestimonialSection /> */}
      {/* <AppDestinationsSection /> */}

      {/* <AppFeatureHighlights /> */}
      {/* <AboutFeatures data={featureHighlights} /> */}
      <HalaParkInAction />
    </div>
  );
}
