import "../styles/globals.css";
import Script from "next/script";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  const layoutProps = Component.layoutProps ?? {};

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="ga-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','REDDIT_PIXEL_ID',{});
          rdt('track','PageVisit');
        `}
      </Script>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
