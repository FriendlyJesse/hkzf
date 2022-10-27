import { useState, useEffect } from 'react'
// import { getAreaInfo } from '@/apis/area'
export function useCitys () {
  const [citys, setCitys] = useState([])

  if (citys.length) return citys

  return citys
}