import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// One page per page type (Home, Projects index, Project, About, Shelf, Now, Blog, 404).
const pages = ['/', '/projects/', '/projects/retro/', '/about/', '/shelf/', '/now/', '/blog/', '/404.html'];

for (const palette of ['ink', 'teal', 'indigo', 'forest']) {
  for (const mode of ['light', 'dark']) {
    for (const path of pages) {
      test(`axe: ${path} (${palette}, ${mode})`, async ({ browser }) => {
        const ctx = await browser.newContext();
        await ctx.addInitScript(([p, m]) => {
          localStorage.setItem('sk-pal', p);
          localStorage.setItem('sk-mode', m);
        }, [palette, mode]);
        const page = await ctx.newPage();
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('data-palette', palette);
        await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
        await ctx.close();
      });
    }
  }
}
