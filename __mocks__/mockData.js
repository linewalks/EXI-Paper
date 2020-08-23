export const userInfoData = {
  access_token: '',
  email: 'han@linewalks.com',
  name: 'han',
  organization: {
    id: 1,
    name: 'Linewalks',
  },
  role: {
    id: 3,
    name: 'Administrator',
  },
  refresh_token: '',
}

export const userInfoChangeData = {
  access_token: '',
  email: 'lee@linewalks.com',
  name: 'lee',
  organization: {
    id: 1,
    name: 'linewalks',
  },
  role: {
    id: 3,
    name: 'Administrator',
  },
  refresh_token: '',
}

export const pathway = {
  data: {
    nodes: [
      { name: 'Ischemic Heart Disease' },
      { name: 'Admission' },
      { name: 'Death' },
      { name: 'Follow-up stopped' },
    ],
    links: [
      { source: 'Ischemic Heart Disease', target: 'Follow-up stopped', value: 21654 },
      { source: 'Ischemic Heart Disease', target: 'Admission', value: 16598 },
      { source: 'Ischemic Heart Disease', target: 'Death', value: 872 },
      { source: 'Admission', target: 'Death', value: 662 },
    ],
  },
  selected_list: ['Ischemic Heart Disease', 'Admission', 'Death'],
}

export const events = {
  events: [
    {
      name: 'Follow-up Patients',
      value: 24764,
    },
    {
      name: 'High Risk Patients',
      value: 16,
    },
    {
      name: 'A.I. Analysis Features',
      value: 780,
    },
    {
      name: 'Total Patients',
      value: 572811,
    },
  ],
}

export const patientList = {
  headers: [
    { id: 'subjectId', label: 'Subject Id' },
    { id: 'diagnosis', label: 'Diagnosis' },
    { id: 'riskScore', label: 'Risk Score' },
    { id: 'death', label: 'Death' },
    { id: 'latestAdmission', label: 'Latest Admission' },
  ],
  rowData: [
    {
      death: false,
      diagnosis: 'this is test value',
      latestAdmission: '2016-10-20T00:00:00+00:00',
      riskScore: 0.1,
      subjectId: 6098,
    },
    {
      death: false,
      diagnosis: 'Unstable angina',
      latestAdmission: '2016-10-12T16:00:00+00:00',
      riskScore: 0.00383806,
      subjectId: 12407,
    },
    {
      death: false,
      diagnosis: 'Infective myositis, lower leg, Pyomyositis',
      latestAdmission: '2016-11-16T16:52:00+00:00',
      riskScore: 0.0941566,
      subjectId: 15297,
    },
    {
      death: false,
      diagnosis: 'Other and unspecified congestive heart failure, Peripheral artery occlusive disease involving arteries below knee, Aspiration pneumonia, Ischemic cardiomyopathy, Heart failure, Chronic kidney disease, unspecified, Acute renal failure, Dyspnea, Gait disorder (disturbance )',
      latestAdmission: '2016-10-19T08:13:00+00:00',
      riskScore: 0.0756355,
      subjectId: 16021,
    },
    {
      death: false,
      diagnosis: 'Other and unspecified congestive heart failure, Peripheral artery occlusive disease involving arteries below knee, Aspiration pneumonia, Ischemic cardiomyopathy, Heart failure, Chronic kidney disease, unspecified, Acute renal failure, Dyspnea, Gait disorder (disturbance )',
      latestAdmission: '2016-10-19T08:13:00+00:00',
      riskScore: 0.0,
      subjectId: 16021,
    },
    {
      death: false,
      diagnosis: 'GB stone, Dilated cardiomyopathy, Congestive heart failure, Dilated cardiomyopathy',
      latestAdmission: '2016-06-30T18:49:00+00:00',
      riskScore: 0.0393616,
      subjectId: 16627,
    },
    {
      death: false,
      diagnosis: 'GB stone, Dilated cardiomyopathy, Congestive heart failure, Dilated cardiomyopathy',
      latestAdmission: '2016-06-30T18:49:00+00:00',
      riskScore: 1.16229e-06,
      subjectId: 16627,
    },
    {
      death: false,
      diagnosis: 'Angina pectoris, Angina pectoris, Angina pectoris, Angina pectoris, unspecified',
      latestAdmission: '2016-10-12T19:19:00+00:00',
      riskScore: 0.0554558,
      subjectId: 20807,
    },
    {
      death: true,
      diagnosis: 'Angina pectoris, Angina pectoris, Angina pectoris, Angina pectoris, unspecified',
      latestAdmission: '2016-10-12T19:19:00+00:00',
      riskScore: 0.162624,
      subjectId: 20807,
    },
    {
      death: true,
      diagnosis: 'Angina pectoris, Angina pectoris, Angina pectoris, Angina pectoris, unspecified',
      latestAdmission: '2016-10-12T19:19:00+00:00',
      riskScore: 8.9407e-08,
      subjectId: 20807,
    },
  ],
  totalRows: 200,
}

