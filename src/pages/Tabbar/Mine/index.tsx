import { Button, Grid } from 'antd-mobile'
import styles from './index.module.scss'

const { VITE_APP_BASIC_URL } = import.meta.env
// 默认头像
const DEFAULT_AVATAR = VITE_APP_BASIC_URL + '/img/profile/avatar.png'
// 菜单
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

function RenderGrid () {
  return (
    <div className={styles.gril_wrap}>
      <Grid columns={3} gap={30}>
        {
          menus.map(item => (
            <Grid.Item key={item.id}>
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            </Grid.Item>
          ))
        }
      </Grid>
    </div>
  )
}

function Mine () {
  return (
    <div>
      <div className={styles.title}>
        <img
          className={styles.bg}
          src={VITE_APP_BASIC_URL + '/img/profile/bg.png'}
          alt="背景图"
        />
        <div className={styles.info}>
          <div className={styles.myIcon}>
            <img
              className={styles.avatar}
              src={DEFAULT_AVATAR}
              alt="icon"
            />
          </div>
          <div className={styles.user}>
            <div className={styles.name}>{'游客'}</div>
            <div className={styles.edit}>
              <Button color='primary' size='small'>去登录</Button>
            </div>
          </div>
        </div>
      </div>
      <RenderGrid />
      <div className={styles.ad}>
        <img src={VITE_APP_BASIC_URL + '/img/profile/join.png'} />
      </div>
    </div>
  )
}

export default Mine
