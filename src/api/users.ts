import { useTokenStore } from '@/stores/mytoken'
import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
type LoginInfo = {
  name: string
  password: string}
type CommonReturn<T = string> = {
  success: boolean
  message: string
  state: number
  content: T}
type LoginResult = CommonReturn
type UserInfo = CommonReturn<{
  isUpdatePassword: boolean
  portrait: string
  userName: string
}>
type RToken = CommonReturn
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let promiseRT: Promise<any>
type UserItem =LoginInfo& {
  accountNonExpired: boolean // 账户是否未过期，true表示账户未过期，false表示已过期
  accountNonLocked: boolean // 账户是否未锁定，true表示账户未锁定，false表示已锁定
  createdTime: string // 用户创建时间，格式通常为日期时间字符串，例如 "2025-06-13T10:00:00Z"
  credentialsNonExpired: boolean // 用户凭证（如密码）是否未过期，true表示凭证有效，false表示已过期
  id: number // 用户的唯一标识符（用户ID）
  isDel: boolean // 是否被删除，true表示用户已被标记为删除，false表示用户正常
  phone: string // 用户的电话号码
  portrait: string | null // 用户头像的URL地址，可能为null表示没有头像
  regIp: string | null // 用户注册时的IP地址，可能为null表示未记录
  status: 'ENABLE' | 'DISABLE' // 用户状态，"ENABLE" 表示启用，"DISABLE" 表示禁用
  updatedTime: string // 用户信息最后更新的时间，格式通常为日期时间字符串
}
export type QueryResult = Result<UserItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  userName: string // 用户名查询条件，用于筛选用户名匹配的用户
  phone: string // 电话号码查询条件，用于筛选电话号码匹配的用户
  userId: number // 用户ID查询条件，用于筛选特定用户ID的用户
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>

export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/user/login',
    data: loginInfo,

    // data: `name=${loginInfo.name}&password=${loginInfo.password}`,
  })
}

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

export const getUserPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/user/getUserPages',
    data: queryCondition,
  })
}

export const enableUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/user/saveOrUpdate',
    data: {
      id: userId,
      status: 'ENABLE',
    },
  })
}

export const forbidUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/user/saveOrUpdate',
    data: {
      id: userId,
      status: 'DISABLE',
    },
  })
}
