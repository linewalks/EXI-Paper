import React from 'react'
import { mount } from 'enzyme'
import Navi, { DropMenu } from '@components/Navi'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import config from '@helpers/api/config.json'
import * as session from '@helpers/api/session'
import Link from 'next/link'

const axiosMock = new MockAdapter(axios);
const mockData = require('../../__mocks__/mockData')

axiosMock
  .onGet(
    `${config.HOSTNAME}/api/organization/list`,
    {
      headers: { Authorization: 'Bearer token' },
      option: 'gnb',
    },
  )
  .reply(200, { ...mockData.organizationData });

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

const organizationUserInfo = {
  access_token: '',
  email: 'yp@linewalks.com',
  name: 'yo',
  organization: {
    id: 2,
    name: 'Asan Medical Center(CV)',
  },
  role: {
    id: 2,
    name: 'Manager',
  },
  refresh_token: '',
}

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

jest.mock('next/router', () => ({
  push: jest.fn(),
  asPath: '/death',
}))

describe('Navi Component', () => {
  let component;
  let instance;
  let logoutSpy;
  let getOrganizationNameSpy;
  let userDropMenu;
  let organizationDropMenu;
  let category;
  const setDataSource = jest.fn();
  const dataSource = 'amc'
  beforeEach(async () => {
    session.hasSession = jest.fn(() => true)
    component = mount(<Navi dataSource={dataSource} setDataSource={setDataSource} />)
    instance = component.instance()
    logoutSpy = jest.spyOn(instance, 'logout')
    getOrganizationNameSpy = jest.spyOn(instance, 'getOrganizationName')
  })
  describe('loading 상태', () => {
    it('loading 상태에서, login link가 렌더되어야 한다.', () => {
      expect(component.state('loading')).toEqual(true)
      expect(component.find(Link).at(1).prop('href')).toEqual('/signin')
      expect(component.find(Link).at(1).find('a').prop('children')).toEqual('Login')
    })

    it('logo Link는 "/" props를 가져야한다.', () => {
      expect(component.find(Link).at(0).prop('href')).toEqual('/')
    })
  })

  describe('login 상태', () => {
    beforeEach(async () => {
      await flushPromises()
      component.update()

      organizationDropMenu = () => component.find(DropMenu).at(0)
      userDropMenu = () => component.find(DropMenu).at(1)
    })
    it('loading이 끝난 후, MyPage Link는 "/MyPage" props를 가져야한다.', () => {
      expect(component.state('loading')).toEqual(false)
      expect(component.find(Link).at(1).prop('href')).toEqual('/MyPage')
    })

    it('dropmenu 클릭 시, drop menu가 렌더되어야 한다.', () => {
      expect(component.state('showDropMenu')).toEqual(false)
      expect(userDropMenu().prop('style').display).toEqual('none')
      component.find('#user_menu_btn').simulate('click')

      expect(component.state('showDropMenu')).toEqual(true)
      expect(userDropMenu().prop('style').display).toEqual('block')
    })

    it('logout 클릭 시, logout API 함수가 호출 되어야 한다.', async () => {
      userDropMenu().find('button').simulate('click')

      await flushPromises()

      expect(logoutSpy).toHaveBeenCalled()
    })

    it('기관메뉴 클릭 시, drop menu가 렌더되어야 한다', () => {
      expect(component.state('showOrganizationList')).toEqual(false)
      expect(organizationDropMenu().prop('style').display).toEqual('none')
      component.find('#organization_menu_btn').simulate('click')

      expect(component.state('showOrganizationList')).toEqual(true)
      expect(organizationDropMenu().prop('style').display).toEqual('block')
    })

    it('기관메뉴 오픈된 상태에서, 기관명 클릭 시, 선택된 기관으로 바뀌어야한다.', () => {
      const expectedOrganization = 'Chonnam National University Hospital'

      component.find('#organization_menu_btn').simulate('click')
      expect(component.state('showOrganizationList')).toEqual(true)
      expect(organizationDropMenu().find('dd')).toHaveLength(mockData.organizationData.total_length)

      component.find('dd[data-key="cnuh"]').simulate('click')

      expect(getOrganizationNameSpy).toHaveBeenCalled()
      expect(setDataSource).toHaveBeenCalled()
      expect(component.state('selectedOrganization')).toEqual(expectedOrganization)
      expect(component.state('showOrganizationList')).toEqual(false)
    })
  })

  describe('계정마다 gnb 구분', () => {
    beforeEach(() => {
      axiosMock
        .onGet(
          `${config.HOSTNAME}/api/user/info`,
          { headers: { Authorization: 'Bearer token' } },
        )
        .replyOnce(200, { ...mockData.userInfoData })
        .onGet(
          `${config.HOSTNAME}/api/user/info`,
          { headers: { Authorization: 'Bearer token' } },
        )
        .reply(200, { ...organizationUserInfo });
    })
    it('linewalks 계정이면, gnb에서 dropdown box가 렌더링 된다.', async () => {
      await flushPromises()
      component.update()

      expect(organizationDropMenu()).toHaveLength(1)
    })

    it('병원 계정이면, gnb에서 기관명이 렌더링 된다.', async () => {
      await flushPromises()
      component.update()

      expect(component.find('#organization_name')).toHaveLength(1)
    })
  })
  describe('url로 카테고리 렌더링', () => {
    beforeEach(() => {
      category = () => component.find('span').at(0)
    })
    it('모델 상세페이지, 환자 상세페이지, 환자 비교페이지에서 카테고리가 표시되어야 한다.', async () => {
      await flushPromises()
      component.update()

      expect(component.state('isModelCategory')).toBeTruthy()
      expect(category().prop('children')).toEqual('Risk of Death')
    })
  })
})
