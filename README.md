# Hermes Mastery Course

A self-study course for the Hermes Agent, rendered as a single-page React app.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Push to GitHub (already done if you're reading this on the repo page).
2. In Vercel, "Add New Project" → import this repo.
3. Vercel auto-detects Vite; defaults work as-is (`npm run build`, output `dist`).
4. Click Deploy.

Progress is saved in the browser via `localStorage`, so each visitor's progress
is private to their own device.
