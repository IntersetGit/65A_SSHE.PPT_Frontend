import { Column, ColumnConfig } from '@ant-design/plots';
import { Fragment } from 'react';

const data = [
  {
    type: 'Scaffolding',
    sales: 38,
  },
  {
    type: 'Safety Sign',
    sales: 52,
  },
  {
    type: 'Barricade',
    sales: 61,
  },
  {
    type: 'Equipment',
    sales: 145,
  },
  {
    type: 'Waste Management',
    sales: 48,
  },
];

const config: ColumnConfig = {
  data,
  xField: 'type',
  yField: 'sales',
  columnWidthRatio: 0.8,
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    sales: {
      alias: 'amount',
    },
  },
};

const BargraphPage = () => {
  return (
    <Fragment>
      <Column width={200} height={340} {...config} />
    </Fragment>
  );
};

export default BargraphPage;
