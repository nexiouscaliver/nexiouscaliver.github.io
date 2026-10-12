export const SITE = {
  name: 'Shahil Kadia',
  role: 'AI systems engineer',
  email: 'shahilkadia@gmail.com',
  sameAs: [
    'https://github.com/nexiouscaliver',
    'https://www.linkedin.com/in/shahil-kadia',
  ],
};

/** Prefix an internal path with the deploy base (empty for the user site). */
export const href = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
