import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  model:string
}>

type InItem = {
  id: number
  url_id: number
  url: string
}

type Item = InItem&{
  model:string
  status: 'ENABLE' | 'DISABLE'
}

export type QueryResult = Result<Item[]>


export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/ollama/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditOllama = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditOllama) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/ollama/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteOllama = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/ollama/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enableOllama = (Ollama_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/ollama/saveOrUpdate',
    data: {
      id: Ollama_id,
      status: 'ENABLE',
    },
  })
}

export const forbidOllama = (Ollama_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/ollama/saveOrUpdate',
    data: {
      id: Ollama_id,
      status: 'DISABLE',
    },
  })
}
