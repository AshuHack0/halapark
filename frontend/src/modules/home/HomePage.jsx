import HeroSection from "./sections/HeroSection";
import WhoWeAre from "./sections/WhoWeAre";
import BlackBanner from "./sections/BlackBanner";
import SolutionIntegration from "./sections/SolutionIntegration";
import WhyHalapark from "./sections/WhyHalapark";
import EnterpriseSolutions from "./sections/EnterpriseSolutions";
import TechnologySection from "./sections/TechnologySection";
import TrustedUsers from "./sections/TrustedUsers";
import AiPoweredParkingService from "./sections/AiPoweredParkingService";
import MajorFocusHighlight from "./sections/MajorFocusHighlight";
import GlobalMomentumSection from "./sections/GlobalMomentumSection";
import CertificationsSection from "./sections/CertificationsSection";
import ClientsPartners from "./sections/ClientsPartners";
import SmartIntegrations from "./sections/SmartIntegrations";
import SmartFeatures from "./sections/SmartFeatures";
import ParkingJourneyScrollSection from "./sections/ParkingJourneyScrollSection";
import SayGoodbye from "./sections/SayGoodbye";
import Testimonials from "./sections/Testimonials";
import BlogSection from "./sections/BlogSection";
import HalaParkInAction from "./sections/HalaParkInAction";
import SupportContactCTA from "./sections/SupportContactCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <HeroSection />
      <WhoWeAre />
      <WhyHalapark />
      <BlackBanner />
      <EnterpriseSolutions />
      <SolutionIntegration />

      <TechnologySection />
      <AiPoweredParkingService />
      {/* <TrustedUsers /> */}
      {/* <MajorFocusHighlight /> */}
      {/* <GlobalMomentumSection /> */}
      {/* <ParkingJourneyScrollSection /> */}
      {/* <CertificationsSection /> */}
      {/* <ClientsPartners /> */}
      {/* <SmartFeatures /> */}
      {/* <SupportContactCTA /> */}
      <HalaParkInAction />
    </div>
  );
}
