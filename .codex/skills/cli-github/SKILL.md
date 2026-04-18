---
name: cli-github
description: Use this skill whenever the user wants to manage GitHub work through the `gh` CLI for this repository, especially when they mention issues, labels, pull requests, projects, project items, backlog triage, bugs, ideas, or planning work for `devMint/devmint-pl`. This skill is repo-aware, prefers exact `gh` commands over vague advice, and should be used even when the user only asks for project-management help without explicitly naming `gh`.
---

# CLI GitHub

Use this skill to operate GitHub for the `devMint/devmint-pl` repository from the terminal.

This is an operational skill, not a planning policy skill. It should help an agent:

- inspect and summarize GitHub issues and project items,
- create or edit issues with the right metadata,
- create and attach technical sub-issues under a parent issue,
- work with labels and linked pull requests,
- inspect sub-issues and their completion state,
- update project metadata,
- explain the exact `gh` commands used.

The canonical planning workflow for this repository lives in `docs/project-workflow.md`.
Use that file as the policy source for statuses, priority semantics, estimation semantics, issue metadata rules, and queue-management rules.
If local docs and live GitHub state disagree, inspect GitHub first, report the drift, and prefer bringing derivative docs back into alignment with `docs/project-workflow.md`.

## Defaults

- Repository: `devMint/devmint-pl`
- Preferred command style: exact `gh` commands with JSON output when possible
- Canonical project owner: `devMint`
- Canonical project number: `9`
- Canonical project title: `devMint Platform`

Repository commands should target `devMint/devmint-pl`.
For this repository, the canonical project owner is the `devMint` organization, so project examples should use `--owner devMint`.
If the project is moved in the future, resolve the owner again instead of assuming it still matches historical setup.
For this repository, planning metadata may live in project fields rather than labels. Inspect project fields before inventing label-based conventions.

## Operating Rules

1. Start by checking whether `gh` can act successfully.
2. Prefer machine-readable output: `--json`, `--jq`, or `gh api`.
3. Prefer terminal-safe flows over browser flows unless the user explicitly wants the browser.
4. When a command needs project permissions, verify auth before proceeding.
5. If GitHub auth is invalid, the token lacks the `project` scope, or network access fails, stop and say exactly what is blocked.
6. When project ownership is unclear, resolve it first instead of guessing.
7. When the user asks a PM-style question, answer in a short operational summary first, then include the exact command or command family that supports the answer.
8. There is no first-class `gh issue` sub-issue command. Use `gh api` with the REST `sub_issues` endpoints for parent/child relationships.
9. Use GraphQL only where the CLI still lacks native coverage, such as GitHub Issue Type inspection or updates.

## Session Setup

When you need to act against the repository, anchor commands to this repo:

```bash
export GH_REPO=devMint/devmint-pl
```

Use this check sequence before project commands:

```bash
gh auth status
gh repo view --json nameWithOwner,url
gh project view 9 --owner devMint --format json
gh project field-list 9 --owner devMint --format json
```

If project commands fail because of missing scope, instruct the user to refresh auth:

```bash
gh auth refresh -s project
```

If `gh project view 9 --owner devMint` fails, verify whether the project owner changed or whether auth is missing the required project scopes. Do not silently substitute `@me`.

## Output Contract

When reporting results back to the user, use this structure:

1. A short result summary in plain language
2. The exact `gh` command(s) used or recommended
3. Any caveat that changes confidence, such as missing auth, unknown project owner, or GitHub model limitations

Keep the summary concise. Do not dump raw JSON unless the user asks for it.

## Core Workflows

### 1. List repository issues

Use this when the user asks for open issues, backlog items, bugs, ideas, or work in the repo.

```bash
GH_REPO=devMint/devmint-pl \
gh issue list --state open --limit 100 \
  --json number,title,state,labels,assignees,updatedAt,url
```

Use `--jq` to format a concise report:

```bash
GH_REPO=devMint/devmint-pl \
gh issue list --state open --limit 100 \
  --json number,title,labels,url \
  --jq '.[] | {number, title, labels: [.labels[].name], url}'
```

### 2. List issues with one or more labels

Use labels only for repository-level slicing that is not already covered by Issue Type, such as `frontend` or `documentation`.
Do not use legacy `type:*` labels such as `type:feature`, `type:bug`, or `type:task` in this workflow.

