import request from './api'
import type { Response, ListResponse } from '@/types'

// 根据任务名称获取单个任务
export const fetchTaskByName = (taskName: string) =>
    request.get<any, Response>(`/task/${taskName}`).then(res => res.data)

// 获取所有任务（如果需要任务列表页）
export const fetchAllTasks = () =>
    request.get<any, ListResponse>('/task').then(res => res.data)