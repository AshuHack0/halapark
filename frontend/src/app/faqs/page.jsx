import FAQHeroSection from "@/components/faqs/FAQHeroSection";
import { FAQCategorySection, FAQBottomCTA } from "@/components/faqs";
import { fetchPage } from "@/lib/cms";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function FAQsPage() {
  const faqsPage = await fetchPage("faqs");
  const categories = faqsPage?.sections?.faqCategories;

  if (process.env.NODE_ENV === "development") {
    console.log("[CMS] FAQs page", {
      source: Array.isArray(categories) && categories.length ? "api" : "empty",
      categoryCount: Array.isArray(categories) ? categories.length : 0,
    });
  }

  return (
    <main className="min-h-screen bg-white">
      <FAQHeroSection />
      <FAQCategorySection categories={Array.isArray(categories) ? categories : []} />
      <FAQBottomCTA />
    </main>
  );
}
