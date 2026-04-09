import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import SmoothScroll from "@/components/SmoothScroll";

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
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
          </AppProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
