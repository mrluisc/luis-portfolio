/**
 * motif.ts: the motif's geometry from the brand tokens, as shares (in %) of the
 * width of the box it sits in. Motif.astro draws it; PageHero and the footer use
 * `clear` to keep text out of its way.
 */
import tokens from '../../brand/tokens.json';

export type Placement = keyof typeof tokens.motif.placements;
export type Scheme = keyof typeof tokens.motif.colours;

const pct = (share: number) => +(share * 100).toFixed(4);
const v = (name: string) => `var(--lc-${name})`;

export function motifGeometry(placement: Placement, scheme: Scheme) {
  const m = tokens.motif;
  const p = m.placements[placement];
  const s = m.colours[scheme];
  const stripe = pct(m.stripe);
  const period = pct(m.period);
  const tile = period * s.lines.length;
  // Whole tiles only, so no sliver of a line appears at the edge.
  const field = +(Math.round(pct(p.field) / tile) * tile).toFixed(4);
  const dot = pct(p.dot);
  const stops = s.lines
    .map((c, i) => {
      const a = +(i * period).toFixed(4);
      const b = +(a + stripe).toFixed(4);
      const e = +((i + 1) * period).toFixed(4);
      return `${v(c)} ${a}cqw ${b}cqw, transparent ${b}cqw ${e}cqw`;
    })
    .join(', ');
  return {
    field,
    dot,
    dotY: pct(p['dot-y']),
    dotColour: v(s.dot),
    lines: `repeating-linear-gradient(90deg, ${stops})`,
    inside: `repeating-linear-gradient(90deg, ${v(s.inside)} 0 ${stripe}cqw, transparent ${stripe}cqw ${period}cqw)`,
    /** How far from the right edge the motif reaches: the field plus half the dot. */
    clear: +(field + dot / 2).toFixed(4),
  };
}
