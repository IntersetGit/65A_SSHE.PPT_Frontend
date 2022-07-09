import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProFormInstance,
  ProFormRadio,
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
              value: 'IT Manager',
              label: 'IT Manager',
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

        <ProFormRadio.Group
          name="sshe"
          label="SSHE Officer"
          radioType="button"
          options={[
            {
              label: 'SSHE Officer',
              value: 1,
            },
            {
              label: 'Non SSHE Officer',
              value: 2,
            },
          ]}
        />
      </DrawerForm>
    </>
  );
};

export default TeamManagement;