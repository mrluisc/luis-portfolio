/**
 * testimonials.ts: every quote from a named person on the site, in one place.
 *
 * Luis Carlos's rule (3 Oct 2026): a quote appears on the site only after the person
 * has said yes. Until then it stays here with `approved: false` and the pages leave
 * it out; a section with no approved quotes disappears completely. When someone
 * approves a quote, or writes a new testimonial, set `approved: true` (and add the
 * date in `approvedOn`), or add a new entry.
 *
 * The quotes below were collected from emails and messages; none has been approved yet.
 */
import { facts, credit } from './facts';

type PersonKey = keyof typeof facts.people;

export interface Testimonial {
  id: string;
  person: PersonKey;
  quote: string;
  /** Where the words came from. For the record only; never shown. */
  source: string;
  /** Has this person said yes to being quoted on the site? */
  approved: boolean;
  /** When they said yes, e.g. '2026-10-15'. */
  approvedOn?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'keogh-commendation',
    person: 'keogh',
    quote:
      'Luis Carlos has consistently been patient, responsive, and incredibly helpful, often taking the time to troubleshoot problems thoroughly and ensure that things were fully resolved. His support has significantly reduced stress for many of us and has made a complicated process much smoother.',
    source: 'Unsolicited commendation to the Head of School, May 2026',
    approved: false,
  },
  {
    id: 'keogh-commendation-short',
    person: 'keogh',
    quote: 'His support has significantly reduced stress for many of us and has made a complicated process much smoother.',
    source: 'The same commendation, shortened (home page About, CV)',
    approved: false,
  },
  {
    id: 'clinton-introduction',
    person: 'clinton',
    quote:
      "Luis Carlos Moreno is our Technology and Innovation Coach, making amazing tools to improve teachers' lives, among his many other activities.",
    source: 'Introducing me to an outside AI consultant',
    approved: false,
  },
  {
    id: 'bevans-onboarding',
    person: 'bevans',
    quote:
      'Over the past year, we have been working to move all of our curriculum documentation into a shared Google Drive structure to create greater consistency, accessibility, and alignment across the school.',
    source: `Onboarding email to ${facts.scale.incomingTeachers} incoming teachers, May 2026`,
    approved: false,
  },
  {
    id: 'wood-tech-summit',
    person: 'wood',
    quote:
      'Many students shared afterward how motivated they felt by your feedback. We are deeply grateful for your time and support of our Grade 8 learners.',
    source: 'On the Grade 8 Tech Investor Summit',
    approved: false,
  },
  {
    id: 'hart-consent-system',
    person: 'hart',
    quote: 'Thank you so much for your help on this. It has made a massive difference in our department.',
    source: 'On the DT and trip safety consent system',
    approved: false,
  },
  {
    id: 'bull-comment-generator',
    person: 'bull',
    quote: 'This spreadsheet is incredible, and the video is so concise and clear.',
    source: 'On the Science report comment generator',
    approved: false,
  },
  {
    id: 'galaty-curriculum',
    person: 'galaty',
    quote: 'This is phenomenal work throughout this year that has provided extensive insight into our program.',
    source: 'On the Curriculum Intelligence work',
    approved: false,
  },
  {
    id: 'brigham-eal-tracker',
    person: 'brigham',
    quote: "'Game-like' features... Impressive!",
    source: 'On the EAL Progress Tracker',
    approved: false,
  },
  {
    id: 'martin-shark-tank',
    person: 'martin',
    quote: 'LC, this is SO cool... Amazing work!',
    source: 'On the Math Shark Tank Analysis Report',
    approved: false,
  },
  {
    id: 'schneider-transcriber',
    person: 'schneider',
    quote: 'This is amazing. I want to learn how to do this.',
    source: 'On the Meeting Notes Auto-Transcriber',
    approved: false,
  },
  {
    id: 'merletti-coaching',
    person: 'merletti',
    quote:
      'He was so approachable, always working from a growth perspective to help me achieve my goals. He has given me confidence to keep trying other AI applications.',
    source: 'Coaching feedback',
    approved: false,
  },
  {
    id: 'brigham-coaching',
    person: 'brigham',
    quote:
      'His expertise with educational technology is such an asset. Even if he is unfamiliar with a program, he can quickly analyze it and solve any problems that I have.',
    source: 'Coaching feedback',
    approved: false,
  },
  {
    id: 'gomez-escobar-coaching',
    person: 'gomezEscobar',
    quote:
      'Luis provided the perfect combination of expertise, patience, and accessibility that made learning feel safe and achievable. Luis is not just an amazing coach but an incredible individual you can truly depend on.',
    source: 'Coaching feedback, given twice, months apart',
    approved: false,
  },
];

/** The quote with this id, only if the person approved it; otherwise undefined. */
export function approvedQuote(id: string): (Testimonial & { name: string; credit: string }) | undefined {
  const t = testimonials.find((q) => q.id === id);
  if (!t) throw new Error(`testimonials.ts has no quote "${id}"`);
  if (!t.approved) return undefined;
  const p = facts.people[t.person];
  return { ...t, name: p.name, credit: credit(p) };
}
