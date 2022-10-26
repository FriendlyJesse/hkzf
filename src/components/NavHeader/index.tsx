// import styles from './index.module.css'
import './index.scss'

type SearchHeaderParams = {
  cityName: string,
  className: ''
}

function SearchHeader({ cityName, className }: SearchHeaderParams) {
  return (
    <div className={['search-box', className || ''].join('')}>
      <div className='search'>
        <div className="location" onClick={() => {}}>
          <span className="name">{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className="form" onClick={() => {}}>
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </div>
      <i className="iconfont icon-map" onClick={() => {}} />
    </div>
  )
}

export default SearchHeader