import { useEffect, useState, useRef } from 'react'
import { FloatingPanel, ErrorBlock, List, Toast } from 'antd-mobile'
import NavHeader from '@/components/NavHeader'
import HouseItem from '@/components/HouseItem'
import styles from './index.module.scss'
import { getHouses } from '@/apis/houses'
import { getAreaMap } from '@/apis/area'
import { getCurrentCity } from '@/utils'

function RenderMap () {
  let map: any

  const [floatingHeight, setFloatingHeight] = useState(70)
  const [houses, setHouses] = useState([])

  // 初始化地图
  async function initMap () {
    map = new BMapGL.Map('container')

    // 解析地址
    const { label } = await getCurrentCity()
    const myGeo = new BMapGL.Geocoder()
    myGeo.getPoint(label, (point: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!point) return alert('您选择的地址没有解析到结果！')
      map.centerAndZoom(point, 11)
    }, label)

    // 添加比例尺控件
    const scaleCtrl = new BMapGL.ScaleControl()
    map.addControl(scaleCtrl)
    const zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
    map.addControl(zoomCtrl)

    // 绑定事件
    map.addEventListener('movestart', () => {
      setFloatingHeight(70)
    })
  }

  async function renderOverlays (id: string) { // 渲染房源覆盖物
    Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0
    })
    const { code, data } = await getAreaMap({ id })
    if (code === 200) {
      data.forEach((item: any) => {
        const { type, nextZoom } = getTypeAndZoom()
        createOverlays(type, nextZoom, item)
      })
    }
    Toast.clear()
  }

  function createOverlays (type: string, nextZoom: number, item: any) { // 创建覆盖物
    const { coord: { longitude, latitude }, label: areaName, count, value } = item
    const areaPoint = new BMapGL.Point(longitude, latitude)

    if (type === 'circle') {
      createCircle(areaPoint, areaName, count, value, nextZoom)
    } else {
      createRect(areaPoint, areaName, count, value)
    }
  }

  function createCircle (areaPoint: any, areaName: string, count: number, id: string, nextZoom: number) {
    const opts = {
      position: areaPoint,
      offset: new BMapGL.Size(-40, -40)
    }
    const label = new BMapGL.Label('', opts)
    label.id = id
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${areaName}</p>
        <p>${count}套</p>
      </div>
    `)
    label.setStyle({
      border: 'none'
    })
    label.addEventListener('click', async (type: any, target: any) => {
      console.log('label id: ', label.id)
      // 放大地图并清除当前覆盖物
      map.centerAndZoom(areaPoint, nextZoom)
      map.clearOverlays()
      // 从区级获取街区的房源数据数据
      void renderOverlays(label.id)
    })
    map.addOverlay(label)
  }

  function createRect (areaPoint: any, areaName: string, count: number, id: string) {
    const opts = {
      position: areaPoint,
      offset: new BMapGL.Size(-50, -28)
    }
    const label = new BMapGL.Label('', opts)
    label.id = id
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${areaName}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)
    label.setStyle({
      border: 'none',
      color: 'white'
    })
    label.addEventListener('click', async (type: any, target: any) => {
      console.log('label id: ', label.id)
      const { list } = await getHousesData(label.id)
      setHouses(list)
      map.flyTo(areaPoint)
      // map.panBy(0, -200)
      setFloatingHeight(72 + 119)
    })
    map.addOverlay(label)
  }

  /**
   * 缩放级别：
   * 区 -> 11
   * 街道 -> 13
   * 小区 -> 15
   */
  function getTypeAndZoom () {
    const zoom = map.getZoom()
    // 缩放级别默认是 11
    let nextZoom = 11
    let type = 'circle'
    if (zoom >= 10 && zoom < 12) { // 区
      type = 'circle'
      nextZoom = 13
    } else if (zoom >= 12 && zoom < 14) { // 街道
      type = 'circle'
      nextZoom = 15
    } else if (zoom >= 14 && zoom < 16) { // 小区
      type = 'rect'
    }
    return { type, nextZoom }
  }

  // 悬浮列表
  function FloatingList ({ floatingHeight }: { floatingHeight: number }) {
    // const [focus, setFocus] = useState(false)
    const { VITE_APP_BASIC_URL } = import.meta.env
    const ref: any = useRef(null)
    const anchors = [72, 72 + 119, window.innerHeight * 0.8]

    useEffect(() => {
      ref.current.setHeight(floatingHeight)
    }, [floatingHeight])

    return (
      <FloatingPanel anchors={anchors} ref={ref}>
        {/* <Space block className={styles.search}>
          <SearchBar
            placeholder='Search for a place or address'
            showCancelButton
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)
            }}
          />
          {!focus && <Avatar src='' className={styles.avatar} />}
        </Space> */}
        <List header='房屋列表'>
          {
            (houses.length > 0)
              ? houses.map((item: any) => (
              <List.Item key={item.houseCode}>
                <HouseItem
                  src={VITE_APP_BASIC_URL + (item.houseImg as string)}
                  title={item.title}
                  desc={item.desc}
                  tags={item.tags}
                  price={item.price}
                />
              </List.Item>
              ))
              : <div style={{ marginBottom: '150px' }}><ErrorBlock status='empty' /></div>
          }
        </List>
      </FloatingPanel>
    )
  }

  // 从城市获取区级的房源数据
  async function getAreaMapData () {
    const { value } = await getCurrentCity()
    void renderOverlays(value)
  }
  // 获取房源具体数据
  async function getHousesData (id: string) {
    Toast.show({
      icon: 'loading',
      content: '房源加载中…',
      duration: 0
    })
    const { code, data } = await getHouses({ id })
    Toast.clear()
    if (code === 200) {
      return data
    }
  }

  useEffect(() => {
    void initMap()
    void getAreaMapData()
  }, [])

  return (
    <div className={styles.map}>
      <NavHeader title='地图找房' />
      <div id="container" style={{ height: '100%' }}></div>
      {/* { FloatingList() } */}
      <FloatingList floatingHeight={floatingHeight} />
    </div>
  )
}

export default RenderMap
