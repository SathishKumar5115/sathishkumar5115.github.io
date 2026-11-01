export type Palette = 'teal' | 'indigo';

export const site = {
  name: 'Sathishkumar R',
  url: 'https://sathishkumar5115.github.io',
  // Change this one line (then merge and deploy) to change the palette for everyone.
  defaultPalette: 'indigo' as Palette,
  employerLine: 'AI Software Engineer Intern @ Intel',
  links: {
    github: 'https://github.com/SathishKumar5115',
    linkedin: 'https://www.linkedin.com/in/sathishkumar-r-/',
    email: 'mailto:rsathishkumar1963@gmail.com',
    resume: '/resume.pdf',
  },
  // GoatCounter (decision 0012): cookie-free, added to the deployed build only (ANALYTICS=1).
  analytics: { goatcounterCode: 'sathishkumar5115' },
  nav: [
    { href: '/projects/', label: 'Projects' },
    { href: '/blog/', label: 'Blog' },
    { href: '/about/', label: 'About' },
    { href: '/shelf/', label: 'Shelf' },
  ],
};
