window.projectData = {
  summary: [
    ["Prep saved", "8 hrs/wk"],
    ["QA rework cut", "6 hrs/wk"],
    ["High-risk views", "5"],
    ["Extract pass", "93%"]
  ],
  workbooks: [
    {
      name: "Sales Executive Scorecard",
      owner: "Sales Ops",
      load: 38,
      freshness: 82,
      definition: 61,
      risk: "High",
      audit: ["Heavy filters create slow load time.", "Revenue definition differs from finance extract.", "Executive view should not publish until KPI owner signs off."],
      insights: ["The bottleneck is extract design, not visual density.", "The workbook carries high meeting risk because KPI ownership is unclear."],
      recs: ["Rewrite the SQL extract before adding more filters.", "Lock revenue definitions with finance before the next publish."]
    },
    {
      name: "Finance KPI Reconciliation",
      owner: "Finance",
      load: 71,
      freshness: 93,
      definition: 68,
      risk: "Medium",
      audit: ["Freshness is healthy.", "Definition cleanup remains the main risk.", "Automated validation can remove recurring QA rework."],
      insights: ["The workbook is usable but still creates avoidable QA cycles.", "A single certified metric layer would reduce duplicated review work."],
      recs: ["Add validation checks for margin and bookings.", "Move recurring reconciliation into the certified data source."]
    },
    {
      name: "Ad Hoc Sales Workbook",
      owner: "Field Sales",
      load: 55,
      freshness: 49,
      definition: 42,
      risk: "High",
      audit: ["Owner gap creates stale views.", "Filters are copied across tabs without governance.", "This should become a scheduled extract or retire."],
      insights: ["The ad hoc workbook is absorbing analyst time without becoming a governed asset.", "Publishing it as-is would increase support requests."],
      recs: ["Retire duplicated tabs.", "Convert recurring questions into a governed Tableau Server schedule."]
    }
  ]
};
