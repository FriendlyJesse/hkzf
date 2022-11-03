import { http } from '@/utils/http'

export interface loginParams {
  username: string
  password: string
}

export const getHouses = () => http.get('/user/houses')
export const login = (data: loginParams) => http.post('/user/login', data)
