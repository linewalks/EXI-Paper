import Router from 'next/router'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import config from '@helpers/api/config.json'
import * as authUtil from './authUtil'

const axiosMock = new MockAdapter(axios);
const mockData = require('../../__mocks__/mockData')

let expected;
let type;
let ctx;
Router.push = jest.fn()

describe('userCheck function', () => {
  describe('type이 all 일 때', () => {
    beforeEach(() => { type = 'all' })

    it('user role이 Administrator 또는 Manager 또는 User이면 true를 반환한다', () => {
      expected = true
      expect(authUtil.userCheck(type, 'User')).toBe(expected)
      expect(authUtil.userCheck(type, 'Manager')).toBe(expected)
      expect(authUtil.userCheck(type, 'Administrator')).toBe(expected)
    })

    it('user role이 없으면 false를 반환한다', () => {
      expected = false
      expect(authUtil.userCheck(type, 'hello')).toBe(expected)
    })
  })

  describe('type이 admin 일 때', () => {
    beforeEach(() => { type = 'admin' })

    it('user role이 Administrator 또는 Manager 또는 User이면 true를 반환한다', () => {
      expected = true
      expect(authUtil.userCheck(type, 'Manager')).toBe(expected)
      expect(authUtil.userCheck(type, 'Administrator')).toBe(expected)
    })

    it('user role이 없으면 false를 반환한다', () => {
      expected = false
      expect(authUtil.userCheck(type, 'User')).toBe(expected)
    })
  })
})

describe('redirect function', () => {
  beforeEach(() => {
    ctx = {
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    }
  })
  it('클라이언트에서 실행되면, Router.push 호출', () => {
    const routerSpy = jest.spyOn(Router, 'push')
    authUtil.redirect(ctx, '/signin')
    expect(routerSpy).toHaveBeenCalled()
    expect(routerSpy).toHaveBeenCalledWith('/signin')
  })

  it('서버에서 실행되면, ctx,res.writeHead 호출', () => {
    Object.defineProperty(global, 'window', { value: undefined });
    const ctxSpy = jest.spyOn(ctx.res, 'writeHead')
    authUtil.redirect(ctx)
    expect(ctxSpy).toHaveBeenCalled()
  })
})

describe('getUserInfo function', () => {
  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/user/info`,
      {
        headers: { Authorization: 'Bearer token' },
      },
    )
    .replyOnce(200, { ...mockData.userInfoData })

  it('api가 정상적으로 호출되면, userRole을 반환한다.', () => {
    authUtil.getUserInfo(mockData.userInfoData.access_token)
      .then((role) => {
        expect(role).toEqual(mockData.userInfoData.role.name)
      })
  })
})
