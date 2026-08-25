# Development Workflow

## Stack

- Node.js 22
- Next.js 15.5 with App Router
- React 19
- TypeScript strict mode
- Tailwind CSS 4 plus project-level CSS
- Netlify Next.js runtime and Netlify Forms

## Change checklist

1. Keep configurable business terms in `src/data` rather than scattering commitments through components.
2. Use real project evidence. Do not add testimonials, metrics, outcomes, or client relationships that have not been verified.
3. Add page-specific metadata for new routes and project-specific social metadata for shareable detail routes.
4. Update `public/__forms.html` when visible Netlify form fields or names change.
5. Run `npm run typecheck`, `npm run lint`, and `npm run build` before deploying.
6. Create a draft Netlify deploy for review. Promote to production only after the preview is approved.

## Brand assets

The header uses a text fallback until final logo assets are supplied. Configure replacements in `src/data/site.ts` and store them under `public/brand/`. The About page similarly falls back safely until a founder image is supplied under `public/images/about/`.
