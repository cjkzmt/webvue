import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'

type urltextItem = {
  id: number
  url: string
  AuthorId: number
  Author: string
  createdTime: string
  status: 'Unfinished' | 'finished'
}
export type QueryResult = Result<urltextItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  urltextId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  status: 'Unfinished' | 'finished'
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getUrlTextPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/urltext/getUrlTextPages',
    data: queryCondition,
  })
}

type CreateOrEnditurltext = Partial<urltextItem>
export const saveOrUpdate = (data: CreateOrEnditurltext) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/urltext/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteUrlText = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/urltext/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableUrlText = (urltextId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/urltext/saveOrUpdate',
    data: {
      id: urltextId,
      status: 'Unfinished',
    },
  })
}

export const forbidUrlText = (urltextId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/urltext/saveOrUpdate',
    data: {
      id: urltextId,
      status: 'finished',
    },
  })
}
