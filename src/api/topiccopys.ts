import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'

type topiccopyItem = {
  id: number
  text: string
  url: string
  AuthorId: number
  Author:string
  TypeTextId:number
  TypeText: string
  topicnum:number
  copynum:number
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<topiccopyItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  TopicCopyId: string
  TypeTextId: number
  status: string
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getTopicCopyPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/topiccopy/getTopicCopyPages',
    data: queryCondition,
  })
}

type CreateOrEndittopiccopy = Partial<topiccopyItem>
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

export const enableTopicCopy = (topiccopyId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/topiccopy/saveOrUpdate',
    data: {
      id: topiccopyId,
      status: 'ENABLE',
    },
  })
}

export const forbidTopicCopy = (topiccopyId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/topiccopy/saveOrUpdate',
    data: {
      id: topiccopyId,
      status: 'DISABLE',
    },
  })
}
