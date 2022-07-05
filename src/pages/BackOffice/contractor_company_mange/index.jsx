import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProDescriptions, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Card,
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
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';
import { office_type } from '../../../../dummy_data/office_type';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const ContractorCompanyManage = (props) => {
  const [comusermanage, setcomusermanage] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    request('master/getCompany', { method: 'get' })
      .then((res) => {
        console.log(res);
        res.items.forEach((v, k) => {
          v.key = k + 1;
          v.number = k + 1;
        });
        setcomusermanage(res.items);
      })
      .catch((err) => console.error(err));
  }, []);

  const AddComData = (type, _data) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...comusermanage,
          { key: comusermanage.length + 1, ..._data },
        ]);
        setcomusermanage([
          ...comusermanage,
          { key: comusermanage.length + 1, ..._data },
        ]);
        break;

      case 'UPDATE':
        console.log(_data);
        const indexs = comusermanage.findIndex((e) => e.key == _data.key);
        if (indexs != -1) {
          let arr = [...comusermanage];

          arr[indexs] = _data;

          setcomusermanage(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...comusermanage];
        const newArr = newState.filter((e) => e.id != _data.id);

        setcomusermanage(newArr);
        break;

      default:
        break;
    }
  };

  const showModal = (type) => {
    setdrawerType(type);
    setShowModal(true);
  };

  const showDrawer = () => {
    setShowDrawer(true);
  };

  const hideModal = () => {
    setShowModal(false);
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
            request('master/manageCompany', {
              method: 'post',
              data: values,
            }).then((res) => {
              if (res.status_code) {
                AddComData('ADD', {
                  id: res.items,
                  number: `Rp-00${comusermanage.length + 1}`,
                  ...values,
                });
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
            request('master/manageCompany', {
              method: 'post',
              data: {
                ...values,
                id: selectedrow.id,
              },
            }).then((res) => {
              console.log(res);
              if (res.status_code === 201) {
                AddComData('UPDATE', {
                  ...values,
                  key: selectedrow.key,
                  id: selectedrow.id,
                  number: selectedrow.number,
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

  const menus = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'แก้ไข',
    },
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'ดู',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'ลบ',
    },
  ];

  const onMenuClick = async (event, record) => {
    record = record.props.record;
    const { key } = event;
    if (key === 'edit') {
      showModal(2);
      setselectedrow(record);
      form.setFieldsValue(record);
    } else if (key === 'view') {
      showDrawer();
      setselectedrow(record);
    } else {
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
          request(`master/updateCompany/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddComData('DELETE', record);
              Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            }
          });
        }
      });
    }
  };

  const display = [
    {
      title: 'Company Name',
      dataIndex: 'company',
      key: 'Company Name',
      render: (record) => {
        return (
          <>
            {record.map((v, k) => {
              return <div key={v.company_id}>{v.company_name}</div>;
            })}
          </>
        );
      },
    },
    {
      title: 'Project Type ID',
      dataIndex: 'project_type_id',
      key: 'Project Type ID',
      render: (record) => {
        const data = project.find((e) => e.value === record);
        return <>{<div key={data?.value}>{data?.label}</div>}</>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'Active',
      render: (record) => {
        return <p>{record === 1 ? `ใช้งาน` : `ไม่ใช้งาน`}</p>;
      },
    },
    {
      title: 'Favorite Status',
      dataIndex: 'favorite_status',
      key: 'Favorite Status',
    },
  ];

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
    },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a, b) => a.type - b.type,
      render: (record) => {
        return <p>{record ? 'Active' : 'Non Active'}</p>;
      },
    },
    {
      title: 'จัดการ',
      key: 'จัดการ',
      align: 'center',
      valueType: 'option',
      render: (record) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu items={menus} onClick={(e) => onMenuClick(e, record)} />
          }
        ></Dropdown.Button>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginTop: '1rem' }} bordered={true}>
        {/* <Space>
          <p>ชื่อโครงการ</p>
          <Search
            placeholder="Search"
            style={{ width: 300, marginBottom: 10 }}
            enterButton
          />
        </Space> */}
        <ProTable
          columns={columns}
          dataSource={comusermanage}
          expandable
          toolBarRender={() => [
            <Button
              type="primary"
              style={{ float: 'right' }}
              icon={<PlusOutlined />}
              onClick={() => showModal(1)}
            >
              เพิ่ม
            </Button>,
          ]}
          size={'middle'}
          scroll={{
            y: 240,
          }}
        />
      </Card>

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
          form={form}
          onFinish={onFinish}
          size="large"
          initialValues={
            {
              // key: props.data && props.data.key,
              // id: props.data && props.data.id,
              // company_type: props.data && props.data.company_type,
              // company_name: props.data ? props.data.company_name : '',
              // address: props.data ? props.data.address : '',
              // status: props.data ? props.data.status : '',
            }
          }
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

      <Drawer
        width={700}
        visible={isShowDrawer}
        onClose={() => {
          setselectedrow(undefined);
          setShowDrawer(false);
        }}
        closable={false}
      >
        {selectedrow?.id && (
          <ProDescriptions
            column={1}
            bordered
            title={selectedrow?.company_name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.company_name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </>
  );
};

export default ContractorCompanyManage;
