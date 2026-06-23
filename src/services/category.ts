import request from './api'
import type { CategoryListResponse } from '@/types'

// 获取顶级分类（parent_id = 0）
export const fetchTopCategories = () =>
    request.get<any, CategoryListResponse>('/category').then(res => res.data)

// 根据父分类 ID 获取子分类
export const fetchSubCategories = (parentId: string | number) =>
    request.get<any, CategoryListResponse>('/category', { params: { parent_id: parentId } }).then(res => res.data)