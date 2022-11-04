import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import './index.scss'
import { ReactNode } from 'react'

interface Props {
  title: string
  style?: object
  right?: ReactNode
}

function NavHeader ({ title, style, right }: Props) {
  const navigate = useNavigate()

  return (
    <div className='navgation' style={style}>
      <NavBar onBack={() => navigate(-1) } right={right}>{ title }</NavBar>
    </div>
  )
}

export default NavHeader
