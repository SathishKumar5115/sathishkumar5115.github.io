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
  social: [{ label: "GitHub", href: "https://github.com/SathishKumar5115", platform: "github" as const }],
  // About (M3) is added when its page exists.
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects/" },
  ] satisfies NavLink[],
} as const;