```bash
GH_REPO=devMint/devmint-pl \
gh issue list --state open --label documentation --limit 100 \
  --json number,title,labels,url
```

For multiple labels, repeat `--label`:

```bash
GH_REPO=devMint/devmint-pl \
gh issue list --state open --label documentation --label frontend --limit 100 \
  --json number,title,labels,url
```

When the user asks for label discovery first, use:

```bash
GH_REPO=devMint/devmint-pl \
gh label list --limit 100 --json name,description,color
```

If the user asks for issues by native GitHub Issue Type such as `Bug`, `Feature`, or `Task`, use GraphQL and filter on `issueType` instead of assuming label-based classification:

```bash
GH_REPO=devMint/devmint-pl \
gh api graphql -f query='
query {
  repository(owner: "devMint", name: "devmint-pl") {
    issues(first: 100, states: OPEN) {
      nodes {
        number
        title
        url
        issueType {
          name
        }
      }
    }
  }
}' \
  --jq '.data.repository.issues.nodes[] | select(.issueType.name == "Bug") | {number, title, url}'
```

### 3. Create a new issue for an idea, bug, or task

Use `gh issue create` directly when the user wants GitHub to become the source of truth, then set Issue Type with GraphQL immediately after creation if needed.

Default pattern:

```bash
GH_REPO=devMint/devmint-pl \
gh issue create \
  --title "<title>" \
  --body "<body>" \
  --project "devMint Platform"
```

After creation, inspect the project fields and set the planning metadata required by the canonical workflow. Do not assume the project defaults are sufficient just because the issue was added to the project.

When generating the body, keep it structured and easy to triage. Use a small template like this:

```md
## Summary
<what this is and why it matters>

## Definition of Ready
- <condition>

## Definition of Done
- <condition>

## Notes
<constraints, links, or follow-up details>
```

For `devMint/devmint-pl`, prefer native GitHub Issue Type over legacy custom type labels. Set project `Status`, `Priority`, and `Estimation Size` through project fields when the repository workflow uses fields for planning metadata.

When Issue Type needs to be set during creation, use GraphQL instead of `gh issue create`:

1. resolve the repository Issue Type ID from `repository.issueTypes`,
2. resolve the repository ID and project ID,
3. use the GraphQL mutation below with those IDs.

```bash
GH_REPO=devMint/devmint-pl \
gh api graphql -f query='
mutation($repositoryId: ID!, $projectId: ID!, $milestoneId: ID, $issueTypeId: ID!, $title: String!, $body: String!) {
  createIssue(input: {
    repositoryId: $repositoryId,
    projectV2Ids: [$projectId],
    milestoneId: $milestoneId,
    issueTypeId: $issueTypeId,
    title: $title,
    body: $body
  }) {
    issue {
      number
      url
    }
  }
}' \
  -f repositoryId='<repo-id>' \
  -f projectId='<project-id>' \
  -f milestoneId='<milestone-id>' \
  -f issueTypeId='<issue-type-id>' \
  -f title='<title>' \
  -f body='<body>'
```

If the user has not asked to actually create the issue yet, draft the title, Issue Type, and body first, then ask for confirmation before running the command.

When the issue should be fully planned at creation time, follow up with the project metadata workflow:

1. inspect the project field IDs and allowed options,
2. inspect the project item ID for the new issue,
3. set `Priority`,
4. set `Status` if the workflow requires a non-default state,
5. set `Estimation Size` when the issue has been estimated.

### 4. Edit an existing issue

Use this for title changes, body rewrites, label updates, or project assignment changes.

```bash
GH_REPO=devMint/devmint-pl \
gh issue edit <number> \
  --title "<new title>" \
  --body "<new body>"
```

Label management:

```bash
GH_REPO=devMint/devmint-pl \
gh issue edit <number> --add-label "documentation"
```

```bash
GH_REPO=devMint/devmint-pl \
gh issue edit <number> --remove-label "documentation"
```

Project assignment:

```bash
GH_REPO=devMint/devmint-pl \
gh issue edit <number> --add-project "devMint Platform"
```

To update GitHub Issue Type, use GraphQL:

1. inspect the enabled Issue Types to find the correct `issueTypeId`,
2. inspect the target issue in GraphQL to get its GraphQL node `id`,
3. call `updateIssue` with those two IDs.

