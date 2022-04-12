import React, { useState } from 'react'
import { Button, Drawer, Form, Input, Select, Space} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UseradDrawer from './user_ad_drawer';
import { group_roles } from '../../config/group_roles';

const { Option } = Select

const UsernonadDrawer = (props) => {
    const [isShowModal, setShowModal] = useState(false)

    const showModal = () => {
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const onFinish = (values) => {
        onClose(values)
    }  

    return(
        <>
        {props.type === 1 ?
            <UseradDrawer />
            : <Button icon={<PlusOutlined/>} size='large' type='primary' style={{ float: 'right' }} onClick={showModal}>เพิ่มผู้ใช้ระบบนอก AD</Button>
        }
        <Drawer
                title='เพิ่มผู้ใช้ระบบนอก AD'
                headerStyle={{ textAlign: 'center' }}
                onClose={hideModal}
                onCancel={hideModal}
                visible={isShowModal}
                closable={true}
                maskClosable={false}
                keyboard={false}
                size='large'
            >
                <Form
                    size="large"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={{

                    }}

                >
                    <Form.Item
                        label="รหัสบริษัท"
                        name="company"
                        rules={[
                        { required: true, message: "กรุณากรอกรหัสบริษัท" },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="ชื่อผู้ใช้"
                        name="username"
                        rules={[
                        { required: true, message: "กรุณากรอกข้อมูล" },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="รหัสผ่าน"
                        name="password"
                        rules={[
                        { required: true, message: "กรุณากรอกรหัสผ่าน" },
                        { min: 8, message: 'รหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร' }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="ยืนยันรหัสผ่าน"
                        name="confirm_password"
                        rules={[
                        { required: true, message: "กรุณากรอกยืนยันรหัสผ่าน" }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="ชื่อจริง"
                        name="first_name"
                        rules={[
                        { required: true, message: "กรุณากรอกข้อมูล" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="นามสกุล"
                        name="last_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="e_mail"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="roles_id"
                        label="กลุ่มผู้ใช้งาน"
                        rules={[
                        { required: true, message: "กรุณาเลือกข้อมูล" },
                        ]}
                    >
                        <Select placeholder="กลุ่มผู้ใช้งาน" options={group_roles}>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ float: 'right'}}>
                            <Button size='medium' type='primary' htmlType='sumbit'>ตกลง</Button>
                            <Button size='medium' htmlType='sumbit' onClick={hideModal}>ยกเลิก</Button>
                        </Space>
                    </Form.Item>
                </Form>

        </Drawer>        
        </>
    )
}

export default UsernonadDrawer