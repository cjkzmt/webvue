import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
type computerItem = {
  id: number
  name: string
  uniqueId: string
  createdTime: string
  createtext:  'ENABLE' | 'DISABLE'
  createvideo:  'ENABLE' | 'DISABLE'
  publishvideo:  'ENABLE' | 'DISABLE'
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<computerItem[]>
type CreateOrEnditcomputer = Partial<computerItem>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  computerId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getComputerPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/computer/getComputerPages',
    data: queryCondition,
  })
}
export const saveOrUpdate = (data: CreateOrEnditcomputer) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteComputer = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/computer/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableComputer = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      status: 'ENABLE',
    },
  })
}

export const forbidComputer = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      status: 'DISABLE',
    },
  })
}

export const enablecreatetext = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      createtext: 'ENABLE',
    },
  })
}

export const forbidcreatetext = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      createtext: 'DISABLE',
    },
  })
}

export const enablecreatevideo = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      createvideo: 'ENABLE',
    },
  })
}

export const forbidcreatevideo = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      createvideo: 'DISABLE',
    },
  })
}

export const enablepublishvideo = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      publishvideo: 'ENABLE',
    },
  })
}

export const forbidpublishvideo = (computerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computerId,
      publishvideo: 'DISABLE',
    },
  })
}
