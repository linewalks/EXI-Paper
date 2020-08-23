import React from 'react';
import { mount } from 'enzyme';
import SideBar from '@components/SideBar';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockData = require('../../__mocks__/mockData')

const axiosMock = new MockAdapter(axios);
const subjectId = '1'
const props = {
  subjectId,
  path: `/compare/${subjectId}/risk/mace`,
  buttonName: 'go',
  isSideBarLoading: true,
  minHeight: 0,
  dataSource: 'amc',
  backUrl: '/go',
}

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock, { subjectId })

// Use to wait for request with API calls
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component;
let instance;
let apiCallSpy;

it('초기', async () => {
  component = mount(
    <SideBar
      subjectId={props.subjectId}
      buttonName={props.buttonName}
      path={props.path}
      isSideBarLoading={props.isSideBarLoading}
      minHeight={props.minHeight}
      dataSource={props.dataSource}
      backUrl={props.backUrl}
    />,
  )

  instance = component.instance()
  apiCallSpy = jest.spyOn(instance, 'getSummaryData')
  await flushPromises();
})

it('componentDidMount가 호출됬을 때, summary data를 받아야 한다.', () => {
  expect(component.find('SideBar').state().patientSummary).toEqual(mockData.summary)
})

it('props를 잘 받아야한다,', () => {
  expect(component.find('SideBar').props()).toEqual(props)
})

it('dataSoruce 변경시 getSummaryData함수가 호출되어야 한다.', () => {
  component.setProps({
    dataSource: 'cnuh',
  })

  expect(apiCallSpy).toHaveBeenCalled()
})
