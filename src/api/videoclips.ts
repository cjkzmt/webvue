import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  name: string
}>
type InItem = {
  id: number
  name: string
  clipsum: number
}
type Item = InItem&{
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}

export type QueryResult = Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/videoclips/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditvideoclips = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditvideoclips) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/videoclips/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteVideoClips = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/videoclips/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}

export const enablevideoclips = (videoclips_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/videoclips/saveOrUpdate',
    data: {
      id: videoclips_id,
      status: 'ENABLE',
    },
  })
}

export const forbidvideoclips = (videoclips_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/videoclips/saveOrUpdate',
    data: {
      id: videoclips_id,
      status: 'DISABLE',
    },
  })
}
