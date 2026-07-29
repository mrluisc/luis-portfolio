/**
 * facts.ts — the single source of truth for every fact that appears on more
 * than one page of this site.
 *
 * WHY THIS FILE EXISTS
 * The 2026-07-28/29 integrity audit found that almost every error was the same
 * error: one fact, stated three different ways on three different pages. The
 * tool count was simultaneously "10+", "20+" and "25+". The SAS job title had
 * three variants. A colleague's title was wrong on two of three pages. None of
 * those pages was wrong about reality — they were wrong about each other.
 *
 * HOW TO USE IT
 * Never type a guarded number, title, name or date directly into a .astro file
 * under src/pages. Import from here instead:
 *
 *     import { facts, range } from '../data/facts';
 *     ...
 *     <p>Coached {facts.scale.facultyCoached} faculty</p>
 *     <p>{range(facts.vis)}</p>
 *
 * `npm run check:facts` (which `npm run build` runs first) fails the build if a
 * guarded literal reappears hardcoded in src/pages. See scripts/check-facts.mjs.
 *
 * DATES ARE STORED STRUCTURED, NOT FORMATTED. Pages render "2021 – 2024" or
 * "2021 to 2024" from the same startYear/endYear, so a date can never drift
 * just because two pages picked different punctuation.
 *
 * PROVENANCE
 * Every value below is verified in the AISC impact brain, verified against a
 * primary source (noted inline), or confirmed directly by Luis. To change one,
 * change it HERE and only here.
 */

