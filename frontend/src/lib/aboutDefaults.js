/** CMS content comes from the backend only — no frontend fallbacks. */
export function mergeAboutContent(page) {
  if (!page?.sections) return null;
  return page.sections;
}

/*
export const DEFAULT_ABOUT_CONTENT = {
  hero: {
    title: "Smart Parking Beyond Expectations",
    tagline: "Intelligent Parking. Smarter Cities. Seamless Movement.",
    description:
      "HalaPark is a smart parking technology company delivering innovative solutions that simplify parking, improve mobility, and support smarter urban environments.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    primaryCtaText: "Partner With HalaPark",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Speak With Our Experts",
    secondaryCtaLink: "/contact",
  },
  mission: { ... },
  vision: { ... },
  story: { ... },
  whatWeDo: { ... },
  technology: { ... },
  cta: { ... },
};
*/
