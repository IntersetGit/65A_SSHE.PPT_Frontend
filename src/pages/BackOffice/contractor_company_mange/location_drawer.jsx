import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Radio,
  Select,
  Space,
} from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';
import { office_type } from '../../../../dummy_data/office_type';

const { Option } = Select;
const { TextArea } = Input;

const LocationDrawer = (props) => {
  const [isShowModal, setShowModal] = useState(false);
  const [drawerType, setdrawerType] = useState(1);

  const showModal = (type) => {
    setdrawerType(type);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const preDelete = (values) => {
    console.log(props.data.key);
    Swal.fire({
      title: 'ลบข้อมูล',
      text: 'ยืนยันการลบข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        request('master/updateCompany', {
          method: 'delete',
          data: { id: props.data.id },
        })
          .then((res) => {
            if (res.status_code === 200) {
              props.onSave('DELETE', { id: props.data.id });
              Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(`ลบข้อมูลไม่สำเร็จ ${err}`, '', 'error');
          });
      }
    });
  };

  const onFinish = (values) => {
    drawerType === 1
      ? Swal.fire({
          title: 'บันทึกข้อมูล',
          text: 'ยืนยันการบันทึกข้อมูล',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            request('master/CreateCompany', {
              method: 'post',
              data: {
                address: values.address,
                name: values.company_name,
                type: values.company_type,
              },
            }).then((res) => {
              if (res.status_code) {
                props.onSave('ADD', { ...res.items });
                console.log(res);
                Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
              }
            });
          }
        })
      : Swal.fire({
          title: 'แก้ไขข้อมูล',
          text: 'ยืนยันการแก้ไขข้อมูล',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            request('master/updateCompany', {
              method: 'post',
              data: {
                address: values.address,
                name: values.company_name,
                type: values.company_type,
                id: props.data.id,
              },
            }).then((res) => {
              console.log(res);
              if (res.status_code === 200) {
                props.onSave('UPDATE', {
                  ...values,
                  key: props.data.key,
                  id: props.data.id,
                });
                Swal.fire('แก้ไขข้อมูลสำเร็จ', '', 'success');
              }
            });
          }
        });
    hideModal();
  };

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

  return (
    <>
      {props.type === 1 ? (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          style={{ marginBottom: 20, float: 'right' }}
          onClick={() => showModal(1)}
        >
          เพิ่ม
        </Button>
      ) : (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu mode="vertical">
              <Menu.Item
                key="1"
                icon={<EditOutlined />}
                onClick={() => showModal(2)}
              >
                แก้ไขข้อมูลบริษัท
              </Menu.Item>
              <Menu.Item key="2" icon={<DeleteOutlined />} onClick={preDelete}>
                ลบข้อมูลบริษัท
              </Menu.Item>
            </Menu>
          }
        ></Dropdown.Button>
      )}
      <Drawer
        title="บริษัทผู้รับเหมา"
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
          name="complocform"
          id="complocform"
          onFinish={onFinish}
          size="large"
          initialValues={{
            key: props.data && props.data.key,
            id: props.data && props.data.id,
            company_type: props.data && props.data.company_type,
            company_name: props.data ? props.data.company_name : '',
            address: props.data ? props.data.address : '',
            status: props.data ? props.data.status : '',
          }}
        >
          <Col>
            <Form.Item label="">
              <Form.Item
                name="company_name"
                label="ชื่อบริษัท (TH) :"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณาระบุชื่อบริษัท',
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
                name="company_type"
                label="สำนักงานใหญ๋/สาขา :"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
              >
                <Select options={office_type}></Select>
              </Form.Item>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="">
              <Form.Item
                name="address"
                label="ที่อยู่ (TH)"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณาระบุที่อยู่บริษัท',
                  },
                ]}
              >
                <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="status" label="สถานะ">
              <Radio.Group>
                <Radio.Button value="Active">Active</Radio.Button>
                <Radio.Button value="Non Active">Non Active</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button size="medium" type="primary" htmlType="sumbit">
                ตกลง
              </Button>
              <Button size="medium" type="primary" onClick={hideModal}>
                ยกเลิก
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default LocationDrawer;
