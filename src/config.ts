export type Palette = 'teal' | 'indigo';

export const site = {
  name: 'Sathishkumar R',
  url: 'https://sathishkumar5115.github.io',
  // Change this one line (then merge and deploy) to change the palette for everyone.
  defaultPalette: 'teal' as Palette,
  employerLine: 'AI Software Engineer Intern @ Intel',
  links: {
    github: 'https://github.com/SathishKumar5115',
    linkedin: 'https://www.linkedin.com/in/sathishkumar-r-/',
    email: 'mailto:rsathishkumar1963@gmail.com',
    resume: '/resume.pdf',
  },
  nav: [
    { href: '/projects/', label: 'Projects' },
    { href: '/blog/', label: 'Blog' },
    { href: '/about/', label: 'About' },
    { href: '/shelf/', label: 'Shelf' },
  ],
};
