import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Footer } from 'antd-mobile'
import { LinkItem } from 'antd-mobile/es/components/footer'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import NavHeader from '@/components/NavHeader'
import styles from './index.module.scss'
import { login, loginParams } from '@/apis/user'
// redux
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/features/user'

function Login () {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 去注册
  function handleLinkClick (item: LinkItem) {
    navigate(item.href)
  }

  async function onFinish (values: loginParams) {
    setLoading(true)
    try {
      const { code, data } = await login(values)
      if (code === 200) {
        const { token } = data
        dispatch(setToken(token))
        localStorage.setItem('token', token)
        navigate('/mine')
      }
    } catch {}
    setLoading(false)
  }

  return (
    <div>
      <NavHeader title='登录' />
      <Form
        layout='horizontal'
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large' loading={loading}>
            提交
          </Button>
        }
      >
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input placeholder='请输入用户名' clearable />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '密码不能为空' }]}
          extra={
            <div className={styles.eye}>
              {!visible
                ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
                  )
                : (
                <EyeOutline onClick={() => setVisible(false)} />
                  )}
            </div>
          }
        >
          <Input
            placeholder='请输入密码'
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <Footer
        links={[
          {
            text: '还没有账号, 去注册~',
            href: '/register'
          }
        ]}
        onLinkClick={handleLinkClick}
      />
    </div>
  )
}

export default Login
