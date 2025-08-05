import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  text: string
}>
type InItem = {
  id: number
  text: string
}
type Item =InItem& {
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/prompttext/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditprompttext = Partial<InItem>
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

export const enablePromptText = (prompttext_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/prompttext/saveOrUpdate',
    data: {
      id: prompttext_id,
      status: 'ENABLE',
    },
  })
}

export const forbidPromptText = (prompttext_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/prompttext/saveOrUpdate',
    data: {
      id: prompttext_id,
      status: 'DISABLE',
    },
  })
}