export const patients = {
  administration: {
    priorCardiacSurgery: false,
    priorHospitalization: 0,
  },
  age: '95yr',
  birth: '192412',
  comorbidity: {
    diabetes: false,
    myocardialInfarction: false,
    stroke: false,
  },
  gender: 'F',
  height: '156.0cm',
  latestAdmission: '2016-10-20T00:00:00+00:00',
  latestDiagnosis: 'this is test value',
  riskScore: 0.1,
  subjectId: 6098,
  weight: '48kg',
}


export const lab = {
  headers: [
    'Datetime',
    'Code',
    'Name',
    'Value',
    'Unit',
  ],
  rowData: [
    {
      Code: 'L3061',
      Datetime: '2016-09-21T11:34:00+00:00',
      Name: 'CK',
      Unit: 'IU/L',
      Value: '20',
    },
  ],
}

export const echo = {
  headers: [
    'Datetime',
    'LIDS',
    'LIDD',
    'LPWS',
    'LPWD',
    'IVSS',
    'IVSD',
    'LAMM',
  ],
  rowData: [
    {
      Datetime: '2019-07-01T08:20:00+00:00',
      IVSD: 10.0,
      IVSS: 13.0,
      LAMM: 50.0,
      LIDD: 58.0,
      LIDS: 41.0,
      LPWD: 8.0,
      LPWS: 13.0,
    },
  ],
}

export const spect = {
  headers: [
    'Datetime',
    'NUCLIDE',
    'RADIDOSE',
    'CAMERA',
    'STRESS_DRUG',
    'BULLS_EYE',
    'SSS',
    'SRS',
    'SDS',
    'EDV',
    'ESV',
    'LVEF',
    'SMS',
    'STS',
  ],
  rowData: [
    {
      BULLS_EYE: 'ABNORMAL',
      CAMERA: null,
      Datetime: '2019-07-01T08:20:00+00:00',
      EDV: '66',
      ESV: '25',
      LVEF: '66',
      NUCLIDE: 'abcd',
      RADIDOSE: 1.2,
      SDS: '4',
      SMS: '1',
      SRS: '1',
      SSS: '5',
      STRESS_DRUG: '135',
      STS: '2',
    },
  ],
}

export const riskLine = {
  avg: 0.026205212,
  first: 0.0894789,
  last: 0.0083496,
  max: 0.0894789,
  min: 0.0,
  scale: {
    end: '2017-05-14T00:00:00+00:00',
    start: '2016-09-21T00:00:00+00:00',
  },
  scores: {
    hadmIds: [4, 6, 8, 9, 10],
    x: {
      data: [
        '2016-09-21T11:34:00',
        '2016-10-19T16:00:00',
        '2016-10-20T13:00:00',
        '2016-10-20T15:21:00',
        '2016-11-10T14:15:00',
      ],
      name: 'Date',
    },
    y: {
      data: [
        0.0894789,
        0.00859076,
        0.0246068,
        0.0,
        0.0083496,
      ],
      name: 'MACE Risk Scores',
    },
  },
}


