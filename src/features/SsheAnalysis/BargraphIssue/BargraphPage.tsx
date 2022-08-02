import { Column, ColumnConfig } from '@ant-design/plots';
import { FC, Fragment } from 'react';

export type BargraphT = {
  type: string;
  sales: number;
}[];
interface BargraphI {
  dataBargraph: BargraphT;
}

const BargraphPage: FC<BargraphI> = ({ dataBargraph }) => {
  const config: ColumnConfig = {
    data: dataBargraph,
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
  return (
    <Fragment>
      <Column width={200} height={340} {...config} />
    </Fragment>
  );
};

export default BargraphPage;
