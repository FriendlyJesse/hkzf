import { createBrowserRouter, Navigate, redirect, LoaderFunctionArgs } from 'react-router-dom'
import { Dialog } from 'antd-mobile'
import { getStoredState } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// redux
import { store } from '@/store'

// api
import { getUser, getHouses, hasFavorite } from '@/apis/user'
import { getHouse } from '@/apis/houses'

// routes
import Tabbar from '@/pages/Tabbar'
import Index from '@/pages/Tabbar/Index/index'
import News from '@/pages/Tabbar/News'
import Find from '@/pages/Tabbar/Find'
import Mine from '@/pages/Tabbar/Mine'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Map from '@/pages/Map'
import CityList from '@/pages/CityList'
import Rent from '@/pages/Rent'
import Detail from '@/pages/Detail'

// 鉴权
async function auth (e?: LoaderFunctionArgs) {
  const { user: { isLoggedIn } }: any = await getStoredState({
    key: 'root',
    version: 1,
    storage
  })
  if (!isLoggedIn) {
    await Dialog.alert({
      content: '当前未登录，正在前往登录...'
    })
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect('/login')
  }
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
            store.dispatch({
              type: 'user/setUserInfo',
              payload: data
            })
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
    async loader (e) {
      await auth(e)
      const { code, data } = await getHouses()
      if (code === 200) {
        return data
      }
    },
    element: <Rent />
  },
  {
    path: 'Detail/:id',
    async loader ({ params }) {
      const { id } = params
      const { data } = await getHouse(id as string)
      const { data: favoriteData } = await hasFavorite(data.houseCode)
      return {
        data,
        favoriteData
      }
    },
    element: <Detail />
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