```bash
GH_REPO=devMint/devmint-pl \
gh api graphql -f query='
mutation($issueId: ID!, $issueTypeId: ID!) {
  updateIssue(input: {
    id: $issueId,
    issueTypeId: $issueTypeId
  }) {
    issue {
      number
      issueType {
        name
      }
    }
  }
}' \
  -f issueId='<issue-id>' \
  -f issueTypeId='<issue-type-id>'
```

Important details:

- `issueTypeId` comes from `repository.issueTypes.nodes[].id`,
- `issueId` here is the issue GraphQL node ID, not the REST issue `id`,
- if you only have the issue number, inspect it first with GraphQL and then pass the returned `id` into `updateIssue`.

Do not recreate Issue Type, project `Priority`, or project `Estimation Size` as labels when those fields already exist in the project.

### 5. Create and attach sub-issues

There is no first-class `gh issue subissues` command in the CLI. For this repository, create the child issue normally, then attach it to the parent with `gh api` against the REST sub-issues endpoint.

Recommended flow:

1. create or reuse the child issue,
2. set native GitHub Issue Type if needed,
3. attach it under the parent issue,
4. add the child to project `9` only if the user wants board visibility or the workflow explicitly needs it,
5. if the child is added to the project, avoid defaulting `Priority` or `Estimation Size` unless the user explicitly wants the sub-issue tracked as an independently planned unit.

Create the child issue with the standard issue flow:

```bash
GH_REPO=devMint/devmint-pl \
gh issue create \
  --title "<title>" \
  --body "<body>"
```

If the child should also be visible on the project board, add it explicitly after creation instead of assuming every technical sub-issue belongs there by default:

```bash
GH_REPO=devMint/devmint-pl \
gh issue edit <number> --add-project "devMint Platform"
```

Attach the child issue to the parent issue:

```bash
CHILD_ISSUE_REST_ID=<child-issue-rest-id>
printf '{"sub_issue_id": %s}\n' "$CHILD_ISSUE_REST_ID" | \
GH_REPO=devMint/devmint-pl \
gh api -X POST repos/{owner}/{repo}/issues/<parent-number>/sub_issues --input -
```

Important details:

- the REST body field is the child issue REST `id`, not the issue number,
- `sub_issue_id` must be sent as an integer in JSON, not as a quoted string,
- if the child was just added to the project, `gh project item-list` may lag briefly before the new item is visible,
- prefer retrying project item lookup for a few seconds instead of assuming the add-to-project step failed.

Use sub-issues only for technical decomposition under one coherent parent issue. Do not turn them into peer roadmap issues when the workflow calls for linked child work.
Do not treat technical sub-issues as the primary planning unit by default.

### 6. Inspect issue types

Use GraphQL to inspect enabled Issue Types for the repository:

```bash
GH_REPO=devMint/devmint-pl \
gh api graphql -f query='
query {
  repository(owner: "devMint", name: "devmint-pl") {
    issueTypes(first: 20) {
      nodes {
        id
        name
        isEnabled
      }
    }
  }
}'
```

Use issue JSON or GraphQL to inspect an issue's current type:

```bash
GH_REPO=devMint/devmint-pl \
gh api graphql -f query='
query {
  repository(owner: "devMint", name: "devmint-pl") {
    issue(number: <number>) {
      id
      number
      title
      issueType {
        id
        name
      }
    }
  }
}'
```

### 7. Inspect project fields and items

Resolve field definitions before editing project metadata:

```bash
gh project field-list 9 --owner devMint --format json
```

List project items:

```bash
gh project item-list 9 --owner devMint --limit 100 --format json
```

Use project item data when the user asks about roadmap state, backlog state, missing metadata, or workflow problems.

For field-based workflows, inspect both:

- the project field IDs and allowed options,
- the project item IDs that correspond to repository issues.

### 8. Set project field values

Use `gh project item-edit` to set project single-select fields such as `Status`, `Priority`, or `Estimation Size`.

The required inputs are:

- project ID,
- item ID,
- field ID,
- option ID.

Typical discovery flow:

```bash
gh project view 9 --owner devMint --format json
gh project field-list 9 --owner devMint --format json
gh project item-list 9 --owner devMint --limit 100 --format json
```

