# Website log

- 2 Oct 2026: repo cloned and audited; LC chose option A (restyle in the LC design system). Branch `brand-restyle`, handoff in CLAUDE.md. Next: step 2, wire the site to the brand tokens, in a fresh session at high effort.

## To do (next steps)
- [ ] Step 2: wire the site to `~/Developer/brand/tokens/tokens.json` (fresh session, `/effort high`).
- [ ] Step 3: design the web pieces on one sample page; LC reviews.
- [ ] Step 4: restyle the existing pages.
- [ ] Step 5: blog posts from the 2021 COETAIL articles; first find the ISP Coaching Menu image.
- [ ] Step 6: LC reviews the Vercel preview; merge to `main` only on his yes.
- [ ] Later: decide page by page whether content needs rewriting (it dates from July 2026).
- 2 Oct 2026: step 2 built, waiting for LC. `scripts/brand.mjs` copies the brand's tokens.json to `src/brand/tokens.json` and builds `src/brand/theme.mjs` (Tailwind colours, fonts, spacing `lc-1` to `lc-9`, radius `small`/`medium`, Google Fonts address) and `src/brand/tokens.css` (identical to the brand's own). `npm run build` now runs `check:brand`: fails on hand edits or a stale copy; on Vercel it checks the copy only. Old look kept until step 4; build output differs only by the added variables and font link. Found: `src/styles/global.css` is imported nowhere, so its buttons, cards, tags and DM Sans never reach the live site. Not committed yet.
- 2 Oct 2026: LC approved the web type proposal (https://claude.ai/artifact/W9hjyhfCYUcj8SPotZqZWc); it is now `type.web` in the brand's tokens.json (brand DECISIONS.md, Step 5). Synced in: Tailwind `text-display`, `text-title`, `text-heading`, `text-lead`, `text-body`, `text-small`, `text-label` (size, line, tracking, weight) and `max-w-body`; `--lc-type-*` variables. Built files now carry a fingerprint, so a hand edit is caught even after the script changes; `check:brand` also fails if this tokens.css stops matching the brand's. Live pages still unchanged. Next: step 3, the web pieces on one sample page.
