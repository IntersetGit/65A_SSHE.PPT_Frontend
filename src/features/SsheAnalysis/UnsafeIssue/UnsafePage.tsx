import { Pie, PieConfig } from '@ant-design/plots';
import { Fragment } from 'react';

const dataPie = [
  {
    type: 'Unsafe Action Issue',
    value: 16,
  },
  {
    type: 'Unsafe Condition Issue',
    value: 84,
  },
];

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

const UnsafePage = () => {
  return (
    <Fragment>
      <Pie height={360} {...config} />
    </Fragment>
  );
};

export default UnsafePage;
