import { getAreaInfo } from '@/apis/area'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import AdvancedFormat from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(AdvancedFormat)

export async function getCurrentCity () {
  const currentCity = localStorage.getItem('currentCity') && JSON.parse(localStorage.getItem('currentCity') ?? '')
  if (currentCity) return await Promise.resolve(currentCity)

  // 通过百度地图api获取当前地址
  const localCity = new BMapGL.LocalCity()
  const res: any = await new Promise((resolve) => {
    localCity.get(async (res: any) => {
      resolve(res)
    })
  })
  // 匹配是否有当前地址，没有就会返回上海。
  const { code, data } = await getAreaInfo({ name: res.name })
  if (code === 200) {
    localStorage.setItem('currentCity', JSON.stringify(data))
    return data
  }
}

export function getImageUrl (name: string) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

export function getDataFromNow (timestamp: string) {
  return dayjs(dayjs(timestamp)).fromNow()
}
