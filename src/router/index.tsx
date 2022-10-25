import { createBrowserRouter, Navigate } from 'react-router-dom'

import Tabbar from '../pages/Tabbar'
import Index from '../pages/Tabbar/Index'
import News from '../pages/Tabbar/News'

import CityList from '../pages/CityList'

const router = createBrowserRouter([
  // 重定向
  {
    path: '/',
    element: <Navigate to='/index' replace />
  },
  {
    path: '/',
    element: <Tabbar />,
    children: [
      {
        path: 'index',
        element: <Index />
      },
      {
        path: 'news',
        element: <News />
      }
    ]
  },
  {
    path: 'city-list',
    element: <CityList />,
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/index' />
  }
])

export default router