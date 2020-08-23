import React from 'react';
import { shallow, mount } from 'enzyme';
import Patients from '@components/Patients';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as utils from '@helpers/utils/utils';
import { Modal } from 'MDwalks-UI'
import _ from 'lodash'

const mockData = require('../../__mocks__/mockData')

const axiosMock = new MockAdapter(axios);

const subjectId = '1'
const event = 'death'
require('../../__mocks__/wrapAPI').wrapAPI(axiosMock, { subjectId })

// Use to wait for request with API calls
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let wrapper
let component
let instance
let expected
let spy

it('init', async () => {
  wrapper = shallow(<Patients subjectId={subjectId} event={event} />);
  await flushPromises();
})

it('Call API when componentDidMount', async () => {
  expect(wrapper.state().lineData.xaxis).toEqual(mockData.riskLine.scores.x.data)
  expect(wrapper.state().lineData.data).toEqual([mockData.riskLine.scores.y])
  expect(wrapper.state().patientTimeline).toEqual(mockData.timeline.data)

  expect(wrapper.state().path).toEqual(`/api/data/p/${subjectId}/lab`)
  expect(wrapper.state().tableData).toEqual(utils.convertRowData(mockData.lab))
  expect(wrapper.state().weight).toEqual(mockData.weight)
  expect(wrapper.state().hadmIds).toEqual(mockData.riskLine.scores.hadmIds)
  expect(wrapper.state().riskScore).toEqual(mockData.riskLine.last)
})

it('Change tab', async () => {
  component = mount(<Patients subjectId={subjectId} event={event} />)
  instance = component.instance()
  spy = jest.spyOn(instance, 'OpenModal')

  await flushPromises();

  component.find('span[type="catogory"]').at(1).simulate('click')
  await flushPromises();

  expect(component.find('Patients').state().path).toEqual(`/api/data/p/${subjectId}/echo`)
  expect(component.find('Patients').state().tableData).toEqual(utils.convertRowData(mockData.echo))

  component.find('span[type="catogory"]').at(2).simulate('click')
  await flushPromises();
  expect(component.find('Patients').state().path).toEqual(`/api/data/p/${subjectId}/spect`)
  expect(component.find('Patients').state().tableData).toEqual(utils.convertRowData(mockData.spect))
});

it('LineMergeTimeline have resetBtnId property', () => {
  const resetBtnId = wrapper.find('LineMergeTimeline').props().resetBtnId || ''
  expect(resetBtnId).not.toBe('')

  expect(wrapper.find(`#${resetBtnId}`).length).toBe(1)
})

it('Button from patient page moving to compare page', async () => {
  expected = `/${event}/compare/${subjectId}`

  await flushPromises();
  component.update()

  expect(component.find('SideBar').find('Link').at(0).prop('href')).toEqual(expected)
})

it('Detail View Button ', async () => {
  await flushPromises();
  component.update()
  component.find('ButtonLink').simulate('click')

  await flushPromises();
  component.update()

  expect(spy).toHaveBeenCalled()
  expect(component.state().modal).toEqual(true)
  expect(component.state().treeMap).toEqual(mockData.treeMap)

  component.find(Modal).find('button').simulate('click')
  component.update()

  expect(component.state().modal).toEqual(false)
  expect(component.state().treeMap).toEqual(null)
})

describe('데이터 구조', () => {
  it(`/api/data/p/${subjectId}/summary의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.summary)).toEqual(_.keys(mockData.uuhSummary))
  })

  it(`/api/data/predict/${subjectId}/risk/input/weights의 아산, 울산 데이터의 key값이 같다`, () => {
    mockData.weight.forEach((d, i) => {
      expect(_.keys(d)).toEqual(_.keys(mockData.uuhWeight[i]))
    })
  })

  it(`/api/data/predict/${subjectId}/risk의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.riskLine)).toEqual(_.keys(mockData.uuhRiskLine))
  })

  it(`/api/data/p/${subjectId}/timeline의 아산, 울산 데이터의 key값이 같다`, () => {
    expect(_.keys(mockData.timeline)).toEqual(_.keys(mockData.uuhTimeline))
  })
})

describe('Breadcrumb', () => {
  it('Patients List는 href로 /:event props를 가져야합니다.', () => {
    expected = `/${event}`
    expect(component.find('Link').at(0).prop('href')).toEqual(expected)
  })
})
