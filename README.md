# sathishkumar5115.github.io

Portfolio and blog. Astro, strict TypeScript, plain CSS. Spec and plan live in the owner's notes; design of record is the signed-off canvas.

```
npm ci
npm run dev        # local site
npm run check      # types and content
npm test           # unit tests (includes colour contrast for both palettes and modes)
npm run test:e2e   # Playwright (builds and previews first)
```

The live site stays the placeholder (`index.html` at the repo root, served by the legacy Pages source) until the launch pull request switches Pages to GitHub Actions.

Default palette: `defaultPalette` in `src/config.ts`. Preview the other one on your own device with `?palette=indigo`; `?palette=reset` clears it.
