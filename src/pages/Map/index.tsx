import { useEffect } from 'react'
import './index.scss'

function RenderMap () {

  function initMap () {
    const map = new BMapGL.Map('container')
    const point = new BMapGL.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className='map'>
      <div id="container" style={{height: '100%'}}></div>
    </div>
  )
}

export default RenderMap
