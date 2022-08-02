import { Pie, PieConfig } from '@ant-design/plots';
import { FC, Fragment } from 'react';

export type PieeT = {
  type: string;
  value: number;
}[];

interface SummaryPageI {
  dataPiee: PieeT;
}

const SummaryPage: FC<SummaryPageI> = ({ dataPiee }) => {
  const config: PieConfig = {
    style: {
      width: '100%',
      height: '50%',
    },
    appendPadding: 50,
    legend: {
      position: 'bottom',
    },
    data: dataPiee,
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
      <Pie width={200} height={360} {...config} />
    </Fragment>
  );
};

export default SummaryPage;
