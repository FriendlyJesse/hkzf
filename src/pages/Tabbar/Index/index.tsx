import { useEffect, useState } from 'react'
import { Swiper, Toast, Image } from 'antd-mobile'
import styles from './index.module.css'
import { getSwipers } from '../../../apis'

function Index () {
  const [swipers, setSwipers] = useState([])
  
  async function getSwipersData() {
    const { code, data } = await getSwipers()
    if (code === 200) {
      setSwipers(data)
      console.log(data)
    }
  }
  useEffect(() => {
    getSwipersData()
  }, [])
  
  return (<div>
    {
      swipers.length && <Swiper loop autoplay>
        {
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
        }
      </Swiper>
    }
  </div>)
}

export default Index