import { http } from '@/utils/http'

export const getHouses = () => http.get('/user/houses')
