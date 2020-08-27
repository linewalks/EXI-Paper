-- Create schema
CREATE SCHEMA IF NOT EXISTS analysis;

/* Create cohort with cardiovascular disease */
DROP TABLE IF EXISTS analysis.cardio_cohort;
CREATE TABLE IF NOT EXISTS analysis.cardio_cohort(
     subject_id     integer
     , onset_time    timestamp
     , death_time    timestamp
     , cardio_disease    varchar(50)
)
;

INSERT INTO analysis.cardio_cohort (
     subject_id
     , onset_time
     , death_time
     , cardio_disease
)
select ad.subject_id
     , min(ad.admittime) as onset_time
     , min(ad.deathtime) as death_time
     , 'congestive_hf' as cardio_disease        -- congestive heart failure
from admissions ad 
inner join diagnoses_icd d 
on ad.hadm_id = d.hadm_id
where ad.subject_id not in (
    -- rows with admittime > dischtime or admittime > deathtime are removed.
    select distinct ad.subject_id
    from admissions ad 
    inner join diagnoses_icd d 
    on ad.hadm_id = d.hadm_id
    where (substring(icd9_code,1,4) in (
        '4280','4281','4282','4283','4284','4289') or icd9_code = '39891')
    and (admittime > dischtime
        or admittime > deathtime)
    )
and (substring(icd9_code,1,4) in (
        '4280','4281','4282','4283','4284','4289') or icd9_code = '39891')
group by ad.subject_id
UNION
select ad.subject_id
     , min(ad.admittime) as onset_time
     , min(ad.deathtime) as death_time
     , 'ischemic_hd' as cardio_disease       -- ischemic heart disease
from admissions ad 
inner join diagnoses_icd d 
on ad.hadm_id = d.hadm_id
where ad.subject_id not in (
    -- rows with admittime > dischtime or admittime > deathtime are removed.
    select distinct ad.subject_id 
    from admissions ad 
    inner join diagnoses_icd d 
    on ad.hadm_id = d.hadm_id
    where substring(icd9_code,1,3) in ('410','411','412','413','414')
    and (admittime > dischtime
        or admittime > deathtime)
    )
and substring(icd9_code,1,3) in ('410','411','412','413','414')
group by ad.subject_id
UNION
select ad.subject_id
     , min(ad.admittime) as onset_time
     , min(ad.deathtime) as death_time
     , 'myocardial_inf' as cardio_disease         -- myocardial infarction
from admissions ad 
inner join diagnoses_icd d 
on ad.hadm_id = d.hadm_id
where ad.subject_id not in (
    -- rows with admittime > dischtime or admittime > deathtime are removed.
    select distinct ad.subject_id 
    from admissions ad 
    inner join diagnoses_icd d 
    on ad.hadm_id = d.hadm_id
    where substring(icd9_code,1,3) in ('410')
    and (admittime > dischtime
        or admittime > deathtime)
    )
and substring(icd9_code,1,3) in ('410')
group by ad.subject_id
UNION
select ad.subject_id          -- other cardiomyop
     , min(ad.admittime) as onset_time
     , min(ad.deathtime) as death_time
     , 'other_cardiomyop' as cardio_disease
from admissions ad 
inner join diagnoses_icd d 
on ad.hadm_id = d.hadm_id
where ad.subject_id not in (
    -- rows with admittime > dischtime or admittime > deathtime are removed.
    select distinct ad.subject_id 
    from admissions ad 
    inner join diagnoses_icd d 
    on ad.hadm_id = d.hadm_id
    where substring(icd9_code,1,3) in ('425')
    and (admittime > dischtime
        or admittime > deathtime)
    )
and substring(icd9_code,1,3) in ('425')
group by ad.subject_id
;
-- 30703 rows inserted


/* onset time of cv disease, death, survival */
DROP TABLE IF EXISTS analysis.onset_death_time;
CREATE TABLE IF NOT EXISTS analysis.onset_death_time(
     subject_id     integer
     , onset_time    timestamp
     , death_time    timestamp
     , survival_time  float
     , death          integer
     , cardio_disease varchar(50)
)
;

