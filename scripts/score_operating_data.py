import csv

with open("data/synthetic_operating_data.csv", newline="") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    risk = 100 - (int(row["load_score"]) * 0.35 + int(row["freshness_score"]) * 0.3 + int(row["definition_score"]) * 0.35)
    print(f'{row["workbook"]}: governance_risk={risk:.1f}')
