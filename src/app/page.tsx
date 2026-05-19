import Link from "next/link";

const portfolioItems = [
  {
    title: "Fulani Cornrows + Gold Accessories",
    description: "Editorial braid detail study with clean parting focus and warm lighting.",
    tags: ["Natural Hair", "Editorial", "Braids"],
  },
  {
    title: "Backyard Editorial Portraits",
    description: "Soft outdoor portrait concepts designed for storytelling and beauty direction.",
    tags: ["Portrait", "Creative", "Lifestyle"],
  },
  {
    title: "Natural Hair Journey Clips",
    description: "Process-driven clips highlighting texture, prep, and finished natural styles.",
    tags: ["Texture", "Reels", "Journey"],
  },
  {
    title: "Magazine-Inspired Beauty Edits",
    description: "Polished visual concepts inspired by editorial beauty layouts.",
    tags: ["Beauty", "Mood", "Editorial"],
  },
  {
    title: "Texture Education Carousels",
    description: "Beginner-friendly social slides focused on texture language and care basics.",
    tags: ["Education", "Social", "Beginner"],
  },
  {
    title: "Student Portfolio Clip Samples Coming Soon",
    description: "Early examples of clean vertical edits for student and new stylist portfolios.",
    tags: ["Student Support", "Vertical", "Coming Soon"],
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-cream text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <p className="font-serif text-lg font-semibold">Affirm Beauty Artistry</p>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#about">About</a><a href="#portfolio">Portfolio</a><a href="#support">Student Support</a><a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="rounded-full bg-green px-4 py-2 text-sm font-semibold text-white">Request a Clip</a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
        <section className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-semibold text-green">Natural Hair Creative Brand</p>
            <h1 className="font-serif text-3xl leading-tight sm:text-5xl">Natural Hair Artistry, Beauty Storytelling &amp; Student Portfolio Support</h1>
            <p className="mt-4 text-black/75">Affirm Beauty Artistry is a natural hair creative brand documenting texture, beauty, and self-expression — while helping beauty students and new stylists turn raw footage into cleaner portfolio content.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-green px-5 py-3 text-sm font-semibold text-white">Request a Student Portfolio Clip</a>
              <a href="#portfolio" className="rounded-full border border-black/20 px-5 py-3 text-sm font-semibold">View Creative Portfolio</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-pink/20 px-3 py-1">Natural Hair Creative</span>
              <span className="rounded-full bg-gold/20 px-3 py-1">Cosmetology School Graduate</span>
              <span className="rounded-full bg-green/15 px-3 py-1">Currently Pursuing Natural Hair Licensure</span>
            </div>
          </div>
          <div className="grid place-items-center rounded-3xl border border-dashed border-black/25 bg-cream p-8 text-center text-black/70 min-h-[280px]">Replace with Leigh backyard editorial portrait / hair content</div>
        </section>

        <section id="about" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl">Meet Leigh</h2>
            <p className="mt-4 text-black/80">Leigh is a natural hair creative and cosmetology school graduate from Avalon School of Cosmetology in Arizona. She completed 1,600 cosmetology hours and passed her written graduation test.</p>
            <p className="mt-4 text-black/80">She did not complete the practical exam and is not currently licensed. She is now pursuing natural hair licensure while building Affirm Beauty Artistry as a space for natural hair storytelling, beginner-friendly texture education, and creative portfolio support.</p>
          </div>
          <div className="rounded-3xl bg-green p-6 text-white shadow-sm">
            <h3 className="font-serif text-xl">Professional Snapshot</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Brand:</strong> Affirm Beauty Artistry</li><li><strong>Focus:</strong> Natural Hair, Texture Education, Beauty Storytelling</li><li><strong>Training:</strong> Avalon School of Cosmetology Graduate</li><li><strong>Completed:</strong> 1,600 Cosmetology Hours</li><li><strong>Current Path:</strong> Pursuing Natural Hair Licensure</li><li><strong>Platforms:</strong> Instagram, TikTok, Pinterest</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl">Educate. Equip. Empower.</h2>
          <div className="grid gap-4 md:grid-cols-3">{[["Educate","Beginner-friendly natural hair notes, texture conversations, and honest lessons from Leigh’s ongoing learning journey."],["Equip","Practical content ideas, filming prompts, and portfolio support for beauty students, new stylists, and natural hair creatives."],["Empower","A creative space that affirms natural hair as beauty, artistry, identity, and self-expression."]].map(([title,copy]) => <article key={title} className="rounded-3xl bg-white p-5 shadow-sm"><h3 className="font-serif text-xl text-green">{title}</h3><p className="mt-2 text-sm text-black/75">{copy}</p></article>)}</div>
        </section>

        <section id="portfolio" className="space-y-4">
          <h2 className="font-serif text-2xl">Creative Portfolio</h2>
          <p className="text-black/75">A growing archive of natural hair looks, editorial visuals, and beauty storytelling.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{portfolioItems.map((item) => <article key={item.title} className="rounded-3xl bg-white p-4 shadow-sm"><div className="mb-3 grid h-36 place-items-center rounded-2xl border border-dashed border-gold/40 bg-pink/10 text-sm text-black/60">Placeholder Visual</div><h3 className="font-serif text-lg">{item.title}</h3><p className="mt-1 text-sm text-black/70">{item.description}</p><div className="mt-3 flex flex-wrap gap-2">{item.tags.map((t)=><span key={t} className="rounded-full bg-gold/15 px-2 py-1 text-xs">{t}</span>)}</div></article>)}</div>
        </section>

        <section id="support" className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl">Student Portfolio Support</h2>
          <p className="mt-2 text-black/75">For beauty students, new stylists, braiders, and natural hair creatives who want their work to look cleaner online without hiring a full marketing agency.</p>
          <div className="mt-5 rounded-3xl border border-green/15 bg-cream p-5">
            <p className="text-sm uppercase tracking-wide text-green">Student Portfolio Clip</p><p className="font-serif text-3xl">$25 Intro Spots</p>
            <p className="mt-2 text-sm text-black/80">Turn raw practice, school, or client-approved footage into one clean vertical portfolio clip you can post on your own page.</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl bg-white p-5 shadow-sm"><h3 className="font-serif text-xl">How It Works</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm"><li>Send your raw clips</li><li>Leigh reviews the footage and confirms direction</li><li>Your clean vertical portfolio clip is created</li><li>You receive the clip, cover/title frame, and caption starter</li></ol><p className="mt-3 text-xs text-black/65">Typical turnaround goal: 2–4 business days depending on availability.</p></article>
          <article className="rounded-3xl bg-white p-5 shadow-sm"><h3 className="font-serif text-xl">Who This Is For</h3><ul className="mt-3 space-y-2 text-sm"><li><strong>Beauty Students:</strong> You are learning the craft and need a cleaner way to document your practice work.</li><li><strong>New Stylists:</strong> You have work to show, but your page needs clearer clips, captions, and presentation.</li><li><strong>Braiders &amp; Natural Hair Creatives:</strong> You want your styles, parts, texture work, and finished looks to feel more polished online.</li><li><strong>Small Beauty Pages:</strong> You are not ready for a full brand buildout, but you want your content to look more intentional.</li></ul></article>
        </section>

        <section id="contact" className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl">Request a Student Portfolio Clip</h2>
          <form name="portfolio-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you" className="mt-5 grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="form-name" value="portfolio-inquiry" />
            <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" /></label></p>
            <input name="name" required placeholder="Name" className="rounded-xl border border-black/15 px-3 py-2" />
            <input type="email" name="email" required placeholder="Email" className="rounded-xl border border-black/15 px-3 py-2" />
            <input name="handle" placeholder="Instagram or TikTok handle" className="rounded-xl border border-black/15 px-3 py-2" />
            <select name="role" required className="rounded-xl border border-black/15 px-3 py-2"><option value="">Select role</option><option>Beauty Student</option><option>New Stylist</option><option>Braider / Natural Hair Creative</option><option>Small Beauty Creator</option><option>Other</option></select>
            <input name="clip_type" placeholder="What kind of clip do you need?" className="rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
            <label className="sm:col-span-2 text-sm"><input type="checkbox" name="permission" required className="mr-2"/>Do you have permission to use the footage/client content?</label>
            <textarea name="message" placeholder="Message" rows={4} className="rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
            <select name="preferred_contact" className="rounded-xl border border-black/15 px-3 py-2 sm:col-span-2"><option>Email</option><option>Instagram DM</option><option>TikTok DM</option></select>
            <button type="submit" className="rounded-full bg-green px-5 py-3 text-sm font-semibold text-white sm:col-span-2">Send Inquiry</button>
          </form>
        </section>

        <section className="rounded-3xl border border-gold/50 bg-gold/10 p-5 text-sm"><h3 className="font-serif text-xl text-black">Credential Note</h3><p className="mt-2">Leigh is a cosmetology school graduate and natural hair creative. She is not currently licensed and does not provide licensed cosmetology instruction, medical/scalp diagnosis, or regulated professional services through this page. Portfolio support is focused on creative documentation, content editing, and beginner-friendly peer-to-peer support.</p></section>
      </main>

      <footer className="border-t border-black/10 px-4 py-8 text-center text-sm">
        <p className="font-serif text-lg">Affirm Beauty Artistry</p>
        <p>Educate. Equip. Empower.</p>
        <p className="mt-2"><Link href="#">Instagram: @affirmbeautyartistry</Link> · <Link href="#">TikTok: @affirmbeautyartistry</Link> · <Link href="#">Pinterest: @affirmbeautyartistry</Link></p>
      </footer>
    </div>
  );
}
