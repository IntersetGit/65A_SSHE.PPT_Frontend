import { Pie, PieConfig } from '@ant-design/plots';
import { FC, Fragment } from 'react';

export type PieT = {
  type: string;
  value: number;
}[];

interface UnsafePageI {
  dataPie: PieT;
}

const UnsafePage: FC<UnsafePageI> = ({ dataPie }) => {
  const config: PieConfig = {
    style: {
      width: '100%',
      height: '50%',
    },
    appendPadding: 50,
    legend: {
      position: 'bottom',
    },
    data: dataPie,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <Fragment>
      <Pie height={360} {...config} />
    </Fragment>
  );
};

export default UnsafePage;
