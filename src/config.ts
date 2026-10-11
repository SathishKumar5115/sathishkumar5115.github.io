// Site-wide settings (tech spec §5). Pages and layouts read from here.

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "Sathishkumar R",
  initials: "SR",
  url: "https://sathishkumar5115.github.io",
  description:
    "Sathishkumar R builds software end to end: agents that do real work, security tools that catch real attacks, and apps people use.",
  // Home intro (v5 design).
  eyebrow: "M.Tech student · AI software engineering intern",
  pitch: "I build software end to end: agents that do real work, security tools that catch real attacks, and apps people use.",
  // The only place the employer is named (decision 0001). Shown on About only; the CI guardrail (M5) checks this.
  employer: "Intel",
  role: "AI Software Engineer Intern",
  email: "rsathishkumar1963@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/SathishKumar5115" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sathishkumar-r-/" },
  ],
  // Other profiles for structured data (JSON-LD sameAs).
  sameAs: ["https://github.com/SathishKumar5115", "https://github.com/Gin5115", "https://www.linkedin.com/in/sathishkumar-r-/"],
  resume: { href: "/resume.pdf", file: "public/resume.pdf" },
  ogImage: "/og-default.png",
  // Writing (M4) and Shelf (M4.5) join the nav when they have content.
  nav: [
    { label: "Projects", href: "/projects/" },
    { label: "About", href: "/about/" },
    { label: "Resume", href: "/resume.pdf" },
  ] satisfies NavLink[],
  // "Now" card on Home. Update `updated` whenever the items change.
  now: {
    updated: "2026-10-11",
    items: [
      { title: "AI software engineering intern", detail: "Since July 2026" },
      { title: "M.Tech, Computer Science", detail: "VIT, 2025 – 2027" },
      { title: "Building Retro", detail: "An agent that runs my weekly review" },
    ],
  },
} as const;
