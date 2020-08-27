/* event dml*/
insert into analysis.cardio_events 
    (subject_id, ts, event_id, event_value)
select
    t1.subject_id 
    , t1.latest_date as ts
    , d.event_id
    , t1.prescription_days as event_value
from analysis.cardio_prescription t1
join analysis.d_events d
on d.category='prescription'
    and d.event_name=t1.drug_group
    and d.event_code=t1.drug
    and d.event_unit=t1.dose_unit_rx
;
-- 99417 rows inserted

insert into analysis.cardio_events 
    (subject_id, ts, event_id, event_value)
select
    t1.subject_id
    , t1.latest_date as ts
    , d.event_id
    , t1.avg_p_days as event_value
from (
    select subject_id, latest_date, drug_group, avg(prescription_days) as avg_p_days
    from analysis.cardio_prescription
    group by subject_id, latest_date, drug_group
) t1
    join analysis.d_events d
    on d.category='prescription-group'
        and d.event_name=t1.drug_group
;
-- 79860 rows inserted