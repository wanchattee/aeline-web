import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Base for relative URLs in metadata (e.g. product images in Open Graph)
  metadataBase: new URL("https://aeline-web.vercel.app"),
  title: {
    default: "AELINE C — Fine Jewelry",
    template: "%s — AELINE C",
  },
  description: "Handcrafted fine jewelry with intention. Timeless pieces for the discerning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
