import React from 'react';
import Head from 'next/head';
import { ImageLoader } from '../../utils/Utils';
import { Card , Tabs , Input , Form , DatePicker , Col , Row , TimePicker , Checkbox, } from 'antd';

const { TabPane } = Tabs;
const { TextArea } = Input;

const Incident = () => {

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
      { label: 'Restricted Work' , value: 'Restricted Work'}

    ]

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
                rules={[
                  { required: true, message: "กรุณาป้อนชื่อโปรเจค" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Company"
                name="company"
                rules={[
                  { required: true, message: "กรุณาป้อนชื่อบริษัท" },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>

            <Tabs defaultActiveKey="1">
              <TabPane tab="General Information" key="1">
              <Row gutter={[8,8]}>

                <Col xl={12} md={24} sm={24} xs={24}>
                  <Card title={'Date/Time of Incident'}>

                    <Form.Item
                    label="Date of Incident"
                    name="dateofincident"
                    rules={[
                      { required: true, message: "กรุณาป้อนวันที่เกิดเหตุการณ์" },
                    ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                    label="Time of Incident"
                    name="timeofincident"
                    rules={[
                      { required: true, message: "กรุณาป้อนเวลาที่เกิดเหตุการณ์" },
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
                      name="dateofreport"
                      rules={[
                        { required: true, message: "กรุณาป้อนวันที่รายงานเหตุการณ์" },
                      ]}
                      >
                        <DatePicker />
                      </Form.Item>

                      <Form.Item
                      label="Time of Report"
                      name="timeofreport"
                      rules={[
                        { required: true, message: "กรุณาป้อนวันที่รายงานเหตุการณ์" },
                      ]}
                      >
                        <TimePicker />
                      </Form.Item>

                  </Card>
                </Col>
              </Row>

              <Row gutter={[8,8]}>
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
                          { required: true, message: "กรุณาป้อนสถานที่เกิดเหตุการณ์" },
                        ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                        label="Company/Activity"
                        name="company_activity"
                        rules={[
                          { required: true, message: "กรุณาป้อนสถานที่เกิดเหตุการณ์" },
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
                          <Checkbox.Group options={typeofincidentoptions} onChange={typeofonChange} />
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
                    rules={[
                      { required: true, message: "กรุณาป้อนชื่อบริษัท" },
                    ]}
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

                  <Form.Item
                    label="Type of Incident"
                    name="typeofincident"
                  >
                    <Checkbox.Group options={employeroptions} onChange={typeofonChange} />
                  </Form.Item>
              </Card>
              <Card title={"Duration of Employment"}>
                  <Form.Item
                    label="Year"
                    name="year"
                    rules={[
                      { required: true, message: "กรุณาป้อนปีที่ทำงาน" },
                    ]}
                    >
                    <DatePicker picker='year' />
                  </Form.Item>

                  <Form.Item
                    label="Month"
                    name="month"
                    rules={[
                      { required: true, message: "กรุณาป้อนเดือนที่ทำงาน" },
                    ]}
                    >
                    <DatePicker picker='month' />
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
                    rules={[
                      { required: true, message: "กรุณาป้อนอายุ" },
                    ]}
                    >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    rules={[
                      { required: true, message: "กรุณาป้อนสัญชาติ" },
                    ]}
                    >
                    <Input style={{ width: 140 }} />
                  </Form.Item>

                  <Form.Item
                    label="Personal ID/Passport No."
                    name="personal_passport"
                    rules={[
                      { required: true, message: "กรุณาป้อนเลขบัตรประชาชนหรือพาสปอร์ต" },
                    ]}
                    >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      { required: true, message: "กรุณาป้อนที่อยู่" },
                    ]}
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
                      { required: true, message: "กรุณาป้อนทรัพย์สินที่เสียหาย" },
                    ]}
                    >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Nature of Damage"
                    name="Property_Damage_2"
                    rules={[
                      { required: true, message: "กรุณาป้อนลักษณะของความเสียหาย" },
                    ]}
                    >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Object/Substance Inflicting Damage"
                    name="Property_Damage_3"
                    rules={[
                      { required: true, message: "กรุณาป้อนวัตถุที่สร้างความเสียหาย" },
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
                      { required: true, message: "กรุณาป้อนรายละเอียดเหตุการณ์" },
                    ]}
                    >
                    <TextArea rows={4} autoSize={{ minRows: 12 , maxRows:12}} />
                  </Form.Item>

                </Card>
              </TabPane>
              <TabPane tab="Why did the incident happen?" key="6">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="How can future incidents be prevented?" key="7">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Corrective/Preventive Action Tracking " key="8">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Attachment List" key="9">
                Content of Tab Pane 3
              </TabPane>
              <TabPane
                tab="Investigation Team and Prepared/completed report"
                key="10"
              >
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Review and Comment" key="11">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Form>
        </Card>
      </>
    );
}

export default Incident