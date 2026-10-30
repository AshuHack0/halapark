import { notFound } from "next/navigation";
import { fetchServiceDetails, fetchServices } from "@/lib/cms";
import { getServiceDetailBySlug } from "@/lib/serviceDetailsDefaults";
import ServiceDetailBody from "@/components/services/ServiceDetailBody";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

// Dynamic route — slugs resolve from the CMS at request time. A deleted service
// detail resolves to null → notFound(). No pre-rendered default slugs.
export async function generateStaticParams() {
  const details = await fetchServiceDetails();
  return details.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = getServiceDetailBySlug(slug, await fetchServiceDetails());
  if (!detail) return { title: "Service — HalaPark" };
  return {
    title: `${detail.title || detail.eyebrow} — HalaPark Services`,
    description: detail.intro,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const [details, services] = await Promise.all([
    fetchServiceDetails(),
    fetchServices(),
  ]);
  const detail = getServiceDetailBySlug(slug, details);

  if (!detail) {
    notFound();
  }

  // The detail page's own "Hero / Banner Image" (admin → Service Details) is
  // the source of truth here, so the card image on the Services list and the
  // detail hero can be changed independently. Only when the detail has no
  // image of its own does the card's media fill in (and only if it's an image).
  const service = services.find((s) => (s?.slug || "").trim() === slug);
  const serviceImage =
    service && service.mediaType !== "video" && (service.mediaSrc || "").trim()
      ? service.mediaSrc
      : "";
  const detailImage = detail.image && detail.image !== "/image.png" ? detail.image : "";
  const heroImage = detailImage || serviceImage || null;
  // Phone artwork follows whichever image the hero actually uses.
  const heroMobileImage = (detailImage ? detail.mobileImage : serviceImage ? service.mobileImage : "") || "";

  // `details` is passed as relatedList so "Other Related Services" can resolve
  // each related slug to a live service title + link. `services` provides the
  // canonical per-service image for those related cards. Render through a client
  // body so the language toggle + t() apply (Arabic).
  return (
    <ServiceDetailBody
      detail={detail}
      heroImage={heroImage}
      heroMobileImage={heroMobileImage}
      relatedList={details}
      relatedServices={services}
    />
  );
}
