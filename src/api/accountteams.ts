import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopAccountTeams = {
  id: number
  number: number
  scope: string}
type accountteamItem = TopAccountTeams&{
  PhoneId:number
  Phone: string
  TypeVideo_id: number
  TypeVideo: string
  TypeCover_id: number
  TypeCover: string
  TypeSubtitle_id: number
  TypeSubtitle: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<accountteamItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  accountteamName: string // 手机名查询条件，用于筛选手机名匹配的手机
  Brand: string // 电话号码查询条件，用于筛选电话号码匹配的手机
  accountteamId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>

export const getAccountTeamPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/accountteam/getAccountTeamPages',
    data: queryCondition,
  })
}

type CreateOrEnditaccountteam = Partial<accountteamItem>
export const saveOrUpdate = (data: CreateOrEnditaccountteam) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/accountteam/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteAccountTeam = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/accountteam/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableAccountTeam = (accountteamId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/accountteam/saveOrUpdate',
    data: {
      id: accountteamId,
      status: 'ENABLE',
    },
  })
}

export const forbidAccountTeam = (accountteamId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/accountteam/saveOrUpdate',
    data: {
      id: accountteamId,
      status: 'DISABLE',
    },
  })
}

export const getTopAccountTeams = () => {
  return request<Common<TopAccountTeams[]>>({
    method: 'GET',
    url: '/api/accountteam/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
