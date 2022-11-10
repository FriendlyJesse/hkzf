import axios from 'axios'
import { Toast } from 'antd-mobile'
import { store } from '@/store'

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
  const { user: { token } } = store.getState()
  token && (config.headers.Authorization = `${token}`)
  return config
})

http.interceptors.response.use((res) => {
  const { status, description, body } = res.data

  res.data.code = status
  res.data.msg = description
  res.data.data = body
  if (status === 400 && res.config.url !== '/user') {
    Toast.show({
      icon: 'fail',
      content: `参数错误，原因：${(description as string)}`
    })
  }

  return res.data
}, handleError)

// 新接口
const newHttp = axios.create({
  baseURL: 'http://localhost:7001/api/'
})
newHttp.interceptors.request.use((config: any) => {
  const { user: { token } } = store.getState()
  token && (config.headers.Authorization = `${token}`)
  return config
})
newHttp.interceptors.response.use((res) => {
  return res.data
}, handleError)

export {
  http,
  newHttp
}
