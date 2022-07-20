import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Select,
  Space,
  Table,
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
  const [subcontract, setsubcontract] = useState([]);
  const [project, setproject] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    reload();
  }, []);

  const reload = (search) => {
    request('master/getCompany', { method: 'get', params: { search: search } })
      .then((res) => {
        console.log(res);
        res.items.forEach((v, k) => {
          v.key = k + 1;
          v.number = k + 1;
          v.subcontract = v.subcontract_name;
        });
        setcomusermanage(res.items);
      })
      .catch((err) => console.error(err));

    request('master/getSubCompany', { method: 'get' })
      .then((res) => {
        console.log(res);
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.subcontract_name, value: v.id });
        });
        setsubcontract(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));

    request('master/getProject', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.project_name, value: v.id });
        });
        setproject(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  };

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
    form.resetFields();
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
                  number: comusermanage.length + 1,
                  subcontract_id: values.subcontract,
                  ...values,
                });
                console.log(res);
                reload();
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
                  subcontract_id: values.subcontract,
                });
                reload();
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
    // record = record.props.record;
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
              reload();
              Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            }
          });
        }
      });
    }
  };

  const display = [
    {
      title: 'Project Name',
      dataIndex: 'project',
      key: 'Project Name',
      render: (record) => {
        return (
          <>
            {record.map((v, k) => {
              return <div key={v.project_id}>{v.project_name}</div>;
            })}
          </>
        );
      },
    },
  ];

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      hideInSearch: true,
      sorter: (a, b) => a.number - b.number,
    },
    { ...Table.EXPAND_COLUMN, hideInDescriptions: true },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
    },
    {
      title: 'Subcontract',
      dataIndex: 'subcontract_id',
      key: 'subcontract_id',
      align: 'center',
      render: (record) => {
        const data = subcontract.find((e) => e.value === record);
        return <>{<div key={data?.value}>{data?.label}</div>}</>;
      },
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      hideInSearch: true,
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
        <Space>
          <p>ชื่อบริษัท</p>
          <Search
            placeholder="Search"
            style={{ width: 300, marginBottom: 10 }}
            enterButton
            allowClear
            onSearch={(search) => {
              reload(search);
            }}
          />
        </Space>

        <Button
          onClick={() => {
            reload();
          }}
          style={{ marginLeft: 10 }}
        >
          <RedoOutlined />
        </Button>

        <Button
          type="primary"
          style={{ float: 'right' }}
          icon={<PlusOutlined />}
          onClick={() => showModal(1)}
        >
          เพิ่ม
        </Button>

        <Table
          columns={columns}
          dataSource={comusermanage}
          expandable={{
            expandedRowRender: (record) => (
              <>
                {record.project.map((v, k) => {
                  return (
                    <span style={{ margin: 0 }} key={v.project_id}>
                      {' '}
                      {v.project_name} ,{' '}
                    </span>
                  );
                })}
              </>
            ),
            rowExpandable: (record) => record.company_name !== 'Not Expandable',
          }}
          pagination={{
            pageSize: 8,
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
            <Form.Item label="">
              <Form.Item
                name="subcontract"
                label="เป็น Subcontract ของ"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
              >
                <Select allowClear options={subcontract}></Select>
              </Form.Item>
            </Form.Item>
          </Col>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button type="primary" htmlType="sumbit">
                ตกลง
              </Button>
              <Button onClick={hideModal}>ยกเลิก</Button>
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
        closable={true}
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
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ContractorCompanyManage;
