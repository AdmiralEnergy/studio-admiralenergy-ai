export default function Footer() {
  return (
    <footer className="bg-navy py-8 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm sm:flex-row sm:text-left">
        <p>&copy; {new Date().getFullYear()} Admiral Energy Studio. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:hello@admiralenergy.ai" className="hover:text-neon">
            hello@admiralenergy.ai
          </a>
          <a href="https://www.linkedin.com/company/admiralenergy" className="hover:text-neon" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="/privacy" className="hover:text-neon">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
