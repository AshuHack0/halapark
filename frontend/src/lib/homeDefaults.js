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

  aiPoweredParkingService: {
    cards: [
      {
        title: "For User",
        ctaLabel: "View for Customer",
        audienceTag: "APP EXPERIENCE",
        description: "Intelligent automation helps you find and access available parking faster, reducing wait time and making every journey smooth and stress-free.",
        href: "/app",
      },
      {
        title: "For Businesses /\nProperty owners",
        ctaLabel: "View for Business",
        audienceTag: "BUSINESS SUITE",
        description: "Advanced automation streamlines parking management, improves space utilization, and delivers real-time insights to increase efficiency and revenue.",
        href: "/business",
      },
    ],
  },

  howItWorksDemoSection: {
    heading: "How It Works",
    subtitle: "The Power of Smart Parking",
    videoUrl: "",
    steps: [
      { title: "Find", description: "Discover available parking spaces in real-time." },
      { title: "Book", description: "Reserve your spot instantly." },
      { title: "Park", description: "Enjoy seamless access and hassle-free parking." },
    ],
    ctaLabel: "Explore More",
    ctaHref: "/services",
  },

  blackBanner: {
    title: "Ready to Transform Your Parking?",
    description: "Join thousands of users and businesses already experiencing smarter parking with HalaPark.",
    ctas: [
      { label: "Get Started", href: "/contact" },
      { label: "View Solutions", href: "/services" },
    ],
  },

  goodLookingServicesSection: {
    integrations: [
      { name: "Self-Parking", backgroundColor: "#0088FF" },
      { name: "Valet Service", backgroundColor: "#00D084" },
      { name: "EV Charging", backgroundColor: "#FF6B35" },
      { name: "VIP Parking", backgroundColor: "#9D4EDD" },
      { name: "Fleet Solutions", backgroundColor: "#3A86FF" },
      { name: "Barrier-Free", backgroundColor: "#FB5607" },
    ],
  },

  solutionIntegration: {
    heading: "Integrated Solutions",
    subtitle: "Everything You Need",
    cards: [
      { title: "Mobile Platform", description: "User-friendly apps and interfaces." },
      { title: "Smart Infrastructure", description: "Advanced technology for automated access." },
      { title: "Real-Time Analytics", description: "Data-driven insights to optimize operations." },
      { title: "Secure Payments", description: "Seamless, secure transactions." },
      { title: "Integration APIs", description: "Connect with your existing systems." },
      { title: "24/7 Support", description: "Dedicated support team." },
    ],
  },

  technologySection: {
    heading: "Technology",
    subtitle: "Built for the Future",
  },

  clientsPartners: {
    heading: "Trusted by Leading Brands",
    logoPlaceholders: Array(8).fill({ name: "Partner Logo" }),
  },

  globalMobilityNetworkSection: {
    heading: "Global Mobility Network",
    subtitle: "Connecting Smart Parking Worldwide",
    capabilities: [
      { icon: "Globe", title: "Worldwide Coverage", description: "Operating across multiple regions." },
      { icon: "Zap", title: "Real-Time Intelligence", description: "Connected systems delivering insights." },
      { icon: "Shield", title: "Enterprise Security", description: "Bank-level security." },
    ],
    stats: [
      { number: "50+", label: "Parking Locations" },
      { number: "100K+", label: "Active Users" },
      { number: "99.9%", label: "Uptime" },
      { number: "24/7", label: "Support Available" },
    ],
  },

  halaParkInAction: {
    heading: "HalaPark In Action",
    subtitle: "See It Live",
    storeLinks: [
      { name: "Apple App Store", url: "https://apps.apple.com/us/app/halapark-all-about-parking/id1590800416" },
      { name: "Google Play Store", url: "https://play.google.com/store/apps/details?id=com.app.halapark&pli=1" },
      { name: "Web Platform", url: "https://halapark.com" },
    ],
  },
};

// Shallow-merge a CMS section over its default so missing keys fall back.
export function mergeHomeSection(key, cmsSection) {
  const base = DEFAULT_HOME_CONTENT[key] ?? {};
  if (!cmsSection || typeof cmsSection !== "object") return base;
  return { ...base, ...cmsSection };
}
