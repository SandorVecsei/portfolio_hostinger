import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"]
});

const displayFont = Syne({
  variable: "--font-display",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "GLM Creative Agency",
    template: "%s | GLM Creative Agency"
  },
  description:
    "A creative agency portfolio built with Next.js, React, and modern motion-first storytelling."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <div className="grain" aria-hidden="true" />
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
