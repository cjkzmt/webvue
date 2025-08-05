import request from '@/utils/request'
import type {Common } from '@/utils/QueryResult'
export type Item = {
  id: number
  name: string
  description: string
  url: string
  port: number
  model: string
  note: string
  status: string
  createdTime: string}

export const getAll = () => {
  return request<Common<Item[]>>({
    method: 'GET',
    url: '/api/aiapi/getAll',
  }).catch((error) => {
    console.error('获取平台信息失败', error)
    throw new Error('获取平台信息失败')
  })
}

export type CreateOrEnditaiapi = Partial<Item>
export const saveOrUpdate = (aiapiInfo: CreateOrEnditaiapi) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/aiapi/saveOrUpdate',
    data: aiapiInfo,
  }).catch((error) => {
    console.error('添加平台信息失败', error)
    throw new Error('添加平台信息失败')
  })
}

export const deleteAiApi = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/aiapi/${id}`,
  }).catch((error) => {
    console.error('删除平台信息失败', error)
    throw new Error('删除平台信息失败')
  })
}


