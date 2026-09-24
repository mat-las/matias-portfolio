import { asset } from "../lib/assets";
export const profile = {
  name: "Matias",
  qualification: "Master’s graduate · Mechanical Engineering",
  introduction:
    "I work where physical systems, computational tools and analytical thinking meet.",
  biography:
    "Mechanical engineering is my foundation. It taught me to move between the details of a component and the behaviour of the whole system. I carry that way of thinking into technology and finance: build a model, question the assumptions, make the result understandable.",
  heritage:
    "With Peruvian heritage, I am drawn to the meeting of landscape and structure: layers, contours and the quiet logic of things built to last.",
  email: "",
  linkedin: "",
  github: "https://github.com/mat-las",
  cv: asset("/downloads/matias-cv-preview.pdf"),
  timeline: [
    {
      date: "Foundation",
      title: "Mechanical Engineering",
      type: "University",
      description:
        "Design, mechanics, thermodynamics and numerical analysis. Institution and dates to be added.",
    },
    {
      date: "Postgraduate",
      title: "Master’s graduate",
      type: "Education",
      description:
        "Deeper technical work, research and communicating engineering evidence. Degree details to be added.",
    },
    {
      date: "Selected work",
      title: "From physical systems to data",
      type: "Project archive",
      description:
        "Space for verified projects, competitions and experience. Entries will link to the work itself.",
    },
    {
      date: "Next chapter",
      title: "Engineering × technology × finance",
      type: "Direction",
      description:
        "Interested in work that combines technical depth with practical decisions.",
    },
  ],
};
