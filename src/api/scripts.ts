import request from '@/utils/request'
import type {Common, Result,Condition } from '@/utils/QueryResult'
export type QueryCondition = Partial<Condition&{
  AccountTeam_id: number
  Day:number
  getinfo: string
}>
type InItem = {
  id: number
  topic_id:  number
  copy_id:  number
  AccountTeam_id:  number
  PromptText_id:  number
  ReleasePlan_id:  number
  publishtime: string
  Music_id: number
  Over_id: number
  Font_id: number
  VideoTemplate_id:  number
  Videopath:  string
  drafline: string
  line: string
  draftitle: string
  title:string
  drafcover: string
  cover: string
  subtitle: string
  reading: string
  videoname: string
}

type DataItem={
  id:  number
  Account_id: number
  Platform: string
  character:number
  keycount:number
  publishurl: string
  verification:string
  status: string
}

type Item = InItem&{
  topictext:  string
  copytext:  string
  AccountTeam:  number
  promptText:  string
  Music: string
  Over: string
  Font: string
  VideoTemplate:  string
  createdTime: string
  linestatus: string
  copystatus: string
  videostatus: string
  Templatenum: string
  operator_id: number
  Computer_id: number
  videopath: string
  publish:DataItem[]
  status: string
  updatedTime: string}

export type QueryResult =Result<Item[]>

export const getPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/script/getPages',
    data: queryCondition,
  })
}

type CreateOrEnditscript = Partial<InItem>
export const saveOrUpdate = (data: CreateOrEnditscript) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/saveOrUpdate',
    data,
  }).catch((error) => {
    console.error('操作失败', error)
    throw new Error('操作失败')
  })
}

export const deleteScript = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/script/${id}`,
  }).catch((error) => {
    console.error('删除手机信息失败', error)
    throw new Error('删除手机信息失败')
  })
}

export const enablesSriptStatus = (script_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/saveOrUpdate',
    data: {
      id: script_id,
      linestatus: 'ENABLE',
      status:"文案待制作"
    },
  })
}

export const enablescopystatus = (script_id: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/saveOrUpdate',
    data: {
      id: script_id,
      copystatus: 'ENABLE',
      status:"视频待制作"
    },
  })
}


export const addTask = () => {
  return request<Common<boolean>>({
    method: 'GET',
    url: '/api/script/addScript'  })}

export const refreshTask = () => {
  return request<Common<boolean>>({
    method: 'GET',
    url: '/api/script/RefreshTask'  })}

export const enablesCopys = (ids: number[]) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/enablesCopys',
    data: {idlist: ids},
  })
}
