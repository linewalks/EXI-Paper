import React from 'react';
import { mount } from 'enzyme';
import Card from '@components/Card';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PieChart, Button } from 'MDwalks-UI'
import { act } from 'react-dom/test-utils';
import path from '@helpers/constant/path'
import * as session from '@helpers/api/session'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import Router from 'next/router'

const axiosMock = new MockAdapter(axios);

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component
let title
let dataSource
let axiosGetSpy
let axiosPostSpy
let expectedParam
let pieChart
let updateBadge

const spyOnPush = jest.fn()

const router = {
  route: '/',
  push: spyOnPush,
}

Router.router = router
describe('Card Component', () => {
  beforeEach(async () => {
    title = '위험도'
    dataSource = 'amc'
    axiosGetSpy = jest.spyOn(axios, 'get')
    axiosPostSpy = jest.spyOn(axios, 'post')
    session.getCookie = jest.fn(() => dataSource)
    expectedParam = {
      cancelToken: axios.CancelToken.source().token,
      params: {
        data_source: dataSource,
        event: path.death.event,
      },
    }
    component = mount(
      <RouterContext.Provider value={router}>
        <Card model={path.death} title={title} dataSource={dataSource} />
      </RouterContext.Provider>,
    )
    pieChart = () => component.find(PieChart)
    updateBadge = () => component.find('div#badge')
    await act(async () => {
      expect(pieChart()).toHaveLength(0)
      expect(updateBadge()).toHaveLength(0)

      await flushPromises()
      component.update()
    })
  })

  it('초기 렌더링 후, 파이차트 및 noti 데이터를 받아야 한다.', () => {
    expect(axiosGetSpy).toHaveBeenNthCalledWith(1, '/api/data/predict/risk/ratio', expectedParam)
    expect(axiosGetSpy).toHaveBeenNthCalledWith(2, '/api/user/notification', expectedParam)
    expect(pieChart()).toHaveLength(1)
    expect(updateBadge()).toHaveLength(1)
  })

  it('title props를 받야야 한다.', () => {
    const expectedTitle = title
    expect(component.prop('title')).toEqual(expectedTitle)
  })

  it('Detail View 버튼 클릭 시, notification post를 호출해야 한다', async () => {
    expect(spyOnPush).toHaveBeenCalledTimes(0)
    await act(async () => {
      component.find(Button).simulate('click')

      await flushPromises()
      component.update()
    })

    expect(spyOnPush).toHaveBeenCalled()
    expect(axiosPostSpy).toHaveBeenCalledWith('/api/user/notification', expectedParam.params)
  })
})
