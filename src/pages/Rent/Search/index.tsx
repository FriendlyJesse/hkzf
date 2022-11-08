import { SearchBar } from 'antd-mobile'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

function Search () {
  const navigate = useNavigate()
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <SearchBar placeholder='请输入小区或地址' showCancelButton onCancel={() => navigate(-1)} />
      </div>
    </div>
  )
}

export default Search
