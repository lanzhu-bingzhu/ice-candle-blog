import request from './api'
import type { ListResponse } from '@/types'

export const fetchFloors = () =>
    request.get<any, ListResponse>('/floor').then(res => res.data)