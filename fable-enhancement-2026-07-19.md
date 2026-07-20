# Portfolio Enhancement Pass 2 (Fable, 2026-07-19)

Second and final Fable pass. The 2026-07-05 brief established the thesis: systems that outlive their builder. That holds. This pass adds the story that thesis was missing, integrates the newly verified material from the complete Gmail backup (9,738 messages), delivers the /cv page, and closes with design direction and platform recommendations.

**The new thesis layer:** the site currently tells the story of five big builds. The mined inbox tells a better one: a builder colleagues learned to ask. A DT teacher mentions a consent-form headache and gets a signature-tracking dashboard. A principal forwards a comment-generator video to her whole division. An EAL teacher gets a gamified progress tracker. More than ten of these exist by name, each with a written receipt from the person who used it. Five case studies is a portfolio. A school full of people who know that asking Luis Carlos gets them a tool is a reputation. Section 1.1 builds that story.

**A rule this pass enforces:** every copy block below is written without em dashes. This is Luis Carlos's own hard rule (his grading scripts literally abort on them; it is in his collaborator card) and the current site violates it in nearly every paragraph, including copy from my own prior brief. My mistake to fix. See Housekeeping item 2 for the site-wide purge.

---

## 1. COPY BLOCKS (ready to drop in, his voice)

### 1.1 New homepage section: "Built on Request"

Place between Signature Innovations and Career Highlights. This is the single biggest content gap: the breadth story. Format it as a ledger, not cards (design rationale in Section 2). An expanded version can later live on `/innovations` replacing the current "25+ Custom Automation Tools" grid, which mixes verified and unverifiable claims (see Housekeeping item 4).

**Tag:** Built on Request

**H2:** The Case Studies Are Five. The Requests Never Stopped.

**Intro paragraph:**

> Case studies get the spotlight. Most of what I built at AISC started smaller: a colleague mentioned a headache, and a few days later there was a tool. A consent-tracking dashboard for Design Technology. A report-comment generator for Science, then another for French. A gamified progress tracker for EAL students. More than ten of these are in the record by name, each one adopted by the person who asked for it. This is the part of the job I care about most. Not the flagship launch. The Tuesday request.

**Section epigraph (pull-quote, visually distinct from the ledger):**

> "Luis Carlos Moreno is our Technology and Innovation Coach, making amazing tools to improve teachers' lives, among his many other activities."
> Greg Clinton, Deputy Head of School, introducing me to an outside AI consultant

The attribution line matters more than the quote: this is how the Deputy Head described him to an external expert, not praise sent to him. Keep that framing in the label.

**The ledger entries.** Each row: tool name, who it was for, one line of what it does, and the receipt (a real quote where one exists). Order is roughly chronological; the design brief covers how to render this.

1. **DT & Trip Safety Consent System** · MS Design Technology · Digital consent forms with a signature-tracking dashboard, used daily by the department.
   Receipt: *"It has made a massive difference in our department."* Jay Hart, DT Teacher
2. **Science Report Comment Generator** · MS Science · AI-assisted comment drafting with a walkthrough video, built for the whole team.
   Receipt: *"This spreadsheet is incredible, and the video is so concise and clear."* Kelsey Bull, MS Principal
3. **French Report Comment Generator** · World Language · Same pattern, second subject, adapted to the department's rubrics.
4. **EAL Progress Tracker** · EAL Department · Gamified student-progress tool with linked reflection forms.
   Receipt: *"'Game-like' features... Impressive!"* Suzanne Brigham, EAL Teacher
5. **MS Report Card Comment System v4.0** · All MS teachers · 1,914 comments managed per cycle, AI comment banks, one-click export to PowerTeacher Pro.
6. **Math Shark Tank Analysis Report** · Curriculum leadership · A data tool for curriculum-goal alignment, shared with schools abroad.
   Receipt: *"LC, this is SO cool... Amazing work!"* Kyle Martin, ISKL
