import Link from "next/link";
import { founders, partnershipServices } from "@/data/partnership";
import { siteConfig } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Logo />
          <p className="footer-statement">Independent expertise.<br />Shared strategy.</p>
          <p className="footer-supporting-line">{siteConfig.brand.supportingLine}</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Navigate</p>
            {siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/apply">Free website program</Link>
          </div>
          <div>
            <p className="footer-label">Build</p>
            {partnershipServices.slice(0, 4).map((service) => <Link href="/growth" key={service.title}>{service.title}</Link>)}
          </div>
          <div>
            <p className="footer-label">Contact</p>
            {founders.map((founder) => <a data-track="email_clicked" href={`mailto:${founder.email}`} key={founder.id}>{founder.name}: {founder.email}</a>)}
            <Link href="/contact">Choose a contact route</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Studio Admiral</span>
        <span>David + Leigh · Founder-led partnership</span>
      </div>
    </footer>
  );
}
