import { asset } from "../lib/assets";
export type Discipline = "Engineering" | "Tech" | "Finance";
export type Media = {
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
};
export type Project = {
  number: string;
  title: string;
  slug: string;
  year: number;
  discipline: Discipline;
  subcategory: string;
  summary: string;
  featured: boolean;
  placeholder: boolean;
  role: string;
  duration: string;
  team: string;
  tools: string[];
  skills: string[];
  heroMedia: Media;
  gallery: Media[];
  problem: string;
  objective: string;
  constraints: string[];
  approach: string;
  development: string;
  analysis: string;
  results: string;
  metrics: { value: string; label: string }[];
  reflection: string;
  downloads: { label: string; href: string }[];
  externalLinks: { label: string; href: string }[];
  relatedProjects: string[];
};
type Seed = Pick<
  Project,
  | "number"
  | "title"
  | "year"
  | "discipline"
  | "subcategory"
  | "tools"
  | "summary"
  | "slug"
> &
  Partial<Project>;
// Add a named object per project. Override any optional case-study field here.
const seeds: Seed[] = [
  {
    number: "01",
    title: "Formula Student: wheel assembly",
    year: 2025,
    discipline: "Engineering",
    subcategory: "Vehicle dynamics / Mechanical design",
    tools: ["SolidWorks", "FEA", "Mechanical design"],
    summary: "A lighter assembly. A clearer load path.",
    slug: "wheel-assembly",
  },
  {
    number: "02",
    title: "Flow, geometry & optimisation",
    year: 2026,
    discipline: "Engineering",
    subcategory: "Master’s research / CFD",
    tools: ["CFD", "Python", "Research"],
    summary: "Exploring how a change in geometry changes the flow.",
    slug: "flow-optimisation",
  },
  {
    number: "03",
    title: "Structure under pressure",
    year: 2024,
    discipline: "Engineering",
    subcategory: "Structural analysis / FEA",
    tools: ["FEA", "SolidWorks", "Materials"],
    summary: "Connecting a load case to a design decision.",
    slug: "structural-analysis",
  },
  {
    number: "04",
    title: "Heat exchanger study",
    year: 2024,
    discipline: "Engineering",
    subcategory: "Thermodynamics / Simulation",
    tools: ["CFD", "MATLAB", "Thermodynamics"],
    summary: "Balancing heat transfer against pressure loss.",
    slug: "heat-exchanger",
  },
  {
    number: "05",
    title: "Designed to be made",
    year: 2023,
    discipline: "Engineering",
    subcategory: "Manufacturing / DFM",
    tools: ["SolidWorks", "Manufacturing", "Mechanical design"],
    summary: "From a model on screen to a repeatable process.",
    slug: "manufacturing-design",
  },
  {
    number: "06",
    title: "A system in balance",
    year: 2023,
    discipline: "Engineering",
    subcategory: "Control / Mechatronics",
    tools: ["MATLAB", "Control", "Embedded systems"],
    summary: "Measuring, modelling and controlling a physical system.",
    slug: "control-system",
  },
  {
    number: "07",
    title: "From measurements to meaning",
    year: 2025,
    discipline: "Tech",
    subcategory: "Data analysis / Software",
    tools: ["Python", "Data analysis", "Git"],
    summary: "A reproducible path from raw data to useful evidence.",
    slug: "engineering-data",
  },
  {
    number: "08",
    title: "Searching the design space",
    year: 2025,
    discipline: "Tech",
    subcategory: "Machine learning / Optimisation",
    tools: ["Python", "Machine learning", "Research"],
    summary: "Comparing a surrogate model with a numerical baseline.",
    slug: "design-space",
  },
  {
    number: "09",
    title: "The repeatable workflow",
    year: 2024,
    discipline: "Tech",
    subcategory: "Automation / Developer tools",
    tools: ["Python", "Automation", "Git"],
    summary: "Turning a manual process into a traceable pipeline.",
    slug: "automation-tool",
  },
  {
    number: "10",
    title: "A business, by the numbers",
    year: 2025,
    discipline: "Finance",
    subcategory: "Equity valuation / Modelling",
    tools: ["Excel", "Valuation", "Financial modelling"],
    summary: "Making the assumptions behind a valuation visible.",
    slug: "equity-valuation",
  },
  {
    number: "11",
    title: "Signals in the noise",
    year: 2025,
    discipline: "Finance",
    subcategory: "Quantitative research / Markets",
    tools: ["Python", "Markets", "Data analysis"],
    summary: "Testing a market hypothesis against an honest baseline.",
    slug: "market-signals",
  },
  {
    number: "12",
    title: "Risk in perspective",
    year: 2026,
    discipline: "Finance",
    subcategory: "Portfolio analysis / Visualisation",
    tools: ["Python", "Financial modelling", "Data analysis"],
    summary: "Looking beyond a single return figure.",
    slug: "portfolio-risk",
  },
];

