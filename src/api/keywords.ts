import request from '@/utils/request'
import type {Common } from '@/utils/QueryResult'

export type Item = {
  id: number
  test: string
  sort: number
}

export const getAll = () => {
  return request<Common<Item[]>>({
    method: 'GET',
    url: '/api/keyword/getAll',
  }).catch((error) => {
    console.error('获取平台信息失败', error)
    throw new Error('获取平台信息失败')
  })
}

// type CreateOrEnditPlatform = Partial<Item>
export type CreateOrEnditPlatform = Partial<Item>
export const saveOrUpdate = (PlatformInfo: CreateOrEnditPlatform) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/keyword/saveOrUpdate',
    data: PlatformInfo,
  }).catch((error) => {
    console.error('添加平台信息失败', error)
    throw new Error('添加平台信息失败')
  })
}

export const deleteiteam = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/keyword/${id}`,
  }).catch((error) => {
    console.error('删除平台信息失败', error)
    throw new Error('删除平台信息失败')
  })
}

export const enablepublish = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/keyword/saveOrUpdate',
    data: {
      id: id,
      publish: 'ENABLE' ,
    },
  })
}

export const forbidpublish = (id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/keyword/saveOrUpdate',
    data: {
      id: id,
      publish:'DISABLE',
    },
  })
}
