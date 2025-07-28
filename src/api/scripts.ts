import request from '@/utils/request'
import type {Common, Result } from '@/utils/QueryResult'

type scriptItem = {
  id: number
  VideoTemplateId:  number
  VideoTemplate:  string
  topicId:  number
  topictext:  string
  copyId:  number
  copytext:  string
  PromptTextId:  number
  promptText:  string
  title:string
  AccountTeamId:  number
  AccountTeam:  number
  covercopy: string
  line: string
  linestatus: string
  displaysubtitle: string
  pronunciation: string
  copystatus: string
  FontId: number
  Font: string
  publishtime: string
  TemplateId: string
  ReleasePlanId:  number
  operatorId: number
  ComputerId: number
  videoname: string
  videopath: string
  videostatus: string
  MusicId: number
  Music: string
  VoiceOverId: number
  VoiceOver: string
  douyin: string
  sph: string
  kuaishou: string
  xiaohongshu: string
  status: string
  createdTime: string
  updatedTime: string}

export type QueryResult =Result<scriptItem[]>
export type QueryCondition = Partial<{
  currentPage: number // 查询的当前页码
  pageSize: number // 每页显示的记录数
  ScriptId: string
  AccountTeamId: number
  Day:number
  status: string
  getinfo:string
  publishtime: string
}>
export const getScriptPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/api/script/getScriptPages',
    data: queryCondition,
  })
}

type CreateOrEnditscript = Partial<scriptItem>
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

export const enablesSriptStatus = (scriptId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/saveOrUpdate',
    data: {
      id: scriptId,
      linestatus: 'ENABLE',
      status:"文案待制作"
    },
  })
}

export const enablescopystatus = (scriptId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/script/saveOrUpdate',
    data: {
      id: scriptId,
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
