import React, { useState } from 'react'
import { Card, Menu, Input, Button, Dropdown, Table, Drawer, Form } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = (values,e) => {
    if (values == e.number) return data
    console.log(values)
}

const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'ชื่อเข้าใช้ระบบ',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'first_last_name',
      key: 'first_last_name',
    },
    {
      title: 'อีเมล์',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'กลุ่มผู้ใช้งาน',
      dataIndex: 'user_group',
      key: 'user_group',
    },
    {
      title: 'แหล่งที่มาจากผู้ใช้งาน',
      dataIndex: 'source_user',
      key: 'source_user',
    },
    {
      title: 'จัดการ',
      render: (record) => {
        return (<Dropdown.Button icon={<MoreOutlined />} type="text"
                    overlay={<Menu mode="vertical">
                    <Menu.Item key="1" icon={<EditOutlined />}>แก้ไข พนักงาน</Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />}>ลบ พนักงาน</Menu.Item>
                    </Menu>}
                >
                </Dropdown.Button>)
                },
    }
  ];

const data = [
    {
      key: '1',
      number: '1',
      username: 'test1',
      first_last_name: 'THANONGSAK SUWANNACHOD',
      email: 'test1@gmail.com',
      user_group: 'Administrator',
      source_user: 'Non-AD'
    },
    {
      key: '2',
      number: '2',
      username: 'test2',
      first_last_name: 'JAKAPAN SUWANNACHOD',
      email: 'test2@gmail.com',
      user_group: 'Viewer',
      source_user: 'Non-AD'
    },
    {
      key: '3',
      number: '3',
      username: 'test3',
      first_last_name: 'NATTASIT BANSRA',
      email: 'test3@gmail.com',
      user_group: 'Editor',
      source_user: 'Non-AD'
      }
]

const NonadUsermanage = (props) => {
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
        <Drawer
                title='เพิ่มผู้ใช้นอก AD'
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
                    layout="inline"
                    size="medium"
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={{

                    }}

                >

                </Form>
        </Drawer>        
            <Card style={{ marginTop : '1rem' }} bordered={true}>
            <h1><p>จัดการผู้ใช้นอก AD</p></h1>
            <Search
                placeholder="input search text"
                allowClear
                enterButton
                onSearch={onSearch}
                style={{ width: 400 }}
            />
            <Button icon={<PlusOutlined/>} size='large' type='primary' style={{ float: 'right' }} onClick={showModal}>เพิ่มผู้ใช้นอก AD</Button>
                <Table columns={columns} dataSource={data} style={{ marginTop: 20}}
                pagination={{
                }}/>
            </Card>
        </>
    )
}

export default  NonadUsermanage