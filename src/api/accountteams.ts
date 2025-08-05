import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'

export type QueryCondition = Partial<Condition&{
  number: number
}>

export type TopItem = {
  id: number
  number: number
  scope: string}
type InItem = TopItem&{
  Computer_id: number
  TeamOwner_id: number
  Phone_id: number
  TypeVideo_id: number
  TypeCover_id: number
  TypeSubtitle_id: number}

type Item = InItem&{
  Computer: string
  shorthand: string
  TypeVideo: string
  Phone: string
  TypeCover: string
  TypeSubtitle: string
  createdTime: string
  videoheight: number
  videowidth: number
  fixedtitle: string
  fontsize: number
  fontcolor: string
  status: 'ENABLE' | 'DISABLE'}

export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/accountteam/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditaccountteam = Partial<InItem>
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

export const enableAccountTeam = (accountteam_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/accountteam/saveOrUpdate',
    data: {
      id: accountteam_id,
      status: 'ENABLE',
    },
  })
}

export const forbidAccountTeam = (accountteam_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/accountteam/saveOrUpdate',
    data: {
      id: accountteam_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/accountteam/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
