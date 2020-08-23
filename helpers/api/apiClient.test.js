import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as session from '@helpers/api/session'
import ApiClient from './apiClient'

const axiosMock = new MockAdapter(axios);

// Use to wait for request with API calls
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let api;
let url;
let dataSource;
let addDataSourceSpy;
let param;
let expected;

describe('ApiClient', () => {
  beforeEach(() => {
    url = `/api/data/test`
    api = new ApiClient({ url })
    param = {}
    dataSource = 'hospital'
    addDataSourceSpy = jest.spyOn(api, 'addDataSourceParam')
    session.getCookie = jest.fn().mockImplementation((key) => {
      if (key === 'dataSource') return dataSource
      return undefined;
    })

    axiosMock.onGet(url).reply(200)
    axiosMock.onPost(url).reply(200)
  })

  describe('addDataSourceParam', () => {
    it('api/data를 포함하지않으면, param을 반환한다', () => {
      expected = {}
      url = `/api/test`
      api = new ApiClient({ url })
      expect(api.addDataSourceParam(param, dataSource)).toEqual(expected)
    })

    it('api/data를 포함하면 param에 data_source를 추가해서 반환한다', () => {
      expected = { data_source: dataSource }
      expect(api.addDataSourceParam(param, dataSource)).toEqual(expected)
    })
  })

  it('url에 api/data를 포함하면, get요청은 addDataSourceParams 함수를 호출한다.', async () => {
    api.get(param)
    await flushPromises()

    expect(addDataSourceSpy).toHaveBeenCalled()
  })

  it('url에 api/data를 포함하면, post요청은 addDataSourceParams 함수를 호출한다.', async () => {
    api.post(param)
    await flushPromises()

    expect(addDataSourceSpy).toHaveBeenCalled()
  })
})
