import { http } from '../utils/http'

export const getSwipers: any = () => http.get('/home/swiper')
export const getGroups: any = (params: { area: string }) => http.get('/home/groups', { params })
export const getNews: any = (params: { area: string }) => http.get('/home/news', { params })