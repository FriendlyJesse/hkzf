import { useNavigate } from 'react-router-dom'
import './index.scss'

type SearchHeaderParams = {
  cityName: string,
  className: ''
}


function SearchHeader({ cityName, className }: SearchHeaderParams) {
  const navigate = useNavigate()

  return (
    <div className={['search-box', className || ''].join('')}>
      <div className='search'>
        <div className="location" onClick={() => navigate('/city-list')}>
          <span className="name">{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className="form" onClick={() => {}}>
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </div>
      <i className="iconfont icon-map" onClick={() => navigate('/map')} />
    </div>
  )
}

export default SearchHeader