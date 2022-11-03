import { useState } from 'react'
import { Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import NavHeader from '@/components/NavHeader'
import styles from './index.module.scss'

function Login () {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <NavHeader title='登录' />
      <Form layout='horizontal'>
          <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
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
    </div>
  )
}

export default Login
