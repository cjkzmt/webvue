import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  TypeText_id: number
}>

type InItem = {
  id: number
  text: string
  url: string
  Author_id: number
  TypeText_id:number
  TypeText: string
  topicnum:number
  copynum:number

}

type Item = InItem&{
  Author:string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/topiccopy/getPages',
    data: queryCondition,
  })
}

type CreateOrEndittopiccopy = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEndittopiccopy) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/topiccopy/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteTopicCopy = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/topiccopy/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableTopicCopy = (topiccopy_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/topiccopy/saveOrUpdate',
    data: {
      id: topiccopy_id,
      status: 'ENABLE',
    },
  })
}

export const forbidTopicCopy = (topiccopy_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/topiccopy/saveOrUpdate',
    data: {
      id: topiccopy_id,
      status: 'DISABLE',
    },
  })
}
