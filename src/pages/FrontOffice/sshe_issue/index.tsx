import {
  AimOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  FileExcelOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  DrawerForm,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import { getIssueHazard, getIssueType } from './api';
import { columns } from './column';
import { status } from './enums';
import Map from './map';

const Issue = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [isShowMapmodal, setShowMapmodal] = useState(false);
  const [mapmode, setmapmode] = useState<'select' | 'display'>('select');
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const showModal = () => {
    setShowDrawer(true);
  };

  const showMapModal = () => {
    setShowMapmodal(!isShowMapmodal);
  };

  return (
    <>
      <ProTable
        search={{
          labelWidth: 'auto',
        }}
        columns={columns}
        actionRef={actionRef}
        columnEmptyText={'ไม่พบข้อมูล'}
        footer={() => [
          <Button
            type="primary"
            key={'alertmap'}
            icon={<EnvironmentOutlined />}
            onClick={() => {
              setmapmode('display');
              showMapModal();
            }}
          >
            Alert Map
          </Button>,
        ]}
        toolBarRender={() => [
          <Button
            type="primary"
            style={{ float: 'right' }}
            key={'addissue'}
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            เพิ่ม ISSUE
          </Button>,
          <Button
            type="default"
            key={'download_template'}
            style={{ float: 'right' }}
            icon={<DownloadOutlined />}
          >
            Download Template
          </Button>,
          <Button
            type="default"
            key={'export_excel'}
            style={{ float: 'right' }}
            icon={<FileExcelOutlined />}
          >
            Export Excel
          </Button>,
        ]}
        size={'middle'}
        scroll={{
          y: 240,
        }}
      />
      {/* Drawer Form */}
      <DrawerForm
        title={'ADD ISSUE'}
        visible={isShowDrawer}
        onFinish={async (values) => {
          console.log(values);
        }}
        formRef={formRef}
        layout={'horizontal'}
        autoFocusFirstInput
        onVisibleChange={(visible) => {
          setShowDrawer(visible);
        }}
        drawerProps={{
          destroyOnClose: true,
          closable: true,
        }}
      >
        <ProForm.Group>
          <ProFormDatePicker
            label={'Date'}
            width={'sm'}
            name={'date'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่วันที่',
              },
            ]}
          />
          <ProFormSelect
            label={'Project Name'}
            width={'md'}
            name={'project_name'}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            label={'Location'}
            width={'md'}
            name={'location'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่ตำแหน่งที่ตั้ง',
              },
            ]}
          />
          <ProFormText label={'Lat/Long'} width={150} name={'lat_long'} />
          <ProForm.Item>
            <Tooltip overlay="Select Lat/Long">
              <span
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  console.log('Select Lat long');
                  setmapmode('select');
                  showMapModal();
                }}
              >
                <AimOutlined />
              </span>
            </Tooltip>
          </ProForm.Item>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect<APITypes.SelectType>
            label={'Primary Case'}
            width={'sm'}
            request={async () => {
              return getIssueType();
            }}
            showSearch
            name={'primary_case'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่ Primary Case',
              },
            ]}
          />
          <ProFormSelect
            label={'Hazard'}
            width={'md'}
            showSearch
            request={async () => {
              return getIssueHazard();
            }}
            name={'hazard'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่ Hazard',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea
            label={'Description'}
            width={'xl'}
            name={'description'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่รายละเอียด',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea
            label={'Suggestion'}
            width={'xl'}
            name={'suggestion'}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            label={'SHE Officer'}
            width={'md'}
            name={'she_officer'}
            rules={[
              {
                required: true,
                message: 'กรุณาใส่เจ้าหน้าที่',
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormUploadDragger
            title={'Image Before'}
            name={'before_uploads'}
            description={
              'Click or Drag for upload(accept image file type only).'
            }
            width={350}
          />
          <ProFormUploadDragger
            title={'Image After'}
            name={'after_uploads'}
            description={
              'Click or Drag for upload(accept image file type only).'
            }
            width={350}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect
            label={'Status'}
            width={'sm'}
            name={'status'}
            options={status}
          />
          <ProFormDatePicker
            label={'Due date'}
            width={'md'}
            name={'due_date'}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormCheckbox label={'Close'} name={'close'} />
        </ProForm.Group>
      </DrawerForm>

      {/* MAP */}
      <Map mode={mapmode} visible={isShowMapmodal} onCancel={showMapModal} />
    </>
  );
};

export default Issue;
