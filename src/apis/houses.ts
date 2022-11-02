import { http } from '@/utils/http'

export const getHouses = (params: { [key: string]: string | number }) => http.get('/houses', { params })
export const getConditions = (params: { id: string }) => http.get('/houses/condition', { params })