export const summary = {
  age: '94ys',
  birth: '1924.12',
  latestOperation: 'PCI',
  gender: 'F',
  height: '156.0cm',
  latestDiagnosis: 'Heart failure, ',
  latestVisit: '2016-11-10',
  operationDate: '2016-09-23',
  subjectId: 6098,
  visitCount: 6,
  weight: '48kg',
}

export const timeline = {
  data: [
    {
      dataPoints: [
        {
          endTime: '2016-10-03T00:00:00+00:00',
          startTime: '2016-09-21T01:05:00+00:00',
        },
        {
          endTime: '2016-10-19T16:00:00+00:00',
          startTime: '2016-10-19T16:00:00+00:00',
        },
        {
          endTime: '2016-10-20T13:00:00+00:00',
          startTime: '2016-10-20T13:00:00+00:00',
        },
        {
          endTime: '2017-03-21T00:00:00+00:00',
          startTime: '2016-10-20T15:21:00+00:00',
        },
      ],
      label: [
        'Hospitalization',
      ],
      order: 0,
    },
    {
      dataPoints: [
        {
          endTime: '2017-05-14T00:00:00+00:00',
          startTime: '2017-05-14T00:00:00+00:00',
        },
      ],
      label: [
        'Death',
      ],
      order: 1,
    },
    {
      dataPoints: [
        {
          endTime: '2016-09-23T00:00:00+00:00',
          startTime: '2016-09-23T00:00:00+00:00',
        },
      ],
      label: [
        'CABG/PCI',
      ],
      order: 2,
    },
    {
      dataPoints: [
        {
          endTime: '2017-01-22T00:00:00+00:00',
          startTime: '2016-09-21T00:00:00+00:00',
        },
      ],
      label: [
        'Statin',
      ],
      order: 3,
    },
    {
      dataPoints: [
        {
          endTime: '2017-01-22T00:00:00+00:00',
          startTime: '2016-09-21T00:00:00+00:00',
        },
      ],
      label: [
        'P2Y12 inhibitor',
      ],
      order: 4,
    },
    {
      dataPoints: [],
      label: [
        'NSAIDs',
      ],
      order: 5,
    },
    {
      dataPoints: [
        {
          endTime: '2017-01-22T00:00:00+00:00',
          startTime: '2016-09-21T00:00:00+00:00',
        },
      ],
      label: [
        'Aspirin',
      ],
      order: 6,
    },
    {
      dataPoints: [
        {
          endTime: '2016-11-16T00:00:00+00:00',
          startTime: '2016-11-15T00:00:00+00:00',
        },
      ],
      label: [
        'Insulin',
      ],
      order: 7,
    },
    {
      dataPoints: [
        {
          endTime: '2016-10-25T00:00:00+00:00',
          startTime: '2016-10-24T00:00:00+00:00',
        },
        {
          endTime: '2016-11-25T00:00:00+00:00',
          startTime: '2016-11-15T00:00:00+00:00',
        },
        {
          endTime: '2016-11-29T00:00:00+00:00',
          startTime: '2016-11-28T00:00:00+00:00',
        },
      ],
      label: [
        'Immunosuppressants',
      ],
      order: 8,
    },
  ],
  scale: {
    end: '2017-05-14T00:00:00+00:00',
    start: '2016-09-21T00:00:00+00:00',
  },
}

export const histogram = {
  avgRisk: 0.03339639250681819,
  kind: 'histogram',
  patientRisk: 0.282933,
  numberOfPatients: 1000,
  risks: [
    5.7146e-05,
    9.68575e-07,
    0.000169203,
    0.0,
    0.082933,
    0.0,
    0.010398,
    0.118135,
    0.060276,
    0.08473,
    0.010661,
    0.216,
    0.235,
    0.244,
    0.298,
    0.299,
  ],
}

