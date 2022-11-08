import { useNavigate } from 'react-router-dom'
import { Button, Grid, Dialog, Toast } from 'antd-mobile'
import styles from './index.module.scss'
import { getImageUrl } from '@/utils'
// redux
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { logout as triggerLogout } from '@/store/features/user'

// 菜单
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
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
  const navigate = useNavigate()

  return (
    <div className={styles.gril_wrap}>
      <Grid columns={3} gap={30}>
        {
          menus.map(item => (
            <Grid.Item key={item.id} onClick={() => (item.to != null) && navigate(item.to)}>
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
  const { isLoggedIn, userInfo: { nickname, avatar } } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 登出
  async function logout () {
    const result = await Dialog.confirm({
      content: '是否确定退出？'
    })
    if (result) {
      dispatch(triggerLogout())
      Toast.show({ content: '退出成功', position: 'bottom' })
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <img
          className={styles.bg}
          src={getImageUrl('bg.png')}
          alt="背景图"
        />
        <div className={styles.info}>
          <div className={styles.myIcon}>
            <img
              className={styles.avatar}
              src={avatar ?? getImageUrl('avatar.png')}
              alt="icon"
            />
          </div>
          <div className={styles.user}>
            <div className={styles.name}>{nickname ?? '游客'}</div>
            {isLoggedIn
              ? (
                <>
                  <div className={styles.auth}>
                    <span onClick={() => logout()}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
                )
              : (
                <div className={styles.edit}>
                  <Button color='primary' size='small' onClick={() => navigate('/login')}>去登录</Button>
                </div>
                )}
          </div>
        </div>
      </div>
      <RenderGrid />
      <div className={styles.ad}>
        <img src={getImageUrl('join.png')} />
      </div>
    </div>
  )
}

export default Mine
