// Sample content for the Home layout. Real content arrives in PR 7 (the build will reject `[` placeholders).
export const now = {
  updated: '[date]',
  items: [
    { kicker: 'Building', text: 'Retro, a weekly review, run by hand first' },
    { kicker: 'Designing', text: 'This site, one canvas at a time' },
    { kicker: 'Learning', text: 'Agent loops, MCP, evals, and CS fundamentals' },
  ],
};

export const featured = [
  { title: 'Ouroboros', tag: 'agent', year: '[year]', summary: '[One line: the problem and the approach.]', href: '/projects/' },
  { title: 'FoodIndex', tag: 'data', year: '[year]', summary: '[One line: the problem and the approach.]', href: '/projects/' },
  { title: 'Sentinels', tag: 'security', year: '[year]', summary: '[One line: the problem and the approach.]', href: '/projects/' },
];

export const otherProjects = [
  { title: 'Retro', meta: 'weekly review · in progress' },
  { title: 'Warehouse Intrusion Detection', meta: '[stack]' },
  { title: 'Overlord', meta: 'Discord bot' },
  { title: 'This site', meta: 'static, spec-driven' },
];

export const shelfPreview = ['[Tool name]', '[Tool name]', '[Tool name]', '[Tool name]'];
