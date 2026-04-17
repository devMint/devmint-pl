# devmint.pl V1 Checkpoint

- Date: 2026-04-16
- Project: `devmint.pl`
- Status: checkpoint after design review and scope narrowing
- Purpose: capture the current agreed direction before rewriting the implementation plan
- Supersedes in practice:
  - `docs/superpowers/specs/2026-04-15-devmint-platform-design.md`
  - `docs/superpowers/plans/2026-04-16-devmint-v1-implementation-plan.md`
  only where this checkpoint makes more specific or newer decisions

## 1. Why This Checkpoint Exists

The original platform spec is still strategically correct:

- publication-first,
- trust-first,
- thematic top-level IA,
- strong article reading experience,
- light advisory layer.

However, the original implementation plan assumed an Astro-based restoration path.
That is no longer valid.

This checkpoint records the newer implementation and product decisions:

- Astro is no longer the foundation,
- the repo will be a single root app,
- the stack is now TanStack Start + React + Tailwind CSS,
- content and routing rules have been narrowed,
- V1 has been cut to a smaller and more precise shape.

## 2. Technical Foundation

### 2.1 Platform Stack

V1 should use:

- `TanStack Start`
- `React`
- `Tailwind CSS`
- `content-collections` for typed local content
- `giscus` for comments
- `Cloudflare Workers` for deployment

The site should be deployed as a Worker, but the public pages should be prerendered from the beginning.

### 2.2 Deployment Model

The deployment model is:

- `production` on `https://devmint.pl`
- `preview` on Cloudflare preview URLs
- no dedicated staging environment

Implications:

- production is the only canonical origin,
- preview URLs are non-canonical,
- the site remains prerender-first,
- future server capability remains available because the runtime is still a Worker.

### 2.3 Repository Shape

The repository should be a single app at repo root.

There should be no `packages/` structure in V1.

The intended project shape is:

```text
src/
  assets/
  components/
  routes/
  app.css
content/
  posts/
    pl/
    en/
public/
content-collections.ts
```

Notes:

- `src/components` is for dumb components only,
- `src/routes` owns routing and data fetching,
- `content/` lives at repo root,
- there is no `lib/` or `utils/` directory by default,
- support files should only be added when they are actually needed.

### 2.4 Routing and Data Flow

V1 should use:

- TanStack Start file-based routing,
- route loaders as the default data-fetching mechanism,
- the same route-loader pattern across homepage, section pages, trust pages, and article pages.

Rules:

- only routes fetch data,
- components receive typed props,
- components stay dumb,
- homepage curation decisions live in routes/components, not content frontmatter.

## 3. Styling and UI Architecture

### 3.1 Component Boundary

The app should not use `react-aria-components` directly throughout the codebase.

Instead:

- app code imports local components from `src/components`,
- those components may wrap `react-aria-components` internally,
- this acts as an anti-corruption layer,
- it keeps the future path open for a later `@devmint/design-system`.

### 3.2 Theme System

V1 should support both:

- light theme,
- dark theme.

Theme behavior:

- based on system preference only,
- no user theme toggle in V1.

Styling rules:

- semantic colors should be defined centrally in CSS variables,
- light and dark values should be defined in `app.css` / root CSS,
- Tailwind should point to CSS variables,
- components should not use `dark:`-style inline overrides as the primary strategy.

### 3.3 Typography

V1 should start with system fonts.

Custom fonts may be revisited later.

### 3.4 Visual Direction

The exact visual system is not locked yet.

What is already decided:

- keep the implementation flexible,
- do not overbuild page-specific layout variations,
- use one shared shell everywhere,
- keep listings text-first,
- use imagery only where it materially helps.

Open visual work remains:

- whether to carry forward the historical devMint teal/green accent palette,
- the final neutral scales for light/dark themes,
- exact article/image ratios,
- iconography for mobile navigation.

## 4. Information Architecture and Routes

### 4.1 Primary Navigation

The top navigation order is:

- `Home`
- `Engineering`
- `Management`
- `O nas`
- `Współpraca`

Resolved routes:

- `/`
- `/engineering`
- `/management`
- `/o-devmint`
- `/wspolpraca`

Additional route:

- `/o-mnie` should redirect to `/o-devmint`

### 4.2 Language and Route Strategy

V1 is fully Polish in practice:

