import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  sex: string
}>
export type TopItem = {
  id: number
  name: string
}
type InItem = TopItem& {
  filename: string
  url: string
  createdTime: string
  speed:number
  sex: string


}
type Item = InItem& {
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult =Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/over/getPages',
    data: queryCondition,
  })
}
type CreateOrEnditvoiceover = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditvoiceover) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/over/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteVoiceOver = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/over/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableVoiceOver = (voiceover_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/over/saveOrUpdate',
    data: {
      id: voiceover_id,
      status: 'ENABLE',
    },
  })
}

export const forbidVoiceOver = (voiceover_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/over/saveOrUpdate',
    data: {
      id: voiceover_id,
      status: 'DISABLE',
    },
  })
}

export const TopIteams = () => {
  return request<Common<TopItem[]>>({
    method: 'GET',
    url: '/api/over/TopIteams',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
