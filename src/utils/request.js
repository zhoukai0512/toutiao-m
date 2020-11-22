/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/', // 基础路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 请求成功调用这里
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须return config
  return config
}, function (error) {
  // Do something with request error
  // 请求本身出错了调用这里
  return Promise.reject(error)
})

export default request
