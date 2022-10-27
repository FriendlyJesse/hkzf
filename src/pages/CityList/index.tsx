import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IndexBar, List, NavBar } from 'antd-mobile'
import{ getAreaCity } from '@/apis/area'
import './index.scss'

const charCodeOfA = 'A'.charCodeAt(0)
const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: [],
  }))
groups.unshift({
  title: '#',
  items: []
})

function CityList () {
  const navigate = useNavigate()
  const [group, setGroup] = useState({})
  async function getAreaCityData () {
    const { code, data } = await getAreaCity({ level: 1 })
    if (code === 200) {
      data.map((item: any) => {
        const firstStr = item.short[0].toUpperCase()
        groups.map((el: any) => {
          if (firstStr === el.title) {
            el.items.push(item)
          }
        })
      })
      setGroup(groups)
    }
  }

  useEffect(() => {
    getAreaCityData()
  }, [])

  return (
    <div className='city-list'>
      <div className='navgation'>
        <NavBar onBack={() => navigate(-1) }>城市选择</NavBar>
      </div>
      <IndexBar>
        {Object.values(group).map((group: any) => {
          const { title, items } = group
          return (
            <IndexBar.Panel
              index={title}
              title={title}
              key={title}
            >
              <List>
                {items.map((item: any) => (
                  <List.Item key={item.value}>{item.label}</List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          )
        })}
      </IndexBar>
    </div>
  )
}

export default CityList