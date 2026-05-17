# Data Dictionary

| Table | Grain | Purpose |
|---|---|---|
| workbooks.csv | workbook | Owner, certification, and business criticality |
| extract_runs.csv | workbook x run date | Refresh status, duration, rows, freshness lag |
| performance_samples.csv | workbook x timestamp | Load time, filter count, viz count, user count |
| support_tickets.csv | ticket | Stakeholder issues and resolution hours |
| metric_definitions.csv | KPI | Definition ownership, source system, certification, age |
| optimization_candidates.csv | workbook x tuning candidate | Before and after load estimates, optimization pattern, recommendation |
| publishing_readiness.csv | release gate area | Tableau Server publishing status, owner team, check result, action |
