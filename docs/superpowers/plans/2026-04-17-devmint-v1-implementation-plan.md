# devmint.pl V1 Implementation Plan

- Date: 2026-04-17
- Project: `devmint.pl`
- Based on spec: `docs/superpowers/specs/2026-04-16-devmint-v1-checkpoint.md`
- Status: not ready for execution until visual direction is documented in `DESIGN.md` and confirmed with first-pass visuals

## 1. Objective

Deliver the first real version of `devmint.pl` as a:

- publication-first website,
- Polish-first public experience,
- TanStack Start root app,
- prerender-first deployment on Cloudflare Workers,
- content-led platform with a light advisory layer.

The goal is to ship a coherent V1 that matches the checkpoint exactly, without inheriting outdated Astro assumptions.

## 2. Non-Negotiable Constraints

The implementation plan assumes these decisions are already closed:

- the app is a single root app at repo root,
- the stack is `TanStack Start` + `React` + `Tailwind CSS` + `content-collections` + `giscus`,
- deployment target is Cloudflare Workers,
- public routes should be prerendered from day one,
- routes own data fetching and components stay dumb,
- V1 is fully Polish in practice,
- content starts as Markdown only,
- V1 starts with system fonts,
- section pages stay minimal and text-first,
- the article page structure is fixed,
- there is no Astro restoration path.

Historical carryover from the old site is intentionally narrow:

- reuse the `devMint` logo,
- reuse the historical primary brand colors,
- do not reuse Astro structure, schemas, routes, or component architecture.

## 3. Delivery Strategy

Implementation should happen in this order:

1. define and confirm the visual direction,
2. establish the root app and deployment foundation,
3. establish theme tokens and shell behavior,
4. define the typed content model and publishable-content rules,
5. build the homepage, section pages, and route structure,
6. build the article experience,
7. build trust/advisory pages,
8. harden metadata, feeds, sitemap, and comments,
9. seed real content and verify release quality.

This order preserves momentum because it validates:

- visual direction before implementation,
- architecture before polish,
- shell/navigation before page sprawl,
- content schema before content seeding,
- reading experience before supporting pages,
- discovery/SEO behavior after the route model is stable.

## 4. Scope Guardrails

The implementation should explicitly avoid:

- Astro restoration,
- monorepo or `packages/` restructuring,
- MDX,
- multilingual UI beyond structural support,
- tag pages,
- tag filters,
- pagination,
- search,
- section intros,
- section featured items,
- table of contents,
- generated social cards,
- contact forms,
- page-specific layout shells,
- broad reuse of old implementation details beyond logo and primary palette.

## 5. Work Phases

## Phase 0. Confirm Visual Direction

### Goal

Create a concrete visual direction before implementation starts, so the app is built against a visible, reviewable target rather than abstract adjectives.

### Tasks

- write `DESIGN.md` as the active visual design document for V1,
- translate the current strategic design language into concrete decisions,
- define the intended homepage composition,
- define the intended article-page reading style,
- define the intended shell behavior on desktop and mobile,
- define the initial color usage model using the historical `devMint` primary colors,
- define the initial typography model for V1 using system fonts,
- produce first-pass visuals for the homepage, article page, and shared shell,
- use those visuals to confirm a direction before production implementation,
- keep the first-pass visuals low-cost and disposable if needed.

### Acceptance Criteria

- `DESIGN.md` exists and is specific enough to guide implementation,
- the visual direction is confirmed through first-pass visuals rather than prose alone,
- homepage, article, and shell direction are visible and reviewable,
- the team has a concrete design target before app work begins,
- implementation does not begin until this phase is approved.

## Phase 1. Establish the Root App Foundation

### Goal

Create the new application foundation directly at repo root so the rest of V1 can be built on the intended stack and structure.

### Tasks

