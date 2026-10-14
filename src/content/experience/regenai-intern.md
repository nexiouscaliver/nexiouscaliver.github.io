---
org: RegenAI
role: AI Developer Intern
location: Remote
start: 2025-01
end: 2026-07
summary: >-
  Shipped AI features end to end for government clients in the Gulf and the
  company's own SaaS: retrieval, GPU serving, routing, and the outage fixes
  in between.
highlights:
  - >-
    Built the retrieval stack for a Gulf government client: pgvector hybrid
    search, semantic chunking, per-tenant sharded vector tables, and a
    cross-lingual Arabic-English re-query strategy for bilingual document QA.
  - >-
    Ran vLLM FP8 mixture-of-experts serving at 92k-token context and co-served
    four models, from the flagship to Arabic-language and embedding models, on a
    single 8-GPU host with per-GPU assignment and lifecycle tooling.
  - >-
    Built the bilingual benchmark program behind every inference decision:
    concurrency tiers to 80, tail-latency percentiles with bootstrap confidence
    intervals, and 10,000-request load tests.
  - >-
    Wrote a 1,133-line custom GLM-4.5 provider for the agent framework and
    runtime routing across 11 model classes, including a hybrid thinking router
    whose bilingual complexity classifier decides per request when paid
    reasoning is worth running.
  - >-
    Root-caused a recurring production WebSocket outage class (auth tokens in
    query strings tripping managed WAF rules) and moved authentication into the
    RFC 6455 subprotocol with a backend-first rollout, unblocking WAF block
    mode.
  - >-
    Built the GitHub App pre-merge verification ladder so an AI-opened
    production pull request is, by construction, one that already built green:
    draft, verify, then promote or discard.
order: 2
---
