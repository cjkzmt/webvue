import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  number: number
}>
export type TopItem = {
  id: number
  shorthand:string
}
type InItem = TopItem& {
  name: string
  alias: string
  Title:string
  number: number
  address: string
  email: string
  path: string
  scope: string
  clipSum: number
  sort: number
  note:string
}
type Item = InItem& {
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/teamowner/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditTeamOwner = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditTeamOwner) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/teamowner/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteTeamOwner = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/teamowner/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableTeamOwner = (TeamOwner_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/teamowner/saveOrUpdate',
    data: {
      id: TeamOwner_id,
      status: 'ENABLE',
    },
  })
}

export const forbidTeamOwner = (TeamOwner_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/teamowner/saveOrUpdate',
    data: {
      id: TeamOwner_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/teamowner/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
