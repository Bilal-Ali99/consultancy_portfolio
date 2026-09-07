import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteInfo } from "@/data/siteContent";

export const metadata: Metadata = {
  metadataBase: new URL("https://hbsols.com"),
  title: siteInfo.metadataTitle,
  description: siteInfo.metadataDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteInfo.brandName,
    title: siteInfo.metadataTitle,
    description: siteInfo.metadataDescription,
    images: [{ url: "/images/brand/icon-512.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