7. **Meeting Notes Auto-Transcriber** · ES leadership · Automated transcription and notes for leadership meetings.
   Receipt: *"This is amazing. I want to learn how to do this."* Lynn Schneider, ES Principal
8. **Innovation Bot** · Innovation in T&L Council · A scoped AI assistant that helped faculty refine their innovation pitches.
9. **AI Book Club Companion Site** · 20+ educators · Session resources and discussion hub for "Exploring Tomorrow."
10. **Learning Experience Analyzer (LEA)** · School-wide · Multi-framework lesson analysis; the tool that grew into a data system.

**Closing line (under the ledger):**

> Every entry above was requested by a colleague and adopted by name. When a number is on this site, there is an email behind it. And the list is an undercount: the record keeps surfacing more.

### 1.2 Stats bar: one change

Replace the fourth stat. "9 systems built, documented, and handed over" undersells the new story and conflicts with the verified count.

```js
{ value: '10+', label: 'Tools shipped by request, adopted by name' },
```

The other three stats (26, 50+, 700+) stay exactly as they are.

### 1.3 Testimonials: exact integration

Of the five new verified testimonials, use **Greg Clinton, Jay Hart, and Kelsey Bull** on the homepage, move **Eugenia Gomez-Escobar's written testimonial** to `/work-with-me`, and hold **Jonathan Wood** on the bench (best used later on `/experience` next to student-facing work). Reasoning: the homepage grid should prove the builder thesis at three altitudes (Deputy Head framing him externally, a principal endorsing a tool, a teacher measuring departmental impact). Eugenia's is a coaching testimonial and belongs on the coaching sales page.

**Homepage grid, new lineup of six** (replaces the current five):

1. Elizabeth Keogh (keep as is, attribution unchanged)
2. Joel Bevans onboarding-email quote (keep as is)
3. **NEW:**
   > "Luis Carlos Moreno is our Technology and Innovation Coach, making amazing tools to improve teachers' lives, among his many other activities."
   > Greg Clinton · Deputy Head of School · AISC, introducing me to an external AI consultant
   *(If the epigraph in 1.1 also runs on the homepage, use this quote in only one of the two spots. My call: keep it as the 1.1 epigraph and give this grid slot to Jonathan Wood instead.)*
4. **NEW:**
   > "Thank you so much for your help on this. It has made a massive difference in our department."
   > Jay Hart · MS Design Technology Teacher · AISC, on the consent-tracking system I built for his department
5. **NEW:**
   > "This spreadsheet is incredible, and the video is so concise and clear."
   > Kelsey Bull · MS Principal · AISC, on the Science report-comment generator
6. Gretchen Galaty (keep as is)

**Cut from the homepage:** both anonymous survey quotes. The "MS Science Teacher, Annual Survey" quote describes the same tool Kelsey Bull praised by name and title; the named principal version is strictly stronger, so the anonymous one is now redundant. The "HS Teacher" AI quote can move to `/work-with-me` if a slot opens, or retire.

**On `/work-with-me`,** replace Eugenia's current quote with her stronger written testimonial:

> "Luis provided the perfect combination of expertise, patience, and accessibility that made learning feel safe and achievable. Luis is not just an amazing coach but an incredible individual you can truly depend on."
> Eugenia Gomez-Escobar · MS World Language Teacher · AISC, written coaching testimonial

Note in the attribution area, if space allows, that she endorsed the coaching twice, months apart, once unprompted with leadership copied. Two independent endorsements from one client is rarer than it sounds.

**Bench (do not discard):** Jonathan Wood, PhD:
> "Many students shared afterward how motivated they felt by your feedback... We are deeply grateful for your time and support of our Grade 8 learners."
> Jonathan Wood, PhD · MS Social Studies Teacher · AISC, on the Grade 8 Tech Investor Summit

### 1.4 New `/cv` page, full copy

