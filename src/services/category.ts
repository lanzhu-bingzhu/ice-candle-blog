import request from './api'
import type { Response, ListResponse } from '@/types'

// 获取顶级分类（parent_id = 0）
export const fetchTopCategories = () =>
    request.get<any, ListResponse>('/category').then(res => res.data)

// 根据父分类 ID 获取子分类
export const fetchSubCategories = (parentId: string | number) =>
    request.get<any, ListResponse>('/category', { params: { parent_id: parentId } }).then(res => res.data)

export const fetchCategoryById = (id: string | number) =>
    request.get<any, Response>(`/category/${id}`).then(res => res.data)