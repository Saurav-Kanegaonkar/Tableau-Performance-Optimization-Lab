# Tableau Performance Optimization Lab

I built this because Tableau development is not only about creating dashboards; it is about making reporting fast, trusted, scalable, and usable for business stakeholders. The project models dashboard performance, validation checks, and executive KPI readiness.

![Tableau Performance Optimization Lab dashboard](docs/images/dashboard.png)

## Why this exists

BI teams need to know which Tableau dashboards are slow, inaccurate, over-filtered, or missing stakeholder-ready KPI definitions.

## What is in the project

- A polished dashboard in `index.html`
- Modular UI/data files in `src/`
- Synthetic operating data in `data/synthetic_operating_data.csv`
- A screenshot captured from the rendered app in `docs/images/dashboard.png`

## Dashboard sections

- Performance pulse: load time, data freshness, validation pass rate, and user adoption.
- Dashboard queue: workbook owner, SQL complexity, refresh risk, and optimization priority.
- Recommendation memo: tuning, publishing, validation, and Tableau Server governance actions.

## What the data says

The synthetic data shows dashboard speed issues concentrate in workbooks with high filter complexity and unclear ownership.

Validation failures are low overall, but two executive scorecards need definition cleanup before wider publishing.

The strongest recommendation is to tune heavy extracts before adding more visual layers.

## Output walkthrough

### Output 1: Executive pulse

The KPI cards summarize the current operating picture and highlight whether the team should trust, investigate, or act on the latest metrics.

### Output 2: Diagnostic table

The table converts raw operating signals into a ranked queue of risks, owners, and recommended next actions.

### Output 3: Analytical recommendations

The memo turns the analysis into specific business actions that can be discussed in a weekly review or stakeholder workshop.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