export const weight = [
  { variable: 'visit_info AGEM', weight: 1 },
  { variable: 'cabgpci CABG', weight: 0 },
  { variable: 'cabgpci PCI', weight: 0 },
  { variable: 'cabgpci CABG 7d', weight: 0 },
  { variable: 'cabgpci PCI 7d', weight: 0 },
  { variable: 'cabgpci CABG 14d', weight: 0 },
  { variable: 'cabgpci PCI 14d', weight: 0 },
  { variable: 'cabgpci CABG 30d', weight: 0 },
  { variable: 'cabgpci PCI 30d', weight: 0 },
  { variable: 'cabgpci CABG 60d', weight: 0 },
]

export const radar = {
  groupVariableWeights: {
    variables: [
      'visit_info',
      'visit_history',
      'lab',
      'echo',
      'drug',
      'spect',
      'demo',
      'comorbidity',
      'cabgpci',
      'vitalsign',
    ],
    weights: [
      0.1767,
      0.21289999999999998,
      0.2940999999999999,
      0.15789999999999998,
      0.12090000000000001,
      0.0344,
      0.0012,
      0.0016,
      0,
      0,
    ],
  },
  patientVariableWeights: {
    variables: [
      'visit_info',
      'visit_history',
      'lab',
      'echo',
      'drug',
      'spect',
      'demo',
      'comorbidity',
      'cabgpci',
      'vitalsign',
    ],
    weights: [
      0.8091,
      0.12,
      0.0367,
      0.0342,
      0,
      0,
      0,
      0,
      0,
      0,
    ],
  },
}

export const pathwayData = {
  data: [
    {
      startTime: '2000-01-01T00:00:00+00:00',
      endTime: '2000-05-17T14:24:00+14:24',
      name: 'Patient',
    },
    {
      startTime: '2000-01-01T00:00:00+00:00',
      endTime: '2002-11-23T21:36:00+21:36',
      name: 'Group',
    },
  ],
};

export const treeMap = {
  parents: [
    {
      colorValue: 0,
      id: 'A',
      name: 'A',
      value: 3,
    },
    {
      colorValue: 0,
      id: 'B',
      name: 'B',
      value: 9,
    },
    {
      colorValue: 0,
      id: 'C',
      name: 'C',
      value: 17,
    },
  ],
  children: [
    {
      colorValue: 0,
      name: 'CA1',
      parent: 'A',
      value: 4,
    },
    {
      colorValue: 0,
      name: 'CA2',
      parent: 'A',
      value: 34,
    },
    {
      colorValue: 0,
      name: 'CA3',
      parent: 'A',
      value: 14,
    },
    {
      colorValue: 0,
      name: 'BBA1',
      parent: 'B',
      value: 48,
    },
    {
      colorValue: 0,
      name: 'BBA2',
      parent: 'B',
      value: 81,
    },
    {
      colorValue: 0,
      name: 'BBA3',
      parent: 'B',
      value: 65,
    },
    {
      colorValue: 0,
      name: 'CBE1',
      parent: 'C',
      value: 29,
    },
    {
      colorValue: 0,
      name: 'CBE2',
      parent: 'C',
      value: 99,
    },
    {
      colorValue: 0,
      name: 'CBE3',
      parent: 'C',
      value: 75,
    },
  ],
}

export const organizationList = {
  organization: [
    {
      id: 1,
      name: 'Linewalks',
    },
    {
      id: 2,
      name: 'Asan Medical Center(CV)',
    },
    {
      id: 3,
      name: 'Ulsan University Hospital',
    },
    {
      id: 4,
      name: 'Chonnam National University Hospital',
    },
  ],
  total_length: 4,
}

