import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'

type prompttextItem = {
  id: number
  text: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<prompttextItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  prompttextId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getPromptTextPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/prompttext/getPromptTextPages',
    data: queryCondition,
  })
}

type CreateOrEnditprompttext = Partial<prompttextItem>
export const saveOrUpdate = (data: CreateOrEnditprompttext) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/prompttext/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deletePromptText = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/prompttext/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enablePromptText = (prompttextId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/prompttext/saveOrUpdate',
    data: {
      id: prompttextId,
      status: 'ENABLE',
    },
  })
}

export const forbidPromptText = (prompttextId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/prompttext/saveOrUpdate',
    data: {
      id: prompttextId,
      status: 'DISABLE',
    },
  })
}
