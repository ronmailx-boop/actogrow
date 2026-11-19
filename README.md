# Actogrow

**This app does nothing until you do something.**

Answer three questions, reveal your mantra with a long press, learn it, and watch your grove grow.
Hebrew (with masculine or feminine wording) on Hebrew phones, English everywhere else.

- Static PWA: `index.html`, `app.js`, `style.css`, `data/mantras.js`, `sw.js`
- Everything is stored on the device. No server, no account, no tracking.
- Deploy: Cloudflare Workers (`wrangler.jsonc`) via GitHub Actions; needs the `CLOUDFLARE_API_TOKEN` secret.

Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

Project status: see `PROJECT_STATE.md`.
