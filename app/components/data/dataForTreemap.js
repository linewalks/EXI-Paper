export default {
    parents: [
        {
            colorValue: 0,
            id: 'icu_service',
            name: 'icu_service',
            value: 2
        },
        {
            colorValue: 0,
            id: 'comorbidity',
            name: 'comorbidity',
            value: 15
        },
        {
            colorValue: 0,
            id: 'procedure',
            name: 'procedure',
            value: 1
        },
        {
            colorValue: 0,
            id: 'lab',
            name: 'lab',
            value: 3
        },
        {
            colorValue: 0,
            id: 'prescription',
            name: 'prescription',
            value: 2
        },
        {
            colorValue: 0,
            id: 'icu',
            name: 'icu',
            value: 1
        },
        {
            colorValue: 0,
            id: 'diagnosis',
            name: 'diagnosis',
            value: 1
        },
    ],

    children: [
        {
            colorValue: 0.010137986
            ,
            parent: 'icu_service',
            name: 'NB',
            value: 1

        },
        {
            colorValue: 0.026493765
            ,
            parent: 'icu_service',
            name: 'PSYCH',
            value: 1

        },
        {
            colorValue: 0.002670622
            ,
            parent: 'comorbidity',
            name: 'CONGESTIVE_HEART_FAILURE',
            value: 1

        },
        {
            colorValue: 0.001823637
            ,
            parent: 'comorbidity',
            name: 'VALVULAR_DISEASE',
            value: 1

        },
        {
            colorValue: 0.002405324
            ,
            parent: 'comorbidity',
            name: 'PULMONARY_CIRCULATION',
            value: 1

        },
        {
            colorValue: 0.001829316
            ,
            parent: 'comorbidity',
            name: 'PERIPHERAL_VASCULAR',
            value: 1

        },
        {
            colorValue: 0.002659005
            ,
            parent: 'comorbidity',
            name: 'HYPERLIPIDEMIA',
            value: 1

        },
        {
            colorValue: 0.001654778
            ,
            parent: 'comorbidity',
            name: 'DIABETES_UNCOMPLICATED',
            value: 1

        },
        {
            colorValue: 0.001975459
            ,
            parent: 'comorbidity',
            name: 'DIABETES_COMPLICATED',
            value: 1

        },
        {
            colorValue: 0.001563804
            ,
            parent: 'comorbidity',
            name: 'RENAL_FAILURE',
            value: 1

        },
        {
            colorValue: 0.127736456
            ,
            parent: 'comorbidity',
            name: 'SOLID_TUMOR',
            value: 1

        },
        {
            colorValue: 0.003079987
            ,
            parent: 'comorbidity',
            name: 'RHEUMATOID_ARTHRITIS',
            value: 1

        },
        {
            colorValue: 0.004257235
            ,
            parent: 'comorbidity',
            name: 'OBESITY',
            value: 1

        },
        {
            colorValue: 0.002360774
            ,
            parent: 'comorbidity',
            name: 'WEIGHT_LOSS',
            value: 1

        },
        {
            colorValue: 0.001581572
            ,
            parent: 'comorbidity',
            name: 'FLUID_ELECTROLYTE',
            value: 1

        },
        {
            colorValue: 0.001837086
            ,
            parent: 'comorbidity',
            name: 'DEFICIENCY_ANEMIAS',
            value: 1

        },
        {
            colorValue: 0.00215716
            ,
            parent: 'comorbidity',
            name: 'DRUG_ABUSE',
            value: 1

        },
        {
            colorValue: 0.134975258
            ,
            parent: 'procedure',
            name: 'ECG',
            value: 1

        },
        {
            colorValue: 0.001644009
            ,
            parent: 'lab',
            name: 'Chemistry: % Hemoglobin A1c',
            value: 1

        },
        {
            colorValue: 0.074702218
            ,
            parent: 'lab',
            name: 'Chemistry: Cholesterol, LDL, Calculated',
            value: 1

        },
        {
            colorValue: 0.002393643
            ,
            parent: 'lab',
            name: 'Hematology: White Blood Cells',
            value: 1
        },
        {
            colorValue: 0.02154
            ,
            parent: 'prescription',
            name: 'NSAIDs',
            value: 1

        },
        {
            colorValue: 0.00757
            ,
            parent: 'prescription',
            name: 'Immunosuppressant',
            value: 1

        },
        {
            colorValue: 0.48550
            ,
            parent: 'icu',
            name: 'MICU',
            value: 1

        },
        {
            colorValue: 0.00270
            ,
            parent: 'diagnosis',
            name: 'ischemic_hd',
            value: 1

        },
    ]
}