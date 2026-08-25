# Studio Admiral

Studio Admiral is the public home of David and Leigh's founder-led marketing partnership. The site presents their portfolios, complementary services, a one-time Small Business Marketing Baseline, partner-routed inquiries, and a separately qualified free-website program.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm install
npm run dev
```

Validation:

```bash
npm run typecheck
npm run lint
npm run build
```

## Configuration

- Site-wide offer terms, brand paths, and navigation live in `src/data/site.ts`.
- Founder profiles, partnership services, proof statements, collaboration steps, and Marketing Baseline tiers live in `src/data/partnership.ts`.
- The typed, filterable portfolio model lives in `src/data/projects.ts`.
- Optional analytics uses `NEXT_PUBLIC_GA_ID`; see `.env.example`.
- Partner-routed email delivery uses `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`.
- Netlify project and build settings are defined in `netlify.toml`. The production project is `studioadmiral` / `studio.admiralenergy.ai`.

## Forms

The free-website application remains the Netlify form `website-application`; `public/__forms.html` supplies its static definition. Paid projects, Marketing Baseline requests, jobs/contracts, collaborations, and general inquiries post to `/api/inquiry`, where partner recipients are selected server-side and sent through Resend.

## Deployment

Main is connected to the existing Studio Admiral Netlify project. Use a draft deploy for review before promoting a release to production.
