export default function ServiceCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white/70 p-6 shadow-sm shadow-navy/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neon/10 text-neon">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="text-lg">⚡</span>}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-navy">{title}</h3>
      <p className="text-sm text-navy/70">{description}</p>
    </div>
  );
}
