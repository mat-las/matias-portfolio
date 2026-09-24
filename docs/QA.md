# Validation record

## Verified at source checkpoint

- TypeScript production build passes.
- All 17 public routes and the 404 page emit full static HTML.
- Route validation passes for unique titles, descriptions, canonical and Open Graph metadata, one h1 per page, local media/download/script/style links, placeholder labels and sitemap coverage.
- Oxlint passes.
- Chromium checks completed for mobile navigation, filters, grid switching, search/empty results, quick/full case-study state and chart data.
- Automated axe WCAG 2 A/AA and WCAG 2.1 AA scans returned zero violations on Home, Projects, a project case study, About, Experience and Contact at mobile width.
- Initial desktop/mobile screenshots visually inspected; metadata was enlarged and direction icons changed to SVG after review.
- PDF preview rendered and visually inspected with the project typeface embedded.

## In progress at source checkpoint

Final screenshot review after the last typography/3D refinements; complete browser-suite rerun; GitHub Pages base-path verification; keyboard/3D/fallback checks. Headless Chromium required an alternate bundled executable in this restricted runtime. Some combined runs were interrupted by the headless browser closing, so no unmeasured frame-rate or full-device claim is made.

## Publication limits

All projects remain clearly labelled examples. Replace real project media, outcomes, role descriptions, institution/employment dates, email, LinkedIn and final CV before using the site in applications. The generated impeller and synthetic plots are illustrative only. Hosting workflow is manual and deployment is not assumed.

This file will be updated with the final validation results in the follow-up commit.
