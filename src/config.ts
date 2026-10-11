// Site-wide settings (tech spec §5). Pages and layouts read from here.

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "Sathishkumar R",
  initials: "SR",
  url: "https://sathishkumar5115.github.io",
  description: "Portfolio of Sathishkumar R.",
  // Projects (M2) and About (M3) are added when their pages exist.
  nav: [{ label: "Home", href: "/" }] satisfies NavLink[],
} as const;
