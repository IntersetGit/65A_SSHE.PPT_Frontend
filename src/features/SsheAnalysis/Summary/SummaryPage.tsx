import { Pie, PieConfig } from '@ant-design/plots';
import { Fragment } from 'react';

const dataPie = [
  {
    type: 'Mobile Toilet',
    value: 2,
  },
  {
    type: 'Sub soil Top soil Separation',
    value: 3,
  },
  {
    type: 'Chemical',
    value: 3,
  },
  {
    type: 'Dip Tray',
    value: 3,
  },
  {
    type: 'Dust Control',
    value: 5,
  },
  {
    type: 'Hazaradous Waste',
    value: 5,
  },
  {
    type: 'Bentonite Frac out Management',
    value: 8,
  },
  {
    type: 'Health (Rest area)',
    value: 15,
  },
  {
    type: 'Waste Management',
    value: 56,
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

const SummaryPage = () => {
  return (
    <Fragment>
      <Pie width={200} height={360} {...config} />
    </Fragment>
  );
};

export default SummaryPage;
