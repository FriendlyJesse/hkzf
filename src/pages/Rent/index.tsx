import { useNavigate, useLoaderData } from 'react-router-dom'
import { List, ErrorBlock, SwipeAction } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'
import NavHeader from '@/components/NavHeader'
import HouseItem from '@/components/HouseItem'

const { VITE_APP_BASIC_URL } = import.meta.env

const rightActions: Action[] = [
  {
    key: 'delete',
    text: '删除',
    color: 'danger'
  }
]

function Rent () {
  const navigate = useNavigate()
  const houses: any = useLoaderData() ?? []

  function toAdd () {
    navigate('/rent/add')
  }

  return (
    <div>
      <NavHeader title='我的出租' right={<a onClick={() => navigate('/rent/add')}>去发布</a>} />
      {
        (houses.length > 0)
          ? <List>
          {
            houses.map((item: any) => (
              <SwipeAction
                key={item.houseCode}
                rightActions={rightActions}
              >
                <List.Item onClick={() => navigate(`/Detail/${item.houseCode}`)}>
                  <HouseItem
                    id={item.houseCode}
                    src={VITE_APP_BASIC_URL + (item.houseImg as string)}
                    title={item.title}
                    desc={item.desc}
                    tags={item.tags}
                    price={item.price}
                  />
                </List.Item>
              </SwipeAction>
            ))
          }
        </List>
          : <ErrorBlock status='empty' fullPage title={'您还没有发布房源'} description={<div>去<a onClick={toAdd}>发布房源</a>吧~</div>} />
      }

    </div>
  )
}

export default Rent
