# sathishkumar5115.github.io

Personal portfolio and blog, live at <https://sathishkumar5115.github.io>.

Built spec-first: the PRD, tech spec and milestone plan live in the owner's workspace (`portfolio/docs/`). Each milestone lands as a pull request that must pass CI and owner review.

## Requirements
- Node 22 (see `.nvmrc`; at least 22.19)

## Commands
| Command | What it does |
|---|---|
| `npm ci` | Install exact dependency versions from the lockfile |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run check` | Type-check `.astro` and `.ts` files (strictest settings) |
| `npm run check:pinned` | Fail if any dependency uses a version range |
| `npm run build` | Build the static site into `dist/` |
| `npm run ci` | Everything CI runs, in order |

## Deploy
Every push to `main` runs `.github/workflows/site.yml`: checks, build, then deploy to GitHub Pages. Pull requests run the checks and build only.

## Dependencies
Versions are pinned exactly (`.npmrc` has `save-exact=true`). Dependabot opens weekly update PRs; nothing merges without review.
