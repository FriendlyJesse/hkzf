import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'

import Tabbar from '@/pages/Tabbar'
import Index from '@/pages/Tabbar/Index/index'
import News from '@/pages/Tabbar/News'
import Find from '@/pages/Tabbar/Find'
import Mine from '@/pages/Tabbar/Mine'

import Map from '@/pages/Map'
import CityList from '@/pages/CityList'
import Rent from '@/pages/Rent'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// api
import { getUser } from '@/apis/user'

// 鉴权
function auth () {
  const token = localStorage.getItem('token')
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (!token) throw redirect('/login')
}

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
        async loader () {
          const { code, data } = await getUser()
          if (code === 200) {
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data
          }
        },
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
    async loader () {
      auth()
    },
    element: <Rent />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  // 通配符跳转
  {
    path: '*',
    element: <Navigate to='/index' />
  }
])

export default router
