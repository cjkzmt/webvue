import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopFonts = {
  id: number
  name: string}
type fontItem = TopFonts&{
  url: string
  createdTime: string
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<fontItem[]>
type CreateOrEnditfont = Partial<fontItem>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  status: string // 电话号码查询条件，用于筛选电话号码匹配的电脑
  FontId: number // 电脑ID查询条件，用于筛选特定电脑ID的电脑
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getFontPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/font/getFontPages',
    data: queryCondition,
  })
}
export const saveOrUpdate = (data: CreateOrEnditfont) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}
export const deleteFont = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/font/${id}`,
  }).catch((error) => {
    console.error('删除电脑信息失败', error)
    throw new Error('删除电脑信息失败')
  })
}
export const enableFont = (fontId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data: {
      id: fontId,
      status: 'ENABLE',
    },
  })
}
export const forbidFont = (fontId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/font/saveOrUpdate',
    data: {
      id: fontId,
      status: 'DISABLE',
    },
  })
}
export const getTopFonts = () => {
  return request<Common<TopFonts[]>>({
    method: 'GET',
    url: '/api/font/TopFonts',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
