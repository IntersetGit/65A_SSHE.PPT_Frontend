import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  message,
  Row,
  Space,
  Table,
  Upload,
} from 'antd';
import { useState } from 'react';
import { colors } from './colors';
import { colorse } from './colorse';

const IssueInfo = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);

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

  const onChange = (e) => {
    const { key } = e;
    if (e.target.id === 'green') {
      setValue(e);
    } else if (e.target.id === 'yellow') {
      setValue(e);
    } else {
      setValue(e);
    }
    console.log('changed', e.target.id);
  };

  const onChanges = (e) => {
    const { key } = e;
    if (e.target.id === 'green') {
      setValue(e);
    } else if (e.target.id === 'yellow') {
      setValue(e);
    } else {
      setValue(e);
    }
    console.log('changed', e.target.id);
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns = [
    {
      title: 'ระดับสี',
      dataIndex: 'color',
      key: 'color',
      width: '15%',
      render: (record) => {
        return (
          <>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background:
                  record === '' || record === null ? '<No Color>' : record,
                border: '1px solid gray',
              }}
            />
          </>
        );
      },
    },
    {
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: 'จำนวนวันที่เปิด issue',
      key: 'issue_date',
      align: 'center',
      render: (record) => {
        return (
          <>
            <InputNumber
              min={1}
              max={31}
              id={record.key}
              key={record.key}
              defaultValue={record.value}
              onClick={(e) => onChange(e)}
            />
          </>
        );
      },
    },
  ];

  const columnz = [
    {
      title: 'ระดับสี',
      dataIndex: 'color',
      key: 'color',
      width: '15%',
      render: (record) => {
        return (
          <>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background:
                  record === '' || record === null ? '<No Color>' : record,
                border: '1px solid gray',
              }}
            />
          </>
        );
      },
    },
    {
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: 'จำนวนวันที่ใกล้ Teatment Plan Due Date',
      key: 'issue_date',
      align: 'center',
      render: (record) => {
        return (
          <>
            <InputNumber
              min={1}
              max={31}
              id={record.key}
              key={record.key}
              defaultValue={record.value}
              onClick={(e) => onChanges(e)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Form
        {...formItemLayout}
        layout="horizontal"
        name="issueform"
        id="issueform"
        form={form}
        size="large"
      >
        <div className="site-card-wrapper">
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card title="Setting : SSHE Issue Alert" bordered={false}>
                <Table
                  columns={columns}
                  dataSource={colors}
                  pagination={false}
                ></Table>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card title="Setting : Risk Assessment " bordered={false}>
                <Table
                  columns={columnz}
                  dataSource={colorse}
                  pagination={false}
                ></Table>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card title="Setting : SSHE Incident " bordered={false}>
                <Form.Item
                  name="scat_chart"
                  label="Scat Chart"
                  labelCol={{ span: 4 }}
                  valuePropName="fileList"
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />} size="middle">
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Space style={{ paddingTop: '20px', float: 'left' }}>
                    <Button type="primary" htmlType="sumbit">
                      บันทึก
                    </Button>
                    <Button>ยกเลิก</Button>
                  </Space>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>

        <Form.Item>
          <Space style={{ paddingTop: '20px', float: 'right' }}>
            <Button type="primary" htmlType="sumbit">
              ตกลง
            </Button>
            <Button type="primary">ยกเลิก</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default IssueInfo;
