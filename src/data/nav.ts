/**
 * nav.ts: the site's pages, in menu order. The LC nav and footer both read this,
 * so a page is added or renamed in one place.
 */
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'My Journey' },
  { href: '/work', label: 'Work' },
  { href: '/innovations', label: 'Innovations' },
  { href: '/blog', label: 'Blog' },
  { href: '/cv', label: 'CV' },
];

import { facts } from './facts';

/** Work With Me is hidden for now (LC, 10 Oct 2026): contact buttons open LinkedIn in a new tab.
 *  To bring the page back, rename src/pages/_work-with-me.astro and restore its menu line. */
export const contactHref = `https://www.${facts.person.linkedin}/`;
