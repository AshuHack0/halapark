import { notFound } from "next/navigation";
import { fetchSolutionDetails, fetchSolutionCards, fetchSolutionAdvantages } from "@/lib/cms";
import { getSolutionDetailBySlug } from "@/lib/solutionDetailsDefaults";
import SolutionDetailBody from "@/components/solutions/SolutionDetailBody";

export const dynamic = "force-dynamic";

// Dynamic route — slugs resolve from the CMS at request time. A deleted solution
// resolves to null → notFound(). No pre-rendered default slugs.
export async function generateStaticParams() {
  const details = await fetchSolutionDetails();
  return details.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = getSolutionDetailBySlug(slug, await fetchSolutionDetails());
  if (!detail) return { title: "Solution — HalaPark" };
  return {
    title: `${detail.eyebrow || detail.title} — HalaPark Solutions`,
    description: detail.intro,
  };
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const [details, cards, advantages] = await Promise.all([
    fetchSolutionDetails(),
    fetchSolutionCards(),
    fetchSolutionAdvantages(),
  ]);
  const detail = getSolutionDetailBySlug(slug, details);

  if (!detail) {
    notFound();
  }

  // The detail's own Banner Image wins, so the card and the detail hero can be
  // two different photos (the card image used to override it, which made the
  // Banner Image field on the Solution Detail impossible to see). The shared
  // "/image.png" placeholder counts as "not set" so a solution that has never
  // had a banner uploaded still falls back to its card image.
  const card = cards.find((c) => c.slug === slug);
  const isRealImage = (src) => {
    const v = (src || "").trim();
    return Boolean(v) && !/\/image\.png$/i.test(v);
  };
  const heroImage =
    (isRealImage(detail.image) && detail.image) ||
    (isRealImage(card?.image) && card.image) ||
    "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png";
  // Phone artwork follows whichever image the hero actually uses.
  const heroMobileImage =
    (isRealImage(detail.image) ? detail.mobileImage : isRealImage(card?.image) ? card.mobileImage : "") || "";

  // `details` is passed as relatedList so "Other Related Services" can resolve
  // each related slug to a live solution title + link. `cards` provides the
  // canonical per-solution image for those related cards. Render through a client
  // body so the language toggle + t() apply (Arabic).
  return <SolutionDetailBody detail={detail} heroImage={heroImage} heroMobileImage={heroMobileImage} relatedList={details} relatedCards={cards} advantages={advantages} />;
}
