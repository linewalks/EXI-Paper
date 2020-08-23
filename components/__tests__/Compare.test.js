import React from 'react';
import { mount } from 'enzyme';
import Compare from '@components/Compare';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Tabs, Button } from 'MDwalks-UI'
import _ from 'lodash'
import * as session from '@helpers/api/session'

const mockData = require('../../__mocks__/mockData');

const axiosMock = new MockAdapter(axios);
const subjectId = '1'
const event = 'death'
require('../../__mocks__/wrapAPI').wrapAPI(axiosMock, { subjectId })

// Use to wait for request with API calls
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component;
let instance;
let expected;

describe('Compare Component', () => {
  beforeEach(async () => {
    component = mount(<Compare subjectId={subjectId} event={event} />)
    instance = component.instance()
  })

  it('init', () => {
    expect(component.state().compareData).toBe(null)
    expect(component.state().radarData).toBe(null)
    expect(component.state().pathwayData).toBe(null)
  })

  it('Call API when componentDidMount', async () => {
    await flushPromises();

    expect(component.state().compareData).toEqual(mockData.histogram)
  })

  describe('Tab API test', () => {
    const getTabsAriaSelected = (tabs) => tabs.map((tab) => tab.prop('aria-selected'))
    describe('Risk Score', () => {
      it('Risk Score Tab', async () => {
        const riskScoreSpy = jest.spyOn(instance, 'requestRiskScore')

        await flushPromises();
        component.update();

        component.find(Tabs.Tab).at(2).simulate('click')
        component.update()

        component.find(Tabs.Tab).at(0).simulate('click')
        component.update()

        expect(getTabsAriaSelected(component.find(Tabs.Tab))).toEqual([true, false, false])
        expect(riskScoreSpy).toHaveBeenCalledWith('Death')
      })
    })

    describe('Variable Weigth', () => {
      it('Variable Weigth Tab', async () => {
        const variableApi = jest.spyOn(instance, 'requestVariableWeight')

        await flushPromises();
        component.update();

        component.find(Tabs.Tab).at(1).simulate('click')
        component.update()

        expect(getTabsAriaSelected(component.find(Tabs.Tab))).toEqual([false, true, false])
        expect(variableApi).toHaveBeenCalledWith('Death')
      })
    })

    describe('Time To Event', () => {
      it('Time To Event Tab', async () => {
        const timeToEventApi = jest.spyOn(instance, 'requestPathway')

        await flushPromises();
        component.update();

        component.find(Tabs.Tab).at(2).simulate('click')
        component.update()

        expect(getTabsAriaSelected(component.find(Tabs.Tab))).toEqual([false, false, true])
        expect(timeToEventApi).toHaveBeenCalledWith('Death')
      })

      it('모달버튼 클릭 시, 모달창 open 및 /api/data/pathway/를 호출해야 한다.', async () => {
        const dataSource = 'amc'
        session.getCookie = jest.fn(() => dataSource)
        const axiosSpy = jest.spyOn(axios, 'get')
        const expectedParam = {
          cancelToken: axios.CancelToken.source().token,
          params: {
            data_source: dataSource,
            subject_id: subjectId,
          },
        }
        await flushPromises()
        component.update()

        component.find(Tabs.Tab).at(2).simulate('click')
        await flushPromises()
        component.update()

        const modalBtn = component.find(Button).at(1)
        modalBtn.simulate('click')

        await flushPromises();
        component.update()

        expect(component.state('modal')).toEqual(true)
        expect(axiosSpy).toHaveBeenLastCalledWith('/api/data/pathway/', expectedParam)
      })
    })
  })

  it('Button from compare page moving to patient page', async () => {
    expected = `/${event}/patients/${subjectId}`
    await flushPromises();
    component.update();

    expect(component.find('SideBar').find('Link').at(0).prop('href')).toEqual(expected)
  })

  it('Table', async () => {
    await flushPromises();
    component.update();

    component.find(Tabs.Tab).at(1).simulate('click')
    await flushPromises();
    component.update()
    expect(component.find('Compare').find('span[aria-selected=true]').prop('children')[0]).toEqual('Variable Weight')
    expect(component.find('Compare').state().radarData).toEqual(mockData.radar)
    expect(component.find('div#radarTable')).toHaveLength(1)
  })

  it('Pathway tab "Time to Event" Table', async () => {
    await flushPromises();
    component.update();

    component.find(Tabs).find('span').at(2).simulate('click');
    await flushPromises();
    component.update();
    expect(component.find('Compare').find('span[aria-selected=true]').prop('children')[0]).toEqual('Time to Event');
    expect(component.find('Compare').state().pathwayData).toEqual(mockData.pathwayData.data);
    expect(component.find('#pathwayTable').find('TBody').prop('rowData')[0][1]).toEqual('4 months');
    expect(component.find('#pathwayTable').find('TBody').prop('rowData')[0][2]).toEqual('2 years 10 months');
  })

  it('selectBox의 onChange 이벤트 값이 발생했을 때, RiskScore 테이블의 데이터가 변경되어야 한다.', async () => {
    const initNumberOfBinsPatients = '5'
    expected = '2'
    await flushPromises();
    component.update();

    expect(component.state('numberOfBinsPatients')).toEqual(initNumberOfBinsPatients)

    component.find('select').simulate('change', {
      target: {
        value: 20,
      },
    })
    component.update()

    expect(component.state('numberOfBinsPatients')).toEqual(expected)
  })
})

describe('데이터 구조', () => {
  it(`/api/data/compare/${subjectId}/risk의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.histogram)).toEqual(_.keys(mockData.uuhHistogram))
  })

  it(`/api/data/compare/${subjectId}/risk/input/weights의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.radar)).toEqual(_.keys(mockData.uuhRadar))
  })

  it(`/api/data/compare/${subjectId}/tte의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.pathwayData.data)).toEqual(_.keys(mockData.uuhPathwayData.data))
  })
})

describe('Breadcrumb', () => {
  it('Patients List는 href로 /:event props를 가져야합니다.', () => {
    expected = `/${event}`
    expect(component.find('Link').at(0).prop('href')).toEqual(expected)
  })
})
