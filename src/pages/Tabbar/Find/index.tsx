import { useState, useEffect } from 'react'
import { SearchBar, Dropdown, CascadePickerView, Button } from 'antd-mobile'
import styles from './index.module.scss'
import { getConditions } from '@/apis/houses'

function RenderOptions () {
  const params: { [key: string]: string } = {
    area: '',
    subway: '',
    rentType: '',
    price: ''
  }
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
      return (item !== null && item !== 'null') 
    })
  }

  function handlePickerChange (option: any[], item: any) {
    const { name, options } = item
    const newOption = valueFormatter(option)
    const optionItem = option[0]

    const newConditions = conditions.map((el: any) => {
      // 修改数据
      if (el.name === 'area') {
        console.log(el)
        // console.log(newOption)
        // console.log(el)
        // console.log(arr)
        // console.log(arr)
        // newOption.forEach((_: any) => {

          // let arr = []
          // el.options.find((elChild: any) => {
          //   elChild
          // })
        // })
      } else if (el.name === name) {
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

    // 区域
    // if (name === 'area') {
    //   const newVal = valueFormatter(option)
    //   const lastItem = newVal[newVal.length - 1]
    //   if (option.includes('area')) {
    //     params.area = lastItem !== 'area' ? lastItem : ''
    //     params.subway = ''
    //   } else if (option.includes('subway')) {
    //     params.subway = lastItem !== 'subway' ? lastItem : ''
    //     params.area = ''
    //   }
    //   console.log(option)
    //   const newConditions = conditions.map((el: any) => {
    //     if (el.name === name) {
    //       console.log(el)
    //       // 写入新的正确数据
    //       console.log()
    //     }
    //     return el
    //   })

    // } else {
    //   const optionItem = option[0]
    //   params[name] = optionItem

      
    // }
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
              <CascadePickerView
                options={options}
                onChange={(value) => handlePickerChange(value, item)}
              />
              <Button>取消</Button>
              <Button>确定</Button>
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