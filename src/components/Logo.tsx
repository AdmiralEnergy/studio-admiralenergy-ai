import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Logo() {
  return (
    <Link className="wordmark" href="/" aria-label="Studio Admiral home">
      {siteConfig.brand.logo ? (
        <Image className="wordmark-logo" src={siteConfig.brand.logo} alt="Studio Admiral — Websites & Growth" width={192} height={67} priority />
      ) : (
        <>
          {siteConfig.brand.mark ? <Image className="wordmark-mark" src={siteConfig.brand.mark} alt="" width={42} height={42} priority /> : <span className="wordmark-mark" aria-hidden="true">SA</span>}
          <span className="wordmark-copy"><strong>Studio Admiral</strong><small>{siteConfig.brand.descriptor}</small></span>
        </>
      )}
    </Link>
  );
}
