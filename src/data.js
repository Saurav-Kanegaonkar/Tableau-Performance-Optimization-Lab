window.dashboardData = {
  "cards": [
    [
      "Avg load time",
      "4.8s",
      "-1.2s target"
    ],
    [
      "Validation pass",
      "93%",
      "+6 pp"
    ],
    [
      "Adoption",
      "71%",
      "+9%"
    ],
    [
      "High-risk views",
      "5",
      "optimize"
    ]
  ],
  "table": [
    [
      "Sales scorecard",
      "Executive",
      "Slow",
      "Complex SQL",
      "High"
    ],
    [
      "Finance KPI",
      "Finance",
      "Fresh",
      "Definition cleanup",
      "High"
    ],
    [
      "Ops dashboard",
      "Operations",
      "Fresh",
      "No issue",
      "Low"
    ],
    [
      "Ad hoc workbook",
      "Sales",
      "Stale",
      "Owner gap",
      "Medium"
    ]
  ],
  "dataSays": [
    "The synthetic data shows dashboard speed issues concentrate in workbooks with high filter complexity and unclear ownership.",
    "Validation failures are low overall, but two executive scorecards need definition cleanup before wider publishing.",
    "The strongest recommendation is to tune heavy extracts before adding more visual layers."
  ],
  "recs": [
    "Optimize high-filter Tableau workbooks before publishing new executive views.",
    "Document KPI definitions and validation logic for scorecards used in leadership meetings.",
    "Move recurring ad hoc reports into governed Tableau Server schedules."
  ]
};
