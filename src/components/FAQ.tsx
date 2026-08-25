type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: readonly FAQItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question}>
          <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i aria-hidden="true">+</i></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
