import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  LeftOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ProForm,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  TimePicker,
  Upload,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { request } from 'umi';
import { incident_dummy_data } from '../../../../dummy_data/incident_dummy_data';
import { columns, corrective_columns, witness_columns } from './column';
import {
  actsbypeopleoption,
  employeroptions,
  reportoption,
  suggest_incidentoption,
  typeofincidentoptions,
  wordplaceconditionoption,
} from './enum';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Incident = () => {
  const [isTablefield, setTablefield] = useState(true);
  const [form] = Form.useForm();
  const [incidentdata, setincidentdata] = useState(incident_dummy_data);
  const [selectedrow, setselectedrow] = useState<{} | null>(null);
  const [actiontype, setactiontype] = useState(1);
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    request('master/getProject', { method: 'get' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  }, []);

  const action_column = {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Dropdown.Button
        icon={<MoreOutlined />}
        type="text"
        overlay={
          <Menu>
            <Menu.Item
              key="1"
              icon={<EditOutlined />}
              onClick={() => {
                setactiontype(2);
                form.setFieldsValue(record);
                setselectedrow(record);
                setTablefield(false);
              }}
            >
              แก้ไข
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<DeleteOutlined />}
              // onClick={() => AddDataState('DELETE', record)}
            >
              ลบ
            </Menu.Item>
          </Menu>
        }
      ></Dropdown.Button>
    ),
  };

  const map_column = [...columns, action_column];

  const typeofonChange = () => {};

  const onFinish = (valuse: any) => {
    console.log(valuse);
    if (actiontype == 1) {
      // AddDataState('ADD', { key: incidentdata.length + 1, ...valuse });
    } else if (actiontype == 2) {
      const modified_value = { ...selectedrow, ...valuse };
      console.log(modified_value);
      // AddDataState('EDIT', modified_value);
    }
    handleClose();
  };

  const onFinishFailed = () => {
    console.log('Failed');
  };

  const handleClose = () => {
    setselectedrow(null);
    form.resetFields();
    setTablefield(true);
  };

  return (
    <>
      {isTablefield ? (
        // <Card title={'การจัดการข้อมูล Incident'}>
        //   <div
        //     style={{
        //       display: 'flex',
        //       justifyContent: 'space-between',
        //       alignItems: 'center',
        //     }}
        //   >
        //     <Space size={'large'}>
        //       <p>IncidentCategory</p>
        //       <Input placeholder="Search to Select" />
        //       <Search placeholder="Search" />
        //     </Space>
        //   </div>

        <ProTable
          search={false}
          columns={map_column}
          dataSource={incidentdata}
          actionRef={actionRef}
          columnEmptyText={'ไม่พบข้อมูล'}
          size={'middle'}
          headerTitle={
            <ProForm
              layout={'inline'}
              submitter={{
                render: false,
              }}
            >
              <ProFormText label="Category" />
            </ProForm>
          }
          toolbar={{
            settings: [],
            onSearch: (value: string) => {
              alert(value);
            },
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setactiontype(1);
                setTablefield(false);
              }}
            >
              ADD INCIDENT{' '}
            </Button>,
          ]}
        />
      ) : (
        // </Card>
        <Card>
          <Button type="text" icon={<LeftOutlined />} onClick={handleClose}>
            กลับ
          </Button>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18, flex: 1 }}
            labelWrap
            form={form}
            labelAlign="left"
            colon={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src={'/assets/images/PTT Public Company Limited.svg'}
                  width={120}
                  height={60}
                  alt="ptt-logo"
                />
                <p style={{ fontWeight: 'bold' }}>
                  INCIDENT/ACCIDENT INVESTIGATION TEST CICD
                </p>
                <p style={{ fontWeight: 'bold' }}>REPORT NO-001</p>
              </div>
              <Form.Item
                label="Project"
                name="project"
                style={{
                  width: '30%',
                }}
                rules={[{ required: true, message: 'กรุณาป้อนชื่อโปรเจค' }]}
              >
                <Select showSearch />
              </Form.Item>
              <Form.Item
                label="Company"
                style={{
                  width: '30%',
                }}
                name="company"
                rules={[{ required: true, message: 'กรุณาป้อนชื่อบริษัท' }]}
              >
                <Select showSearch />
              </Form.Item>
            </Card>

            <Tabs type="card" defaultActiveKey="1">
              <TabPane tab="General Information" key="1">
                <Row gutter={[8, 8]}>
                  <Col xl={12} md={24} sm={24} xs={24}>
                    <Card title={'Date/Time of Incident'}>
                      <Form.Item
                        label="Date of Incident"
                        name="date_incident"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนวันที่เกิดเหตุการณ์',
                          },
                        ]}
                      >
                        <DatePicker showTime />
                      </Form.Item>

                      <Form.Item
                        label="Time of Incident"
                        name="datetime_incident"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนเวลาที่เกิดเหตุการณ์',
                          },
                        ]}
                      >
                        <TimePicker />
                      </Form.Item>
                    </Card>
                  </Col>

                  <Col xl={12} md={24} sm={24} xs={24}>
                    <Card title={'Date/Time of Report'}>
                      <Form.Item
                        label="Date of Report"
                        name="date_incident_report"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนวันที่รายงานเหตุการณ์',
                          },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>

                      <Form.Item
                        label="Time of Report"
                        name="datetime_incident_report"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนวันที่รายงานเหตุการณ์',
                          },
                        ]}
                      >
                        <TimePicker />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[8, 8]}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card>
                      <Form.Item
                        label="Incident No"
                        name="incident_id"
                        rules={[
                          { required: true, message: 'กรุณาป้อน Incident No.' },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Location of Incident"
                        name="locationofincident"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนสถานที่เกิดเหตุการณ์',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Company/Activity"
                        name="company_activity"
                        rules={[
                          {
                            required: true,
                            message: 'กรุณาป้อนสถานที่เกิดเหตุการณ์',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Type of Incident"
                        name="typeofincident"
                        // rules={[
                        //   { required: true, message: "กรุณาป้อนสถานที่เกิดเหตุการณ์" },
                        // ]}
                      >
                        <Checkbox.Group
                          options={typeofincidentoptions}
                          onChange={typeofonChange}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Details of Injury/Illness" key="2">
                <Card title={'Employer'}>
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    rules={[{ required: true, message: 'กรุณาป้อนชื่อบริษัท' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Subcontractor"
                    name="sub_contractor"
                    rules={[
                      { required: true, message: 'กรุณาป้อนชื่อผู้รับเหมา' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="Type of Incident" name="typeofincident">
                    <Checkbox.Group
                      options={employeroptions}
                      onChange={typeofonChange}
                    />
                  </Form.Item>
                </Card>
                <Card title={'Duration of Employment'}>
                  <Form.Item
                    label="Year"
                    name="year"
                    rules={[{ required: true, message: 'กรุณาป้อนปีที่ทำงาน' }]}
                  >
                    <DatePicker picker="year" />
                  </Form.Item>

                  <Form.Item
                    label="Month"
                    name="month"
                    rules={[
                      { required: true, message: 'กรุณาป้อนเดือนที่ทำงาน' },
                    ]}
                  >
                    <DatePicker picker="month" />
                  </Form.Item>
                </Card>
                <Card>
                  <Form.Item
                    label="Name of injured"
                    name="nameofinjured"
                    rules={[
                      { required: true, message: 'กรุณาป้อนชื่อผู้เสียหาย' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'กรุณาป้อนอายุ' }]}
                  >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    rules={[{ required: true, message: 'กรุณาป้อนสัญชาติ' }]}
                  >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Personal ID/Passport No."
                    name="personal_passport"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนเลขบัตรประชาชนหรือพาสปอร์ต',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'กรุณาป้อนที่อยู่' }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab="Witness or Witness Statement" key="3">
                <EditableProTable
                  columns={witness_columns}
                  footer={() => [
                    <Button
                      key="add-btn"
                      type="primary"
                      // onClick={() => {
                      //   console.log(actionRef.current?.pageInfo);
                      //   actionRef.current?.addEditRecord?.({
                      //     keys: dataSource.length + 1,
                      //     risk_no: dataSource.length + 1,
                      //   });
                      // }}
                      icon={<PlusOutlined />}
                    >
                      เพิ่มข้อมูล
                    </Button>,
                  ]}
                  recordCreatorProps={false}
                />
              </TabPane>
              <TabPane tab="Property Damage" key="4">
                <Card title="Property Damage">
                  <Form.Item
                    label="List of Property/MaterialsDamage"
                    name="Property_Damage_1"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนทรัพย์สินที่เสียหาย',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Nature of Damage"
                    name="Property_Damage_2"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนลักษณะของความเสียหาย',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Object/Substance Inflicting Damage"
                    name="Property_Damage_3"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนวัตถุที่สร้างความเสียหาย',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Damage Cost"
                    name="Property_Damage_4"
                    rules={[
                      { required: true, message: 'กรุณาป้อนค่าความเสียหาย' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab="Incident Description" key="5">
                <Card title="Incident Disciption">
                  <Form.Item
                    label="Incident Discription"
                    name="Incident_Discription"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนรายละเอียดเหตุการณ์',
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      autoSize={{ minRows: 12, maxRows: 12 }}
                    />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab={'Why did the incident happen?'} key="6">
                <Card
                  title={
                    <div>
                      Why did the incident happen?
                      <a href="/SCAT-Chart.pdf">
                        <img
                          src="/assets/free-question-icon-1149-thumb.png"
                          width={40}
                          height={40}
                          style={{ marginLeft: '4%' }}
                          alt="manual-icon"
                        />
                      </a>
                    </div>
                  }
                >
                  <Form.Item
                    label="Unsafe workplace conditions: (Check all that apply)"
                    name="unsafe_workplace_conditions"
                  >
                    <Checkbox.Group
                      options={wordplaceconditionoption}
                      onChange={typeofonChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Unsafe acts by people: (Check all that apply)"
                    name="unsafe_acts_by_people"
                  >
                    <Checkbox.Group
                      options={actsbypeopleoption}
                      onChange={typeofonChange}
                    />
                  </Form.Item>
                </Card>
                <Card>
                  <Form.Item
                    label="Why did the unsafe conditions exist?"
                    name="unsafe_conditions_exist"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนเหตุใดที่่ทำให้เกิดอันตราย',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Why did the unsafe acts occur?"
                    name="unsafe_acts_occur"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณาป้อนการกระทำที่่ทำให้เกิดอันตราย',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Were the unsafe acts or conditions reported prior to the incident?"
                    name="acts_conditions_report"
                  >
                    <Radio.Group
                      options={reportoption}
                      onChange={typeofonChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Have there been similar incidents or near misses prior to this one?"
                    name="similar_incident_near_miss"
                  >
                    <Radio.Group
                      options={reportoption}
                      onChange={typeofonChange}
                    />
                  </Form.Item>
                </Card>
              </TabPane>

              <TabPane tab="How can future incidents be prevented?" key="7">
                <Card
                  title={
                    'What changes do you suggest to prevent this incident/near miss from happening again?'
                  }
                >
                  <Form.Item name={'sug_option'}>
                    <Checkbox.Group
                      options={suggest_incidentoption}
                      onChange={typeofonChange}
                    />
                  </Form.Item>
                </Card>
                <Card>
                  <p>
                    What should be (or has been) done to carry out the
                    suggestion(s) checked above?
                  </p>
                  <Form.Item
                    label={'Description continued on attached sheets'}
                    name="description_continued_on_attached_sheet"
                  >
                    <Radio.Group
                      options={[
                        { label: 'Yes', value: 'Yes' },
                        { label: 'No', value: 'No' },
                      ]}
                    />
                  </Form.Item>
                </Card>
              </TabPane>

              <TabPane tab="Corrective/Preventive Action Tracking " key="8">
                <EditableProTable
                  columns={corrective_columns}
                  footer={() => [
                    <Button
                      key="add-btn"
                      type="primary"
                      // onClick={() => {
                      //   console.log(actionRef.current?.pageInfo);
                      //   actionRef.current?.addEditRecord?.({
                      //     keys: dataSource.length + 1,
                      //     risk_no: dataSource.length + 1,
                      //   });
                      // }}
                      icon={<PlusOutlined />}
                    >
                      เพิ่มข้อมูล
                    </Button>,
                  ]}
                  recordCreatorProps={false}
                />
              </TabPane>
              <TabPane
                tab="Attachment List / Investigation Team and Prepared/completed report"
                key="9"
              >
                <Card title="Attachment List">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิ๊กหรือลากไฟล์ที่ต้องการแนบเพื่ออัพโหลด
                    </p>
                    <p className="ant-upload-hint">
                      รองรับทั้งไฟล์เดียวและหลายไฟล์
                    </p>
                  </Dragger>
                </Card>
                <Card title="Investigation Team and Prepared/completed report">
                  <Form.Item
                    label="Prepared by"
                    name="prepared"
                    rules={[
                      { required: true, message: 'กรุณาป้อนผู้เตรียมการ' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[{ required: true, message: 'กรุณาป้อนตำแหน่ง' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: 'กรุณาป้อนสาขา' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Names of investigation team members"
                    name="name_team_member"
                    rules={[{ required: true, message: 'กรุณาป้อนชื่อสมาชิก' }]}
                  >
                    <TextArea
                      rows={4}
                      autoSize={{ minRows: 12, maxRows: 12 }}
                    />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab="Review and Comment" key="10">
                {/* <Card title="Review and Comment">

                </Card> */}
                <Card title="Photo Report">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิ๊กหรือลากไฟล์ที่ต้องการแนบเพื่ออัพโหลด
                    </p>
                    <p className="ant-upload-hint">
                      รองรับทั้งไฟล์เดียวและหลายไฟล์
                    </p>
                  </Dragger>
                </Card>
              </TabPane>
            </Tabs>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
              <Button type="primary" danger onClick={handleClose}>
                ยกเลิก
              </Button>
            </Space>
          </Form>
        </Card>
      )}
    </>
  );
};

export default Incident;
