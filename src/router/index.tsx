import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import News from '../pages/Home/News'

import CityList from '../pages/CityList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
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
]);

export default router