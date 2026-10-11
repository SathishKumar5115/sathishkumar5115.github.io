// About page data (v5 design). The employer comes from site config (decision 0001).
import { site } from "../config";

export const whoami: { key: string; value: string }[] = [
  { key: "name", value: site.name },
  { key: "role", value: `${site.role} @ ${site.employer}` },
  { key: "stack", value: "python, typescript, react, flask, flutter" },
  { key: "into", value: "agents, security, developer tools" },
  { key: "contact", value: site.email },
];

// Jobs and degrees only, newest first (owner, 2026-10-11).
export const log: { when: string; what: string; where?: string }[] = [
  { when: "2026-07", what: `Joined ${site.employer} as an ${site.role}` },
  { when: "2025-07", what: "Started M.Tech in Computer Science and Engineering", where: "VIT" },
  { when: "2025-06", what: "Completed B.Tech in Computer Science and Engineering (IoT)", where: "Shiv Nadar University" },
  { when: "2024-05", what: "Interned as an IoT Engineer", where: "Tata Consultancy Services" },
  { when: "2023-12", what: "Interned as a Software Developer", where: "AppLever Tech" },
  { when: "2023-06", what: "In-plant training", where: "ISRO Propulsion Research Complex" },
  { when: "2021-09", what: "Started B.Tech in Computer Science and Engineering (IoT)", where: "Shiv Nadar University" },
];

export const toolbox: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C", "Dart", "SQL"] },
  { group: "Frameworks", items: ["React", "Node.js", "Express", "Flask", "Flutter", "Astro"] },
  { group: "Data & cloud", items: ["MongoDB", "MySQL", "Firebase", "AWS"] },
  { group: "Tools", items: ["Git", "GitHub Actions", "Docker", "Playwright", "Figma"] },
];
