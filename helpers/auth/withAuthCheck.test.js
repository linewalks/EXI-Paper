import React from 'react'
import Router from 'next/router'
import * as authUtil from './authUtil'
import withAuthCheck from './withAuthCheck'

let Wrapper;
let expected;
let ctx;
let redirectSpy;

const type = 'all'
const jwt = 'token'
const cookieDataSource = 'amc'
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = 'LoadableComponent'
  DynamicComponent.preload = jest.fn()
  return DynamicComponent;
});

describe('withAuthCheck Component', () => {
  beforeEach(() => {
    Wrapper = withAuthCheck(() => <div>hello</div>, type)
    redirectSpy = jest.spyOn(authUtil, 'redirect')
    Router.push = jest.fn()
    ctx = jest.fn()
  })

  afterEach(() => redirectSpy.mockClear())

  it('jwt가 없으면 redirect가 호출 되어야한다', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'jwt=',
    });

    Wrapper.getInitialProps(ctx)
    await flushPromises()

    expect(redirectSpy).toHaveBeenCalled()
  })

  describe('jwt가 있을 때', () => {
    beforeEach(() => {
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `jwt=${jwt}`,
      });
    })

    it('userCheck가 false면 redirect 호출 되어야 한다', async () => {
      const userCheckSpy = jest.spyOn(authUtil, 'userCheck')
      authUtil.getUserInfo = jest.fn().mockImplementationOnce(() => 'ww')
      Wrapper.getInitialProps(ctx)
      await flushPromises()

      expect(userCheckSpy).toHaveBeenCalled()
      expect(redirectSpy).toHaveBeenCalled()
    })

    it('userCheck가 true이면, jwt를 포함한 props를 반환 한다', async () => {
      expected = { jwt, cookieDataSource }
      authUtil.userCheck = jest.fn().mockImplementationOnce(() => true)
      Wrapper.getInitialProps(ctx).then((props) => {
        expect(props).toEqual(expected)
      })
    })
  })
})
