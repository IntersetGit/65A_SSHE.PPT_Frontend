import React, { useState } from 'react'
import { Button, Drawer, Form, Select, Input, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { office_type } from '../../config/office_type';
import { region } from '../../config/region';
import { povine } from '../../config/povine';

const {Option} = Select;
const { TextArea } = Input;

const LocationDrawer = (props) => {
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

      return(
          <>
          <Button icon={<PlusOutlined/>} size='large' type='primary' style={{ marginBottom: 20, float: 'left' }} onClick={showModal}>เพิ่ม</Button>
          <Drawer
                title='เพิ่มที่ตั้งบริษัท'
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
                    {...formItemLayout}
                    layout="vertical"
                    name="complocform"
                    id="complocform"
                    onFinish={onFinish}
                    size="large"
                    initialValues={{

                    }}
                >
                    <Col>
                        <Form.Item label="">
                            <Form.Item
                                name="reg_company_id"
                                label="รหัสบริษัท :"
                                labelCol={{ span: 24 }}
                                style={{
                                display: "inline-block",
                                width: "calc(50% - 12px)",
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: "กรุณาระบุรหัสบริษัท",
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="company_level_id"
                                label="สำนักงานใญ่/สาขา :"
                                labelCol={{ span: 24 }}
                                style={{
                                marginLeft: "20px",
                                display: "inline-block",
                                width: "calc(50% - 12px)",
                                }}
                            >
                                <Select options={office_type}>
                                </Select>
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item label="">
                            <Form.Item
                                name="company_name_th"
                                label="ชื่อบริษัท (TH) :"
                                labelCol={{ span: 24 }}
                                style={{
                                display: "inline-block",
                                width: "calc(100% - 12px)",
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: "กรุณาระบุชื่อบริษัท",
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    
                    <Col>
                        <Form.Item label="">
                            <Form.Item
                                name="village_building_th"
                                label="ที่อยู่ (TH)"
                                labelCol={{ span: 24 }}
                                style={{
                                display: "inline-block",
                                width: "calc(50% - 12px)",
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: "กรุณาระบุที่อยู่บริษัท",
                                },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item label="">
                            <Form.Item
                                name="mas_region_id"
                                label="ภูมิภาค :"
                                labelCol={{ span: 24 }}
                                style={{
                                display: "inline-block",
                                width: "calc(50% - 12px)",
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: "กรุณาระบุภูมิภาค",
                                },
                                ]}
                            >
                                <Select options={region}></Select>
                            </Form.Item>
                            <Form.Item
                                name="mas_prov_id"
                                label="จังหวัด :"
                                labelCol={{ span: 24 }}
                                style={{
                                marginLeft: "20px",
                                display: "inline-block",
                                width: "calc(50% - 12px)",
                                }}
                                rules={[
                                {
                                    required: true,
                                    message: "กรุณาระบุจังหวัด",
                                },
                                ]}
                            >
                                <Select options={povine}></Select>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Form>
        </Drawer>        
          </>
      )
}

export default LocationDrawer