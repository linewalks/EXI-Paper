/* event dml*/
insert into analysis.cardio_events 
    (subject_id, ts, event_id, event_value)
select 
    t1.subject_id
    , t1.ts
    , d.event_id
    , t1.event_value
from (
    select 
        cl.subject_id
        , cl.charttime as ts
        , 'lab' as category
        , concat(cl.category, ': ', cl.label) as event_name
        , cl.valuenum as event_value
    from analysis.cardio_labevents cl
) t1
    join analysis.d_events d 
    on d.category='lab' and d.event_name=t1.event_name
;
-- 6441439 rows inserted
