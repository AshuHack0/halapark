import FAQHeroSection from "@/components/faqs/FAQHeroSection";
import { FAQCategorySection, FAQBottomCTA } from "@/components/faqs";

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      <FAQHeroSection />
      <FAQCategorySection />
      <FAQBottomCTA />
    </main>
  );
}
