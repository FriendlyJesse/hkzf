import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/'
})

// http.interceptors.request.use((res) => {

//   return res
// })

http.interceptors.response.use((res) => {
  const { status, body } = res.data
  res.data.code = status
  res.data.data = body
  return res.data
})

export {
  http
}