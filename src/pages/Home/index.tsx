import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { TabBar, Badge } from 'antd-mobile'
import {
  AppOutline,
  ContentOutline,
  SearchOutline,
  UserOutline,
} from 'antd-mobile-icons'
import styles from './index.module.css'

const Footer = () => {
  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />
    },
    {
      key: '/find',
      title: '找房',
      icon: <SearchOutline />
    },
    {
      key: '/news',
      title: '资讯',
      icon: <ContentOutline />
    },
    {
      key: '/mine',
      title: '我的',
      icon: <UserOutline />
    },
  ]

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  return (
    <TabBar activeKey={ pathname } onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

const Home = () => {
  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <Outlet />
        <h1 className={styles.test}>Hello World</h1>
        <Link to="city-list">城市选择页面</Link>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}

export default Home