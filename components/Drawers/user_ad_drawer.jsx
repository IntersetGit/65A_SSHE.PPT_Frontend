import React, { useState } from 'react'
import { Button, Drawer, Form, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { group_roles } from '../../config/group_roles';

const { Search } = Input;
const { Option } = Select

const UseradDrawer = (props) => {
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

    const onSearch = (values) => {
        console.log(values)
    }

    return (
        <>
        <Button icon={<PlusOutlined/>} size='large' type='primary' style={{ marginLeft : 10 , float: 'right' }} onClick={showModal}>เพิ่มผู้ใช้ระบบจาก AD</Button>
        <Drawer
                title='เพิ่มผู้ใช้ระบบจาก AD'
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
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                    >
                        <Search
                        placeholder="Username"
                        enterButton="ค้นหา"
                        onSearch={onSearch}
                        />
                    </Form.Item>
                    <Form.Item
                    name="roles_id"
                    label="กลุ่มผู้ใช้งาน"
                    rules={[
                    { required: true, message: "กรุณากรอกข้อมูล กลุ่มผู้ใช้งาน" },
                    ]}
                    >
                        <Select placeholder="กลุ่มผู้ใช้งาน" options={group_roles} >
                        </Select>
                    </Form.Item>
                </Form>
        </Drawer>        
        </>
    )
}

export default UseradDrawer