INSERT INTO analysis.onset_death_time(
     subject_id
     , onset_time
     , death_time
     , survival_time
     , death
     , cardio_disease
)
select subject_id
     , onset_time
     , death_time
     , (EXTRACT(EPOCH FROM death_time - onset_time))/ 60 / 60 / 24 as survival_time
     , case when death_time is not null
            then 1
            else 0
       end as death
     , cardio_disease
from analysis.cardio_cohort
where
-- exclude subject_id having negative survival_time
sign((EXTRACT(EPOCH FROM death_time - onset_time))/ 60 / 60 / 24 ) = 1   
or (EXTRACT(EPOCH FROM death_time - onset_time))/ 60 / 60 / 24  is null
;
-- 30703 rows inserted

/* demographic */
DROP TABLE IF EXISTS analysis.cardio_demographic;
CREATE TABLE IF NOT EXISTS analysis.cardio_demographic(
     id             SERIAL PRIMARY KEY
     , subject_id   integer
     , hadm_id      integer
     , admittime    timestamp
     , dob          timestamp
     , age          float
     , gender     varchar(5)
     , insurance   varchar(255)
     , language    varchar(10)
     , religion    varchar(50)
     , marital_status     varchar(50)
     , ethnicity    varchar(200)
)
;

INSERT INTO analysis.cardio_demographic (
     subject_id
     , hadm_id
     , admittime
     , dob
     , age
     , gender
     , insurance
     , language
     , religion
     , marital_status
     , ethnicity
)
select *
from (
     with agetbl as (
    select c.subject_id
         , p.dob
         , p.gender
    from patients p
    inner join analysis.cardio_cohort c
    on c.subject_id = p.subject_id
    )
     select distinct
            a.subject_id
          , ad.hadm_id
          , ad.admittime
          , a.dob
          , min(EXTRACT(EPOCH FROM ad.admittime - a.dob)/60.0/60.0/24.0/365.242) as age
          , a.gender
          , ad.insurance
          , ad.language
          , ad.religion
          , ad.marital_status
          , ad.ethnicity
      --  , a.cardio_disease
     from agetbl a
     join admissions ad
     using (subject_id)
     group by a.subject_id, ad.hadm_id, ad.admittime, a.dob, a.gender, ad.insurance, ad.language, ad.religion, ad.marital_status, ad.ethnicity
     order by subject_id, age
) t1
;
-- 26564 rows inserted


/* administration */
DROP TABLE IF EXISTS analysis.cardio_administration;
CREATE TABLE IF NOT EXISTS analysis.cardio_administration(
     id                  SERIAL PRIMARY KEY
     , subject_id        integer
     , latest_admittime  timestamp
     , urgent            integer
     , emergency         integer
     , elective          integer
     , newborn           integer
     , count_of_icustay   integer
     , period_of_icustay  float
)
;

INSERT INTO analysis.cardio_administration (
     subject_id
     , latest_admittime
     , urgent
     , emergency
     , elective
     , newborn
     , count_of_icustay
     , period_of_icustay
)
select *
from (
     with admission_timeline as (
    select distinct
           c.subject_id
         , ad.hadm_id
         , max(case when admission_type = 'URGENT'
               then 1 
               else 0
               end) as urgent
         , max(case when admission_type = 'EMERGENCY'
               then 1
               else 0
               end) as emergency
         , max(case when admission_type = 'ELECTIVE'
               then 1
               else 0
               end) as elective
         , max(case when admission_type = 'NEWBORN'
               then 1
               else 0
               end) as newborn
         , max(ad.admittime) as latest_admittime
    from admissions ad 
    inner join analysis.cardio_cohort c
    on ad.subject_id = c.subject_id
    group by c.subject_id, ad.hadm_id
     )
     , icu_timeline as (
    -- cohort is consist with patients who has diagnosed cv disease at least once.
    select subject_id
         , count(icustay_id) as count_of_icustay -- count of icu stay
         , sum(EXTRACT(EPOCH FROM (outtime - intime))/60.0/60.0/24.0) as period_of_icustay -- 전체 icu 입원 term
    from icustays 
    group by subject_id
     )
     , admission_stat as (
    select subject_id
         , max(latest_admittime) as latest_admittime
         , sum(urgent) as urgent
         , sum(emergency) as emergency
         , sum(elective) as elective
         , sum(newborn) as newborn
    from admission_timeline 
    group by subject_id
     )
     select ads.subject_id
            , ads.latest_admittime
            , ads.urgent
            , ads.emergency
            , ads.elective
            , ads.newborn
            , it.count_of_icustay
            , it.period_of_icustay
     from admission_stat ads
     left join icu_timeline it
     using (subject_id)
     order by ads.subject_id
) t1
;
-- 18411 rows inserted


