import { http } from '@/utils/http'

export const getHouses = (params: { [key: string]: string | number }) => http.get('/houses', { params })
export const getHouse = (id: string) => http.get(`/houses/${id}`)
export const getConditions = (params: { id: string }) => http.get('/houses/condition', { params })
export const uploadImg = (file: File) => http.post('/houses/image', { file }, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
