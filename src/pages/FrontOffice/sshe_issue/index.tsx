import {
  AimOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  FileExcelOutlined,
  MoreOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  DrawerForm,
  ProColumns,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import {
  addIssue,
  deleteIssue,
  editIssue,
  getIssue,
  getIssueHazard,
  getIssueType,
} from './api';
import { columns } from './column';
import { status } from './enums';
import Map, { Latlngtype } from './map';
import ViewDrawer from './viewdrawer';

const Issue = () => {
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [isShowMapmodal, setShowMapmodal] = useState(false);
  const [dataSource, setDatasource] = useState<APITypes.SSHEIssueApitype[]>([]);
  const [maplatlng, setmaplatlng] = useState<Latlngtype | null>(null);
  const [viewdrawer, setviewdrawer] = useState<boolean>(false);
  const [selectedRow, setselectedRow] =
    useState<APITypes.SSHEIssueApitype | null>(null);
  const [mapmode, setmapmode] = useState<'select' | 'display'>('select');
  const formRef = useRef<ProFormInstance>();
  const [form] = ProForm.useForm();
  const [tableform] = ProForm.useForm();
  const actionRef = useRef<ActionType>();

  const showModal = () => {
    setShowDrawer(true);
    form.resetFields();
    setmaplatlng(null);
  };

  const showMapModal = () => {
    setShowMapmodal(!isShowMapmodal);
  };

  const showviewdrawer = () => {
    setviewdrawer(!viewdrawer);
  };

  const handleFinish = async (values: APITypes.SSHEIssueFormType) => {
    console.log(values);

    if (selectedRow) {
      handleUpdateIssue(values);
    } else {
      handleAddIssue(values);
    }
  };

  const handleUpdateIssue = (values: APITypes.SSHEIssueFormType) => {
    Swal.fire({
      title: 'แก้ไขข้อมูล',
      text: 'ยืนยันการแก้ไขข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await editIssue({
            data: {
              ...values,
              id: selectedRow?.id,
              close: values.close ? 1 : 0,
            },
          });
          Swal.fire('แก้ไขข้อมูลสำเร็จ', '', 'success');
          setShowDrawer(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } catch (error) {
          Swal.fire('แก้ไขข้อมูลไม่สำเร็จ', '', 'error');
        }
      }
    });
  };

  const handleAddIssue = (values: APITypes.SSHEIssueFormType) => {
    Swal.fire({
      title: 'บันทึกข้อมูล',
      text: 'ยืนยันการบันทึกข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await addIssue({ data: { ...values, close: values.close ? 1 : 0 } });
          Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
          setShowDrawer(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } catch (error) {
          Swal.fire('บันทึกข้อมูลไม่สำเร็จ', '', 'error');
        }
      }
    });
  };

  //** ================================ Column Dropdown Menu ================================ */
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

  const onMenuClick = (event: MenuInfo, record: APITypes.SSHEIssueApitype) => {
    const { key } = event;
    if (key === 'edit') {
      setselectedRow(record);
      form.setFieldsValue(record);
      setShowDrawer(true);
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteIssue(record.id);
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } catch (error) {
            Swal.fire('ลบข้อมูลไม่สำเร็จ', '', 'error');
          }
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
            overlay={<DropdownMenu record={record} />}
          />
        </>
      );
    },
  };

  const DropdownMenu: React.FC<{ record: APITypes.SSHEIssueApitype }> = (
    props,
  ) => (
    <>
      <Menu items={menuItems} onClick={(e) => onMenuClick(e, props.record)} />
    </>
  );

  //** =========================================================================================== */

  const onMapselectConfirm = (latlng: Latlngtype | null) => {
    if (latlng) {
      console.log(latlng);
      form.setFieldsValue({
        lat: latlng.lat,
        long: latlng.lng,
      });
      showMapModal();
    }
  };

  const comparedColums = [...columns, optionCol];

  return (
    <>
      <ProTable
        // search={{
        //   labelWidth: 'auto',
        //   // optionRender: (searchConfig,formProps,dom) => [
        //   //   <p>{formProps.form.}</p>
        //   // ]
        // }}
        search={false}
        headerTitle={
          <ProForm
            form={tableform}
            layout={'inline'}
            submitter={{
              render: false,
            }}
          >
            <ProForm.Group>
              <ProFormDateRangePicker
                label="Form - To Date"
                name="date"
                fieldProps={{
                  format: 'YYYY-MM-DD',
                }}
              />
              <ProFormSelect
                label="Primary Case"
                name="primary_case"
                request={async () => {
                  return getIssueType();
                }}
              />
            </ProForm.Group>
            <ProFormSelect
              className="form-issue-margin-t"
              label="Process"
              name="status"
              options={status}
            />
            <ProFormSelect
              className="form-issue-margin-t"
              label="Project Name"
              name="project_name"
            />
          </ProForm>
        }
        columns={comparedColums}
        actionRef={actionRef}
        request={getIssue}
        onDataSourceChange={setDatasource}
        columnEmptyText={'ไม่พบข้อมูล'}
        params={{
          ...tableform.getFieldsValue(),
        }}
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
        toolbar={{
          settings: [],
          onSearch: (value: string) => {
            alert(value);
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key={'search'}
            icon={<SearchOutlined />}
            onClick={async () => {
              console.log(tableform.getFieldsValue());
              const tablevalue = tableform.getFieldsValue();
              if (tablevalue.date) {
                if (
                  tablevalue.date[0] &&
                  typeof tablevalue.date[0] === 'object'
                )
                  tablevalue.date[0] = tablevalue.date[0].format('YYYY-MM-DD');
                if (
                  tablevalue.date[1] &&
                  typeof tablevalue.date[1] === 'object'
                )
                  tablevalue.date[1] = tablevalue.date[1].format('YYYY-MM-DD');
                tableform.setFieldsValue({ date: tablevalue.date });
              }
              actionRef.current?.reload();
            }}
          ></Button>,
          <Button
            type="default"
            key={'search'}
            icon={<RedoOutlined />}
            onClick={() => {
              tableform.resetFields();
              actionRef.current?.reload();
            }}
          ></Button>,
          <Button
            type="default"
            key={'export_excel'}
            icon={<FileExcelOutlined />}
          >
            Export Excel
          </Button>,
          <Button
            type="default"
            key={'download_template'}
            style={{}}
            icon={<DownloadOutlined />}
          >
            Download Template
          </Button>,

          <Button
            type="primary"
            style={{ float: 'right' }}
            key={'addissue'}
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            เพิ่ม ISSUE
          </Button>,
        ]}
        size={'middle'}
        scroll={{
          y: 240,
        }}
      />
      {/* Drawer Form */}
      <DrawerForm<APITypes.SSHEIssueFormType>
        title={'MANAGE ISSUE'}
        form={form}
        visible={isShowDrawer}
        onFinish={handleFinish}
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
            name={'project_id'}
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
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText label={'Lat'} width={270} name={'lat'} />
          <ProFormText label={'Lng'} width={270} name={'long'} />
          <ProForm.Item>
            <Tooltip overlay="Select Lat/Long">
              <span
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const f = form.getFieldsValue();
                  if (f.lat && f.long) {
                    console.log('Do this');

                    if (
                      typeof f.lat === 'string' ||
                      typeof f.long === 'string'
                    ) {
                      f.lat = parseFloat(f.lat);
                      f.long = parseFloat(f.long);
                    }

                    setmaplatlng({ lat: f.lat, lng: f.long });
                  }
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
            width={'sm'}
            showSearch
            request={async () => {
              return getIssueHazard();
            }}
            name={'hazard_id'}
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
            name={'user_id'}
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
      <Map
        mode={mapmode}
        dataSource={dataSource}
        onConfirm={onMapselectConfirm}
        markerVal={maplatlng}
        visible={isShowMapmodal}
        onCancel={showMapModal}
      />

      {/* ViewDrawer */}
      <ViewDrawer
        data={selectedRow}
        onClose={showviewdrawer}
        visible={viewdrawer}
      />
    </>
  );
};

export default Issue;
