import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  name: string
}>

export type TopItem = {
  id: number
  name: string}

type InItem = TopItem&{ Verification: string}

type Item = InItem&{
  createtext:  'ENABLE' | 'DISABLE'
  createvideo:  'ENABLE' | 'DISABLE'
  publishvideo:  'ENABLE' | 'DISABLE'
  status: 'ENABLE' | 'DISABLE'}


export type QueryResult = Result<Item[]>
type CreateOrEnditcomputer = Partial<InItem>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/computer/getPages',
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

export const enableComputer = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      status: 'ENABLE',
    },
  })
}

export const forbidComputer = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      status: 'DISABLE',
    },
  })
}

export const enablecreatetext = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      createtext: 'ENABLE',
    },
  })
}

export const forbidcreatetext = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      createtext: 'DISABLE',
    },
  })
}

export const enablecreatevideo = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      createvideo: 'ENABLE',
    },
  })
}

export const forbidcreatevideo = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      createvideo: 'DISABLE',
    },
  })
}

export const enablepublishvideo = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      publishvideo: 'ENABLE',
    },
  })
}

export const forbidpublishvideo = (computer_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/computer/saveOrUpdate',
    data: {
      id: computer_id,
      publishvideo: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/computer/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
