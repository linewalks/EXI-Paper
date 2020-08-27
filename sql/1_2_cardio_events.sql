
/* create event */
drop table if exists analysis.cardio_events;
create table if not exists analysis.cardio_events (
    subject_id  integer,
    ts          timestamp,
    event_id    integer,
    event_value varchar(100)
)
;

/* create event master */
drop table if exists analysis.d_events;
create table if not exists analysis.d_events (
    event_id       SERIAL PRIMARY KEY,
    category       varchar(100) NOT NULL,
    event_code   varchar(100),
    event_name     varchar(500),
    event_unit    varchar(100),
    standard_code   varchar(100)
)
;

/* Insert event master */
insert into analysis.d_events (category, event_code, event_name, event_unit) 
values ('admit', 'urgent', 'urgent', null),
       ('admit', 'emergency', 'emergency', null),
       ('admit', 'elective', 'elective', null),
       ('admit', 'discharge', 'discharge', null),
       ('admit', 'died', 'died', null)
;

insert into analysis.d_events (category, event_code, event_name, event_unit) 
select 'icu' as category
    , CURR_CAREUNIT as event_code
    , CURR_CAREUNIT as event_name
    , null as event_unit
from (
    select distinct CURR_CAREUNIT 
    from transfers
) t
where CURR_CAREUNIT is not null
;

insert into analysis.d_events (category, event_code, event_name, event_unit) 
select 'icu_service' as category
    , curr_service as event_code
    , curr_service as event_name
    , null as event_unit
from (
    select distinct curr_service 
    from services
) t
;

-- events dictionary of drug
insert into analysis.d_events (category, event_code, event_name, event_unit) 
select 'prescription' as category
    , drug as event_code
    , drug_group as event_name
    , dose_unit_rx as event_unit
from analysis.cardio_prescription
group by drug, drug_group, dose_unit_rx
;

-- events dictionary of drug group
insert into analysis.d_events (category, event_code, event_name, event_unit) 
select 'prescription-group' as category
    , t.drug_group as event_code
    , t.drug_group as event_name
    , null as event_unit
from (
    select distinct drug_group
    from analysis.cardio_prescription
) t
;

insert into analysis.d_events (category, event_code, event_name, event_unit) 
select 'lab' as category
    , itemid as event_code
    , concat(category, ': ', label) as event_name
    , max(valueuom) as event_unit
from analysis.cardio_labevents 
group by category, itemid, label
;


/* Add ECHO, ECG event */
insert into analysis.d_events (category, event_code, event_name, event_unit)
values ('procedure', 'ECHO', 'ECHO', null),
       ('procedure', 'ECG', 'ECG', null),
       ('procedure', 'PCI', 'PCI', null),
       ('procedure', 'CABG', 'CABG', null)
;

insert into analysis.d_events 
    (category, event_code, event_name, event_unit) 
select distinct
        'diagnosis' as category
        , icd9_code as event_code
        , case 
            when (substring(icd9_code,1,4) in (
        '4280','4281','4282','4283','4284','4289') or icd9_code = '39891')
            then 'congestive_hf'
            when substring(icd9_code,1,3) in ('410')
            then 'myocardial_inf, ischemic_hd' 
            when substring(icd9_code,1,3) in ('410','411','412','413','414')
            then 'ischemic_hd'
            when substring(icd9_code,1,3) in ('425')
            then 'other_cardiomyop'
        end as event_name
      , null as event_unit
from diagnoses_icd
where (substring(icd9_code,1,4) in (
        '4280','4281','4282','4283','4284','4289') or icd9_code = '39891')
or substring(icd9_code,1,3) in ('410')
or substring(icd9_code,1,3) in ('410','411','412','413','414')
or substring(icd9_code,1,3) in ('425')
order by event_name, event_code
;

insert into analysis.d_events (category, event_code, event_name, event_unit)
values  ('comorbidity', 'CONGESTIVE_HEART_FAILURE', 'CONGESTIVE_HEART_FAILURE', null),
        ('comorbidity', 'CARDIAC_ARRHYTHMIAS', 'CARDIAC_ARRHYTHMIAS', null),
        ('comorbidity', 'VALVULAR_DISEASE', 'VALVULAR_DISEASE', null),
        ('comorbidity', 'PULMONARY_CIRCULATION', 'PULMONARY_CIRCULATION', null),
        ('comorbidity', 'PERIPHERAL_VASCULAR', 'PERIPHERAL_VASCULAR', null),
        ('comorbidity', 'HYPERTENSION', 'HYPERTENSION', null),
        ('comorbidity', 'PARALYSIS', 'PARALYSIS', null),
        ('comorbidity', 'OTHER_NEUROLOGICAL', 'OTHER_NEUROLOGICAL', null),
        ('comorbidity', 'CHRONIC_PULMONARY', 'CHRONIC_PULMONARY', null),
        ('comorbidity', 'HYPERLIPIDEMIA', 'HYPERLIPIDEMIA', null),
        ('comorbidity', 'DIABETES_UNCOMPLICATED', 'DIABETES_UNCOMPLICATED', null),
        ('comorbidity', 'DIABETES_COMPLICATED', 'DIABETES_COMPLICATED', null),
        ('comorbidity', 'HYPOTHYROIDISM', 'HYPOTHYROIDISM', null),
        ('comorbidity', 'RENAL_FAILURE', 'RENAL_FAILURE', null),
        ('comorbidity', 'LIVER_DISEASE', 'LIVER_DISEASE', null),
        ('comorbidity', 'PEPTIC_ULCER', 'PEPTIC_ULCER', null),
        ('comorbidity', 'AIDS', 'AIDS', null),
        ('comorbidity', 'LYMPHOMA', 'LYMPHOMA', null),
        ('comorbidity', 'METASTATIC_CANCER', 'METASTATIC_CANCER', null),
        ('comorbidity', 'SOLID_TUMOR', 'SOLID_TUMOR', null),
        ('comorbidity', 'RHEUMATOID_ARTHRITIS', 'RHEUMATOID_ARTHRITIS', null),
        ('comorbidity', 'COAGULOPATHY', 'COAGULOPATHY', null),
        ('comorbidity', 'OBESITY', 'OBESITY', null),
        ('comorbidity', 'WEIGHT_LOSS', 'WEIGHT_LOSS', null),
        ('comorbidity', 'FLUID_ELECTROLYTE', 'FLUID_ELECTROLYTE', null),
        ('comorbidity', 'BLOOD_LOSS_ANEMIA', 'BLOOD_LOSS_ANEMIA', null),
        ('comorbidity', 'DEFICIENCY_ANEMIAS', 'DEFICIENCY_ANEMIAS', null),
        ('comorbidity', 'ALCOHOL_ABUSE', 'ALCOHOL_ABUSE', null),
        ('comorbidity', 'DRUG_ABUSE', 'DRUG_ABUSE', null),
        ('comorbidity', 'PSYCHOSES', 'PSYCHOSES', null),
        ('comorbidity', 'DEPRESSION', 'DEPRESSION', null)
;
