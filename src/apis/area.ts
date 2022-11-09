import { http } from '@/utils/http'

export const getArea = (params: { id: string }) => http.get('/area', { params })
export const getAreaInfo = (params: { name: string }) => http.get('/area/info', { params })
export const getAreaCity = (params: { level: number }) => http.get('/area/city', { params })
export const getAreaHot = () => http.get('/area/hot')
export const getAreaMap = (params: { id: string }) => http.get('/area/map', { params })
export const getCommunity = (params: { name: string, id: string }) => http.get('/area/community', { params })