- initialize the root app for `TanStack Start`,
- establish the repo-root structure described in the checkpoint,
- add the minimum package/tooling setup needed for local development and production builds,
- configure Tailwind CSS and global stylesheet entry points,
- configure `content-collections`,
- configure Cloudflare Worker deployment for production and preview,
- ensure prerender-first behavior is supported from the beginning,
- restore the logo asset from historical brand materials.

### Acceptance Criteria

- the site runs locally from repo root,
- the site builds successfully,
- the repo shape matches the checkpoint rather than the old monorepo layout,
- preview and production deployment paths are clear,
- the app is ready for route and content work.

## Phase 2. Define the Theme System and Shared Shell

### Goal

Create the shared visual foundation used by every page.

### Tasks

- define semantic design tokens in CSS variables,
- support light and dark themes based on system preference only,
- carry forward the historical `devMint` primary colors as the accent baseline,
- define the neutral scale around those primary colors,
- implement system-font typography as the V1 baseline,
- define spacing, container widths, and shell proportions for desktop and mobile,
- implement the shared header,
- implement the shared footer,
- implement the mobile bottom bar behavior described in the checkpoint,
- choose and apply the mobile bottom-bar icon set,
- keep the shell flexible enough for later design-system extraction without introducing one now.

### Acceptance Criteria

- all pages can share one shell,
- light/dark themes are centralized and token-driven,
- the historical brand identity is visible through logo and primary accents,
- typography starts from system fonts rather than custom font work,
- navigation behavior matches the checkpoint on desktop and mobile,
- shell proportions are intentional rather than ad hoc.

## Phase 3. Define the Typed Content Model

### Goal

Create a strict content system that supports V1 requirements without legacy Astro assumptions.

### Tasks

- create the `posts` content collection under `content/posts/pl` and `content/posts/en`,
- define the exact frontmatter field names for V1,
- make the schema strict, typed, and fail-fast,
- model one primary `section` per article,
- include `tags` in schema without building tag UI,
- include typed `socialLinks`,
- include typed `readNext` using internal slugs only,
- include optional `translationOf`,
- require `coverImage`,
- allow empty `coverImageAlt`,
- support calendar-date publishing,
- implement publishable-content filtering so future-dated articles are excluded from listings, feeds, and sitemap.

### Acceptance Criteria

- content validation fails fast on invalid data,
- the schema reflects the checkpoint rather than the old Astro model,
- route loaders can query content by language, section, and publishable status,
- future English support is structurally possible without affecting Polish-first V1.

## Phase 4. Build Core Routes and Listing Pages

### Goal

Implement the main public route structure and the shared listing behavior.

### Tasks

- build `/`,
- build `/engineering`,
- build `/management`,
- build `/o-devmint`,
- build `/wspolpraca`,
- add redirect from `/o-mnie` to `/o-devmint`,
- implement Polish article routes as `/posty/<slug>`,
- reserve future English article routes as `/posts/<slug>`,
- use route loaders as the default fetching pattern across all route types,
- implement homepage composition as one positioning sentence, one short supporting paragraph, one curated featured article, and four recent articles,
- ensure the homepage recent list is automatic, date-based, and excludes the featured article,
- ensure the homepage featured article shows cover image and title, with optional intro behavior matching the checkpoint,
- implement section pages with no hero, no featured article, no introductory copy, no filtering, and no pagination,
- build one shared text-first listing component,
- ensure section listings are date-ordered and titles-only, with no dates, images, or tags,
- reuse that listing component for homepage recent items and both section pages,
- implement homepage featured-article curation in route/component logic rather than frontmatter.

### Acceptance Criteria

- the approved route map works end to end,
- section pages remain intentionally minimal with the exact omissions required by the checkpoint,
- homepage shows one curated featured article and four recent articles with the required featured/recent split,
- listing behavior is consistent across homepage and sections,
- no page relies on content-driven layout controls.

## Phase 5. Build the Article Experience

### Goal

Implement the strongest user-facing part of V1: a disciplined, readable article page.

### Tasks

