# devMint Platform

This repository is the home of the future `devmint.pl` platform and its execution workflow.

Planning and delivery happen through:

- repository issues as the main unit of work,
- the GitHub Project `devMint Platform` (`9`) as the execution board,
- the local `project-manager` agent and `cli-github` skill for operational GitHub work.

## Canonical Workflow

The canonical planning workflow lives in [docs/project-workflow.md](docs/project-workflow.md).

That document defines:

- workflow states,
- milestone vs issue vs sub-issue usage,
- GitHub Issue Type usage,
- priority semantics,
- estimation semantics,
- issue metadata rules,
- queue-management rules.

If this `README.md`, the GitHub Project README, `.codex/skills/cli-github/SKILL.md`, or `.codex/agents/project-manager.toml` drifts from that file, update the derivative to match `docs/project-workflow.md`.

## GitHub CLI

Repository work should target:

```bash
export GH_REPO=devMint/devmint-pl
```

Project work should use owner `devMint` and project `9`.

Recommended checks:

```bash
gh auth status
gh repo view --json nameWithOwner,url
gh project view 9 --owner devMint --format json
gh project field-list 9 --owner devMint --format json
```

For command patterns and operational details, see `.codex/skills/cli-github/SKILL.md`.