- all UI copy should be Polish,
- all seeded content should be Polish,
- English support is structural only for now.

Article route strategy:

- Polish articles: `/posty/<slug>`
- future English articles: `/posts/<slug>`

Section routes remain English intentionally:

- `/engineering`
- `/management`

Rationale:

- those terms are already natural in Polish tech/business language,
- article URLs should stay short and stable,
- section should not be encoded into article paths,
- Google SEO guidance favors simple stable URLs over taxonomy-heavy paths.

### 4.3 Section Pages

Section pages are intentionally minimal in V1.

They should include:

- no hero,
- no featured article,
- no introductory copy yet,
- no filtering,
- no pagination,
- one text-first list of all published articles in that section,
- ordered by date.

The same listing component should be reused for:

- homepage recent list,
- `/engineering`,
- `/management`.

Listings are:

- titles only,
- no dates,
- no images,
- no tags.

## 5. Homepage

The homepage should include:

- one positioning sentence,
- one short supporting paragraph,
- one featured article,
- four recent articles.

Homepage rules:

- featured article is curated in the route/component layer,
- recent list is automatic and date-based,
- recent list excludes the featured article,
- featured article should show cover image and title,
- featured article may optionally show intro,
- featured intro should fall back to the article intro,
- if the featured component receives `altDescription=""`, it should render no intro.

## 6. Content System

### 6.1 General Shape

V1 should start with one main content type:

- articles (`posts`)

Other future content types may exist later, but V1 should not build UI or route structure for them yet.

Markdown is enough for V1.

Do not introduce MDX yet.

If a future article needs custom interactive layout, it can become a route-level custom page instead of forcing MDX into the whole system immediately.

### 6.2 Storage Layout

Articles should live in:

- `content/posts/pl/...`
- `content/posts/en/...`

This is one collection with language-separated directories.

### 6.3 Frontmatter Rules

The content model must be:

- strict,
- typed,
- fail-fast on invalid fields,
- no `any`.

Current article frontmatter direction:

- `title` required
- `intro` required
- `slug` required
- `date` required, calendar date only
- `section` required, one primary section only
- `coverImage` required
- `coverImageAlt` allowed to be empty for decorative/editorial imagery
- `tags` present in schema from day one
- `socialLinks` optional, strict typed array
- `readNext` optional, strict typed array of internal slugs only
- `translationOf` optional for translated articles

What should *not* be in frontmatter in V1:

- author,
- homepage featured placement,
- draft flag,
- arbitrary page-layout controls.

### 6.4 Publishing Model

Publishing is git/deploy based.

There is no `draft` field.

Preview environments are used for pre-publication inspection.

Production listing behavior:

- articles with a future date should not appear in homepage/section listings,
- they should not appear in feeds,
- they should not appear in sitemap,
- they may still exist as direct routes if the exact URL is known.

This is an editorial listing rule, not a true embargo system.

### 6.5 Translations

V1 does not expose a language switcher.

Future translation linking should use:

- `translationOf`

Example:

- Polish article has its own normal slug,
- English article has its own normal slug,
- English article may point back to the Polish slug via `translationOf`.

If an English version exists later, the Polish article may show a small note under the headline such as:

`Ten artykuł jest dostępny także po angielsku.`

That is future-facing and not required in V1 UI.

### 6.6 Tags

Tags should exist in the schema from day one.

But in V1:

- no tag pages,
- no tag filters,
- no tag chips required in the UI,
- no tag-based discovery features yet.

## 7. Article Page

### 7.1 Fixed Article Structure

The article page structure is fixed:

1. Title
2. Intro
3. Cover image
4. First metadata area
5. Content
6. Second metadata area
7. Comments
8. `Czytaj dalej`

This structure should not be rearranged per article.

Customization should happen only through typed content fields that turn specific slots on/off.

### 7.2 Metadata Areas

The first metadata area should show:

- publication date,
- optional social links

The second metadata area should show:

- optional social links

Component names should be explicit.

Do not use internal component names like `Meta1`.

### 7.3 Social Links

V1 should support social links as article metadata.

Initial platform support:

- start with `x`

The workflow is:

1. publish article,
2. publish social post manually,
3. copy the social URL into frontmatter,
4. republish.

The schema should still be expandable for future platforms like:

- LinkedIn,
- Hacker News,
- Facebook,
- X.

### 7.4 Comments