/* lab events */
DROP TABLE IF EXISTS analysis.cardio_labevents;
CREATE TABLE IF NOT EXISTS analysis.cardio_labevents(
     id             SERIAL PRIMARY KEY
     , subject_id   integer
     , hadm_id      integer
     , itemid       integer
     , label        varchar(100)
     , fluid        varchar(100)
     , category     varchar(100)
     , loinc_code   varchar(100)
     , charttime    timestamp
     , valuenum     DOUBLE PRECISION
     , valueuom     varchar(20)
)
;

INSERT INTO analysis.cardio_labevents(
     subject_id
     , hadm_id
     , itemid
     , label
     , fluid
     , category
     , loinc_code
     , charttime
     , valuenum
     , valueuom
)
select le.subject_id
       , le.hadm_id
       , le.itemid
       , dl.label
       , dl.fluid
       , dl.category
       , dl.loinc_code
       , le.charttime
       , le.valuenum
       , le.valueuom
from labevents le
inner join d_labitems dl
on le.itemid = dl.itemid
where le.subject_id in (select subject_id from analysis.cardio_cohort)
and (
     le.itemid in (50912)  -- creatinine
     or le.itemid in (50905, 50906)  -- LDL-cholesterol
     or le.itemid in (50852)  -- HbA1c/ % Hemoglobin A1c
     or le.itemid in (50809, 50931)  -- fasting plasma glucose
     or le.itemid in (50889)  -- C-reactive protein
     or le.itemid in (50811, 51222)  -- hemoglobin
     or le.itemid in (50907)  -- total cholesterol
     or le.itemid in (50945)  -- Homocysteine
     or le.itemid in (51006)  -- blood urea nitrogen
     or le.itemid in (51000)  -- triglyceride
     or le.itemid in (51105)  -- uric acid
     or le.itemid in (50904)  -- HDL-cholesterol
     or le.itemid in (51265)  -- platelet
     or le.itemid in (51288)  -- Erythrocyte sedimentation rate
     or le.itemid in (51214)  -- fibrinogen
     or le.itemid in (51301)  -- white blood cell
     or le.itemid in (50963)  -- B-type Natriuretic Peptide
     or le.itemid in (51002, 51003)  -- Troponin
     or le.itemid in (50908)  -- Creatine Kinase - Muscle Brain
     or le.itemid in (50862)  -- albumin
     or le.itemid in (50821)  -- arterial pO2
     or le.itemid in (50818)  -- pCO2
     or le.itemid in (50820)  -- arterial PH
     or le.itemid in (50910)  -- CK
     or le.itemid in (51237)  -- PT (INR)/aPTT
     or le.itemid in (50885)  -- bilirubin
     or le.itemid in (51144)  -- band cells
     or le.itemid in (50863)  -- alkaline phosphatase
    )
and le.hadm_id is not null
;
-- 3583920 rows inserted


