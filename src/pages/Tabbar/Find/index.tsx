import { useState, useEffect } from 'react'
import { SearchBar, Dropdown, CascadePickerView, List, InfiniteScroll, PullToRefresh } from 'antd-mobile'
import styles from './index.module.scss'
import { getConditions, getHouses } from '@/apis/houses'
import HouseItem from '@/components/HouseItem'

function RenderOptions () {
  const [conditions, setConditions] = useState<any>([])
  const [more, setMore] = useState({})

  async function getConditionsData () {
    const { code, data } = await getConditions({ id: 'AREA|dbf46d32-7e76-1196' })
    if (code === 200) {
      const { area, subway, rentType, price, ...more } = data
      setConditions([
        {
          label: '区域',
          showLabel: '区域',
          value: '',
          name: 'area',
          options: [
            area,
            subway
          ]
        },
        {
          label: '方式',
          showLabel: '方式',
          value: '',
          name: 'rentType',
          options: rentType
        },
        {
          label: '租金',
          showLabel: '租金',
          value: '',
          name: 'price',
          options: price
        },
        {
          label: '筛选',
          name: 'more',
          value: ''
        }
      ])
      // setMore(more)
    }
  }

  // 清除数组中的null
  function valueFormatter (value: any[]) {
    return value.filter(item => {
      return (item !== null)
    })
  }

  // 递归获取 label 数组
  function findLabels (data: any[], option: any[], arr: any[], i = 1): any {
    const item = data.find((item: any) => item.value === option[i])
    if (item.value !== 'null') arr.push({ label: item.label, value: item.value })
    if (item.children) return findLabels(item.children, option, arr, ++i)

    return arr
  }

  function handlePickerChange (option: any[], item: any) {
    const { name, options } = item
    const newOption = valueFormatter(option)
    const optionItem = option[0]
    // 修改数据
    const newConditions = conditions.map((el: any) => {
      // name 与 el.name 锚定当前选项
      if (el.name === 'area' && name === 'area') {
        const _ = options.find((item: any) => item.value === newOption[0])
        const res = findLabels(_.children, newOption, [])
        if (res.length) {
          const dataItem: any = res[res.length - 1]
          el.label = dataItem.label
          el.value = dataItem.value
        } else {
          el.label = el.showLabel
          el.value = ''
        }
      } else if (el.name === name && el.name !== 'more') {
        const dataItem = options.find((_: any) => _.value === optionItem)
        if (dataItem.value === 'null') {
          el.label = el.showLabel
          el.value = ''
        } else {
          el.label = dataItem.label
          el.value = dataItem.value
        }
      }
      return el
    })
    setConditions(newConditions)
  }

  useEffect(() => {
    void getConditionsData()
  }, [])

  return (
    <Dropdown>
      {
        conditions.length
          ? conditions.map((item: any) => {
            const { label, name, value, options } = item
            if (label === 'more') return <Dropdown.Item key={label} title={label} />
            return (
            <Dropdown.Item key={name} title={label} highlight={value}>
              {
                name !== 'more'
                  ? <CascadePickerView
                  options={options}
                  onChange={(value) => handlePickerChange(value, item)}
                />
                  : ''
              }
            </Dropdown.Item>
            )
          })
          : ''
      }
    </Dropdown>
  )
}

let i = 1
function RenderList () {
  const [houses, setHouses] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)

  async function getHousesData () {
    const { code, data } = await getHouses({
      cityId: 'AREA|88cff55c-aaa4-e2e0',
      start: i,
      end: i + 21
    })
    if (code === 200) {
      if (i === 1) {
        setHouses([...data.list])
      } else {
        setHouses([...houses, ...data.list])
      }
      i += 21
      setHasMore(houses.length <= data.count)
    }
  }

  async function handleRefresh () {
    i = 1
    void getHousesData()
  }

  useEffect(() => {
    // getHousesData()
    // eslint-disable-next-line
  }, [])

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <List>
        {
          houses.map((item: any) => (
            <List.Item key={item.houseCode}>
              <HouseItem
                id={item.houseCode}
                src={import.meta.env.VITE_APP_BASIC_URL + (item.houseImg as string)}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
              />
            </List.Item>
          ))
        }
      </List>
      <InfiniteScroll loadMore={getHousesData} hasMore={hasMore} />
    </PullToRefresh>
  )
}

function Find () {
  return (
    <div className={styles.find}>
      <header className={styles.top}>
        <SearchBar placeholder='请输入内容' />
        <div className={styles.options}>
          <RenderOptions />
        </div>
      </header>
      <RenderList />
    </div>
  )
}

export default Find
