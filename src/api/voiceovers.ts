import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopVoiceOvers = {
  id: number
  name: string
}
type voiceoverItem = TopVoiceOvers& {
  filename: string
  url: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult =Result<voiceoverItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  voiceoverId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getVoiceOverPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/voiceover/getVoiceOverPages',
    data: queryCondition,
  })
}
type CreateOrEnditvoiceover = Partial<voiceoverItem>
export const saveOrUpdate = (data: CreateOrEnditvoiceover) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/voiceover/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteVoiceOver = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/voiceover/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enableVoiceOver = (voiceoverId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/voiceover/saveOrUpdate',
    data: {
      id: voiceoverId,
      status: 'ENABLE',
    },
  })
}

export const forbidVoiceOver = (voiceoverId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/voiceover/saveOrUpdate',
    data: {
      id: voiceoverId,
      status: 'DISABLE',
    },
  })
}

export const getTopVoiceOvers = () => {
  return request<Common<TopVoiceOvers[]>>({
    method: 'GET',
    url: '/api/voiceover/TopVoiceOvers',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
