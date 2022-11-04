import { Swiper, Image } from 'antd-mobile'
import { useLoaderData } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import HousePackage from '@/components/HousePackage'
import styles from './index.module.scss'
import './index.scss'
import { useEffect } from 'react'

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
    renderMap(details.community, details.coord)
  }, [])

  return (
    <div>
      <div className='nav'>
        <NavHeader title={details.community} right={<i key="share" className="iconfont icon-share" />} />
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
    </div>
  )
}

export default Detail
