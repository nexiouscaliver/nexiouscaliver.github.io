import { getEntry } from 'astro:content';

/** Prefix an internal path with the deploy base (empty for the user site). */
export const href = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Site-wide settings live in src/content/settings/site.md. */
export const getSite = async () => (await getEntry('settings', 'site')).data;
