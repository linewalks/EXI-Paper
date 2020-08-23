import * as utils from './utils';

test('convertRowData', () => {
  const tableData = {
    headers: ['aa', 'bb'],
    rowData: [{
      bb: 1,
      aa: 2,
    }],
  }
  const expected = {
    headers: ['aa', 'bb'],
    rowData: [{
      aa: 2,
      bb: 1,
    }],
  }
  expect(utils.convertRowData(tableData)).toEqual(expected);
});

/**
 * Table 데이터 스키마 재정의 #269 2018.08.06
 */
test('convertRowData by Change Structure', () => {
  const tableData = {
    headers: [{ id: 'aa', label: 'AA' }, { id: 'bb', label: 'BB' }],
    rowData: [{
      bb: 1,
      aa: 2,
    }],
  }
  const expected = {
    headers: ['AA', 'BB'],
    rowData: [{
      aa: 2,
      bb: 1,
    }],
  }
  expect(utils.convertRowData(tableData)).toEqual(expected);
});

test('covertRowData includes Empty data', () => {
  const tableData = {
    headers: [{ id: 'aa', label: 'AA' }, { id: 'bb', label: 'BB' }],
    rowData: [{
      bb: 1,
      aa: null,
    }],
  }
  const expected = {
    headers: ['AA', 'BB'],
    rowData: [{
      aa: '-',
      bb: 1,
    }],
  }
  expect(utils.convertRowData(tableData)).toEqual(expected);
})

test('appendFolderIcon', () => {
  const tableData = {
    headers: ['aa', 'bb'],
    rowData: [{
      bb: 1,
      aa: 2,
    }],
  }
  const expected = {
    headers: ['aa', 'bb', ' '],
    rowData: [{
      aa: 2,
      bb: 1,
      ' ': 'icon',
    }],
  }

  expect(utils.appendfolderIcon(tableData)).toEqual(expected)
  expect(utils.appendfolderIcon(utils.appendfolderIcon(tableData))).toEqual(expected)
})

test('timeFormatConvert', () => {
  const date = new Date('2019-01-02 13:01')
  expect(utils.timeFormatConvert(date, 'YYYY-MM.DD')).toBe('2019-01.02')
  expect(utils.timeFormatConvert(date)).toBe('2019-01-02')
  expect(utils.timeFormatConvert(date, 'HH:mm')).toBe('13:01')
});

/**
 * Use 8 or more characters including numbers
 * may be including symbols
 */
test('regPassword', () => {
  expect(utils.regPassword.test('11')).toBe(false)
  expect(utils.regPassword.test('abcdefgh')).toBe(false)
  expect(utils.regPassword.test('abcdef1f')).toBe(true)
  expect(utils.regPassword.test('abcdef12')).toBe(true)
  expect(utils.regPassword.test('abcdef1!')).toBe(true)
  expect(utils.regPassword.test('abcdef1!/append')).toBe(true)
  expect(utils.regPassword.test('abcdef1![]append')).toBe(true)
})

describe('getDateIntervalByString', () => {
  let startTime;
  let endTime;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  })

  it('2019-01-30, 2019-01-30', () => {
    startTime = '2019-01-30';
    endTime = '2019-01-30';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('');
  })

  it('2019-01-30, 2019-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-01';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2019-03-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-03-01';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('2 months');
  });

  it('2019-01-30, 2019-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2019-01-31';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 day');
  });

  it('2019-01-30, 2020-01-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-01';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-30, 2020-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-02-01';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 year 1 month');
  });

  it('2019-01-30, 2019-02-21', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-21';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2020-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-31';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31';
    endTime = '2019-01-30';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('-');
  });

  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31';
    endTime = '2019-01-30';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('-');
  });

  it('2020-01-31, 2019-01-30', () => {
    startTime = '2020-01-31';
    endTime = '2019-01-30';
    expect(utils.getDateIntervalByString(startTime, endTime)).toBe('-');
  });
})

describe('isDate', () => {
  let date
  it('emtpy', () => {
    date = new Date();
    expect(utils.isDate(date)).toBeTruthy();
  })
  it('asb', () => {
    date = new Date('asb');
    expect(utils.isDate(date)).toBeFalsy();
  })
  it('1234', () => {
    date = '1234';
    expect(utils.isDate(date)).toBeFalsy();
  })
})

describe('isValidPeriod', () => {
  let startTime
  let endTime
  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31'
    endTime = '2019-01-30'
    expect(() => utils.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31'
    endTime = '2019-01-30'
    expect(() => utils.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2020-01-31. 2019-01-30', () => {
    startTime = '2020-01-31'
    endTime = '2019-01-30'
    expect(() => utils.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('123, asdf', () => {
    startTime = '123'
    endTime = 'asdf'
    expect(() => utils.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-01-31, 2019-02-01', () => {
    startTime = '2019-01-31'
    endTime = '2019-02-01'
    expect(() => utils.isValidPeriod(startTime, endTime)).toBeTruthy();
  })

  it('tableHeaderConvert', () => {
    expect(utils.tableHeaderConvert('aa_bb')).toBe('Aa Bb')
    expect(utils.tableHeaderConvert('aa')).toBe('Aa')
  })
})

test('lineChartDataConvert', () => {
  const lineData = {
    x: {
      name: 'Year',
      data: ['2000', '2001'],
    },
    y: {
      name: 'Patients',
      data: [300, 600],
    },
  }

  const expected = [
    {
      Year: '2000',
      Patients: 300,
    },
    {
      Year: '2001',
      Patients: 600,
    },
  ]
  expect(utils.lineChartDataConvert(lineData)).toEqual(expected)
})

test('radarChartDataConvert', () => {
  const radarData = {
    groupVariableWeights: {
      variables: ['demographic', 'disagnosis', 'lab'],
      weights: [0, 0, 0],
    },
    patientVariableWeights: {
      variables: ['demographic', 'disagnosis', 'lab'],
      weights: [0, 0, 0],
    },
  }

  const expected = [
    {
      variable: 'demographic',
      Patients: 0,
      Group: 0,
    },
    {
      variable: 'disagnosis',
      Patients: 0,
      Group: 0,
    },
    {
      variable: 'lab',
      Patients: 0,
      Group: 0,
    },
  ]

  expect(utils.radarChartDataConvert(radarData)).toEqual(expected)
})
