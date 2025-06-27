import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

type certifierItem = {
  id: number // 手机的唯一标识符（手机ID）
  name: string // 手机的名称或手机名
  idnumber: number // 手机所属的型号
  Owner: string // 手机的拥有者或使用者
  createdTime: string // 手机创建时间，格式通常为日期时间字符串，例如 "2025-06-13T10:00:00Z"
  status: 'ENABLE' | 'DISABLE' // 手机的状态，取值为 "ENABLE" 或 "DISABLE"
}
export type QueryResult = {
  current: number // 当前页码
  hitcount: boolean // 是否命中计数，用于分页查询时是否统计总记录数
  optimizeCountSql: boolean // 是否优化计数SQL，用于分页查询性能优化
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[] // 排序条件数组，具体结构根据实际需求定义
  pages: number // 总页数
  records: certifierItem[] // 当前页的手机记录列表
  searchCount: boolean // 是否进行搜索计数，用于分页查询时是否统计总记录数
  size: number // 每页显示的记录数
  total: number // 总记录数
}
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  certifierName: string // 手机名查询条件，用于筛选手机名匹配的手机
  idnumber: number // 电话号码查询条件，用于筛选电话号码匹配的手机
  certifierId: number // 手机ID查询条件，用于筛选特定手机ID的手机
  statCreateTime: string // 开始创建时间，用于筛选创建时间范围的起始时间
  endCreateTime: string // 结束创建时间，用于筛选创建时间范围的结束时间
}>
export const getCertifierPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/certifier/getCertifierPages',
    data: queryCondition,
  })
}

type CreateOrEnditcertifier = Partial<certifierItem>
export const saveOrUpdate = (data: CreateOrEnditcertifier) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/certifier/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteCertifier = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/certifier/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableCertifier = (certifierId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/certifier/saveOrUpdate',
    data: {
      id: certifierId,
      status: 'ENABLE',
    },
  })
}

export const forbidCertifier = (certifierId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/certifier/saveOrUpdate',
    data: {
      id: certifierId,
      status: 'DISABLE',
    },
  })
}
export type TopCertifiers = {
  id: number // 手机的唯一标识符（手机ID）
  name: string // 手机的名称或手机名
}

export const getTopCertifiers = () => {
  return request<Common<TopCertifiers[]>>({
    method: 'GET',
    url: '/api/certifier/TopCertifiers',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}
