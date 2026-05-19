import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4">
      <section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm uppercase tracking-wide text-green">Affirm Beauty Artistry</p>
        <h1 className="mt-2 font-serif text-3xl">Thank you for your inquiry</h1>
        <p className="mt-3 text-black/75">
          Your Student Portfolio Clip request was submitted successfully. Leigh will review your details and follow up soon.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-green px-5 py-3 text-sm font-semibold text-white">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
