import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  name: string
}>
export type TopItem = {
  id: number
  name: string
}
type InItem = TopItem& {
  duration: number
  url: string
}
type Item = InItem& {
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/music/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditmusic = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditmusic) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/music/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteMusic = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/music/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableMusic = (music_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/music/saveOrUpdate',
    data: {
      id: music_id,
      status: 'ENABLE',
    },
  })
}

export const forbidMusic = (music_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/music/saveOrUpdate',
    data: {
      id: music_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/music/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