- implement the fixed article structure from the checkpoint,
- render title, intro, cover image, metadata areas, content, comments, and `Czytaj dalej` in the required order,
- implement explicit metadata components with publication date and optional social links,
- support syntax-highlighted fenced code blocks,
- omit autogenerated table of contents,
- reuse the cover image for article display, homepage featured card, and OG imagery,
- implement `readNext` rendering only when data exists,
- let the component decide how many `readNext` items to show,
- integrate `giscus` from day one,
- highlight the article section in top nav and mobile nav.

### Acceptance Criteria

- article pages follow one fixed structure,
- reading width and typography feel intentional,
- comments always render with visual separation only,
- `readNext` is manual and data-driven,
- article navigation state reflects section membership.

## Phase 6. Build Trust and Advisory Pages

### Goal

Add the supporting pages that explain the platform and create a soft path to contact.

### Tasks

- write and implement homepage positioning copy,
- write and implement `/o-devmint`,
- write and implement `/wspolpraca`,
- make the relationship between `devMint` and `Grzegorz Gajda` explicit,
- keep the tone calm and specific,
- use email CTA only on `/wspolpraca`,
- avoid turning either page into a corporate brochure, raw contact page, or inflated offer page.

### Acceptance Criteria

- visitors can understand what `devMint` is,
- visitors can understand who is behind it,
- the advisory path is present without dominating the publication-first positioning,
- the homepage and trust pages use copy that matches the checkpoint tone.

## Phase 7. Harden Metadata, Feeds, Sitemap, and Comments

### Goal

Turn the finished pages into a public website with intentional discovery behavior.

### Tasks

- centralize page metadata generation,
- implement canonicals,
- implement page titles and descriptions,
- implement Open Graph metadata,
- implement article structured data,
- generate one sitemap,
- generate RSS feed,
- generate Atom feed,
- decide the exact feed route names,
- ensure feeds and sitemap follow publishable-content rules,
- finalize the exact `giscus` repository and discussion mapping,
- wire comments configuration into the live app.

### Acceptance Criteria

- public pages emit correct metadata,
- article pages emit intentional structured data,
- sitemap and feeds exclude future-dated content,
- comments work against the chosen GitHub Discussions target,
- discovery behavior is consistent with listing behavior.

## Phase 8. Seed Content and Verify Release Quality

### Goal

Make V1 credible as a live site rather than a shell.

### Tasks

- seed enough Polish content to populate homepage and both main sections,
- ensure the featured article path is populated with a real post,
- verify that recent content excludes the featured article,
- verify section assignment across content,
- verify light/dark theme behavior,
- verify responsive behavior on mobile, tablet, and desktop,
- verify keyboard access and focus states,
- verify code block rendering,
- verify comments loading,
- verify preview and production deployment behavior.

### Acceptance Criteria

- the homepage and sections feel populated by real editorial content,
- both main sections contain credible examples,
- the site is responsive and accessible at a solid V1 baseline,
- preview and production deployments are operational,
- V1 is shippable without hidden architecture debt from the old stack.

## 6. Decision Gates

The remaining open questions should be handled as explicit decisions, not left implicit during implementation.

Before or during Phase 2:

- final neutral scales for light/dark themes,
- exact desktop/mobile shell proportions,
- exact article/image ratios,
- icon set for the mobile bottom bar.

Before or during Phase 3:

- exact frontmatter schema naming.

Before or during Phase 6:

- exact homepage positioning sentence and paragraph,
- exact copy for `/o-devmint`,
- exact copy for `/wspolpraca`.

Before or during Phase 7:

- exact feed route names,
- exact `giscus` repository/discussion mapping.

These decisions should not block Phase 0. They only need to be closed before the dependent work is finalized.

## 7. Recommended Next Step

Do not start app implementation yet.

The next step is Phase 0:

1. write `DESIGN.md`,
2. produce first-pass visuals for homepage, article page, and shell,
3. confirm the direction,
4. only then begin Phase 1 implementation work.
