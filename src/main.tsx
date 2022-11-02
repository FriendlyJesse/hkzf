import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// 导入字体图标库的样式文件
import '@/assets/fonts/iconfont.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