export const facts = {
  person: {
    fullName: 'Luis Carlos Moreno Rivero',
    shortName: 'Luis Carlos Moreno',
    email: 'mr.luisc@gmail.com',
    site: 'mrluisc.com',
    github: 'github.com/mrluisc',
    linkedin: 'linkedin.com/in/luiscarlosmorenorivero',
    nationality: 'Venezuelan',
    languages: 'Spanish / English / Portuguese',
  },

  /** Current position. Started 2026-07-27; title confirmed by Luis 2026-07-28. */
  current: {
    title: 'Instructional Technology Coach',
    school: 'Shanghai American School',
    schoolShort: 'SAS',
    campus: 'Puxi',
    division: 'Middle School',
    startMonth: 'July',
    startYear: '2026',
    location: 'Shanghai, China',
  },

  /** Previous position, AISC Chennai. Both titles confirmed by Luis 2026-07-28. */
  aisc: {
    school: 'American International School Chennai',
    schoolShort: 'AISC',
    location: 'Chennai, India',
    title: 'Learning Innovation & Technology Coach',
    secondTitle: 'AI Initiatives Coordinator',
    startMonth: 'Jul',
    startYear: '2024',
    endMonth: 'Jun',
    endYear: '2026',
  },

  goa: {
    org: 'Global Online Academy',
    orgShort: 'GOA',
    title: 'Geometry & Game Theory Instructor',
    startYear: '2024',
    endYear: 'Present',
  },

  vis: {
    org: 'Vientiane International School',
    orgShort: 'VIS',
    title: 'MYP Mathematics Teacher',
    startYear: '2021',
    endYear: '2024',
  },

  isp: {
    org: 'International School of Panama',
    orgShort: 'ISP',
    startYear: '2016',
    endYear: '2021',
    /**
     * Four distinct roles: Learning Support Specialist → Math Teacher & Dept
     * Head → EdTech Coordinator → Instructional Technology Coach.
     * cv.astro used to say "Five" by splitting Math Teacher from Dept Head.
     */
    roleCount: 'Four',
    roleChain:
      'EdTech Coordinator K-12 → Instructional Technology Coach → MS Math Teacher & Dept. Head → Learning Support Specialist',
    roleList:
      'EdTech Coordinator, Instructional Technology Coach, Mathematics Teacher & Department Head, Learning Support Specialist',
  },

  rabin: {
    org: 'Colegio Isaac Rabin',
    location: 'Panama',
    title: 'STEM & Robotics Teacher and Head of IT',
    startYear: '2015',
    endYear: '2016',
  },

  /** Cross-page scale numbers. These are the ones that drifted historically. */
  scale: {
    /** Tools shipped by colleague request. Was 10+/20+/25+ across pages before the audit. */
    tools: '20+',
    /** AISC student body, and the reach of the school-wide systems. */
    students: '700+',
    /** School leaders the curriculum dashboard was deployed to. */
    leaders: '50+',
    /** Faculty coached at AISC. The brain says 100+; "110+" was an overstatement. */
    facultyCoached: '100+',
    /** Educators in the "Exploring Tomorrow" AI book club. */
    bookClubEducators: '20+',
    /** Incoming teachers sent the curriculum Shared Drive infrastructure (May 2026). */
    incomingTeachers: '26',
    /** Students reached by the digital citizenship curriculum, annually. */
    digitalCitizenshipStudents: '400+',
    /** Months of LEA data analysed. */
    leaMonths: '8+',
    /** Countries lived and worked in. */
    countriesLived: '5',
    /** Countries visited. Confirmed by Luis 2026-07-29 — travel-history's ~25 is only the Gmail-recoverable subset. */
    countriesVisited: '60+',
  },

  /**
   * Colleague feedback survey. Verified 2026-07-28 against the source PDF in
   * Luis's personal Drive (1jnekRn_fsxpdxqauNZ7abkZpxydwigrU):
   *   "Helped improve learning/work outcomes" — 16 fives + 5 fours over 21
   *   responses = 4.76 ≈ 4.8, nothing below a 4 (16/21 = 76.2% gave a 5).
   *   "Would consider engaging again" — 19 fives + 2 fours = 100% at 4 or 5
   *   (19/21 = 90.5% gave a 5).
   * N is 21, not 26. The 26 leaked in from the unrelated incoming-teachers stat.
   */
  survey: {
    name: 'Learning Innovation & Tech Coach Feedback Survey, 2024-25',
    rating: '4.8/5',
    responses: '21',
    wouldEngageAgain: '100%',
    /** Share who gave a 5 on "would engage again". */
    retentionPct: '90.5%',
    /** Share who gave a 5 on "improved learning outcomes". */
    outcomesPct: '76.2%',
  },

  /**
   * Two different, both-correct counts. Do not conflate them.
   *   career     — every conference talk, ISP era onward (includes PAIS Panama 2019).
   *   aiscTenure — talks given during the AISC years only.
   */
  conferences: {
    career: '7',
    careerList: 'Data in Schools ×2 · AIFE ×2 · DEIX · AIELOC · PAIS',
    aiscTenure: 'five',
  },

  /** Curriculum Intelligence Dashboard. */
  curriculum: {
    courses: '216',
    units: '849',
    completion: '81%',
  },

  /** SEVAI service-learning placement engine. */
  sevai: {
    students: '150+',
    activities: '12',
    scriptLines: '700+',
    hoursSaved: '20–30',
  },

  /** Discover India trip assignment engine. */
  discoverIndia: {
    /** The case-study page states this exact count five times; "~237" on the summary pages was the hedge that drifted in. */
    students: '237',
    trips: '15',
    /** Page count of the operations manual. Rendered as "{n}-page" or "{n} pages" — it was "50-page" on one page and "50+ page" on another. */
    manualPages: '50',
    signUps: '215+',
  },

  /**
   * Discovery Day 2026 — a different programme from SEVAI, hence its own
   * activity count.
   * ⚠️ UNVERIFIED: `signUps` here (215) is the same figure the site attributes
   * to Discover India above (215+). Two separate programmes landing on the same
   * sign-up count looks like copy-paste rather than coincidence. Confirm against
   * the record before citing either; neither has been changed pending that.
   */
  discoveryDay: {
    activities: '34',
    signUps: '215',
  },

  /** STEAM Week 2026 distribution. */
  steamWeek: {
    students: '120+',
    workshops: '12+',
  },

  /** The four assignment engines (SEVAI, Discover India, Discovery Day, STEAM Week) as one programme. */
  assignmentSystems: {
    programs: '4',
    studentsPlaced: '700+',
    hoursSavedPerYear: '50+',
  },

  /** Other recurring figures. */
  misc: {
    turnitinSavings: '~$7,000',
    vendorSpend: '~$200k',
    ibTeachers: '20+',
    /** LEA uptake beyond AISC. */
    leaSchools: 'eight',
    leaCountries: 'Indonesia, Singapore, Vietnam, Korea, Malaysia and Macau',
    appleYears: '2025-2028',
  },

  /**
   * Colleagues quoted on the site. Titles are as of the quote.
   * Verified in the 2026-07-28 audit — Galaty is MS Counselor (was wrong on
   * three pages), Brigham is HS EAP Teacher (was plain "Teacher" on
   * work-with-me while index.astro had it right).
   */
  people: {
    keogh: { name: 'Elizabeth Keogh', title: 'Grade 3 Teacher' },
    bevans: { name: 'Joel Bevans', title: 'Director of Teaching & Learning' },
    wood: { name: 'Jonathan Wood, PhD', title: 'MS Social Studies Teacher' },
    hart: { name: 'Jay Hart', title: 'MS Design Technology Teacher' },
    bull: { name: 'Kelsey Bull', title: 'MS Principal' },
    galaty: { name: 'Gretchen Galaty', title: 'MS Counselor' },
    brigham: { name: 'Suzanne Brigham', title: 'HS EAP Teacher' },
    gomezEscobar: { name: 'Eugenia Gomez-Escobar', title: 'MS World Language Teacher' },
    merletti: { name: 'Nicole Merletti', title: 'MS Teacher' },
    clinton: { name: 'Greg Clinton', title: 'Deputy Head of School' },
    schneider: { name: 'Lynn Schneider', title: 'ES Principal' },
    martin: { name: 'Kyle Martin', title: 'ISKL' },
    perezTalavera: { name: 'María Pérez Talavera', title: 'HUMAN Framework co-creator' },
  },
} as const;

export type Facts = typeof facts;

type YearSpan = { startYear: string; endYear: string };

/** "2021 – 2024" — the timeline/card form. */
export function range(span: YearSpan): string {
  return `${span.startYear} – ${span.endYear}`;
}

/** "2021 to 2024" — the CV prose form. */
export function rangeProse(span: YearSpan): string {
  return `${span.startYear} to ${span.endYear}`;
}

/** "Jay Hart, MS Design Technology Teacher" */
export function credit(p: { name: string; title: string }): string {
  return p.title ? `${p.name}, ${p.title}` : p.name;
}