Design note: this page should be printable and boring on purpose. One column, no cards, no emoji, real hierarchy. A "Download PDF" button at top. Copy below.

---

**Luis Carlos Moreno Rivero**
Instructional Technology Coach · Shanghai American School (Puxi), from August 2026
mr.luisc@gmail.com · github.com/mrluisc · linkedin.com/in/luiscarlosmorenorivero · mrluisc.com
Venezuelan · Spanish / English / Portuguese

**Professional Summary**

> I build the systems schools usually buy. Over two years at an IB World School in Chennai I designed and shipped custom web applications for curriculum analytics, student health check-ins, and automated trip and service-learning placement, while coaching 110+ faculty through AI integration, UDL, and digital pedagogy. More than ten of my tools were requested by colleagues and adopted by name in daily departmental workflows. I pair classroom credibility (MYP Mathematics teacher) with software engineering (Google Apps Script, Firebase, React) and a coach's instinct for what faculty will actually adopt. The test I hold my work to is simple: does it keep running after I leave the room? At AISC, it does.

**Core Skills**

*Development:* Google Apps Script web apps and automation · Firebase + React · Google Workspace APIs (Classroom, Sheets, Drive) · PowerSchool / PowerTeacher Pro data workflows · Looker Studio dashboards · assignment and capacity-balancing algorithms · Git/GitHub

*Coaching and Professional Learning:* instructional coaching (menu- and cycle-based) · whole-staff PD facilitation (110+ faculty) · UDL implementation leadership · peer observation models · digital citizenship instruction · co-teaching

*AI and EdTech:* classroom AI integration (Claude, ChatGPT, Gemini, Flint) · HUMAN Framework co-creator · AI policy and academic integrity frameworks · EdTech evaluation, rollout, and subscription management · device deployment PK-12

*Systems and Data:* curriculum mapping and gap analysis · institutional audits · process documentation and operations manuals · data governance · vendor portfolio management (~$200k annual spend)

**Experience**

*American International School Chennai (AISC), India · Learning Innovation & Technology Coach · Jul 2024 to Jun 2026*
IB World School, ~700 students PK-12, Apple Distinguished School.

- Designed and built the Curriculum Intelligence Dashboard, a web app tracking 216 courses and 849 curriculum units across three divisions; deployed to 50+ school leaders, and adopted by the Director of Teaching & Learning as the first onboarding resource sent to 26 incoming teachers.
- Built the Health Office App (Firebase + React) for 700+ students: digital check-ins with automated same-day notifications to teachers and secretaries; launched school-wide June 2026.
- Shipped 10+ additional tools by colleague request, each adopted by name: report-comment generators for Science and French, a DT/trip safety consent-tracking system, a gamified EAL progress tracker, an automated placement engine (SEVAI) assigning 150+ students to service activities, and the Discover India engine placing ~237 students across 15 trips, delivered with a 50-page operations manual.
- Led the migration from Turnitin to Google Originality Reports, saving ~$8,200 per year, and set up Google Classrooms for all IB teachers.
- Co-created the HUMAN Framework for ethical AI integration and presented it to 100+ faculty; ran the "Exploring Tomorrow" AI book club for 20+ educators including the Deputy Head and Director.
- Directed the secondary school's year-long UDL implementation: orientation series with an external consultant, a UDL Champions cohort, and monthly cycle meetings.
- Co-led the school's Apple Distinguished School application from planning through video production.
- Served on hiring panels for Head of School, MS and HS Principal, Student Support Services Director, and Secondary Learning Coach candidates.
- Co-authored the OTL Strategic Implementation Plan 2025-28; member of the Sustainable Data Systems Council and Innovation in Teaching & Learning Council.
- Spoke at the Data in Schools Conference (Kuala Lumpur, 2025); co-facilitated a HUMAN Framework session at the AIFE International Conference for 10+ international schools. *(Flag: AIFE venue appears as Jakarta on the live site and Bangkok in cv-content.md. Verify before this ships; do not guess.)*

