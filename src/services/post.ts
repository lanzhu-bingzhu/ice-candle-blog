import request from './api'
import type { Response, ListResponse } from '@/types'

// 获取指定分类下的文章列表
export const fetchPostsByCategory = (categoryId: string | number) =>
    request.get<any, ListResponse>(`/category/${categoryId}/post`).then(res => res.data)

// 根据 ID 获取单篇文章
export const fetchPostById = (postId: string | number) =>
    request.get<any, Response>(`/post/${postId}`).then(res => res.data)