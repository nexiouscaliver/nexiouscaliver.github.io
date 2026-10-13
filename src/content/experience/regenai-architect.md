---
org: RegenAI
role: AI System Architect (Consultant)
location: Remote
start: 2026-08
end: null
summary: >-
  Platform architecture for a multi-tenant AI-SEO SaaS on multi-region AWS:
  production security for AI-written code, disaster recovery, and cost work
  measured in ratios.
highlights:
  - >-
    Led the campaign that eliminated five verified remote-code-execution chains
    in AI-generated code with a stdlib-only, context-typed escaper applied at
    every sink, validated against a 541-payload matrix and a ported PHP parse
    oracle, then deployed to production.
  - >-
    Made LLM-authored arguments structurally non-authoritative: stack-frame
    origin analysis strips auto-apply flags that arrive through agent dispatch
    and fails closed on anything it cannot walk, server identity is pinned, and
    a human converts suggestions into writes. Proven across a 41,043-test
    campaign with zero regressions.
  - >-
    Centralized prompt-injection defense behind grammar-level invariants,
    closing marker-forgery classes across generation chains and cutting a
    63-second regex denial of service to nine milliseconds.
  - >-
    Designed a three-layer disaster-recovery architecture (Multi-AZ, cross-region
    replica, cross-region backups) with split-brain fencing on a pilot-light
    stack of 45 Terraform resources; the replica soaked 168 of 168 hours with
    zero breaches and a designed recovery time of 10 to 15 minutes.
  - >-
    Executed the platform's first production WAF enforcement flip over 462,901
    observed requests with a byte-exact rollback pre-built, then root-caused the
    roughly 470 post-flip blocked beacons to a count-mode logging blind spot and
    codified the fix as doctrine.
  - >-
    Cut CloudWatch metric series about 94 percent with a structural growth cap,
    and retired billed alarm queries at roughly 72x lower running cost with zero
    coverage loss.
  - >-
    Ended a forced-disconnect class that destroyed hour-long agent jobs with a
    custom gunicorn worker that drains connections instead of killing them.
order: 1
---