export const organizationData = {
  organization: [
    {
      id: 2,
      name: 'Asan Medical Center(CV)',
      data_source: 'amc',
    },
    {
      id: 3,
      name: 'Ulsan University Hospital',
      data_source: 'uuh',
    },
    {
      id: 4,
      name: 'Chonnam National University Hospital',
      data_source: 'cnuh',
    },
    {
      id: 5,
      name: 'MIMIC-III',
      data_source: 'mimiccdm',
    }
  ],
  total_length: 4,
}

export const logout = {
  msg: 'Successfully logged out.',
  msgId: 'u010',
}


export const changePassword = {
  msg: 'Password has changed.',
  msgId: 'u010',
}

export const uuhPatientList = {
  headers: [
    { id: 'subjectId', label: 'Subject Id' },
    { id: 'diagnosis', label: 'Diagnosis' },
    { id: 'riskScore', label: 'Risk Score' },
    { id: 'latestAdmission', label: 'Latest Admission' },
  ],
  rowData: [
    {
      diagnosis: 'N183',
      latestAdmission: '2019-05-27T00:00:00+00:00',
      riskScore: 0.00259671,
      subjectId: 204,
    },
    {
      diagnosis: 'K0539',
      latestAdmission: '2013-05-15T00:00:00+00:00',
      riskScore: 0.00299034,
      subjectId: 253,
    },
    {
      diagnosis: 'I219A',
      latestAdmission: '2019-06-05T00:00:00+00:00',
      riskScore: 0.00236527,
      subjectId: 264,
    },
    {
      diagnosis: 'C1620',
      latestAdmission: '2018-06-05T00:00:00+00:00',
      riskScore: 0.00315442,
      subjectId: 513,
    },
    {
      diagnosis: 'C220',
      latestAdmission: '2013-11-30T00:00:00+00:00',
      riskScore: 0.0156327,
      subjectId: 540,
    },
    {
      diagnosis: 'F341D',
      latestAdmission: '2019-04-15T00:00:00+00:00',
      riskScore: 0.00275496,
      subjectId: 568,
    },
    {
      diagnosis: 'I200',
      latestAdmission: '2018-10-12T00:00:00+00:00',
      riskScore: 0.00402449,
      subjectId: 717,
    },
    {
      diagnosis: 'R99C',
      latestAdmission: '2016-07-13T00:00:00+00:00',
      riskScore: 0.00427144,
      subjectId: 808,
    },
    {
      diagnosis: 'I200',
      latestAdmission: '2019-08-12T00:00:00+00:00',
      riskScore: 0.00313497,
      subjectId: 916,
    },
    {
      diagnosis: 'K862',
      latestAdmission: '2019-05-27T00:00:00+00:00',
      riskScore: 0.0028785,
      subjectId: 1002,
    },
  ],
  totalRows: 15,
}

export const uuhPatients = {
  administration: {
    priorCardiacSurgery: false,
    priorHospitalization: 136,
  },
  age: '75yr',
  birth: '1943.11',
  comorbidity: {
    diabetes: false,
    myocardialInfarction: false,
    stroke: false,
  },
  gender: 'M',
  height: '164.9cm',
  latestAdmission: '2019-05-27T00:00:00+00:00',
  latestDiagnosis: 'N183',
  riskScore: 0.4,
  subjectId: 204,
  weight: '64kg',
}

export const uuhEvents = {
  events: [
    {
      name: 'Follow-up Patients',
      value: 8572,
    },
    {
      name: 'High Risk Patients',
      value: 8554,
    },
    {
      name: 'A.I. Analysis Features',
      value: 3509,
    },
    {
      name: 'Total Patients',
      value: 10554,
    },
  ],
}

export const uuhSummary = {
  age: '75ys',
  birth: '1943.11',
  latestOperation: '-',
  gender: 'N',
  height: '164.9cm',
  latestDiagnosis: 'N183',
  latestVisit: '2019-05-27',
  operationDate: '2019-05-27',
  subjectId: 204,
  visitCount: 136,
  weight: '64kg',
}