*Global Online Academy · Instructor, Geometry and Game Theory · 2024 to present*
- Teach fully online, asynchronous-first courses to students across member schools worldwide; competency-based grading with narrative feedback.

*Vientiane International School, Laos · MYP Mathematics Teacher · 2021 to 2024*
- Taught MYP Mathematics at an IB World School; built inquiry-based units aligned to IB criteria.
- Designed and taught a grades 6-12 financial literacy curriculum; served on the DEIJ taskforce; presented at AIELOC Hanoi 2024.

*International School of Panama · 2016 to 2021*
- Five roles across five years: EdTech Coordinator, Instructional Coach, Mathematics Department Head, MYP Mathematics Teacher, Learning Support.

*Colegio Isaac Rabin, Panama · 2015 to 2016*
- STEM & Robotics Teacher and Head of IT; founded the school's robotics program.

*Earlier:* co-founded Konekti, a coding and robotics education startup in Panama, where I found my path into teaching.

**Education**

- M.Ed., Master of Education *(Luis: confirm institution name before publishing)*
- B.S. Systems Engineering, Universidad Tecnológica de Panamá

**Recognition**

- Formal commendation to school leadership for support of faculty (Elizabeth Keogh to Deputy Head, May 2026): "His support has significantly reduced stress for many of us and has made a complicated process much smoother."
- Described by AISC's Deputy Head to an external AI consultant as "making amazing tools to improve teachers' lives, among his many other activities."
- Colleague survey: 4.8/5 across 26 responses; 100% would work with me again.
- International speaking: Data in Schools (Kuala Lumpur), AIFE, AIELOC (Hanoi); workshop materials adopted by schools in Malaysia and Korea.

---

## 2. CREATIVE / DESIGN DIRECTION BRIEF

The current site is clean, competent, and anonymous. It is a well-executed template: card grids, emoji icons, centered section headers. Nothing about it looks like it was made by a person who builds software. That is the gap. A visitor should feel "this person ships" before reading a single word. Three concepts, in priority order, plus art direction notes. Pick concept 1 at minimum; 1+2 together are the site.

### Concept 1: The portfolio as a status page (the signature move)

The thesis is "systems that outlive their builder." Prove it visually: borrow the visual language of an uptime dashboard (think status.anthropic.com or any SRE status page). Every system on the site gets a status treatment: a small pulsing green dot, monospace label, "Operational · handed over Jun 2026." The case-study index becomes a systems board. The joke lands instantly with technical viewers and reads as confident clarity to everyone else: he left, and everything is still green.

- Case-study cards: status dot + "OPERATIONAL" in small mono caps, top right.
- Curriculum Dashboard entry can add "Maintained by: AISC OTL team" as the handover proof.
- One honest touch makes it credible instead of cute: if any system was sunset, mark it "RETIRED" in gray. All-green with no variance looks decorative; one gray entry makes the greens mean something.
- Cost: trivial (CSS pulse animation, a few labels). Payoff: the whole site suddenly has a point of view.

### Concept 2: The ledger, rendered as a shipping log (for section 1.1)

Do not put the ten tools in cards. Cards flatten everything into equal marketing units. Render them as a log: dense rows, date-stamped, monospace accents, like a changelog or commit history, because that is the native format of a person who ships.

- Each row collapsed: `2025-09 · Science Report Comment Generator · MS Science`.
- On hover/tap the row expands to show the one-line description and the receipt quote, styled like a quoted email (subtle left border, sender name). Call this interaction "receipts on hover." It enacts his brand: every claim has an email behind it.
- The section can end with a deliberately unresolved final row: `2026-… · your school's tool · [get in touch]` linking to /work-with-me. One CTA, in-fiction, not a banner.

### Concept 3: The density heatmap (show, don't count)

