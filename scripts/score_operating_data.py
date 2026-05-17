import csv
from collections import defaultdict

load = defaultdict(list)
with open("data/performance_samples.csv", newline="") as f:
    for row in csv.DictReader(f):
        load[row["workbook_id"]].append(float(row["load_time_seconds"]))

tickets = defaultdict(int)
with open("data/support_tickets.csv", newline="") as f:
    for row in csv.DictReader(f):
        tickets[row["workbook_id"]] += 1

print("Highest governance risk workbooks")
ranked = []
for workbook_id, samples in load.items():
    avg_load = sum(samples) / len(samples)
    score = avg_load * 1.4 + tickets[workbook_id] * 0.8
    ranked.append((score, workbook_id, avg_load, tickets[workbook_id]))
for score, workbook_id, avg_load, ticket_count in sorted(ranked, reverse=True)[:10]:
    print(f"{workbook_id}: risk={score:.1f}, avg_load={avg_load:.1f}s, tickets={ticket_count}")
