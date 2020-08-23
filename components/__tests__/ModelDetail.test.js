import React from 'react';
import { mount } from 'enzyme';
import ModelDetail from '@components/ModelDetail';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BarChart, Table, SummaryCard } from 'MDwalks-UI'
import { act } from 'react-dom/test-utils';

const axiosMock = new MockAdapter(axios);

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component
let event
let dataSource
describe('ModelDetail Component', () => {
  beforeEach(async () => {
    event = 'death'
    dataSource = 'amc'
    component = mount(<ModelDetail event={event} dataSource={dataSource} />)
    await act(async () => {
      expect(component.find(BarChart)).toHaveLength(0)
      expect(component.find(Table)).toHaveLength(0)
      expect(component.find(SummaryCard)).toHaveLength(0)

      await flushPromises()
      component.update()
    })
  })

  it('초기 렌더링 후, BarChart, Table, SummaryCard 데이터를 받아야 한다.', () => {
    expect(component.find(BarChart)).toHaveLength(1)
    expect(component.find(Table)).toHaveLength(1)
    expect(component.find(SummaryCard)).toHaveLength(1)
  })
})
