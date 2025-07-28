import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
type accountItem = {
  id: number
  AccountTeamId: number
  AccountTeam: number
  PlatformId: number
  Platform: string
  name: string
  number: string
  isDel: boolean
  password: string
  profile: string
  PNumberId: number
  PNumber: number
  CertifierId: number
  Certifier: string
  status: 'ENABLE' | 'DISABLE'
  note: string
  updatedTime: string
  createdTime: string
}
export type QueryResult = Result<accountItem[]>
export type QueryCondition = Partial<{
  currentPage: number
  pageSize: number
  PlatformId: number
  AccountId: number
  PNumberId: number
  PhoneId: number
  statCreateTime: string
  endCreateTime: string
}>
export const getAccountPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/account/getAccountPages',
    data: queryCondition,
  })
}
type CreateOrEnditaccount = Partial<accountItem>
export const saveOrUpdate = (data: CreateOrEnditaccount) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}
export const deleteAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      isDel: true,
    },
  })
}
export const enableAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      status: 'ENABLE',
    },
  })
}
export const forbidAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      status: 'DISABLE',
    },
  })
}
