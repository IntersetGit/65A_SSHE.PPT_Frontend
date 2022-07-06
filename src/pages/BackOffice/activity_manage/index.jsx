import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Radio,
  Space,
  Table,
} from 'antd';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';
import { activity_data } from '../../../../dummy_data/activity_data';

const { Search } = Input;
const { TextArea } = Input;

const ActivityManage = (props) => {
  const [activity, setactivity] = useState(activity_data);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ isuse: 0 });
    reload();
  }, []);

  const reload = (search = null) => {
    request('risk/getActivitice', {
      medthod: 'get',
      params: { search: search },
    })
      .then((res) => {
        res.items.forEach((v, k) => {
          v.number = `Ac${k + 1}`;
          v.key = k + 1;
        });
        setactivity(res.items);
        console.log(res.items);
      })
      .catch((err) => console.error(err));
  };

  const AddActivity = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([...activity, { key: activity.length + 1, ..._data }]);
        setactivity([...activity, { key: activity.length + 1, ..._data }]);
        break;

      case 'UPDATE':
        const indexs = activity.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...activity];

          arr[indexs] = _data;

          setactivity(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...activity];
        const newArr = newState.filter((e) => e.key != _data.key);

        setactivity(newArr);
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
    setselectedrow(null);
    setShowModal(false);
  };

  const onFinish = (values) => {
    if (drawerType == 1) {
      Swal.fire({
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
          request('risk/addActivitice', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddActivity('ADD', {
                id: res.items,
                key: res.items,
                number: `Ac${activity.length + 1}`,
                ...values,
              });
              Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
            }
          });
        }
      });
    } else if (drawerType == 2) {
      Swal.fire({
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
          request('risk/updateActivites', {
            method: 'post',
            data: {
              ...values,
              id: selectedrow.id,
            },
          }).then((res) => {
            if (res.status_code === 200) {
              AddActivity('UPDATE', {
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
    }
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
          request(`risk/deleteActivites/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddActivity('DELETE', record);
              Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            }
          });
        }
      });
    }
  };

  const display = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Activity',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'ภาษาไทย',
      dataIndex: 'name_thai',
      key: 'name_thai',
      align: 'center',
    },
    {
      title: 'สถานะ',
      dataIndex: 'isuse',
      key: 'isuse',
      align: 'center',
      sorter: (a, b) => a.isuse - b.isuse,
      render: (record) => {
        return <p>{record === 1 ? `ใช้งาน` : `ไม่ใช้งาน`}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
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
          <p>ค้นหาด้วยชื่อ</p>
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
          type="primary"
          style={{ float: 'right' }}
          icon={<PlusOutlined />}
          onClick={() => showModal(1)}
        >
          เพิ่ม Activity
        </Button>
        <Table
          columns={columns}
          dataSource={activity}
          expandable
          size={'middle'}
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
          initialValues={{}}
        >
          <Form.Item
            label="Activity"
            name="name"
            rules={[{ required: true, message: 'กรุณาใส่ชื่อ Activity' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ภาษาไทย"
            name="name_thai"
            rules={[{ required: true, message: 'กรุณาใส่ชื่อภาษาไทย' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="คำอธิบาย" name="description">
            <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
          </Form.Item>

          <Form.Item
            name="isuse"
            label="สถานะ"
            rules={[{ required: true, message: 'กรุณาเลือก' }]}
          >
            <Radio.Group>
              <Radio.Button value={1}>Active</Radio.Button>
              <Radio.Button value={0}>Non Active</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button type="primary" htmlType="sumbit">
                ตกลง
              </Button>
              <Button type="primary" onClick={hideModal}>
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
            title={selectedrow?.name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ActivityManage;
