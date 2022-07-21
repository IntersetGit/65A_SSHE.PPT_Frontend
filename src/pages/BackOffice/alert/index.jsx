import { Button, Card, Form, InputNumber, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';

const Alert = () => {
  const [form] = Form.useForm();
  const [projectdata, setprojectdata] = useState([]);
  const [project, setproject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, settitle] = useState();

  useEffect(() => {
    reload();
  }, []);

  const reload = (search = null) => {
    request('master/getProject', { method: 'get', params: { search: search } })
      .then((res) => {
        console.log(res);
        res.items.forEach((v, k) => {
          v.key = k + 1;
          v.number = k + 1;
          v.hour = 400000;
          v.fatal_case = 1;
          v.away_from_work_case = 1;
          v.work_days_lost = 20;
          v.vehicle_incident_case = 2;
          v.recordable_case = 0;
        });
        setprojectdata(res.items);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    request('master/getProjecttype', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.name, value: v.id });
        });
        setproject(arrData);
      })
      .catch((err) => console.error(err));
  };

  const setManHour = (e) => {
    form.setFieldsValue(e);
    settitle(e.project_name);
  };

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'Project Name',
      align: 'center',
      sorter: (a, b) => a.project_name - b.project_name,
    },
    {
      title: 'ประเภทโครงการ',
      dataIndex: 'project_type_id',
      key: 'project_type_id',
      align: 'center',
      render: (record) => {
        const data = project.find((e) => e.value === record);
        return <>{<div key={data?.value}>{data?.label}</div>}</>;
      },
    },
  ];

  return (
    <>
      <Card title="Project KPI" bordered={false}>
        <Card.Grid style={{ width: '60%' }}>
          <Table
            onRow={(e, i) => {
              return {
                onClick: () => {
                  setManHour(e);
                },
              };
            }}
            loading={loading}
            columns={columns}
            dataSource={projectdata}
            expandable
            size={'middle'}
            pagination={{
              pageSize: 8,
            }}
          />
        </Card.Grid>

        <Card.Grid style={{ width: '40%' }}>
          {title}
          <Form
            labelCol={{ span: 10 }}
            layout="horizontal"
            form={form}
            name="projectkpiform"
            id="projectkpiform"
            size="large"
          >
            <Form.Item
              name="hour"
              label="Total Man Hour"
              style={{ marginTop: 20 }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="fatal_case" label="Fatal Case">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="away_from_work_case" label="Away from work case">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="work_days_lost" label="Work days lost">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="vehicle_incident_case"
              label="Vehicle incident case"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="recordable_case" label="Recordable case">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Card.Grid>

        <Form.Item>
          <Space style={{ paddingTop: '20px', paddingLeft: '20px' }}>
            <Button type="primary" size="large" htmlType="sumbit">
              ตกลง
            </Button>
            <Button size="large">ยกเลิก</Button>
          </Space>
        </Form.Item>
      </Card>
    </>
  );
};

export default Alert;