/* prescription */
DROP TABLE IF EXISTS analysis.cardio_prescription;
CREATE TABLE IF NOT EXISTS analysis.cardio_prescription(
     row_id           integer PRIMARY KEY
     , subject_id     integer
     , hadm_id        integer
     , icustay_id     integer
     , latest_date    timestamp
     , drug           varchar(100)
     , drug_group        varchar(100)
     , prod_strength     varchar(120)
     , dose_val_rx       varchar(120)
     , dose_unit_rx      varchar(120)
     , form_val_disp     varchar(120)
     , form_unit_disp    varchar(120)
     , prescription_days      float
)
;

INSERT INTO analysis.cardio_prescription (
     row_id
     , subject_id
     , hadm_id
     , icustay_id
     , latest_date
     , drug
     , drug_group
     , prod_strength
     , dose_val_rx
     , dose_unit_rx
     , form_val_disp
     , form_unit_disp
     , prescription_days
)
select *
from (
      (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'Statin' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
               , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where lower(drug) SIMILAR TO '%(atorvastatin|pitavastatin|lovastatin|simvastatin|pravastatin|fluvastatin|rosuvastatin)%' 
          group by p.row_id 
    )
    UNION ALL
     (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'P2Y12 inhibitor' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
                , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where lower(drug) SIMILAR TO '%(clopidogrel|ticlopidine|ticagrelor|prasugrel|cangrelor)%'
          group by p.row_id
    )
    UNION ALL
     (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'Aspirin' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
               , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where lower(drug) SIMILAR TO '%aspirin%'
          group by p.row_id
    )
    UNION ALL
     (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'NSAIDs' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
               , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where lower(drug) SIMILAR TO '%(celecoxib|diclofenac|diflunisal|etodolac|ibuprofen|indomethacin|ketoprofen|ketorolac|nabumetone|naproxen|oxaprozin|piroxicam|salsalate|sulindac|tolmetin)%' 
          group by p.row_id
    )
    UNION ALL
     (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'Immunosuppressant' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
               , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where lower(drug) SIMILAR TO '%(tacrolimus|cyclosporine|mycophenolate mofetil|mycophenolate sodium|azathioprine|sirolimus|prednisone)%'
          group by p.row_id
    )
    UNION ALL
     (
          select p.row_id
               , p.subject_id
               , p.hadm_id
               , p.icustay_id
               , startdate as latest_date
               , drug
               , 'Insulin' as drug_group
               , prod_strength
               , dose_val_rx
               , dose_unit_rx
               , form_val_disp
               , form_unit_disp
               , extract(EPOCH from (enddate + interval '1 day') - startdate)/60/60/24 as prescription_days
          from prescriptions p
          inner join analysis.cardio_cohort c
          on p.subject_id = c.subject_id
          where drug ilike '%(insulin)%'
          group by p.row_id
    )
) t1
where prescription_days is not null and prescription_days > 0
order by latest_date desc
;
-- exclude rows with prescription_days is negative or null
-- 99417 rows inserted

/* procedures(cardio surgery, ecg, etc.) */
DROP TABLE IF EXISTS analysis.cardio_procedures;
CREATE TABLE IF NOT EXISTS analysis.cardio_procedures (
     id             SERIAL PRIMARY KEY
     , subject_id     integer
     , hadm_id        integer
     , charttime      timestamp
     , procedures     varchar(300)
     , icd9_code       varchar(10)
)
;


/* PCI */
INSERT INTO analysis.cardio_procedures (
     subject_id
     , hadm_id
     , charttime
     , procedures
     , icd9_code
)
with tmp as (
    select subject_id, hadm_id
    from procedures_icd 
    where icd9_code in ('0063', '0064', '0065', 
                        '0055', '0060', '3606', '3607')
)
select nte.subject_id, nte.hadm_id, nte.charttime, 'PCI' as procedures, 'PCI' as icd9_code
from noteevents nte 
    join tmp on nte.hadm_id = tmp.hadm_id and nte.subject_id = tmp.subject_id
