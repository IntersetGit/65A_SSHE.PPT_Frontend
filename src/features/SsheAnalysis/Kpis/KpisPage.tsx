import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Fragment } from 'react';

type tempDataT = {
  catagory: string;
  kpi: string;
  actual: string;
};

const columns: ColumnsType<tempDataT> = [
  {
    ellipsis: true,
    width: '20%',
    dataIndex: 'catagory',
  },
  {
    title: 'KPIs',
    width: '10%',
    dataIndex: 'kpi',
  },
  {
    title: 'Actual',
    width: '10%',
    dataIndex: 'actual',
  },
];

const data = [
  {
    catagory: 'Fatality',
    kpi: '0',
    actual: '1',
  },
  {
    catagory: 'AWCR',
    kpi: '<0.08',
    actual: '0.5',
  },
  {
    catagory: 'TLDSR',
    kpi: '<0.50',
    actual: '10',
  },
  {
    catagory: 'VIFR',
    kpi: '<0.40',
    actual: '1',
  },
  {
    catagory: 'TRCR',
    kpi: '<0.22',
    actual: '0',
  },
];

const KpisPage = () => {
  return (
    <Fragment>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Fragment>
  );
};

export default KpisPage;
