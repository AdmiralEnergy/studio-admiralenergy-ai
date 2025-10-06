function PrivacyPage() {
  return (
    <div className="section-padding bg-white">
      <div className="mx-auto max-w-4xl space-y-6 text-sm text-navy/80">
        <h1 className="text-4xl font-semibold text-navy">Privacy Policy</h1>
        <p>
          Admiral Energy Studio is committed to safeguarding your data. This placeholder policy outlines our intent to detail data practices,
          security controls, and compliance frameworks in collaboration with our legal partners.
        </p>
        <p>
          For immediate questions about privacy or data governance, contact
          <a href="mailto:hello@admiralenergy.ai" className="text-neon"> hello@admiralenergy.ai</a>.
        </p>
      </div>
    </div>
  );
}

PrivacyPage.layoutProps = {
  title: "Privacy Policy",
  description: "Learn how Admiral Energy Studio approaches data privacy and governance.",
};

export default PrivacyPage;
