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
  Tabs,
} from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { project_data } from '../../../../dummy_data/project_company';
const { Search } = Input;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ProjectManage = (props) => {
  const [projectdata, setprojectdata] = useState(project_data);
  const [isShowModal, setShowModal] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();
  const [value, setValue] = useState('Active');

  const AddProject = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...projectdata,
          {
            id: projectdata.length + 1,
            key: projectdata.length + 1,
            project_id: `Rp-00${projectdata.length + 1}`,
            ..._data,
          },
        ]);
        setprojectdata([
          ...projectdata,
          {
            id: projectdata.length + 1,
            key: projectdata.length + 1,
            project_id: `Rp-00${projectdata.length + 1}`,
            ..._data,
          },
        ]);
        break;

      case 'UPDATE':
        const indexs = projectdata.findIndex((e) => e.key == _data.key);
        if (indexs != -1) {
          let arr = [...projectdata];

          arr[indexs] = _data;

          setprojectdata(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...projectdata];
        const newArr = newState.filter((e) => e.key != _data.key);

        setprojectdata(newArr);
        break;

      default:
        break;
    }
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
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
          AddProject('ADD', values);
          Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
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
          AddProject('UPDATE', { ...selectedrow, ...values });
          Swal.fire('แก้ไขข้อมูลสำเร็จ', '', 'success');
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

  const RadioonChange = ({ target: { value } }) => {
    console.log('radio checked', value);
    setValue(value);
  };

  const options = [
    {
      label: 'Active',
      value: 'Active',
    },
    {
      label: 'Non Active',
      value: 'Non Active',
    },
  ];

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'project_id',
      key: 'project_id',
      align: 'center',
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'Project Name',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                icon={<EditOutlined />}
                onClick={() => {
                  showModal(2);
                  setselectedrow(record);
                  form.setFieldsValue(record);
                }}
              >
                แก้ไข
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<DeleteOutlined />}
                onClick={() =>
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
                      AddProject('DELETE', record);
                      Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
                    }
                  })
                }
              >
                ลบ
              </Menu.Item>
            </Menu>
          }
        ></Dropdown.Button>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginTop: '1rem' }} bordered={true}>
        <h1>จัดการข้อมูลโครงการ</h1>
        <Space>
          <p>ชื่อโครงการ</p>
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
          เพิ่ม
        </Button>
        <Table
          columns={columns}
          dataSource={projectdata}
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
          form={form}
          name="projectform"
          id="projectform"
          onFinish={onFinish}
          size="large"
          initialValues={{}}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="โครงการ" key="1">
              <Form.Item
                label="ชื่อโครงการ"
                name="project_name"
                rules={[{ required: true, message: 'กรุณาใส่ชื่อโครงการ' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="รายละเอียด" name="project_detail">
                <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
              </Form.Item>

              <Form.Item label="Active" name="active">
                <Radio.Group
                  options={options}
                  onChange={RadioonChange}
                  value={value}
                  optionType="button"
                />
              </Form.Item>
            </TabPane>

            <TabPane tab="บริษัทผู้รับเหมา" key="2"></TabPane>
          </Tabs>

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

export default ProjectManage;
