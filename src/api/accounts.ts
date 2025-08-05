import request from '@/utils/request'
import type {Common ,Result,Condition} from '@/utils/QueryResult'

export type QueryCondition = Partial<Condition&{
  PNumber_id: number
  Phone_id: number
  Platform_id: number
}>

type OutItem = {
  id: number
  AccountTeam_id: number
  Platform_id: number
  name: string
  number: string
  password: string
  profile: string
  PNumber_id: number
  Certifier_id: number
  note:string

}

type Item = OutItem&{
  shorthand: string
  isDel: boolean
  AccountTeam: number
  Platform: string
  createdTime:string
  updatedTime:string
  PNumber: number
  Certifier: string
  status: 'ENABLE' | 'DISABLE'
}

export type QueryResult = Result<Item[]>


export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/account/getPages',
    data: queryCondition,
  })
}
type CreateOrEnditaccount = Partial<OutItem>
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
export const deleteAccount = (account_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: account_id,
      isDel: true,
    },
  })
}
export const enableAccount = (account_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: account_id,
      status: 'ENABLE',
    },
  })
}
export const forbidAccount = (account_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/saveOrUpdate',
    data: {
      id: account_id,
      status: 'DISABLE',
    },
  })
}




export const CreateIteams = () => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/account/CreateIteams',
  })
}

