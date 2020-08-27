MIMIC_SCHEMA=mimiciii
MIMIC="host=localhost dbname=mimic user=postgres port=5555 options=--search_path=$(MIMIC_SCHEMA)"
PW=PGPASSWORD=1234

etl:
	$(PW) psql $(MIMIC) -f sql/0_cardio_cohort.sql
	$(PW) psql $(MIMIC) -f sql/1_1_cardio_events_all.sql
	$(PW) psql $(MIMIC) -f sql/1_2_cardio_events.sql
	$(PW) psql $(MIMIC) -f sql/2_admit_events.sql
	$(PW) psql $(MIMIC) -f sql/2_comorbidity_events.sql
	$(PW) psql $(MIMIC) -f sql/2_diagnosis_events.sql
	$(PW) psql $(MIMIC) -f sql/2_icu_events.sql
	$(PW) psql $(MIMIC) -f sql/2_lab_events.sql
	$(PW) psql $(MIMIC) -f sql/2_prescription_events.sql
	$(PW) psql $(MIMIC) -f sql/2_procedure_events.sql
