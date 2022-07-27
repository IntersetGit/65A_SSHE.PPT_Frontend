import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  ProColumns,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Select,
  Space,
} from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { columns } from './column';
import { data } from './data';

const TeamManagement = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [viewdrawer, setviewdrawer] = useState(false);
  const [teammanagement, setteammanagement] =
    useState<APITypes.TeamManagemenType[]>(data);
  const [form] = Form.useForm();
  const [drawerType, setdrawerType] = useState(1);
  const [selectedRow, setselectedRow] = useState<{} | null>(null);

  const AddTeam = (type: string, _data: APITypes.TeamManagemenType) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...teammanagement,
          { key: teammanagement.length + 1, ..._data },
        ]);
        setteammanagement([
          ...teammanagement,
          { key: teammanagement.length + 1, ..._data },
        ]);
        break;

      case 'UPDATE':
        const indexs = teammanagement.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...teammanagement];

          arr[indexs] = _data;

          setteammanagement(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...teammanagement];
        const newArr = newState.filter((e) => e.key != _data.key);

        setteammanagement(newArr);
        break;

      default:
        break;
    }
  };

  const showDrawer = (type: any) => {
    setdrawerType(type);
    setShowDrawer(true);
  };

  const hideDrawer = () => {
    form.resetFields();
    setselectedRow(null);
    setShowDrawer(false);
  };

  const showviewdrawer = () => {
    setviewdrawer(true);
  };

  const menuItems = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'แก้ไข',
    },
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'ดูข้อมูล',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'ลบข้อมูล',
    },
  ];

  const onMenuClick = (event: MenuInfo, record: APITypes.TeamManagemenType) => {
    const { key } = event;
    if (key === 'edit') {
      setselectedRow(record);
      form.setFieldsValue(record);
      showDrawer(2);
    } else if (key === 'view') {
      setselectedRow(record);
      showviewdrawer();
    } else if (key === 'delete') {
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
          AddTeam('DELETE', record);
          Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
        }
      });
    }
  };

  const optionCol: ProColumns = {
    title: 'Action',
    key: 'action',
    valueType: 'option',
    hideInSearch: true,
    render: (_: any, record: any) => {
      return (
        <>
          <Dropdown.Button
            type="text"
            icon={<MoreOutlined />}
            overlay={
              <Menu items={menuItems} onClick={(e) => onMenuClick(e, record)} />
            }
          />
        </>
      );
    },
  };

  const comparedColums = [...columns, optionCol];

  const onFinish = (values: APITypes.TeamManagemenType) => {
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
          AddTeam('ADD', values);
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
          AddTeam('UPDATE', { ...selectedRow, ...values });
          Swal.fire('แก้ไขข้อมูลสำเร็จ', '', 'success');
        }
      });
    }
    hideDrawer();
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
      <ProTable
        search={{
          labelWidth: 'auto',
        }}
        columns={comparedColums}
        dataSource={teammanagement}
        size={'middle'}
        pagination={{
          pageSize: 8,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            style={{ float: 'right' }}
            icon={<PlusOutlined />}
            onClick={() => showDrawer(1)}
          >
            เพิ่ม
          </Button>,
        ]}
      />

      <Drawer
        title={'การจัดการข้อมูลพนักงาน สำหรับผู้รับเหมา'}
        visible={isShowDrawer}
        onClose={hideDrawer}
        width={'40%'}
        size={'large'}
      >
        <Form
          {...formItemLayout}
          layout="vertical"
          name="teammanegementform"
          id="teammanagementform"
          form={form}
          size="large"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="firstlast"
            label="ชื่อ-นามสกุล"
            rules={[{ required: true, message: 'โปรดใส่ชื่อ-นามสกุลของคุณ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="position"
            label="ตำแหน่ง"
            rules={[{ required: true, message: 'โปรดใส่ตำแหน่งของคุณ' }]}
          >
            <Select
              options={[
                {
                  value: 'Project Manager',
                  label: 'Project Manager',
                },
                {
                  value: 'IT Manager',
                  label: 'IT Manager',
                },
                {
                  value: 'หัวหน้าทีมไฟฟ้า',
                  label: 'หัวหน้าทีมไฟฟ้า',
                },
                {
                  value: 'หัวหน้าทีมก่อสร้าง',
                  label: 'หัวหน้าทีมก่อสร้าง',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="e_mail"
            label="Email"
            rules={[{ required: true, message: 'โปรดใส่อีเมล์คุณ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="project_responsible"
            label="Project"
            rules={[
              { required: true, message: 'โปรดใส่ Project ที่คุณรับผิดชอบ' },
            ]}
          >
            <Select
              options={[
                {
                  value: '5TP Phase3',
                  label: '5TP Phase3',
                },
                {
                  value: 'New Plant Tank Farm2',
                  label: 'New Plant Tank Farm2',
                },
                {
                  value: '10KmPipeto EEC',
                  label: '10KmPipeto EEC',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'โปรดใส่ตำแหน่งของคุณ' }]}
          >
            <Select
              options={[
                {
                  value: 'Company Admin',
                  label: 'Company Admin',
                },
                {
                  value: 'SSHE Officer',
                  label: 'SSHE Officer',
                },
                {
                  value: 'Staff',
                  label: 'Staff',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit">
                ตกลง
              </Button>
              <Button onClick={hideDrawer}>ยกเลิก</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        width={700}
        visible={viewdrawer}
        onClose={() => {
          setselectedRow(null);
          setviewdrawer(false);
        }}
        closable={true}
      >
        {console.log('selectedRow', selectedRow)}
        {selectedRow?.id && (
          <ProDescriptions
            column={1}
            bordered
            title={selectedRow?.firstlast}
            request={async () => ({
              data: selectedRow || {},
            })}
            params={{
              id: selectedRow?.firstlast,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </>
  );
};

export default TeamManagement;
