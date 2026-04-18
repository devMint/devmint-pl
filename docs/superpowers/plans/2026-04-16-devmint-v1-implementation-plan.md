# devmint.pl V1 Implementation Plan

- Date: 2026-04-16
- Project: `devmint.pl`
- Based on spec: `docs/superpowers/specs/2026-04-15-devmint-platform-design.md`
- Status: Ready for execution

## 1. Objective

Deliver the first real version of `devmint.pl` as a:

- publication-first website,
- with a light advisory layer,
- content-first homepage,
- `Engineering` and `Management` thematic structure,
- strong article reading experience,
- responsive, accessible, and SEO-aware foundations.

This plan is optimized for shipping a coherent V1, not for building every future idea now.

## 2. Delivery Strategy

Implementation should happen in this order:

1. establish the platform skeleton and content model,
2. establish the visual foundation and layout system,
3. build the homepage and section pages,
4. build the article experience and discovery features,
5. build trust/supporting pages,
6. harden responsiveness, accessibility, and SEO,
7. seed the site with enough real content to make the structure credible.

This order reduces risk because it validates:

- the architecture before polish,
- the design system before page sprawl,
- the content model before metadata complexity,
- the reading experience before nonessential extras.

## 3. Scope Guardrails

The implementation should preserve these constraints:

- do not build courses, accounts, dashboards, or community features,
- do not overengineer multilingual support,
- do not lock the platform into a fixed topic such as AI adoption,
- do not build a large tag taxonomy before real content requires it,
- do not over-package consulting offers on the site.

## 4. Work Phases

## Phase 1. Re-establish the App Foundation

### Goal

Create the technical base for the new site so future work happens on a clean structure.

### Tasks

- decide whether to restore the previous Astro package as the base or rebuild the website package from scratch,
- restore the minimum project files needed for local development and deployment,
- establish the current workspace structure for the site package,
- restore linting/formatting/build setup only as far as needed for V1 work,
- ensure the project can run locally and produce a build.

### Acceptance Criteria

- the project has a working site package again,
- the site can run locally,
- the site can build successfully,
- the structure is clean enough to support the new IA and content model.

### Notes

Because the current branch was intentionally cleared, this phase should be pragmatic. Reuse prior infrastructure where it still helps, but do not drag old assumptions forward if they conflict with the new platform direction.

## Phase 2. Define the Core Design System

### Goal

Create the reusable visual and layout primitives for the new site.

### Tasks

- carry forward the `devMint` brand palette from the historical theme,
- define the neutral/background/text scale around `--color-primary` and `--color-secondary`,
- define typography rules:
  - sans-serif for interface, headings, metadata, and navigation,
  - serif for article body copy,
- define spacing, widths, borders, and interaction states,
- define responsive layout rules for:
  - header/navigation,
  - content containers,
  - article width,
  - section/page spacing,
- define accessible focus states and contrast-safe usage of the brand colors.

### Acceptance Criteria

- shared design tokens/styles exist,
- layout primitives are reusable across pages,
- mobile and desktop behavior are intentionally designed,
- brand colors feel authentic to the logo rather than generic.

## Phase 3. Build the Global Layout and Navigation

### Goal

Implement the global shell that every page depends on.

### Tasks

- create the shared page layout,
- implement the site header with:
  - `devMint` brand presence,
  - theme-consistent navigation,
  - quieter `Grzegorz Gajda` presence where appropriate,
- implement the site footer,
- establish page container patterns,
- wire up shared metadata handling in the head/layout layer,
- ensure the shell works well on mobile and desktop.

### Acceptance Criteria

- all top-level pages can share the same shell,
- navigation reflects the approved IA,
- the shell is responsive and keyboard-friendly,
- base SEO metadata can be emitted centrally.

## Phase 4. Implement the Content Model

### Goal

Model content so it supports current needs and future evolution without overbuilding.

### Tasks

- define the post/content schema with fields for:
  - title,
  - description,
  - date,
  - language,
  - section,
  - tags,
  - featured flag,
  - optional future media hooks,
- decide how `Engineering` vs `Management` is represented in content,
- define featured-content handling for the homepage,
- keep tag support in the model without forcing a complete taxonomy,
- keep language support ready for `Polish first, English later`.

### Acceptance Criteria

- content items can be classified by section,
- tags exist in the model,
- homepage can query featured and recent content,
- future bilingual growth is not blocked.

## Phase 5. Build the Homepage

### Goal

Ship the approved content-first homepage.

### Tasks

- implement a compact top area with brand and navigation,
- add a short positioning cue,
- place one featured article or featured piece high on the page,
- show recent content immediately,
- provide clear entry points into `Engineering` and `Management`,
- keep `About` and `Work With Me` available but visually quieter,
- avoid turning the page into a chronological dump or a manifesto.

### Acceptance Criteria

- a new visitor can understand the site quickly,
- the homepage leads with thinking rather than biography or services,
- the page feels minimal and technically professional,
- the content hierarchy is clear on mobile and desktop.

