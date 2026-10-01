# mrluisc.com: Luis Carlos's personal website

Astro 4 + Tailwind, static, deployed by Vercel from `main` to mrluisc.com (custom domain via
`public/CNAME`). **Pushing to `main` publishes the live site.** Work on a branch; a pushed branch
gets a Vercel preview URL. Nothing merges to `main` without LC's explicit yes.

## Current project: brand restyle (started 2 Oct 2026)

**Decided by LC, 2 Oct:** option A, *restyle the current site* in the LC design system. Keep the
pages, content, structure and the `facts.ts` guard; change the look. Content rewrites and
"rebuild vs restyle" for structure are decided later, page by page.

Branch: `brand-restyle`.

### Steps (one at a time; show LC, wait for him, then the next)
1. ✅ Clone and audit (2 Oct). Findings below.
2. ✅ (2 Oct) **Wire the site to the brand tokens.** Read colours, fonts, spacing and radius from
   `~/Developer/brand/tokens/tokens.json` (the one source of truth), never retype a value.
   Likely: a small script that generates the Tailwind theme and a CSS file from tokens.json into
   this repo, run before build, with a check that fails if they drift. Vercel builds only this
   repo, so generated files must be committed here (the brand repo is private and separate).
3. ✅ (2 Oct, LC "all good"; sample at `/sample`, delete before merge) Design the web pieces the design system lacks: nav, buttons, cards, tags, article layout,
   footer. Show them on ONE sample page first. They may later go back into the design system.
4. Restyle the existing pages.
5. Blog: add the two 2021 COETAIL articles (see "Source material").
6. LC reviews a Vercel preview link. Merge only on his yes.

### Audit findings (2 Oct)
- Pages: index, experience, innovations, cv, work-with-me, work/ (5 AISC case studies), blog/
  (an empty "Coming Soon" page).
- Old look to replace entirely: teal #0d7377, amber #F4A442, navy #192248, DM Sans, IBM Plex
  Mono (`tailwind.config.mjs`, `src/styles/global.css`). This palette is in GOA's family, which
  is why the brand left it.
- `src/data/facts.ts` + `scripts/check-facts.mjs`: every repeated fact lives in one place and the
  build fails on hardcoded guarded literals. Keep it; same philosophy as the brand tokens.
- Content dates from July 2026 (pre-SAS start); it is not part of this restyle.

## The design system
- Brand repo: `~/Developer/brand` (private, `mrluisc/brand`). Read its `CLAUDE.md` and
  `DECISIONS.md` first. Tokens: `tokens/tokens.json`. Colours: Arena (bg), Tierra (text),
  Tierra suave, Selva, Barro (the dot, accents, Spanish lines), Barro claro, Cielo. Use only the
  contrast-checked `pairs`; respect the `never` list. Fonts: Encode Sans Expanded (headlines 800,
  700), Encode Sans (400, 600), JetBrains Mono (labels, capitals). Web spacing scale 4 to 96 px;
  radius 6 and 12. The LC mark and the line motif have exact geometry in tokens.json.
- Published design system Artifact: https://claude.ai/artifact/9GRKTLPgnJJXkz6GFikptv
  (components are slides, posts, docs, video; **no web components yet**).
- Named process: Notice · Build · Protect / Detecta · Diseña · Protege.

## Source material for the blog (step 5)
- **"Coaching À la carte"** (6 Mar 2021): full text in Google Doc "Coaching", id
  `1fK1-JPKfLN_yeklxppc8E2XdcNdpnnO79OFl36Gbv4Q` (COETAIL folder). Archive copy:
  https://web.archive.org/web/2023/https://lmoreno.coetail.com/coaching-a-la-carte/
- **"Taking Coaching Online"** (7 Mar 2021): archive copy at
  https://web.archive.org/web/2023/https://lmoreno.coetail.com/taking-coaching-online/ ; slide
  images in Drive: "Copy - Coaching at ISP.png" and (1), (3), (4), (5), (6); "Coaching Cycles.png".
  Original post credits the slides to "ISP Coaches and Coordinators": keep that credit.
- **Missing: the 2021 ISP Coaching Menu infographic itself.** Not in the doc's text; may be an
  embedded image in the "Coaching" doc (try exporting it as HTML or PDF) or elsewhere in Drive.
  Do not confuse with "AISC Coaching Menu.pdf" or "Coaching Menus All School 2021- 2022.pdf".
- Old blog lmoreno.coetail.com is offline; the Wayback Machine holds 10 posts.

## Rules
- **Step by step.** One small step, show LC, wait. No long to-do dumps.
- **Writing as LC:** no em or en dashes anywhere, sign "Luis Carlos". Voice guide
  `~/Developer/sas/brain/reference-writing-voice.md`; checker `~/Developer/sas/.claude/voice-check.sh`.
  LC has the final word on any Spanish.
- **Public site:** no identifying detail about SAS colleagues or students. Only cite sources LC has
  actually read.
- **Never reload or navigate a browser tab LC may be typing in;** open a new tab.
- Check generated files for hand edits before regenerating them.
- Log each session in `LOG.md` (append only), and one line in `~/Developer/brand/LOG.md` when a
  brand decision is made.
