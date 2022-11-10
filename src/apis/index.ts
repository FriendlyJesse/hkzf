import { http, newHttp } from '@/utils/http'

export const getSwipers = () => newHttp.get('/api/home/swipers')
export const getGroups = (params: { area: string }) => http.get('/home/groups', { params })
export const getNews = (params: { area: string }) => http.get('/home/news', { params })
