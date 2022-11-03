import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd-mobile'
import NavHeader from '@/components/NavHeader'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { register, loginParams } from '@/apis/user'
import styles from './index.module.scss'

function Register () {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onFinish (values: loginParams) {
    setLoading(true)
    try {
      const { code, data } = await register(values)
      if (code === 200) {
        const { token } = data
        localStorage.setItem('token', token)
        navigate('/mine')
      }
    } catch {}
    setLoading(false)
  }

  return (
    <div>
      <NavHeader title='注册' />
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
    </div>
  )
}

export default Register
