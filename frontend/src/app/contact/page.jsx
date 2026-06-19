import { ContactSection } from "@/components/contact";
import HalaParkInAction from "@/modules/home/sections/HalaParkInAction";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactSection />
      {/* <ContactSection /> */}
      {/* <FAQSection /> */}
      {/* <AppPromotionSection /> */}
      <HalaParkInAction />
    </div>
  );
}
