import { http } from '@/utils/http'

export interface loginParams {
  username: string
  password: string
}

export const login = (data: loginParams) => http.post('/user/login', data)
export const register = (data: loginParams) => http.post('/user/registered', data)

export const getHouses = () => http.get('/user/houses')
export const getUser = () => http.get('/user')
