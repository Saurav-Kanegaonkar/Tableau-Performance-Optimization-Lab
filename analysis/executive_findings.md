# Executive Findings

## What I analyzed

I joined workbook inventory, load-time samples, extract refreshes, support tickets, and KPI definitions to rank Tableau publishing and performance risk.

## Findings

- The synthetic workbook estate contains 28 assets, 3,200 performance samples, 2,520 extract runs, 720 support tickets, and 64 KPI definitions.
- The highest-risk pattern is not only slow dashboards. It is slow dashboards with high stakeholder visibility, incomplete KPI certification, and recurring support tickets.
- Tableau Server readiness is blocked when extract schedules collide with backgrounder load, when executive workbooks lack permission evidence, or when KPI definitions are still disputed.
- The top optimization candidate is the Sales Executive Scorecard because it combines high p95 load time, heavy custom SQL, KPI definition gaps, and executive meeting usage.

## Recommendation

Treat Tableau development as a release workflow, not a visual design task. Tune SQL and extracts first, certify KPI definitions with business owners, validate refreshes, review access, and only then promote executive dashboards.
