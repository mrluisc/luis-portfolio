# Portfolio Rewrite — Copy-Ready Text (Fable, 2026-07-05)

Everything below is final copy, keyed to the sections of `src/pages/index.astro` so you can paste directly. One positioning decision drives all of it: **you already signed with SAS — so this site's job is no longer "get hired," it's "arrive as the person whose reputation precedes him," plus consulting.** The current site still says "Available for roles & consulting," which quietly undersells you: a signed offer at Shanghai American School is itself a proof point. Lead with it.

The second decision: your differentiator isn't that you build things — plenty of coaches build things. It's that **your systems survive your departure.** A director sent your system to 26 new hires as their first onboarding resource; you wrote a 50-page manual so a signature program runs without you; you left and the tools kept working. That's the story a leadership team cares about, because their real fear with builder-coaches is that everything dies when the person leaves. Every section below hammers institutional permanence.

---

## HERO (replace current)

**Tag (replaces "Available for roles & consulting"):**
> Joining Shanghai American School · Puxi Middle School · August 2026 — Available for consulting

**H1:** Luis Carlos <span>Moreno</span> *(unchanged)*

**Subtitle line 1:**
> EdTech Coordinator &nbsp;·&nbsp; Learning Innovation & Technology Coach

**Subtitle line 2:**
> Co-creator of the HUMAN Framework &nbsp;·&nbsp; GOA Instructor &nbsp;·&nbsp; Apple Distinguished School lead

**Amber tagline (replaces "Engineering Solutions. Empowering Educators."):**
> I build school systems<br />that outlive their builder.

**Hero paragraph:**
> A Venezuelan-born systems engineer turned international educator, I work at the intersection of coaching and code: close enough to pedagogy to know what teachers actually need, technical enough to build it myself. At my last school, the systems I built became the infrastructure — the dashboard 50+ leaders run curriculum from, the app that tracks 700+ students' health check-ins, the engine that places an entire grade into its signature trips. All of it still running after I left. That was the point.

*(CTAs unchanged.)*

---

## STATS BAR (replace all four)

The current bar buries your rarest proof and leads with your weakest ($8,200 reads as a ceiling, not a floor — cut it from the bar entirely). New order, strongest first:

```js
{ value: '26', label: 'New teachers onboarded through my system — before day one' },
{ value: '50+', label: 'School leaders running curriculum from my dashboard' },
{ value: '700+', label: 'Students covered by school-wide systems' },
{ value: '9', label: 'Systems built, documented, and handed over' },
```

Note "built, documented, and handed over" — the last two words are the résumé.

---

## ABOUT SECTION

**Heading (keep):** "I Build Systems That Make Institutional Knowledge Stick" — this is genuinely your best line; don't touch it.

**Replace the four paragraphs with:**

> ¡Hola, hola! I'm Luis Carlos — a Venezuelan-born systems engineer who became an educator. I grew up in Valle de la Pascua, immigrated to Texas at 15, and have since lived and worked across 5 countries on three continents.
>
> At the American International School Chennai, an IB World School of 700+ students, I was the Learning Innovation & Technology Coach and AI Initiatives Coordinator — I led the school's Apple Distinguished School certification, co-created its framework for ethical AI use, and coached 110+ faculty. I started my career in the classroom teaching MYP Mathematics, and that path is exactly the point: I work at the intersection of coaching and engineering, translating what teachers actually need into tools they actually adopt.
>
> Here's the test I hold my own work to: **does it keep running after I leave the room?** The curriculum dashboard I built is how 50+ AISC leaders see their program — and in May 2026, the school's director sent it to 26 incoming teachers as the very first onboarding resource they received, before they'd even arrived in Chennai. The trip-assignment engine shipped with a 50-page operations manual so the program runs identically without me. That's what I mean by making institutional knowledge stick: not tools, infrastructure.
>
> In August 2026 I'm bringing that playbook to **Shanghai American School (SAS Puxi, Middle School)** as EdTech Coordinator — same belief, new campus: technology serves people, not the other way around.

*(Keep the Elizabeth Keogh pull-quote, but fix its attribution — see Testimonials below.)*

---

## CASE STUDIES — THE ARC

Add this intro paragraph to `/work/index.astro` (and echo it in the homepage section subtitle), then add the one-line "chapter" kickers to each case-study hero. The four projects become one story of expanding scope: **one grade → every program → the whole student body → the institution's memory.**

**Work index intro:**
> These four projects are one story told at increasing scale. It starts with a single high-stakes logistics problem — placing one grade into its signature trips — and ends with the school's entire curriculum becoming searchable infrastructure that a director now hands to new teachers on day zero. At each step the question was the same: can this run without me? Every system below shipped with the documentation, training, and handover to answer yes.

**Chapter kickers (one line under each case-study hero title):**

