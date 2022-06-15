import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Radio,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { constractor_company } from '../../../../dummy_data/constractor_company';
import { constractor_data } from '../../../../dummy_data/constractor_data';
import { project_data } from '../../../../dummy_data/project_company';

const { Search } = Input;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ProjectManage = (props) => {
  const [projectdata, setprojectdata] = useState(project_data);
  const [isShowModal, setShowModal] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form, formCT] = Form.useForm();
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
            number: `${projectdata.length + 1}`,
            ..._data,
          },
        ]);
        setprojectdata([
          ...projectdata,
          {
            id: projectdata.length + 1,
            key: projectdata.length + 1,
            number: `${projectdata.length + 1}`,
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

  const column = [
    {
      title: 'ชื่อผู้รับเหมา',
      dataIndex: 'constractor_name',
      key: 'constractor_name',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (record) => {
        return <Button type="danger">-</Button>;
      },
    },
  ];

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'number',
      key: 'number',
      hideInSearch: true,
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'ชี่อโปรเจค',
      dataIndex: 'project_name',
      key: 'Project Name',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      valueType: 'option',
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
      {/* <Card style={{ marginTop: '1rem' }} bordered={true}> */}
      {/* <h1>จัดการข้อมูลโครงการ</h1>
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
        </Button> */}
      <ProTable
        columns={columns}
        dataSource={projectdata}
        expandable
        size={'middle'}
        toolBarRender={() => [
          <Button
            type="primary"
            style={{ float: 'right' }}
            icon={<PlusOutlined />}
            onClick={() => showModal(1)}
          >
            เพิ่มข้อมูลโครงการ
          </Button>,
        ]}
        // scroll={{
        //   y: 240,
        // }}
        pagination={{
          pageSize: 8,
        }}
      />
      {/* </Card> */}

      <Drawer
        onClose={hideModal}
        onCancel={hideModal}
        visible={isShowModal}
        closable={true}
        maskClosable={false}
        keyboard={false}
        width="40%"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="โครงการ" key="1">
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
          </TabPane>

          <TabPane tab="บริษัทผู้รับเหมา" key="2">
            <Form
              {...formItemLayout}
              layout="vertical"
              form={formCT}
              name="projectform"
              id="projectform"
              onFinish={onFinish}
              size="large"
              initialValues={{}}
            >
              <Form.Item label="เพิ่มผู้รับเหมา" name="add_contractor">
                <Select options={constractor_company} />
                <Button type="primary" icon={<PlusOutlined />} />
              </Form.Item>

              <Form.Item>
                <Table
                  columns={column}
                  dataSource={constractor_data}
                  expandable
                  size={'middle'}
                  scroll={{
                    y: 240,
                  }}
                  pagination={{
                    pageSize: 8,
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Space style={{ float: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    ตกลง
                  </Button>
                  <Button type="primary" onClick={hideModal}>
                    ยกเลิก
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default ProjectManage;
