import React, { useState , useEffect } from 'react'
import { Card, Menu, Input, Dropdown, Table, Col, Button, Drawer, Form, Select, Space, Tabs} from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, } from '@ant-design/icons';
import { group_roles } from '../../config/group_roles';
import { com_id } from '../../config/com_id';
import { datas } from '../../config/data_ad';
import Swal from 'sweetalert2';
const { Search } = Input;
const { TabPane } = Tabs;
const onSearch = (values,e) => {
    if (values === datas) return datas
}
const NonadUsermanage = (props) => {
    const [adusermanage,setadusermanage] = useState(datas);
    const [isShowDrawer, setShowDrawer] = useState(false)
    const [drawerType, setdrawerType] = useState(1)
    const [selectedrow,setselectedrow] = useState(null)
    const [form] = Form.useForm()
    const [formAD] = Form.useForm()

    const AddAdData = (type, _data = {}) => {
      console.log('onSaveData' , type)
      switch (type) {
        case "ADD":
          const _num = `${adusermanage.length + 1}`
          console.log([...adusermanage, {key :adusermanage.length + 1 , number : _num , is_ad : "Non-AD" , ..._data}])
          setadusermanage([...adusermanage, {key :adusermanage.length + 1 , number : _num , is_ad : "Non-AD" , ..._data}])
          break;
        case "UPDATE":
          console.log(_data , adusermanage)
          const indexs = adusermanage.findIndex(e => e.key == _data.key)
          if (indexs != -1) {
            let arr = [...adusermanage]
          
            arr[indexs] = _data
            setadusermanage(arr)
            console.log(arr)
          }
          break;
        case "DELETE":
          console.log(_data)
          const newState = [...adusermanage]
          const newArr = newState.filter(e => e.key != _data.key)
          setadusermanage(newArr)
          break;
          default:
          break;
        }
      }

      const showDrawerr = (type) => {
        setdrawerType(type)
        setShowDrawer(true)
      }

      const hideDrawer = () => {
        form.resetFields()
        formAD.resetFields()
        setselectedrow(null)
        setShowDrawer(false)
      }

      const onFinish = (values) => {
          if (drawerType == 1) {
            AddAdData("ADD", values )
          }else if (drawerType == 2) { 
            AddAdData("UPDATE", {...selectedrow , ...values})
          }
          hideDrawer()
      }

      const handleOk = (form) => {
        if (form === "formCreate") {
          form.submit();
        }
        if (form === "formAD") {
          formAD.submit();
        }
      };

      const onFinishAD = (values) => {

      }

      const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
          },
        };

      const columns = [
        {
          title: 'ลำดับ',
          dataIndex: 'number',
          key: 'number',
          render: (record) => {
            return (<p>{record}</p>)
          }
        },
        {
          title: 'ชื่อเข้าใช้ระบบ',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        {
          title: 'ชื่อ-นามสกุล',
          dataIndex: 'firstlast',
          key: 'firstlast',
        },
        {
          title: 'อีเมล์',
          dataIndex: 'e_mail',
          key: 'e_mail',
        },
        {
          title: 'กลุ่มผู้ใช้งาน',
          dataIndex: 'roles_name',
          key: 'roles_name',
        },
        {
          title: 'แหล่งที่มาจากผู้ใช้งาน',
          dataIndex: 'is_ad',
          key: 'is_ad',
          render: (record) => {
          return (<p>{record}</p>)
        }
        },
        {
          title: 'จัดการ',
          render: (record) => (
            <Dropdown.Button icon={<MoreOutlined/>} type='text' overlay={ 
              <Menu>
                <Menu.Item key="1" icon={<EditOutlined />} onClick={() => {
                  showDrawerr(2)
                  setselectedrow(record)
                  form.setFieldsValue(record)
                }}>แก้ไข</Menu.Item>
                <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => 
                  Swal.fire({
                      title: 'ลบข้อมูล',
                      text: "ยืนยันการลบข้อมูล",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'ยืนยัน',
                      cancelButtonText: 'ยกเลิก'
                    }).then((result) => {
                      if (result.isConfirmed) {
                    AddAdData("DELETE", record)
                    Swal.fire(
                      'ลบข้อมูลสำเร็จ',
                      '',
                      'success'
                  )
                }
                })}>ลบ</Menu.Item>
              </Menu>
            
              }>

            </Dropdown.Button>
        ),
      }
    ];
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
          <Button style={{ float : 'right' }} type='primary' onClick={() => showDrawerr(1)}>+ เพิ่มผู้ใช้ระบบ</Button>
          <Col span={24}>
            <div>
              <Table 
              columns={columns} 
              dataSource={adusermanage}
              style={{ marginTop: 20 }}
              scroll={{
                y: 240,
              }}
              pagination={{
              }}
              />
            </div>
          </Col>
          </Card>

          <Drawer
                onClose={hideDrawer}
                onCancel={hideDrawer}
                visible={isShowDrawer}
                closable={true}
                maskClosable={false}
                keyboard={false}
                width="40%"
            >
                <Tabs defaultActiveKey="1">
                  <TabPane tab="นอก AD" key="1">
                    <Form
                      {...formItemLayout}
                      layout="vertical"
                      name="nonadform"
                      id="nonadform"
                      onFinish={onFinish}
                      form={form}
                      size="large"
                      initialValues={{
                          
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
                        name="user_name"
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
                        name="firstlast"
                        rules={[
                        { required: true, message: "กรุณากรอกข้อมูล" },
                        ]}
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
                        name="roles_name"
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
                            <Button type='primary' htmlType='sumbit'>ตกลง</Button>
                            <Button type='primary' onClick={hideDrawer}>ยกเลิก</Button>
                        </Space>
                    </Form.Item>
                    </Form>
                    </TabPane>

                    <TabPane tab="AD" key="2">
                    <Form
                      {...formItemLayout}
                      layout="vertical"
                      name="nonadform"
                      id="nonadform"
                      // onFinish={onFinish}
                      form={formAD}
                      size="large"
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

                      <Form.Item>
                        <Space style={{ float: 'right'}}>
                            <Button type='primary' htmlType='sumbit'>ตกลง</Button>
                            <Button type='primary' onClick={hideDrawer}>ยกเลิก</Button>
                        </Space>
                      </Form.Item>

                    </Form>
                    </TabPane>
                  </Tabs>
          </Drawer>
      </>
      
  )
}
export default  NonadUsermanage