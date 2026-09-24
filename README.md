# Matias — Pacific / Mineral

An editorial mechanical-engineering portfolio spanning Engineering, Tech and Finance. Built in the existing repository with React, TypeScript, Vite and React Three Fiber. Twelve clearly illustrative project records exercise filtering, a capability map, quick summaries and complete case studies.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`build` performs type checking, creates split client bundles, then pre-renders 17 routes plus a 404 page. Deploy `dist/` to a static host. No backend, database, remote fonts or runtime API keys are required.

## Validate

```sh
npm run lint
npm run check:content # after building
npx playwright install chromium
npm run test:browser # with npm run preview running
```

Browser tests use `TEST_BASE_URL` (default http://localhost:4173). Standard Chromium is used by default; `CHROMIUM_EXECUTABLE_PATH` supports a supplied local browser. See docs/QA.md for the actual checks and limitations from this build.

## Hosting

For a domain root:

```sh
VITE_SITE_URL=https://your-domain.example npm run build
```

For GitHub Pages at `mat-las.github.io/matias-portfolio`:

```sh
VITE_BASE_PATH=/matias-portfolio/ VITE_SITE_URL=https://mat-las.github.io/matias-portfolio npm run build
```

A manual GitHub Pages workflow is included. Set the repository's Pages source to GitHub Actions before running “Deploy portfolio” from the Actions tab. Publication is separate from source commits. The ordinary CI workflow builds, lints, checks route output and saves a dist artifact; it does not deploy.

Static route directories work without SPA rewrites. Configure your host to serve `404.html` for missing paths. Canonical and Open Graph URLs are generated at build time from VITE_SITE_URL; set this to the actual final public address. The default anticipates GitHub Pages and is not a claim of live deployment.

## Maintain

- [Content guide](docs/CONTENT-GUIDE.md): projects, media, actual CV/contact details.
- [Design system](docs/DESIGN-SYSTEM.md): tokens, motion, type and 3D decisions.
- [Asset provenance](docs/ASSETS.md): original artwork, synthetic diagrams and licenses.
- [QA record](docs/QA.md): validation evidence and remaining limits.
- [AGENTS.md](AGENTS.md): reusable project instructions for future coding agents.

All authored source, project content, assets, lockfile and maintenance instructions are tracked in this repository. Dependencies and generated build folders are reproducible and excluded from Git. Third-party agent system instructions are not part of this application.

## CV regeneration

The downloadable preview is committed; ordinary Node builds do not need Python. To regenerate it, install `reportlab`, `fonttools[woff]` and `brotli`, then run `python3 scripts/create-cv.py` after `npm ci`. Replace it with a verified final CV before using this portfolio in applications.
