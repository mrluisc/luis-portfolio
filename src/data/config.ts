/**
 * config.ts — third-party service IDs.
 *
 * Kept separate from facts.ts: facts.ts is claims about Luis that must never
 * disagree across pages; this is plumbing. Both are single-sourced for the
 * same reason, though — an ID pasted into two places is an ID that will
 * eventually be updated in one.
 *
 * Anything left empty is treated as "not configured yet" and the feature that
 * depends on it renders nothing, rather than shipping a dead form or a broken
 * widget to a live site.
 */

export const config = {
  /**
   * Formspree form ID — the part after /f/ in the endpoint they give you.
   * Sign up at formspree.io with mr.luisc@gmail.com, create a form, paste the
   * ID here. Until then the contact form is hidden and the page shows a
   * mailto fallback instead.
   */
  formspreeId: '',

  /**
   * Cal.com booking link, in "username/event-slug" form (e.g. "mrluisc/30min").
   * Sign up at cal.com, create an event type, paste the link here. Until then
   * the booking section is hidden entirely.
   */
  calLink: '',
} as const;

export const hasFormspree = config.formspreeId.length > 0;
export const hasCal = config.calLink.length > 0;