export const uuhWeight = [
  { variable: 'visit_info', weight: 0.0002 },
  { variable: 'physical', weight: -0.0009 },
  { variable: 'demographic', weight: -0.0002 },
  { variable: 'visit_history', weight: -0.0016 },
  { variable: 'diagnosis', weight: -0.0001 },
  { variable: 'medication', weight: -0.0003 },
  { variable: 'lab', weight: 0 },
  { variable: 'op_summay', weight: 0 },
  { variable: 'echo', weight: 0 },
  { variable: 'trans', weight: 0 },
]

export const uuhRiskLine = {
  avg: 0,
  first: 0,
  last: 0,
  max: 0.01,
  min: 0,
  scale: {
    end: '2020-04-16T00:00:00+00:00',
    start: '1999-08-10T00:00:00+00:00',
  },
  scores: {
    hadmIds: [1, 2, 3, 5, 8, 9, 11, 12, 13, 14, 15],
    x: {
      data: [
        '2000-01-03T11:34:00',
        '2000-01-10T16:00:00',
        '2001-01-21T13:00:00',
        '2002-07-10T15:21:00',
        '2003-12-29T14:15:00',
      ],
      name: 'Date',
    },
    y: {
      data: [
        0,
        0,
        0.1,
        0.01,
        0.01,
      ],
      name: 'MACE Risk Scores',
    },
  },
}

export const uuhTimeline = {
  data: [
    {
      dataPoints: [
        {
          endTime: '2000-10-03T00:00:00+00:00',
          startTime: '2000-09-21T01:05:00+00:00',
        },
        {
          endTime: '2002-10-19T16:00:00+00:00',
          startTime: '2002-10-19T16:00:00+00:00',
        },
        {
          endTime: '2004-10-20T13:00:00+00:00',
          startTime: '2004-10-20T13:00:00+00:00',
        },
        {
          endTime: '2017-03-21T00:00:00+00:00',
          startTime: '2016-10-20T15:21:00+00:00',
        },
      ],
      label: [
        'Hospitalization',
      ],
      order: 0,
    },
    {
      dataPoints: [],
      label: [
        'Death',
      ],
      order: 1,
    },
    {
      dataPoints: [],
      label: [
        'CABG/PCI',
      ],
      order: 2,
    },
    {
      dataPoints: [
        {
          endTime: '2019-11-23T00:00:00+00:00',
          startTime: '2019-05-27T00:00:00+00:00',
        },
      ],
      label: [
        'Statin',
      ],
      order: 3,
    },
    {
      dataPoints: [
        {
          endTime: '2013-08-28T00:00:00+00:00',
          startTime: '2013-08-27T00:00:00+00:00',
        },
      ],
      label: [
        'P2Y12 inhibitor',
      ],
      order: 4,
    },
    {
      dataPoints: [{
        endTime: '2002-06-28T00:00:00+00:00',
        startTime: '2002-06-25T00:00:00+00:00',
      },
      {
        endTime: '2005-05-12T00:00:00+00:00',
        startTime: '2005-05-09T00:00:00+00:00',
      }],
      label: [
        'NSAIDs',
      ],
      order: 5,
    },
    {
      dataPoints: [
        {
          endTime: '2001-09-05T00:00:00+00:00',
          startTime: '2001-07-30T00:00:00+00:00',
        },
        {
          endTime: '2004-08-09T00:00:00+00:00',
          startTime: '2004-05-31T00:00:00+00:00',
        },
        {
          endTime: '2012-05-19T00:00:00+00:00',
          startTime: '2011-12-19T00:00:00+00:00',
        },
      ],
      label: [
        'Aspirin',
      ],
      order: 6,
    },
    {
      dataPoints: [],
      label: [
        'Insulin',
      ],
      order: 7,
    },
    {
      dataPoints: [],
      label: [
        'Immunosuppressants',
      ],
      order: 8,
    },
  ],
  scale: {
    end: '2020-04-12T00:00:00+00:00',
    start: '1999-08-14T00:00:00+00:00',
  },
}

