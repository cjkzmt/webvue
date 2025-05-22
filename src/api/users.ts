import { useTokenStore } from '@/stores/mytoken'
import request from '@/utils/request'
type LoginInfo = {
  name: string
  password: string
}

type CommonReturn<T = string> = {
  success: boolean
  message: string
  state: number
  content: T
}

type LoginResult = CommonReturn

export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/user/login',
    data: loginInfo,

    // data: `name=${loginInfo.name}&password=${loginInfo.password}`,
  })
}

type UserInfo = CommonReturn<{
  isUpdatePassword: boolean
  portrait: string
  userName: string
}>

export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'GET',
    url: '/api/user/getUserInfo',
  })
}

export const logout = () => {
  return request({
    method: 'POST',
    url: '/api/user/logout',
  })
}

type RToken = CommonReturn

let promiseRT: Promise<any>
let isRefreshing = false
export const refreshToken = () => {
  if (isRefreshing) return promiseRT
  isRefreshing = true
  promiseRT = request<RToken>({
    method: 'POST',
    url: '/api/user/refresh_token',
    params: {
      refreshtoken: useTokenStore().token?.refresh_token,
    },
  }).finally(() => {
    isRefreshing = false
  })
  return promiseRT
}
