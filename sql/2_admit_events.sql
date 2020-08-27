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
        , admittime as ts
        , 'admit' as category
        , case 
            when admission_type = 'URGENT' then 'urgent' 
            when admission_type = 'EMERGENCY' then 'emergency' 
            when admission_type = 'ELECTIVE' then 'elective' 
        end as event_name
        , EXTRACT(EPOCH FROM dischtime - admittime)/60.0/60.0/24.0 as event_value
    from (
        select *
        from admissions
        where admittime <= dischtime
            and admittime <= coalesce(deathtime, admittime)
    ) ad
    join ( 
        select distinct subject_id 
        from analysis.cardio_cohort
    ) t using (subject_id)
    where admission_type <> 'NEWBORN'
    group by subject_id, admittime, admission_type, dischtime, admittime

    union all

    select 
        subject_id
        , dischtime as ts
        , 'admit' as category
        , 'discharge' as event_name
        , 1 as event_value
    from (
        select *
        from admissions
        where admittime <= dischtime
            and admittime <= coalesce(deathtime, admittime)
    ) ad
    join ( 
        select distinct subject_id 
        from analysis.cardio_cohort
    ) t using (subject_id)
    where admission_type <> 'NEWBORN'
    
    union all

    select 
        subject_id
        , deathtime as ts
        , 'admit' as category
        , 'died' as event_name
        , 1 as event_value
    from (
        select *
        from admissions
        where admittime <= dischtime
            and admittime <= coalesce(deathtime, admittime)
    ) ad
    join ( 
        select distinct subject_id 
        from analysis.cardio_cohort
    ) t using (subject_id)
    where deathtime is not null
) t1
    join analysis.d_events d 
    on d.category='admit' and d.event_name=t1.event_name
;

--  subject_id |         ts          | event_name |       died_ts       | died_event 
-- ------------+---------------------+------------+---------------------+------------
--        9035 | 2110-04-25 11:18:00 | emergency(2)  | 2110-04-25 07:09:00 | died (4)
--       28883 | 2124-03-06 13:33:00 | emergency  | 2124-03-06 12:00:00 | died
--       50259 | 2184-09-15 16:58:00 | emergency  | 2184-09-15 00:01:00 | died
--       96810 | 2103-09-25 20:38:00 | emergency  | 2103-09-25 12:00:00 | died

-- delete from analysis.cardio_events where subject_id = 9035 and ts = '2110-04-25 07:09:00' and event_id = 4;
-- delete from analysis.cardio_events where subject_id = 28883 and ts = '2124-03-06 12:00:00' and event_id = 4;
-- delete from analysis.cardio_events where subject_id = 50259 and ts = '2184-09-15 00:01:00' and event_id = 4;
-- delete from analysis.cardio_events where subject_id = 96810 and ts = '2103-09-25 12:00:00' and event_id = 4;

-- update analysis.cardio_events set event_value = abs(cast(event_value as numeric)) where subject_id = 9035 and ts = '2110-04-25 11:18:00' and event_id = 2;
-- update analysis.cardio_events set event_value = abs(cast(event_value as numeric)) where subject_id = 28883 and ts = '2124-03-06 13:33:00' and event_id = 2;
-- update analysis.cardio_events set event_value = abs(cast(event_value as numeric)) where subject_id = 50259 and ts = '2184-09-15 16:58:00' and event_id = 2;
-- update analysis.cardio_events set event_value = abs(cast(event_value as numeric)) where subject_id = 96810 and ts = '2103-09-25 20:38:00' and event_id = 2;
