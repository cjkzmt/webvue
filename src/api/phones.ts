import request from '@/utils/request'
import type {Common ,Result} from '@/utils/QueryResult'
export type TopPhones = {
  id: number // 手机的唯一标识符（手机ID）
  name: string // 手机的名称或手机名
  sort: number}
type phoneItem =TopPhones& {
  Model: string // 手机所属的型号
  Brand: string // 手机的厂商或品牌
  Owner: string // 手机的拥有者或使用者
  deviceid: string
  createdTime: string // 手机创建时间，格式通常为日期时间字符串，例如 "2025-06-13T10:00:00Z"
  status: 'ENABLE' | 'DISABLE'}
export type QueryResult = Result<phoneItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  phoneName: string // 手机名查询条件，用于筛选手机名匹配的手机
  Brand: string // 电话号码查询条件，用于筛选电话号码匹配的手机
  phoneId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getPhonePages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/phone/getPhonePages',
    data: queryCondition,
  })
}

type CreateOrEnditphone = Partial<phoneItem>
export const saveOrUpdate = (data: CreateOrEnditphone) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deletePhone = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/phone/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enablePhone = (phoneId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data: {
      id: phoneId,
      status: 'ENABLE',
    },
  })
}

export const forbidPhone = (phoneId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/phone/saveOrUpdate',
    data: {
      id: phoneId,
      status: 'DISABLE',
    },
  })
}

export const getTopPhones = () => {
  return request<Common<TopPhones[]>>({
    method: 'GET',
    url: '/api/phone/TopPhones',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
