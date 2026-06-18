import { API_URL } from "@/config/api";
import { mergeAboutContent } from "@/lib/aboutDefaults";
import { DEFAULT_SOLUTION_DETAILS, getSolutionDetailBySlug } from "@/lib/solutionDetailsDefaults";

export const DEFAULT_HOME_SLIDES = [
  {
    id: 1,
    cardImg: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    tag: "Smart Parking Made Simple",
    title:
      " Find, book, and manage parking spaces with HalaPark, the smart platform for drivers, businesses, and property owners",
    subtitle:
      "Hala Park enables property owners, developers, and operators to convert parking infrastructure into fully automated, revenue-generating assets powered by smart technology and AI-driven operations.",
    description:
      "Find, book, and manage parking spaces with HalaPark, the smart platform for drivers, businesses, and property owners.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    video: "/Halapark%20Hero%20Page-Ai.mp4",
  },
  {
    id: 2,
    cardImg: "/3ca506f760b463d2f3eb686fb08621c5.jpg.jpeg",
    tag: "The Future of Parking Starts Here",
    title:
      "Experience seamless, cashless parking with real-time availability and smart access, all in one powerful platform",
    subtitle:
      "From single properties to large portfolios, Hala Park enables you to grow revenue streams, reduce operational costs, and future-proof your parking ecosystem.",
    description:
      "List your space in minutes and start earning effortlessly. Smart pricing and secure bookings ensure consistent returns.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
  },
  {
    id: 3,
    cardImg: "/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png",
    tag: "No More Parking Hassles.",
    title:
      "Quickly discover available parking, reserve your spot, and park stress-free with HalaPark.",
    subtitle: "Charging that fits your routine.",
    description:
      "Locate and reserve charging-enabled parking in one go. Power up while you go about your day, no extra stops needed.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  },
  {
    id: 4,
    cardImg: "/valet on demand short image.png",
    tag: "Valet On Demand",
    title: "Walk In Like You Own the Place",
    subtitle: "Premium parking without the wait.",
    description:
      "Request a valet instantly and skip the hassle of finding a spot. Arrive, hand over, and move on, effortless from start to finish.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  },
  {
    id: 5,
    cardImg: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    tag: "Barrier-Free Parking",
    title: "Blink and You're Already In",
    subtitle: "Seamless entry, zero friction.",
    description:
      "License plate recognition handles access automatically. No tickets, no delays, just drive in and out with ease.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
  {
    id: 6,
    cardImg: "/37ea36b9e2f10ae7848280afbc3236af.jpg.jpeg",
    tag: "Parking Management",
    title: "Less Chaos. More Control. More Revenue.",
    subtitle: "Everything managed from one place.",
    description:
      "Monitor, optimize, and scale operations across all locations. Smart insights and automation keep everything running at peak efficiency.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  },
];

/*
export const DEFAULT_CAREERS_CONTENT = {
  hero: { title: "Park Your Career in the Right Place", ... },
  building: { ... },
  opportunities: [ ... ],
  whyJoin: { ... },
  cta: { ... },
};
*/

const CMS_LOG_PREFIX = "[CMS]";

function cmsLog(...args) {
  if (process.env.NODE_ENV === "development") {
    console.log(CMS_LOG_PREFIX, ...args);
  }
}

export async function fetchPage(slug) {
  const url = `${API_URL}/api/pages/${slug}`;
  cmsLog("fetchPage →", url);

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    cmsLog("fetchPage ←", slug, { status: res.status, ok: res.ok, url });

    if (!res.ok) {
      const text = await res.text();
      let errorBody = text;
      try {
        errorBody = JSON.parse(text);
      } catch {
        // keep raw text
      }
      cmsLog("fetchPage failed (non-OK)", slug, res.status, errorBody);
      return null;
    }

    const data = await res.json();
    const page = data.page ?? null;

    cmsLog("fetchPage data", slug, {
      slug: page?.slug,
      published: page?.published,
      sectionKeys: page?.sections ? Object.keys(page.sections) : [],
    });

    return page;
  } catch (err) {
    cmsLog("fetchPage error", slug, url, err?.message ?? err);
    return null;
  }
}

export async function fetchHomeHeroSlides() {
  const page = await fetchPage("home");
  const slides = page?.sections?.hero?.slides;
  if (Array.isArray(slides) && slides.length > 0) {
    cmsLog("fetchHomeHeroSlides → using API", { count: slides.length });
    return slides;
  }
  cmsLog("fetchHomeHeroSlides → using DEFAULT_HOME_SLIDES", {
    count: DEFAULT_HOME_SLIDES.length,
  });
  return DEFAULT_HOME_SLIDES;
}

// The home page has many CMS-editable sections; they each need its slice of
// `sections`. Cache the in-flight fetch so one page load = one request,
// regardless of how many sections ask for content.
let _homeSectionsPromise = null;

export function fetchHomeSections() {
  if (!_homeSectionsPromise) {
    _homeSectionsPromise = fetchPage("home")
      .then((page) => page?.sections ?? {})
      .catch(() => ({}));
  }
  return _homeSectionsPromise;
}

// Returns just one section's stored content (or null if absent).
export async function fetchHomeSection(key) {
  const sections = await fetchHomeSections();
  return sections?.[key] ?? null;
}

export function mergeCareersContent(page) {
  if (!page?.sections) return null;
  return page.sections;
}

export async function fetchCareersContent() {
  const page = await fetchPage("careers");
  const content = mergeCareersContent(page);
  cmsLog("fetchCareersContent", {
    source: content ? "api" : "none",
    heroTitle: content?.hero?.title ?? null,
  });
  return content;
}

export async function fetchAboutContent() {
  const page = await fetchPage("about");
  const content = mergeAboutContent(page);
  cmsLog("fetchAboutContent", {
    source: content ? "api" : "none",
    heroTitle: content?.hero?.title ?? null,
  });
  return content;
}

let _businessSectionsPromise = null;

function fetchBusinessSections() {
  if (!_businessSectionsPromise) {
    _businessSectionsPromise = fetchPage("business")
      .then((page) => page?.sections ?? {})
      .catch(() => ({}));
  }
  return _businessSectionsPromise;
}

export async function fetchBusinessContent() {
  const sections = await fetchBusinessSections();
  cmsLog("fetchBusinessContent", {
    source: Object.keys(sections).length > 0 ? "api" : "none",
    sections: Object.keys(sections),
  });
  return sections;
}

export async function fetchBusinessSection(key) {
  const sections = await fetchBusinessSections();
  return sections?.[key] ?? null;
}

// ─── Solutions: per-solution detail pages ─────────────────────────────────────
// Detail content lives under the "solutions" page as `sections.details` (array,
// keyed by slug). Falls back to local defaults so pages always render.

export async function fetchSolutionDetails() {
  const page = await fetchPage("solutions");
  const details = page?.sections?.details;
  if (Array.isArray(details) && details.length > 0) {
    cmsLog("fetchSolutionDetails → using API", { count: details.length });
    return details;
  }
  cmsLog("fetchSolutionDetails → using DEFAULT_SOLUTION_DETAILS", {
    count: DEFAULT_SOLUTION_DETAILS.length,
  });
  return DEFAULT_SOLUTION_DETAILS;
}

// Shared "Advantages of Our Solutions" block, shown on every detail page.
export async function fetchSolutionAdvantages() {
  const page = await fetchPage("solutions");
  const adv = page?.sections?.solutions?.advantages;
  if (adv && Array.isArray(adv.items) && adv.items.length > 0) {
    return adv;
  }
  return null;
}

export async function fetchSolutionDetail(slug) {
  const details = await fetchSolutionDetails();
  return getSolutionDetailBySlug(slug, details);
}
