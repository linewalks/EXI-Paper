insert into analysis.cardio_events
    (subject_id, ts, event_id, event_value)
select 
    t1.subject_id
    , t1.ts
    , d.event_id
    , t1.event_value
from (
    select subject_id
        , admittime as ts
        , 'CONGESTIVE_HEART_FAILURE' as event_code
        , CONGESTIVE_HEART_FAILURE as event_value
    from analysis.cardio_comorbidity
    where CONGESTIVE_HEART_FAILURE > 0

    union all

    select subject_id
        , admittime as ts
        , 'CARDIAC_ARRHYTHMIAS' as event_code
        , CARDIAC_ARRHYTHMIAS as event_value
    from analysis.cardio_comorbidity
    where CARDIAC_ARRHYTHMIAS > 0

    union all

    select subject_id
        , admittime as ts
        , 'VALVULAR_DISEASE' as event_code
        , VALVULAR_DISEASE as event_value
    from analysis.cardio_comorbidity
    where VALVULAR_DISEASE > 0

    union all

    select subject_id
        , admittime as ts
        , 'PULMONARY_CIRCULATION' as event_code
        , PULMONARY_CIRCULATION as event_value
    from analysis.cardio_comorbidity
    where PULMONARY_CIRCULATION > 0

    union all

    select subject_id
        , admittime as ts
        , 'PERIPHERAL_VASCULAR' as event_code
        , PERIPHERAL_VASCULAR as event_value
    from analysis.cardio_comorbidity
    where PERIPHERAL_VASCULAR > 0

    union all

    select subject_id
        , admittime as ts
        , 'HYPERTENSION' as event_code
        , HYPERTENSION as event_value
    from analysis.cardio_comorbidity
    where HYPERTENSION > 0

    union all

    select subject_id
        , admittime as ts
        , 'PARALYSIS' as event_code
        , PARALYSIS as event_value
    from analysis.cardio_comorbidity
    where PARALYSIS > 0

    union all

    select subject_id
        , admittime as ts
        , 'OTHER_NEUROLOGICAL' as event_code
        , OTHER_NEUROLOGICAL as event_value
    from analysis.cardio_comorbidity
    where OTHER_NEUROLOGICAL > 0

    union all

    select subject_id
        , admittime as ts
        , 'CHRONIC_PULMONARY' as event_code
        , CHRONIC_PULMONARY as event_value
    from analysis.cardio_comorbidity
    where CHRONIC_PULMONARY > 0

    union all

    select subject_id
        , admittime as ts
        , 'HYPERLIPIDEMIA' as event_code
        , HYPERLIPIDEMIA as event_value
    from analysis.cardio_comorbidity
    where HYPERLIPIDEMIA > 0

    union all

    select subject_id
        , admittime as ts
        , 'DIABETES_UNCOMPLICATED' as event_code
        , DIABETES_UNCOMPLICATED as event_value
    from analysis.cardio_comorbidity
    where DIABETES_UNCOMPLICATED > 0

    union all

    select subject_id
        , admittime as ts
        , 'DIABETES_COMPLICATED' as event_code
        , DIABETES_COMPLICATED as event_value
    from analysis.cardio_comorbidity
    where DIABETES_COMPLICATED > 0

    union all

    select subject_id
        , admittime as ts
        , 'HYPOTHYROIDISM' as event_code
        , HYPOTHYROIDISM as event_value
    from analysis.cardio_comorbidity
    where HYPOTHYROIDISM > 0

    union all

    select subject_id
        , admittime as ts
        , 'RENAL_FAILURE' as event_code
        , RENAL_FAILURE as event_value
    from analysis.cardio_comorbidity
    where RENAL_FAILURE > 0

    union all

    select subject_id
        , admittime as ts
        , 'LIVER_DISEASE' as event_code
        , LIVER_DISEASE as event_value
    from analysis.cardio_comorbidity
    where LIVER_DISEASE > 0

    union all

    select subject_id
        , admittime as ts
        , 'PEPTIC_ULCER' as event_code
        , PEPTIC_ULCER as event_value
    from analysis.cardio_comorbidity
    where PEPTIC_ULCER > 0

    union all

    select subject_id
        , admittime as ts
        , 'AIDS' as event_code
        , AIDS as event_value
    from analysis.cardio_comorbidity
    where AIDS > 0

    union all

    select subject_id
        , admittime as ts
        , 'LYMPHOMA' as event_code
        , LYMPHOMA as event_value
    from analysis.cardio_comorbidity
    where LYMPHOMA > 0

    union all

    select subject_id
        , admittime as ts
        , 'METASTATIC_CANCER' as event_code
        , METASTATIC_CANCER as event_value
    from analysis.cardio_comorbidity
    where METASTATIC_CANCER > 0

    union all

    select subject_id
        , admittime as ts
        , 'SOLID_TUMOR' as event_code
        , SOLID_TUMOR as event_value
    from analysis.cardio_comorbidity
    where SOLID_TUMOR > 0

    union all

    select subject_id
        , admittime as ts
        , 'RHEUMATOID_ARTHRITIS' as event_code
        , RHEUMATOID_ARTHRITIS as event_value
    from analysis.cardio_comorbidity
    where RHEUMATOID_ARTHRITIS > 0

    union all

    select subject_id
        , admittime as ts
        , 'COAGULOPATHY' as event_code
        , COAGULOPATHY as event_value
    from analysis.cardio_comorbidity
    where COAGULOPATHY > 0

    union all

    select subject_id
        , admittime as ts
        , 'OBESITY' as event_code
        , OBESITY as event_value
    from analysis.cardio_comorbidity
    where OBESITY > 0

    union all

    select subject_id
        , admittime as ts
        , 'WEIGHT_LOSS' as event_code
        , WEIGHT_LOSS as event_value
    from analysis.cardio_comorbidity
    where WEIGHT_LOSS > 0

    union all

    select subject_id
        , admittime as ts
        , 'FLUID_ELECTROLYTE' as event_code
        , FLUID_ELECTROLYTE as event_value
    from analysis.cardio_comorbidity
    where FLUID_ELECTROLYTE > 0

    union all

    select subject_id
        , admittime as ts
        , 'BLOOD_LOSS_ANEMIA' as event_code
        , BLOOD_LOSS_ANEMIA as event_value
    from analysis.cardio_comorbidity
    where BLOOD_LOSS_ANEMIA > 0

    union all

    select subject_id
        , admittime as ts
        , 'DEFICIENCY_ANEMIAS' as event_code
        , DEFICIENCY_ANEMIAS as event_value
    from analysis.cardio_comorbidity
    where DEFICIENCY_ANEMIAS > 0

    union all

    select subject_id
        , admittime as ts
        , 'ALCOHOL_ABUSE' as event_code
        , ALCOHOL_ABUSE as event_value
    from analysis.cardio_comorbidity
    where ALCOHOL_ABUSE > 0

    union all

    select subject_id
        , admittime as ts
        , 'DRUG_ABUSE' as event_code
        , DRUG_ABUSE as event_value
    from analysis.cardio_comorbidity
    where DRUG_ABUSE > 0
  
    union all

    select subject_id
        , admittime as ts
        , 'ALCOHOL_ABUSE' as event_code
        , ALCOHOL_ABUSE as event_value
    from analysis.cardio_comorbidity
    where ALCOHOL_ABUSE > 0
      
    union all

    select subject_id
        , admittime as ts
        , 'PSYCHOSES' as event_code
        , PSYCHOSES as event_value
    from analysis.cardio_comorbidity
    where PSYCHOSES > 0
      
    union all

    select subject_id
        , admittime as ts
        , 'DEPRESSION' as event_code
        , DEPRESSION as event_value
    from analysis.cardio_comorbidity
    where DEPRESSION > 0
) t1
    join analysis.d_events d
    on d.category='comorbidity' and d.event_code=t1.event_code
;
-- 118484 rows
