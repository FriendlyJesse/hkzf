import axios from 'axios'
import { Toast } from 'antd-mobile'

const http = axios.create({
  baseURL: 'http://localhost:8080/'
})

function handleError (Error: any) {
  const { error } = Error.response.data
  Toast.show({
    icon: 'fail',
    content: `服务器崩溃啦，请稍后重试，原因：${(error as string)}`
  })
}

http.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token') ?? ''
  token && (config.headers.Authorization = `${token}`)
  return config
})

http.interceptors.response.use((res) => {
  const { status, description, body } = res.data
  res.data.code = status
  res.data.msg = description
  res.data.data = body
  return res.data
}, handleError)

export {
  http
}
