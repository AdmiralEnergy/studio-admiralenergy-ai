import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} | Admiral Energy Studio` : "Admiral Energy Studio";
  const metaDescription =
    description ||
    "AI-powered branding and automation services for energy innovators. Admiral Energy Studio accelerates go-to-market teams with intelligent creative systems.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studio.admiralenergy.ai" />
        <meta property="og:image" content="https://studio.admiralenergy.ai/og-image.png" />
      </Head>
      <div className="flex min-h-screen flex-col bg-cream text-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
