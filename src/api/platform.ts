import request from '@/utils/request'
import type {Common } from '@/utils/QueryResult'

export type PlatformItem = {
  id: number
  name: string
  sort: number
  publish: 'ENABLE' | 'DISABLE'
}

export const getAll = () => {
  return request<Common<PlatformItem[]>>({
    method: 'GET',
    url: '/api/platform/getAll',
  }).catch((error) => {
    console.error('获取平台信息失败', error)
    throw new Error('获取平台信息失败')
  })
}

// type CreateOrEnditPlatform = Partial<PlatformItem>
export type CreateOrEnditPlatform = Partial<PlatformItem>
export const saveOrUpdate = (PlatformInfo: CreateOrEnditPlatform) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/platform/saveOrUpdate',
    data: PlatformInfo,
  }).catch((error) => {
    console.error('添加平台信息失败', error)
    throw new Error('添加平台信息失败')
  })
}

export const deletePlatform = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/platform/${id}`,
  }).catch((error) => {
    console.error('删除平台信息失败', error)
    throw new Error('删除平台信息失败')
  })
}

export const enablepublish = (platformId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/platform/saveOrUpdate',
    data: {
      id: platformId,
      publish: 'ENABLE' ,
    },
  })
}

export const forbidpublish = (platformId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/platform/saveOrUpdate',
    data: {
      id: platformId,
      publish:'DISABLE',
    },
  })
}
