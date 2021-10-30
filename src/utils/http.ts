import axios from 'axios'
import { apiBaseUrl } from './config'
import user from './user'

import { Toast } from 'vant'


axios.defaults.baseURL = apiBaseUrl
axios.defaults.headers.common['content-type'] = 'application/json'
axios.defaults.responseType = 'json'
axios.defaults.timeout = 30000
axios.interceptors.response.use((res) => {
  if (res.status === 200 && res.data) {
    return res.data
  }
  return Promise.reject(new Error(String(res.status)))
}, (err) => {
  Promise.reject(err)
  Toast({
    message: '网络异常',
    type: 'fail',
    icon: ''
  });
})
axios.interceptors.request.use((config) => {
  if (user && user.token) {
    config.headers!.auth = user.token 
  }
  return config
})

class Http {
  get<T = any>(url: string, params: object = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      axios<T>({
        url: this.getUrl(url),
        params,
        method: 'GET'
      }).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  post(url: string, data: object = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl(url),
        data,
        method: 'POST'
      }).then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  getUrl(url: string = '') {
    return url
  }
}

export default new Http()