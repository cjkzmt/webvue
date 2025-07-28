import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopTeamOwners = {
  id: number
  shorthand:string
}
type TeamOwnerItem = TopTeamOwners& {
  name: string
  alias: string
  Title:string
  number: number
  address: string
  email: string
  note:string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<TeamOwnerItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  TeamOwnerId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getTeamOwnerPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/teamowner/getTeamOwnerPages',
    data: queryCondition,
  })
}

type CreateOrEnditTeamOwner = Partial<TeamOwnerItem>
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

export const enableTeamOwner = (TeamOwnerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/teamowner/saveOrUpdate',
    data: {
      id: TeamOwnerId,
      status: 'ENABLE',
    },
  })
}

export const forbidTeamOwner = (TeamOwnerId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/teamowner/saveOrUpdate',
    data: {
      id: TeamOwnerId,
      status: 'DISABLE',
    },
  })
}

export const getTopTeamOwners = () => {
  return request<Common<TopTeamOwners[]>>({
    method: 'GET',
    url: '/api/teamowner/TopTeamOwners',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
