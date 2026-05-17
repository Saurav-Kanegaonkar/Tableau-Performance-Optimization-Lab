window.projectData = {
  summary: [
    {
      label: "Workbook estate",
      value: "28 assets",
      detail: "12 executive or high criticality",
      tone: "neutral"
    },
    {
      label: "P95 load time",
      value: "28.4s",
      detail: "Target is under 12 seconds",
      tone: "risk"
    },
    {
      label: "Extract success",
      value: "93.1%",
      detail: "2,520 synthetic refresh records",
      tone: "good"
    },
    {
      label: "Uncertified KPIs",
      value: "37",
      detail: "64 metric definitions reviewed",
      tone: "warn"
    }
  ],
  workbooks: [
    {
      id: "WB008",
      name: "Executive Scorecard",
      owner: "Sales Ops",
      audience: "Executive staff",
      criticality: "High",
      riskScore: 132,
      riskBand: "High",
      avgLoad: 32.7,
      p95Load: 59.1,
      extractPass: 93,
      freshness: 72,
      certification: 58,
      supportTickets: 26,
      dataSources: ["Snowflake orders mart", "Finance KPI extract"],
      rootCauses: [
        "Custom SQL performs row-level joins before extract filters are applied.",
        "Nine sheets share high-cardinality customer and opportunity filters.",
        "Revenue and bookings definitions differ between sales and finance sources."
      ],
      actions: [
        "Replace workbook-level custom SQL with a governed warehouse view.",
        "Move revenue and bookings into a certified metric layer before publishing.",
        "Use guided filter actions instead of global quick filters across every sheet."
      ]
    },
    {
      id: "WB015",
      name: "Ops KPI View",
      owner: "Marketing",
      audience: "Director weekly review",
      criticality: "High",
      riskScore: 131,
      riskBand: "High",
      avgLoad: 33.1,
      p95Load: 57.1,
      extractPass: 90,
      freshness: 69,
      certification: 74,
      supportTickets: 21,
      dataSources: ["PostgreSQL case events", "Support escalation extract"],
      rootCauses: [
        "Extract refresh overlaps with peak Tableau Server backgrounder usage.",
        "SLA calculations use string status fields that can be replaced with integer flags.",
        "Dashboard attempts to show full case detail and executive trend in one view."
      ],
      actions: [
        "Split executive SLA trend and case detail into separate workbooks.",
        "Schedule the extract after upstream case tables complete loading.",
        "Materialize SLA flags in SQL before Tableau renders the dashboard."
      ]
    },
    {
      id: "WB013",
      name: "Ops KPI View",
      owner: "Operations",
      audience: "Controller review",
      criticality: "Medium",
      riskScore: 129,
      riskBand: "High",
      avgLoad: 31.4,
      p95Load: 58.1,
      extractPass: 98,
      freshness: 91,
      certification: 63,
      supportTickets: 18,
      dataSources: ["Oracle finance warehouse", "Planning workbook export"],
      rootCauses: [
        "Refresh reliability is strong, but metric certification is incomplete.",
        "Manual reconciliation tickets repeat after each monthly close.",
        "Margin calculations are duplicated in workbook calculated fields."
      ],
      actions: [
        "Create certified definitions for margin, bookings, ARR, and net retention.",
        "Move repeated margin calculations into the finance semantic layer.",
        "Add SQL validation checks for monthly close reconciliation variance."
      ]
    },
    {
      id: "WB001",
      name: "Ops Scorecard",
      owner: "Sales Ops",
      audience: "Regional managers",
      criticality: "Medium",
      riskScore: 127,
      riskBand: "High",
      avgLoad: 29.5,
      p95Load: 57.6,
      extractPass: 93,
      freshness: 78,
      certification: 67,
      supportTickets: 15,
      dataSources: ["SQL Server opportunity mart"],
      rootCauses: [
        "Large itemized region and account filters create repeated queries.",
        "Workbook has no clear business owner for access changes.",
        "Unused fields are still present in the published extract."
      ],
      actions: [
        "Hide unused fields before extract publication.",
        "Replace itemized account filters with guided region and segment actions.",
        "Assign a workbook owner before Tableau Server promotion."
      ]
    },
    {
      id: "WB016",
      name: "Sales Scorecard",
      owner: "Marketing",
      audience: "Analyst ad hoc use",
      criticality: "Low",
      riskScore: 126,
      riskBand: "Medium",
      avgLoad: 33.7,
      p95Load: 57.6,
      extractPass: 84,
      freshness: 51,
      certification: 41,
      supportTickets: 19,
      dataSources: ["CSV uploads", "Shared sales extract"],
      rootCauses: [
        "Workbook duplicates governed dashboards but lacks ownership.",
        "Refresh schedule misses upstream file arrival by two hours.",
        "Stakeholders use it for recurring questions without certified definitions."
      ],
      actions: [
        "Retire duplicate tabs and move recurring questions into governed dashboards.",
        "Stop publishing until the owner and KPI definitions are assigned.",
        "Replace CSV uploads with a scheduled warehouse-backed extract."
      ]
    }
  ],
  optimizationQueue: [
    {
      workbook: "Executive Scorecard",
      pattern: "Heavy custom SQL extract",
      before: 32.7,
      after: 12.4,
      savings: "20.3s",
      evidence: "Custom SQL joins order, customer, territory, and quota tables before Tableau extract filters.",
      recommendation: "Create a warehouse view with required grain, indexes, and business filters before Tableau connects."
    },
    {
      workbook: "Ops KPI View",
      pattern: "Dashboard tries to answer two jobs",
      before: 33.1,
      after: 13.8,
      savings: "19.3s",
      evidence: "Executive trend, case detail, and exception table render together for every filter change.",
      recommendation: "Split trend and detail into separate workbooks, then use action links for drill-through."
    },
    {
      workbook: "Ops Scorecard",
      pattern: "High-cardinality quick filters",
      before: 29.5,
      after: 9.7,
      savings: "19.8s",
      evidence: "Account and opportunity filters are applied to multiple worksheets and refresh only relevant values.",
      recommendation: "Use guided filter actions and indexed range filters instead of global itemized lists."
    },
    {
      workbook: "Finance KPI Reconciliation",
      pattern: "Repeated calculated fields",
      before: 18.4,
      after: 11.2,
      savings: "7.2s",
      evidence: "Margin and bookings calculations repeat in workbook logic instead of a certified data source.",
      recommendation: "Materialize recurring finance calculations upstream and certify the shared metric layer."
    },
    {
      workbook: "Sales Scorecard",
      pattern: "Oversized extract",
      before: 33.7,
      after: 18.6,
      savings: "15.1s",
      evidence: "Published extract includes unused fields and transaction-level rows for summary-only analysis.",
      recommendation: "Hide unused fields, aggregate visible dimensions, and retire duplicate tabs before republishing."
    }
  ],
  publishingReadiness: [
    {
      area: "Extract scheduling",
      status: "At risk",
      owner: "Tableau Server admin",
      check: "Five high-criticality extracts refresh during the same backgrounder window.",
      action: "Spread schedules across off-peak windows and confirm upstream warehouse completion times."
    },
    {
      area: "Metric certification",
      status: "Blocked",
      owner: "Finance BI and Sales Ops",
      check: "37 KPI definitions are not certified, including revenue, bookings, margin, and SLA attainment.",
      action: "Publish only after business owners approve definitions and refresh tests pass."
    },
    {
      area: "Access and security",
      status: "Needs review",
      owner: "BI platform lead",
      check: "Three executive workbooks have broad project permissions and no row-level security test record.",
      action: "Validate permissions before promotion and attach access evidence to the release checklist."
    },
    {
      area: "Data validation",
      status: "Ready with guardrails",
      owner: "Analytics engineering",
      check: "SQL checks reconcile row counts, null rates, freshness, and finance variance thresholds.",
      action: "Run validation after each extract refresh and escalate failures before stakeholder meetings."
    }
  ],
  releaseChecklist: [
    ["Performance recorder reviewed", "Required", "Open for WB008 and WB015"],
    ["Extract refresh schedule confirmed", "Required", "Blocked for five high-criticality assets"],
    ["KPI owner signed off", "Required", "37 definitions still need certification"],
    ["SQL validation passed", "Required", "Pass with monthly close variance exception"],
    ["Permissions reviewed", "Required", "Three executive workbooks need RLS evidence"]
  ]
};
