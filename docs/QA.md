# Validation record

## Verified on 7 October 2026

- TypeScript production build, Oxlint and static content checks pass.
- All 17 public routes plus the 404 page emit complete static HTML with unique metadata, one h1, valid local assets/downloads and sitemap coverage.
- GitHub Pages subdirectory links and assets verified across all 18 pages.
- Desktop Chromium verified wireframe switching, rendered assembly rotation and keyboard separation control.
- Capability selection, mobile navigation, category filters, list/grid switching, search and empty state pass.
- Quick/full case-study views, chart controls and the accessible data table pass.
- Home has no horizontal overflow at 1440, 1024, 768, 390 and 320px. Six primary page types were also checked at mobile width.
- Reduced-motion fallback and keyboard focus pass. Case-study reading content works with JavaScript disabled.
- Forced WebGL unavailability retains the static image and navigation; no browser page errors remain.
- Desktop and mobile home, archive and case-study screenshots visually inspected. PDF preview also rendered and inspected.

## Accessibility and CI

GitHub Actions [run 37592068855](https://github.com/mat-las/matias-portfolio/actions/runs/37592068855) passed all checks on application commit `181ae07252f41f7a30945f7214757d0098221e7f`. Automated axe WCAG 2 A/AA and WCAG 2.1 AA scans returned zero violations on Home, Projects, a case study, About, Experience and Contact. Screenshots, machine-readable results and the static build are attached to that run. Earlier CI revealed a WebGL initialization gap and low-contrast copper step numbers. Both were corrected; the tests retain regression coverage. Automated checks are not a substitute for a full manual assistive-technology audit.

## Performance scope

One lazy, render-on-demand R3F scene, capped DPR, offscreen/hidden suspension and opt-in mobile rendering are implemented. The temporary WebGL capability probe is released before the scene mounts. Fonts and responsive WebP assets are local. No sustained frame-rate, physical-device or Core Web Vitals claim is made; these need measurement on the deployed site and representative hardware.

## Publication limits

All 12 projects remain clearly labelled examples. Replace project media, outcomes, role descriptions, institution/employment dates, email, LinkedIn and the CV preview before using the site in applications. The impeller and synthetic plots are illustrative. The GitHub Pages deployment workflow is manual; this source delivery does not publish the site.
