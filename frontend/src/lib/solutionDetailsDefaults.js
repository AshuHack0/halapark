// Local fallback content for the per-solution detail pages rendered at
// /solutions/[slug]. Mirrors `sections.details` seeded on the "solutions" page
// in the backend, so the pages render correctly even if the CMS has no data yet.

export const DEFAULT_SOLUTION_DETAILS = [
  {
    slug: "smart-parking-management",
    eyebrow: "Smart Parking Management",
    title: "Centralized Control for Every Parking Facility",
    intro:
      "HalaPark gives operators a single, real-time view of occupancy, access, and revenue across every facility — replacing manual processes with intelligent automation and centralized control.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    systemsHeading: "What's Included",
    systems: [
      "Real-time occupancy monitoring",
      "Multi-facility management dashboard",
      "Automated entry & exit control",
      "Live operational reporting",
      "Role-based staff access",
      "Centralized configuration & rules",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Full visibility across all sites in one place",
      "Faster, automated day-to-day operations",
      "Lower operational cost and manual effort",
      "Data-driven decisions from live insights",
      "Scales seamlessly as facilities grow",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Most parking facilities run on disconnected, manual systems with little real-time visibility. This leads to congestion, underused space, revenue leakage, and high operational overhead. HalaPark centralizes everything into one intelligent platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "automated-access-control",
    eyebrow: "Automated Access Control",
    title: "Seamless, Secure Vehicle Access",
    intro:
      "ANPR cameras and smart barrier systems let vehicles enter and exit without tickets or staff intervention — secure, fast, and fully automated.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    systemsHeading: "What's Included",
    systems: [
      "ANPR license plate recognition",
      "Smart barrier & gate control",
      "QR / RFID / mobile access",
      "Whitelist & blacklist management",
      "Visitor & resident access rules",
      "Real-time access logs",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Ticketless, contactless entry and exit",
      "Reduced congestion at access points",
      "Stronger security and audit trail",
      "Lower staffing requirements",
      "Seamless experience for users",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Manual ticketing and barrier control create bottlenecks, security gaps, and a poor user experience. HalaPark automates the full access journey with AI cameras and smart barriers integrated into one platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "parking-guidance-system",
    eyebrow: "Parking Guidance System",
    title: "Real-Time Wayfinding That Reduces Congestion",
    intro:
      "Smart displays and sensors guide drivers straight to available spaces — cutting search time, easing congestion, and improving the in-facility experience.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
    systemsHeading: "What's Included",
    systems: [
      "Live space availability displays",
      "Zone-level guidance signage",
      "Bay-level occupancy sensors",
      "Dynamic directional routing",
      "Digital wayfinding integration",
      "Real-time data feed to the app",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Drivers find spaces faster",
      "Reduced in-facility congestion",
      "Better traffic flow and safety",
      "Higher effective space utilization",
      "Improved customer satisfaction",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Drivers circling for spaces cause congestion, frustration, and wasted capacity. HalaPark's guidance system uses live data and smart signage to route drivers directly to open bays.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "mobile-digital-experience",
    eyebrow: "Mobile & Digital Experience",
    title: "Parking in the Palm of Your Hand",
    intro:
      "A unified mobile and digital experience for reservations, cashless payments, subscriptions, and contactless parking — all from one app.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    systemsHeading: "What's Included",
    systems: [
      "Mobile app (iOS / Android)",
      "Online reservations & pre-booking",
      "Cashless & contactless payments",
      "Subscriptions & season passes",
      "Digital receipts & history",
      "In-app support & notifications",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Frictionless booking and payment",
      "Higher customer loyalty and retention",
      "New recurring revenue streams",
      "Reduced cash handling",
      "Always-on self-service",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Cash-based, on-site-only parking is slow and inconvenient. HalaPark digitizes the full journey — discovery, booking, payment, and support — into one seamless app experience.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "digital-valet-operations",
    eyebrow: "Digital Valet Operations",
    title: "Structured, Trackable Valet Workflows",
    intro:
      "Digital ticketing, vehicle tracking, and retrieval management bring structure and accountability to valet operations.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    systemsHeading: "What's Included",
    systems: [
      "Digital valet ticketing",
      "Vehicle location tracking",
      "Request & retrieval management",
      "SMS / app vehicle requests",
      "Staff task assignment",
      "Valet performance reporting",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Faster, more reliable retrieval",
      "Full accountability and audit trail",
      "Fewer lost tickets and disputes",
      "Better staff coordination",
      "Premium guest experience",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Paper-based valet is error-prone, slow, and hard to audit. HalaPark digitizes valet end-to-end with tickets, tracking, and retrieval workflows in one system.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "ev-charging-integration",
    eyebrow: "EV Charging Integration",
    title: "Integrated EV Charging & Smart Billing",
    intro:
      "Bring EV charging into your parking ecosystem with integrated charging management, smart billing, and real-time monitoring.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    systemsHeading: "What's Included",
    systems: [
      "EV charger management",
      "Smart usage-based billing",
      "Real-time charging status",
      "Reservation of charging bays",
      "Energy & utilization reporting",
      "App-based charging control",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "New revenue from EV charging",
      "Future-ready infrastructure",
      "Unified parking + charging billing",
      "Optimized charger utilization",
      "Attracts EV-driving customers",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "EV charging is often a siloed, manually billed add-on. HalaPark integrates charging into the same platform as parking — with smart billing, monitoring, and reservations.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "ai-parking-analytics",
    eyebrow: "AI & Parking Analytics",
    title: "Turn Parking Data Into Decisions",
    intro:
      "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards help you optimize operations and revenue.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    systemsHeading: "What's Included",
    systems: [
      "Occupancy & utilization analytics",
      "Traffic flow insights",
      "Predictive demand trends",
      "Revenue & performance dashboards",
      "Custom reports & exports",
      "Real-time alerts",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Data-driven operational decisions",
      "Optimized pricing and capacity",
      "Early detection of issues",
      "Clear performance visibility",
      "Continuous improvement over time",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Without analytics, operators run blind — guessing at demand, pricing, and capacity. HalaPark surfaces real-time and predictive insights so every decision is backed by data.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "seamless-integrations",
    eyebrow: "Seamless Integrations",
    title: "End-to-End Connected Infrastructure for Smart Parking",
    intro:
      "HalaPark connects with existing infrastructure to create a unified operational ecosystem without disrupting current systems. It integrates multiple technologies into one intelligent platform for centralized control and real-time operations.",
    image: "/collageallsolutionsection .jpeg",
    systemsHeading: "Integrated Systems",
    systems: [
      "Mobile App (iOS / Android)",
      "Web Portal / Dashboard",
      "ANPR / Area Scanning Cameras",
      "eCam Security / Monitoring System",
      "View 360 System & Processing Unit",
      "QR / RFID / Mobile Access Devices",
      "Network Switch (Connectivity Backbone)",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Unified control of all parking and building systems",
      "Eliminates data silos and system fragmentation",
      "Reduced operational complexity and manual effort",
      "Scalable architecture for future technologies",
      "Seamless integration with existing infrastructure",
    ],
    problemHeading: "Problem We Solve",
    problemBody:
      "Parking and facility systems are often disconnected, with separate platforms for payments, access control, CCTV, and building management. This creates operational inefficiencies, data silos, higher maintenance costs, and limited visibility. HalaPark unifies them into one connected platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
];

export function getSolutionDetailBySlug(slug, details) {
  const list = Array.isArray(details) && details.length ? details : DEFAULT_SOLUTION_DETAILS;
  return list.find((d) => d.slug === slug) || null;
}
