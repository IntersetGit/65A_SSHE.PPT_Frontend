import { Button, Card, Col, Form, InputNumber, Row, Space, Table } from 'antd';
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
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Card title="Setting : SSHE Issue Alert" bordered={false}>
                <Table
                  columns={columns}
                  dataSource={colors}
                  pagination={false}
                ></Table>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Setting : Risk Assessment " bordered={false}>
                <Table
                  columns={columnz}
                  dataSource={colorse}
                  pagination={false}
                ></Table>
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
