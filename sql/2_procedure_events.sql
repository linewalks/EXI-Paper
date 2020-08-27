insert into analysis.cardio_events
    (subject_id, ts, event_id, event_value)
select 
    t1.subject_id
    , t1.ts
    , d.event_id
    , t1.event_value
from (
    select subject_id
        , charttime as ts
        , 'procedure' as category
        , procedures as event_name
        , icd9_code
        , 1 as event_value
    from analysis.cardio_procedures
) t1
    join analysis.d_events d
    on d.category='procedure' and d.event_code=t1.icd9_code
;
-- 88369 rows inserted
