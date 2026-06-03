import CareersPage from "@/components/careers/CareersPage";
import { fetchCareersContent } from "@/lib/cms";

export default async function Careers() {
  const content = await fetchCareersContent();
  return <CareersPage content={content} />;
}
