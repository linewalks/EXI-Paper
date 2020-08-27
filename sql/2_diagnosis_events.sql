/* event dml*/
insert into analysis.cardio_events 
    (subject_id, ts, event_id, event_value)
with t as (
    select distinct
    ad.subject_id
    , admittime as ts
    , d.icd9_code
from (
    select *
    from admissions
    where admittime <= dischtime
        and admittime <= coalesce(deathtime, admittime)
    ) ad
inner join diagnoses_icd d
on ad.hadm_id = d.hadm_id
where substring(icd9_code,1,4) in (
        '4280','4281','4282','4283','4284','4289') or icd9_code = '39891'
    or substring(icd9_code,1,3) in ('410')
    or substring(icd9_code,1,3) in ('410','411','412','413','414')
    or substring(icd9_code,1,3) in ('425')
order by subject_id, admittime
)
select subject_id
     , ts
     , e.event_id
     , 1 as event_value
from t 
inner join analysis.d_events e
on t.icd9_code = e.event_code
;
-- 50746 rows inserted
