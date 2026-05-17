# Data Sources

This project uses synthetic enterprise BI operations data. It is not real company data.

The data is modeled on a Tableau environment where a central BI team supports executive dashboards, operational reporting, and ad hoc analysis over relational warehouse sources. The synthetic distributions are intentionally realistic for portfolio demonstration:

- `workbooks.csv`: 28 Tableau workbook assets across Sales Ops, Finance, Marketing, Operations, and Executive reporting owners. Each asset has a criticality flag and certification status.
- `performance_samples.csv`: 3,200 load-time observations with filter count, visualization count, and user count. Slow workbooks are biased toward higher filter count, more visualizations, and larger user audiences.
- `extract_runs.csv`: 2,520 extract refresh records with run status, duration, row volume, and freshness lag. Failure and lag rates are higher for high-criticality workbooks with heavier row volumes.
- `support_tickets.csv`: 720 stakeholder tickets across access requests, stale data issues, KPI disputes, and performance complaints.
- `metric_definitions.csv`: 64 KPI definitions with certification status and definition age by source system and owner department.
- `optimization_candidates.csv`: curated tuning candidates for custom SQL, extract size, high-cardinality filters, calculated fields, and workbook decomposition.
- `publishing_readiness.csv`: release gate checks for Tableau Server scheduling, metric certification, access/security, and validation.

Synthetic data is used because public Tableau Server metadata and enterprise workbook performance logs usually contain confidential dashboard names, user behavior, security groups, query patterns, and business metrics.
