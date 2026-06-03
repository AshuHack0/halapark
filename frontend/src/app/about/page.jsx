import AboutPage from "@/components/About/AboutPage";
import { fetchAboutContent } from "@/lib/cms";

export default async function About() {
  const content = await fetchAboutContent();
  return <AboutPage content={content} />;
}
