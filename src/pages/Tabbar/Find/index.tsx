import { useState, useEffect } from 'react'
import { SearchBar, Dropdown, CascadePickerView } from 'antd-mobile'
import styles from './index.module.scss'
import { getConditions } from '@/apis/houses'

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
    getConditionsData()
  }, [])

  return (
    <Dropdown>
      {
        conditions.length ? conditions.map((item: any) => {
          const { label, name, value, options } = item
          if (label === 'more') return <Dropdown.Item key={label} title={label} />
          return (
            <Dropdown.Item key={name} title={label} highlight={value}>
              {
                name !== 'more' ? <CascadePickerView
                  options={options}
                  onChange={(value) => handlePickerChange(value, item)}
                /> : ''
              }
            </Dropdown.Item>
          )
        }) : ''
      }
    </Dropdown>
  )
}

function Find () {
  return (
    <div>
      <header className={styles.top}>
        <SearchBar placeholder='请输入内容' />
        <div className={styles.options}>
          <RenderOptions />
        </div>
      </header>
    </div>
  )
}

export default Find