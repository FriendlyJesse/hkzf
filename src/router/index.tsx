import { createBrowserRouter, Navigate } from 'react-router-dom'

import Tabbar from '@/pages/Tabbar'
import Index from '@/pages/Tabbar/Index'
import News from '@/pages/Tabbar/News'
import Find from '@/pages/Tabbar/Find'
import Mine from '@/pages/Tabbar/Mine'

import Map from '@/pages/Map'

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
    element: <CityList />,
  },
  {
    path: 'map',
    element: <Map />
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/index' />
  }
])

export default router