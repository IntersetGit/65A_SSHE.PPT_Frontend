import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Fragment } from 'react';

type tempDataT = {
  catagory: string;
  kpi: string;
  actual: string;
};

const KpisPage = () => {
  const actualCaseStatus = (_: string, record: tempDataT) => {
    if (record.actual === '0')
      return (
        <img
          src="/icons/smile/smileFace.png"
          alt="smaile-face"
          width={30}
          height={30}
        />
      );
    else
      return (
        <img
          src="/icons/smile/unhappyFace.png"
          alt="unsmaile-face"
          width={30}
          height={30}
        />
      );
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
    {
      ellipsis: true,
      width: '10%',
      dataIndex: 'catagory',
      render: actualCaseStatus,
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
  return (
    <Fragment>
      <Table
        rowKey={'catagory'}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Fragment>
  );
};

export default KpisPage;
