import React from 'react';
import Head from 'next/head';
import { ImageLoader } from '../../utils/Utils';
import { Card , Tabs , Input , Form , DatePicker , Upload , Col , Row , TimePicker , Checkbox, Radio , Table , Space , Tag, Button, Dropdown, Menu } from 'antd';
import Search from 'antd/lib/input/Search';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined , InboxOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;
const { TextArea } = Input;
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
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
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Incident = () => {

    const columns = [
      {
          title: 'Report No.',
          dataIndex: 'report_no',
          key: 'report_no',
      },
      {
          title: 'Incident No.',
          dataIndex: 'incident_no',
          key: 'incident_no'
      },
      {
          title: 'Project',
          dataIndex: 'project',
          key: 'project',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: 'Date of Incident',
        dataIndex: 'doi',
        key: 'doi',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Incident Type',
        dataIndex: 'incidenttype',
        key: 'incidenttype',
      },
      {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
              <Dropdown.Button icon={<MoreOutlined/>} type='text' overlay={ 
                <Menu>
                  <Menu.Item key="1" icon={<EditOutlined />}>แก้ไข</Menu.Item>
                  <Menu.Item key="2" icon={<DeleteOutlined />}>ลบ</Menu.Item>
                </Menu>
              
                }>

              </Dropdown.Button>
          ),
      },
    ];

    const table_data = [
      {
        key : '1',
        report_no : 'Rp-001',
        incident_no : 'l-x00190',
        project : 'ปรับปรุง Tank Farm',
        company : 'ABC',
        doi : '20 ม.ค. 2565',
        location : 'Tank Farm',
        incidenttype : 'Lack of Machine'
      },
      {
        key : '2',
        report_no : 'Rp-002',
        incident_no : 'l-x00191',
        project : 'ต่อเติมอาคาร 101',
        company : 'XYZ',
        doi : '1 ก.พ. 2565',
        location : 'บริเวณอาคาร 101',
        incidenttype : 'Lack of Machine'
      },
      {
        key : '3',
        report_no : 'Rp-003',
        incident_no : 'l-x00192',
        project : 'วางท่อก๊าซ ระยอง-บ้านเพ',
        company : 'อีตัล',
        doi : '12 เม.ย. 2565',
        location : 'K-291',
        incidenttype : 'Lack of Equipment'
      }
    ]

    const typeofincidentoptions = [
      { label: 'Fatality', value: 'Fatality' },
      { label: 'Lost Workday ', value: 'Lost Workday' },
      { label: 'Medical Treatment ', value: 'Medical Treatment' },
      { label: 'Near Miss  ', value: 'Near Miss' },
      { label: 'Property Damage ', value: 'Property Damage' },
      { label: 'Motor Vehicle Incident ', value: 'Motor Vehicle Incident' },
      { label: 'Fire Incident First Aid ', value: 'Fire Incident First Aid' },
      { label: 'Environmental Incident ', value: 'Environmental Incident' },
      { label: 'Other ', value: 'Other' },
    ];

    const employeroptions = [
      { label: 'Fatality' , value: 'Fatality' },
      { label: 'Medical Treatment' , value: 'medical Treatment' },
      { label: 'First Aid' , value: 'First Aid' },
      { label: 'Lost Time' , value: 'Lost Time' },
      { label: 'Restricted Work' , value: 'Restricted Work'},
    ];

    const wordplaceconditionoption = [
      { label: 'Inadequate guard', value: 'Inadequate guard'},
      { label: 'Unguarded hazard', value: 'Unguarded hazard'},
      { label: 'Safety device is defective', value: 'Safety device is defective'},
      { label: 'Tool or equipm ent defectiove', value: 'Tool or equipm ent defectiove'},
      { label: 'Workstation layout is hazardous', value: 'Workstation layout is hazardous'},
      { label: 'Unsafe lighting', value: 'Unsafe lighting'},
      { label: 'Unsafe ventilation', value: 'Unsafe ventilation'},
      { label: 'Lack of needed personal protective equipm ent', value: 'Lack of needed personal protective equipm ent'},
      { label: 'Lack of appropriate equipm ent/tools', value: 'Lack of appropriate equipm ent/tools'},
      { label: 'Unsafe clothing', value: 'Unsafe clothing'},
      { label: 'No training or insufficient training', value: 'No training or insufficient training'},
      { label: 'Other', value: 'Other'},
    ];

    const actsbypeopleoption = [
      { label: 'Operating without permission', value: 'Operating without permission'},
      { label: 'Operating at unsafe speed', value: 'Operating at unsafe speed'},
      { label: 'Servicing equipment that has power to it', value: 'Servicing equipment that has power to it'},
      { label: 'Making a safety device inoperative', value: 'Making a safety device inoperative'},
      { label: 'Using defective equipment', value: 'Using defective equipment'},
      { label: 'Using equipment in an unapproved way', value: 'Using equipment in an unapproved way'},
      { label: 'Unsafe lifting', value: 'Unsafe lifting'},
      { label: 'Taking an unsafe position or posture', value: 'Taking an unsafe position or posture'},
      { label: 'Distraction, teasing, horseplay', value: 'Distraction, teasing, horseplay'},
      { label: 'Failure to wear personal protective equipment', value: 'Failure to wear personal protective equipment'},
      { label: 'Failure to use the available equipment / tools', value: 'Failure to use the available equipment / tools'},
      { label: 'Other', value: 'Other'},
    ];

    const suggest_incidentoption = [
      {label : 'Stop this activity' , value :'Stop this activity'},
      {label : 'Guard the hazard' , value :'Guard the hazard'},
      {label : 'Train the employee(s)' , value :'Train the employee(s)'},
      {label : 'Train the supervisor(s)' , value :'Train the supervisor(s)'},
      {label : 'Redesign task steps' , value :'Redesign task steps'},
      {label : 'Redesign work station' , value :'Redesign work station'},
      {label : 'Write a new policy/rule' , value :'Write a new policy/rule'},
      {label : 'Enforce existing policy' , value :'Enforce existing policy'},
      {label : 'Routinely inspect for the hazard' , value :'Routinely inspect for the hazard'},
      {label : 'Personal Protective Equipment' , value :'Personal Protective Equipment'},
      {label : 'Other: ' , value :'Other: '},
    ]

    const reportoption = [
      { label: 'Yes', value: 'Yes'},
      { label: 'No', value: 'No'},      
    ];

    const typeofonChange = () =>{
      
    }

    const onFinish = () =>{

    }

    const onFinishFailed = () => {

    }

    return (
      <>
        <Head>
          <title>PTT SSHE | INCIDENT </title>
        </Head>
        <Card title={"การจัดการข้อมูล Incident"}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space size={"large"}>
              <h1>IncidentCategory</h1>
              <Input placeholder="Search to Select" />
              <Search placeholder="Search" />
              <Button type="primary" icon={<PlusOutlined />}>
                เพิ่ม ISSUE{" "}
              </Button>
            </Space>
          </div>

          <Table columns={columns} dataSource={table_data} />
        </Card>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={ImageLoader(
                    "/assets/images/PTT Public Company Limited.svg"
                  )}
                  width={120}
                  height={60}
                  alt="ptt-logo"
                />
                <p style={{ fontWeight: "bold" }}>
                  INCIDENT/ACCIDENT INVESTIGATION
                </p>
                <p style={{ fontWeight: "bold" }}>REPORT NO-001</p>
              </div>
              <Form.Item
                label="Project"
                name="project"
                rules={[{ required: true, message: "กรุณาป้อนชื่อโปรเจค" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true, message: "กรุณาป้อนชื่อบริษัท" }]}
              >
                <Input />
              </Form.Item>
            </Card>

            <Tabs defaultActiveKey="1">
              <TabPane tab="General Information" key="1">
                <Row gutter={[8, 8]}>
                  <Col xl={12} md={24} sm={24} xs={24}>
                    <Card title={"Date/Time of Incident"}>
                      <Form.Item
                        label="Date of Incident"
                        name="dateofincident"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาป้อนวันที่เกิดเหตุการณ์",
                          },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>

                      <Form.Item
                        label="Time of Incident"
                        name="timeofincident"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาป้อนเวลาที่เกิดเหตุการณ์",
                          },
                        ]}
                      >
                        <TimePicker />
                      </Form.Item>
                    </Card>
                  </Col>

                  <Col xl={12} md={24} sm={24} xs={24}>
                    <Card title={"Date/Time of Report"}>
                      <Form.Item
                        label="Date of Report"
                        name="dateofreport"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาป้อนวันที่รายงานเหตุการณ์",
                          },
                        ]}
                      >
                        <DatePicker />
                      </Form.Item>

                      <Form.Item
                        label="Time of Report"
                        name="timeofreport"
                        rules={[
                          {
                            required: true,
                            message: "กรุณาป้อนวันที่รายงานเหตุการณ์",
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
                          { required: true, message: "กรุณาป้อน Incident No." },
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
                            message: "กรุณาป้อนสถานที่เกิดเหตุการณ์",
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
                            message: "กรุณาป้อนสถานที่เกิดเหตุการณ์",
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
                <Card title={"Employer"}>
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    rules={[{ required: true, message: "กรุณาป้อนชื่อบริษัท" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Subcontractor"
                    name="sub_contractor"
                    rules={[
                      { required: true, message: "กรุณาป้อนชื่อผู้รับเหมา" },
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
                <Card title={"Duration of Employment"}>
                  <Form.Item
                    label="Year"
                    name="year"
                    rules={[{ required: true, message: "กรุณาป้อนปีที่ทำงาน" }]}
                  >
                    <DatePicker picker="year" />
                  </Form.Item>

                  <Form.Item
                    label="Month"
                    name="month"
                    rules={[
                      { required: true, message: "กรุณาป้อนเดือนที่ทำงาน" },
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
                      { required: true, message: "กรุณาป้อนชื่อผู้เสียหาย" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: "กรุณาป้อนอายุ" }]}
                  >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    rules={[{ required: true, message: "กรุณาป้อนสัญชาติ" }]}
                  >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Personal ID/Passport No."
                    name="personal_passport"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาป้อนเลขบัตรประชาชนหรือพาสปอร์ต",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "กรุณาป้อนที่อยู่" }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab="Witness or Witness Statement" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Property Damage" key="4">
                <Card title="Property Damage">
                  <Form.Item
                    label="List of Property/MaterialsDamage"
                    name="Property_Damage_1"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาป้อนทรัพย์สินที่เสียหาย",
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
                        message: "กรุณาป้อนลักษณะของความเสียหาย",
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
                        message: "กรุณาป้อนวัตถุที่สร้างความเสียหาย",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Damage Cost"
                    name="Property_Damage_4"
                    rules={[
                      { required: true, message: "กรุณาป้อนค่าความเสียหาย" },
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
                        message: "กรุณาป้อนรายละเอียดเหตุการณ์",
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
              <TabPane tab="Why did the incident happen?" key="6">
                <Card title="Why did the incident happen?">
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
                        message: "กรุณาป้อนเหตุใดที่่ทำให้เกิดอันตราย",
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
                        message: "กรุณาป้อนการกระทำที่่ทำให้เกิดอันตราย",
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
                    "What changes do you suggest to prevent this incident/near miss from happening again?"
                  }
                >
                  <Form.Item name={"sug_option"}>
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
                  <Form.Item label={"Description continued on attached sheets"}>
                    <Radio.Group
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </Form.Item>
                </Card>
              </TabPane>

              <TabPane tab="Corrective/Preventive Action Tracking " key="8">
                Corrective/Preventive Action Tracking
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
                      { required: true, message: "กรุณาป้อนผู้เตรียมการ" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[{ required: true, message: "กรุณาป้อนตำแหน่ง" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Department"
                    name="department  "
                    rules={[{ required: true, message: "กรุณาป้อนสาขา" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Names of investigation team members"
                    name="name_team_member"
                    rules={[{ required: true, message: "กรุณาป้อนชื่อสมาชิก" }]}
                  >
                    <TextArea
                      rows={4}
                      autoSize={{ minRows: 12, maxRows: 12 }}
                    />
                  </Form.Item>
                </Card>
              </TabPane>
              <TabPane tab="Review and Comment" key="10">
                <Card title="Review and Comment">

                </Card>
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
          </Form>
        </Card>
      </>
    );
}

export default Incident