He has the raw JSON of 2,563 calendar events from his AISC tenure. Render a GitHub-style contribution heatmap of the two years: 104 columns of weeks, cells shaded by events per day. Caption: "2,514 calendar events in two years at AISC. The dark squares are the job." No other portfolio in international education has this, and it converts an abstract stat into a texture you can feel. Static SVG generated once from the export; no runtime data needed. Place it on /experience or under the stats bar. (Any dataviz build should go through the dataviz skill for palette/accessibility.)

### Art direction notes (apply regardless of concepts)

1. **Add a monospace accent font** (IBM Plex Mono or JetBrains Mono) used only for numbers, dates, status labels, and the ledger. Instant builder identity, zero redesign. Keep Navy/teal/amber; the palette is fine and already his.
2. **Retire the emoji icons** in professional sections (🤖 ⚙️ 🏫 on /work-with-me, ⚖️ 🏥 in the audience grid). Emoji as icons is the single strongest "template" tell. Replace with one consistent line-icon set, or with nothing; the em-dash-free plain text is confident enough.
3. **Micro-interactions, maximum three site-wide:** the status-dot pulse, the ledger row expand, and count-up on the stats bar when it scrolls into view. Nothing else. No parallax, no particles, no typing-effect terminals; those read as 2019 dev-portfolio clichés and he is not a junior dev.
4. **Motion should feel mechanical, not bouncy.** Short durations (150-200ms), ease-out, no spring physics. His aesthetic is an instrument panel, not a toy. Respect `prefers-reduced-motion`.
5. **Hierarchy fix on the homepage:** it currently has seven sections of near-equal visual weight. After adding Built on Request, the page order should be: Hero → Stats → Built on Request (the new differentiator, promoted high) → Signature Innovations → About → Testimonials → CTA, with Career Highlights collapsed to a single compact strip linking to /experience. Two near-identical timeline treatments (homepage + experience) is redundancy the page pays for in scroll fatigue.

---

## 3. TOOL / PLATFORM PAIRINGS (ranked, with honest tradeoffs)

**0. First, fix what's broken: the contact form does not work.** `work-with-me.astro` line 7 still has `FORMSPREE_ID = 'YOUR_FORMSPREE_ID'`. Every consulting lead submitted through the live form currently goes nowhere. This outranks every idea below.

**1. Cal.com embedded booking (do now, ~1 hour).** The consulting funnel's first step is a "free 30-minute discovery call," but the site makes people write an essay in a form and wait. Embed Cal.com (free tier, self-hostable later, embeds cleanly in Astro) on /work-with-me for the discovery call; keep the (fixed) form for everything else. Tradeoffs: exposes availability patterns; needs calendar hygiene once Shanghai starts; Google Meet link auto-handling is free. Fit: a systems person whose booking flow is manual is off-brand. This is the highest conversion-per-effort change available.