export const uuhHistogram = {
  avgRisk: 0.1933213878908073,
  kind: 'histogram',
  patientRisk: 0.16659,
  numberOfPatients: 8572,
  risks: [
    0.16659,
    0.2127,
    0.171076,
    0.316793,
    0.232087,
    0.187992,
    0.204022,
    0.16092,
    0.17271,
    0.199918,
    0.183416,
    0.276559,
    0.161821,
    0.191969,
    0.217106,
    0.159694,
  ],
}

export const uuhRadar = {
  groupVariableWeights: {
    variables: [
      'demographic',
      'diagnosis',
      'echo',
      'lab',
      'medication',
      'op_summary',
      'physical',
      'trans',
      'visit_history',
      'visit_info',
    ],
    weights: [
      0.0005,
      0,
      0,
      0,
      0.0005,
      0,
      0.0003,
      0,
      0.003,
      0.0009,
    ],
  },
  patientVariableWeights: {
    variables: [
      'demographic',
      'diagnosis',
      'echo',
      'lab',
      'medication',
      'op_summary',
      'physical',
      'trans',
      'visit_history',
      'visit_info',
    ],
    weights: [
      0.0002,
      0,
      0,
      0,
      0.0002,
      0,
      0,
      0,
      0.0021,
      0.0005,
    ],
  },
}

export const uuhPathwayData = {
  data: [{
    dataPoints: [{
      endTime: '2000-01-01T00:00:00+00:00',
      startTime: '2000-01-01T00:00:00+00:00',
    }, {
      endTime: '2000-01-02T22:59:57+22:59',
      startTime: '2000-01-01T00:00:00+00:00',
    }, {
      endTime: '2000-01-02T22:59:57+22:59',
      startTime: '2000-01-02T22:59:57+22:59',
    }],
    label: ['Patient'],
    order: 0,
  }, {
    dataPoints: [{
      endTime: '2000-01-01T00:00:00+00:00',
      startTime: '2000-01-01T00:00:00+00:00',
    }, {
      endTime: '2001-10-23T05:36:48+05:36',
      startTime: '2000-01-01T00:00:00+00:00',
    }, {
      endTime: '2001-10-23T05:36:48+05:36',
      startTime: '2001-10-23T05:36:48+05:36',
    }],
    label: ['Group'],
    order: 1,
  }],
}

export const pieChartData = {
  pieChart: [
    { count: 7864, group: 'High Risk Group', ratio: 0.422 },
    { count: 10760, group: 'Low Risk Group', ratio: 0.578 },
  ],
}

export const statistics = {
  headers: [
    { id: 'variable', label: 'Variable' },
    { id: 'highRiskGroup', label: 'High Risk Group' },
    { id: 'lowRiskGroup', label: 'Low Risk Group' },
  ],
  rowData: [
    { highRiskGroup: 0.6, lowRiskGroup: 0.55, variable: 'Male Ratio' },
    { highRiskGroup: 50, lowRiskGroup: 50, variable: 'Average Age' },
    { highRiskGroup: 15, lowRiskGroup: 15, variable: 'Average Visit' },
    { highRiskGroup: 30, lowRiskGroup: 14, variable: 'Average Hospitalization' },
  ],
}

export const defaultThreshold = {
  event: 'Death',
  threshold: 0.3,
}

export const postThresholdMsg = {
  msg: 'Successfully update threshold',
  msgId: 'u301',
}

export const metric = {
  lineChart: [
    { x: 0.0025487798939257907, y: 0.0023718399873117373 },
    { x: 0.2336620331325302, y: 0.9728915662650602 },
  ],
  score: 0.92,
}

export const getNotification = {
  exist: true,
}

export const postNotification = {
  msg: 'remove noti',
  msgId: 'u801',
}
