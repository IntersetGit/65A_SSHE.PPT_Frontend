import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Form, Dropdown, Button, Menu, Input, Drawer, Radio } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { activity_data } from '../../config/activity_data';
import { useForm } from 'antd/lib/form/Form';
import Swal from 'sweetalert2';

const { Search } = Input;
const { TextArea } = Input;

const ActivityManage = (props) => {
    const [activity , setactivity] = useState(activity_data)
    const [isShowModal, setShowModal] = useState(false)
    const [drawerType, setdrawerType] = useState(1)
    const [selectedrow,setselectedrow] = useState(null)
    const [form] = useForm()

    const AddActivity = (type, _data = {}) => {
        console.log('onSaveData', type)
        switch (type) {
          case "ADD":
            console.log([...activity , {key : activity.length + 1 , id : `Ac${activity.length + 1}` , status : "Active" , ..._data}])
            setactivity([...activity , {key : activity.length + 1 , id : `Ac${activity.length + 1}`, status : "Active" , ..._data}])
            break;
  
          case "UPDATE":
            const indexs = activity.findIndex(e => e.key == _data.key)
            if (indexs != -1) {
              let arr = [...activity]
            
              arr[indexs] = _data
  
              setactivity(arr)
              console.log(arr)
              
            }
            break;
  
          case "DELETE":
            console.log(_data)
            const newState = [...activity]
            const newArr = newState.filter(e => e.key != _data.key)
  
            setactivity(newArr)
            break;
  
          default:
            break;
        }
      }

    const showModal = (type) => {
        setdrawerType(type)
        setShowModal(true)
    }

    const hideModal = () => {
        form.resetFields()
        setselectedrow(null)
        setShowModal(false)
    }

    const onFinish = (values) => {
        if (drawerType == 1) {
          Swal.fire({
            title: 'บันทึกข้อมูล',
            text: "ยืนยันการบันทึกข้อมูล",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              AddActivity("ADD", values )
              Swal.fire(
                'บันทึกข้อมูลสำเร็จ',
                '',
                'success'
              )
            }
            })  
        }else if (drawerType == 2) { 
          Swal.fire({
            title: 'แก้ไขข้อมูล',
            text: "ยืนยันการแก้ไขข้อมูล",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
          AddActivity("UPDATE", {...selectedrow , ...values})
          Swal.fire(
            'แก้ไขข้อมูลสำเร็จ',
            '',
            'success'
          )
        }
        })
      }
        hideModal()
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
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
        },
        {
          title: 'Activity',
          dataIndex: 'activity',
          key: 'activity',
          align: 'center',
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          key: 'status',
          align: 'center'
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <Dropdown.Button icon={<MoreOutlined/>} type='text' overlay={ 
              <Menu>
                <Menu.Item key="1" icon={<EditOutlined />} onClick={() => {
                    showModal(2)
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
                      AddActivity("DELETE", record)
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
        <h1>จัดการข้อมูล Activity</h1>
        <Space>
          <p>ค้นหาด้วยชื่อ</p>
          <Search
                placeholder="Search"
                style={{ width : 300 , marginBottom : 10}}
                enterButton
          />
        </Space>
        <Button type='primary' style={{ float : 'right' }} icon={<PlusOutlined />} onClick={() => showModal(1)} >เพิ่ม Activity</Button>
            <Table 
            columns={columns}
            dataSource={activity}
            expandable size={'middle'}
            scroll={{
              y: 240,
            }}
            pagination={{
              pageSize: 8,
            }}
            />
        </Card>

        <Drawer
            title="Activity"
            headerStyle={{ textAlign: 'center' }}
            onClose={hideModal}
            onCancel={hideModal}
            visible={isShowModal}
            closable={true}
            maskClosable={false}
            keyboard={false}
            width="40%"
        >
                <Form
                    {...formItemLayout}
                    layout="vertical"
                    name="activityform"
                    id="activityform"
                    form={form}
                    onFinish={onFinish}
                    size="large"
                    initialValues={{
                        
                    }}
                >
                    <Form.Item
                        label="Activity"
                        name="activity"
                        rules={[{ required: true , message: 'กรุณาใส่ชื่อ Activity'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="คำอธิบาย"
                        name="activity_detail"
                    >
                        <TextArea 
                          rows={8}
                          autoSize={{ minRows: 8 , width: 12 }}
                        />
                      </Form.Item>

                    <Form.Item
                        name="status"
                        label="สถานะ"
                    >
                        <Radio.Group>
                            <Radio.Button value="Active">Active</Radio.Button>
                            <Radio.Button value="Non Active">Non Active</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ float : 'right'}}>
                      < Button type='primary' htmlType='sumbit'>ตกลง</Button>
                      <Button type='primary' onClick={hideModal}>ยกเลิก</Button>
                    </Space>
                  </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default ActivityManage