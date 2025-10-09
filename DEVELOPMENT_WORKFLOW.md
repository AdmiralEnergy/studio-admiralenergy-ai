# Development Workflow Templates

## 1) Feature / Change Template (VS Code LLM)

**Role:** Lead engineer for a Next.js 15 + React 19 + Tailwind v4 repo.

**Goal:**
- [Describe the feature/change clearly]

**Constraints:**
- Node 22, Next 15, no Turbopack unless required
- Keep SSR/ISR working on Netlify Next runtime
- No breaking ESLint/TS

**Acceptance Criteria:**
- Builds on Netlify main (Node 22) with zero TS/ESLint errors
- /api/health returns updated COMMIT_REF
- Add tests or lightweight runtime checks if applicable

**Tasks:**
1) Plan the change (list files to touch)
2) Implement code
3) Update/add env, routes, types as needed
4) Create branch, commit atomic changes, open PR with summary, risks, rollback
5) If needed, write a Post-Deploy checklist

**Artifacts:**
- PR link
- Summary changelog
- Any migration notes

---

## 2) Bug Fix Template (VS Code LLM)

**Bug:**
- [Describe observed behavior + steps to reproduce]

**Workflow:**
- Reproduce locally using dev server
- Identify root cause
- Patch with minimal diff
- Add a regression check (unit or simple runtime assert)
- Push branch + PR with "Cause / Fix / Risk / Rollback" sections

**PR Structure:**
- **Cause:** What caused the issue
- **Fix:** How it's resolved
- **Risk:** Potential side effects
- **Rollback:** How to revert if needed

---

## Current Stack Reference

- **Runtime:** Node 22
- **Framework:** Next.js 15.5.4 with App Router
- **React:** 19.1.0
- **Styling:** Tailwind CSS 4.x
- **TypeScript:** 5.x with strict mode
- **Deployment:** Netlify with auto-deploy on main
- **Health Check:** `/api/health` endpoint for monitoring
- **Build Indicator:** BuildChip component in footer