## Phase 6. Build Section Pages

### Goal

Turn `Engineering` and `Management` into meaningful destinations rather than filter pages.

### Tasks

- create `/engineering`,
- create `/management`,
- add a short thematic introduction for each section,
- list relevant articles within each section,
- support tag display or lightweight filtering if appropriate for V1,
- make the sections feel editorially distinct but visually consistent.

### Acceptance Criteria

- both sections are first-class pages,
- visitors can quickly understand what belongs in each section,
- content lists are easy to scan and navigate.

## Phase 7. Build the Article Experience

### Goal

Implement the strongest user-facing part of the platform: article reading.

### Tasks

- implement article page templates using the hybrid technical reading model,
- use sans-serif for structure and serif for body text,
- enforce a calm reading width and spacing system,
- render tags clearly but simply,
- support article metadata display,
- add `read next` / related-content behavior,
- integrate or prepare comments/discussion,
- leave extension points for future article-adjacent media such as podcast/audio blocks.

### Acceptance Criteria

- article pages feel comfortable for long reading,
- the structure is clean and technically credible,
- metadata and tags are visible but not noisy,
- related content and discussion fit the page without distracting from the article.

## Phase 8. Build Supporting Trust Pages

### Goal

Add the pages that explain the person and create a soft contact path.

### Tasks

- implement `About`,
- implement `Work With Me`,
- write calm, honest framing for both pages,
- avoid inflated consultancy language,
- make the relationship between `devMint` and `Grzegorz Gajda` explicit.

### Acceptance Criteria

- the platform has a clear human identity,
- visitors can understand who is behind the platform,
- there is a path to contact without hard-selling.

## Phase 9. SEO, Accessibility, and Metadata Hardening

### Goal

Turn V1 into a solid public website rather than just a visually finished one.

### Tasks

- centralize page metadata generation,
- implement canonical URLs,
- implement page titles and descriptions,
- implement Open Graph and social metadata,
- generate sitemap and RSS,
- implement structured data for article pages,
- review heading structure and semantic HTML,
- verify keyboard navigation and focus states,
- verify color contrast and readable typography,
- ensure internal linking supports content discovery.

### Acceptance Criteria

- core pages emit correct metadata,
- article pages emit structured data intentionally,
- accessibility basics are built into the pages,
- the site is indexable and shareable.

## Phase 10. Seed Initial Content

### Goal

Make the site look real enough to validate the structure.

### Tasks

- prepare at least one strong featured article,
- prepare enough additional content to populate homepage and both main sections,
- assign the first real tags only when content genuinely needs them,
- ensure content quality is high enough that the platform does not look empty or fake.

### Acceptance Criteria

- homepage and section pages are populated credibly,
- tags emerge from actual content,
- V1 can be evaluated as a living site, not only as a UI shell.

## 5. Suggested Execution Order

The practical implementation order should be:

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 5
6. Phase 6
7. Phase 7
8. Phase 8
9. Phase 9
10. Phase 10

If something must be trimmed for speed, trim in this order:

- advanced related-content logic,
- comment integration polish,
- future media attachment scaffolding,
- section-page enhancements,
- homepage refinements.

Do not trim:

- content model quality,
- article reading quality,
- responsive behavior,
- accessibility fundamentals,
- base SEO architecture.

## 6. Risks During Implementation

### Risk 1. Rebuilding the old site too literally

The old site contains useful ingredients, but it should not dictate the new structure.

Mitigation:

- reuse palette, useful components, and proven ideas,
- reject old structures that conflict with the approved platform direction.

### Risk 2. Overdesigning before real content exists

It is easy to overbuild tags, sections, or homepage modules before content pressure is real.

Mitigation:

- let content validate structure,
- keep the taxonomy small,
- prioritize flexible composition over exhaustive systems.

### Risk 3. Making the site too generic

Minimal and modern can easily collapse into generic SaaS styling.

Mitigation:

- preserve the devMint palette,
- keep the article experience distinct,
- keep the homepage content-first rather than marketing-first.

### Risk 4. Letting SEO or a11y become cleanup work

If these are deferred, they will be harder and more expensive to fix later.

Mitigation:

- treat metadata, semantics, contrast, and keyboard behavior as build-time requirements.

## 7. Definition of Done for V1

V1 is done when:

- the site is live as a coherent public website,
- homepage, section pages, article pages, About, and Work With Me all exist,
- the visual system matches the approved design direction,
- the reading experience is strong on desktop and mobile,
- the site is accessible at a solid baseline,
- the site has deliberate SEO fundamentals,
- enough real content exists to make the platform credible,
- the platform feels like the beginning of `devMint`, not a placeholder.

## 8. Recommended Immediate Next Step

Start with `Phase 1` and make one concrete implementation decision:

`reuse the previous Astro site foundation where it still helps, but rebuild the information architecture and page composition around the approved spec`

That is the highest-leverage starting point because it preserves useful prior work without letting the old project shape the new product by accident.
