# sathishkumar5115.github.io

Portfolio and blog. Astro, strict TypeScript, plain CSS. Spec and plan live in the owner's notes; design of record is the signed-off canvas.

```
npm ci
npm run dev        # local site
npm run check      # types and content
npm test           # unit tests (includes colour contrast for both palettes and modes)
npm run test:e2e   # Playwright (builds and previews first)
```

Deployed to GitHub Pages by GitHub Actions on every push to `main`, after all checks pass; a smoke run of the e2e suite then checks the live URL. Analytics (GoatCounter, cookie-free) is added to the deployed build only.

Default palette: `defaultPalette` in `src/config.ts`. Palettes: `ink`, `teal`, `indigo`, `forest`. Preview one on your own device with `?palette=<name>`; `?palette=reset` clears it.
