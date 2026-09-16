import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import PartnershipFormProvider from "@/components/partners/PartnershipFormProvider";

export const metadata = {
  title: "HalaPark - Production Ready Next.js App",
  description:
    "A production-ready Next.js application built with modern best practices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased flex flex-col min-h-screen relative"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <AppProvider>
            <LanguageProvider>
              <PartnershipFormProvider>
                <Navbar />
                <main className="grow">{children}</main>
                <Footer />
                <FloatingActions />
              </PartnershipFormProvider>
            </LanguageProvider>
          </AppProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
