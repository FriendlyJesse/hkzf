import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import './index.scss'

type Props = {
  title: string
}

function NavHeader ({ title }: Props) {
  const navigate = useNavigate()

  return (
    <div className='navgation'>
      <NavBar onBack={() => navigate(-1) }>{ title }</NavBar>
    </div>
  )
}

export default NavHeader