// Default content for the home page's CMS-editable sections.
// Each key mirrors a section's editable content. Components fall back to these
// when the corresponding `sections.<key>` is absent from the CMS, so the live
// page renders identically whether or not the DB has content.
//
// Icons are stored as string names (mapped to lucide components in each
// section) so the content stays serializable for the database/admin.

export const DEFAULT_HOME_CONTENT = {
  whoWeAre: {
    eyebrowHeading: "Who We Are",
    audiences: {
      business: {
        heading: "Who We Are",
        body: "HalaPark is a smart parking company transforming urban parking in the UAE. We deliver fast, seamless digital solutions that connect drivers, businesses, and property owners to improve efficiency, save time, and optimize space.",
      },
      users: {
        heading: "Parking Made Simple for Users",
        body: "We make parking fast and stress-free for everyday drivers. Users can instantly see available parking in real time, reserve and pay within seconds, and move through entry and exit without tickets, delays, or manual steps. With automated access and barrier-free systems, parking becomes fast, predictable, and effortless from start to finish.",
      },
    },
    highlights: [
      {
        icon: "Layers",
        title: "All-in-One Infrastructure",
        description:
          "A fully unified ecosystem that seamlessly combines hardware, software, and operational workflows into one intelligent platform.",
      },
      {
        icon: "TrendingUp",
        title: "Maximize Revenue & Utilization",
        description:
          "Transform underutilized parking assets into optimized, data-driven revenue streams with measurable performance and efficiency.",
      },
      {
        icon: "Building2",
        title: "Scalable by Design",
        description:
          "Designed to support both single-site operations and large-scale enterprise parking networks with ease, flexibility, and reliability.",
      },
    ],
  },

  whyHalapark: {
    heading: "Why Halapark",
    subtitle: "Next-generation platform for intelligent parking solutions",
    items: [
      {
        id: "01",
        icon: "Gauge",
        title: "Smart & Seamless Experience",
        subtitle:
          " Easily find, book, and manage parking in just a few taps with a user-friendly platform.",
        copy: "Convert underutilised parking into consistent, trackable income streams.",
        image: "/Smart & Seamless Experience.jpeg",
        accent: "#0088FF",
      },
      {
        id: "02",
        icon: "ScanLine",
        title: "Cashless s Secure Payments",
        subtitle:
          "Enjoy a fully digital payment system that is fast, reliable, and safe for every transaction.",
        copy: "Eliminate manual processes with automation across access, billing, and management.",
        image: "/Cashless s Secure Payments.jpeg",
        accent: "#0088FF",
      },
      {
        id: "03",
        icon: "CircleDollarSign",
        title: "Automated Smart Access",
        subtitle:
          " Benefit from advanced entry and exit systems powered by camera and barrier technology.",
        copy: "Access real-time dashboards, reporting, and performance insights across all locations.",
        image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
        accent: "#14B8A6",
      },
      {
        id: "04",
        icon: "Clock3",
        title: "Maximize Parking Value",
        subtitle:
          "Optimize space usage and generate additional revenue from underutilized parking areas.",
        copy: "Deploy without replacing your existing systems, we enhance what you already have.",
        image: "/Maximize Parking Value dekhna ye.jpeg",
        accent: "#0088FF",
      },
      {
        id: "05",
        icon: "Clock3",
        title: " AI-Driven Parking Intelligence",
        subtitle:
          "Leverage advanced AI technology for faster access, intelligent space allocation, automated operations, and a seamless parking experience for both users and operators.",
        copy: "Deploy without replacing your existing systems, we enhance what you already have.",
        image: "/AI-Driven Parking Intelligence.jpeg",
        accent: "#0088FF",
      },
    ],
  },
};

// Shallow-merge a CMS section over its default so missing keys fall back.
export function mergeHomeSection(key, cmsSection) {
  const base = DEFAULT_HOME_CONTENT[key] ?? {};
  if (!cmsSection || typeof cmsSection !== "object") return base;
  return { ...base, ...cmsSection };
}
