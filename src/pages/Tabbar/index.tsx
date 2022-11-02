import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
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
      key: '/index',
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

const Tabbar = () => {
  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <Outlet />
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}

export default Tabbar