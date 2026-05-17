-- Workbook operating risk
select
  p.workbook_id,
  avg(p.load_time_seconds) as avg_load_seconds,
  count(distinct t.ticket_id) as support_tickets
from performance_samples p
left join support_tickets t
  on p.workbook_id = t.workbook_id
group by 1
order by support_tickets desc, avg_load_seconds desc;

-- Uncertified KPI definitions
select
  metric_name,
  source_system,
  owner_department,
  definition_age_days
from metric_definitions
where certified_flag = 'N';
