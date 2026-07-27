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

  // The card's image (managed via CMS "Our Solutions" cards) is the source of
  // truth for this solution. Fall back to the detail's own image, then default.
  const card = cards.find((c) => c.slug === slug);
  const heroImage = card?.image || detail.image || "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png";

  // `details` is passed as relatedList so "Other Related Services" can resolve
  // each related slug to a live solution title + link. `cards` provides the
  // canonical per-solution image for those related cards. Render through a client
  // body so the language toggle + t() apply (Arabic).
  return <SolutionDetailBody detail={detail} heroImage={heroImage} relatedList={details} relatedCards={cards} advantages={advantages} />;
}
