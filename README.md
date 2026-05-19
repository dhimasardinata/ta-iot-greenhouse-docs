# TA IoT Greenhouse Docs Platform

This folder is the documentation platform for the TA IoT Greenhouse project.

It uses:

- Next.js
- Fumadocs
- MDX/Markdown content from `src/content/docs`
- Tailwind CSS
- a filesystem-backed docs renderer for the generated Markdown corpus
- a JSON search endpoint at `/api/search`

Useful commands:

```bash
npm install
npm run dev
npm run build
npm run validate:docs
```

The content inventory and coverage source of truth remain:

- `src/content/docs/14-complete-file-walkthrough/coverage-report.md`
- `src/content/docs/99-generated/concept-coverage.md`
- `src/content/docs/99-generated/full-file-inventory.md`

Netlify deployment uses `netlify.toml`, runs `npm run build`, and publishes the
Next.js output from `.next`.
