# Maintaining the portfolio

## Personal information

Edit `src/content/profile.ts`. Name, short biography, heritage paragraph, contact links, timeline and PDF path live together. An empty email or LinkedIn field renders an honest pending state. Add the real address/URL to activate it. Replace `public/downloads/matias-cv-preview.pdf` with a verified CV, change the filename in profile, and update “CV preview” labels in Footer, Contact and Experience.

## Projects

Edit the named objects in `src/content/projects.ts`. One object creates the archive entry, category count, capability connections, route and full case study. The current object factory supplies explicitly illustrative defaults to keep sample projects concise. Every optional field can be overridden on the project object. Replace the defaults or override all relevant fields before setting `placeholder: false`.

Required keys: number, title, slug, year, discipline, subcategory, tools, summary. Discipline is Engineering, Tech or Finance. Slugs must be unique and URL-safe.

Optional fields: featured, placeholder, role, duration, team, skills, heroMedia, gallery, problem, objective, constraints, approach, development, analysis, results, metrics, reflection, downloads, externalLinks, relatedProjects.

Example addition:

```ts
{
  number: '13',
  slug: 'verified-project-slug',
  title: 'A descriptive project title',
  year: 2026,
  discipline: 'Engineering',
  subcategory: 'CFD / Research',
  tools: ['Python', 'CFD'],
  skills: ['Python', 'CFD', 'Research'],
  summary: 'One specific result, with its scope.',
  placeholder: false,
  role: 'Describe only your own contribution.',
  duration: 'Verified duration',
  team: 'Team size and responsibility split',
  heroMedia: {
    src: asset('/media/your-render.webp'),
    type: 'image',
    alt: 'Describe the engineering information visible in the render.',
    caption: 'What is being shown, including conditions and units.',
  },
  problem: 'The original question.',
  objective: 'The acceptance criteria.',
  constraints: ['Material or data limitations'],
  approach: 'The method and why it suited the question.',
  development: 'Iterations and the decisions behind them.',
  analysis: 'Assumptions, checks, validation and limitations.',
  results: 'The measured result against its baseline.',
  metrics: [{ value: 'Replace', label: 'Verified result with units' }],
  reflection: 'What worked and what you would improve.',
  downloads: [{ label: 'Technical report', href: asset('/downloads/report.pdf') }],
  externalLinks: [{ label: 'Source code', href: 'https://github.com/owner/repo' }],
}
```

Use `asset()` for local files to preserve GitHub Pages subdirectory support. Keep images in public/media and downloads in public/downloads. `gallery` supports image and video; videos use native controls and metadata preloading. Add subtitles/transcripts for meaningful speech. Downloads and external links render only when supplied.

The hero feature retains its editorial composition and automatically selects the first project with `featured: true`. The archive and case studies require no component duplication. Capability links are derived from each project's `skills`. A project with fewer artefacts can leave gallery/downloads empty. The same reading template supports quick assignments and longer research with optional galleries and downloads.

Run `npm run build` after content changes: all case-study HTML, sitemap and metadata are regenerated. Run `npm run check:content` to check the produced routes and local asset links.

## Publication honesty

The initial 12 projects are sample entries, not claims about Matias's actual experience. Dates, outcomes, charts and project roles marked illustrative must be replaced from source material. Generated impeller artwork is not engineering evidence. The synthetic convergence/risk diagrams are layout examples, not real CFD/FEA or market data.
