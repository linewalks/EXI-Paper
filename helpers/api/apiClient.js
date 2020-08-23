import axios from 'axios'
import _ from 'lodash'
import * as session from '@helpers/api/session'
import Router from 'next/router'
import HOSTNAME from './config'

axios.defaults.baseURL = HOSTNAME
// axios.defaults.headers.common.Authorization = `Bearer ${session.getCookie('jwt')}`
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete.Accept = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

// axios.interceptors.request.use(
//   (config) => Promise.resolve(config), (error) => Promise.reject(error),
// )

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (_.isEmpty(error.response)) { // Network Error
      return alert('network error')
    }

    const { status } = error.response
    const { msg } = error.response.data
    if ([401, 404, 422].includes(error.response.status)) {
      session.removeAllCookies()
      if (window.location.pathname !== '/signin') {
        Router.push('/signin')
      }
    }
    return Promise.reject(error, { status, msg })
  },
)

const Cancel = {
  get: {},
}

export default class ApiClient {
  constructor({ path, url, previousCancel = true }) {
    this.endpoint = url || path
    this.previousCancel = previousCancel
  }

  addDataSourceParam = (param, dataSource) => {
    if (_.startsWith(this.endpoint, '/api/data')) {
      return { ...param, data_source: dataSource }
    }

    return param
  }

  get = async (payload) => {
    if (this.previousCancel && Cancel.get[this.endpoint]) {
      Cancel.get[this.endpoint].cancel()
      delete Cancel.get[this.endpoint]
    }

    Cancel.get[this.endpoint] = axios.CancelToken.source()

    const res = await axios.get(this.endpoint, {
      params: this.addDataSourceParam(payload, session.getCookie('dataSource')),
      cancelToken: Cancel.get[this.endpoint].token,
    })

    return res
  }

  post = async (payload) => {
    const res = await axios.post(this.endpoint, {
      ...this.addDataSourceParam(payload, session.getCookie('dataSource')),
    })
    return res
  }
}
