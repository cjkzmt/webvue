import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopPNumbers = {
  id: number
  number: number }
type pnumberItem = TopPNumbers&{
  code:number
  rent: number // 手机所属的型号
  Owner: string // 手机的拥有者或使用者
  createdTime: string // 手机创建时间，格式通常为日期时间字符串，例如 "2025-06-13T10:00:00Z"
  PNumberId: number
  PNumber: string
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<pnumberItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  number: number // 电话号码查询条件，用于筛选电话号码匹配的手机
  PNumberId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getPNumberPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/pnumber/getPNumberPages',
    data: queryCondition,
  })
}

type CreateOrEnditpnumber = Partial<pnumberItem>
export const saveOrUpdate = (data: CreateOrEnditpnumber) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deletePNumber = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/pnumber/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enablePNumber = (pnumberId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data: {
      id: pnumberId,
      status: 'ENABLE',
    },
  })
}

export const forbidPNumber = (pnumberId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/pnumber/saveOrUpdate',
    data: {
      id: pnumberId,
      status: 'DISABLE',
    },
  })
}



export const getTopPNumbers = () => {
  return request<Common<TopPNumbers[]>>({
    method: 'GET',
    url: '/api/pnumber/TopPNumbers',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
