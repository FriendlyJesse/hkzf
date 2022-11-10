import { http, newHttp } from '@/utils/http'

export const getSwipers = () => newHttp.get('/home/swipers')
export const getGroups = () => newHttp.get('/home/groups')
export const getNews = (params: { area: string }) => http.get('/home/news', { params })
