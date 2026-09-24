# Pacific / Mineral

## Visual thesis

A mechanical engineer's working atlas: physical systems made legible through an editorial hierarchy. Work leads the identity; blue carries the signature. A stepped discipline rail makes engineering visibly larger. Pale drafting surfaces alternate with a deep navy feature and a cobalt closing page. The abstract contours are an original mathematical study, not a map or an imitation of a cultural motif.

## Tokens

| Role      | Value   | Use                                         |
| --------- | ------- | ------------------------------------------- |
| Paper     | #F1F0EB | Reading and navigation                      |
| Ink       | #071626 | Body text and technical feature             |
| Cobalt    | #1947E5 | Identity, headings, active states           |
| Pacific   | #0B5FFF | Focus outline                               |
| Mineral   | #75A7C9 | Technical illustration and support          |
| Limestone | #E9E2D5 | Personal context and finance                |
| Copper    | #A76542 | Mechanical fasteners and sparse annotations |

Typography: Archivo Variable for the main hierarchy, Source Serif 4 italic for selected editorial phrases, IBM Plex Mono for metadata. Only Latin subsets are bundled; add another subset for additional writing systems. All three fonts are open source, self-hosted and licensed under the SIL OFL. No remote font requests.

Scale: body 16–18px; technical metadata 12px minimum; responsive display titles 54–144px; headings 42–90px. Six-column editorial logic, with 22px mobile gutters and fluid desktop gutters. Breakpoints at 380, 760, 1100 and 1700px. Surfaces are square; shape follows function. Borders use one-pixel lines, with a three-pixel active filter edge. Icons are limited to semantic directional arrows and the typographic monogram. Project media uses 3:2 source imagery and bounded responsive crops.

## Motion and 3D

180ms control changes, 650ms reveals, cubic-bezier(.22,1,.36,1). Small masked image zooms and preview rotation create contrast against static reading areas. No custom scroll engine or scroll hijacking. Scroll reveals use IntersectionObserver and are removed for reduced motion.

The engineering object is an illustrative coaxial assembly: perforated annular plates, rotor vanes and fasteners. Separation explains assembly relationships; wireframe reveals construction; rotation works from a keyboard-accessible button. One dynamically imported R3F canvas, render-on-demand, DPR capped at 1.5, a procedurally generated studio environment and no external textures or expensive postprocessing. Pointer tilt requests frames only when relevant. Offscreen/hidden canvases stop rendering. Mobile, reduced motion, data saver and low-memory devices start with a WebP and opt into the inspector. WebGL failure retains the visual fallback.

## Reference research

- https://landonorris.com/ — reference for distinct editorial chapters, object-led collecting and small metadata. No assets, copy or personal-brand treatment reproduced.
- https://fonts.google.com/specimen/Archivo — grotesk direction considered alongside Instrument Sans/Mona Sans.
- https://www.ibm.com/design/language/typography/typeface/ — technical mono direction.
- https://github.com/adobe-fonts/source-serif — restrained editorial counterpoint.
- https://threejs.org/manual/ — rendering, cleanup and responsive drawing considerations.

## Deliberate omissions

No backend: content needs publishing, not transactions. No speculative email form without a receiving service. No invented proficiency scores, testimonials, CV dates or results. The GitHub link is verified; other personal contact fields await real values.
