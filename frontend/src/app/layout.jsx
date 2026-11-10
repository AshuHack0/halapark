import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import MobileMotionConfig from "@/components/MobileMotionConfig";
import PartnershipFormProvider from "@/components/partners/PartnershipFormProvider";
import SameSiteLinks from "@/components/common/SameSiteLinks";
import TawkChat from "@/components/common/TawkChat";

// Public site URL — used to build absolute links for the share preview image
// (WhatsApp/LinkedIn/X need an absolute og:image). Set NEXT_PUBLIC_SITE_URL to
// the live domain (e.g. https://halapark.com); on Vercel it falls back to the
// project's production URL.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const SITE_TITLE = "HalaPark | Smart Parking Solutions in the UAE";
const SITE_DESCRIPTION =
  "Find, book and pay for parking across the UAE. HalaPark delivers smart parking, valet, EV charging and parking management for drivers and property owners.";

// The favicon, app icon, Apple touch icon and share image are the files
// src/app/favicon.ico, icon.png, apple-icon.png, opengraph-image.png and
// twitter-image.png — Next.js wires them into <head> automatically.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "HalaPark",
  openGraph: {
    type: "website",
    siteName: "HalaPark",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased flex flex-col min-h-screen relative"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <MobileMotionConfig>
          <AppProvider>
            <LanguageProvider>
              <PartnershipFormProvider>
                <Navbar />
                <main className="grow">{children}</main>
                <Footer />
                <FloatingActions />
                <SameSiteLinks />
                <TawkChat />
              </PartnershipFormProvider>
            </LanguageProvider>
          </AppProvider>
          </MobileMotionConfig>
        </SmoothScroll>
      </body>
    </html>
  );
}
