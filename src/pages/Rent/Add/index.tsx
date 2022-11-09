import { useEffect } from 'react'
import { Form, Button, Input, Picker, ImageUploader, TextArea, Toast, ImageUploadItem } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import HousePackge from '@/components/HousePackage'
import { uploadImg } from '@/apis/houses'
import { addHouse } from '@/apis/user'

const { VITE_APP_BASIC_URL } = import.meta.env

// 房屋类型
const roomTypeData = [
  [
    { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
    { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
    { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
    { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
    { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
  ]
]

// 楼层
const floorData = [
  [
    { label: '高楼层', value: 'FLOOR|1' },
    { label: '中楼层', value: 'FLOOR|2' },
    { label: '低楼层', value: 'FLOOR|3' }
  ]
]

// 朝向：
const orientedData = [
  [
    { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
    { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
    { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
    { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
    { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
    { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
    { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
    { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
  ]
]

function Add () {
  const navigate = useNavigate()
  const location = useLocation()

  const [form] = Form.useForm()
  async function onFinish (values: any) {
    // 数据处理
    values.community = values.community.id
    values.floor = values.floor[0]
    values.houseImg = (values.houseImg as string[])?.reduce((prev: any, item: any) => {
      prev.push(new URL(item.url).pathname)
      return prev
    }, []).join('|')
    values.oriented = values.oriented[0]
    values.roomType = values.roomType[0]
    values.supporting = values.supporting?.join('|')
    // 发送请求
    const { code } = await addHouse(values)
    if (code === 200) {
      navigate('/rent')
      Toast.show('房源发布成功~')
    }
  }

  async function handleUpload (file: File): Promise<ImageUploadItem> {
    const { data }: { data: string[] } = await uploadImg(file)
    return {
      url: VITE_APP_BASIC_URL + data[0]
    }
  }

  useEffect(() => {
    const { state } = location
    if (state) {
      form.setFieldValue(['community', 'name'], state.name)
      form.setFieldValue(['community', 'id'], state.id)
    }
  }, [])

  return (
    <div>
      <NavHeader title='发布房源' />
      <Form
        name='form'
        form={form}
        onFinish={onFinish}
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Item
          name={['community', 'name']}
          label='小区名称'
          required
          onClick={() => {
            navigate('/rent/search')
          }}
        >
          <Input placeholder='请选择小区名称' readOnly />
        </Form.Item>
        <Form.Item
          name={['community', 'id']}
          hidden
        >
          <Input placeholder='小区隐藏值' readOnly />
        </Form.Item>
        <Form.Item name='price' label='租金' extra={'￥/月'} rules={[{ required: true }]}>
          <Input type='number' placeholder='请输入租金/月' />
        </Form.Item>
        <Form.Item name='size' label='建筑面积' extra={'m²'} rules={[{ required: true }]}>
          <Input placeholder='请输入建筑面积' />
        </Form.Item>
        <Form.Item
          name='roomType'
          label='户型'
          trigger='onConfirm'
          onClick={(e, pickerRef) => {
            pickerRef.current?.open() // ⬅️
          }}
          rules={[{ required: true }]}
        >
          <Picker columns={roomTypeData}>
            {(value) => value[0]?.label ?? '请选择'}
          </Picker>
        </Form.Item>
        <Form.Item
          name='floor'
          label='所在楼层'
          trigger='onConfirm'
          onClick={(e, pickerRef) => {
            pickerRef.current?.open() // ⬅️
          }}
          rules={[{ required: true }]}
        >
          <Picker columns={floorData}>
            {(value) => value[0]?.label ?? '请选择'}
          </Picker>
        </Form.Item>
        <Form.Item
          name='oriented'
          label='朝向'
          trigger='onConfirm'
          onClick={(e, pickerRef) => {
            pickerRef.current?.open() // ⬅️
          }}
          rules={[{ required: true }]}
        >
          <Picker columns={orientedData}>
            {(value) => value[0]?.label ?? '请选择'}
          </Picker>
        </Form.Item>
        <Form.Item name='title' label='房屋标题' layout='vertical' rules={[{ required: true }]}>
          <Input placeholder='请输入标题(例如：整租 小区名 2室 5000元)' />
        </Form.Item>
        <Form.Item name='houseImg' label='房屋图像' layout='vertical'>
          <ImageUploader upload={handleUpload}/>
        </Form.Item>
        <Form.Item name='supporting' label='房屋配置' layout='vertical' trigger='onSelect'>
          <HousePackge select />
        </Form.Item>
        <Form.Item name='description' label='房屋描述' layout='vertical'>
          <TextArea
            placeholder='请输入房屋描述信息'
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Add
