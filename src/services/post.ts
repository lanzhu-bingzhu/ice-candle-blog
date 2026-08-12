import request from './api'
import type { Response, ListResponse } from '@/types'

export const fetchPosts = (params?: Record<any, string> | Object) =>
    request.get<any, ListResponse>(`/post`, { params: params }).then(res => res.data)

// 根据 ID 获取单篇文章
export const fetchPostById = (postId: string | number) =>
    request.get<any, Response>(`/post/${postId}`).then(res => res.data)