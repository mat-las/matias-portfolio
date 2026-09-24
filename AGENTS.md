# Portfolio development instructions

Read docs/DESIGN-SYSTEM.md and docs/CONTENT-GUIDE.md before changing the site.

- Keep project facts in src/content/projects.ts and personal facts in src/content/profile.ts.
- Preserve explicit placeholder labels until verified content is supplied.
- Use design tokens. Keep geometry, typography and purposeful transitions coherent.
- Never create proficiency percentages or invent achievements/contact details.
- Retain static route output, metadata, accessible keyboard controls, reduced-motion and WebGL fallbacks.
- Keep the assembly in one lazy rendering context and use on-demand frames.
- Before committing: npm run build, npm run lint, npm run check:content, then relevant browser checks.
- Commit source, lockfile, local media, asset provenance and reusable instructions. Never commit credentials, node_modules or dist.
