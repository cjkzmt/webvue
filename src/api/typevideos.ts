import request from '@/utils/request'
import type {Common } from '@/utils/QueryResult'
export type TypeVideoItem = {
  id: number
  name: string
  videoheight: number
  videowidth: number
}

export const getAllTypeVideo = () => {
  return request<Common<TypeVideoItem[]>>({
    method: 'GET',
    url: '/api/typevideo/getAll',
  }).catch((error) => {
    console.error('获取视频样式信息失败', error)
    throw new Error('获取视频样式信息失败')
  })
}

export type CreateOrEnditTypeVideo = Partial<TypeVideoItem>
export const saveOrUpdateTypeVideo = (TypeVideoInfo: CreateOrEnditTypeVideo) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typevideo/saveOrUpdate',
    data: TypeVideoInfo,
  }).catch((error) => {
    console.error('添加视频样式信息失败', error)
    throw new Error('添加视频样式信息失败')
  })
}

export const deleteTypeVideo = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/typevideo/${id}`,
  }).catch((error) => {
    console.error('删除视频样式信息失败', error)
    throw new Error('删除视频样式信息失败')
  })
}

export type TypeCoverItem = {
  id: number
  name: string
  fixedtitle: string
}

export const getAllTypeCover = () => {
  return request<Common<TypeCoverItem[]>>({
    method: 'GET',
    url: '/api/typecover/getAll',
  }).catch((error) => {
    console.error('获取封面样式信息失败', error)
    throw new Error('获取封面样式信息失败')
  })
}

export type CreateOrEnditTypeCover = Partial<TypeCoverItem>
export const saveOrUpdateTypeCover = (TypeCoverInfo: CreateOrEnditTypeCover) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typecover/saveOrUpdate',
    data: TypeCoverInfo,
  }).catch((error) => {
    console.error('添加封面样式信息失败', error)
    throw new Error('添加封面样式信息失败')
  })
}

export const deleteTypeCover = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/typecover/${id}`,
  }).catch((error) => {
    console.error('删除封面样式信息失败', error)
    throw new Error('删除封面样式信息失败')
  })
}

export type TypeSubtitleItem = {
  id: number
  name: string
  fontsize: number
  fontcolor: string
}

export const getAllTypeSubtitle = () => {
  return request<Common<TypeSubtitleItem[]>>({
    method: 'GET',
    url: '/api/typesubtitle/getAll',
  }).catch((error) => {
    console.error('获取字幕样式信息失败', error)
    throw new Error('获取字幕样式信息失败')
  })
}

export type CreateOrEnditTypeSubtitle = Partial<TypeSubtitleItem>
export const saveOrUpdateTypeSubtitle = (TypeSubtitleInfo: CreateOrEnditTypeSubtitle) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/api/typesubtitle/saveOrUpdate',
    data: TypeSubtitleInfo,
  }).catch((error) => {
    console.error('添加字幕样式信息失败', error)
    throw new Error('添加字幕样式信息失败')
  })
}

export const deleteTypeSubtitle = (id: number) => {
  return request<Common<boolean>>({
    method: 'DELETE',
    url: `/api/typesubtitle/${id}`,
  }).catch((error) => {
    console.error('删除字幕样式信息失败', error)
    throw new Error('删除字幕样式信息失败')
  })
}
