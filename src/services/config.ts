import request from './api'
import type { ListResponse } from '@/types'

export const fetchConfig = () =>
  request.get<any, ListResponse>('/config').then(res => res.data)