V1 must include comments via `giscus`.

Rules:

- comments always render,
- no extra local heading is required,
- use visual separation only.

The exact GitHub repo/discussions target is still open, but the page integration should exist from day one.

### 7.5 Read Next

`readNext` should:

- use internal slugs only,
- allow an unbounded list in frontmatter,
- let the component decide how many items to render,
- render only when data exists,
- use the visible Polish heading `Czytaj dalej`.

There is no auto-related-content logic required in V1.

Manual frontmatter is enough.

### 7.6 Cover Images

Every article should have a cover image.

The image is primarily:

- decorative,
- editorial,
- brand/attention-supporting,

not semantically essential in most cases.

Therefore:

- `coverImage` is required,
- `coverImageAlt` may be empty.

V1 should reuse the article cover image for:

- article page cover,
- homepage featured article,
- OG/social preview imagery.

Separate social-card generation is deferred.

### 7.7 Article Reading Features

V1 should support:

- syntax-highlighted fenced code blocks

V1 should not include:

- autogenerated table of contents

## 8. Navigation Behavior

### 8.1 Shared Header

Use the same header on every page.

Do not create a special article shell yet.

### 8.2 Active State

On article pages:

- `Engineering` or `Management` should be highlighted in the navigation based on the article section,
- the same should apply to the mobile bottom bar,
- no breadcrumbs are needed.

### 8.3 Mobile Navigation

Navigation behavior:

- when the browser is at the top, all devices show logo + full text navigation,
- after leaving the top, desktop and tablet get no persistent replacement nav in V1,
- mobile gets a bottom bar.

Mobile bottom bar rules:

- appears after leaving the top,
- not context-sensitive in V1,
- icon-only,
- stable across the site,
- should not replace itself with page-specific actions.

Bottom bar items:

- `Home`
- `Engineering`
- `Management`
- `Współpraca`

`O nas` remains in the top nav only.

Tablet-specific bottom bar behavior is intentionally deferred.

## 9. Trust and Advisory Pages

### 9.1 O nas

Primary route:

- `/o-devmint`

Nav label:

- `O nas`

This page should explain:

- mission,
- point of view,
- who is behind devMint,
- why the platform exists,
- experience,
- how devMint can help at a high level.

The page should not become:

- a casual personal blog bio,
- a corporate brochure,
- a full offer page.

### 9.2 Współpraca

Primary route:

- `/wspolpraca`

Nav label:

- `Współpraca`

This page should function as:

- a light offer/advisory page,
- a place to describe examples of cooperation,
- a place to frame areas like AI adoption, tech transition, and similar work,
- a place with a simple email CTA.

This is not a raw contact page.

There is no form in V1.

Use email CTA only.

## 10. Feeds, Sitemap, and Discovery

V1 should include:

- one regular sitemap,
- RSS feed,
- Atom feed.

Feed and sitemap inclusion should follow the same publishable-content rules as public listings.

V1 should not add:

- tag pages,
- search,
- pagination,
- advanced related-content logic.

## 11. Scope Cuts Compared to the Earlier Plan

The earlier plan is too wide in several areas.

The narrowed V1 should explicitly avoid:

- Astro restoration,
- a monorepo package structure,
- MDX from day one,
- complex multilingual UI,
- tag UI,
- tag pages,
- tag filters,
- section-page intros,
- section featured items,
- pagination,
- table of contents,
- generated social cards,
- contact forms,
- staging environment,
- RSC-first architecture,
- page-specific shell variants.

## 12. Open Questions

The main unresolved items are now mostly visual/editorial, not architectural.

Still open:

- final brand color direction,
- whether to carry forward the historical devMint accent palette,
- exact desktop/mobile shell proportions,
- icon set for the mobile bottom bar,
- exact copy for homepage positioning sentence and paragraph,
- exact copy for `/o-devmint`,
- exact copy for `/wspolpraca`,
- exact article frontmatter schema naming,
- exact feed route names,
- exact giscus repository/discussion mapping.

## 13. Recommended Next Step

Do not continue with the old Astro-oriented implementation plan.

The next step should be:

1. rewrite the implementation plan around this checkpoint,
2. split the work into a TanStack Start root-app foundation,
3. define the exact typed content schema,
4. define the shell/navigation implementation,
5. define homepage/article/trust-page implementation,
6. finalize visual direction and copy.
