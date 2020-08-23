import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  render,
  fireEvent,
  queryByAttribute,
  cleanup,
} from '@testing-library/react'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as nextRouter from 'next/router';
import ChangePassword from '../../pages/ChangePassword/ChangePassword';

const axiosMock = new MockAdapter(axios);

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

let component;
let changeBtn;
let cancelBtn;
let oldInput;
let newInput;
let confirmInput;
let getById;
let initInput;

describe('ChangePassword Component', () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/ChangePassword' }))
    getById = queryByAttribute.bind(null, 'id');
    component = render(<ChangePassword />)
    cancelBtn = getById(component.container, 'cancel')
    changeBtn = getById(component.container, 'change')
    oldInput = component.getByPlaceholderText('Enter your old password')
    newInput = component.getByPlaceholderText('Enter your change password')
    confirmInput = component.getByPlaceholderText('Enter your change again')
    initInput = {
      old_password: '',
      new_password: '',
      password2: '',
    }
  })

  afterEach(() => cleanup())

  describe('init', () => {
    it('초기 렌더링시 change, cancle bnt은 disabled 되어야 한다', () => {
      expect(changeBtn).toBeDisabled()
      expect(cancelBtn).toBeDisabled()
    })
  })

  describe('change btn', () => {
    it('input의 입력 값이 8자리 이상이면, disabled이 해제되어야 한다', async () => {
      await act(async () => {
        fireEvent.input(oldInput, { target: { value: 'hello123' } })
      })

      expect(oldInput.value).toEqual('hello123')
      expect(changeBtn).not.toBeDisabled()
      expect(cancelBtn).not.toBeDisabled()
    })

    it('change btn 클릭 시, change, cancle btn disabled 및 post api가 호출되어야 한다', async () => {
      window.alert = jest.fn()

      await act(async () => {
        fireEvent.input(oldInput, { target: { value: 'hello123' } })
        fireEvent.input(newInput, { target: { value: 'hello12345' } })
        fireEvent.input(confirmInput, { target: { value: 'hello12345' } })
      })

      await act(async () => {
        fireEvent.click(changeBtn)
      })

      expect(window.alert).toHaveBeenCalled()
      expect(changeBtn).toBeDisabled()
      expect(cancelBtn).toBeDisabled()
    })
  })

  describe('cancel btn', () => {
    it('input의 입력 값이 8자리 이상이면, disabled이 해제되어야 한다', async () => {
      await act(async () => {
        fireEvent.input(oldInput, { target: { value: 'hello123' } })
      })

      expect(oldInput.value).toEqual('hello123')
      expect(changeBtn).not.toBeDisabled()
      expect(cancelBtn).not.toBeDisabled()
    })

    it('cancel btn 클릭 시, change, cancle btn disabled 및 input이 초기화 된다.', async () => {
      await act(async () => {
        fireEvent.input(oldInput, { target: { value: 'hello123' } })
        fireEvent.input(newInput, { target: { value: 'hello12345' } })
        fireEvent.input(confirmInput, { target: { value: 'hello12345' } })
      })

      await act(async () => {
        fireEvent.click(cancelBtn)
      })

      expect(oldInput.value).toEqual(initInput.old_password)
      expect(newInput.value).toEqual(initInput.new_password)
      expect(confirmInput.value).toEqual(initInput.password2)
      expect(changeBtn).toBeDisabled()
      expect(cancelBtn).toBeDisabled()
    })
  })
})
