import axios from 'axios'
import { getCookie } from '@/utils/cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置Nprogress项 关闭右上角螺旋加载提示
NProgress.configure({ showSpinner: false })

// 默认设置校验码
// axios.defaults.headers.common.Authorization = `Bearer ${getCookie('Access-Token')}`
// 设置默认请求格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 允许axios携带cookie
// axios.defaults.withCredentials = true

// 封装axios
const request = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_URL,
  // 设置超时时间
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with, Cache-Control, Origin, Accept, X-Requested-With, Access-Control-Allow-Headers, Access-Control-Allow-Origin'
  }
})

// 请求拦截器
request.interceptors.request.use(
  async config => {
    // 开启进度条
    NProgress.start()
    // 请求拦截添加校验码
    // config.headers.Authorization = `Bearer ${getCookie('Access-Token')}`
    return config
  },
  error => {
    // 关闭进度条
    NProgress.done()
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 关闭进度条
    NProgress.done()
    return response
  },
  error => {
    // 关闭进度条
    NProgress.done()
    return Promise.reject(error)
  }
)

// 导出封装axios对象
export default request
