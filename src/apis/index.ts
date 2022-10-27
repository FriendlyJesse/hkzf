import { http } from '@/utils/http'

export const getSwipers = () => http.get('/home/swiper')
export const getGroups = (params: { area: string }) => http.get('/home/groups', { params })
export const getNews = (params: { area: string }) => http.get('/home/news', { params })