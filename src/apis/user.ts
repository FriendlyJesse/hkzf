import { http } from '@/utils/http'

export interface loginParams {
  username: string
  password: string
}

export const login = (data: loginParams) => http.post('/user/login', data)
export const register = (data: loginParams) => http.post('/user/registered', data)
export const hasFavorite = (id: number) => http.get(`/user/favorites/${id}`)
export const addFavorite = (id: number) => http.post(`/user/favorites/${id}`)
export const deleteFavorites = (id: number) => http.delete(`/user/favorites/${id}`)

export const getHouses = () => http.get('/user/houses')
export const getUser = () => http.get('/user')
