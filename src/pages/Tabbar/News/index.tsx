import { useEffect, useState } from 'react'
import { getNews } from '@/apis'
import { Image, List } from 'antd-mobile'
import styles from './index.module.scss'
import { getDataFromNow } from '@/utils'

const { VITE_APP_RESOURCE_URL } = import.meta.env
function RenderNews () {
  // 获取资讯数据
  const [news, setNews] = useState([])
  async function getNewsData () {
    const { data } = await getNews()
    setNews(data)
  }
  useEffect(() => {
    void getNewsData()
  }, [])
  return (
    news.map((item: any) => (
      <List.Item key={item.id}>
        <div className={styles.news_item}>
          <div className={styles.imgwrap}>
            <Image src={VITE_APP_RESOURCE_URL + (item.img as string)} width={120} height={90} />
          </div>
          <div className={styles.news_content}>
            <h3 className={styles.news_title}>{item.title}</h3>
            <div className={styles.news_info}>
              <span>{item.from}</span>
              <span>{getDataFromNow(item.createdDate)}</span>
            </div>
          </div>
        </div>
      </List.Item>
    ))
  )
}

function News () {
  return (
    <div>
      <List>
        {RenderNews()}
      </List>
    </div>
  )
}

export default News
