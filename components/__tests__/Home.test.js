import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '@components/Home';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as utils from '@helpers/utils/utils';
import _ from 'lodash'

const mockData = require('../../__mocks__/mockData')

const axiosMock = new MockAdapter(axios);

const subjectId = '1'
require('../../__mocks__/wrapAPI').wrapAPI(axiosMock, { subjectId })

// Use to wait for request with API calls
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component;
let instance;
let expectedParam;
let getSortedDataForTableSpy;
const event = 'death'

it('init', async () => {
  component = shallow(<Home event={event} />)

  expect(component.state().dataForTable).toBe(null)

  await flushPromises();
})

it('Call API when componentDidMount', async () => {
  expect(component.state().dataForTable)
    .toEqual(utils.appendfolderIcon(utils.convertRowData(mockData.patientList)))
})

describe('테이블 정렬 테스트', () => {
  beforeAll(async () => {
    component = mount(<Home event={event} />)
    instance = component.instance()

    getSortedDataForTableSpy = jest.spyOn(instance, 'getSortedDataForTable')

    await flushPromises();
    component.update()
  })

  it('첫번째 클릭시, 테이블이 오름차순이 되어야한다.', async () => {
    component.find('table thead th').at(2).find('button').simulate('click')
    await flushPromises();
    component.update()

    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenCalledWith('Risk Score', 'asc')
    expect(component.find('table')).toHaveLength(1)
  })

  it('두번째 클릭시, 테이블이 내림차순이 되어야한다.', async () => {
    component.find('table thead th').at(2).find('button').simulate('click')

    await flushPromises();
    component.update()

    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenCalledWith('Risk Score', 'desc')
    expect(component.find('table')).toHaveLength(1)
  })

  it('세번째 클릭시, 테이블이 초기화 상태로 되어야한다.', async () => {
    component.find('table thead th').at(2).find('button').simulate('click')

    await flushPromises();
    component.update()

    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenCalledWith('Risk Score', '')
    expect(component.find('table')).toHaveLength(1)
  })

  it('riskScore 오름차순 상태에서 다른 칼럼을 클릭하면, riskScore의 소팅버튼은 초기화되고, 다른칼럼의 asc 소팅 api요청이 되어야한다.', async () => {
    component.find('table thead th').at(2).find('button').simulate('click')
    await flushPromises();
    component.update()

    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenCalledWith('Risk Score', 'asc')
    expect(component.find('table')).toHaveLength(1)

    component.find('table thead th').at(1).find('button').simulate('click')
    await flushPromises();
    component.update()

    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenLastCalledWith('Diagnosis', 'asc')
    expect(component.find('table')).toHaveLength(1)
  })

  it('오름차순버튼 클릭된 상태에서 페이지를 이동하면, 이동한 페이지에 테이블에도 오름차순이 적용되어야 한다.', async () => {
    const changePage = jest.spyOn(instance, 'changePage')
    const getDataForTable = jest.spyOn(instance, 'getDataForTable')
    expectedParam = {
      event: _.upperFirst(event),
      length: 10,
      order_by: 'asc',
      page: 2,
      sort_by: 'riskScore',
    }
    component.find('table thead th').at(2).find('button').simulate('click')
    await flushPromises();
    component.update()
    expect(getSortedDataForTableSpy).toHaveBeenCalled()
    expect(getSortedDataForTableSpy).toHaveBeenCalledWith('Risk Score', 'asc')

    component.find('Pagination').find('button').at(2).simulate('click')
    await flushPromises()
    component.update()

    expect(component.state().selectPage).toEqual(2)
    expect(changePage).toHaveBeenCalled()
    expect(getDataForTable).toHaveBeenCalled()
    expect(getDataForTable).toHaveBeenLastCalledWith(expectedParam)
    expect(component.find('table')).toHaveLength(1)
  })

  it('테이블 데이터가 없을 때, 정렬버튼은 비활성화 된다.', async () => {
    const EmptyTableData = {
      headers: [
        'subject Id',
        'diagnosis',
        'risk Score',
        'latest Admission',
        ' ',
      ],
      rowData: [],
      totalRows: 0,
    }

    component.setState({ dataForTable: EmptyTableData })
    await flushPromises()
    component.update()

    component.find('table thead th button').forEach((sortBtn) => {
      expect(sortBtn.prop('disabled')).toEqual(true)
    })
  })
})

describe('데이터 구조', () => {
  it('아산, 울산 테이블 데이터의 key값이 같다.', () => {
    expect(_.keys(mockData.patientList)).toEqual(_.keys(mockData.uuhPatientList))
  })

  it('아산, 울산 테이블 확장행 데이터의 key값이 같다.', () => {
    expect(_.keys(mockData.patients)).toEqual(_.keys(mockData.uuhPatients))
  })
})
