import Image from "next/image";

type BrowserMockupProps = {
  image: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function BrowserMockup({ image, alt, priority = false, className = "" }: BrowserMockupProps) {
  return (
    <div className={`browser-mockup ${className}`}>
      <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>studioadmiral.build</span></div>
      <Image src={image} alt={alt} width={1239} height={712} sizes="(max-width: 900px) 94vw, 48vw" priority={priority} />
    </div>
  );
}
