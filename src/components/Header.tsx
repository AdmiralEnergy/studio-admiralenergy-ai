import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="site-header-wrap">
      <div className="site-header">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-small header-cta" href="/contact">Start a project</Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/apply">Apply for a Free Website</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
