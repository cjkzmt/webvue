import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  name: string
}>

type TopItem = {
  id: number
  name: string}

type InItem = TopItem&{
  number: number
  url: string
  urlnum: number
  Platform_id: number
}

type Item = InItem&{
  Platform: string
  createdTime: string
  updatedTime: string
  status: 'ENABLE' | 'DISABLE'
}

export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/author/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditauthor = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditauthor) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/author/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteAuthor = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/author/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableAuthor = (author_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/author/saveOrUpdate',
    data: {
      id: author_id,
      status: 'ENABLE',
    },
  })
}

export const forbidAuthor = (author_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/author/saveOrUpdate',
    data: {
      id: author_id,
      status: 'DISABLE',
    },
  })
}