Edit a single-select field:

```bash
gh project item-edit \
  --id <item-id> \
  --project-id <project-id> \
  --field-id <field-id> \
  --single-select-option-id <option-id>
```

Use this instead of issue labels when the workflow stores planning metadata in project fields.

### 9. List project items

Use the project when the user asks about roadmap state, project backlog, or “what is in the project”.

For common filters, prefer the built-in project query syntax:

```bash
gh project item-list 9 --owner devMint --limit 100 \
  --query "is:issue is:open"
```

```bash
gh project item-list 9 --owner devMint --limit 100 \
  --query "label:documentation -status:Done"
```

If `devMint` is no longer the owner, resolve the new owner explicitly and say that project owner and repo owner can differ.

### 10. Check whether an issue has a linked pull request

Start with issue JSON:

```bash
GH_REPO=devMint/devmint-pl \
gh issue view <number> \
  --json number,title,state,closedByPullRequestsReferences,url
```

Use `closedByPullRequestsReferences` as the primary machine-readable signal from `gh issue view`.

Recommended summary logic:

- if the array is non-empty, report the linked closing PR numbers and URLs,
- if the array is empty, say no linked closing PR was found through `gh issue view`,
- if the user needs deeper investigation, say that manual sidebar links or in-progress work may need a broader follow-up query outside this basic workflow.

Do not overstate certainty when the field is empty.

### 11. Inspect sub-issues and completion state

There is no first-class `gh issue subissues` command in the CLI. Use `gh api` against the GitHub API.

List sub-issues for a parent issue:

```bash
GH_REPO=devMint/devmint-pl \
gh api repos/{owner}/{repo}/issues/<number>/sub_issues
```

Summarize open vs closed sub-issues:

```bash
GH_REPO=devMint/devmint-pl \
gh api repos/{owner}/{repo}/issues/<number>/sub_issues \
  --jq '{
    total: length,
    completed: map(select(.state == "closed")) | length,
    remaining: map(select(.state != "closed")) | length,
    items: map({number, title, state, html_url})
  }'
```

Interpretation:

- `closed` means completed
- anything else means not completed yet

If the user asks for the parent issue of a sub-issue, use:

```bash
GH_REPO=devMint/devmint-pl \
gh api repos/{owner}/{repo}/issues/<number>/parent
```

If the user needs to create the relationship rather than only inspect it, use the `Create and attach sub-issues` workflow above instead of inventing a non-existent `gh issue` subcommand.

### 12. Update project metadata

Use this for project description, title, readme, or visibility changes.

```bash
gh project edit 9 --owner devMint --description "<new description>"
```

```bash
gh project edit 9 --owner devMint --readme "<markdown readme>"
```

```bash
gh project edit 9 --owner devMint --title "devMint Platform"
```

Important: the official `gh project edit` interface exposes `--description`, `--readme`, `--title`, and `--visibility`. Do not invent a separate “short description” flag.

## Repo-Specific Guidance

For this repository, expect the skill to be used in conversations like:

- “Create an issue for this future idea.”
- “Show me all bugs in the project.”
- “Is issue `#42` already linked to a PR?”
- “What sub-issues are still open under this phase ticket?”
- “Put this issue into the `devMint Platform` project.”
- “Show me what’s in project `9`.”

When the user is clearly describing future work, bugs, or roadmap maintenance, favor creating or updating GitHub issues instead of leaving the plan only in chat.

## Workflow Compatibility

This skill does not decide workflow policy on its own.

For `devMint/devmint-pl`, follow `docs/project-workflow.md` and inspect the live GitHub Project fields before acting. In particular:

- use native GitHub Issue Type for `Task`, `Bug`, and `Feature`,
- use project fields for `Status`, `Priority`, and `Estimation Size` when those fields exist,
- use labels only for cross-cutting tags not covered by first-class GitHub metadata,
- do not use legacy `type:*` labels in this workflow,
- do not recreate field-based metadata as labels for convenience.

## Failure Handling

If a command fails:

- auth problem: report the exact auth failure and the next auth command
- project scope problem: tell the user `gh auth refresh -s project` is needed
- project owner ambiguity: say you need the owning user/org for project commands
- network failure: say GitHub could not be reached and the action was not completed

Do not pretend a write succeeded if the CLI output was not confirmed.
