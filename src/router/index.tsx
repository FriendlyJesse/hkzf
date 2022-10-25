import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import CityList from '../pages/CityList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'city-list',
    element: <CityList />,
  },
]);

export default router