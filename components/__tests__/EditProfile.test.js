import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as nextRouter from 'next/router';
import EditProfile from '../../pages/EditProfile/EditProfile';

const mockData = require('../../__mocks__/mockData')

const axiosMock = new MockAdapter(axios);

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component;
let eventObj;

describe('EditProfile Component', () => {
  beforeEach(async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/EditProfile' }))
    eventObj = {
      target: { defaultValue: 'lee' },
    }
    component = mount(<EditProfile />)

    await act(async () => {
      await flushPromises()
      component.update()
    })
  })

  it('call api', () => {
    expect(component.find('input').at(0).prop('defaultValue')).toEqual(mockData.userInfoData.name)
    expect(component.find('input').at(1).prop('defaultValue')).toEqual(mockData.userInfoData.email)
    expect(component.find('select option').prop('value')).toEqual(mockData.userInfoData.organization.id)
  })

  it('input focus후 타이핑 입력시, save, cancel btn 활성화', async () => {
    await act(async () => {
      component.find('input').at(0).simulate('change', eventObj)
    })

    component.update()

    expect(component.find('button#cancel').prop('disabled')).toEqual(false)
    expect(component.find('button#save').prop('disabled')).toEqual(false)
  })

  it('input focus후 타이핑 입력하고, cancel btn 클릭시 input 초기화', async () => {
    await act(async () => {
      component.find('input').at(0).simulate('change', eventObj)
    })

    component.update()

    expect(component.find('button#cancel').prop('disabled')).toEqual(false)
    expect(component.find('button#save').prop('disabled')).toEqual(false)

    await act(async () => {
      component.find('button#cancel').simulate('click')
    })

    component.update()

    expect(component.find('button#save').prop('disabled')).toEqual(true)
    expect(component.find('button#cancel').prop('disabled')).toEqual(true)
    expect(component.find('input').at(0).prop('defaultValue')).toEqual(mockData.userInfoData.name)
    expect(component.find('input').at(1).prop('defaultValue')).toEqual(mockData.userInfoData.email)
  })

  it('input focus후 타이핑 입력하고, save btn 클릭시 api call', async () => {
    window.alert = jest.fn()

    await act(async () => {
      component.find('input').at(0).simulate('change', eventObj)
    })

    component.update()

    expect(component.find('button#save').prop('disabled')).toEqual(false)

    await act(async () => {
      component.find('form').simulate('submit')
    })

    component.update()

    expect(window.alert).toHaveBeenCalled()
    expect(component.find('button#save').prop('disabled')).toEqual(true)
    expect(component.find('button#cancel').prop('disabled')).toEqual(true)
  })
})
