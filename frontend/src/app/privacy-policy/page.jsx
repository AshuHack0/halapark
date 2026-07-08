import LegalPage from "@/components/legal/LegalPage";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy — HalaPark",
};

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" fallbackTitle="Privacy Policy" />;
}
