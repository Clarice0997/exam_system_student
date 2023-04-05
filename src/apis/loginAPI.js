// 导入封装 axios 对象
import request from '@/utils/request.js'

/**
 * 登录 API
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const loginAPI = async (studentId, password) => {
  return request.post('/apis/user/login', { studentId, password })
}

/**
 * 注册 API
 * @param {*} studentId
 * @param {*} password
 * @param {*} name
 * @returns
 */
export const registerAPI = async (studentId, password, name) => {
  return request.post('/apis/user/register', { studentId, password, name })
}
