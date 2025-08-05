import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  number: number
}>
export type TopPNumbers = {
  id: number
  number: number }
type InItem = TopPNumbers&{
  code:number
  rent: number
  Owner: string
  PNumber_id: number  }
type Item = InItem&{
  createdTime: string
  PNumber: string
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/pnumber/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditpnumber = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditpnumber) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deletePNumber = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/pnumber/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enablePNumber = (pnumber_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data: {
      id: pnumber_id,
      status: 'ENABLE',
    },
  })
}

export const forbidPNumber = (pnumber_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data: {
      id: pnumber_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopPNumbers[]>>({
    method: 'GET',
    url: '/api/pnumber/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
