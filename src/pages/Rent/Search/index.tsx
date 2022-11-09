import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar, List } from 'antd-mobile'
import styles from './index.module.scss'
import { getCommunity } from '@/apis/area'

const getCity: any = () => JSON.parse(localStorage.getItem('currentCity') ?? '') || {}
let timer: NodeJS.Timeout | string | number | undefined

interface ListItem {
  [key: string]: string
}

function Search () {
  const [list, setList] = useState<ListItem[]>([])
  const navigate = useNavigate()

  function onSearchChange (value: string) {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      // 获取小区数据
      const { code, data } = await getCommunity({
        name: value,
        id: getCity().value
      })
      if (code === 200) {
        setList(data)
      }
    }, 500)
  }

  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <SearchBar placeholder='请输入小区或地址' style={{ '--background': '#ffffff' }} showCancelButton={() => true} onCancel={() => navigate(-1)} onChange={onSearchChange} />
      </div>
      <div className={styles.body}>
        <List>
          {
            list.map(item => (
              <List.Item
                key={item.community}
                onClick={() => navigate('/rent/add', { replace: true, state: { name: item.communityName, id: item.community } })}
              >
                {item.communityName}
              </List.Item>
            ))
          }
        </List>
      </div>
    </div>
  )
}

export default Search
