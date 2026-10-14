---
title: OmniForge
summary: >-
  Self-hosted review and merge automation for GitLab and GitHub: a 23-tool MCP
  server and a three-lens adversarial review topology behind a fail-closed
  merge gate.
role: Author
year: "2026"
status: live
stack: [MCP, GitLab, GitHub]
order: 3
repo: https://github.com/nexiouscaliver/OmniForge
---

Code review is where teams either compound or choke. OmniForge is self-hosted
automation for the whole merge-request lifecycle: gather context, isolate the
change, review it, adjudicate findings, and merge it safely. It exposes a
23-tool server so agents work through a typed interface instead of hand-writing
REST calls against the forges.

Review runs as three agents with non-overlapping judgment lenses: process,
architecture, and security. Each works in an isolated worktree so it sees the
change cold. Behind them sits a fail-closed merge gate: no approvals that are
not pinned to a commit, no unresolved threads, and an approval only counts if
it was earned against the exact head that was checked.

In production at RegenAI it held median code-review turnaround at 26 minutes
across a seven-wave campaign, and a root-cause hunt turned a 27-minute CI job
into one that finishes in under five minutes. Nineteen releases.
