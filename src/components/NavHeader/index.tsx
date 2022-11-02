import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import './index.scss'

type Props = {
  title: string,
  style?: object
}

function NavHeader ({ title, style }: Props) {
  const navigate = useNavigate()

  return (
    <div className='navgation' style={style}>
      <NavBar onBack={() => navigate(-1) }>{ title }</NavBar>
    </div>
  )
}

export default NavHeader