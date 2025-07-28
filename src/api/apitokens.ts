import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
type apitokenItem = {
  id: number
  AiApiId: number
  AiApi: string
  AiApiname: string
  PNumberId: number
  PNumber: string
  PNumberOwner: string
  token: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<apitokenItem[]>
export type QueryCondition = Partial<{
  currentPage: number
  pageSize: number
  ApiTokenId: number
  AiApiId: number
  PNumberId: number
  status: string
  statCreateTime: string
  endCreateTime: string
}>
export const getApiTokenPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/apitoken/getApiTokenPages',
    data: queryCondition,
  })
}

type CreateOrEnditapitoken = Partial<apitokenItem>
export const saveOrUpdate = (data: CreateOrEnditapitoken) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/apitoken/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}


export const deleteApiToken = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/apitoken/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableApiToken = (apitokenId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/apitoken/saveOrUpdate',
    data: {
      id: apitokenId,
      status: 'ENABLE',
    },
  })
}

export const forbidApiToken = (apitokenId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/apitoken/saveOrUpdate',
    data: {
      id: apitokenId,
      status: 'DISABLE',
    },
  })
}
