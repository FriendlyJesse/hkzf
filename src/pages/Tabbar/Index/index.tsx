import { useState, useEffect } from 'react'
import { Swiper, Toast } from 'antd-mobile'
import styles from './index.module.css'
import axios from 'axios'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))

function Index () {
  const [swipers, setSwipers] = useState([])
  
  async function getSwipers() {
    const result = await axios.get('http://localhost:8080/home/swiper')
    console.log(result)
  }

  useEffect(() => {
    getSwipers()
  }, [])

  

  return (<div>
    <Swiper loop autoplay>
      {items}
    </Swiper>
  </div>)
}

export default Index