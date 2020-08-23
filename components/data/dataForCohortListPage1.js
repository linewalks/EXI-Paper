export default {
  headers: ['pattern', 'support'],
  rowData: [{ 'pattern': 'Chemistry Troponin T -> CABG', 'support': 0.051 },
  { 'pattern': 'Chemistry Troponin T -> ECG -> CABG', 'support': 0.046 },
  { 'pattern': 'Chemistry Troponin T -> CABG -> Aspirin', 'support': 0.046 },
  { 'pattern': 'emergency -> Chemistry Troponin T -> CABG', 'support': 0.05 },
  {
    'pattern': 'emergency -> ischemic_hd -> Chemistry Troponin T -> CABG',
    'support': 0.049
  },
  { 'pattern': 'ischemic_hd -> Chemistry Troponin T -> CABG', 'support': 0.05 },
  {
    'pattern': 'emergency -> Chemistry Troponin T -> ECG -> CABG',
    'support': 0.045
  },
  {
    'pattern': 'emergency -> Chemistry Troponin T -> CABG -> Aspirin',
    'support': 0.045
  },
  {
    'pattern': 'emergency -> ischemic_hd -> Chemistry Troponin T -> ECG -> CABG',
    'support': 0.044
  },
  {
    'pattern': 'emergency -> ischemic_hd -> Chemistry Troponin T -> CABG -> Aspirin',
    'support': 0.044
  },
  {
    'pattern': 'ischemic_hd -> Chemistry Troponin T -> ECG -> CABG',
    'support': 0.045
  }],
  totalRows: 11,
};
