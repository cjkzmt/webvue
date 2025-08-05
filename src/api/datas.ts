import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'

export type QueryCondition = Partial<Condition&{
  number: number
}>


type Item = {
  id: number
  Script_id :number
  Account_id :number
  title: string
  publishtime : string
  views:number
  completion:number
  comment:number
  like:number
  fav:number
  followers:number
  share:number
  watch:number
  status: 'ENABLE' | 'DISABLE'}

export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/data/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditdata = Partial<Item>
export const saveOrUpdate = (data: CreateOrEnditdata) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/data/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteData = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/data/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableData = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/data/saveOrUpdate',
    data: {
      id: id,
      status: 'ENABLE',
    },
  })
}

export const forbidData = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/data/saveOrUpdate',
    data: {
      id: id,
      status: 'DISABLE',
    },
  })
}
