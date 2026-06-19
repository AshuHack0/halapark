import AboutPage from "@/components/About/AboutPage";
import { fetchAboutContent } from "@/lib/cms";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function About() {
  const content = await fetchAboutContent();
  return <AboutPage content={content} />;
}
