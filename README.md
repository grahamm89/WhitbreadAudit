# Whitbread PWA

This PWA presents Whitbread dispenser settings and install equipment checklists.
https://grahamm89.github.io/WhitbreadAudit/

## Deploy on GitHub Pages
1. Push the folder to a GitHub repo.
2. Enable **Settings → Pages → Deploy from branch**.
3. All paths are relative (good for subpath repos).
4. Open the site and **hard refresh** once after first publish to let the Service Worker cache content.

### Common “No content” causes (now addressed)
- Absolute paths (`/service-worker.js`, `/data/...`) on GitHub Pages. → **Fixed** to use `./`.
- First load racing with SW install. → Hard refresh once.
- 404s on `data/*.json`. → Included in repo and pre-cached.

## Tech
- Auto-updating Service Worker
  - Cache-first for static assets
  - Network-first for `/data/` JSON so updates appear offline after first view
- Installable via `manifest.json`
