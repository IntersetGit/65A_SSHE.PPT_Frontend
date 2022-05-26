import React, { useState } from 'react'
import { Button, Drawer, Form, Input, Select, Space, Dropdown, Menu} from 'antd';
import { PlusOutlined , MoreOutlined , EditOutlined , DeleteOutlined } from '@ant-design/icons';
import UseradDrawer from './user_ad_drawer';
import { group_roles } from '../../config/group_roles';
import { com_id } from '../../config/com_id';

const { Option } = Select

const UsernonadDrawer = (props) => {
    const [isShowModal, setShowModal] = useState(false)
    const [drawerType, setdrawerType] = useState(1)

    const showModal = (type) => {
        setdrawerType(type)
        setShowModal(true)
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const preDelete = (values) => {
        console.log(props.data.key)
        props.onSave ('DELETE' , props.data.key)
    }

    const onFinish = (values) => {
        drawerType === 1 ?
            props.onSave('ADD' , values )
            : 
            props.onSave ('UPDATE' , values )
            
    hideModal()
    }  

    return(
        <>
        {props.type === 1 ?
            <UseradDrawer />
            : props.type === 2 ? 
                <Button icon={<PlusOutlined/>} size='large' type='primary' style={{ float: 'right' }} onClick={() => showModal(1)}>เพิ่มผู้ใช้ระบบนอก AD</Button>
                : <Dropdown.Button icon={<MoreOutlined />} type="text"
                    overlay={<Menu mode="vertical">
                    <Menu.Item key="1" icon={<EditOutlined />} onClick={() => showModal(2)}>แก้ไข พนักงาน</Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />} onClick={preDelete}>ลบ พนักงาน</Menu.Item>
                    </Menu>}
                    >
                    </Dropdown.Button>
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
                        key : props.data ? props.data.key : '',
                        number : props.data ? props.data.number : '',
                        company_id : props.data && props.data.company_id,
                        username : props.data ? props.data.username : '',
                        password : props.data ? props.data.password : '',
                        first_last_name : props.data ? props.data.first_last_name : '',
                        email : props.data ? props.data.email : '',
                        user_group : props.data && props.data.user_group,
                        source_user : props.data ? props.data.source_user : ''
                    }}

                >
                    <Form.Item
                        label="รหัสบริษัท"
                        name="company_id"
                        rules={[
                        { required: true, message: "กรุณากรอกรหัสบริษัท" },
                        ]}
                        >
                        <Select placeholder="รหัสบริษัท" options={com_id}>
                        </Select>
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
                        label="ชื่อจริง-นามสกุล"
                        name="first_last_name"
                        rules={[
                        { required: true, message: "กรุณากรอกข้อมูล" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="user_group"
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
                            <Button size='medium' type='primary' onClick={hideModal}>ยกเลิก</Button>
                        </Space>
                    </Form.Item>
                </Form>

        </Drawer>        
        </>
    )
}

export default UsernonadDrawer