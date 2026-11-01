// Sample content for the About layout. Real content arrives in PR 7 (the build will reject `[` placeholders).
// Employer names live only here and in config.ts (decision 0001; see tests/unit/guardrail.test.ts).
export const bio = [
  '[A short bio, three or four sentences: who I am, what I work on, what I am learning. Plain words.]',
  '[One more paragraph on how I like to work: write the spec first, build in small steps, write down what broke.]',
];

export const careerLog = [
  { role: 'AI Software Engineer Intern', org: 'Intel', period: '[start] to present' },
  { role: 'M.Tech', org: '[Institution]', period: '[start] to [end]' },
];

export const toolbox = ['Claude Code', 'Obsidian', 'GitHub', '[Languages]', '[Frameworks]'];

export const terminalCard = [
  { key: 'name', value: 'Sathishkumar R' },
  { key: 'role', value: 'AI Software Engineer Intern' },
  { key: 'based', value: '[city, country]' },
  { key: 'learning', value: 'agent loops, MCP, evals, CS fundamentals' },
  { key: 'building', value: 'Retro, this site' },
];
