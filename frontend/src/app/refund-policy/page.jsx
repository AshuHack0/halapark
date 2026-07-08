import LegalPage from "@/components/legal/LegalPage";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Refund Policy — HalaPark",
};

export default function RefundPolicyPage() {
  return <LegalPage slug="refund-policy" fallbackTitle="Refund Policy" />;
}
