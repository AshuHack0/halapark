import {
  FAQHeroSection,
  FAQCategorySection,
  FAQBottomCTA,
} from "@/components/faqs";

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-[rgba(0,136,255,0.05)]">
      <FAQHeroSection />
      <FAQCategorySection />
      <FAQBottomCTA />
    </main>
  );
}
