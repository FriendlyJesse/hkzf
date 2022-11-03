import { useEffect, useState } from 'react'
import { Swiper, Toast, Image, Grid } from 'antd-mobile'
import SearchHeader from '@/components/SearchHeader'
import { getSwipers, getGroups, getNews } from '@/apis'
import { getCurrentCity } from '@/utils'
import styles from './index.module.css'
import nav1 from '@/assets/images/nav-1.png'
import nav2 from '@/assets/images/nav-2.png'
import nav3 from '@/assets/images/nav-3.png'
import nav4 from '@/assets/images/nav-4.png'

function RenderSwipers () {
  // 获取轮播图数据
  const [swipers, setSwipers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  async function getSwipersData () {
    const { code, data } = await getSwipers()
    if (code === 200) {
      setSwipers(data)
      setIsLoaded(true)
    }
  }
  useEffect(() => {
    void getSwipersData()
  }, [])
  return (
    <>
    {
      isLoaded && (<Swiper loop autoplay>
      {
        swipers.map((item: any, index) => (
          <Swiper.Item key={item.id}>
            <Image
              src={'http://localhost:8080' + (item.imgSrc as string)}
              width='100%'
              onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`)
              }}
            />
          </Swiper.Item>
        ))
      }
      </Swiper>)
    }
    </>
  )
}
function RenderHeader () {
  // 获取地理位置信息
  // navigator.geolocation.getCurrentPosition(position => {
  //   console.log(position)
  // })
  const [currentCityName, setCurrentCityName] = useState('定位中')

  async function getCity () {
    const res = await getCurrentCity()
    if (res) {
      setCurrentCityName(res.label)
    }
  }
  useEffect(() => {
    void getCity()
  }, [])

  return <SearchHeader cityName={currentCityName} className='' />
}
function RenderNavigations () {
  const navs = [
    {
      name: '整租',
      img: nav1,
      width: 48
    },
    {
      name: '合租',
      img: nav2,
      width: 48
    },
    {
      name: '地图找房',
      img: nav3,
      width: 48
    },
    {
      name: '去出租',
      img: nav4,
      width: 48
    }
  ]

  return navs.map(item => (<Grid.Item key={item.name}>
    <div className={styles.navigation_item}>
      <Image src={item.img} width={item.width} />
      <div className={styles.label}>{ item.name }</div>
    </div>
  </Grid.Item>))
}
function RenderGroups () {
  // 获取租房小组数据
  const [group, setGroups] = useState([])
  async function getGroupsData () {
    const { code, data } = await getGroups({ area: 'AREA|88cff55c-aaa4-e2e0' })
    if (code === 200) {
      setGroups(data)
    }
  }
  useEffect(() => {
    void getGroupsData()
  }, [])

  return group.map((item: any) => (
    <Grid.Item key={item.id}>
      <div className={styles.group_item}>
        <div className={styles.group_desc}>
          <p className={styles.desc_title}>{item.title}</p>
          <span className={styles.desc_info}>{item.desc}</span>
        </div>
        <Image src={'http://localhost:8080' + (item.imgSrc as string)} width={55} />
      </div>
    </Grid.Item>)
  )
}
function RenderNews () {
  // 获取资讯数据
  const [news, setNews] = useState([])
  async function getNewsData () {
    const { code, data } = await getNews({ area: 'AREA|88cff55c-aaa4-e2e0' })
    if (code === 200) {
      setNews(data)
    }
  }
  useEffect(() => {
    void getNewsData()
  }, [])
  return (
    news.map((item: any) => (
      <div className={styles.news_item} key={item.id}>
        <div className={styles.imgwrap}>
          <Image src={`http://localhost:8080${(item.imgSrc as string)}`} width={120} height={90} />
        </div>
        <div className={styles.news_content}>
          <h3 className={styles.news_title}>{item.title}</h3>
          <div className={styles.news_info}>
            <span>{item.from}</span>
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    ))
  )
}

function Index () {
  return (
    <div>
      {/* 轮播图 */}
      <section className={styles.swiper}>
        { RenderSwipers() }
        { RenderHeader() }
      </section>

      {/* 导航菜单 */}
      <section className={styles.navigation}>
        <Grid columns={4} gap={8}>{ RenderNavigations() }</Grid>
      </section>

      {/* 租房小组 */}
      <section className={styles.group}>
        <h3 className={styles.group_title}>
          租房小组 <span className={styles.more}>更多</span>
        </h3>
        <div className={styles.group_content}>
          <Grid columns={2} gap={8}>{ RenderGroups() }</Grid>
        </div>
      </section>

      {/* 最新资讯 */}
      <section className={styles.news}>
        <h3 className={styles.news_title}>最新资讯</h3>
        {RenderNews()}
      </section>
    </div>
  )
}

export default Index
