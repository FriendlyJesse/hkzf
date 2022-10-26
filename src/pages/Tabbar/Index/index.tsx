import { useEffect, useState } from 'react'
import { Swiper, Toast, Image, Grid } from 'antd-mobile'
import styles from './index.module.css'
import { getSwipers } from '../../../apis'
import nav1 from '../../../assets/images/nav-1.png'
import nav2 from '../../../assets/images/nav-2.png'
import nav3 from '../../../assets/images/nav-3.png'
import nav4 from '../../../assets/images/nav-4.png'

function RenderSwipers (swipers = []) {
  return (
    swipers.map((item: any, index) => (
      <Swiper.Item key={item.id}>
        <Image 
          src={'http://localhost:8080' + item.imgSrc}
          width='100%'
          onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
          }}
        />
      </Swiper.Item>
    ))
  )
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

function Index () {
  const [swipers, setSwipers] = useState([])
  
  async function getSwipersData() {
    const { code, data } = await getSwipers()
    if (code === 200) {
      setSwipers(data)
    }
  }
  useEffect(() => {
    getSwipersData()
  }, [])

  return (<div>
    {
      swipers.length && <Swiper loop autoplay>
        { RenderSwipers(swipers) }
      </Swiper>
    }
    <section className={styles.navigation}>
      <Grid columns={4} gap={8}>
        { RenderNavigations() }
      </Grid>
    </section>
  </div>)
}

export default Index