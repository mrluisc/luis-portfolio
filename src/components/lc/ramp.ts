/**
 * ramp.ts: a one-hue sequential ramp built from a brand colour, for charts.
 * It keeps the colour's OKLCH hue, steps the lightness, and eases the chroma.
 * The default lightness steps for Selva were checked with the dataviz skill's
 * validator (--ordinal, surface Arena, 2 Oct 2026): monotone, gaps >= 0.06,
 * light end 2.19:1 on Arena, one hue.
 */
import tokens from '../../brand/tokens.json';

type Lch = [number, number, number];
const hex = (name: keyof typeof tokens.color) => tokens.color[name].$value;
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const delin = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function toOklab(h: string): [number, number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(h.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function fromOklab([L, a, b]: [number, number, number]): string {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, delin(c))) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}

const toLch = (h: string): Lch => {
  const [L, a, b] = toOklab(h);
  return [L, Math.hypot(a, b), Math.atan2(b, a)];
};

/** Light to dark steps of one brand colour. */
export function ramp(name: keyof typeof tokens.color = 'selva', steps = [0.7, 0.6, 0.5, 0.4, 0.3]): string[] {
  const [L0, C0, H0] = toLch(hex(name));
  return steps.map((L) => {
    const C = C0 * Math.min(1, 0.6 + (0.4 * (1 - L)) / (1 - L0));
    return fromOklab([L, C * Math.cos(H0), C * Math.sin(H0)]);
  });
}

/** A share of one brand colour mixed into another, in OKLab: for quiet fills such as an empty cell. */
export function mix(base: keyof typeof tokens.color, ink: keyof typeof tokens.color, share: number): string {
  const p = toOklab(hex(base));
  const q = toOklab(hex(ink));
  return fromOklab([0, 1, 2].map((i) => p[i] + (q[i] - p[i]) * share) as [number, number, number]);
}
