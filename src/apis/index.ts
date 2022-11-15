import { newHttp } from '@/utils/http'

export const getSwipers = () => newHttp.get('/home/swipers')
export const getGroups = () => newHttp.get('/home/groups')
export const getNews = (params?: { size?: number, page?: number }) => newHttp.get('/home/news', { params })
