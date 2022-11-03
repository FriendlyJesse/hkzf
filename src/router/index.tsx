import { createBrowserRouter, Navigate } from 'react-router-dom'

import Tabbar from '@/pages/Tabbar'
import Index from '@/pages/Tabbar/Index/index'
import News from '@/pages/Tabbar/News'
import Find from '@/pages/Tabbar/Find'
import Mine from '@/pages/Tabbar/Mine'

import Map from '@/pages/Map'
import CityList from '@/pages/CityList'
import Rent from '@/pages/Rent'
import Login from '@/pages/Login'

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
        path: 'find',
        element: <Find />
      },
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'mine',
        element: <Mine />
      }
    ]
  },
  {
    path: 'city-list',
    element: <CityList />
  },
  {
    path: 'map',
    element: <Map />
  },
  {
    path: 'rent',
    element: <Rent />
  },
  {
    path: 'login',
    element: <Login />
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/index' />
  }
])

export default router
