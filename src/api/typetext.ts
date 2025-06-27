import request from '@/utils/request'
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type TypeTextItem = {
  id: number
  name: string
  description: string
  topicSW: 'ENABLE' | 'DISABLE'
  copySW: 'ENABLE' | 'DISABLE'
  status: 'ENABLE' | 'DISABLE'
  createdTime: string
}

export const getAll = () => {
  return request<Common<TypeTextItem[]>>({
    method: 'GET',
    url: '/api/typetext/getAll',
  }).catch((error) => {
    console.error('获取菜单信息失败', error)
    throw new Error('获取菜单信息失败')
  })
}

export type CreateOrEndittypetext = Partial<TypeTextItem>
export const saveOrUpdate = (typetextInfo: CreateOrEndittypetext) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: typetextInfo,
  }).catch((error) => {
    console.error('添加菜单信息失败', error)
    throw new Error('添加菜单信息失败')
  })
}

export const deleteTypeText = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/typetext/${id}`,
  }).catch((error) => {
    console.error('删除菜单信息失败', error)
    throw new Error('删除菜单信息失败')
  })
}

export const enabletopic = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      topicSW: 'ENABLE',
    },
  })
}
export const forbidtopic = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      topicSW: 'DISABLE',
    },
  })
}
export const enablecopy = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      copySW: 'ENABLE',
    },
  })
}
export const forbidcopy = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      copySW: 'DISABLE',
    },
  })
}
export const enableStatus = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      status: 'ENABLE',
    },
  })
}
export const forbidStatus = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typetext/saveOrUpdate',
    data: {
      id: id,
      status: 'DISABLE',
    },
  })
}
