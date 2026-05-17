# Methodology

The audit evaluates Tableau workbook readiness across five dimensions:

1. User-facing performance, measured by average and p95 load time.
2. Extract reliability, measured by refresh failures and freshness lag.
3. KPI definition readiness, measured by certified versus uncertified metric definitions by owner team.
4. Stakeholder support burden, measured by ticket volume and issue type.
5. Publishing governance, measured by ownership, access review, schedule readiness, and validation checks.

The risk score in `scripts/score_operating_data.py` weights load time, p95 load time, ticket count, extract failure rate, uncertified metric rate, and business criticality. The scoring is deterministic rather than predictive because this artifact is designed for a Tableau Developer role. The goal is to demonstrate operational BI judgment, SQL and extract tuning, dashboard performance thinking, and Tableau Server release discipline.

The optimization queue translates the scored risks into actions a BI team could take before promoting dashboards to executives:

- Replace workbook-level custom SQL with governed warehouse views.
- Reduce extract size with filters, aggregation, and hidden unused fields.
- Split workbooks that combine executive summaries and detailed operational tables.
- Move repeated calculations into certified shared data sources.
- Review schedules, permissions, and row-level security evidence before publishing.
