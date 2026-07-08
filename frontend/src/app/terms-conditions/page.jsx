import LegalPage from "@/components/legal/LegalPage";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Terms & Conditions — HalaPark",
};

export default function TermsConditionsPage() {
  return <LegalPage slug="terms-conditions" fallbackTitle="Terms & Conditions" />;
}
