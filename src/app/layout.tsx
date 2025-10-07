import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admiral Studio | AI-Native Creative Systems for Energy Brands",
  description:
    "Launch adaptive creative systems, automated content ops, and intelligent analytics with Admiral Studio's AI-native team for energy innovators.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy">
        {children}
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID || ""}');
          `}
        </Script>
        <Script id="reddit" strategy="afterInteractive">
          {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
            rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID || ""}');
            rdt('track','PageVisit');
          `}
        </Script>
      </body>
    </html>
  );
}
