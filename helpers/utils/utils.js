import _ from 'lodash'

/**
 * Table 데이터 스키마 재정의 #269 2018.08.06
 */
export const convertRowData = (tableData) => {
  const isChangeDataStructure = _.isObject(_.head(tableData.headers))
  let headers = [...tableData.headers]

  if (isChangeDataStructure) {
    headers = tableData.headers.map((obj) => obj.id)
  }

  const rowData = tableData.rowData.map((data) => {
    const obj = {}
    headers.forEach((key) => {
      obj[key] = _.isNull(data[key]) ? '-' : data[key]
    });
    return obj
  })

  if (isChangeDataStructure) {
    headers = tableData.headers.map((obj) => obj.label)
  }

  return {
    ...tableData,
    headers,
    rowData,
  }
}

export const appendfolderIcon = (tableData) => {
  if (tableData.headers.indexOf(' ') !== -1) return tableData
  const headers = [...tableData.headers, ' ']
  const rowData = tableData.rowData.map((data) => ({ ...data, ' ': 'icon' }))

  return {
    ...tableData,
    headers,
    rowData,
  }
}

export const regPassword = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\|[\]{};:'",.<>/?])*.{8,}$/i

export const timeFormatConvert = (time, format = 'YYYY-MM-DD') => {
  const d = new Date(time)

  return format
    .replace('YYYY', d.getFullYear())
    .replace('MM', (`0${d.getMonth() + 1}`).slice(-2))
    .replace('DD', (`0${d.getDate()}`).slice(-2))
    .replace('HH', (`0${d.getHours()}`).slice(-2))
    .replace('mm', (`0${d.getMinutes()}`).slice(-2))
}

export const convertPathwayEvents = (data) => {
  const summaryData = {}

  data.events.forEach(({ name, value }) => {
    summaryData[`${name}`] = value
  })

  return summaryData
}

export const isDate = (arg) => (_.isDate(arg) && !_.isNaN(arg.valueOf()));

export const isValidPeriod = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (!isDate(startDate) || !isDate(endDate)) {
    throw new Error('Parameter is wrong.');
  }

  if (startDate.valueOf() > endDate.valueOf()) {
    throw new Error(`Can't be faster "startTime" than "endTime".`);
  }

  return true;
}

const getMonthDiff = (dateFrom, dateTo) => (
  dateTo.getMonth() - dateFrom.getMonth()
    + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
)

const getDayDiff = (dateFrom, dateTo) => (
  Math.ceil(Math.abs(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
)

export const pathwayTableTimeFormatter = (dateFrom, dateTo) => {
  const month = getMonthDiff(dateFrom, dateTo)
  const day = getDayDiff(dateFrom, dateTo)

  if (month === 0 && day === 0) return ''

  if (month === 0) {
    return `${day} ${day > 1 ? 'days' : 'day'}`;
  }

  const arr = []

  const calYear = Math.floor(month / 12);
  const calMonth = month % 12

  if (calYear !== 0) {
    arr.push(`${calYear} ${calYear > 1 ? 'years' : 'year'}`)
  }

  if (calMonth !== 0) {
    arr.push(`${calMonth} ${calMonth > 1 ? 'months' : 'month'}`)
  }

  return arr.join(' ')
}

export const getDateIntervalByString = (startTime, endTime) => {
  let rStr = '';
  try {
    isValidPeriod(startTime, endTime);
    rStr = pathwayTableTimeFormatter(new Date(startTime), new Date(endTime))
  } catch (error) {
    rStr = '-';
    console.error(error.message);
  }
  return rStr;
}

export const tableHeaderConvert = (header) => header.split('_').map((title) => `${title[0].toUpperCase()}${title.slice(1)}`).join(' ')

export const lineChartDataConvert = (lineData) => {
  const { x: { name: xKey, data: xData }, y: { name: yKey, data: yData } } = lineData
  return xData.map((x, i) => (
    {
      [xKey]: x,
      [yKey]: yData[i],
    }
  ))
}

export const initSelectedNodes = () => ['Ischemic Heart Disease']

export const ORGANIZATIONINDEX = {
  amc: 0,
  uuh: 1,
  cnuh: 2,
  mimiccdm: 3,
}

export const ORGANIZATION = {
  Linewalks: {
    name: 'amc',
    logo: {
      sm: '/img/img-logo-linewalks-sm.png',
      lg: '/img/img-logo-linewalks.png',
    },
  },
  'Asan Medical Center(CV)': {
    name: 'amc',
    logo: {
      sm: '/img/img-logo-amc-sm.png',
      lg: '/img/img-logo-amc.png',
    },
  },
  'Chonnam National University Hospital': {
    name: 'cnuh',
    logo: {
      sm: '/img/img-logo-cnuh-sm.png',
      lg: '/img/img-logo-cnuh.png',
    },
  },
  'Ulsan University Hospital': {
    name: 'uuh',
    logo: {
      sm: '/img/img-logo-uuh-sm.png',
      lg: '/img/img-logo-uuh.png',
    },
  },
}

export const radarChartDataConvert = (radarData) => {
  const { groupVariableWeights, patientVariableWeights } = radarData
  const { variables, weights: group } = groupVariableWeights
  const { weights: patients } = patientVariableWeights

  return radarData && variables.map((variable, i) => ({
    variable,
    Patients: patients[i],
    Group: group[i],
  }))
}
