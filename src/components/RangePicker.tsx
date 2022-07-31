import { DatePicker } from 'antd';
import { Moment } from 'moment';
import { FC } from 'react';

interface RangepickerI {
  onChange: (dates: [Date, Date] | null) => void;
  [key: string]: unknown;
}

const Rangepicker: FC<RangepickerI> = ({ onChange, ...props }) => {
  const { RangePicker } = DatePicker;
  return (
    <RangePicker
      onChange={(dates) => {
        if (!dates) return onChange(null);
        onChange([
          (dates[0] as Moment).toDate(),
          (dates[1] as Moment).toDate(),
        ]);
      }}
      {...props}
    />
  );
};

export default Rangepicker;
