import csv
from collections import defaultdict
from pathlib import Path


OUTPUT_PATH = Path("analysis/outputs/workbook_governance_risk.csv")


def load_csv(path):
    with open(path, newline="") as f:
        return list(csv.DictReader(f))


def average(values):
    return sum(values) / len(values) if values else 0


def percentile(values, percentile_rank):
    if not values:
        return 0
    ordered = sorted(values)
    index = round((len(ordered) - 1) * percentile_rank)
    return ordered[index]


workbooks = load_csv("data/workbooks.csv")
performance = load_csv("data/performance_samples.csv")
extracts = load_csv("data/extract_runs.csv")
tickets = load_csv("data/support_tickets.csv")
definitions = load_csv("data/metric_definitions.csv")

load_times = defaultdict(list)
for row in performance:
    load_times[row["workbook_id"]].append(float(row["load_time_seconds"]))

extract_runs = defaultdict(lambda: {"total": 0, "failed": 0})
for row in extracts:
    workbook_id = row["workbook_id"]
    extract_runs[workbook_id]["total"] += 1
    if row["run_status"].lower() != "success":
        extract_runs[workbook_id]["failed"] += 1

ticket_counts = defaultdict(int)
for row in tickets:
    ticket_counts[row["workbook_id"]] += 1

definition_counts = defaultdict(lambda: {"total": 0, "certified": 0})
for row in definitions:
    owner = row["owner_department"]
    definition_counts[owner]["total"] += 1
    if row["certified_flag"] == "Y":
        definition_counts[owner]["certified"] += 1

ranked = []
for workbook in workbooks:
    workbook_id = workbook["workbook_id"]
    avg_load = average(load_times[workbook_id])
    p95_load = percentile(load_times[workbook_id], 0.95)
    ticket_count = ticket_counts[workbook_id]
    extract_total = extract_runs[workbook_id]["total"]
    extract_failed = extract_runs[workbook_id]["failed"]
    extract_failure_rate = extract_failed / extract_total if extract_total else 0
    owner = workbook["owner_department"]
    definition_total = definition_counts[owner]["total"]
    certified = definition_counts[owner]["certified"]
    uncertified_rate = 1 - (certified / definition_total) if definition_total else 1
    criticality_weight = 14 if workbook["business_criticality"] == "High" else 6

    risk_score = (
        avg_load * 1.15
        + p95_load * 0.35
        + ticket_count * 1.6
        + extract_failure_rate * 35
        + uncertified_rate * 22
        + criticality_weight
    )
    ranked.append({
        "workbook_id": workbook_id,
        "workbook_name": workbook["workbook_name"],
        "owner_department": workbook["owner_department"],
        "business_criticality": workbook["business_criticality"],
        "avg_load_seconds": round(avg_load, 1),
        "p95_load_seconds": round(p95_load, 1),
        "support_tickets": ticket_count,
        "extract_failure_rate": round(extract_failure_rate, 3),
        "uncertified_metric_rate": round(uncertified_rate, 3),
        "governance_risk_score": round(risk_score, 1)
    })

ranked.sort(key=lambda row: row["governance_risk_score"], reverse=True)

OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
with open(OUTPUT_PATH, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=ranked[0].keys())
    writer.writeheader()
    writer.writerows(ranked)

print("Highest Tableau publishing and performance risk")
for row in ranked[:10]:
    print(
        f"{row['workbook_id']} | {row['workbook_name']} | "
        f"risk={row['governance_risk_score']} | "
        f"avg_load={row['avg_load_seconds']}s | "
        f"p95={row['p95_load_seconds']}s | "
        f"tickets={row['support_tickets']}"
    )
print(f"Wrote {OUTPUT_PATH}")