1. **Discover India** — *Chapter 1: Prove it on one hard problem.* "237 students, 15 trips, ranked preferences, hard capacity, gender balance — and a 50-page manual so it never depends on me again."
2. **Student Assignment Systems** — *Chapter 2: Turn the solution into infrastructure.* "One engine became four — SEVAI, Discover India, Discovery Day, STEAM Week — quietly placing 700+ students and saving 50+ hours of manual work a year."
3. **Health Office App** — *Chapter 3: Go school-wide, and go fast.* "A duty-of-care gap closed for all 700+ students — from school-wide launch to live automated notifications in six days."
4. **Curriculum Intelligence Dashboard** — *Chapter 4: Become the institution's memory.* "216 courses and 849 units made visible to 50+ leaders — so central to how the school works that the director made it 26 new teachers' first onboarding resource."

**Homepage section subtitle (replace "From ethical AI integration guidelines to data-driven lesson analysis…"):**
> Four projects, one arc: from placing a single grade into trips, to becoming the system a director hands new teachers before they even land. Built inside the tools schools already use — shipped fast, documented fully, designed to outlive the builder.

---

## TESTIMONIALS SECTION

**Lead with the aggregate — move the footer line to the top as the section subtitle:**
> **4.8/5 across 26 teacher responses · 100% would work with me again.** Here's what a few of them said.

**Reorder the quotes and fix two attributions that undersell:**

1. Keogh first, relabeled — the point isn't that a Grade 3 teacher liked the help; it's that she was moved to write to leadership unprompted:
   - Role line: **"Unsolicited commendation sent to the Head of School"** · Elizabeth Keogh, Grade 3 Teacher, AISC
2. **Replace the weak Joel Bevans quote** ("I value the process and the product" — five words that could describe a sandwich) with the far stronger one already on your Curriculum Intelligence page — the director's own onboarding email:
   - *"Over the past year, we have been working to move all of our curriculum documentation into a shared Google Drive structure to create greater consistency, accessibility, and alignment across the school."*
   - Attribution: **Joel Bevans, Director of Teaching & Learning — in the email sending my curriculum system to 26 incoming teachers as their first onboarding resource**
   - The attribution line is the testimonial. A director adopting your work as official onboarding infrastructure beats any adjective he could have written.
3. Galaty ("phenomenal work… extensive insight into our program") third.
4. Keep the two survey quotes; cut nothing else.

---

## 3 ALTERNATIVE HEADLINE/TAGLINE OPTIONS

1. **"I build school systems that outlive their builder."** *(used above — my pick)*
   Support line: *Proven at one IB World School. Arriving at Shanghai American School, August 2026.*
   Why: speaks directly to the hiring committee's unspoken fear about builder-types, and makes departure — usually a résumé's awkward moment — into the proof itself.

2. **"The coach who codes."**
   Support line: *Close enough to pedagogy to know what teachers need. Technical enough to build it myself.*
   Why: shortest possible statement of your rarest trait; the support line is already the best sentence on your current site, promoted from paragraph three to the marquee.

3. **"From one classroom to the whole school's infrastructure."**
   Support line: *Dashboards, apps, and engines that 700+ students and 50+ leaders run on every day — shipped inside the tools schools already use.*
   Why: for an audience that buys scale and adoption numbers first, story second.

---

## WHERE THE CURRENT COPY UNDERSELLS YOU

1. **"Available for roles & consulting"** — stale and actively harmful: it makes a person with a signed offer at a top-tier school look like he's still job-hunting. The SAS appointment is social proof; wear it.
2. **The 26-teacher onboarding fact is buried** at the bottom of one case study. It's the single rarest thing on the site — a school director independently chose your system as the first thing new hires see. That's not a feature, that's institutional adoption. It now appears in the hero, stats bar, about, arc, and Joel's attribution. That's not repetition; that's a thesis.
3. **"$8,200 saved per year"** anchors you cheap — it invites the reader to price nine systems at less than a laptop cart. Cut it from the stats bar; if you keep it anywhere, fold it into prose as "50+ staff-hours and thousands of dollars a year."
4. **Keogh's quote labeled "Grade 3 Teacher"** hides that it was an unsolicited commendation to the Head of School. The context is the credential.
5. **"9 major systems built"** — "built" is table stakes; "built, documented, and handed over" is the differentiator no other candidate can claim.
6. **Health Office ship speed is buried**: school-wide launch June 3, automated notifications live June 9. Six days from launch to fully operational is startup velocity inside a school bureaucracy — the kicker now says so.
7. **Apple Distinguished School certification lead** appears only as a timeline footnote. For an Apple-ecosystem international school audience (which SAS is), this is a headline credential — it's now in the hero subtitle.
8. **Two different "700+" stats** (Health Office students vs. assignment placements) read as the same number counted twice. Labels now differentiate: "students covered by school-wide systems" vs. per-case-study figures.

---

## Next Steps (Sonnet execution)

- Paste section by section into `index.astro` (hero → stats → about → testimonials)
- Add the kickers to the four `/work/*.astro` heroes and the intro to `/work/index.astro`
- Verify the June 3/June 9 dates and "110+ faculty coached" against records
- Still pending from project notes: Formspree ID + custom domain