where nte.description ilike '%stent%'
and nte.subject_id in (
     select subject_id
     from analysis.cardio_cohort
)
;
-- 9 rows

/* CABG */
INSERT INTO analysis.cardio_procedures (
     subject_id
     , hadm_id
     , charttime
     , procedures
     , icd9_code
)
with tmp as (
    select subject_id, hadm_id, max(TRANSFERTIME) as charttime 
    from services 
    where curr_service = 'CSURG' -- Cardiac Surgery - for surgical cardiac admissions
    group by subject_id, hadm_id
)
select c.subject_id, c.hadm_id, tmp.charttime, 'CABG' as procedures, 'CABG' as icd9_code
from procedures_icd c 
     join admissions a on a.subject_id = c.subject_id and a.hadm_id = c.hadm_id
     join tmp on c.subject_id = tmp.subject_id and c.hadm_id = tmp.hadm_id
where c.icd9_code between '3610' and '3617'
and a.admittime < tmp.charttime -- filter out abnormal timestamp
and c.subject_id in (
     select subject_id
     from analysis.cardio_cohort
)
;
-- 6175 rows

/* ECHO and ECG/EKG */
INSERT INTO analysis.cardio_procedures (
      subject_id
      , hadm_id
      , charttime
      , procedures
      , icd9_code
)
select nte.subject_id
       , nte.hadm_id
       , nte.chartdate as charttime
       , CASE WHEN nte.category like '%Echo%' THEN 'ECHO'
              WHEN nte.category like '%ECG%' THEN 'ECG'
              ELSE nte.category 
         END as procedures
       , CASE WHEN nte.category like '%Echo%' THEN 'ECHO'
              WHEN nte.category like '%ECG%' THEN 'ECG'
              ELSE nte.category 
         END as icd9_code
from noteevents nte
join admissions adm
using (hadm_id)
where (nte.category like '%Echo%' or nte.category like '%ECG%')
and cast(nte.chartdate as DATE) > cast(adm.admittime as DATE)
and nte.hadm_id is not null
and nte.subject_id in (
     select subject_id
     from analysis.cardio_cohort
)
;
-- 82185 rows

-- reference : https://github.com/MIT-LCP/mimic-code/blob/ddd4557423c6b0505be9b53d230863ef1ea78120/concepts/comorbidity/elixhauser-ahrq-v37-with-drg.sql

