import { useEffect, useState } from 'react'
import { Swiper, Image, Grid } from 'antd-mobile'
import { useLoaderData } from 'react-router-dom'

import NavHeader from '@/components/NavHeader'
import HousePackage from '@/components/HousePackage'
import HouseItem from '@/components/HouseItem'

import styles from './index.module.scss'
import './index.scss'

import { getImageUrl } from '@/utils'

const labelStyle = {
  position: 'absolute',
  zIndex: -7982820,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: 12,
  userSelect: 'none'
}

// 猜你喜欢
const { VITE_APP_BASIC_URL } = import.meta.env
const recommendHouses = [
  {
    id: 1,
    src: VITE_APP_BASIC_URL + '/img/message/1.png',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    src: VITE_APP_BASIC_URL + '/img/message/2.png',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    src: VITE_APP_BASIC_URL + '/img/message/3.png',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
]

function RenderSwiper ({ houseImg }: { houseImg: string[] }) {
  return (
    <Swiper>
      {
        houseImg.map((item: any, index: number) => (
          <Swiper.Item key={index}>
            <Image
              src={'http://localhost:8080' + (item as string)}
              width='100%'
            />
          </Swiper.Item>
        ))
      }
    </Swiper>
  )
}

function Detail () {
  const [opacity, setOpacity] = useState(0)
  const details: any = useLoaderData()

  // 渲染地图
  function renderMap (community: string, coord: { latitude: number, longitude: number }) {
    const { latitude, longitude } = coord

    const map = new BMapGL.Map('map')
    const point = new BMapGL.Point(longitude, latitude)
    map.centerAndZoom(point, 17)

    const label = new BMapGL.Label('', {
      position: point,
      offset: new BMapGL.Size(0, -36)
    })

    label.setStyle(labelStyle)
    label.setContent(`
      <span>${community}</span>
      <div class="${styles.mapArrow}"></div>
    `)
    map.addOverlay(label)
  }

  useEffect(() => {
    function handleScrollChange () {
      const scrollTop = document.documentElement.scrollTop
      const opacity = Math.floor(((scrollTop / 280) * 10)) / 10
      setOpacity(opacity)
    }
    window.addEventListener('scroll', handleScrollChange)
    renderMap(details.community, details.coord)

    return () => {
      window.removeEventListener('scroll', handleScrollChange)
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className={(opacity <= 0.5 ? 'nav' : ['nav', 'active'].join(' '))}>
        <NavHeader title={details.community} style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }} right={<i key="share" className="iconfont icon-share" />} />
      </div>
      <RenderSwiper houseImg={details.houseImg} />

      {/* 地图位置 */}
      <div className={styles.map}>
        <div className={styles.mapTitle}>
          小区：
          <span>{details.community}</span>
        </div>
        <div className={styles.mapContainer} id="map">
          地图
        </div>
      </div>

      {/* 房屋配套 */}
      <div className={styles.about}>
        <div className={styles.houseTitle}>房屋配套</div>
        {/* <HousePackage list={supporting} /> */}
        {/* <div className="title-empty">暂无数据</div> */}

        {details.supporting.length === 0
          ? (
          <div className={styles.titleEmpty}>暂无数据</div>
            )
          : (
          <HousePackage list={details.supporting} />
            )}
      </div>

      {/* 房屋概况 */}
      <div className={styles.set}>
        <div className={styles.houseTitle}>房源概况</div>
        <div>
          <div className={styles.contact}>
            <div className={styles.user}>
              <img src={getImageUrl('avatar.png')} alt="头像" />
              <div className={styles.useInfo}>
                <div>王女士</div>
                <div className={styles.userAuth}>
                  <i className="iconfont icon-auth" />
                  已认证房主
                </div>
              </div>
            </div>
            <span className={styles.userMsg}>发消息</span>
          </div>

          <div className={styles.descText}>
            {details.description || '暂无房屋描述'}
          </div>
        </div>
      </div>

      {/* 推荐 */}
      <div className={styles.recommend}>
        <div className={styles.houseTitle}>猜你喜欢</div>
        <div className={styles.items}>
          {recommendHouses.map(item => (
            <HouseItem {...item} key={item.id} />
          ))}
        </div>
      </div>

      {/* 底部收藏按钮 */}
      <div className={styles.fixedBottom}>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <img
              src={
                VITE_APP_BASIC_URL + (details.isFavorite ? '/img/star.png' : '/img/unstar.png')
              }
              className={styles.favoriteImg}
              alt="收藏"
            />
            <span className={styles.favorite}>
              {details.isFavorite ? '已收藏' : '收藏'}
            </span>
          </Grid.Item>
          <Grid.Item>在线咨询</Grid.Item>
          <Grid.Item>
            <a href="tel:400-618-4000" className={styles.telephone}>
              电话预约
            </a>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  )
}

export default Detail
