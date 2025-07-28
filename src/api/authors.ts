import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
type authorItem = {
  id: number // 手机的唯一标识符（手机ID）
  name: string
  number: number // 手机的名称或手机名
  url: string
  urlnum: number
  PlatformId: number
  Platform: string
  createdTime: string
  updatedTime: string
  status: 'ENABLE' | 'DISABLE' // 手机的状态，取值为 "ENABLE" 或 "DISABLE"
}
export type QueryResult = Result<authorItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  AuthorId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getAuthorPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/author/getAuthorPages',
    data: queryCondition,
  })
}

type CreateOrEnditauthor = Partial<authorItem>
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

export const enableAuthor = (authorId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/author/saveOrUpdate',
    data: {
      id: authorId,
      status: 'ENABLE',
    },
  })
}

export const forbidAuthor = (authorId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/author/saveOrUpdate',
    data: {
      id: authorId,
      status: 'DISABLE',
    },
  })
}
