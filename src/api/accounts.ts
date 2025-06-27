import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

type accountItem = {
  id: number
  name: string
  number: string
  password: string
  profile: string
  team: number
  note: string
  PNumberId: number
  PNumber: number
  CertifierId: number
  Certifier: string
  PlatformId: number
  Platform: string
  PhoneId: number
  Phone: string
  status: 'ENABLE' | 'DISABLE'
  updatedTime: string
  createdTime: string
}
export type QueryResult = {
  current: number // 当前页码
  hitcount: boolean // 是否命中计数，用于分页查询时是否统计总记录数
  optimizeCountSql: boolean // 是否优化计数SQL，用于分页查询性能优化
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[]
  pages: number
  records: accountItem[]
  searchCount: boolean
  size: number
  total: number
}
export type QueryCondition = Partial<{
  currentPage: number
  pageSize: number
  PlatformId: number
  AccountId: number
  PNumberId: number
  PhoneId: number
  statCreateTime: string
  endCreateTime: string
}>
export const getAccountPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/account/getAccountPages',
    data: queryCondition,
  })
}

type CreateOrEnditaccount = Partial<accountItem>
export const saveOrUpdate = (data: CreateOrEnditaccount) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      isDel: true,
    },
  })
}

export const enableAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      status: 'ENABLE',
    },
  })
}

export const forbidAccount = (accountId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: accountId,
      status: 'DISABLE',
    },
  })
}
