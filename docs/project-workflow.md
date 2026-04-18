# Project Workflow

This file is the canonical workflow policy for planning and delivery in `devMint/devmint-pl`.

If workflow guidance in `README.md`, the GitHub Project README, `.codex/skills/cli-github/SKILL.md`, or `.codex/agents/project-manager.toml` conflicts with this file, update those derivatives to match this file.

## Scope

This policy applies to:

- repository: `devMint/devmint-pl`
- GitHub Project: `devMint Platform`
- GitHub Project owner: `devMint`
- GitHub Project number: `9`

## Planning Model

Use this hierarchy:

1. Milestone
   Use only for very large, strategically important initiatives.

2. Issue
   This is the main unit of work.
   Issues are the only unit that should be estimated and prioritized directly.

3. Sub-issue
   Use only for technical decomposition under a parent issue.
   Sub-issues must stay technical, not business-facing.

Rules:

- if work is too large for one issue, split it into multiple linked issues,
- use a milestone only when the scope is strategically large,
- if an issue trends toward `L` or `XL`, recommend splitting it,
- use sub-issues only when one coherent issue needs technical breakdown.

## Workflow States

The GitHub Project `Status` field should use exactly these values:

- `Backlog`
- `Todo`
- `Blocked`
- `In Progress`
- `In Testing`
- `Done`

State meanings:

- `Backlog`: captured but not ready yet
- `Todo`: ready to start
- `Blocked`: cannot continue because of an external blocker or dependency
- `In Progress`: actively being implemented
- `In Testing`: implementation is finished and waiting for manual verification
- `Done`: completed and validated

Rules:

- new issues added to the project should default to `Backlog`,
- move to `Todo` only when `Definition of Ready` is satisfied,
- `Todo` is a pull-based ready queue with a WIP limit of `5`,
- choose `Todo` issues mainly by priority, readiness, and fit with active work,
- moving an issue to `Blocked` requires a brief issue comment explaining why,
- move to `Done` only when `Definition of Done` is actually satisfied.

## Issue Metadata

Every meaningful unit of work should exist in GitHub as an issue.

Each issue should have:

- a concise, outcome-oriented title,
- one GitHub Issue Type,
- membership in the `devMint Platform` project,
- a project `Priority` value,
- a project `Estimation Size` value when estimated,
- a milestone when appropriate,
- relationships to other issues when the work is part of a larger cluster.

### Issue Type

Issue type is stored in GitHub's built-in Issue Type field.

Use these values:

- `Feature`
- `Bug`
- `Task`

Rules:

- every issue should have exactly one Issue Type,
- use `Task` as the default for operational or planning work,
- use `Feature` for user-facing capability work,
- use `Bug` for regressions, defects, or broken behavior.

### Labels

Labels are optional and should be used only for cross-cutting tags that are not already represented by a first-class GitHub field.

Do not recreate Issue Type, priority, or estimation as labels.
Do not use legacy `type:*` labels such as `type:feature`, `type:bug`, or `type:task` in this repository workflow.

### Priority

Priority is stored in the GitHub Project `Priority` field.

Use these values:

- `Low`
- `Medium`
- `High`

Semantics:

- `Low`: nice to have; safe to defer without threatening the release
- `Medium`: default planned work
- `High`: critical ordering signal; use when the issue should beat other ready work in `Todo` or `In Progress`

Rules:

- default to `Medium`,
- use `High` sparingly,
- if an issue stays `High` for a long time while sitting in `Backlog`, treat that as a smell and re-evaluate it.

### Estimation Size

Estimation is stored in the GitHub Project `Estimation Size` field.

Use these values:

- `XS`
- `S`
- `M`
- `L`
- `XL`

Rules:

- estimate issues, not milestones,
- if size is unclear, discuss it before or during issue creation,
- if an issue looks like `L` or `XL`, recommend splitting or restructuring it,
- do not treat technical sub-issues as the primary planning unit.

## Issue Body Standard

Issue descriptions should be brief and self-explanatory.
Do not write bloated specifications in issue bodies.

Use this structure:

```md
## Summary
<short description of the work and why it matters>

## Definition of Ready
- <condition>

## Definition of Done
- <condition>

## Notes
<optional brief notes, blockers, links, or context>
```

Rules:

- `Summary`, `Definition of Ready`, and `Definition of Done` should always be present,
- `Notes` is optional,
- keep the body minimal but durable,
- if a blocker is important enough to affect execution, preserve it in a comment and optionally reflect the stable part in `Notes`.

## Queue Management

When reviewing project state, always try to answer:

- what is in `Todo`, `In Progress`, `In Testing`, and `Blocked`?
- is `Todo` over the WIP limit?
- which issues are missing Issue Type, project membership, project `Priority`, project `Estimation Size`, milestone, or relationships?
- which issues should be split?
- which blocked items need attention?

## Derivative Documents

The following files should align to this document rather than redefine policy:

- `README.md`
- `.codex/skills/cli-github/SKILL.md`
- `.codex/agents/project-manager.toml`

The GitHub Project README may mirror this policy for convenience, but this file remains canonical.
