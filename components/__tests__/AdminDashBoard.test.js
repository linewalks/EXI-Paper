import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import AdminEvent from '@components/AdminEvent'
import AdminDashBoard from '@components/AdminDashBoard'
import { LineChart, Tabs } from 'MDwalks-UI'
import AppProvider from '@contexts/AppProvider'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as session from '@helpers/api/session'

const axiosMock = new MockAdapter(axios);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve))
require('../../__mocks__/wrapAPI').wrapAPI(axiosMock, {})

let component
let axiosGetSpy
let axiosPostSpy
let expectedUrl
let expectedParam
let cancelBtn
let saveBtn
const dataSource = 'amc'
const defaultThresHold = 0.3

window.confirm = jest.fn(() => true)
window.alert = jest.fn()

describe('AdminDashBoard Component', () => {
  beforeEach(async () => {
    component = mount(
      <AdminDashBoard dataSource={dataSource} />,
      {
        wrappingComponent: AppProvider,
      },
    )

    cancelBtn = () => component.find('button').at(0)
    saveBtn = () => component.find('button').at(1)
    axiosGetSpy = jest.spyOn(axios, 'get')
    axiosPostSpy = jest.spyOn(axios, 'post')
    session.getCookie = jest.fn(() => dataSource)
    expectedUrl = '/api/data/predict/risk/ratio'
    expectedParam = {
      cancelToken: axios.CancelToken.source().token,
      params: {
        data_source: dataSource,
        event: 'Death',
        threshold: 0.31,
      },
    }
    await act(async () => {
      await flushPromises()
      component.update()
      expect(component.find('header input').prop('value')).toEqual(defaultThresHold)
    })
  })

  it('초기 로드 후, cancel, save 버튼은 비활성화 이다.', () => {
    expect(cancelBtn().prop('disabled')).toBe(true)
    expect(saveBtn().prop('disabled')).toBe(true)
  })

  it('초기 로드 후, 성능지표 차트가 렌더링 되어야 한다.', () => {
    expect(component.find(LineChart)).toHaveLength(3)
  })

  describe('slider 변경 후', () => {
    beforeEach(async () => {
      await act(async () => {
        component.find('.ant-slider-handle').at(1).simulate('keyDown', {
          keyCode: 39,
        })
      })
      component.update()
    })

    afterEach(() => axiosGetSpy.mockClear())

    it('threshold가 변경되어야 한다', () => {
      expect(component.find('header input').prop('value')).toEqual(0.31)
    })

    it('pieChart api를 호출 한다', () => {
      expect(axiosGetSpy).toHaveBeenLastCalledWith(expectedUrl, expectedParam)
    })

    describe('cancel, save 버튼', () => {
      beforeEach(() => {
        expectedUrl = `/api/data/predict/risk/threshold`
      })

      it('cancel, save 버튼은 활성화 된다.', () => {
        expect(cancelBtn().prop('disabled')).toBe(false)
        expect(saveBtn().prop('disabled')).toBe(false)
      })

      it('cancel 버튼 클릭 시, /api/data/predict/risk/threshold get 호출 및 cancel, save 버튼 비활성화가 된다.', async () => {
        const getParam = { ...expectedParam }
        delete getParam.params.threshold
        await act(async () => {
          cancelBtn().simulate('click')
          await flushPromises()
        })

        component.update()

        expect(axiosGetSpy).toHaveBeenNthCalledWith(7, expectedUrl, getParam)
        expect(cancelBtn().prop('disabled')).toBe(true)
        expect(saveBtn().prop('disabled')).toBe(true)
      })

      it('save 버튼 클릭 시, /api/data/predict/risk/threshold post 호출 및 cancel, save 버튼 비활성화가 된다.', async () => {
        await act(async () => {
          saveBtn().simulate('click')
          await flushPromises()
        })

        component.update()

        expect(axiosPostSpy).toHaveBeenLastCalledWith(expectedUrl, expectedParam.params)
        expect(cancelBtn().prop('disabled')).toBe(true)
        expect(saveBtn().prop('disabled')).toBe(true)
      })
    })
  })

  describe('Tab', () => {
    it('Tab 클릭 시, Tab에 나올 화면이 클릭한 Tab 이벤트를 props로 받아야 한다.', async () => {
      const DeathTab = component.find(Tabs.Tab).at(0)
      await act(async () => {
        DeathTab.simulate('click')
        await flushPromises()
      })

      component.update()

      expect(component.find(AdminEvent).prop('event')).toEqual('Death')
    })
  })

  describe('Threshold Input', () => {
    it('input에 threshold 변경 후, enter를 입력하면, /api/data/predict/risk/ratio를 호출 한다.', async () => {
      expectedParam.params.threshold = '0.55'
      const ThresholdInput = () => component.find('header input')

      await act(async () => {
        await ThresholdInput().simulate('change', { target: { value: 0.55 } })
        await ThresholdInput().simulate('keyPress', { key: 'Enter' })
        await flushPromises()
      })

      expect(ThresholdInput().prop('value')).toEqual(0.55)
      expect(axiosGetSpy).toHaveBeenLastCalledWith(expectedUrl, expectedParam)
    })
  })
})
