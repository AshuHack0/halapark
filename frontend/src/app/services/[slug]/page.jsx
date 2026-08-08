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

  // The service card's media (managed via CMS "Services") is the source of
  // truth for this service's hero image — but only when it IS an image. Falls
  // back to the detail's own image; with neither, the hero renders without one.
  const service = services.find((s) => (s?.slug || "").trim() === slug);
  const serviceImage =
    service && service.mediaType !== "video" && (service.mediaSrc || "").trim()
      ? service.mediaSrc
      : "";
  const detailImage = detail.image && detail.image !== "/image.png" ? detail.image : "";
  const heroImage = serviceImage || detailImage || null;

  // `details` is passed as relatedList so "Other Related Services" can resolve
  // each related slug to a live service title + link. `services` provides the
  // canonical per-service image for those related cards. Render through a client
  // body so the language toggle + t() apply (Arabic).
  return (
    <ServiceDetailBody
      detail={detail}
      heroImage={heroImage}
      relatedList={details}
      relatedServices={services}
    />
  );
}
