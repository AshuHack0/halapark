// Resolver for the per-service detail pages rendered at /services/[slug].
// CMS-only (matches how solutions works, but with NO hardcoded default details):
// the list passed in comes straight from `sections.serviceDetails` on the
// "services" page, so a deleted detail resolves to null → its page 404s.

export function getServiceDetailBySlug(slug, details) {
  const list = Array.isArray(details) ? details : [];
  return list.find((d) => d.slug === slug) || null;
}
