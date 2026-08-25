import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="not-found-shell"><section className="not-found-card"><p className="eyebrow" style={{ justifyContent: "center" }}><span /> 404</p><h1>That page is off course.</h1><p>The address may have changed, or the page may no longer exist.</p><Link className="button" href="/">Return home <span aria-hidden="true">→</span></Link></section></main>;
}
