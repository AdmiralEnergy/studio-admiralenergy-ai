import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://affirm-beauty-artistry.netlify.app"),
  title: "Affirm Beauty Artistry | Natural Hair Creative Portfolio & Student Portfolio Support",
  description:
    "Affirm Beauty Artistry is a natural hair creative brand led by Leigh, focused on natural hair storytelling, texture education, editorial beauty content, and limited student portfolio support for beauty students and new stylists.",
  openGraph: {
    title: "Affirm Beauty Artistry | Natural Hair Creative Portfolio & Student Portfolio Support",
    description:
      "Affirm Beauty Artistry is a natural hair creative brand led by Leigh, focused on natural hair storytelling, texture education, editorial beauty content, and limited student portfolio support for beauty students and new stylists.",
    url: "https://affirm-beauty-artistry.netlify.app",
    siteName: "Affirm Beauty Artistry",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