**2. Screen-recorded tool walkthroughs, embedded (do now, and urgently).** Two to three minutes each, screen + voice, no talking head: the Curriculum Dashboard tour, the Health Office App flow, one comment generator. For a builder, 90 seconds of watching a real tool work beats 900 words of case study. Host unlisted on YouTube, embed with a lightweight facade (lite-youtube) to keep the static site fast. **The honest risk: access.** He has left AISC; if his access to the live systems is gone or going, the window to record may already be closing or closed. Inventory what recordings exist today (the Apple ADS application video was produced; demo videos were made for the Science generator per Kelsey's email). If nothing is recoverable, rebuild demo instances with synthetic data and record those. Never record real student or staff data regardless.

**3. One live embedded demo of one tool (do next, a weekend of work).** The single strongest differentiator available: portfolios describe tools, his would let you use one. Rebuild the report-comment generator as a client-side React island inside the existing Astro site, seeded with fictional students. Two implementation tiers: (a) canned outputs, zero backend, zero cost, zero risk, still 90% of the wow; (b) live AI via a small serverless proxy (Cloudflare Workers + Haiku-class model), pennies per month but needs rate limiting and key hygiene. Start with (a). Tradeoff: real build effort, and it must be clearly labeled a demo with fictional data. Do not attempt to embed the actual Apps Script tools; they are bound to the school's Workspace and that door should stay closed.

**4. The persona-chat widget ("ask this site"): qualified maybe.** Technically easy with persona-structured.json plus the same serverless proxy pattern. It would be memorable and on-brand for an AI-integration coach, but two honest problems. First, gimmick gravity: unscoped portfolio chatbots answer three questions and get weird. Second, and more important, it cuts against his own stated practice that AI text never reaches a human without passing his voice and facts filter; a live widget is by definition unfiltered output speaking in his name to potential clients and employers. If built at all, invert the frame: label it explicitly as a demonstration of the scoped, guarded, HUMAN-Framework-style bots he builds for schools ("this is what a constrained school bot looks like; ask it about my work"), restrict it to professional content, add prompt-injection guardrails, and log transcripts he reviews. As a persona simulation, skip it. As a live artifact of his craft, it earns its place.

**5. Blog: stay in Astro, skip Notion.** The repo already has `src/pages/blog`. Use Astro content collections and write in markdown; his whole identity is "I build it myself," and bolting a Notion CMS onto his own site quietly undercuts it. Notion embeds are also slow and visually foreign next to a tuned static site. If a writing cadence ever matters for consulting, add a Buttondown newsletter and cross-post; do not add a CMS he does not need for a blog that does not exist yet.

**6. Skip entirely:** migrating to Framer or Webflow (throws away a working, owned, free Astro site for a subscription and less control; the design gap is direction, not tooling), Linktree-style aggregators, and slide-deck-as-site tools. Read.cv or a polished LinkedIn is fine as a mirror but adds nothing the new /cv page does not.

**Sequenced:** fix Formspree → Cal.com → record/salvage walkthrough videos before access decays further → ship Built on Request + status-page treatment + /cv → comment-generator demo (canned tier) → reassess the chat widget only after everything above is live.

---

## 4. HOUSEKEEPING FLAGS (found while reading the live source)

1. **Contact form is dead** (Formspree placeholder). Covered above; repeating because it is the one revenue-touching bug.
2. **Site-wide em dash purge.** Nearly every page uses em dashes; his own red line, enforced by his own scripts, states never. Replace with commas, colons, periods, or restructure. This is also a good story he can tell ("my site aborts on em dashes now too").
3. **Stale "Current" badges.** Homepage Career Highlights lists AISC as "2024 – Present" with a Current badge; he left June 2026. Should read "2024 – 2026" with the badge removed or moved to SAS. Same section lists GOA as "Game Theory Instructor" only; he teaches Geometry and Game Theory. /experience lists VIS as "2021 – 2023"; other records say 2021 to 2024. Verify and align.
4. **The 25+ vs 10+ tools tension.** The site and older bios claim "25+ custom automation tools"; the verified, named, receipt-backed count from the full Gmail record is "more than 10, still growing." He does not sign numbers he cannot defend. Recommended resolution used throughout this brief: lead with "10+ tools shipped by request, adopted by name" (bulletproof), and if 25+ survives anywhere, frame it as "25+ automations built; 10+ adopted by name in departmental workflows with written receipts." His call, but the unverifiable half of the current /innovations grid (Classroom Observation Tool, Digital Citizenship Tracker, PL Dashboard claims like "400+ students annually") should either get sourced or get folded into unnamed background.
5. **AIFE venue conflict:** Jakarta (live site, persona card) vs Bangkok (cv-content.md). Verify against the actual conference record before the /cv ships.
6. **Calendar stat now available if wanted:** 2,514 events in tenure, 328 personally organized. Best used as the Concept 3 heatmap, not as another number in a bar.
