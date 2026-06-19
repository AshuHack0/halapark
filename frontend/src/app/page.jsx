import { HomePage } from "@/modules/home";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export default function Home() {
  return <HomePage />;
}
// this is a test comment
