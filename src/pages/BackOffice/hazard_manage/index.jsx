import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
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
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';

const { Search } = Input;
const { TextArea } = Input;

const HazardManage = (props) => {
  const [hazard, sethazard] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [type, settype] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    request('master/getHazardIssue', { medthod: 'get' })
      .then((res) => {
        res.items.forEach((v, k) => {
          v.number = k + 1;
          v.key = k + 1;
          v.status = 'Active';
        });
        sethazard(res.items);
        console.log(res.items);
      })
      .catch((err) => console.error(err));

    request('master/getIssueType', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.issue_type_name, value: v.issue_type_id });
        });
        settype(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  }, []);

  const AddHazard = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...hazard,
          { key: hazard.length + 1, status: 'Active', ..._data },
        ]);
        sethazard([
          ...hazard,
          { key: hazard.length + 1, status: 'Active', ..._data },
        ]);
        break;

      case 'UPDATE':
        const indexs = hazard.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...hazard];

          arr[indexs] = _data;

          sethazard(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...hazard];
        const newArr = newState.filter((e) => e.key != _data.key);

        sethazard(newArr);
        break;

      default:
        break;
    }
  };

  const showModal = (type) => {
    setdrawerType(type);
    setShowModal(true);
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
          request('master/manageIssueType', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddIssueType('ADD', {
                id: res.items,
                key: res.items,
                number: res.items,
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
          request('master/manageIssueType', {
            method: 'post',
            data: {
              ...values,
              id: selectedrow.id,
            },
          }).then((res) => {
            if (res.status_code === 201) {
              AddIssueType('UPDATE', {
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
          request(`master/deleteIssueType/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddIssueType('DELETE', record);
              Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            }
          });
        }
      });
    }
  };

  const columns = [
    {
      title: 'IssueType ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'IssueType',
      dataIndex: 'issue_type_name',
      key: 'issue_type_id',
      align: 'center',
    },
    {
      title: 'Hazard',
      dataIndex: 'hazard_name',
      key: 'hazard_id',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Non Active',
          value: 'Non Active',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => {
        return <p>{record ? 'Active' : 'Non Active'}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
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
        <h1>จัดการข้อมูล Hazard (from Issue)</h1>
        <Space>
          <p>ค้นหาด้วยชื่อ</p>
          <Search
            placeholder="Search"
            style={{ width: 300, marginBottom: 10 }}
            enterButton
          />
        </Space>
        <Button
          type="primary"
          style={{ float: 'right' }}
          icon={<PlusOutlined />}
          onClick={() => showModal(1)}
        >
          เพิ่ม Hazard
        </Button>
        <Table
          columns={columns}
          dataSource={hazard}
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
        title="HAZARD (From ISSUE)"
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
            label="Hazard"
            name="hazard_name"
            rules={[{ required: true, message: 'กรุณาใส่ชื่อ Hazard' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="คำอธิบาย" name="description">
            <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
          </Form.Item>

          <Form.Item name="status" label="สถานะ">
            <Radio.Group>
              <Radio.Button value="Active">Active</Radio.Button>
              <Radio.Button value="Non Active">Non Active</Radio.Button>
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
    </>
  );
};

export default HazardManage;
