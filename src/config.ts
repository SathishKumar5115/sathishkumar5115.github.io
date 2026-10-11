// Site-wide settings (tech spec §5). Pages and layouts read from here.

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "Sathishkumar R",
  initials: "SR",
  url: "https://sathishkumar5115.github.io",
  description: "Sathishkumar R builds side projects to learn agentic engineering and ships things people use.",
  tagline: "Building side projects in agentic engineering.",
  intro: "I write down every decision, test every feature, and build in public. Here's what I'm working on.",
  // The only place the employer may be named (decision 0001; checked in CI from M5).
  role: "AI Software Engineer Intern @ Intel",
  email: "rsathishkumar1963@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/SathishKumar5115", platform: "github" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sathishkumar-r-/", platform: "linkedin" as const },
  ],
  // Other profiles for structured data (JSON-LD sameAs).
  sameAs: ["https://github.com/SathishKumar5115", "https://github.com/Gin5115", "https://www.linkedin.com/in/sathishkumar-r-/"],
  resume: { href: "/resume.pdf", file: "public/resume.pdf" },
  ogImage: "/og-default.png",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects/" },
    { label: "About", href: "/about/" },
  ] satisfies NavLink[],
} as const;
