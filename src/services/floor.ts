import request from './api'
import type { FloorConfigResponse } from '@/types'

export const fetchFloors = () =>
    request.get<any, FloorConfigResponse>('/floor').then(res => res.data)