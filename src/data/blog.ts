/**
 * blog.ts: helpers for the blog pages. Posts live in src/content/blog.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All posts, newest first. */
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** "6 March 2021". */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * The opening of a post as plain text, cut at a word near `max` characters. Skips
 * images, embeds, lists, headings and short lines (a bold label, a lone link), so
 * the excerpt starts with the first real paragraph.
 */
export function excerpt(body: string, max = 220): string {
  const plain = (p: string) => p.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '');
  const paras = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('!') && !p.startsWith('<') && !p.startsWith('#') && !p.startsWith('-') && !p.startsWith('>') && !/^\d+\./.test(p));
  const para = paras.find((p) => plain(p).length >= 80) ?? paras[0] ?? '';
  const text = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,.;:]$/, '') + '…';
}
