import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './column';
import { data } from './data';

const TeamManagement: React.FC = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);
  const formRef = useRef<ProFormInstance>();

  const showModal = () => {
    setShowDrawer(true);
  };

  return (
    <>
      <ProTable
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        dataSource={data}
        size={'middle'}
        scroll={{
          y: 240,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            style={{ float: 'right' }}
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            เพิ่ม
          </Button>,
        ]}
      />

      <DrawerForm
        title={'การจัดการข้อมูลพนักงาน สำหรับผู้รับเหมา'}
        visible={isShowDrawer}
        width={'40%'}
        formRef={formRef}
        layout={'vertical'}
        size={'large'}
        autoFocusFirstInput
        onVisibleChange={(visible) => {
          setShowDrawer(visible);
        }}
        drawerProps={{
          destroyOnClose: true,
          closable: true,
        }}
      >
        <ProFormText
          name="firstlast"
          label="ชื่อ-นามสกุล"
          placeholder={'กรุณาใส่ชื่อ-นามสกุล'}
          rules={[{ required: true, message: 'โปรดใส่ชื่อ-นามสกุลของคุณ' }]}
        />

        <ProFormSelect
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
          name="position"
          label="ตำแหน่ง"
          placeholder={'กรุณาใส่ตำแหน่ง'}
          rules={[{ required: true, message: 'โปรดใส่ตำแหน่งของคุณ' }]}
        />

        <ProFormText name="e_mail" label="Email" placeholder={'กรุณาอีเมล'} />

        <ProFormSelect
          options={[
            {
              value: '5TP Phase3',
              label: '5TP Phase3',
            },
          ]}
          name="project_responsible"
          label="Project"
          placeholder={'กรุณาใส่ Project '}
          rules={[
            { required: true, message: 'โปรดใส่ Project ที่คุณรับผิดชอบ' },
          ]}
        />

        <ProFormSelect
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
          name="roles"
          label="Role"
          placeholder={'กรุณาใส่ตำแหน่ง'}
          rules={[{ required: true, message: 'โปรดใส่ตำแหน่งของคุณ' }]}
        />
      </DrawerForm>
    </>
  );
};

export default TeamManagement;
