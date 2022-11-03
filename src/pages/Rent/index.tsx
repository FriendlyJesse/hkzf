import { useLoaderData } from 'react-router-dom'
import { List, ErrorBlock } from 'antd-mobile'
import NavHeader from '@/components/NavHeader'
import HouseItem from '@/components/HouseItem'

const { VITE_APP_BASIC_URL } = import.meta.env

function Rent () {
  const houses: any = useLoaderData()

  return (
    <div>
      <NavHeader title='我的出租' />
      <List>
        {
          (houses.length > 0)
            ? houses.map((item: any) => (
            <List.Item key={item.houseCode}>
              <HouseItem
                src={VITE_APP_BASIC_URL + (item.houseImg as string)}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
              />
            </List.Item>
            ))
            : <div style={{ marginBottom: '150px' }}><ErrorBlock status='empty' /></div>
        }
      </List>
    </div>
  )
}

export default Rent
