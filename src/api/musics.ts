import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopMusics = {
  id: number
  name: string
}
type musicItem = TopMusics& {
  duration: number
  url: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'
}
export type QueryResult = Result<musicItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  musicId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getMusicPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/music/getMusicPages',
    data: queryCondition,
  })
}

type CreateOrEnditmusic = Partial<musicItem>
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

export const enableMusic = (musicId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/music/saveOrUpdate',
    data: {
      id: musicId,
      status: 'ENABLE',
    },
  })
}

export const forbidMusic = (musicId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/music/saveOrUpdate',
    data: {
      id: musicId,
      status: 'DISABLE',
    },
  })
}

export const getTopMusics = () => {
  return request<Common<TopMusics[]>>({
    method: 'GET',
    url: '/api/music/TopMusics',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
