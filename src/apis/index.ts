import { http } from '../utils/http'

export const getSwipers: any = () => http.get('/home/swiper')