DROP MATERIALIZED VIEW IF EXISTS analysis.cardio_comorbidity CASCADE;
CREATE MATERIALIZED VIEW analysis.cardio_comorbidity AS
with icd as
(
  select hadm_id, seq_num, icd9_code
  from diagnoses_icd
  where seq_num != 1 -- we do not include the primary icd-9 code
)
, eliflg as
(
select hadm_id, seq_num, icd9_code
, CASE
  when icd9_code in ('39891','40201','40211','40291','40401','40403','40411','40413','40491','40493') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('4254','4255','4257','4258','4259') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('428') then 1
  else 0 end as CHF       /* Congestive heart failure */

, CASE
  when icd9_code in ('42613','42610','42612','99601','99604') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('4260','4267','4269','4270','4271','4272','4273','4274','4276','4278','4279','7850','V450','V533') then 1
  else 0 end as ARRHY

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('0932','7463','7464','7465','7466','V422','V433') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('394','395','396','397','424') then 1
  else 0 end as VALVE     /* Valvular disease */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('4150','4151','4170','4178','4179') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('416') then 1
  else 0 end as PULMCIRC  /* Pulmonary circulation disorder */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('0930','4373','4431','4432','4438','4439','4471','5571','5579','V434') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('440','441') then 1
  else 0 end as PERIVASC  /* Peripheral vascular disorder */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in ('401') then 1
  else 0 end as HTN       /* Hypertension, uncomplicated */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in ('402','403','404','405') then 1
  else 0 end as HTNCX     /* Hypertension, complicated */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('3341','3440','3441','3442','3443','3444','3445','3446','3449') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('342','343') then 1
  else 0 end as PARA      /* Paralysis */

, CASE
  when icd9_code in ('33392') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('3319','3320','3321','3334','3335','3362','3481','3483','7803','7843') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('334','335','340','341','345') then 1
  else 0 end as NEURO     /* Other neurological */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('4168','4169','5064','5081','5088') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('490','491','492','493','494','495','496','500','501','502','503','504','505') then 1
  else 0 end as CHRNLUNG  /* Chronic pulmonary disease */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in ('272') then 1
  else 0 end as HYPERLIPID        /* hypercholesterolemia */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2500','2501','2502','2503') then 1
  else 0 end as DM        /* Diabetes w/o chronic complications*/

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2504','2505','2506','2507','2508','2509') then 1
  else 0 end as DMCX      /* Diabetes w/ chronic complications */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2409','2461','2468') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('243','244') then 1
  else 0 end as HYPOTHY   /* Hypothyroidism */

, CASE
  when icd9_code in ('40301','40311','40391','40402','40403','40412','40413','40492','40493') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('5880','V420','V451') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('585','586','V56') then 1
  else 0 end as RENLFAIL  /* Renal failure */

, CASE
  when icd9_code in ('07022','07023','07032','07033','07044','07054') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('0706','0709','4560','4561','4562','5722','5723','5724','5728','5733','5734','5738','5739','V427') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('570','571') then 1
  else 0 end as LIVER     /* Liver disease */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('5317','5319','5327','5329','5337','5339','5347','5349') then 1
  else 0 end as ULCER     /* Chronic Peptic ulcer disease (includes bleeding only if obstruction is also present) */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in ('042','043','044') then 1
  else 0 end as AIDS      /* HIV and AIDS */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2030','2386') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('200','201','202') then 1
  else 0 end as LYMPH     /* Lymphoma */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in ('196','197','198','199') then 1
  else 0 end as METS      /* Metastatic cancer */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 3) in
  (
     '140','141','142','143','144','145','146','147','148','149','150','151','152'
    ,'153','154','155','156','157','158','159','160','161','162','163','164','165'
    ,'166','167','168','169','170','171','172','174','175','176','177','178','179'
    ,'180','181','182','183','184','185','186','187','188','189','190','191','192'
    ,'193','194','195'
  ) then 1
  else 0 end as TUMOR     /* Solid tumor without metastasis */

, CASE
  when icd9_code in ('72889','72930') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('7010','7100','7101','7102','7103','7104','7108','7109','7112','7193','7285') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('446','714','720','725') then 1
  else 0 end as ARTH              /* Rheumatoid arthritis/collagen vascular diseases */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2871','2873','2874','2875') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('286') then 1
  else 0 end as COAG      /* Coagulation deficiency */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2780') then 1
  else 0 end as OBESE     /* Obesity      */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('7832','7994') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('260','261','262','263') then 1
  else 0 end as WGHTLOSS  /* Weight loss */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2536') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('276') then 1
  else 0 end as LYTES     /* Fluid and electrolyte disorders */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2800') then 1
  else 0 end as BLDLOSS   /* Blood loss anemia */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2801','2808','2809') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('281') then 1
  else 0 end as ANEMDEF  /* Deficiency anemias */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2652','2911','2912','2913','2915','2918','2919','3030','3039','3050','3575','4255','5353','5710','5711','5712','5713','V113') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('980') then 1
  else 0 end as ALCOHOL /* Alcohol abuse */

, CASE
  when icd9_code in ('V6542') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('3052','3053','3054','3055','3056','3057','3058','3059') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('292','304') then 1
  else 0 end as DRUG /* Drug abuse */

, CASE
  when icd9_code in ('29604','29614','29644','29654') then 1
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2938') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('295','297','298') then 1
  else 0 end as PSYCH /* Psychoses */

, CASE
  when SUBSTRING(icd9_code FROM 1 for 4) in ('2962','2963','2965','3004') then 1
  when SUBSTRING(icd9_code FROM 1 for 3) in ('309','311') then 1
  else 0 end as DEPRESS  /* Depression */
