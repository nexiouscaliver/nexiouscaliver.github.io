---
title: mission-control
summary: >-
  A controller for long-running agent engineering programmes: waves and lanes,
  verification against machine records, and honest blocked states.
role: Author
year: "2026"
status: live
stack: [Python]
order: 2
repo: https://github.com/nexiouscaliver/mission-control
---

When you hand big engineering programmes to AI agents, the failure mode is
usually not a bad edit. It is drift: work that claims to be done but is not,
context that decays over weeks, five agents stepping on the same tree.
mission-control is the controller I built to keep that from happening.

Programmes break into waves and lanes with explicit dependency ordering, and
parallelism caps come from the machine's measured headroom rather than
optimism. The controller plans and verifies; the agents implement. Nothing is
both, which is what keeps the verifier honest.

Every claim gets checked against machine records and live state: pull
requests, gates, deployed URLs. Evidence or it did not happen. Loops are
bounded, and when a lane cannot proceed it says so instead of quietly
stalling. Six recurring agent-runtime defects became standing conventions
after each one bit exactly once.

The confidence case, before anything ran unattended: a nightly consolidation
of the knowledge vault was validated on never-seen holdout data, agreeing 51
of 51 times and rejecting 16 of 16 synthetic negatives. And after overlapping
test fleets caused out-of-memory incidents, a machine-global lease guard now
caps concurrent runs, cutting peak fleet memory by more than half. Fourteen
releases in three weeks.
