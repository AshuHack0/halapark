import SolutionsPage from "@/components/solutions/SolutionsPage";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Solutions — HalaPark",
  description:
    "Intelligent parking infrastructure for modern facilities. AI-powered smart parking for residential, commercial, and mixed-use developments across the UAE.",
};

export default function Page() {
  return <SolutionsPage />;
}