export const projects: Project[] = seeds.map((seed) => {
  const {
    number,
    title,
    year,
    discipline,
    subcategory,
    tools,
    summary,
    slug,
    ...overrides
  } = seed;
  return {
    number,
    title,
    slug,
    year,
    discipline,
    subcategory,
    tools,
    skills: tools,
    summary,
    featured: number === "01",
    placeholder: true,
    role:
      discipline === "Engineering"
        ? "Design & analysis (example)"
        : "Research & implementation (example)",
    duration: "12 weeks · illustrative",
    team: "Individual contribution · example",
    heroMedia: {
      src: asset(
        discipline === "Engineering"
          ? "/media/precision-impeller.webp"
          : discipline === "Tech"
            ? "/media/data-study.svg"
            : "/media/risk-study.svg",
      ),
      alt:
        discipline === "Engineering"
          ? "Illustrative silver machined impeller with a cobalt centre; concept artwork, not this project’s CAD."
          : discipline === "Tech"
            ? "Illustrative convergence curves comparing two numerical methods."
            : "Illustrative risk and return plot for example portfolios.",
      caption:
        discipline === "Engineering"
          ? "Concept artwork · representative engineering visual, not a project deliverable."
          : "Synthetic data · demonstrates the future visual format.",
      type: "image",
    },
    gallery: [],
    problem:
      discipline === "Engineering"
        ? "A component must meet competing requirements for performance, reliability and manufacture. This example case study shows how the engineering decisions will be documented."
        : discipline === "Tech"
          ? "A fragmented analysis workflow makes it difficult to reproduce results or inspect assumptions. This example sets out a traceable route from inputs to outputs."
          : "A headline number can conceal the assumptions and uncertainty behind it. This example explores how to make a financial analysis inspectable.",
    objective:
      discipline === "Engineering"
        ? "Define a baseline, compare candidate designs and justify a final concept with a transparent verification process."
        : "Build a reproducible model, compare it with a baseline and communicate the limits of its conclusions.",
    constraints:
      discipline === "Engineering"
        ? [
            "Defined load cases and interface geometry",
            "Material availability and manufacturing access",
            "Time for mesh sensitivity and verification",
          ]
        : [
            "Input data quality and coverage",
            "Reproducibility of assumptions and calculations",
            "A clear boundary between evidence and interpretation",
          ],
    approach:
      discipline === "Engineering"
        ? "Start with the requirements and free-body diagrams. Use a parameterised CAD model to explore the design space, then choose the smallest set of analyses that can answer the design questions."
        : "Record the hypothesis before modelling. Clean and validate the inputs, build a simple baseline, then compare the proposed method using consistent evaluation criteria.",
    development:
      "The finished case study will show intermediate versions, explain why alternatives were rejected and distinguish my own contribution from the wider team’s work. This text is a content placeholder.",
    analysis:
      discipline === "Engineering"
        ? "The analysis section will contain boundary conditions, modelling assumptions, sensitivity checks and validation evidence. Illustrative charts here demonstrate the layout only; they are not simulation results."
        : "The analysis section will expose the model assumptions, evaluation method and uncertainty. The illustrative charts demonstrate the layout only; they are not research or investment results.",
    results:
      "No verified project results have been added yet. Replace this example with the measured outcome, its baseline and any important limitations.",
    metrics: [
      { value: "03", label: "Example design iterations" },
      { value: "02", label: "Example comparison methods" },
      { value: "—", label: "Verified outcome pending" },
    ],
    reflection:
      "The final reflection will explain which choices worked, what failed and what I would change with more time or better evidence. Keeping these limits visible is part of the work.",
    downloads: [],
    externalLinks: [],
    relatedProjects: [],
    ...overrides,
  };
});
export const disciplines: Discipline[] = ["Engineering", "Tech", "Finance"];
export const getProject = (slug?: string) =>
  projects.find((project) => project.slug === slug);
