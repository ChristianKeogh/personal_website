import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import "./global.css";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "christian keogh",
    template: "%s"
  },
  description: "Personal website of Christian Keogh, a Frontend Developer based in Dublin.",
  openGraph: {
    title: "Christian Keogh - Frontend Developer",
    description: "Personal website and portfolio of Christian Keogh.",
    url: baseUrl,
    siteName: "Christian Keogh",
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const cx = (...classes: any) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        " text-white bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 md:mx-auto min-h-screen flex flex-col">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 flex-grow">
          <Navbar />
          {children}
          {/* TODO: Implement Footer */}
          <Footer />
        </main>
      </body>
    </html>
  );
}