from icd
)
-- collapse the icd9_code specific flags into hadm_id specific flags
-- this groups comorbidities together for a single patient admission
, eligrp as
(
  select hadm_id
  , max(chf) as chf
  , max(arrhy) as arrhy
  , max(valve) as valve
  , max(pulmcirc) as pulmcirc
  , max(perivasc) as perivasc
  , max(htn) as htn
  , max(htncx) as htncx
  , max(para) as para
  , max(neuro) as neuro
  , max(chrnlung) as chrnlung
  , max(hyperlipid) as hyperlipid
  , max(dm) as dm
  , max(dmcx) as dmcx
  , max(hypothy) as hypothy
  , max(renlfail) as renlfail
  , max(liver) as liver
  , max(ulcer) as ulcer
  , max(aids) as aids
  , max(lymph) as lymph
  , max(mets) as mets
  , max(tumor) as tumor
  , max(arth) as arth
  , max(coag) as coag
  , max(obese) as obese
  , max(wghtloss) as wghtloss
  , max(lytes) as lytes
  , max(bldloss) as bldloss
  , max(anemdef) as anemdef
  , max(alcohol) as alcohol
  , max(drug) as drug
  , max(psych) as psych
  , max(depress) as depress
from eliflg
group by hadm_id
)
-- now merge these flags together to define elixhauser
-- most are straightforward.. but hypertension flags are a bit more complicated
select 
adm.subject_id
, adm.hadm_id
, adm.admittime
, sum(chf) as CONGESTIVE_HEART_FAILURE
, sum(arrhy) as CARDIAC_ARRHYTHMIAS
, sum(valve) as VALVULAR_DISEASE
, sum(pulmcirc) as PULMONARY_CIRCULATION
, sum(perivasc) as PERIPHERAL_VASCULAR
-- we combine "htn" and "htncx" into "HYPERTENSION"
, sum(case
    when htn = 1 then 1
    when htncx = 1 then 1
  else 0 end) as HYPERTENSION
, sum(para) as PARALYSIS
, sum(neuro) as OTHER_NEUROLOGICAL
, sum(chrnlung) as CHRONIC_PULMONARY
, sum(hyperlipid) as HYPERLIPIDEMIA
-- only the more severe comorbidity (complicated diabetes) is kept
, sum(case
    when dmcx = 1 then 0
    when dm = 1 then 1
  else 0 end) as DIABETES_UNCOMPLICATED
, sum(dmcx) as DIABETES_COMPLICATED
, sum(hypothy) as HYPOTHYROIDISM
, sum(renlfail) as RENAL_FAILURE
, sum(liver) as LIVER_DISEASE
, sum(ulcer) as PEPTIC_ULCER
, sum(aids) as AIDS
, sum(lymph) as LYMPHOMA
, sum(mets) as METASTATIC_CANCER
-- only the more severe comorbidity (metastatic cancer) is kept
, sum(case
    when mets = 1 then 0
    when tumor = 1 then 1
  else 0 end) as SOLID_TUMOR
, sum(arth) as RHEUMATOID_ARTHRITIS
, sum(coag) as COAGULOPATHY
, sum(obese) as OBESITY
, sum(wghtloss) as WEIGHT_LOSS
, sum(lytes) as FLUID_ELECTROLYTE
, sum(bldloss) as BLOOD_LOSS_ANEMIA
, sum(anemdef) as DEFICIENCY_ANEMIAS
, sum(alcohol) as ALCOHOL_ABUSE
, sum(drug) as DRUG_ABUSE
, sum(psych) as PSYCHOSES
, sum(depress) as DEPRESSION

from admissions adm
join analysis.cardio_cohort c on adm.subject_id = c.subject_id
left join eligrp eli
  on adm.hadm_id = eli.hadm_id
group by adm.subject_id, adm.hadm_id, adm.admittime;
-- 26564 rows
