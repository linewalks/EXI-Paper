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
        subject_id
        , intime as ts
        , 'icu' as category
        , CURR_CAREUNIT as event_name
        , EXTRACT(EPOCH FROM outtime - intime)/60.0/60.0/24.0 as event_value
    from transfers
    join ( 
        select distinct subject_id 
        from analysis.cardio_cohort
    ) t using (subject_id)
    where CURR_CAREUNIT is not null and intime is not null and outtime is not null

    union all

    select 
        subject_id
        , transfertime as ts 
        , 'icu_service' as category
        , curr_service as event_name 
        , 1 as event_value
    from services
    join ( 
        select distinct subject_id 
        from analysis.cardio_cohort
    ) t using (subject_id)
    where curr_service is not null and transfertime is not null 
) t1
    join analysis.d_events d 
    on d.category in ('icu', 'icu_service') and d.event_name=t1.event_name
;
-- 72105 rows inserted
