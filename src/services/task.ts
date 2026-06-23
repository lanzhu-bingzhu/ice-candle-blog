import request from './api'
import type { TaskResponse, TaskListResponse } from '@/types'

// 根据任务名称获取单个任务
export const fetchTaskByName = (taskName: string) =>
    request.get<any, TaskResponse>(`/task/${taskName}`).then(res => res.data)

// 获取所有任务（如果需要任务列表页）
export const fetchAllTasks = () =>
    request.get<any, TaskListResponse>('/task').then(res => res.data)