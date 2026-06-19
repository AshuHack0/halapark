import CareersPage from "@/components/careers/CareersPage";
import { fetchCareersContent } from "@/lib/cms";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function Careers() {
  const content = await fetchCareersContent();
  return <CareersPage content={content} />;
}
