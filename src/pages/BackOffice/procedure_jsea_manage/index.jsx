import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Form, Dropdown, Button, Menu, Input, Drawer, Radio } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { procedurejsea_data } from '../../../../dummy_data/procedurejsea_data';
import { useForm } from 'antd/lib/form/Form';
import Swal from 'sweetalert2';

const { Search } = Input;
const { TextArea } = Input;

const ProcedureJsea = (props) => {
    const [procedurejsea , setprocedurejsea] = useState(procedurejsea_data)
    const [isShowModal, setShowModal] = useState(false)
    const [drawerType, setdrawerType] = useState(1)
    const [selectedrow,setselectedrow] = useState(null)
    const [form] = useForm()

    const AddProcedureJsea = (type, _data = {}) => {
        console.log('onSaveData', type)
        switch (type) {
          case "ADD":
            console.log([...procedurejsea , {key : procedurejsea.length + 1 , id : `PJ${procedurejsea.length + 1}` , status : "Active" , ..._data}])
            setprocedurejsea([...procedurejsea , {key : procedurejsea.length + 1 , id : `PJ${procedurejsea.length + 1}`, status : "Active" , ..._data}])
            break;
  
          case "UPDATE":
            const indexs = procedurejsea.findIndex(e => e.key == _data.key)
            if (indexs != -1) {
              let arr = [...procedurejsea]
            
              arr[indexs] = _data
  
              setprocedurejsea(arr)
              console.log(arr)
              
            }
            break;
  
          case "DELETE":
            console.log(_data)
            const newState = [...procedurejsea]
            const newArr = newState.filter(e => e.key != _data.key)
  
            setprocedurejsea(newArr)
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
              AddProcedureJsea("ADD", values )
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
          AddProcedureJsea("UPDATE", {...selectedrow , ...values})
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
          title: 'Procedure & Jsea',
          dataIndex: 'procedurejsea',
          key: 'procedurejsea',
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
                      AddProcedureJsea("DELETE", record)
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
        <h1>จัดการข้อมูล Procedure & Jsea</h1>
        <Space>
          <p>ค้นหาด้วยชื่อ</p>
          <Search
                placeholder="Search"
                style={{ width : 300 , marginBottom : 10}}
                enterButton
          />
        </Space>
        <Button type='primary' style={{ float : 'right' }} icon={<PlusOutlined />} onClick={() => showModal(1)} >เพิ่ม Procedure & Jsea</Button>
            <Table 
            columns={columns}
            dataSource={procedurejsea}
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
            title="Procedure & Jsea"
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
                    name="procedurejseaform"
                    id="procedurejseaform"
                    form={form}
                    onFinish={onFinish}
                    size="large"
                    initialValues={{
                        
                    }}
                >
                    <Form.Item
                        label="Procedure & Jsea"
                        name="procedurejsea"
                        rules={[{ required: true , message: 'กรุณาใส่ชื่อ Procedure & Jsea'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="คำอธิบาย"
                        name="procedurejsea_detail"
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

export default ProcedureJsea