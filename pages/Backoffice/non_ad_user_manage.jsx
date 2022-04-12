import React, { useState } from 'react'
import { Card, Menu, Input, Button, Dropdown, Table, Drawer, Form, Col } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import UsernonadDrawer from '../../components/Drawers/user_non_ad_drawer';

const { Search } = Input;

const onSearch = (values,e) => {
    if (values === data) return data
    console.log(values)
}

const columns = [
    {
      title: <b>ลำดับ</b>,
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: <b>ชื่อเข้าใช้ระบบ</b>,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <b>ชื่อ-นามสกุล</b>,
      dataIndex: 'first_last_name',
      key: 'first_last_name',
    },
    {
      title: <b>อีเมล์</b>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <b>กลุ่มผู้ใช้งาน</b>,
      dataIndex: 'user_group',
      key: 'user_group',
    },
    {
      title: <b>แหล่งที่มาจากผู้ใช้งาน</b>,
      dataIndex: 'source_user',
      key: 'source_user',
    },
    {
      title: <b>จัดการ</b>,
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
            <Card style={{ marginTop : '1rem' }} bordered={true}>
            <h1><p>จัดการผู้ใช้งานระบบ</p></h1>
            <Search
                placeholder="input search text"
                allowClear
                enterButton
                onSearch={onSearch}
                style={{ width: 400 }}
            />
            <UsernonadDrawer type={1} />
            <UsernonadDrawer type={2} />
            <Col span={24}>
              <div>
                <Table columns={columns} dataSource={data} style={{ marginTop: 20}}
                pagination={{
                }}
                />
              </div>
            </Col>
            </Card>
        </>
    )
}

export default  NonadUsermanage