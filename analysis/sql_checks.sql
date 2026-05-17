-- Workbook operating risk
select
  p.workbook_id,
  w.workbook_name,
  w.owner_department,
  w.business_criticality,
  avg(p.load_time_seconds) as avg_load_seconds,
  percentile_cont(0.95) within group (order by p.load_time_seconds) as p95_load_seconds,
  count(distinct t.ticket_id) as support_tickets
from performance_samples p
join workbooks w
  on p.workbook_id = w.workbook_id
left join support_tickets t
  on p.workbook_id = t.workbook_id
group by 1, 2, 3, 4
order by support_tickets desc, p95_load_seconds desc;

-- Extract refresh reliability by workbook
select
  e.workbook_id,
  w.workbook_name,
  count(*) as extract_runs,
  sum(case when e.run_status <> 'Success' then 1 else 0 end) as failed_runs,
  avg(e.duration_seconds) as avg_refresh_duration_seconds,
  avg(e.freshness_lag_hours) as avg_freshness_lag_hours
from extract_runs e
join workbooks w
  on e.workbook_id = w.workbook_id
group by 1, 2
having sum(case when e.run_status <> 'Success' then 1 else 0 end) > 0
order by failed_runs desc, avg_refresh_duration_seconds desc;

-- Uncertified KPI definitions by owner team
select
  owner_department,
  count(*) as total_metrics,
  sum(case when certified_flag = 'N' then 1 else 0 end) as uncertified_metrics,
  max(definition_age_days) as oldest_definition_days
from metric_definitions
group by 1
order by uncertified_metrics desc, oldest_definition_days desc;

-- Stakeholder support burden by issue type
select
  workbook_id,
  issue_type,
  count(*) as ticket_count,
  avg(resolution_hours) as avg_resolution_hours
from support_tickets
group by 1, 2
order by ticket_count desc, avg_resolution_hours desc;
